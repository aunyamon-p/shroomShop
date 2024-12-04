import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../../layouts/App';
import "../css/product.css";

function Product() {
  const location = useLocation();
  const { product } = location.state || {};
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleBuy = () => {
    alert(`คุณได้เลือกซื้อจำนวน ${quantity} ชิ้น`);
  };

 
  if (!product) {
      return <div>ไม่พบข้อมูลสินค้า</div>;
    }

    return (
      <div className="container">
        <div className="left-section">
          <img
            src={`http://localhost:5000/assets${product.image}`}
            alt={product.name}
            className="productpic"
          />
        </div>
        <div className="right-detail">
          <div className="right-section">
            <h1>{product.name}</h1>
            <hr />
            <p className="note">{product.shortDescription}</p>
            <p className="note" dangerouslySetInnerHTML={{__html: product.longDescription.replace(/\n/g, "<br />"),}}></p>
          </div>
          <div className="price">
            <span>ราคา : </span>
            <span style={{ color: "#7fff00", marginLeft: "10px" }}>{product.price} บาท</span>
            <span style={{ float: "right", color: "#fff" }}>เหลือ {product.stock} ชิ้น</span>
          </div>
          <div className="quantity">
            <button className="quantity-btn" onClick={handleDecrease}>-</button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={handleIncrease}>+</button>
          </div>
          <button className="buy-button" onClick={handleBuy}>สั่งซื้อสินค้า</button>
        </div>
      </div>
  );
}

export default Product;
