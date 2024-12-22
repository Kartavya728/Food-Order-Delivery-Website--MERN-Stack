import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import '../Css/Modal.css';

export default function Modal({ children, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // Trigger the closing animation
    setTimeout(() => {
      onClose(); // Call the provided close handler after the animation
    }, 300); // Duration matches the animation timing
  };

  useEffect(() => {
    document.body.style.overflow = isClosing ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isClosing]);

  return ReactDom.createPortal(
    <>
      <div
        className={`modal-overlay ${isClosing ? 'fade-out' : ''}`}
        onClick={handleClose}
      />
      <div
        className={`modal-container ${isClosing ? 'slide-out' : 'slide-in'}`}
        style={{ maxHeight: '80vh', overflowY: 'auto' }} // Add styles for scrollable content
      >
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
