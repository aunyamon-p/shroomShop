import React from 'react';
import '../../layouts/App';
import '../css/history.css';

function BuyHistory() {
  const userName = "LALALULU";
  const orderData = [{product: "ไอดีเห็ด 100K", price: "300", quantity: 2, date: "26/11/2024" }];

  return (
    <div className="buy-history-container">
      <h1 className="title">ประวัติการซื้อ</h1>
        <div className="title-container">
          <p className="user-name">ผู้ใช้ : <span>{userName}</span></p>
        </div>
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
              {orderData.length > 0 ? (
                orderData.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.product}</td>
                    <td>{order.price} บาท</td>
                    <td>{order.quantity}</td>
                    <td>{order.date}</td>
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