import React from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { BsGearWide } from 'react-icons/bs';
import { Table } from 'react-bootstrap';
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
        <div className="table-wrap">
         <Table bordered hover className="text-center align-middle table-class">
          <thead>
            <tr>
              <th className="custom-th" rowSpan={2}>
                <button className="plus mx-auto">
                  <BsGearWide className="text-cs-blue" />
                </button>
              </th>
              <th className="custom-th" rowSpan={2}>
                Տրանսպոր- տային միջոցի համարանիշ
              </th>
              <th className="custom-th" rowSpan={2}>
                Կցորդի (կիսակցորդի) համարանիշ
              </th>
              <th className="custom-th" rowSpan={2}>
                Ուղղություն
              </th>
              <th className="custom-th" rowSpan={2}>
                Գրանցման երկիր
              </th>
              <th className="custom-th" rowSpan={2}>
                Տեսակ
              </th>
              <th className="custom-th" rowSpan={2}>
                Մակնիշ
              </th>
              <th className="custom-th" rowSpan={2}>
                Մոդել
              </th>
              <th className="custom-th" rowSpan={2}>
                Գույն
              </th>
              <th className="custom-th" rowSpan={2}>
                Թողարկման տարի
              </th>
              <th className="custom-th" rowSpan={2}>
                Տրանսպորտային միջոցի VIN կոդ
              </th>
              <th className="custom-th" rowSpan={2}>
                Կցորդի (կիսակցորդի) VIN կոդ
              </th>
              <th className="custom-th" rowSpan={2}>
                Վարորդի անուն
              </th>
              <th className="custom-th" rowSpan={2}>
                Վարորդի ազգանուն
              </th>
              <th className="custom-th" rowSpan={2}>
                Վարորդի անձը հաստատող փաստաթղթի տվյալ
              </th>
              <th className="custom-th" rowSpan={2}>
                Ծննդյան ամսաթիվ
              </th>
              <th className="custom-th" rowSpan={2}>
                Սահմանա-հատման ամսաթիվ, ժամ
              </th>

              <th className="custom-th" colSpan={5}>
                Ռիսկեր
              </th>
              <th className="custom-th" rowSpan={2}>
                Վարորդի նկար
              </th>
            </tr>

            <tr>
              <th className="custom-th risk-col">ՍԻՎՀ</th>
              <th className="custom-th risk-col">ԱՀ</th>
              <th className="custom-th risk-col">ՏՀ</th>
              <th className="custom-th risk-col">ՏՄՀ</th>
              <th className="custom-th risk-col">ՆՏ</th>
            </tr>
          </thead>
            <tbody>
              {fakeTransportRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="row-actions">
                      <button type="button" title="Դիտել" className='plus' onClick={() => onOpen(row, 'view')}>
                        <FaEye />
                      </button>
                      <button type="button" title="Խմբագրել" className='plus' onClick={() => onOpen(row, 'edit')}>
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
           </Table>
        </div>
      </div>
    </main>
  );
}

export default TransportTablePage;
