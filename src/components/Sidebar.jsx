import React, { useMemo } from 'react';
import { useCustomsData } from '../context/CustomsDataContext';

function Sidebar({ manager }) {
  const { driverData, cargoTotals, netWeight, taxes } = useCustomsData();

  const mergedFavorites = useMemo(() => {
    const local = manager.localFavorites.map((item) => ({ ...item, source: 'local' }));
    return [...local];
  }, [manager.localFavorites]);

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
    </aside>
  );
}

export default Sidebar;
