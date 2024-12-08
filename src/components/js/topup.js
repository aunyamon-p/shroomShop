import React, { useState } from 'react';
import '../css/topup.css';
import Truemoney from '../../assets/truemoney.png';
import Promptpay from '../../assets/promptpay.png';

function Topup() {
  const [activeOption, setActiveOption] = useState('truemoney');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [truemoneyLink, setTruemoneyLink] = useState('');

  //เช็คว่าผู้ใช้อัปโหลดไฟล์รึยัง
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  //ลบ ยกเลิกไฟล์ที่อัปโหลด
  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  //เช็คว่าผู้ใช้กรอกลิงก์รึยัง
  const handleTruemoneyChange = (e) => {
    setTruemoneyLink(e.target.value);
  };

  //หน้าเว็บ
  const renderContent = () => {
    switch (activeOption) {
      case 'truemoney':
        return (
          <div className="card">
            <img src={Truemoney} alt="truemoney" className="main-icon" style={{ width: '30%' }} />
            <input 
              type="text" 
              placeholder="กรอกลิงก์ซองของขวัญที่นี่" 
              className="input-box" 
              value={truemoneyLink}
              onChange={handleTruemoneyChange}
            />
            <button 
              className={`confirm-button ${!truemoneyLink ? 'disabled' : ''}`} 
              disabled={!truemoneyLink}>
              ยืนยันการเติมเงิน
            </button>
          </div>
        );
      case 'qrcode':
        return (
          <div className="card">
            <img src={Promptpay} alt="promptpay" className="main-icon" style={{ width: '20%' }} />
            {uploadedFile ? (
              <div className="uploaded-file">
                <p>{uploadedFile.name}</p>
                <button className="remove-file-button" onClick={handleRemoveFile}>✕</button>
              </div>
            ) : (
              <input type="file" className="input-file" onChange={handleFileChange} />
            )}
            <button 
              className={`confirm-button ${!uploadedFile ? 'disabled' : ''}`} 
              disabled={!uploadedFile}>เช็คสลิป</button>
          </div>
        );
      default:
        return <p>กรุณาเลือกช่องทางการเติมเงิน</p>;
    }
  };

  return (
    <div className="topup-container">
      <div className="sidebar">
        <h1 className="page-title">ช่องทางการชำระเงิน</h1>
        <div
          className={`payment-option ${activeOption === 'truemoney' ? 'active' : ''}`}
          onClick={() => setActiveOption('truemoney')}
        >
          <img src={Truemoney} alt="Truemoney" />
          <p>เติมเงินผ่านซองของขวัญ</p>
        </div>
        <div
          className={`payment-option ${activeOption === 'qrcode' ? 'active' : ''}`}
          onClick={() => setActiveOption('qrcode')}
        >
          <img src={Promptpay} alt="promptpay" />
          <p>ยืนยันสลิปผ่าน QR-CODE</p>
        </div>
      </div>

      <div className="content-area">
        <div className="payment-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Topup;
