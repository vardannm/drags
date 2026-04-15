import React, { useState } from 'react';
import { useCustomsData } from '../context/CustomsDataContext';

function TaxWindow() {
  const { taxConfig, setTaxConfig, taxes, netWeight, cargoTotals } = useCustomsData();
  const [lastCalculatedAt, setLastCalculatedAt] = useState(null);

  const update = (key, value) => setTaxConfig((prev) => ({ ...prev, [key]: value }));

  const calculate = () => {
    setLastCalculatedAt(new Date().toLocaleTimeString());
  };

  const pay = () => {
    setTaxConfig((prev) => ({ ...prev, paid: true }));
  };

  return (
    <div className="window-form">
      <h3>Tax & Payment</h3>
      <div className="inline-grid">
        <label>
          Duty %
          <input
            type="number"
            value={taxConfig.dutyRate}
            onChange={(e) => update('dutyRate', e.target.value)}
          />
        </label>
        <label>
          VAT %
          <input type="number" value={taxConfig.vatRate} onChange={(e) => update('vatRate', e.target.value)} />
        </label>
      </div>

      <label>
        Additional Fee
        <input
          type="number"
          value={taxConfig.additionalFee}
          onChange={(e) => update('additionalFee', e.target.value)}
        />
      </label>

      <div className="tax-grid">
        <div>Total Cargo Value</div>
        <strong>${cargoTotals.totalValue.toLocaleString()}</strong>
        <div>Net Weight</div>
        <strong>{netWeight.toLocaleString()} kg</strong>
        <div>Duty</div>
        <strong>${taxes.duty.toFixed(2)}</strong>
        <div>VAT</div>
        <strong>${taxes.vat.toFixed(2)}</strong>
        <div>Weight Surcharge</div>
        <strong>${taxes.weightSurcharge.toFixed(2)}</strong>
        <div>Total Payable</div>
        <strong>${taxes.total.toFixed(2)}</strong>
      </div>

      <div className="row-between">
        <button className="ghost-btn" onClick={calculate}>
          Calculate
        </button>
        <button className="primary-btn" onClick={pay} disabled={taxConfig.paid}>
          {taxConfig.paid ? 'Paid ✅' : 'Pay Now'}
        </button>
      </div>

      {lastCalculatedAt && <small>Last calculated at: {lastCalculatedAt}</small>}
    </div>
  );
}

export default TaxWindow;
