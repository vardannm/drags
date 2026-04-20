import React, { useEffect, useMemo, useState } from 'react';

import Desktop from './components/Desktop';
import MainLayout from './components/MainLayout';
import Sidebar from './components/Sidebar';
import Taskbar from './components/Taskbar';
import TransportTablePage from './components/TransportTablePage';
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
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem(STORAGE_KEYS.token)));
  const [authForm, setAuthForm] = useState({ email: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');
  const manager = useWindowManager(snapshot, restoreSnapshot, token);
  const { fetchBackendFavorites, fetchAndApplyCurrentState, pushCurrentState, clearBackendFavorites, mode, order, windows } =
    manager;
  const [activeDesktop, setActiveDesktop] = useState('desktop-1');
  const [theme, setTheme] = useState('default');
  const [customTheme, setCustomTheme] = useState(initialCustomTheme);
  const [currentScreen, setCurrentScreen] = useState('transport-list');
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [detailMode, setDetailMode] = useState('view');

  const login = async () => {
    setAuthMessage('');
    try {
      const data = await loginUser(authForm);
      localStorage.setItem(STORAGE_KEYS.token, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ email: '', password: '' });
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
        setAuthLoading(false);
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
      } finally {
        setAuthLoading(false);
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

  const canSubmitLogin = authForm.email.trim() && authForm.password;

  const pageName = useMemo(() => {
    if (currentScreen === 'transport-list') return 'Տրանսպորտ. միջոցներ';
    if (!selectedTransport) return 'Տրանսպորտ. միջոցներ';
    return detailMode === 'view'
      ? `Տրանսպորտ. միջոցներ / ${selectedTransport.id} / Դիտում`
      : `Տրանսպորտ. միջոցներ / ${selectedTransport.id} / Խմբագրում`;
  }, [currentScreen, selectedTransport, detailMode]);

  const isReadOnlyMode = detailMode === 'view';

  if (authLoading) {
    return (
      <div className="login-screen" data-theme={theme} style={frameStyle}>
        <div className="login-card">
          <h1>Border Customs Dashboard</h1>
          <p>Checking your session...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="login-screen" data-theme={theme} style={frameStyle}>
        <form
          className="login-card"
          onSubmit={(event) => {
            event.preventDefault();
            if (!canSubmitLogin) return;
            login();
          }}
        >
          <h1>Border Customs Dashboard</h1>
          <p>Sign in with your backend credentials.</p>
          <input
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            value={authForm.password}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          <button type="submit" disabled={!canSubmitLogin}>
            Login
          </button>
          {authMessage && <small>{authMessage}</small>}
        </form>
      </div>
    );
  }

  return (
    <div className="app-frame" data-theme={theme} style={frameStyle}>
      <MainLayout user={user} onLogout={logout} pageName={pageName} selectedOperation="Տրանսպորտ. միջոցներ">
        {currentScreen === 'transport-list' && (
          <TransportTablePage
            onOpen={(row, nextMode) => {
              setSelectedTransport(row);
              setDetailMode(nextMode);
              setCurrentScreen('transport-detail');
            }}
          />
        )}

        {currentScreen === 'transport-detail' && (
          <>
            <div className="transport-detail-header">
              <button type="button" className="ghost-btn" onClick={() => setCurrentScreen('transport-list')}>
                ← Back to list
              </button>
              <div>
                Record: <strong>{selectedTransport?.id}</strong> ({selectedTransport?.plate})
              </div>
              <button
                type="button"
                className="ghost-btn"
                onClick={() => setDetailMode((prev) => (prev === 'view' ? 'edit' : 'view'))}
              >
                {isReadOnlyMode ? 'Switch to edit' : 'Switch to view'}
              </button>
            </div>

            <Desktop manager={manager} activeDesktop={activeDesktop} readOnly={isReadOnlyMode} />
            <Sidebar
              manager={manager}
              theme={theme}
              setTheme={setTheme}
              customTheme={customTheme}
              setCustomTheme={setCustomTheme}
              readOnly={isReadOnlyMode}
            />
            <Taskbar
              manager={manager}
              activeDesktop={activeDesktop}
              onDesktopChange={setActiveDesktop}
              token={token}
            />
          </>
        )}
      </MainLayout>
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
