import React from 'react';
import { FaEye, FaImage, FaPencilAlt } from 'react-icons/fa';
import { FaTruck, FaCar } from "react-icons/fa";
import { IoIosMan } from "react-icons/io";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import CarTruck from "../assets/CarTruck.svg";
import arrow from "../assets/arrow.svg";

import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { BsGearWide, BsPencil } from 'react-icons/bs';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
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
  const [collapsed, setCollapsed] = useState(false);
    const toggleMenu = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <main className="transport-table-page">
       <div className="category">
          <div className="category-filter">
            <button className="arrow-icon" onClick={toggleMenu}>
              <img src={arrow} className={collapsed ? "rotated" : ""} />
            </button>
            <div
              className={`menu-content ${collapsed ? "collapsed" : "expanded"}`}
            >
              <button className="category-button">
                <img src={CarTruck} className="category-icon" />
              </button>

              <button className="category-button">
                <FaTruck className="category-icon" />
              </button>

              <button className="category-button">
                <FaCar className="category-icon" />
              </button>

              <button className="category-button">
                <IoIosMan className="category-icon" />
              </button>

              <div className="category-sides">
                <button className="category-side-button">
                  <FiMaximize2 className="category-side-icon" />
                </button>

                <button className="category-side-button">
                  <FiMinimize2 className="category-side-icon" />
                </button>

                <button className="category-side-button">
                  <TbArrowsDoubleNeSw className="category-side-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="panel">
        
          <Table className="mb-4 text-center  transport-rich-table "responsive size='sm'  striped bordered hover>
            <thead>
              <tr>
                <th rowSpan={2}>
                  <button className="plus mx-auto">
                    <BsGearWide className="text-cs-blue" />
                  </button>
                </th>
                <th rowSpan={2}>Տրանսպորտային միջոցի համարանիշ</th>
                <th rowSpan={2}>Կցորդի (կիսակցորդի) համարանիշ</th>
                <th rowSpan={2}>Ուղղություն</th>
                <th rowSpan={2}>Գրանցման երկիր</th>
                <th rowSpan={2}>Տեսակ</th>
                <th rowSpan={2}>Մակնիշ</th>
                <th rowSpan={2}>Մոդել</th>
                <th rowSpan={2}>Գույն</th>
                <th rowSpan={2}>Թողարկման տարի</th>
                <th rowSpan={2}>Տրանսպորտային միջոցի VIN կոդ</th>
                <th rowSpan={2}>Կցորդի (կիսակցորդի) VIN կոդ</th>
                <th rowSpan={2}>Վարորդի անուն</th>
                <th rowSpan={2}>Վարորդի ազգանուն</th>
                <th rowSpan={2}>Վարորդի անձը հաստատող փաստաթղթի տվյալ</th>
                <th rowSpan={2}>Ծննդյան ամսաթիվ</th>
                <th rowSpan={2}>Սահմանա-հատման ամսաթիվ, ժամ</th>
                <th colSpan={5}>Ռիսկեր</th>
                <th rowSpan={2}>Վարորդի նկար</th>
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
                    <div className="operations-col">
                      <button className='table-button' title="Դիտել" onClick={() => onOpen(row, 'view')}>
                        <MdOutlineRemoveRedEye />
                      </button>
                      <button className='table-button' title="Խմբագրել" onClick={() => onOpen(row, 'edit')}>
                      <BsPencil />
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
                </tr>
              ))}

              
            </tbody>
          </Table>
        </div>
     
    </main>
  );
}

export default TransportTablePage;
