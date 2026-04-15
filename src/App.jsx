import React, { useEffect, useState } from 'react';
import Desktop from './components/Desktop';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import { CustomsDataProvider, useCustomsData } from './context/CustomsDataContext';
import { useWindowManager } from './hooks/useWindowManager';
import { STORAGE_KEYS } from './utils/layoutUtils';

function AppShell() {
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEYS.token) || '');
  const { snapshot, restoreSnapshot } = useCustomsData();

  const manager = useWindowManager(snapshot, restoreSnapshot, token);

  useEffect(() => {
    if (token) {
      manager.fetchBackendFavorites();
    }
  }, [token, manager.fetchBackendFavorites]);

  return (
    <div className="app-frame">
      <Desktop manager={manager} />
      <Sidebar manager={manager} token={token} onTokenChange={setToken} />
      <Taskbar manager={manager} token={token} />
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
