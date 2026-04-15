import React from 'react';
import FavoriteManager from './FavoriteManager';

function Taskbar({ manager }) {
  const { mode, setMode, windows, restoreWindow } = manager;

  return (
    <footer className="taskbar">
      <div className="mode-switch">
        <button className={mode === 'free' ? 'active' : ''} onClick={() => setMode('free')}>
          Free Mode
        </button>
        <button className={mode === 'grid' ? 'active' : ''} onClick={() => setMode('grid')}>
          Grid Mode
        </button>
      </div>

      <div className="task-windows">
        {windows.map((windowState) => (
          <button
            key={windowState.id}
            className={windowState.minimized || windowState.closed ? 'muted' : ''}
            onClick={() => restoreWindow(windowState.id)}
          >
            {windowState.closed ? `↺ ${windowState.title}` : windowState.title}
          </button>
        ))}
      </div>

      <FavoriteManager manager={manager} />
    </footer>
  );
}

export default Taskbar;
