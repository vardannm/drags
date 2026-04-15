export const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

export const STORAGE_KEYS = {
  token: 'customs-auth-token',
  localFavorites: 'customs-local-layout-favorites',
};

export const createInitialWindows = () => [
  {
    id: 'scaling',
    title: 'Scaling Window',
    x: 24,
    y: 24,
    width: 360,
    height: 280,
    z: 1,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 2,
  },
  {
    id: 'driver',
    title: 'Driver Window',
    x: 260,
    y: 44,
    width: 420,
    height: 320,
    z: 2,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 2,
  },
  {
    id: 'cargo',
    title: 'Cargo Window',
    x: 690,
    y: 24,
    width: 450,
    height: 360,
    z: 3,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 2,
  },
  {
    id: 'tax',
    title: 'Tax & Payment',
    x: 140,
    y: 360,
    width: 460,
    height: 280,
    z: 4,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 2,
  },
];

export const createDocumentsWindows = () => [
  {
    id: 'imports',
    title: 'Imported PDFs',
    x: 32,
    y: 40,
    width: 520,
    height: 320,
    z: 1,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 2,
  },
  {
    id: 'inspection',
    title: 'Inspection Queue',
    x: 580,
    y: 48,
    width: 420,
    height: 300,
    z: 2,
    minimized: false,
    closed: false,
    gridColSpan: 2,
    gridRowSpan: 2,
  },
  {
    id: 'payments',
    title: 'Payment Ledger',
    x: 220,
    y: 380,
    width: 560,
    height: 280,
    z: 3,
    minimized: false,
    closed: false,
    gridColSpan: 3,
    gridRowSpan: 2,
  },
];

export const handlesByType = {
  n: ['n'],
  s: ['s'],
  e: ['e'],
  w: ['w'],
  ne: ['n', 'e'],
  nw: ['n', 'w'],
  se: ['s', 'e'],
  sw: ['s', 'w'],
};

export const normalizeWindowBounds = ({ windowState, desktopRect }) => {
  const maxX = desktopRect.width - windowState.width;
  const maxY = desktopRect.height - windowState.height;

  return {
    ...windowState,
    x: clamp(windowState.x, 0, Math.max(0, maxX)),
    y: clamp(windowState.y, 0, Math.max(0, maxY)),
  };
};

export const arraySwap = (arr, a, b) => {
  const next = [...arr];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
};
