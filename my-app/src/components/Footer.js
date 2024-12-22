import React from 'react';
import '../Css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Go-Food</h3>
        <p className="footer-description">
          Fast and reliable food delivery at your doorstep. Enjoy delicious meals anytime, anywhere.
        </p>
        <div className="footer-contact">
          <p>Created by: Kartavya Suryawanshi</p>
          <p>Contact: randomemail@example.com | +1 (234) 567-890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Go-Food. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

