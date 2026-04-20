import React from 'react';
import { FaEye, FaImage, FaPencilAlt } from 'react-icons/fa';

const fakeTransportRows = [
  {
    id: '209SR05',
    borderPoint: '22UU222',
    route: 'Մուտք',
    country: 'AM',
    brand: '0002852',
    model: 'DAF',
    axle: '520',
    color: 'Կարմիր',
    year: '2025',
    chassis: '223fggt4',
    vin: '433df34',
    driverType: 'Անձն',
    citizenship: 'Ազգություն',
    passport: 'AA4567899',
    entryDate: '00/00/0000',
    exitDate: '00/00/0000',
    risk_1: 'red',
    risk_2: 'green',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
  {
    id: '11xx111',
    borderPoint: '220U222',
    route: 'Մուտք',
    country: 'GE',
    brand: '0004875',
    model: 'DAF',
    axle: '520',
    color: 'Կանաչ',
    year: '2021',
    chassis: 'asd654',
    vin: 'jh84532',
    driverType: 'Անձն',
    citizenship: 'Ազգություն',
    passport: 'AA4567899',
    entryDate: '00/00/0000',
    exitDate: '00/00/0000',
    risk_1: '',
    risk_2: '',
    risk_3: 'red',
    risk_4: '',
    risk_5: '',
  },
  {
    id: '11xx111',
    borderPoint: '22UU222',
    route: 'Մուտք',
    country: 'GE',
    brand: '0002852',
    model: 'DAF',
    axle: '520',
    color: 'Կարմիր',
    year: '2022',
    chassis: '12deevfge',
    vin: '24hds',
    driverType: 'Անձն',
    citizenship: 'Ազգություն',
    passport: 'AA4567899',
    entryDate: '00/00/0000',
    exitDate: '00/00/0000',
    risk_1: '',
    risk_2: 'red',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
  {
    id: '11xx111',
    borderPoint: '22UU222',
    route: 'Մուտք',
    country: 'RU',
    brand: '0004875',
    model: 'DAF',
    axle: '520',
    color: 'Դեղին',
    year: '2020',
    chassis: '23fght',
    vin: '53fada',
    driverType: 'Անձն',
    citizenship: 'Ազգություն',
    passport: 'AA4567899',
    entryDate: '00/00/0000',
    exitDate: '00/00/0000',
    risk_1: 'yellow',
    risk_2: '',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
];

const riskColumns = [
  { key: 'risk_1', label: 'ԱՆԵԼ' },
  { key: 'risk_2', label: 'ԱՀ' },
  { key: 'risk_3', label: 'SC' },
  { key: 'risk_4', label: 'ՍԱԵ' },
  { key: 'risk_5', label: 'ՆՏ' },
];

function RiskIndicator({ color }) {
  if (!color) return null;
  return <span className={`risk-indicator ${color}`} />;
}

function TransportTablePage({ onOpen }) {
  const emptyRows = Array.from({ length: 6 });

  return (
    <main className="transport-table-page">
      <div className="panel table-shell">
        <h2>Տրանսպորտ. միջոցներ</h2>
        <div className="table-wrap">
          <table className="data-table transport-rich-table">
            <thead>
              <tr>
                <th rowSpan={2}>⚙</th>
                <th rowSpan={2}>Տրանսպորտային միջոցի համարանիշ</th>
                <th rowSpan={2}>Կոդ</th>
                <th rowSpan={2}>Ուղղություն</th>
                <th rowSpan={2}>Պետություն</th>
                <th rowSpan={2}>Գրանցման թիվ</th>
                <th rowSpan={2}>Մոդել</th>
                <th rowSpan={2}>Առանցք</th>
                <th rowSpan={2}>Գույն</th>
                <th rowSpan={2}>Թողարկման տարի</th>
                <th rowSpan={2}>Շասսի</th>
                <th rowSpan={2}>VIN կոդ</th>
                <th rowSpan={2}>Վարորդի տեսակը</th>
                <th rowSpan={2}>Վարորդի ազգությունը</th>
                <th rowSpan={2}>Վարորդի անձնագիր</th>
                <th rowSpan={2}>Մուտքի ամսաթիվ</th>
                <th rowSpan={2}>Ելքի ամսաթիվ</th>
                <th colSpan={5}>Ռիսկեր</th>
                <th rowSpan={2}>Վարորդի նկար</th>
                <th rowSpan={2}>Կցորդի նկար</th>
              </tr>
              <tr>
                {riskColumns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fakeTransportRows.map((row) => (
                <tr key={`${row.id}-${row.vin}`}>
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
                  <td>{row.borderPoint}</td>
                  <td>{row.route}</td>
                  <td>{row.country}</td>
                  <td>{row.brand}</td>
                  <td>{row.model}</td>
                  <td>{row.axle}</td>
                  <td>{row.color}</td>
                  <td>{row.year}</td>
                  <td>{row.chassis}</td>
                  <td>{row.vin}</td>
                  <td>{row.driverType}</td>
                  <td>{row.citizenship}</td>
                  <td>{row.passport}</td>
                  <td>{row.entryDate}</td>
                  <td>{row.exitDate}</td>
                  {riskColumns.map((column) => (
                    <td key={column.key}>
                      <RiskIndicator color={row[column.key]} />
                    </td>
                  ))}
                  <td>
                    <button type="button" className="image-btn" title="Driver image">
                      <FaImage />
                    </button>
                  </td>
                  <td>
                    <button type="button" className="image-btn" title="Trailer image">
                      <FaImage />
                    </button>
                  </td>
                </tr>
              ))}

              {emptyRows.map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td>&nbsp;</td>
                  {Array.from({ length: 23 }).map((__, cellIndex) => (
                    <td key={cellIndex}>&nbsp;</td>
                  ))}
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
