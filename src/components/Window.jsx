import React from 'react';
import { handlesByType } from '../utils/layoutUtils';

function Window({
  windowState,
  mode,
  onFocus,
  onDragStart,
  onResizeStart,
  onMinimize,
  onClose,
  children,
  windowRef,
  gridColumns,
}) {
  const isGrid = mode === 'grid';

  return (
    <article
      ref={windowRef}
      className={`desktop-window ${isGrid ? 'grid' : 'free'}`}
      onMouseDown={() => onFocus(windowState.id)}
      style={
        isGrid
          ? {
              gridColumn: `span ${Math.min(gridColumns, windowState.gridColSpan || 2)}`,
              gridRow: `span ${windowState.gridRowSpan || 1}`,
              zIndex: windowState.z,
            }
          : {
              left: windowState.x,
              top: windowState.y,
              width: windowState.width,
              height: windowState.height,
              zIndex: windowState.z,
            }
      }
    >
      <header className="window-titlebar" onMouseDown={(event) => onDragStart(event, windowState)}>
        <div className="window-title">
          <span>{windowState.title}</span>
          <small>{isGrid ? 'GRID' : 'FREE'}</small>
        </div>
        <div className="window-actions">
          <button onClick={() => onMinimize(windowState.id)}>—</button>
          <button onClick={() => onClose(windowState.id)}>×</button>
        </div>
      </header>

      <div className="window-body">{children}</div>

      {(isGrid ? ['se'] : Object.keys(handlesByType)).map((handle) => (
        <div
          key={handle}
          className={`resize-handle resize-${handle}`}
          onMouseDown={(event) => onResizeStart(event, windowState, handle)}
        />
      ))}
    </article>
  );
}

export default Window;
