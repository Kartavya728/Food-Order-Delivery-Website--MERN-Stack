import React, { useContext, useState } from "react";
import "../Css/MyCart.css";
import { UseCart, UseDispatch } from "../contex/Cart";

function MyCart() {
  const cart = UseCart();
  let dispatch = UseDispatch();

  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: localStorage.getItem("username"),
          orders: cart.map(item => [item.name, item.qty, item.size, item.price, item.img]),
        }),
      });
      const json = await response.json();
      if (response.ok) {
        alert("User order sent successfully!");
        dispatch({ type: "checkout", cart: [] }); // Clear cart
      } else {
        alert(`Error: ${json.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error in user order:", error);
      alert("An error occurred while ordering.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = (index) => {
    dispatch({ type: "REMOVE_ITEM", payload: index });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <br /><br />
          <table className="cart-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.size}</td>
                  <td>{item.price * item.qty}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(index)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="total-row">
                  <strong>Total Price: {totalPrice}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </>
      ) : (
        <div className="empty-cart"><br /><br /><br /><p>Cart is empty</p></div>
      )}
    </div>
  );
}

export default MyCart;

/* Add the following CSS styles in MyCart.css */
