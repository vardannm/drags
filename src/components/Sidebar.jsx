import React, { useEffect, useMemo } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { BsGrid1X2 } from "react-icons/bs";
import { FaRegWindowRestore } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { BsWindowSidebar } from "react-icons/bs";
import { useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { IoLockClosedOutline, IoSearchOutline } from 'react-icons/io5';
import { GrDocumentText } from 'react-icons/gr';
import { PiGearFineBold } from 'react-icons/pi';
import { VscNewFile } from 'react-icons/vsc';
import { FaScaleBalanced } from 'react-icons/fa6';
import { MdFavoriteBorder , MdKeyboardArrowDown } from "react-icons/md";
import Form from 'react-bootstrap/Form';
function Sidebar({ manager, readOnly = false , activeDesktop, onDesktopChange, token}) {
  const { mode, setMode, windows, restoreWindow } = manager;
const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
 
  const [taksWindowsOpen, setTaskWindowsOpen] = useState(false);
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [ isAddOpen, setIsAddOpen] = useState(false);
  const save = async () => {
    const finalName = name.trim() || `Layout ${Date.now()}`;
    manager.saveLocalFavorite(finalName);
    setIsAddOpen(false);
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleModeMenu = () => {
    setIsModeMenuOpen(!isModeMenuOpen);
  };
  const toggleTaskWindows = () => {
    setTaskWindowsOpen(!taksWindowsOpen);
  };
  const handleClickOutside = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };
  const handleClickOutsideModeMenu = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsModeMenuOpen(false);
    }
  };
  const handleClickOutsideTaskWindows = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setTaskWindowsOpen(false);
    }
  };
    const favoritesRef = useClickOutside(() => setIsOpen(false), isOpen);
  const modeMenuRef = useClickOutside(() => setIsModeMenuOpen(false), isModeMenuOpen);
  const taskWindowsRef = useClickOutside(() => setTaskWindowsOpen(false), taksWindowsOpen);
  const mergedFavorites = useMemo(() => {
    const backend = manager.backendFavorites.map((item) => ({
      ...item,
      id: item.id || item._id,
      source: 'backend',
    }));
    const local = manager.localFavorites.map((item) => ({ ...item, source: 'local' }));
    return [...backend, ...local];
  }, [manager.backendFavorites, manager.localFavorites]);
const minimizedCount = windows.filter(window => window.minimized && !window.closed).length;
const closedCount = windows.filter(window => window.closed).length;

const showMinimizedBadge = minimizedCount > 0;
const showClosedBadge = closedCount > 0 && !showMinimizedBadge; 
  return (
    <>
     <div className="sidebar-filters">
        <div className="sidebar-filters-buttons">
          <div className='desktop-buttons'>
             <span className='desktop-buttons-label'>Desktops</span>
          <button
              className={`sidebar-filter-button ${activeDesktop=== 'desktop-1' ? "active" : ""}`}
            onClick={() => onDesktopChange('desktop-1')}
            title="Ընդհանուր"
          >
            <IoSearchOutline size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${"" ? "active" : ""}`}
            
            title="Կշեռք"
          >
            <FaScaleBalanced size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${"" ? "active" : ""}`}
            
            title="Կնիքներ"
          >
            <IoLockClosedOutline size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${"" ? "active" : ""}`}
            
            title="Ֆինանսներ"
          >
            <BsCreditCard size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${activeDesktop=== 'desktop-2' ? "active" : ""}`}
            onClick={() => onDesktopChange('desktop-2')}
            title="Փաստաթղթեր"
          >
            <GrDocumentText size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${"" ? "active" : ""}`}
            
            title="Կառավարում"
          >
            <PiGearFineBold size={20} />
          </button>

          <button
            className={`sidebar-filter-button ${"" ? "active" : ""}`}
            
            title="Նոր"
          >
            <VscNewFile size={20} />
          </button>
          </div>
           <div className='dropdown-buttons'>
            <span className='dropdown-buttons-label'>Actions</span>
            <div ref={favoritesRef} style={{ position: 'relative' }}>
              <button
                className={`sidebar-filter-button ${isOpen ? "active" : ""}`}
                title="Նոր"   
                onClick={toggleDropdown}
              >
                <MdFavoriteBorder size={20} />
              </button>
              {isOpen && (
                <div className="favorites-dropdown-panel">
                  {mergedFavorites.length === 0 ? (
                    <div className="no-favorites">No saved favorites yet.</div>
                  ) : (
                    <>
                      {!isAddOpen && (
                        <button type="button" className="add-button" onClick={() => setIsAddOpen(true)}>
                          <span className="button__text">Ավելացնել նորը</span>
                          <span className="button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                              <line y2="19" y1="5" x2="12" x1="12"></line>
                              <line y2="12" y1="12" x2="19" x1="5"></line>
                            </svg>
                          </span>
                        </button>
                      )}
                      {isAddOpen && (
                        <div className="add-favorite-panel">
                          <Form.Control
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Favorite name"
                          />
                          <div className="add-favorite-actions">
                            <button onClick={save}>Save Layout</button>
                            <button onClick={() => setIsAddOpen(false)}>Cancel</button>
                          </div>
                        </div>
                      )}
                      <div className="panel favorites-list">
                        {mergedFavorites.map((favorite) => (
                          <button
                            key={`${favorite.source}-${favorite.id}`}
                            onClick={() => {
                              manager.applyPayload(favorite);
                              setIsOpen(false);       
                            }}
                            disabled={readOnly}
                            className="favorite-item"
                          >
                            [{favorite.source}] {favorite.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

    
            <div ref={modeMenuRef} style={{ position: 'relative' }}>
              <button 
                className={`sidebar-filter-button ${isModeMenuOpen ? "active" : ""}`}
                onClick={toggleModeMenu}
              >
                <FaDesktop size={20} />
              </button>
              {isModeMenuOpen && (
                <div className="window-mode-dropdown-panel">
                  <div className="mode-panel">
                    <button className={`window-mode-button ${mode === 'grid' ? 'active' : ''}`} onClick={() => setMode('grid')}>
                      <BsGrid1X2 size={20} />
                    </button>
                    <button className={`window-mode-button ${mode === 'free' ? 'active' : ''}`} onClick={() => setMode('free')}>
                      <FaRegWindowRestore size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>


            <div ref={taskWindowsRef} style={{ position: 'relative' }}>
              <button
                className={`sidebar-filter-button ${taksWindowsOpen ? "active" : ""}`}
                onClick={toggleTaskWindows}
                title="Նոր"
                style={{ position: 'relative' }}
              >
                <BsWindowSidebar size={20} />
                {minimizedCount > 0 && (
                  <div className="notification-badge minimized">
                    {minimizedCount > 99 ? '99+' : minimizedCount}
                  </div>
                )}
                {closedCount > 0 && minimizedCount === 0 && (
                  <div className="notification-badge closed">
                    {closedCount > 99 ? '99+' : closedCount}
                  </div>
                )}
              </button>
              {taksWindowsOpen && (
                <div className="task-windows">
                  {windows.map((windowState) => (
                    <button
                      key={windowState.id}
                      className={windowState.minimized || windowState.closed ? 'muted' : ''}
                      onClick={() => restoreWindow(windowState.id)}
                    >
                      {windowState.closed ? `↺ ${windowState.title}` : windowState.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>      
      </div>
    </>
  );
}

export default Sidebar;
