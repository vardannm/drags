import React, { useEffect, useMemo, useState } from 'react';

import Desktop from './components/Desktop';
import MainLayout from './components/MainLayout';
import Sidebar from './components/Sidebar';
import TransportTablePage from './components/TransportTablePage';
import { CustomsDataProvider } from './context/CustomsDataContext';
import { useCustomsData } from './context/useCustomsData';
import { useWindowManager } from './hooks/useWindowManager';
import { STORAGE_KEYS } from './utils/layoutUtils';
import { getMe, loginUser } from './utils/api';
import { TbArrowsMaximize } from "react-icons/tb";
import { FaImage, FaScaleBalanced } from 'react-icons/fa6';
import { Button, Table } from 'react-bootstrap';

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
  const [customTheme] = useState(initialCustomTheme);
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
      <MainLayout
        user={user}
        onLogout={logout}
        pageName={pageName}
        selectedOperation="Տրանսպորտ. միջոցներ"
        theme={theme}
        setTheme={setTheme}
      >
        {currentScreen === 'transport-list' && (
          <TransportTablePage
            onOpen={(row, nextMode) => {
              setSelectedTransport(row);
              setDetailMode(nextMode);
              setCurrentScreen('transport-detail');
            }}
          />
        )}
        <div className="driver-data-actions">
        <Button
            variant="cs-blue"
            className="driver-data-action-btn"
          >
            Գրանցել
          </Button>
        <Button
            variant="cs-blue"
            className="driver-data-action-btn"
          >
            Ավարտել
          </Button>
        <Button
            variant="cs-blue"
            className="driver-data-action-btn"
            onClick={() => setCurrentScreen('transport-list')}
          >
            Փակել
          </Button>
        <Button
            variant="outline-cs-blue"
            className="driver-data-action-btn"
          >
            Հաստատել
          </Button>
        <Button
            variant="danger"
            className="driver-data-action-btn"
          >
            Գնահատել ռիսկերը
          </Button>
          </div>
 <Table className="mb-4 text-center  transport-rich-table" responsive size='sm'  striped bordered hover>
            <thead>
              <tr>
                <th colSpan={18}>
                Սահմանային հաշվառում
                </th>
              </tr>
            </thead>
            <tbody>
            
                <tr >
                  <td>
                    <div className="operations-col">
                      <button className='table-button' title="Խմբագրել" onClick={() => onOpen(row, 'edit')}>
                        <TbArrowsMaximize />
                      </button>
                    </div>
                  </td>
                  <td>{selectedTransport?.id}</td>
                  <td>{selectedTransport?.plate}</td>
                  <td>{selectedTransport?.type}</td> 
                  <td>{selectedTransport?.brand}</td>
                  <td>{selectedTransport?.vin}</td>
                  <td>{selectedTransport?.make}</td>
                  <td>{selectedTransport?.model}</td>
                  <td>{selectedTransport?.color}</td>
                  <td>{selectedTransport?.year}</td>
                  <td>{selectedTransport?.engineNumber}</td>
                  <td>{selectedTransport?.chassisNumber}</td>
                  <td>{selectedTransport?.ownerName}</td>
                  <td>{selectedTransport?.ownerNationality}</td>
                  <td>{selectedTransport?.ownerIdNumber}</td>
                  <td>00/00/0000</td>
                  <td>00/00/0000</td>
             
                  <td>
                    <button type="button" className="image-btn" title="Driver image">
                      <FaImage />
                    </button>
                  </td>
                </tr>
           

              
            </tbody>
          </Table>
          
        {currentScreen === 'transport-detail' && (
          <>
          
           
               
              
            

            <Desktop manager={manager} activeDesktop={activeDesktop} readOnly={isReadOnlyMode} />
            <Sidebar manager={manager} readOnly={isReadOnlyMode} activeDesktop={activeDesktop} onDesktopChange={setActiveDesktop} token={token} />
           
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
