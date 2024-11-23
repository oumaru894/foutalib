import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaDownload, FaPrint, FaStore } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { InvoiceURL } from '../../components/assets/constants/Urls/Url';
import { useLocation, useParams } from 'react-router-dom';

const InvoicePage = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const invoiceNumber = location.state?.invoice;
  const { invoiceId } = useParams();
  const orderDate = new Date().toLocaleDateString();

  // Fetching the invoice
  useEffect(() => {
    const getInvoice = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${InvoiceURL}${invoiceId}`);
        //console.log('Fetched data:', response.data);  // Debug: Check structure of response
        if (response.data) {
          setInvoice(response.data);
        }
      } catch (error) {
        //console.error('Error fetching invoice:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInvoice();
  }, [invoiceId]);

  useEffect(() => {
    //console.log('Updated invoice state:', invoice); // Debug: Confirm invoice state updates
  }, [invoice]);

  // Download, print, and market navigation functions
  const handleDownloadClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDownloadPDF = () => {
    const invoiceElement = document.getElementById('invoice');
    if (!invoiceElement) {
      //console.error('Invoice element not found');
      return;
    }
    html2canvas(invoiceElement).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 dimensions
      pdf.save(`invoice_${invoiceId}.pdf`);
    });
    handleCloseModal();
  };

  const handleDownloadImage = () => {
    const invoiceElement = document.getElementById('invoice');
    if (!invoiceElement) {
      //console.error('Invoice element not found');
      return;
    }
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `invoice_${invoiceId}.png`;
      link.click();
    });
    handleCloseModal();
  };

  const handlePrint = () => window.print();
  const handleGoToMarket = () => (window.location.href = '/');

  return (
    <div className="container my-5">
      {/* Loading Spinner */}
      {isLoading ? (
        <p>Loading invoice...</p>
      ) : invoice ? (
        <>
          {/* Invoice Info and Action Buttons */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex">
              <button className="btn btn-outline-primary me-2" onClick={handleDownloadClick}>
                <FaDownload /> Download
              </button>
              <button className="btn btn-outline-secondary me-2" onClick={handlePrint}>
                <FaPrint /> Print
              </button>
              <button className="btn btn-outline-success" onClick={handleGoToMarket}>
                <FaStore /> Back to Market
              </button>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="card p-4" id="invoice">
            <div className="text-center mb-4">
              <img src="/images/logo/FoutaLib.jpeg" alt="Logo" style={{ width: '80px', marginBottom: '10px' }} />
              <h2>FoutaLib</h2>
              <p>www.foutalib.com | foutalibb@gmail.com | +231 886 222 600</p>
            </div>
            <div className="row">
              <div>
                <h5>Invoice Number: {invoiceId}</h5>
                <p>Order Date: {new Date(invoice.order_date).toLocaleDateString()}</p>
              </div>
              <hr />
              <div className="col-md-6">
                <h5>Billing Information</h5>
                <p><strong>Name:</strong> {invoice.shipping_name}</p>
                <p><strong>Address:</strong> {invoice.shipping_address}</p>
                <p><strong>Phone:</strong> {invoice.shipping_contact}</p>
              </div>
              <div className="col-md-6">
                <h5>Delivery Information</h5>
                <p><strong>Name:</strong> {invoice.shipping_name}</p>
                <p><strong>Address:</strong> {invoice.shipping_address}</p>
                <p><strong>Phone:</strong> {invoice.shipping_contact}</p>
              </div>
            </div>
            <hr />

            {/* Order Summary */}
            <h5>Order Summary</h5>
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price_per_item}</td>
                    <td>${item.total_price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                    <th colSpan="3">Subtotal</th>
                    <th>${invoice.total_amount}</th>
                </tr>
                <tr>
                    <th colSpan="3">Tax</th>
                    <th>${invoice.shipping_cost || 0}</th>
                </tr>
                <tr>
                    <th colSpan="3">Total</th>
                    <th>${(invoice.total_amount || 0) + (invoice.shipping_cost || 0)}</th>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-4">
            <p className="text-muted">
              Thank you for shopping with us. If you have any questions, contact us at foutalibb@gmail.com or +231 222 600.
            </p>
          </div>

          {/* Download Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Select Download Format</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Choose your preferred format for downloading the invoice.</p>
              <Button variant="primary" onClick={handleDownloadPDF} className="me-2">
                PDF
              </Button>
              <Button variant="secondary" onClick={handleDownloadImage}>
                Image
              </Button>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <p>No invoice data available.</p>
      )}
    </div>
  );
};

export default InvoicePage;
