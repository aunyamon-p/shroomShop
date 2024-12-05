import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext,useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const recommendedProducts = products.filter((product) => product.recommend === "yes");

  const handleProductClick = (product, e) => {
    e.preventDefault();
    console.log('Selected product:', product);
    handleRestrictedAccess(e, '/product', { product });  // ส่ง product ไปยังหน้า /product
  };
  
  
  

  return (
    <div className="Home">
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

      <div className="static">
        <div className="total-user">
          <p style={{ fontWeight: 'bold' }}>ผู้ใช้งาน</p>
          <p style={{ fontSize: '19px' }}>"...คน"</p>
        </div>
        <div className="total-sale">
          <p style={{ fontWeight: 'bold' }}>ยอดขาย</p>
          <p style={{ fontSize: '19px' }}>"...บาท"</p>
        </div>
        <div className="total-stock">
          <p style={{ fontWeight: 'bold' }}>สินค้าทั้งหมด</p>
          <p style={{ fontSize: '19px' }}>"...รายการ"</p>
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
