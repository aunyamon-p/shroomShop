import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../layouts/App';
import '../css/history.css';

function BuyHistory() {
  const [buyhtr, setBuyHistory] = useState([]);
  const {loggedInUser} = useOutletContext(); //ตัวแปรไว้แสดงชื่อผู้ใช้ ส่งค่ามาจากไฟล์ App.js
  
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
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  //หน้าเว็บ
  return (
    <div className="buy-history-container">
      <h1 className="title">ประวัติการซื้อ</h1>
        <div className="title-container">
          {/*แสดงชื่อผู้ใช้*/}
          <p className="user-name">ผู้ใช้ : <span>{loggedInUser}</span></p>
        </div>
        {/*ตารางแสดงประวัติการซื้อสินค้า*/}
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>รายการ</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {/*ข้อมูลในตารางที่ดึงมาจาก .json*/}
              {buyhtr.length > 0 ? (
                buyhtr.map((buyhistory) => (
                  <tr>
                    <td>{buyhistory.id}</td>
                    <td>{buyhistory.name}</td>
                    <td>{buyhistory.price} บาท</td>
                    <td>{buyhistory.amount}</td>
                    <td>{buyhistory.date}</td>
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

export default BuyHistory;