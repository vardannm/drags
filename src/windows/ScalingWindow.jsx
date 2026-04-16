import React from 'react';
import Form from 'react-bootstrap/Form';

import { useCustomsData } from '../context/useCustomsData';

function ScalingWindow() {
  const { scalingData, setScalingData, netWeight } = useCustomsData();

  const update = (field, value) => {
    setScalingData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Form className="window-form">
      <h3>Scale Readings</h3>
      <Form.Group>
        <Form.Label>Gross Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          value={scalingData.grossWeight}
          onChange={(e) => update('grossWeight', e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tare Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          value={scalingData.tareWeight}
          onChange={(e) => update('tareWeight', e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Manual Net Override (kg)</Form.Label>
        <Form.Control
          type="number"
          value={scalingData.manualNetWeight ?? ''}
          placeholder="Optional"
          onChange={(e) =>
            update('manualNetWeight', e.target.value === '' ? null : e.target.value)
          }
        />
      </Form.Group>

      <div className="summary-chip">Live Net Weight: {netWeight.toLocaleString()} kg</div>
    </Form>
  );
}

export default ScalingWindow;
