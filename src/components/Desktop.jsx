import React from 'react';
import Window from './Window';
import { CargoWindow, DriverWindow, ScalingWindow, TaxWindow } from '../windows';
import {
  DriversTableWindow,
  InspectionsTableWindow,
  PaymentsTableWindow,
  ShipmentsTableWindow,
} from '../windows/TableWindows';

const desktopOneContentMap = (readOnly) => ({
  scaling: <ScalingWindow readOnly={readOnly} />,
  driver: <DriverWindow readOnly={readOnly} />,
  cargo: <CargoWindow readOnly={readOnly} />,
  tax: <TaxWindow readOnly={readOnly} />,
});

const desktopTwoContentMap = {
  scaling: <ShipmentsTableWindow />,
  driver: <DriversTableWindow />,
  cargo: <InspectionsTableWindow />,
  tax: <PaymentsTableWindow />,
};

function Desktop({ manager, activeDesktop, readOnly = false }) {
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
  const contentMap = activeDesktop === 'desktop-2' ? desktopTwoContentMap : desktopOneContentMap(readOnly);

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
            {contentMap[windowState.id]}
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
              {contentMap[windowState.id]}
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
