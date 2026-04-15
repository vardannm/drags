import React, { useRef } from 'react';

function ImportsWindow({ docsData, setDocsData }) {
  const fileInputRef = useRef(null);

  const onImport = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const rows = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      uploadedAt: new Date().toLocaleString(),
      status: 'Queued',
    }));

    setDocsData((prev) => ({ ...prev, imports: [...rows, ...prev.imports] }));
    event.target.value = '';
  };

  return (
    <div className="window-form">
      <div className="row-between">
        <h3>Document Import Table</h3>
        <>
          <button className="primary-btn" onClick={() => fileInputRef.current?.click()}>
            Import Fake PDFs
          </button>
          <input
            ref={fileInputRef}
            hidden
            multiple
            type="file"
            accept="application/pdf,.pdf"
            onChange={onImport}
          />
        </>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>PDF Name</th>
            <th>Size (KB)</th>
            <th>Imported</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {docsData.imports.length === 0 ? (
            <tr>
              <td colSpan="4">No imported PDFs yet.</td>
            </tr>
          ) : (
            docsData.imports.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.sizeKb}</td>
                <td>{row.uploadedAt}</td>
                <td>{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ImportsWindow;
