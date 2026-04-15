import React, { useState } from 'react';

function FavoriteManager({ manager }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const save = () => {
    const finalName = name.trim() || `Layout ${Date.now()}`;
    manager.saveLocalFavorite(finalName);
    setStatus('Saved locally');

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
