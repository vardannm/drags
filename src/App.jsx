import React, { useEffect, useMemo, useState } from 'react';
import Desktop from './components/Desktop';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import { CustomsDataProvider, useCustomsData } from './context/CustomsDataContext';
import { useWindowManager } from './hooks/useWindowManager';
import { STORAGE_KEYS, createDocumentsWindows, createInitialWindows } from './utils/layoutUtils';
import {
  CargoWindow,
  DriverWindow,
  ImportsWindow,
  InspectionWindow,
  PaymentsWindow,
  ScalingWindow,
  TaxWindow,
} from './windows';

const initialDocsState = {
  imports: [],
  inspections: [
    { id: 'in-1', vehicle: 'TRK-2291', driver: 'M. Kovacs', status: 'Pending', passed: false },
    { id: 'in-2', vehicle: 'AZ-7784', driver: 'D. Reyes', status: 'Passed', passed: true },
  ],
  payments: [
    { id: 'P-1001', company: 'TransGlobal Ltd', amount: 1240, method: 'Bank Transfer', state: 'Completed' },
    { id: 'P-1002', company: 'Cargo One', amount: 680, method: 'Card', state: 'Pending' },
  ],
};

function AppShell() {
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEYS.token) || '');
  const [activeDesktop, setActiveDesktop] = useState('operations');
  const { snapshot, restoreSnapshot } = useCustomsData();

  const [docsData, setDocsData] = useState(initialDocsState);

  const operationsManager = useWindowManager({
    customsSnapshot: { ...snapshot, desktopKey: 'operations' },
    restoreCustomsSnapshot: restoreSnapshot,
    token,
    desktopKey: 'operations',
    initialWindows: createInitialWindows,
  });

  const documentsManager = useWindowManager({
    customsSnapshot: { ...docsData, desktopKey: 'documents' },
    restoreCustomsSnapshot: (payload) => payload && setDocsData(payload),
    token,
    desktopKey: 'documents',
    initialWindows: createDocumentsWindows,
  });

  const activeManager = activeDesktop === 'operations' ? operationsManager : documentsManager;

  const operationsContentMap = useMemo(
    () => ({
      scaling: <ScalingWindow />,
      driver: <DriverWindow />,
      cargo: <CargoWindow />,
      tax: <TaxWindow />,
    }),
    []
  );

  const documentsContentMap = {
    imports: <ImportsWindow docsData={docsData} setDocsData={setDocsData} />,
    inspection: <InspectionWindow docsData={docsData} setDocsData={setDocsData} />,
    payments: <PaymentsWindow docsData={docsData} />,
  };

  useEffect(() => {
    if (token) {
      operationsManager.fetchBackendFavorites();
      documentsManager.fetchBackendFavorites();
    }
  }, [token, operationsManager.fetchBackendFavorites, documentsManager.fetchBackendFavorites]);

  return (
    <div className="app-frame light-mode">
      <Desktop
        manager={activeManager}
        contentMap={activeDesktop === 'operations' ? operationsContentMap : documentsContentMap}
      />
      <Sidebar
        manager={activeManager}
        token={token}
        onTokenChange={setToken}
        activeDesktop={activeDesktop}
        docsData={docsData}
      />
      <Taskbar
        manager={activeManager}
        token={token}
        activeDesktop={activeDesktop}
        onDesktopSwitch={setActiveDesktop}
      />
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
