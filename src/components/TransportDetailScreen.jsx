import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { FaImage } from 'react-icons/fa6';
import { TbArrowsMaximize } from 'react-icons/tb';
import Desktop from './Desktop';
import Sidebar from './Sidebar';

function TransportDetailScreen({
  manager,
  activeDesktop,
  onDesktopChange,
  token,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedTransport = state?.transport || null;
  const detailMode = state?.mode || 'view';
  const isReadOnlyMode = detailMode === 'view';

  if (!selectedTransport) {
    return (
      <div className="p-3">
        <p>Տրանսպորտային միջոց ընտրված չէ։</p>
        <Button variant="cs-blue" onClick={() => navigate('/transport')}>
          Վերադառնալ ցանկ
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="driver-data-actions">
        <Button variant="cs-blue" className="driver-data-action-btn">
          Գրանցել
        </Button>
        <Button variant="cs-blue" className="driver-data-action-btn">
          Ավարտել
        </Button>
        <Button variant="cs-blue" className="driver-data-action-btn" onClick={() => navigate('/transport')}>
          Փակել
        </Button>
        <Button variant="outline-cs-blue" className="driver-data-action-btn">
          Հաստատել
        </Button>
        <Button variant="danger" className="driver-data-action-btn">
          Գնահատել ռիսկերը
        </Button>
      </div>

      <Table className="mb-4 text-center  transport-rich-table" responsive size="sm" striped bordered hover>
        <thead>
          <tr>
            <th colSpan={18}>Սահմանային հաշվառում</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="operations-col">
                <button className="table-button" title="Խմբագրել">
                  <TbArrowsMaximize />
                </button>
              </div>
            </td>
            <td>{selectedTransport.id || '-'}</td>
            <td>{selectedTransport.plate || selectedTransport.trailerPlate || '-'}</td>
            <td>{selectedTransport.type || '-'}</td>
            <td>{selectedTransport.brand || '-'}</td>
            <td>{selectedTransport.vin || selectedTransport.vehicleVin || '-'}</td>
            <td>{selectedTransport.make || '-'}</td>
            <td>{selectedTransport.model || '-'}</td>
            <td>{selectedTransport.color || '-'}</td>
            <td>{selectedTransport.year || '-'}</td>
            <td>{selectedTransport.engineNumber || '-'}</td>
            <td>{selectedTransport.chassisNumber || '-'}</td>
            <td>{selectedTransport.ownerName || selectedTransport.firstName || '-'}</td>
            <td>{selectedTransport.ownerNationality || selectedTransport.country || '-'}</td>
            <td>{selectedTransport.ownerIdNumber || selectedTransport.document || '-'}</td>
            <td>{selectedTransport.birthDate || '00/00/0000'}</td>
            <td>{selectedTransport.crossDate || '00/00/0000'}</td>
            <td>
              <button type="button" className="image-btn" title="Driver image">
                <FaImage />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Desktop manager={manager} activeDesktop={activeDesktop} readOnly={isReadOnlyMode} />
      <Sidebar
        manager={manager}
        readOnly={isReadOnlyMode}
        activeDesktop={activeDesktop}
        onDesktopChange={onDesktopChange}
        token={token}
      />
    </>
  );
}

export default TransportDetailScreen;
