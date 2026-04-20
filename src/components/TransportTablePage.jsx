import React from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

const fakeTransportRows = [
  { id: 'TR-001', plate: '34 AB 123', driver: 'Arman Petrosyan', cargoType: 'Electronics', status: 'Pending' },
  { id: 'TR-002', plate: '12 ZZ 777', driver: 'Mariam Sargsyan', cargoType: 'Pharmaceuticals', status: 'In review' },
  { id: 'TR-003', plate: '55 TT 991', driver: 'David Hakobyan', cargoType: 'Textile', status: 'Cleared' },
  { id: 'TR-004', plate: '88 XX 020', driver: 'Ani Melkonyan', cargoType: 'Food', status: 'Pending' },
  { id: 'TR-005', plate: '70 YY 450', driver: 'Gor Avetisyan', cargoType: 'Industrial parts', status: 'In review' },
];

function TransportTablePage({ onOpen }) {
  return (
    <main className="transport-table-page">
      <div className="panel table-shell">
        <h2>Տրանսպորտ. միջոցներ</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Գործողություն</th>
                <th>ID</th>
                <th>Համարանիշ</th>
                <th>Վարորդ</th>
                <th>Բեռի տեսակ</th>
                <th>Կարգավիճակ</th>
              </tr>
            </thead>
            <tbody>
              {fakeTransportRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="row-actions">
                      <button type="button" title="Դիտել" onClick={() => onOpen(row, 'view')}>
                        <FaEye />
                      </button>
                      <button type="button" title="Խմբագրել" onClick={() => onOpen(row, 'edit')}>
                        <FaPencilAlt />
                      </button>
                    </div>
                  </td>
                  <td>{row.id}</td>
                  <td>{row.plate}</td>
                  <td>{row.driver}</td>
                  <td>{row.cargoType}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default TransportTablePage;
