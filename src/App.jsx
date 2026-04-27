import React, { useEffect, useMemo, useState } from 'react';

import MainLayout from './components/MainLayout';
import TransportDetailScreen from './components/TransportDetailScreen';
import TransportListScreen from './components/TransportListScreen';
import { CustomsDataProvider } from './context/CustomsDataContext';
import { useCustomsData } from './context/useCustomsData';
import { useWindowManager } from './hooks/useWindowManager';
import { STORAGE_KEYS } from './utils/layoutUtils';
import { getMe, loginUser } from './utils/api';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SecurityCamera from './components/SecurityCamera';

const initialCustomTheme = {
  bgStart: '#1a1027',
  bgMid: '#121d3d',
  bgEnd: '#070c17',
  panel: '#101b30',
  text: '#e6f0ff',
  accent: '#f43f5e',
};

const transportPageNames = {
  all: 'Ընդհանուր տրասպորտային միջոցներ',
  truck: 'Բեռնատար տրասպորտային միջոցներ',
  pedestrian: 'Ուղևոր',
  passenger: 'մարդատար տրասպորտային միջոցներ',
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
  const [customTheme] = useState(initialCustomTheme);
  const [transportCategory, setTransportCategory] = useState('all');
  const [desktopLayouts, setDesktopLayouts] = useState({});
  const location = useLocation();

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


  useEffect(() => {
    setDesktopLayouts((prev) => {
      const current = prev[activeDesktop] || {};
      const nextForDesktop = {
        mode,
        order,
        windows,
      };

      if (
        current.mode === nextForDesktop.mode &&
        current.order === nextForDesktop.order &&
        current.windows === nextForDesktop.windows
      ) {
        return prev;
      }

      return {
        ...prev,
        [activeDesktop]: nextForDesktop,
      };
    });
  }, [activeDesktop, mode, order, windows]);

  useEffect(() => {
    const desktopOne = desktopLayouts['desktop-1'];
    if (desktopOne) return;

    setDesktopLayouts((prev) => ({
      ...prev,
      'desktop-1': {
        mode,
        order,
        windows,
      },
      'desktop-2': {
        mode,
        order,
        windows: windows.map((windowState, index) => ({
          ...windowState,
          x: Math.max(16, windowState.x + 80 + index * 10),
          y: Math.max(16, windowState.y + 30 + index * 6),
        })),
      },
    }));
  }, [desktopLayouts, mode, order, windows]);

  const handleDesktopChange = (nextDesktop) => {
    if (nextDesktop === activeDesktop) return;

    const currentPayload = {
      mode,
      order,
      windows,
    };

    const targetPayload = desktopLayouts[nextDesktop];

    setDesktopLayouts((prev) => ({
      ...prev,
      [activeDesktop]: currentPayload,
    }));

    if (targetPayload) {
      manager.applyPayload(targetPayload);
    }

    setActiveDesktop(nextDesktop);
  };

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
    const detailState = location.state || {};
    if (location.pathname === '/transport') {
      return transportPageNames[transportCategory] || transportPageNames.all;
    }
    if (location.pathname === '/security-cameras') {
      return 'Տեսախցիկներ';
    }
    if (location.pathname === '/transport/detail') {
      if (!detailState.transport) return 'Տրանսպորտ. միջոցներ';
      return detailState.mode === 'view'
        ? `Տրանսպորտ. միջոցներ / ${detailState.transport.id} / Դիտում`
        : `Տրանսպորտ. միջոցներ / ${detailState.transport.id} / Խմբագրում`;
    }
    return 'Տրանսպորտ. միջոցներ';
  }, [location.pathname, location.state, transportCategory]);

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
      <MainLayout
        user={user}
        onLogout={logout}
        pageName={pageName}
        selectedOperation="Տրանսպորտ. միջոցներ"
        theme={theme}
        setTheme={setTheme}
      >
        <Routes>
          <Route
            path="/transport"
            element={
              <TransportListScreen
                transportCategory={transportCategory}
                onCategoryChange={setTransportCategory}
              />
            }
          />
          <Route
            path="/transport/detail"
            element={
              <TransportDetailScreen
                manager={manager}
                activeDesktop={activeDesktop}
                onDesktopChange={handleDesktopChange}
                token={token}
              />
            }
          />
          <Route path="/security-cameras" element={
            <SecurityCamera />
          } />
          <Route path="*" element={<Navigate to="/transport" replace />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomsDataProvider>
        <AppShell />
      </CustomsDataProvider>
    </BrowserRouter>
  );
}
