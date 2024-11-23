// src/components/Newsletter/Newsletter.jsx
import React from 'react';
import './NewsLetter.css'; // Custom CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Newsletter = () => {
  return (
    <section className="newsletter-container">
      <div className="container text-center">
        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
        <p className="newsletter-subtitle">Stay updated with the latest collections and offers.</p>
        
        <form className="newsletter-form">
          <div className="input-group mb-3">
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              aria-label="Enter your email" 
              aria-describedby="button-addon"
              required
            />
            <div className="input-group-append">
              <button 
                className="btn btn-primary" 
                type="submit" 
                id="button-addon"
              >
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
