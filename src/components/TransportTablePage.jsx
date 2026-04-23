import React, { useMemo, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { FaTruck, FaCar } from "react-icons/fa";
import { IoIosMan } from "react-icons/io";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import CarTruck from "../assets/CarTruck.svg";
import arrow from "../assets/arrow.svg";

import { TbArrowsDoubleNeSw } from "react-icons/tb";
import { Table } from 'react-bootstrap';
import { BsGearWide, BsPencil } from 'react-icons/bs';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const riskColumns = [
  { key: 'risk_1', label: 'ՍԻՎՀ' },
  { key: 'risk_2', label: 'ԱՀ' },
  { key: 'risk_3', label: 'ՏՀ' },
  { key: 'risk_4', label: 'ՏՄՀ' },
  { key: 'risk_5', label: 'ՆՏ' },
];
const fakeTruckRows = [
  {
    id: '209SR05',
    trailerPlate: '22UU222',
    route: 'Մուտք',
    country: 'AM',
    type: 'Բեռնատար',
    brand: 'DAF',
    model: 'XF',
    color: 'Կարմիր',
    year: '2025',
    vehicleVin: '223fggt4',
    trailerVin: '433df34',
    firstName: 'Արամ',
    lastName: 'Պետրոսյան',
    document: 'AA4567899',
    birthDate: '00/00/0000',
    crossDate: '00/00/0000',
    risk_1: 'red',
    risk_2: 'green',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
  {
    id: '11XX111',
    trailerPlate: '220U222',
    route: 'Ելք',
    country: 'GE',
    type: 'Բեռնատար',
    brand: 'MAN',
    model: 'TGX',
    color: 'Կանաչ',
    year: '2021',
    vehicleVin: 'asd654',
    trailerVin: 'jh84532',
    firstName: 'Կարեն',
    lastName: 'Սարգսյան',
    document: 'AA4987654',
    birthDate: '00/00/0000',
    crossDate: '00/00/0000',
    risk_1: '',
    risk_2: '',
    risk_3: 'red',
    risk_4: '',
    risk_5: '',
  },
];

const fakePassengerRows = [
  {
    id: '35OO503',
    route: 'Մուտք',
    country: 'AM',
    type: 'Մարդատար',
    brand: 'Toyota',
    model: 'Camry',
    color: 'Սպիտակ',
    year: '2022',
    vehicleVin: 'JH4DA9350MS000111',
    firstName: 'Լիլիթ',
    lastName: 'Գրիգորյան',
    document: 'AN1234567',
    crossDate: '00/00/0000',
    risk_1: '',
    risk_2: 'yellow',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
  {
    id: '44TT774',
    route: 'Ելք',
    country: 'RU',
    type: 'Մարդատար',
    brand: 'KIA',
    model: 'Sportage',
    color: 'Սև',
    year: '2020',
    vehicleVin: 'KNDPB3AC4B0000222',
    firstName: 'Տիգրան',
    lastName: 'Մկրտչյան',
    document: 'AN1000002',
    crossDate: '00/00/0000',
    risk_1: '',
    risk_2: '',
    risk_3: '',
    risk_4: 'red',
    risk_5: '',
  },
];

const fakePedestrianRows = [
  {
    id: 'P-0001',
    route: 'Մուտք',
    country: 'GE',
    firstName: 'Անի',
    lastName: 'Հակոբյան',
    document: 'AA9944112',
    birthDate: '00/00/0000',
    crossDate: '00/00/0000',
    risk_1: '',
    risk_2: '',
    risk_3: 'yellow',
    risk_4: '',
    risk_5: '',
  },
  {
    id: 'P-0002',
    route: 'Ելք',
    country: 'AM',
    firstName: 'Սամվել',
    lastName: 'Հովհաննիսյան',
    document: 'AA7711002',
    birthDate: '00/00/0000',
    crossDate: '00/00/0000',
    risk_1: '',
    risk_2: 'red',
    risk_3: '',
    risk_4: '',
    risk_5: '',
  },
];

const CATEGORY_KEYS = {
  all: 'all',
  truck: 'truck',
  passenger: 'passenger',
  pedestrian: 'pedestrian',
};

const ROUTE_FILTERS = {
  all: 'all',
  entry: 'entry',
  exit: 'exit',
};

const tableConfigs = {
  [CATEGORY_KEYS.truck]: {
    rows: fakeTruckRows,
    columns: [
      { key: 'id', label: 'Տրանսպորտային միջոցի համարանիշ' },
      { key: 'trailerPlate', label: 'Կցորդի (կիսակցորդի) համարանիշ' },
      { key: 'route', label: 'Ուղղություն' },
      { key: 'country', label: 'Գրանցման երկիր' },
      { key: 'type', label: 'Տեսակ' },
      { key: 'brand', label: 'Մակնիշ' },
      { key: 'model', label: 'Մոդել' },
      { key: 'color', label: 'Գույն' },
      { key: 'year', label: 'Թողարկման տարի' },
      { key: 'vehicleVin', label: 'Տրանսպորտային միջոցի VIN կոդ' },
      { key: 'trailerVin', label: 'Կցորդի (կիսակցորդի) VIN կոդ' },
      { key: 'firstName', label: 'Վարորդի անուն' },
      { key: 'lastName', label: 'Վարորդի ազգանուն' },
      { key: 'document', label: 'Անձը հաստատող փաստաթղթի տվյալ' },
      { key: 'birthDate', label: 'Ծննդյան ամսաթիվ' },
      { key: 'crossDate', label: 'Սահմանահատման ամսաթիվ, ժամ' },
    ],
  },
  [CATEGORY_KEYS.passenger]: {
    rows: fakePassengerRows,
    columns: [
      { key: 'id', label: 'Մեքենայի համարանիշ' },
      { key: 'route', label: 'Ուղղություն' },
      { key: 'country', label: 'Գրանցման երկիր' },
      { key: 'type', label: 'Տեսակ' },
      { key: 'brand', label: 'Մակնիշ' },
      { key: 'model', label: 'Մոդել' },
      { key: 'color', label: 'Գույն' },
      { key: 'year', label: 'Թողարկման տարի' },
      { key: 'vehicleVin', label: 'VIN կոդ' },
      { key: 'firstName', label: 'Վարորդի անուն' },
      { key: 'lastName', label: 'Վարորդի ազգանուն' },
      { key: 'document', label: 'Փաստաթղթի տվյալ' },
      { key: 'crossDate', label: 'Սահմանահատման ամսաթիվ, ժամ' },
    ],
  },
  [CATEGORY_KEYS.pedestrian]: {
    rows: fakePedestrianRows,
    columns: [
      { key: 'id', label: 'Գրանցման համար' },
      { key: 'route', label: 'Ուղղություն' },
      { key: 'country', label: 'Երկիր' },
      { key: 'firstName', label: 'Անուն' },
      { key: 'lastName', label: 'Ազգանուն' },
      { key: 'document', label: 'Փաստաթուղթ' },
      { key: 'birthDate', label: 'Ծննդյան ամսաթիվ' },
      { key: 'crossDate', label: 'Սահմանահատման ամսաթիվ, ժամ' },
    ],
  },
};

function RiskIndicator({ color }) {
  if (!color) return null;
  return <span className={`risk-indicator ${color}`} />;
}

function TransportTablePage({ onOpen, selectedCategory = CATEGORY_KEYS.all, onCategoryChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [routeFilter, setRouteFilter] = useState(ROUTE_FILTERS.all);

  const toggleMenu = () => {
    setCollapsed((prev) => !prev);
  };

  const activeConfig = useMemo(() => {
    if (selectedCategory === CATEGORY_KEYS.all) {
      return {
        rows: [...fakeTruckRows, ...fakePassengerRows, ...fakePedestrianRows],
        columns: [
          { key: 'id', label: 'Համարանիշ / Գրանցում' },
          { key: 'route', label: 'Ուղղություն' },
          { key: 'country', label: 'Երկիր' },
          { key: 'type', label: 'Տեսակ' },
          { key: 'brand', label: 'Մակնիշ' },
          { key: 'model', label: 'Մոդել' },
          { key: 'firstName', label: 'Անուն' },
          { key: 'lastName', label: 'Ազգանուն' },
          { key: 'document', label: 'Փաստաթուղթ' },
          { key: 'crossDate', label: 'Սահմանահատման ամսաթիվ, ժամ' },
        ],
      };
    }
    return tableConfigs[selectedCategory] || tableConfigs[CATEGORY_KEYS.truck];
  }, [selectedCategory]);

  const selectCategory = (category) => {
    onCategoryChange?.(category);
  };

  const filteredRows = useMemo(() => {
    if (routeFilter === ROUTE_FILTERS.all) {
      return activeConfig.rows;
    }

    return activeConfig.rows.filter((row) => {
      const normalizedRoute = row.route?.toLowerCase();
      if (routeFilter === ROUTE_FILTERS.exit) {
        return normalizedRoute === 'ելք';
      }
      return normalizedRoute === 'մուտք';
    });
  }, [activeConfig.rows, routeFilter]);

  return (
    <main className="transport-table-page">
      <div className="category">
        <div className="category-filter">
          <button className="arrow-icon" onClick={toggleMenu}>
            <img src={arrow} className={collapsed ? "rotated" : ""} />
          </button>
          <div className={`menu-content ${collapsed ? "collapsed" : "expanded"}`}>
            <button
              className={`category-button ${selectedCategory === CATEGORY_KEYS.all ? 'active' : ''}`}
              onClick={() => selectCategory(CATEGORY_KEYS.all)}
            >
              <img src={CarTruck} className="category-icon" />
            </button>

            <button
              className={`category-button ${selectedCategory === CATEGORY_KEYS.truck ? 'active' : ''}`}
              onClick={() => selectCategory(CATEGORY_KEYS.truck)}
            >
              <FaTruck className="category-icon" />
            </button>

            <button
              className={`category-button ${selectedCategory === CATEGORY_KEYS.passenger ? 'active' : ''}`}
              onClick={() => selectCategory(CATEGORY_KEYS.passenger)}
            >
              <FaCar className="category-icon" />
            </button>

            <button
              className={`category-button ${selectedCategory === CATEGORY_KEYS.pedestrian ? 'active' : ''}`}
              onClick={() => selectCategory(CATEGORY_KEYS.pedestrian)}
            >
              <IoIosMan className="category-icon" />
            </button>

            <div className="category-sides">
              <button
                className="category-side-button"
                onClick={() => setRouteFilter(ROUTE_FILTERS.exit)}
              >
                <FiMaximize2 className="category-side-icon" />
              </button>

              <button
                className="category-side-button"
                onClick={() => setRouteFilter(ROUTE_FILTERS.entry)}
              >
                <FiMinimize2 className="category-side-icon" />
              </button>

              <button
                className="category-side-button"
                onClick={() => setRouteFilter(ROUTE_FILTERS.all)}
              >
                <TbArrowsDoubleNeSw className="category-side-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="panel">
        <Table className="mb-4 text-center transport-rich-table" responsive size="sm" striped bordered hover>
          <thead>
            <tr>
              <th rowSpan={2}>
                <button className="plus mx-auto">
                  <BsGearWide className="text-cs-blue" />
                </button>
              </th>
              {activeConfig.columns.map((column) => (
                <th key={column.key} rowSpan={2}>{column.label}</th>
              ))}
              <th colSpan={5}>Ռիսկեր</th>
              <th rowSpan={2}>Նկար</th>
            </tr>
            <tr>
              {riskColumns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={`${selectedCategory}-${row.id}-${row.document}`}>
                <td>
                  <div className="operations-col">
                    <button className="table-button" title="Դիտել" onClick={() => onOpen(row, 'view')}>
                      <MdOutlineRemoveRedEye />
                    </button>
                    <button className="table-button" title="Խմբագրել" onClick={() => onOpen(row, 'edit')}>
                      <BsPencil />
                    </button>
                  </div>
                </td>
                {activeConfig.columns.map((column) => (
                  <td key={column.key}>{row[column.key] || '-'}</td>
                ))}
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
