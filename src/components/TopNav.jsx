import React, { useState, useEffect, useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaCircleUser, FaPalette } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import '../styles/TopNav.css';

const THEME_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'sunrise', label: 'Bright Sunrise' },
  { value: 'mint', label: 'Bright Mint' },
  { value: 'lavender', label: 'Bright Lavender' },
  { value: 'custom', label: 'Custom' },
];

function TopNav({
  user,
  onLogout,
  selectedOperation = 'Տրանսպորտ. միջոցներ',
  theme = 'default',
  setTheme,
}) {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [firstNavHeight, setFirstNavHeight] = useState(140);
  const operationRef = useRef(null);
  const accountRef = useRef(null);
  const themeRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScrollResize = () => {
    setTimeout(() => {
      if (window.scrollY > 100) {
        setFirstNavHeight(20);
      } else if (window.scrollY > 20) {
        setFirstNavHeight(70);
      } else if (window.scrollY > 10) {
        setFirstNavHeight(80);
      } else if (window.innerWidth < 360) {
        setFirstNavHeight(146);
      } else if (window.innerWidth < 764) {
        setFirstNavHeight(120);
      } else if (window.innerWidth < 1086) {
        setFirstNavHeight(158);
      } else {
        setFirstNavHeight(137);
      }
    }, 0);
  };

  const handleClickOutside = (e) => {
    if (operationRef.current && !operationRef.current.contains(e.target)) {
      setShow(false);
    }

    if (accountRef.current && !accountRef.current.contains(e.target)) {
      setOpen(false);
    }

    if (themeRef.current && !themeRef.current.contains(e.target)) {
      setThemeOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollResize);
    window.addEventListener('resize', handleScrollResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScrollResize);
      window.removeEventListener('resize', handleScrollResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const isTransportSelected = selectedOperation === 'Տրանսպորտ. միջոցներ';

  return (
    <header className="top-nav">
      <button className="offcanvas-button" onClick={handleShow}>
        <RxHamburgerMenu size={24} />
      </button>

      <div className="top-nav-right">
        <div className="top-nav-dropdown-wrap" ref={themeRef}>
          <button className="top-nav-trigger" onClick={() => setThemeOpen((prev) => !prev)}>
            <FaPalette size={20} />
            <span>Theme</span>
          </button>
          {themeOpen && (
            <div className="top-nav-menu theme-menu">
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={theme === option.value ? 'active-theme' : ''}
                  onClick={() => {
                    if (setTheme) setTheme(option.value);
                    setThemeOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="top-nav-dropdown-wrap" ref={accountRef}>
          <button className="top-nav-trigger" onClick={() => setOpen((prev) => !prev)}>
            <div>{user.name}</div>
            <FaCircleUser size={24} />
          </button>
          {open && (
            <div className="top-nav-menu">
              <div className="top-nav-user">{user.email}</div>
              <button onClick={onLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>

      <Offcanvas
        show={show}
        className="canvas"
        onHide={handleClose}
        backdrop={false}
        scroll={true}
        style={{
          top: `${firstNavHeight}px`,
        }}
      >
        <Offcanvas.Header className="canvas-header" closeButton>
          <Offcanvas.Title className="text-cs-blue">Գործողություններ</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0" ref={operationRef}>
          <div role="canvaslist" className="operation-list">
            <ul className="flex p-0 mt-4 list">
              <div className="ramka">
                <li className={`li-member ${isTransportSelected ? 'active-op' : ''}`}>
                  <span className="link">Տրանսպորտ. միջոցներ</span>
                </li>
                <li className="li-member main-link">
                  <span className="link">Հսկողության տեսակներ</span>
                </li>
                <li className="li-member search">
                  <span className="link">Ստեղծել</span>
                </li>
                <li className="li-member search">
                  <span className="link">
                    <CiSearch size={24} /> Որոնել
                  </span>
                </li>
                <li className="li-member main-link">
                  <span className="link">Գրաֆիկ</span>
                </li>
                <li className="li-member search">
                  <span className="link">Ստեղծել</span>
                </li>
                <li className="li-member search">
                  <span className="link">
                    <CiSearch size={24} /> Որոնել
                  </span>
                </li>
                <li className="li-member main-link">
                  <span className="link">Պաշտոն</span>
                </li>
                <li className="li-member search">
                  <span className="link">Ստեղծել</span>
                </li>
                <li className="li-member search">
                  <span className="link">
                    <CiSearch size={24} />Որոնել
                  </span>
                </li>
                <li className="li-member main-link">
                  <span className="link">Տեսախցիկներ</span>
                </li>
                <li className="li-member search">
                  <span className="link">Ստեղծել</span>
                </li>
                <li className="li-member search">
                  <span className="link">
                    <CiSearch size={24} /> Որոնել
                  </span>
                </li>
                <li className="li-member">
                  <span className="link">Հաշվետվություններ</span>
                </li>
              </div>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default TopNav;
