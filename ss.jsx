import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "desktop-favorites-v1";
const TASKBAR_HEIGHT = 66;
const SIDEBAR_WIDTH = 260;
const MIN_W = 220;
const MIN_H = 140;

const SAMPLE_WINDOWS = [
  {
    id: "notepad",
    title: "Notepad",
    x: 40,
    y: 40,
    width: 360,
    height: 280,
    z: 1,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 2,
    content: (
      <div>
        <h4>Meeting Notes</h4>
        <p>• Ship desktop prototype</p>
        <p>• Polish snapping animations</p>
        <p>• Add layout favorites</p>
      </div>
    ),
  },
  {
    id: "browser",
    title: "Browser",
    x: 210,
    y: 80,
    width: 450,
    height: 320,
    z: 2,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 2,
    content: (
      <div>
        <h4>News Feed</h4>
        <p>Welcome to your custom desktop simulation.</p>
        <p>This panel represents browser content.</p>
      </div>
    ),
  },
  {
    id: "explorer",
    title: "File Explorer",
    x: 680,
    y: 70,
    width: 330,
    height: 320,
    z: 3,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 2,
    content: (
      <div>
        <h4>Project</h4>
        <ul>
          <li>src/App.jsx</li>
          <li>src/main.jsx</li>
          <li>README.md</li>
          <li>package.json</li>
        </ul>
      </div>
    ),
  },
  {
    id: "settings",
    title: "Settings",
    x: 90,
    y: 360,
    width: 300,
    height: 220,
    z: 4,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 1,
    content: (
      <div>
        <h4>Preferences</h4>
        <label>
          <input type="checkbox" defaultChecked /> Blur backgrounds
        </label>
        <br />
        <label>
          <input type="checkbox" defaultChecked /> Animate swaps
        </label>
      </div>
    ),
  },
  {
    id: "terminal",
    title: "Terminal",
    x: 430,
    y: 390,
    width: 460,
    height: 240,
    z: 5,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 1,
    content: (
      <div className="terminal-body">
        <p>$ npm run dev</p>
        <p>VITE v5 ready in 224ms</p>
        <p>➜ Local: http://localhost:5173/</p>
      </div>
    ),
  },
];

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const getVisibleWindows = (windows) =>
  windows.filter((w) => !w.closed && !w.minimized);

const handleMap = {
  n: ["n"],
  s: ["s"],
  e: ["e"],
  w: ["w"],
  ne: ["n", "e"],
  nw: ["n", "w"],
  se: ["s", "e"],
  sw: ["s", "w"],
};

