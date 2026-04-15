import React, { useEffect, useState } from 'react';
import Desktop from './components/Desktop';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import TopNav from './components/TopNav';
import { CustomsDataProvider } from './context/CustomsDataContext';
import { useCustomsData } from './context/useCustomsData';
import { useWindowManager } from './hooks/useWindowManager';
import { STORAGE_KEYS } from './utils/layoutUtils';
import { getMe, loginUser } from './utils/api';

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
  const [token, setToken] = useState(localStorage.getItem(STORAGE_KEYS.token) || '');
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');
  const manager = useWindowManager(snapshot, restoreSnapshot, token);
  const {
    fetchBackendFavorites,
    fetchAndApplyCurrentState,
    pushCurrentState,
    clearBackendFavorites,
    mode,
    order,
    windows,
  } = manager;
  const [activeDesktop, setActiveDesktop] = useState('desktop-1');
  const [theme, setTheme] = useState('default');
  const [customTheme, setCustomTheme] = useState(initialCustomTheme);

  const login = async () => {
    setAuthMessage('');
    try {
      const data = await loginUser(authForm);
      localStorage.setItem(STORAGE_KEYS.token, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthMessage(`Welcome ${data.user.name}`);
    } catch (error) {
      setAuthMessage(error.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    setToken('');
    setUser(null);
    setAuthMessage('Logged out');
    clearBackendFavorites();
  };

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const me = await getMe(token);
        setUser(me.user);
        await fetchBackendFavorites();
        await fetchAndApplyCurrentState();
      } catch {
        localStorage.removeItem(STORAGE_KEYS.token);
        setToken('');
      }
    };

    bootstrap();
  }, [token, fetchAndApplyCurrentState, fetchBackendFavorites]);

  useEffect(() => {
    if (!token) return;

    const timeout = setTimeout(() => {
      pushCurrentState().catch(() => {});
    }, 800);

    return () => clearTimeout(timeout);
  }, [token, mode, order, windows, snapshot, pushCurrentState]);

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
      <TopNav user={user} onLogout={logout} />
      <Desktop manager={manager} activeDesktop={activeDesktop} />
      <Sidebar
        manager={manager}
        theme={theme}
        setTheme={setTheme}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
        token={token}
        authForm={authForm}
        setAuthForm={setAuthForm}
        authMessage={authMessage}
        onLogin={login}
      />
      <Taskbar
        manager={manager}
        activeDesktop={activeDesktop}
        onDesktopChange={setActiveDesktop}
        token={token}
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
