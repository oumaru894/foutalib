import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../../components/Context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Cart from '../../hooks/cartCall' // Import the custom Cart hook
import { addOrderURL, mainImageURI } from '../../components/assets/constants/Urls/Url';
import axios from 'axios';

const ReviewOrderPage = () => {
  const { state } = useLocation();
  const { billingInfo, shippingMethod } = state || {};  // Retrieve from state
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const { cartData, error, isLoading } = Cart(); // Use the custom Cart hook

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartData && cartData.length > 0
      ? cartData.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;
  };

  const subtotal = calculateSubtotal();

  const handlePlaceOrder = async () => {

    const id = JSON.parse(localStorage.getItem("id"));
    const orderData = {
      billingInfo,
      shippingMethod,
      cartItems: cartData,
      totalAmount: subtotal,
    };
    setLoading(true);

    

    try {
      // Await the response from the API call
      const response = await axios.post(addOrderURL, orderData);
      
      if (response.status === 201) {
        setAlertMessage("Order placed successfully!"); // Show success message
        setTimeout(() => setAlertMessage(''), 3000); // Hide alert after 3 seconds

        localStorage.setItem('orderData', JSON.stringify(orderData));
        navigate(`/payment`, { state: { totalAmount: subtotal.toFixed(2), invoice:response.data } });
      } else {
        setAlertMessage("Order failed. Please try again."); // Show failure message
        setTimeout(() => setAlertMessage(''), 3000); // Hide alert after 3 seconds
      }

    } catch (error) {
      setAlertMessage("There was an error placing the order: " + error.message);
      setTimeout(() => setAlertMessage(''), 3000); // Hide alert after 3 seconds
      //console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2>Review Your Order</h2>

      {/* Alert message */}
      {alertMessage && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          {alertMessage}
        </div>
      )}

      {/* Billing Information */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>Billing Information</h4>
          <p><strong>Name:</strong> {billingInfo?.name}</p>
          <p><strong>Address:</strong> {billingInfo?.address}</p>
          <p><strong>Contact:</strong> {billingInfo?.contact}</p>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>Shipping Method</h4>
          <p>{shippingMethod}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>Order Summary</h4> 
          {isLoading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p>No item  found in cart</p>
          ) : cartData && cartData.length > 0 ? (
            cartData.map((item) => (
              <div key={item.id} className="d-flex justify-content-between mb-3">
                <div>
                  <p><strong>{item.product_name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <img
                  src={`${mainImageURI}${String(item.product_id+"_"+0)}/${item.product_id}`}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>

      {/* Order Totals */}
      <div className="mt-4">
        <h4>Order Total</h4>
        <h5>Total: ${subtotal.toFixed(2)}</h5>
      </div>

      {/* Place Order Button */}
      <div className="mt-4 text-center">
        {
          !isLoading && !error && cartData.length > 0 ? (
            loading ? 'loading...' : (
              <button
                className="btn btn-primary btn-lg"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            )
          ) : "Loading..."
        }
      </div>
    </div>
  );
};

export default ReviewOrderPage;
