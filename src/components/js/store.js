import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../layouts/App';
import '../css/home.css';

function Store() {
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

  const handleProductClick = (product) => {
    navigate("/product", { state: { product } });
  };

  return (
    <div className="recommend">
      <p>สินค้าทั้งหมด<hr /></p>
      <div className="recommend-content">
        {products.length > 0 ? (
          products.map((product) => (
            <a key={product.id} href="/product" onClick={() => handleProductClick(product)}>
              <button className="product-box">
                <img
                  src={`http://localhost:5000/assets${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-title">{product.name}</div>
                <div className="product-description">{product.shortDescription}</div>
                <div className="product-price">{product.price} บาท</div>
                <button className="order-button">สั่งซื้อสินค้า</button>
                <div className="product-stock">คงเหลือ {product.stock} ชิ้น</div>
              </button>
            </a>
          ))
        ) : (
          <p>กำลังโหลดข้อมูลสินค้า...</p>
        )}
      </div>
    </div>
  );
}

export default Store;
