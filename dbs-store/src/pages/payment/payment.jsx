import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || '0.00'; // Fallback in case totalAmount is undefined
  const invoice = location.state?.invoice || 'No invoice provided'; // Fallback in case invoice is undefined

  const payment = {
    "mobileMoney":{
      "number":"0886222600",
      "name":"Mobile Money",
      "accountName": "Oumaru M Bah",
      "instruction":"Dail *156#, then follow the procedure to pay to the below account number and name.",
    },
    "orangeMoney":{
      "number":"0770071894",
      "name":"Orange Money",
      "accountName": "Oumaru Bah",
      "instruction":"Dail *144#, then follow the procedure to pay to the below account number and name.",
    },
    "OnCash":{
      "number":"0886222600",
      "name":"On Cash",
      "accountName": "Oumaru M Bah",
      "instruction":"Dail *156#, then follow the procedure to pay to the below account number and name.",
    }
  }

  const handleOptionClick = (path,payType) => {
    navigate(path, { state: { Invoice: invoice, payType:payType } });
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Method</h2>
      <h4 className="text-center text-primary">Total to Pay: ${totalAmount}</h4>

      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card payment-card" onClick={() => handleOptionClick('/payment/mobile-money',payment.mobileMoney)}>
            <img src="/payment/momo.jpg" alt="Mobile Money" className="payment-icon" />
            <h5 className="card-title">Mobile Money</h5>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card payment-card" onClick={() => handleOptionClick('/payment/mobile-money', payment.orangeMoney)}>
            <img src="/payment/orange-money.png" alt="Orange Money" className="payment-icon" />
            <h5 className="card-title">Orange Money</h5>
          </div>


        </div>
        <div className="col-md-4">
          <div className="card payment-card" onClick={() => handleOptionClick('/payment/mobile-money', payment.OnCash)}>
            <img src="/payment/cash-on-delivery.png" alt="Cash on Delivery" className="payment-icon" />
            <h5 className="card-title">Cash on Delivery</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
