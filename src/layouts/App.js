import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import footer from '../assets/footer.png';
import logout from '../assets/logout.png';
import user from '../assets/user.png';
import Login from '../components/js/login';
import Register from '../components/js/register';
import Contact from '../components/js/contact';
import '../App.css';
import IG from '../assets/instagram.png';
import Facebook from '../assets/facebook.png';
import Line from '../assets/line.png';
import Discord from '../assets/discord.png';
import Background from '../assets/background.mp4';

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  const openLoginModal = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeModal = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setContactOpen(false);
  };

  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    setDropdownOpen(false);
    localStorage.setItem('loggedInUser', username);
    closeModal();
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setDropdownOpen(false);
    localStorage.removeItem('loggedInUser');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleRestrictedAccess = (event, path) => {
    event.preventDefault();
    if (loggedInUser) {
      navigate(path);
    } else {
      openLoginModal();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="App">
      <header className="App-header">
        <ul className="menu">
          <div className="left-buttons">
            <li>
              <button className="cart">
                <a href="/">
                  <img src={logo} className="App-logo" alt="logo" style={{ width: '49px' }} />
                </a>
              </button>
            </li>
            <li>
              <a className="home" href="/">HOME</a>
            </li>
            <li>
              <a className="store" href="/store">STORE</a>
            </li>
            <li>
              <a className="contact" onClick={() => setContactOpen(true)}>CONTACT</a>
            </li>
          </div>

          <div className="right-buttons">
          <li className="money">
              <a className="money" href="/topup" onClick={(e) => handleRestrictedAccess(e, '/topup')}>เติมเงิน</a>
            </li>
            {loggedInUser ? (
              <li 
                className="username-dropdown"
                onClick={toggleDropdown}
                ref={dropdownRef}
              >
                <img src={user} className="user" alt="user" style={{ width: '20px', marginRight: '7px' }} />
                {loggedInUser} ▼
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li><a href="/topuphistory">ประวัติการเติมเงิน</a></li>
                    <li><a href="/buyhistory">ประวัติการซื้อ</a></li>
                    <li className="logout" onClick={handleLogout}>
                      <img src={logout} className="logout-icon" alt="logout" style={{ width: '15px', marginRight: '5px' }} />
                      ออกจากระบบ
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li className="login">
                <button className="login" onClick={openLoginModal}>เข้าสู่ระบบ</button>
              </li>
            )}
            
          </div>
        </ul>
      </header>

      <main className="main-container">
        <div className="video-background">
          <video autoPlay muted loop className="video-content">
            <source src={Background} type="video/mp4" />
          </video>
        </div>
        <div className="content-overlay">
          <Outlet context={{ handleRestrictedAccess }} />
        </div>
      </main>


      {isLoginOpen && <Login onClose={closeModal} openRegisterModal={openRegisterModal} onLoginSuccess={handleLoginSuccess} />}
      {isRegisterOpen && <Register onClose={closeModal} openLoginModal={openLoginModal} onLoginSuccess={handleLoginSuccess} />}
      {isContactOpen && <Contact onClose={closeModal} />}

      <div className="footer">
        <div className="footer-content">
          <div className="left-footer">
            <img src={footer} className="footer-image" alt="footer logo"/>
          </div>
          <div className="right-footer">
            <h3>ช่องทางการติดต่อ</h3>
            <div className="icon-contact"><img src={Facebook} className="icon-contact" alt="facebook" style={{width: '25px'}}/><li>Facebook : Shroom Shop</li></div>
            <div className="icon-contact"><img src={Line} className="icon-contact" alt="line" style={{width: '25px'}}/><li>Line : @shroomOfficial</li></div>
            <div className="icon-contact"><img src={IG} className="icon-contact" alt="instragram" style={{width: '25px'}}/><li>Instragram : ShroomShop</li></div>
            <div className="icon-contact"><img src={Discord} className="icon-contact" alt="discord" style={{width: '25px'}}/><li>Discord : ShroomShop</li></div>
          </div>
        </div>
        <p>© {new Date().getFullYear()} shopotpot. สงวนลิขสิทธิ์.</p>
      </div>
    </div>
  );
}

export default App;
