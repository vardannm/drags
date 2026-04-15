import React from 'react';
import { useCustomsData } from '../context/useCustomsData';

function CargoWindow() {
  const { cargoItems, setCargoItems, createCargoItem, cargoTotals } = useCustomsData();

  const updateItem = (id, key, value) => {
    setCargoItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addItem = () => setCargoItems((prev) => [...prev, createCargoItem()]);
  const removeItem = (id) => setCargoItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="window-form">
      <div className="row-between">
        <h3>Cargo Declaration</h3>
        <button className="ghost-btn" onClick={addItem}>
          + Add Item
        </button>
      </div>

      <div className="cargo-list">
        {cargoItems.map((item, idx) => (
          <div key={item.id} className="cargo-card">
            <div className="row-between">
              <strong>Item #{idx + 1}</strong>
              {cargoItems.length > 1 && (
                <button className="danger-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              )}
            </div>
            <label>
              Description
              <input
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              />
            </label>
            <label>
              HS Code
              <input value={item.hsCode} onChange={(e) => updateItem(item.id, 'hsCode', e.target.value)} />
            </label>
            <div className="inline-grid">
              <label>
                Qty
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                />
              </label>
              <label>
                Unit Value
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateItem(item.id, 'value', e.target.value)}
                />
              </label>
            </div>
            <label>
              Origin
              <input value={item.origin} onChange={(e) => updateItem(item.id, 'origin', e.target.value)} />
            </label>
          </div>
        ))}
      </div>

      <div className="summary-chip">
        Total Qty: {cargoTotals.totalQuantity} | Total Value: ${cargoTotals.totalValue.toLocaleString()}
      </div>
    </div>
  );
}

export default CargoWindow;
