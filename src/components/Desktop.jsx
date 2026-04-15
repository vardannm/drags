import React from 'react';
import Window from './Window';

function Desktop({ manager, contentMap }) {
  const {
    mode,
    desktopRef,
    windowRefs,
    sortedFreeWindows,
    orderedGridWindows,
    dragGhost,
    interaction,
    gridColumns,
    bringToFront,
    startDrag,
    startResize,
    minimizeWindow,
    closeWindow,
  } = manager;

  return (
    <section className="desktop-area" ref={desktopRef}>
      {mode === 'free' &&
        sortedFreeWindows.map((windowState) => (
          <Window
            key={windowState.id}
            windowState={windowState}
            mode={mode}
            gridColumns={gridColumns}
            onFocus={bringToFront}
            onDragStart={startDrag}
            onResizeStart={startResize}
            onMinimize={minimizeWindow}
            onClose={closeWindow}
            windowRef={(node) => {
              windowRefs.current[windowState.id] = node;
            }}
          >
            {contentMap[windowState.id] || <div>Missing window content.</div>}
          </Window>
        ))}

      {mode === 'grid' && (
        <div className="grid-canvas">
          {orderedGridWindows.map((windowState) => (
            <Window
              key={windowState.id}
              windowState={windowState}
              mode={mode}
              gridColumns={gridColumns}
              onFocus={bringToFront}
              onDragStart={startDrag}
              onResizeStart={startResize}
              onMinimize={minimizeWindow}
              onClose={closeWindow}
              windowRef={(node) => {
                windowRefs.current[windowState.id] = node;
              }}
            >
              {contentMap[windowState.id] || <div>Missing window content.</div>}
            </Window>
          ))}
          {dragGhost && <div className="drag-ghost" style={dragGhost} />}
        </div>
      )}

      {interaction && <div className="interaction-hint">Dragging / Resizing…</div>}
    </section>
  );
}

export default Desktop;
