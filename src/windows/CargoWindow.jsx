import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useCustomsData } from '../context/useCustomsData';

function CargoWindow() {
  const { cargoItems, setCargoItems, createCargoItem, cargoTotals } = useCustomsData();

  const updateItem = (id, key, value) => {
    setCargoItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addItem = () => setCargoItems((prev) => [...prev, createCargoItem()]);
  const removeItem = (id) => setCargoItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <Form className="window-form">
      <div className="row-between">
        <h3>Cargo Declaration</h3>
        <Button variant="outline-secondary" size="sm" onClick={addItem}>
          + Add Item
        </Button>
      </div>

      <div className="cargo-list">
        {cargoItems.map((item, idx) => (
          <Card key={item.id} className="cargo-card">
            <Card.Body>
              <div className="row-between">
                <strong>Item #{idx + 1}</strong>
                {cargoItems.length > 1 && (
                  <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                )}
              </div>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>HS Code</Form.Label>
                <Form.Control value={item.hsCode} onChange={(e) => updateItem(item.id, 'hsCode', e.target.value)} />
              </Form.Group>
              <div className="inline-grid">
                <Form.Group>
                  <Form.Label>Qty</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Unit Value</Form.Label>
                  <Form.Control
                    type="number"
                    value={item.value}
                    onChange={(e) => updateItem(item.id, 'value', e.target.value)}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Label>Origin</Form.Label>
                <Form.Control value={item.origin} onChange={(e) => updateItem(item.id, 'origin', e.target.value)} />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="summary-chip">
        Total Qty: {cargoTotals.totalQuantity} | Total Value: ${cargoTotals.totalValue.toLocaleString()}
      </div>
    </Form>
  );
}

export default CargoWindow;
