import { useState, useEffect } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom'; // ✅ Added useLocation
import './header.css';

import KeepLogo from '../../assets/KeepLogo.png';
import {
  MdMenu,
  MdSearch,
  MdRefresh,
  MdSettings,
  MdApps,
  MdAccountCircle
} from 'react-icons/md';


export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const location = useLocation(); // ✅ Added
  const navigate = useNavigate();

  const handleAccountClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openDrawer=() => {
      setDrawer(!drawer);
      console.log("Drawer opened");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // ✅ Ensure correct state after any route change
  }, [location]); // ✅ Run on route change

  return (
    <>
      <header className="top">

        {/* Left Part */}
        <div className='left-part'>
          <div className='icon-wrapper'>
            <MdMenu className='menu-icon' onClick={()=>openDrawer()}/>
          </div>
          <Link to={"/"}>
          <img src={KeepLogo} alt='Keep Logo' className='keep-logo' />

          </Link>
          <span className="header-main-text">NOTIFY</span>
        </div>

        {/* Center Part */}
        <div className="center-part">
          <div className="keep-search-box">
            <MdSearch className="keep-search-icon" />
            <input
              type="text"
              className="keep-search-input"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right Part */}
        <div className='right-part'>
          <div className='icon-wrapper'>
            <MdRefresh className='refresh-icon' />
          </div>

          <div className='icon-wrapper'>
            <svg
              className='toggle-icon'
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="list_view_24px" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <polygon
                  id="bounds"
                  fillOpacity="0"
                  fill="#FFFFFF"
                  points="0 0 24 0 24 24 0 24"
                ></polygon>
                <path
                  className='toggle-path'
                  d="M20,9 L4,9 L4,5 L20,5 L20,9 Z M20,19 L4,19 L4,15 L20,15 L20,19 Z M3,3 C2.45,3 2,3.45 2,4 L2,10 C2,10.55 2.45,11 3,11 L21,11 C21.55,11 22,10.55 22,10 L22,4 C22,3.45 21.55,3 21,3 L3,3 Z M3,13 C2.45,13 2,13.45 2,14 L2,20 C2,20.55 2.45,21 3,21 L21,21 C21.55,21 22,20.55 22,20 L22,14 C22,13.45 21.55,13 21,13 L3,13 Z"
                  id="icon"
                  fill="#5f6368"
                  fillRule="nonzero"
                ></path>
              </g>
            </svg>
          </div>

          <div className='icon-wrapper'>
            <MdSettings className='settings-icon' />
          </div>

          <div className='icon-wrapper'>
            <MdApps className='apps-icon' />
          </div>

          {/* Account Icon with dropdown */}
          <div className='icon-wrapper' style={{ position: 'relative' }}>
            <MdAccountCircle
              className='account-circle-icon'
              style={{ cursor: 'pointer' }}
              onClick={handleAccountClick}
            />
            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '0.5rem',
                  zIndex: 1000,
                  minWidth: '100px',
                }}
              >
                {!loggedIn ? (
                  <>
                    <Link
                      to="/login"
                      style={{
                        display: 'block',
                        padding: '5px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      style={{
                        display: 'block',
                        padding: '5px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <div
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </header>
    </>
  );
};
