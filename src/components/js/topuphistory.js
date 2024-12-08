import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../layouts/App';
import '../css/history.css';

function TopupHistory() {
  const [topuphtr, setTopup] = useState([]);
  const { loggedInUser, currMoney } = useOutletContext();
  
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

  return (
    <div className="topup-history-container">
      <h1 className="title">ประวัติการเติมเงิน</h1>
        <div className="title-container">
          {/*แสดงชื่อผู้ใช้*/}
          <p className="user-name">ผู้ใช้ : <span>{loggedInUser}</span></p>
          {/*แสดงยอดเงินปัจจุบัน*/}
          <p className="currmoney">ยอดเงินปัจจุบัน : <span>{currMoney}</span></p> 
        </div>
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ช่องทาง</th>
                <th>จำนวน</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {topuphtr.length > 0 ? (
                topuphtr.map((topuphistory) => (
                  <tr>
                    <td>{topuphistory.id}</td>
                    <td>{topuphistory.via}</td>
                    <td>{topuphistory.amount} บาท</td>
                    <td>{topuphistory.date}</td>
                  </tr>
                ))
              
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>
          </table> 
        </div>
    </div>
  );
}

export default TopupHistory;