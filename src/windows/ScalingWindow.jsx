import React from 'react';
import { useCustomsData } from '../context/useCustomsData';

function ScalingWindow() {
  const { scalingData, setScalingData, netWeight } = useCustomsData();

  const update = (field, value) => {
    setScalingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="window-form">
      <h3>Scale Readings</h3>
      <label>
        Gross Weight (kg)
        <input
          type="number"
          value={scalingData.grossWeight}
          onChange={(e) => update('grossWeight', e.target.value)}
        />
      </label>

      <label>
        Tare Weight (kg)
        <input
          type="number"
          value={scalingData.tareWeight}
          onChange={(e) => update('tareWeight', e.target.value)}
        />
      </label>

      <label>
        Manual Net Override (kg)
        <input
          type="number"
          value={scalingData.manualNetWeight ?? ''}
          placeholder="Optional"
          onChange={(e) =>
            update('manualNetWeight', e.target.value === '' ? null : e.target.value)
          }
        />
      </label>

      <div className="summary-chip">Live Net Weight: {netWeight.toLocaleString()} kg</div>
    </div>
  );
}

export default ScalingWindow;
