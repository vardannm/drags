import React from 'react';

function InspectionWindow({ docsData, setDocsData }) {
  const toggle = (id) => {
    setDocsData((prev) => ({
      ...prev,
      inspections: prev.inspections.map((item) =>
        item.id === id
          ? { ...item, passed: !item.passed, status: !item.passed ? 'Passed' : 'Pending' }
          : item
      ),
    }));
  };

  return (
    <div className="window-form">
      <h3>Inspection Queue</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {docsData.inspections.map((item) => (
            <tr key={item.id}>
              <td>{item.vehicle}</td>
              <td>{item.driver}</td>
              <td>{item.status}</td>
              <td>
                <button className="ghost-btn" onClick={() => toggle(item.id)}>
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InspectionWindow;
