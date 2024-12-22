import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"; // Assuming Modal is in the same folder
import MyCart from "../components/MyCart"; // Importing the MyCart component
import "../Css/NavBar.css";

function NavBar({ authToken, setAuthToken, user }) {
  const [CartVisible, setCartVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null); // Clear the token in the parent state

  
  };
  return (
    <div className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        {authToken ? (
          <h1 className="navbar-title">hi,{localStorage.getItem("username")}!</h1>
        ) : (
          <h1 className="navbar-title">Go-Food</h1>
        )}
      </div>

      {/* Center Section */}
      <div className="navbar-center">
        <Link to="/" end>
          <button className="nav-button transparent-button">Home</button>
        </Link>
        {authToken && (
          <Link to="/orders" end>
            <button className="nav-button transparent-button">Ordered Food</button>
          </Link>
        )}
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {!authToken ? (
          <>
            <Link to="/login" end>
              <button className="nav-button white-button">Log In</button>
            </Link>
            <Link to="/signup" end>
              <button className="nav-button white-button">Sign Up</button>
            </Link>
          </>
        ) : (
          <div>
            <button
              className="nav-button white-button"
              onClick={() => {
                setCartVisible(true);
              }}
            >
              My Cart
            </button>

            <button className="nav-button white-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Modal for Cart */}
      {CartVisible && (
        <Modal onClose={() => setCartVisible(false)}>
          <MyCart />
        </Modal>
      )}
    </div>
  );
}

export default NavBar;


