import React, { useMemo } from 'react';
import { useCustomsData } from '../context/useCustomsData';

function Sidebar({
  manager,
  theme,
  setTheme,
  customTheme,
  setCustomTheme,
  token,
  authForm,
  setAuthForm,
  authMessage,
  onLogin,
}) {
  const { driverData, cargoTotals, netWeight, taxes } = useCustomsData();

  const mergedFavorites = useMemo(() => {
    const backend = manager.backendFavorites.map((item) => ({
      ...item,
      id: item.id || item._id,
      source: 'backend',
    }));
    const local = manager.localFavorites.map((item) => ({ ...item, source: 'local' }));
    return [...backend, ...local];
  }, [manager.backendFavorites, manager.localFavorites]);

  return (
    <aside className="sidebar">
      <h3>Customs Summary</h3>
      <div className="panel">
        <div>Driver: {driverData.fullName || '—'}</div>
        <div>Net Weight: {netWeight.toLocaleString()} kg</div>
        <div>Cargo Value: ${cargoTotals.totalValue.toLocaleString()}</div>
        <div>Total Tax: ${taxes.total.toFixed(2)}</div>
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

      <h3>Backend Login</h3>
      <div className="panel">
        <input
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
        <button onClick={onLogin}>{token ? 'Re-login' : 'Login'}</button>
        {authMessage && <small>{authMessage}</small>}
      </div>

      <h3>Theme</h3>
      <div className="panel theme-panel">
        <div className="inline-grid">
          <button className={theme === 'default' ? 'active' : ''} onClick={() => setTheme('default')}>
            Default
          </button>
          <button className={theme === 'sunrise' ? 'active' : ''} onClick={() => setTheme('sunrise')}>
            Bright Sunrise
          </button>
          <button className={theme === 'mint' ? 'active' : ''} onClick={() => setTheme('mint')}>
            Bright Mint
          </button>
          <button className={theme === 'lavender' ? 'active' : ''} onClick={() => setTheme('lavender')}>
            Bright Lavender
          </button>
        </div>

        <button className={theme === 'custom' ? 'active' : ''} onClick={() => setTheme('custom')}>
          Use Custom Theme
        </button>

        <label>
          Background Start
          <input
            type="color"
            value={customTheme.bgStart}
            onChange={(event) =>
              setCustomTheme((prev) => ({ ...prev, bgStart: event.target.value }))
            }
          />
        </label>
        <label>
          Background Mid
          <input
            type="color"
            value={customTheme.bgMid}
            onChange={(event) =>
              setCustomTheme((prev) => ({ ...prev, bgMid: event.target.value }))
            }
          />
        </label>
        <label>
          Background End
          <input
            type="color"
            value={customTheme.bgEnd}
            onChange={(event) =>
              setCustomTheme((prev) => ({ ...prev, bgEnd: event.target.value }))
            }
          />
        </label>
        <label>
          Panel Color
          <input
            type="color"
            value={customTheme.panel}
            onChange={(event) =>
              setCustomTheme((prev) => ({ ...prev, panel: event.target.value }))
            }
          />
        </label>
        <label>
          Text Color
          <input
            type="color"
            value={customTheme.text}
            onChange={(event) => setCustomTheme((prev) => ({ ...prev, text: event.target.value }))}
          />
        </label>
        <label>
          Accent Color
          <input
            type="color"
            value={customTheme.accent}
            onChange={(event) =>
              setCustomTheme((prev) => ({ ...prev, accent: event.target.value }))
            }
          />
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;
