import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './Offers.css'; // Custom styles

export const Offers = () => {
  return (
    <div className="container py-5 offers-container">
      <div className="row align-items-center">
        
        {/* Left Section: Text */}
        <div className="col-lg-6 col-md-12 text-center text-lg-start">
          <h1 className="display-4 fw-bold">Exclusive</h1>
          <h1 className="display-4 fw-bold">Offers for You</h1>
          <p className="lead">ONLY ON BEST SELLERS PRODUCTS</p>
          <button className="btn btn-primary btn-lg mt-3">Check Now</button>
        </div>

        {/* Right Section: Image */}
        <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
          <img 
            src="/images/exclusive_offer.jpg" 
            alt="Exclusive Offers" 
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Offers;
