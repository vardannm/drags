import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  arraySwap,
  clamp,
  createInitialWindows,
  handlesByType,
  normalizeWindowBounds,
  STORAGE_KEYS,
} from '../utils/layoutUtils';
import {
  fetchCurrentState,
  fetchLayouts,
  saveLayout,
  syncCurrentState,
} from '../utils/api';

const MIN_W = 250;
const MIN_H = 160;
const GRID_COLUMNS = 6;

export function useWindowManager(customsSnapshot, restoreCustomsSnapshot, token) {
  const [mode, setMode] = useState('free');
  const [windows, setWindows] = useState(createInitialWindows());
  const [order, setOrder] = useState(createInitialWindows().map((w) => w.id));
  const zCounterRef = useRef(20);
  const [interaction, setInteraction] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);
  const [backendFavorites, setBackendFavorites] = useState([]);
  const [localFavorites, setLocalFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.localFavorites) || '[]');
    } catch {
      return [];
    }
  });

  const desktopRef = useRef(null);
  const windowRefs = useRef({});
  const restoreSnapshotRef = useRef(restoreCustomsSnapshot);

  useEffect(() => {
    restoreSnapshotRef.current = restoreCustomsSnapshot;
  }, [restoreCustomsSnapshot]);

  const visibleWindows = useMemo(
    () => windows.filter((w) => !w.closed && !w.minimized),
    [windows]
  );

  const bringToFront = useCallback((id) => {
    zCounterRef.current += 1;
    const next = zCounterRef.current;
    setWindows((current) =>
      current.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w))
    );
  }, []);

  const updateWindow = useCallback((id, patch) => {
    setWindows((current) => current.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  const startDrag = (event, windowState) => {
    if (event.button !== 0) return;
    bringToFront(windowState.id);

    const desktopRect = desktopRef.current?.getBoundingClientRect();
    if (!desktopRect) return;

    const cardRect = windowRefs.current[windowState.id]?.getBoundingClientRect();

    setInteraction({
      type: 'drag',
      mode,
      id: windowState.id,
      startX: event.clientX,
      startY: event.clientY,
      startLeft: windowState.x,
      startTop: windowState.y,
      cardRect,
      desktopRect,
      lastSwapTarget: null,
    });

    if (mode === 'grid' && cardRect) {
      setDragGhost({
        left: cardRect.left - desktopRect.left,
        top: cardRect.top - desktopRect.top,
        width: cardRect.width,
        height: cardRect.height,
      });
    }

    event.preventDefault();
  };

  const startResize = (event, windowState, handle = 'se') => {
    if (event.button !== 0) return;
    const desktopRect = desktopRef.current?.getBoundingClientRect();
    if (!desktopRect) return;

    bringToFront(windowState.id);
    setInteraction({
      type: 'resize',
      mode,
      id: windowState.id,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: windowState.width,
      startHeight: windowState.height,
      startLeft: windowState.x,
      startTop: windowState.y,
      desktopRect,
    });

    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (!interaction) return;

    const onMove = (event) => {
      const dx = event.clientX - interaction.startX;
      const dy = event.clientY - interaction.startY;
      const areaWidth = interaction.desktopRect.width;
      const areaHeight = interaction.desktopRect.height;

      if (interaction.type === 'drag') {
        if (interaction.mode === 'free') {
          setWindows((current) =>
            current.map((w) => {
              if (w.id !== interaction.id) return w;
              return normalizeWindowBounds({
                windowState: { ...w, x: interaction.startLeft + dx, y: interaction.startTop + dy },
                desktopRect: interaction.desktopRect,
              });
            })
          );
        } else {
          if (interaction.cardRect) {
            setDragGhost((prev) =>
              prev
                ? {
                    ...prev,
                    left: interaction.cardRect.left - interaction.desktopRect.left + dx,
                    top: interaction.cardRect.top - interaction.desktopRect.top + dy,
                  }
                : prev
            );
          }

          const pointerX = event.clientX;
          const pointerY = event.clientY;
          const target = visibleWindows.find((item) => {
            if (item.id === interaction.id) return false;
            const rect = windowRefs.current[item.id]?.getBoundingClientRect();
            return rect && pointerX >= rect.left && pointerX <= rect.right && pointerY >= rect.top && pointerY <= rect.bottom;
          });

          if (target?.id && target.id !== interaction.lastSwapTarget) {
            setOrder((prev) => {
              const from = prev.indexOf(interaction.id);
              const to = prev.indexOf(target.id);
              if (from === -1 || to === -1) return prev;
              return arraySwap(prev, from, to);
            });
            setInteraction((prev) => ({ ...prev, lastSwapTarget: target.id }));
          }
        }
      }

      if (interaction.type === 'resize') {
        setWindows((current) =>
          current.map((w) => {
            if (w.id !== interaction.id) return w;

            let width = interaction.startWidth;
            let height = interaction.startHeight;
            let x = interaction.startLeft;
            let y = interaction.startTop;

            const handles = handlesByType[interaction.handle] || ['s', 'e'];

            if (handles.includes('e')) {
              width = clamp(interaction.startWidth + dx, MIN_W, areaWidth - interaction.startLeft);
            }
            if (handles.includes('s')) {
              height = clamp(interaction.startHeight + dy, MIN_H, areaHeight - interaction.startTop);
            }
            if (handles.includes('w')) {
              width = clamp(interaction.startWidth - dx, MIN_W, interaction.startLeft + interaction.startWidth);
              x = clamp(interaction.startLeft + dx, 0, interaction.startLeft + interaction.startWidth - MIN_W);
            }
            if (handles.includes('n')) {
              height = clamp(interaction.startHeight - dy, MIN_H, interaction.startTop + interaction.startHeight);
              y = clamp(interaction.startTop + dy, 0, interaction.startTop + interaction.startHeight - MIN_H);
            }

            if (interaction.mode === 'grid') {
              return {
                ...w,
                width,
                height,
                gridColSpan: clamp(Math.round(width / 170), 1, GRID_COLUMNS),
                gridRowSpan: clamp(Math.round(height / 130), 1, 4),
              };
            }

            return { ...w, width, height, x, y };
          })
        );
      }
    };

    const onUp = () => {
      setInteraction(null);
      setDragGhost(null);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [interaction, visibleWindows]);

  const restoreWindow = (id) => {
    updateWindow(id, { minimized: false, closed: false });
    bringToFront(id);
  };

  const minimizeWindow = (id) => updateWindow(id, { minimized: true });
  const closeWindow = (id) => updateWindow(id, { closed: true, minimized: false });

  const toPayload = (name) => ({
    name,
    mode,
    order,
    windows: windows.map(({ id, x, y, width, height, z, minimized }) => ({
      id,
      x,
      y,
      width,
      height,
      z,
      minimized,
    })),
    dashboardData: customsSnapshot,
  });

  const toStatePayload = useCallback(() => ({
    mode,
    order,
    windows: windows.map(({ id, x, y, width, height, z, minimized }) => ({
      id,
      x,
      y,
      width,
      height,
      z,
      minimized,
    })),
    dashboardData: customsSnapshot,
    updatedAtClient: new Date().toISOString(),
  }), [mode, order, windows, customsSnapshot]);

  const applyPayload = useCallback((layout) => {
    setMode(layout.mode || 'free');
    setOrder(layout.order || []);
    setWindows((current) => {
      const map = new Map((layout.windows || []).map((w) => [w.id, w]));
      return current.map((w) => ({
        ...w,
        ...(map.get(w.id) || {}),
      }));
    });
    restoreSnapshotRef.current?.(layout.dashboardData);
  }, []);

  const saveLocalFavorite = (name) => {
    const payload = { id: crypto.randomUUID(), ...toPayload(name) };
    const next = [payload, ...localFavorites].slice(0, 10);
    setLocalFavorites(next);
    localStorage.setItem(STORAGE_KEYS.localFavorites, JSON.stringify(next));
    return payload;
  };

  const fetchBackendFavorites = useCallback(async () => {
    if (!token) return;
    const data = await fetchLayouts(token);
    setBackendFavorites(Array.isArray(data) ? data : []);
  }, [token]);

  const saveBackendFavorite = async (name) => {
    if (!token) return null;
    const data = await saveLayout(token, toPayload(name));
    setBackendFavorites((prev) => [data, ...prev]);
    return data;
  };

  const fetchAndApplyCurrentState = useCallback(async () => {
    if (!token) return;
    const data = await fetchCurrentState(token);
    if (data) {
      applyPayload(data);
    }
  }, [token, applyPayload]);

  const pushCurrentState = useCallback(async () => {
    if (!token) return;
    await syncCurrentState(token, toStatePayload());
  }, [token, toStatePayload]);

  const clearBackendFavorites = () => setBackendFavorites([]);

  const sortedFreeWindows = [...visibleWindows].sort((a, b) => a.z - b.z);
  const orderedGridWindows = order
    .map((id) => windows.find((w) => w.id === id))
    .filter(Boolean)
    .filter((w) => !w.minimized && !w.closed);

  return {
    mode,
    setMode,
    windows,
    order,
    interaction,
    dragGhost,
    desktopRef,
    windowRefs,
    visibleWindows,
    sortedFreeWindows,
    orderedGridWindows,
    bringToFront,
    startDrag,
    startResize,
    restoreWindow,
    minimizeWindow,
    closeWindow,
    localFavorites,
    backendFavorites,
    saveLocalFavorite,
    fetchBackendFavorites,
    saveBackendFavorite,
    fetchAndApplyCurrentState,
    pushCurrentState,
    clearBackendFavorites,
    applyPayload,
    gridColumns: GRID_COLUMNS,
  };
}
