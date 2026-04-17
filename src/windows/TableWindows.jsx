import React from 'react';
import Table from 'react-bootstrap/Table';

const shipments = [
  { id: 'SHP-1001', route: 'Tbilisi → Batumi', carrier: 'Caspian Move', status: 'In Transit' },
  { id: 'SHP-1002', route: 'Poti → Kutaisi', carrier: 'NorthLine', status: 'Delivered' },
  { id: 'SHP-1003', route: 'Baku → Tbilisi', carrier: 'Silk Freight', status: 'Pending' },
];

const drivers = [
  { name: 'Nika Gelashvili', plate: 'TB-482-KL', score: 97 },
  { name: 'Luka Mchedlishvili', plate: 'BT-100-ZX', score: 92 },
  { name: 'Ana Sharvashidze', plate: 'KU-007-TX', score: 89 },
];

const inspections = [
  { checkpoint: 'Gate A', scanned: 44, flagged: 2 },
  { checkpoint: 'Gate B', scanned: 38, flagged: 1 },
  { checkpoint: 'Gate C', scanned: 51, flagged: 4 },
];

const payments = [
  { invoice: 'INV-8801', amount: '$12,420.00', method: 'Wire', state: 'Settled' },
  { invoice: 'INV-8802', amount: '$4,715.00', method: 'Card', state: 'Awaiting' },
  { invoice: 'INV-8803', amount: '$8,090.00', method: 'Cash', state: 'Settled' },
];

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <Table striped bordered hover responsive size="sm" variant="dark">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id || row.name || `${idx}`}>
              {columns.map((col) => (
                <td key={`${col.key}-${row.id || row.name || idx}`}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export function ShipmentsTableWindow() {
  return (
    <DataTable
      columns={[
        { key: 'id', label: 'Shipment ID' },
        { key: 'route', label: 'Route' },
        { key: 'carrier', label: 'Carrier' },
        { key: 'status', label: 'Status' },
      ]}
      rows={shipments}
    />
  );
}

export function DriversTableWindow() {
  return (
    <DataTable
      columns={[
        { key: 'name', label: 'Driver' },
        { key: 'plate', label: 'Vehicle Plate' },
        { key: 'score', label: 'Trust Score' },
      ]}
      rows={drivers}
    />
  );
}

export function InspectionsTableWindow() {
  return (
    <DataTable
      columns={[
        { key: 'checkpoint', label: 'Checkpoint' },
        { key: 'scanned', label: 'Scanned' },
        { key: 'flagged', label: 'Flagged' },
      ]}
      rows={inspections}
    />
  );
}

export function PaymentsTableWindow() {
  return (
    <DataTable
      columns={[
        { key: 'invoice', label: 'Invoice' },
        { key: 'amount', label: 'Amount' },
        { key: 'method', label: 'Method' },
        { key: 'state', label: 'State' },
      ]}
      rows={payments}
    />
  );
}
