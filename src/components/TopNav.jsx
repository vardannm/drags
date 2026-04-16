import React, { useState } from 'react';

function TopNav({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="top-nav">
      <button className="top-nav-trigger" onClick={() => setOpen((prev) => !prev)}>
        {user.name} ▾
      </button>

      {open && (
        <div className="top-nav-menu">
          <div className="top-nav-user">{user.email}</div>
          <button onClick={onLogout}>Log out</button>
        </div>
      )}
    </header>
  );
}

export default TopNav;
