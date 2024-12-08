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
  const [topuphtr, setTopup] = useState([]);
  const [buyhtr, setBuyHistory] = useState([]);
  const [currMoney, setCurrMoney] = useState(0);

  //บันทึกข้อมูลของผู้ใช้ที่มีการเข้าสู่ระบบไว้
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) setLoggedInUser(savedUser);
  }, []);

  //เปิดหน้าต่างเข้าสู่ระบบ
  const openLoginModal = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  //เปิดหน้าต่างลงทะเบียน
  const openRegisterModal = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  //ปุ่มกากบาทเพื่อปิดหน้าต่าง
  const closeModal = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setContactOpen(false);
  };

  //เก็บ username ผู้ใช้ที่เข้าสู่ระบบไว้แสดง
  const handleLoginSuccess = (username) => {
    setLoggedInUser(username);
    setDropdownOpen(false);
    localStorage.setItem('loggedInUser', username);
    closeModal();
  };

  //เช็คว่าเข้าสู่ระบบสำเร็จมั้ย
  const handleRestrictedAccess = (event, path, state = {}) => {
    event.preventDefault();
    if (loggedInUser) {
      navigate(path, { state });
    } else {
      openLoginModal();
    }
  };

  //กดออกจากระบบ
  const handleLogout = () => {
    setLoggedInUser(null);
    setDropdownOpen(false);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };


  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  //ให้แสดงหน้าเว็บบนสุดก่อนเสมอ
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  //Dropdown-menu เมื่อเข้าสู่ระบบแล้ว
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

  //ดึงข้อมูลประวัติการซื้อจากไฟล์ buyhistory.json
  useEffect(() => {
    fetch('http://localhost:5000/api/buyhistory')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setBuyHistory(data))
      .catch((error) => console.error('Error fetching buy history:', error));
  }, []);

  //ดึงข้อมูลประวัติการเติมเงินจากไฟล์ topuphistory.json
  useEffect(() => {
    fetch('http://localhost:5000/api/topuphistory')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTopup(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  //คำนวณยอดเงินปัจจุบัน
  useEffect(() => {
    const totalTopup = topuphtr.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalSpent = buyhtr.reduce((sum, item) => sum + parseFloat(item.price), 0); 
    setCurrMoney(totalTopup - totalSpent);
  }, [topuphtr, buyhtr]);

  //หน้าเว็บ
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
                    <li className='curr-money'>🪙 {currMoney}฿</li>
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
          <Outlet context={{ handleRestrictedAccess, loggedInUser, currMoney }} />
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
