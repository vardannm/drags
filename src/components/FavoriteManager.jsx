import React, { useState } from 'react';

function FavoriteManager({ manager, token }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const save = async () => {
    const finalName = name.trim() || `Layout ${Date.now()}`;
    manager.saveLocalFavorite(finalName);

    try {
      if (token) {
        await manager.saveBackendFavorite(finalName);
        setStatus('Saved locally + backend');
      } else {
        setStatus('Saved locally (login to sync backend)');
      }
    } catch {
      setStatus('Saved locally, backend sync failed');
    }

    setName('');
  };

  return (
    <div className="favorite-manager">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Favorite name"
      />
      <button onClick={save}>Save Layout</button>
      {status && <small>{status}</small>}
    </div>
  );
}

export default FavoriteManager;
