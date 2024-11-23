import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhone, FaWhatsapp, FaFacebookMessenger, FaSms } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileMoneyPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pay, setpay] = useState(false)

  // Retrieve the invoice from location.state
  const invoice = location.state?.Invoice || 'No invoice provided';
  const payType = location.state?.payType || 'No payment type provided';

  //console.log("pay type", payType)
  const handleFileUpload = (event) => {
    //console.log("File uploaded:", event.target.files[0]);
  };
  //console.log('momo', invoice)
  const handlePaymentConfirmation = () => {
    // Redirect to invoice page
    navigate(`/invoice/${invoice.Invoice}`, { state: { from: invoice } });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{payType.name} Payment</h2>

      {/* Section 1: Payment Instructions */}
      <div className="card mt-4 p-4">
        <h4>How to Send</h4>
        <p>Follow these steps to send the payment using mobile money.</p>
        <hr />
        <h3 style={{textDecoration:'underline'}}>Instruction</h3>
        <p>{payType.instruction}</p>
        <hr />
        <button className="btn btn-primary d-flex align-items-center justify-content-center">
          <a href="tel:*156*23#" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none d-flex align-items-center">
            <FaPhone className="me-2" /> Pay
          </a>
        </button>

        <hr />

        {/* Details Section */}
        <div className="mt-3">
          <p><strong>Phone Number:</strong> <span className="text-muted">{payType.number}</span></p>
          {/* <p className="text-muted">Reference (if applicable)</p> */}
          <hr />
          <p><strong>Name on Account:  </strong>{payType.accountName}</p>
        </div>
      </div>

      {/* Section 2: Upload Payment Proof */}
      <div className="container mt-4">
        <div className="card p-4">
          <h4>Upload Payment Proof</h4>
          <p className="text-muted">Attach bank receipt or transaction screenshot for fast confirmation.</p>
          
          <div className="d-flex flex-column align-items-center p-4 border border-secondary rounded bg-light" style={{ minHeight: 150 }}>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="image" className="mb-3" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
            </svg>

            <label className="btn btn-outline-primary btn-lg mt-3" htmlFor="fileUpload">
              Drag a file here or click to select one
            </label>
            <input id="fileUpload" type="file" accept="image/*" className="d-none" onChange={handleFileUpload} />

            <small className="text-muted mt-2 text-center">File should not exceed 10 MB.</small>
          </div>
        </div>
      </div>

      {/* Section 3: Confirmation */}
      <div className="card mt-4 p-4">
        <h4>Did you Pay?</h4>
        
        {!pay?(<><p>If you have paid, please contact us below to proceed with the next steps.</p><button style={{backgroundColor:'blue'}} className="btn btn-success btn-lg mb-3 w-100" onClick={()=>setpay(true)}>
          Yes, I Paid
        </button></>):<></>}
        {pay?
        (<>
        <p>Please click on the button below to go to your invoice</p><button className="btn btn-success btn-lg mb-3 w-100" onClick={handlePaymentConfirmation}>
          Go to Invoice
        </button>
        <div className="contact-options d-flex justify-content-around flex-wrap">
          <a href='http://wa.me/231881389579' className="btn btn-outline-success d-flex align-items-center my-1">
            <FaWhatsapp className="me-2" /> WhatsApp
          </a>
          <a href='http://m.me/foutalib' className="btn btn-outline-primary d-flex align-items-center my-1">
            <FaFacebookMessenger className="me-2" /> Messenger
          </a>
          <a 
            href="sms:+231770071894?body=Hello, I have completed the payment."
            className="btn btn-outline-secondary d-flex align-items-center my-1" style={{backgroundColor:'black', color:'orange'}}
          >
            <FaSms className="me-2" /> Text Orange
          </a>
          <a 
            href="sms:+231881389579?body=Hello, I have completed the payment."
            className="btn btn-outline-secondary d-flex align-items-center my-1" style={{backgroundColor:'yellow', color:'blue'}}
          >
            <FaSms className="me-2" /> Text Lonestar
          </a>
        </div></>):<></>}
      </div>
    </div>
  );
};

export default MobileMoneyPaymentPage;
