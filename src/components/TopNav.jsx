import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RxHamburgerMenu } from "react-icons/rx";

function TopNav({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!user) return null;

  return (
    <header className="top-nav">
      <button className="offcanvas-button" onClick={handleShow}>
        <RxHamburgerMenu />
      </button>
      <button 
        className="top-nav-trigger" 
        onClick={() => setOpen((prev) => !prev)}
      >
        {user.name} ▾
      </button>
      {open && (
        <div className="top-nav-menu">
          <div className="top-nav-user">{user.email}</div>
          <button onClick={onLogout}>Log out</button>
        </div>
      )}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default TopNav;