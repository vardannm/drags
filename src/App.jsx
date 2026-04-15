import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import { CustomsDataProvider, useCustomsData } from './context/CustomsDataContext';
import { useWindowManager } from './hooks/useWindowManager';

const initialCustomTheme = {
  bgStart: '#1a1027',
  bgMid: '#121d3d',
  bgEnd: '#070c17',
  panel: '#101b30',
  text: '#e6f0ff',
  accent: '#f43f5e',
};

function AppShell() {
  const { snapshot, restoreSnapshot } = useCustomsData();
  const manager = useWindowManager(snapshot, restoreSnapshot);
  const [activeDesktop, setActiveDesktop] = useState('desktop-1');
  const [theme, setTheme] = useState('default');
  const [customTheme, setCustomTheme] = useState(initialCustomTheme);

  const frameStyle =
    theme === 'custom'
      ? {
          '--bg-start': customTheme.bgStart,
          '--bg-mid': customTheme.bgMid,
          '--bg-end': customTheme.bgEnd,
          '--panel-bg': customTheme.panel,
          '--text-color': customTheme.text,
          '--accent-color': customTheme.accent,
        }
      : undefined;

  return (
    <div className="app-frame" data-theme={theme} style={frameStyle}>
      <Desktop manager={manager} activeDesktop={activeDesktop} />
      <Sidebar
        manager={manager}
        theme={theme}
        setTheme={setTheme}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
      />
      <Taskbar
        manager={manager}
        activeDesktop={activeDesktop}
        onDesktopChange={setActiveDesktop}
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
