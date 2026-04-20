import React from 'react';
import Form from 'react-bootstrap/Form';

import { useCustomsData } from '../context/useCustomsData';

function DriverWindow({ readOnly = false }) {
  const { driverData, setDriverData } = useCustomsData();

  const update = (field, value) => {
    setDriverData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Form className="window-form two-col">
      <h3>Driver Identification</h3>
      <Form.Group>
        <Form.Label>Full Name</Form.Label>
        <Form.Control readOnly={readOnly} value={driverData.fullName} onChange={(e) => update('fullName', e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Passport / ID</Form.Label>
        <Form.Control readOnly={readOnly} value={driverData.passportId} onChange={(e) => update('passportId', e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Nationality</Form.Label>
        <Form.Control readOnly={readOnly} value={driverData.nationality} onChange={(e) => update('nationality', e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Vehicle Plate</Form.Label>
        <Form.Control readOnly={readOnly} value={driverData.vehiclePlate} onChange={(e) => update('vehiclePlate', e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>License Number</Form.Label>
        <Form.Control readOnly={readOnly} value={driverData.licenseNumber} onChange={(e) => update('licenseNumber', e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Transport Company</Form.Label>
        <Form.Control
          readOnly={readOnly}
          value={driverData.transportCompany}
          onChange={(e) => update('transportCompany', e.target.value)}
        />
      </Form.Group>
    </Form>
  );
}

export default DriverWindow;
