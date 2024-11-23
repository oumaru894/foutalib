// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5 pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* <div className="col-md-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li><a href="#men" className="footer-link">Men</a></li>
              <li><a href="#women" className="footer-link">Women</a></li>
              <li><a href="#electronics" className="footer-link">Electronics</a></li>
              <li><a href="#accessories" className="footer-link">Accessories</a></li>
            </ul>
          </div> */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@mystore.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#facebook" className="footer-link">Facebook</a></li>
              <li className="list-inline-item"><a href="#twitter" className="footer-link">Twitter</a></li>
              <li className="list-inline-item"><a href="#instagram" className="footer-link">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; 2024 My Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
