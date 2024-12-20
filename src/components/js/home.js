import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';
import topup from '../../assets/topup.png';
import history from '../../assets/history.png';
import '../css/home.css';

function Home() {
  const banners = [banner1, banner2, banner3];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const trackRef = useRef(null);
  const { handleRestrictedAccess } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  //ดึงข้อมูลสินค้าทั้งหมดจากไฟล์ product.json
  useEffect(() => {
    fetch('http://localhost:5000/api/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  //ดึงข้อมูล & นับจำนวนผู้ใช้ท้งหมดจากไฟล์ users.json
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data from API users:', data);
        if (Array.isArray(data)) {
          setTotalUsers(data.length);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  //นับจำนวนสินค้าทั้งหมดในไฟล์ product.json
  useEffect(() => {
    fetch('http://localhost:5000/api/products/count')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTotalProducts(data.total))
      .catch((error) => console.error('Error fetching product count:', error));
  }, []);

  //ฟังก์ชันให้ภาพเลื่อน
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  //ตัวแปรเก็บรายการสินค้าแนะนำ
  const recommendedProducts = products.filter((product) => product.recommend === "yes");

  //เมื่อคลิกเลือกสินค้า จะแสดงข้อมูลของสินค้านั้นๆ
  const handleProductClick = (product, e) => {
    e.preventDefault();
    console.log('Selected product:', product);
    handleRestrictedAccess(e, '/product', { product }); 
  };

  //หน้าเว็บ
  return (
    <div className="Home">
      {/*ภาพเลื่อน*/}
      <div className="banner-slider">
        <div
          className="banner-track"
          ref={trackRef}
          style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <img key={index} src={banner} alt={`banner${index}`} className="banner" />
          ))}
        </div>
      </div>
      
      {/*แสดงจำนวนผู้ใช้ ยอดขาย รายการทั้งหมด*/}
      <div className="static">
        <div className="total-user">
          <p style={{ fontWeight: 'bold' }}>ผู้ใช้งาน</p>
          <p style={{ fontSize: '19px' }}>{totalUsers} คน</p>
        </div>
        <div className="total-sale">
          <p style={{ fontWeight: 'bold' }}>ยอดขาย</p>
          <p style={{ fontSize: '19px' }}>"...บาท"</p>
        </div>
        <div className="total-stock">
          <p style={{ fontWeight: 'bold' }}>สินค้าทั้งหมด</p>
          <p style={{ fontSize: '19px' }}>{totalProducts} รายการ</p>
        </div>
      </div>
      
      <div className="submenu">
        <button className="topupbtn">
          <a href="/topup" onClick={(e) => handleRestrictedAccess(e, '/topup')}>
            <img src={topup} className="topup" alt="topup" />
          </a>
        </button>
        <button className="htrbtn">
          <a href="/buyhistory" onClick={(e) => handleRestrictedAccess(e, '/buyhistory')}>
            <img src={history} className="history" alt="history"/>
          </a>
        </button>
      </div>
      
      {/*แสดงรายการสินค้าแนะนำ*/}
      <div className="recommend">
        <p>สินค้าแนะนำ <hr /></p>
        <div className="recommend-content">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((product) => (
              <button onClick={(e) => handleProductClick(product, e)} key={product.id} className="product-box">
                <img
                  src={`http://localhost:5000/assets${product.image}`}
                  alt={product.name}
                  className="product-image"/>
                <div className="product-title">{product.name}</div>
                <div className="product-description">{product.shortDescription}</div>
                <div className="product-price">{product.price}฿</div>
                <button className="order-button">สั่งซื้อสินค้า</button>
                <div className="product-stock">คงเหลือ {product.stock} ชิ้น</div>
              </button>
            ))
          ) : (
            <p>กำลังโหลดข้อมูลสินค้า...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
