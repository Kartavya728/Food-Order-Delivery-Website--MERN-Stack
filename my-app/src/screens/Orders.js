import React, { useEffect, useState } from "react";
import "../Css/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/myorders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: localStorage.getItem("username"),
          }),
        });

        const json = await response.json();
        if (response.ok) {
          setOrders(json.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <br/><br/><br/><br/>
      {orders.length === 0 ? (
        <div className="no-orders">No orders yet</div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={order[4]} alt={order[0]} className="order-image" />
            <div className="order-details">
              <h3 className="order-title">{order[0]}</h3>
              <p className="order-qty-size">
                Quantity: {order[1]} | Size: {order[2]}
              </p>
              <p className="order-price">Price: ₹{order[3]}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
