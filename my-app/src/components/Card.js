import React, { useState, useEffect } from "react";
import "../Css/Card.css";
import { UseDispatch } from "../contex/Cart";


function Card({ img, title, sizeOptions,id }) {
  const [selectedSize, setSelectedSize] = useState(Object.keys(sizeOptions)[0]); 
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(sizeOptions[Object.keys(sizeOptions)[0]]);
  let dispatch= UseDispatch();
  // Storing the price as a number

  useEffect(() => {
    if (selectedSize || quantity ) {
      setPrice(sizeOptions[selectedSize] * quantity); // Update price when size or quantity changes
    }
  }, [selectedSize, quantity, sizeOptions]);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size); // Update selected size
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty); // Update quantity
  };

  const handleAddToCart =async (item) => {
    if(!localStorage.getItem("authToken")){
      alert("Please Login to order food")
    }
    else{
      alert(`${quantity} x ${title} (${selectedSize}) added to cart!`);
      dispatch({type:"ADD",id:id,name:title,img:img,qty:quantity,size:selectedSize,price:price})
  }};

  return (
    <div className="card">
      {/* Image Section */}
      <img src={img} alt={title} className="card-img" />

      {/* Title Section */}
      <h2 className="card-title">{title}</h2>

      {/* Dropdown Buttons and Price Section */}
      <div className="card-row">
        <select
          className="card-dropdown"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          {Object.entries(sizeOptions).map(([size, price]) => (
            <option key={size} value={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="card-dropdown"
          value={quantity}
          onChange={handleQuantityChange}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <p className="card-price">₹{price}</p>
      </div>
      <hr style={{ border: "0.5px solid #3b3b3b", width: "80%" }} />

      <button className="card-btn" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  );
}

export default Card;
