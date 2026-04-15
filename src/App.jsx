import React from 'react';
import Desktop from './components/Desktop';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import { CustomsDataProvider, useCustomsData } from './context/CustomsDataContext';
import { useWindowManager } from './hooks/useWindowManager';

function AppShell() {
  const { snapshot, restoreSnapshot } = useCustomsData();
  const manager = useWindowManager(snapshot, restoreSnapshot);

  return (
    <div className="app-frame">
      <Desktop manager={manager} />
      <Sidebar manager={manager} />
      <Taskbar manager={manager} />
    </div>
  );
}

export default function App() {
  return (
    <CustomsDataProvider>
      <AppShell />
    </CustomsDataProvider>
  );
}
