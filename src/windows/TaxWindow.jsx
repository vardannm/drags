import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useCustomsData } from '../context/useCustomsData';

function TaxWindow({ readOnly = false }) {
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
    <Form className="window-form">
      <h3>Tax & Payment</h3>
      <div className="inline-grid">
        <Form.Group>
          <Form.Label>Duty %</Form.Label>
          <Form.Control
            readOnly={readOnly}
            type="number"
            value={taxConfig.dutyRate}
            onChange={(e) => update('dutyRate', e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>VAT %</Form.Label>
          <Form.Control readOnly={readOnly} type="number" value={taxConfig.vatRate} onChange={(e) => update('vatRate', e.target.value)} />
        </Form.Group>
      </div>

      <Form.Group>
        <Form.Label>Additional Fee</Form.Label>
        <Form.Control
          readOnly={readOnly}
          type="number"
          value={taxConfig.additionalFee}
          onChange={(e) => update('additionalFee', e.target.value)}
        />
      </Form.Group>

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
        <Button variant="outline-secondary" onClick={calculate} disabled={readOnly}>
          Calculate
        </Button>
        <Button variant="cs-blue" onClick={pay} disabled={readOnly || taxConfig.paid}>
          {taxConfig.paid ? 'Paid ✅' : 'Pay Now'}
        </Button>
      </div>

      {lastCalculatedAt && <small>Last calculated at: {lastCalculatedAt}</small>}
    </Form>
  );
}

export default TaxWindow;
