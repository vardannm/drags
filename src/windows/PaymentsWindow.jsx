import React from 'react';

function PaymentsWindow({ docsData }) {
  return (
    <div className="window-form">
      <h3>Payment Ledger</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Method</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {docsData.payments.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.company}</td>
              <td>${item.amount.toLocaleString()}</td>
              <td>{item.method}</td>
              <td>{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsWindow;
