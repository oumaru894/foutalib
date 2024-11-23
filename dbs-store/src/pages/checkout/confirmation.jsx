import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const OrderConfirmationPage = ({ orderNumber, expectedDeliveryDate, cartItem }) => {
  const calculateSubtotal = () => {
    return cartItem && cartItem.length > 0
      ? cartItem.reduce((total, item) => total + item.new_price * item.quantity, 0)
      : 0;
  };

  const shippingCost = 5.99;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingCost;

  return (
    <div className="container my-5">
      <div className="text-center">
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been successfully placed.</p>
      </div>

      {/* Order Details */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>Order Summary</h4>
          <p>Order Number: <strong>{orderNumber}</strong></p>
          <p>Expected Delivery: <strong>{expectedDeliveryDate}</strong></p>

          {/* Order Items */}
          <div className="row">
            {cartItem && cartItem.map((item) => (
              <div className="col-md-12 mb-3" key={item.id}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${(item.new_price * item.quantity).toFixed(2)}</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="mt-3">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: ${shippingCost.toFixed(2)}</p>
            <h5>Total: ${total.toFixed(2)}</h5>
          </div>

          <div className="mt-4">
            <p>We will send you a confirmation email with tracking information shortly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
