import React, { useMemo, useState } from 'react';
import { useCustomsData } from '../context/CustomsDataContext';
import { STORAGE_KEYS } from '../utils/layoutUtils';

function Sidebar({ manager, token, onTokenChange, activeDesktop, docsData }) {
  const { driverData, cargoTotals, netWeight, taxes } = useCustomsData();
  const [authForm, setAuthForm] = useState({ mode: 'login', name: '', email: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');

  const mergedFavorites = useMemo(() => {
    const remote = manager.backendFavorites.map((item) => ({ ...item, source: 'backend' }));
    const local = manager.localFavorites.map((item) => ({ ...item, source: 'local' }));
    return [...remote, ...local];
  }, [manager.backendFavorites, manager.localFavorites]);

  const submitAuth = async () => {
    setAuthMessage('');
    const endpoint = authForm.mode === 'register' ? '/api/auth/register' : '/api/auth/login';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setAuthMessage(data.message || 'Authentication failed');
      return;
    }

    localStorage.setItem(STORAGE_KEYS.token, data.token);
    onTokenChange(data.token);
    setAuthMessage(`Logged in as ${data.user.name}`);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    onTokenChange('');
    setAuthMessage('Logged out');
  };

  return (
    <aside className="sidebar">
      <h3>{activeDesktop === 'operations' ? 'Operations Summary' : 'Documents Summary'}</h3>
      <div className="panel">
        {activeDesktop === 'operations' ? (
          <>
            <div>Driver: {driverData.fullName || '—'}</div>
            <div>Net Weight: {netWeight.toLocaleString()} kg</div>
            <div>Cargo Value: ${cargoTotals.totalValue.toLocaleString()}</div>
            <div>Total Tax: ${taxes.total.toFixed(2)}</div>
          </>
        ) : (
          <>
            <div>Imported PDFs: {docsData.imports.length}</div>
            <div>Inspections: {docsData.inspections.length}</div>
            <div>Pending Inspections: {docsData.inspections.filter((x) => x.status !== 'Passed').length}</div>
            <div>Ledger Entries: {docsData.payments.length}</div>
          </>
        )}
      </div>

      <h3>Auth</h3>
      <div className="panel">
        <div className="mode-switch compact">
          <button
            className={authForm.mode === 'login' ? 'active' : ''}
            onClick={() => setAuthForm((prev) => ({ ...prev, mode: 'login' }))}
          >
            Login
          </button>
          <button
            className={authForm.mode === 'register' ? 'active' : ''}
            onClick={() => setAuthForm((prev) => ({ ...prev, mode: 'register' }))}
          >
            Register
          </button>
        </div>

        {authForm.mode === 'register' && (
          <input
            placeholder="Name"
            value={authForm.name}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        )}
        <input
          placeholder="Email"
          value={authForm.email}
          onChange={(event) => setAuthForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          value={authForm.password}
          onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button onClick={submitAuth}>{authForm.mode === 'login' ? 'Login' : 'Register'}</button>
        {token && <button onClick={logout}>Logout</button>}
        {authMessage && <small>{authMessage}</small>}
      </div>

      <h3>Favorites</h3>
      <div className="panel favorites-list">
        {mergedFavorites.length === 0 && <div>No saved favorites yet.</div>}
        {mergedFavorites.map((favorite) => (
          <button key={`${favorite.source}-${favorite.id}`} onClick={() => manager.applyPayload(favorite)}>
            [{favorite.source}] {favorite.name}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
