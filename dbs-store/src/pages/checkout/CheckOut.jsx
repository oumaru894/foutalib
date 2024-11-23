import React, { useState, useContext } from 'react';
import { CartContext } from '../../components/Context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem } = useContext(CartContext);
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    contact: '',
  });
  const [countryCode, setCountryCode] = useState('+231'); // Default country code
  const [shippingMethod, setShippingMethod] = useState('Delivery');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.slice(0, 15); // Limit phone number to 15 digits
    setBillingInfo((prev) => ({ ...prev, contact: value }));
  };

  const handleReviewOrder = () => {
    if (!billingInfo.name || billingInfo.contact.length < 7 || billingInfo.contact.length > 15) {
      alert("Please ensure the Name is entered and Contact is between 7 and 15 digits.");
      return;
    }
    const fullContact = `${countryCode}${billingInfo.contact}`; // Combine country code and phone number
    navigate('/reviewOrder', { state: { billingInfo: { ...billingInfo, contact: fullContact }, shippingMethod } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Checkout</h2>
      
      <h3 className="mt-4">Billing Information</h3>
      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={billingInfo.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact:</label>
            <div className="input-group">
              <span className="input-group-text">{countryCode}</span>
              <input
                type="number"
                name="contact"
                value={billingInfo.contact}
                onChange={handlePhoneNumberChange}
                className="form-control"
                required
                minLength="7"
                maxLength="15"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <h3 className="mt-4">Shipping Method</h3>
        <div className="mb-3">
          <select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            className="form-select"
          >
            <option value="Delivery">Delivery</option>
            <option value="Meet Up">Meet Up</option>
          </select>
        </div>

        <button type="button" className="btn btn-primary" onClick={handleReviewOrder}>
          Review Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