export default function App() {
  const [mode, setMode] = useState("free");
  const [windows, setWindows] = useState(SAMPLE_WINDOWS);
  const [order, setOrder] = useState(SAMPLE_WINDOWS.map((w) => w.id));
  const [zCounter, setZCounter] = useState(10);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [favoriteName, setFavoriteName] = useState("");
  const [interaction, setInteraction] = useState(null);
  const [dragGhost, setDragGhost] = useState(null);

  const desktopRef = useRef(null);
  const windowRefs = useRef({});

  const bringToFront = useCallback(
    (id) => {
      setZCounter((prev) => {
        const next = prev + 1;
        setWindows((current) =>
          current.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w))
        );
        return next;
      });
    },
    [setWindows]
  );

  const updateWindow = useCallback((id, patch) => {
    setWindows((current) =>
      current.map((w) => (w.id === id ? { ...w, ...patch } : w))
    );
  }, []);

  const openWindows = useMemo(
    () => windows.filter((w) => !w.closed),
    [windows]
  );

  const visibleWindows = useMemo(() => getVisibleWindows(windows), [windows]);

  const gridColumns = 6;

  const saveFavorite = () => {
    const name = favoriteName.trim() || `Layout ${favorites.length + 1}`;
    const payload = {
      id: `${Date.now()}`,
      name,
      mode,
      order,
      zCounter,
      windows: windows.map((w) => ({
        id: w.id,
        x: w.x,
        y: w.y,
        width: w.width,
        height: w.height,
        z: w.z,
        minimized: w.minimized,
        closed: w.closed,
        gridColSpan: w.gridColSpan,
        gridRowSpan: w.gridRowSpan,
      })),
    };
    const next = [payload, ...favorites].slice(0, 8);
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setFavoriteName("");
  };

  const loadFavorite = (fav) => {
    setMode(fav.mode || "free");
    setOrder(fav.order || []);
    setZCounter(fav.zCounter || 10);
    setWindows((current) => {
      const map = new Map(fav.windows.map((w) => [w.id, w]));
      return current.map((w) => ({ ...w, ...(map.get(w.id) || {}) }));
    });
  };

  const restoreWindow = (id) => {
    updateWindow(id, { minimized: false, closed: false });
    bringToFront(id);
  };

  const closeWindow = (id) => updateWindow(id, { closed: true, minimized: false });
  const minimizeWindow = (id) => updateWindow(id, { minimized: true });

  const startDrag = (e, win) => {
    if (e.button !== 0) return;
    bringToFront(win.id);
    const desktopRect = desktopRef.current?.getBoundingClientRect();
    if (!desktopRect) return;

    const rect = windowRefs.current[win.id]?.getBoundingClientRect();

    setInteraction({
      type: "drag",
      id: win.id,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: win.x,
      startTop: win.y,
      rect,
      desktopRect,
      lastSwapTarget: null,
    });

    if (mode === "grid" && rect) {
      setDragGhost({
        id: win.id,
        left: rect.left - desktopRect.left,
        top: rect.top - desktopRect.top,
        width: rect.width,
        height: rect.height,
      });
    }
    e.preventDefault();
  };

  const startResize = (e, win, handle = "se") => {
    if (e.button !== 0) return;
    bringToFront(win.id);
    const desktopRect = desktopRef.current?.getBoundingClientRect();
    if (!desktopRect) return;

    setInteraction({
      type: "resize",
      id: win.id,
      mode,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: win.width,
      startHeight: win.height,
      startLeft: win.x,
      startTop: win.y,
      desktopRect,
    });
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (!interaction) return;

    const onMove = (e) => {
      const dx = e.clientX - interaction.startX;
      const dy = e.clientY - interaction.startY;
      const areaW = interaction.desktopRect.width;
      const areaH = interaction.desktopRect.height;

      if (interaction.type === "drag") {
        if (interaction.mode === "free") {
          setWindows((current) =>
            current.map((w) => {
              if (w.id !== interaction.id) return w;
              const maxX = areaW - w.width;
              const maxY = areaH - w.height;
              return {
                ...w,
                x: clamp(interaction.startLeft + dx, 0, Math.max(0, maxX)),
                y: clamp(interaction.startTop + dy, 0, Math.max(0, maxY)),
              };
            })
          );
        } else {
          const x = interaction.rect.left - interaction.desktopRect.left + dx;
          const y = interaction.rect.top - interaction.desktopRect.top + dy;
          setDragGhost((prev) => (prev ? { ...prev, left: x, top: y } : prev));

          // Detect hovered grid card and swap order.
          const pointerX = e.clientX;
          const pointerY = e.clientY;
          const candidates = visibleWindows.filter((w) => w.id !== interaction.id);
          let target = null;
          for (const c of candidates) {
            const r = windowRefs.current[c.id]?.getBoundingClientRect();
            if (
              r &&
              pointerX >= r.left &&
              pointerX <= r.right &&
              pointerY >= r.top &&
              pointerY <= r.bottom
            ) {
              target = c.id;
              break;
            }
          }

          if (target && target !== interaction.lastSwapTarget) {
            setOrder((prev) => {
              const next = [...prev];
              const a = next.indexOf(interaction.id);
              const b = next.indexOf(target);
              if (a === -1 || b === -1) return prev;
              [next[a], next[b]] = [next[b], next[a]];
              return next;
            });
            setInteraction((prev) => ({ ...prev, lastSwapTarget: target }));
          }
        }
      }

      if (interaction.type === "resize") {
        setWindows((current) =>
          current.map((w) => {
            if (w.id !== interaction.id) return w;
            let width = interaction.startWidth;
            let height = interaction.startHeight;
            let x = interaction.startLeft;
            let y = interaction.startTop;

            const handles = handleMap[interaction.handle] || ["s", "e"];

            if (handles.includes("e")) {
              width = clamp(
                interaction.startWidth + dx,
                MIN_W,
                areaW - interaction.startLeft
              );
            }
            if (handles.includes("s")) {
              height = clamp(
                interaction.startHeight + dy,
                MIN_H,
                areaH - interaction.startTop
              );
            }
            if (handles.includes("w")) {
              const rawWidth = interaction.startWidth - dx;
              width = clamp(rawWidth, MIN_W, interaction.startLeft + interaction.startWidth);
              x = clamp(
                interaction.startLeft + dx,
                0,
                interaction.startLeft + interaction.startWidth - MIN_W
              );
            }
            if (handles.includes("n")) {
              const rawHeight = interaction.startHeight - dy;
              height = clamp(rawHeight, MIN_H, interaction.startTop + interaction.startHeight);
              y = clamp(
                interaction.startTop + dy,
                0,
                interaction.startTop + interaction.startHeight - MIN_H
              );
            }

            if (interaction.mode === "grid") {
              // In grid mode, width/height map to spans and grid auto-reflows.
              const approxCol = clamp(Math.round(width / 150), 1, gridColumns);
              const approxRow = clamp(Math.round(height / 120), 1, 4);
              return {
                ...w,
                width,
                height,
                gridColSpan: approxCol,
                gridRowSpan: approxRow,
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

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [interaction, visibleWindows, gridColumns]);

  const sortedFreeWindows = [...visibleWindows].sort((a, b) => a.z - b.z);
  const orderedGrid = order
    .map((id) => windows.find((w) => w.id === id))
    .filter((w) => w && !w.closed && !w.minimized);

  return (
    <div className="desktop-shell">
      {/* Single-file CSS for easy copy/paste */}
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root, .desktop-shell { margin: 0; height: 100%; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; }
        .desktop-shell {
          background: radial-gradient(circle at 20% 20%, #1f2937, #111827 45%, #0b1020);
          color: #e5e7eb;
          overflow: hidden;
        }
        .desktop-main {
          position: relative;
          height: calc(100% - ${TASKBAR_HEIGHT}px);
          margin-right: ${SIDEBAR_WIDTH}px;
          overflow: hidden;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .sidebar {
          position: absolute;
          right: 0;
          top: 0;
          width: ${SIDEBAR_WIDTH}px;
          height: calc(100% - ${TASKBAR_HEIGHT}px);
          background: rgba(17,24,39,0.62);
          backdrop-filter: blur(10px);
          border-left: 1px solid rgba(255,255,255,0.12);
          padding: 14px;
          overflow: auto;
        }
        .sidebar h3 { margin-top: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8; }
        .sidebar-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); padding: 10px; border-radius: 12px; margin-bottom: 10px; font-size: 13px; }

        .taskbar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: ${TASKBAR_HEIGHT}px;
          background: rgba(17,24,39,0.88);
          backdrop-filter: blur(14px);
          border-top: 1px solid rgba(255,255,255,0.16);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 8px 12px;
        }
        .mode-buttons button, .window-button, .mini-btn, .fav-btn {
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
          color: #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
        }
        .mode-buttons button { padding: 6px 10px; margin-right: 8px; }
        .mode-buttons button.active { background: rgba(59,130,246,0.45); border-color: rgba(96,165,250,0.65); }
        .window-list { display: flex; gap: 8px; overflow: auto; }
        .window-button { padding: 6px 10px; white-space: nowrap; }
        .window-button.minimized { opacity: 0.65; }
        .favorite-controls { display: flex; gap: 8px; align-items: center; }
        .favorite-controls input {
          background: rgba(255,255,255,0.05);
          color: #f9fafb;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 8px;
          padding: 7px 9px;
          width: 150px;
        }
        .fav-btn { padding: 7px 10px; }

        .window {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(15,23,42,0.92), rgba(15,23,42,0.86));
          box-shadow: 0 14px 35px rgba(0,0,0,0.35);
          overflow: hidden;
          transition: left 260ms ease, top 260ms ease, width 260ms ease, height 260ms ease, transform 120ms ease;
          user-select: none;
        }
        .window.dragging { transform: scale(1.01); }
        .window-titlebar {
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          font-size: 13px;
          background: rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          cursor: grab;
        }
        .window-title { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .mode-chip { font-size: 10px; border: 1px solid rgba(255,255,255,0.26); border-radius: 12px; padding: 1px 6px; opacity: 0.85; }
        .title-actions { display: flex; gap: 6px; }
        .mini-btn { width: 24px; height: 24px; font-weight: 700; }
        .window-content {
          padding: 12px;
          height: calc(100% - 36px);
          overflow: auto;
          font-size: 14px;
          color: #d1d5db;
        }
        .terminal-body { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; }

        .resize-handle {
          position: absolute;
          background: transparent;
          z-index: 4;
        }
        .resize-handle:hover { background: rgba(96,165,250,0.2); }
        .resize-se { right: 0; bottom: 0; width: 16px; height: 16px; cursor: nwse-resize; }
        .resize-e { right: 0; top: 14px; bottom: 14px; width: 8px; cursor: ew-resize; }
        .resize-w { left: 0; top: 14px; bottom: 14px; width: 8px; cursor: ew-resize; }
        .resize-n { left: 14px; right: 14px; top: 0; height: 8px; cursor: ns-resize; }
        .resize-s { left: 14px; right: 14px; bottom: 0; height: 8px; cursor: ns-resize; }
        .resize-ne { top: 0; right: 0; width: 14px; height: 14px; cursor: nesw-resize; }
        .resize-nw { top: 0; left: 0; width: 14px; height: 14px; cursor: nwse-resize; }
        .resize-sw { bottom: 0; left: 0; width: 14px; height: 14px; cursor: nesw-resize; }

        .grid-wrap {
          display: grid;
          grid-template-columns: repeat(${gridColumns}, minmax(0, 1fr));
          grid-auto-rows: 120px;
          gap: 12px;
          padding: 12px;
          height: 100%;
          overflow: auto;
        }
        .window-grid {
          position: relative;
          min-height: 0;
          transition: transform 220ms ease, width 220ms ease, height 220ms ease;
        }
        .grid-drag-ghost {
          position: absolute;
          border: 2px dashed rgba(96,165,250,0.85);
          border-radius: 14px;
          pointer-events: none;
          background: rgba(59,130,246,0.12);
          z-index: 999;
        }
      `}</style>

      <div className="desktop-main" ref={desktopRef}>
        {mode === "free" &&
          sortedFreeWindows.map((w) => (
            <div
              key={w.id}
              ref={(el) => (windowRefs.current[w.id] = el)}
              className={`window ${interaction?.id === w.id ? "dragging" : ""}`}
              onMouseDown={() => bringToFront(w.id)}
              style={{
                left: w.x,
                top: w.y,
                width: w.width,
                height: w.height,
                zIndex: w.z,
              }}
            >
              <div className="window-titlebar" onMouseDown={(e) => startDrag(e, w)}>
                <div className="window-title">
                  {w.title}
                  <span className="mode-chip">FREE</span>
                </div>
                <div className="title-actions">
                  <button className="mini-btn" onClick={() => minimizeWindow(w.id)}>
                    —
                  </button>
                  <button className="mini-btn" onClick={() => closeWindow(w.id)}>
                    ×
                  </button>
                </div>
              </div>
              <div className="window-content">{w.content}</div>

              {/* Free mode: resize from every edge and corner */}
              {Object.keys(handleMap).map((handle) => (
                <div
                  key={handle}
                  className={`resize-handle resize-${handle}`}
                  onMouseDown={(e) => startResize(e, w, handle)}
                />
              ))}
            </div>
          ))}

        {mode === "grid" && (
          <div className="grid-wrap">
            {orderedGrid.map((w) => (
              <div
                key={w.id}
                ref={(el) => (windowRefs.current[w.id] = el)}
                className="window window-grid"
                onMouseDown={() => bringToFront(w.id)}
                style={{
                  gridColumn: `span ${clamp(w.gridColSpan || 2, 1, gridColumns)}`,
                  gridRow: `span ${clamp(w.gridRowSpan || 1, 1, 4)}`,
                  zIndex: w.z,
                }}
              >
                <div className="window-titlebar" onMouseDown={(e) => startDrag(e, w)}>
                  <div className="window-title">
                    {w.title}
                    <span className="mode-chip">GRID</span>
                  </div>
                  <div className="title-actions">
                    <button className="mini-btn" onClick={() => minimizeWindow(w.id)}>
                      —
                    </button>
                    <button className="mini-btn" onClick={() => closeWindow(w.id)}>
                      ×
                    </button>
                  </div>
                </div>
                <div className="window-content">{w.content}</div>

                {/* Grid mode: keep a corner resize handle. Reflow is done via updated spans. */}
                <div
                  className="resize-handle resize-se"
                  onMouseDown={(e) => startResize(e, w, "se")}
                />
              </div>
            ))}

            {dragGhost && <div className="grid-drag-ghost" style={dragGhost} />}
          </div>
        )}
      </div>

      <aside className="sidebar">
        <h3>Open Windows</h3>
        {openWindows.map((w) => (
          <div className="sidebar-card" key={`side-${w.id}`}>
            <strong>{w.title}</strong>
            <div>Status: {w.minimized ? "Minimized" : "Visible"}</div>
            <div>Size: {Math.round(w.width)}×{Math.round(w.height)}</div>
          </div>
        ))}

        <h3>Favorites</h3>
        {favorites.length === 0 && <div className="sidebar-card">No saved favorites yet.</div>}
        {favorites.map((f) => (
          <button key={f.id} className="fav-btn" style={{ display: "block", width: "100%", marginBottom: 8 }} onClick={() => loadFavorite(f)}>
            {f.name}
          </button>
        ))}
      </aside>

      <footer className="taskbar">
        <div className="mode-buttons">
          <button
            className={mode === "free" ? "active" : ""}
            onClick={() => setMode("free")}
          >
            Free Mode
          </button>
          <button
            className={mode === "grid" ? "active" : ""}
            onClick={() => setMode("grid")}
          >
            Grid Mode
          </button>
        </div>

        <div className="window-list">
          {windows.map((w) => (
            <button
              key={`task-${w.id}`}
              className={`window-button ${w.minimized || w.closed ? "minimized" : ""}`}
              onClick={() => restoreWindow(w.id)}
            >
              {w.closed ? `↺ ${w.title}` : w.minimized ? `▢ ${w.title}` : w.title}
            </button>
          ))}
        </div>

        <div className="favorite-controls">
          <input
            value={favoriteName}
            onChange={(e) => setFavoriteName(e.target.value)}
            placeholder="Favorite name"
          />
          <button className="fav-btn" onClick={saveFavorite}>
            Save Layout
          </button>
        </div>
      </footer>
    </div>
  );
}
