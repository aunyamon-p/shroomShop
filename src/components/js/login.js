import React, { useState } from 'react';
import '../css/login.css';
import Character from '../../assets/character.gif';
import Error from '../../assets/error.png';

function Login({ onClose, openRegisterModal, onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                onLoginSuccess(username);
            } else {
                setErrorMessage(data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="modal-body">
                    <img src={Character} alt="Character" className="modal-image"/>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>เข้าสู่ระบบ</h2>

                        {errorMessage && <p className='errormessage'><img src={Error} style={{width: '17px', marginRight: '10px'}} alt="error"/>{errorMessage}</p>}

                        <div className="form-group">
                            <label htmlFor="username">ชื่อผู้ใช้</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">รหัสผ่าน</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="login-button">เข้าสู่ระบบ</button>
                        
                        <p className='register'>
                            ยังไม่มีบัญชี? <button className='register' onClick={openRegisterModal}>ลงทะเบียน</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
