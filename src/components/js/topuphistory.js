import React from 'react';
import '../../layouts/App';
import '../css/history.css';

function TopupHistory() {
  const userName = "LALALULU";
  const currMoney = "300";
  const topupData = [{via: "Truemoney Wallet", price: "600", date: "25/11/2024" }];

  return (
    <div className="topup-history-container">
      <h1 className="title">ประวัติการเติมเงิน</h1>
        <div className="title-container">
          <p className="user-name">ผู้ใช้ : <span>{userName}</span></p>
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
              {topupData.length > 0 ? (
                topupData.map((topup, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{topup.via}</td>
                    <td>{topup.price} บาท</td>
                    <td>{topup.date}</td>
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