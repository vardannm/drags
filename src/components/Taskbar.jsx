import React from 'react';
import FavoriteManager from './FavoriteManager';

function Taskbar({ manager, token, activeDesktop, onDesktopSwitch }) {
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

      <div className="taskbar-right">
        <div className="mode-switch desktop-switch">
          <button className={activeDesktop === 'operations' ? 'active' : ''} onClick={() => onDesktopSwitch('operations')}>
            Desktop 1
          </button>
          <button className={activeDesktop === 'documents' ? 'active' : ''} onClick={() => onDesktopSwitch('documents')}>
            Desktop 2
          </button>
        </div>
        <FavoriteManager manager={manager} token={token} />
      </div>
    </footer>
  );
}

export default Taskbar;
