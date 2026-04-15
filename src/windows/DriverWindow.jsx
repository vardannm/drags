import React from 'react';
import { useCustomsData } from '../context/CustomsDataContext';

function DriverWindow() {
  const { driverData, setDriverData } = useCustomsData();

  const update = (field, value) => {
    setDriverData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="window-form two-col">
      <h3>Driver Identification</h3>
      <label>
        Full Name
        <input value={driverData.fullName} onChange={(e) => update('fullName', e.target.value)} />
      </label>
      <label>
        Passport / ID
        <input value={driverData.passportId} onChange={(e) => update('passportId', e.target.value)} />
      </label>
      <label>
        Nationality
        <input value={driverData.nationality} onChange={(e) => update('nationality', e.target.value)} />
      </label>
      <label>
        Vehicle Plate
        <input value={driverData.vehiclePlate} onChange={(e) => update('vehiclePlate', e.target.value)} />
      </label>
      <label>
        License Number
        <input value={driverData.licenseNumber} onChange={(e) => update('licenseNumber', e.target.value)} />
      </label>
      <label>
        Transport Company
        <input
          value={driverData.transportCompany}
          onChange={(e) => update('transportCompany', e.target.value)}
        />
      </label>
    </div>
  );
}

export default DriverWindow;
