import React, { useState } from 'react';

function FavoriteManager({ manager, token }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const save = async () => {
    const finalName = name.trim() || `Layout ${Date.now()}`;
    manager.saveLocalFavorite(finalName);
    if (!token) {
      setStatus('Saved locally');
      setName('');
      return;
    }

    try {
      await manager.saveBackendFavorite(finalName);
      setStatus('Saved locally + backend');
    } catch {
      setStatus('Saved locally (backend failed)');
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
