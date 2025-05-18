import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './OrderConfirmation.css';
import { useNavigate } from 'react-router-dom';
import confirmationIcon from '../Assets/confirmation-icon.png';

const OrderConfirmation = () => {
  const {
    shippingMethod,
    couponCode,
    discountAmount,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const invoiceId = localStorage.getItem("currentInvoiceId");
  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  const currentInvoice = invoices.find(inv => inv.orderId === invoiceId);

  const handleProceedToInvoice = () => {
    navigate('/invoice');
  };

  if (!currentInvoice) {
    return <div className="order-confirmation-container"><p>Loading order details...</p></div>;
  }

  return (
    <div className="order-confirmation-container">
      <div className="box">
        <h2>Order Confirmed!</h2>
        <img src={confirmationIcon} alt="Confirmation Icon" className="confirmation-icon" />
        <p>Thank you for your purchase.</p>

        <div className="ordersummary">
          <h3>Order Summary</h3>
          <p>Order ID: {currentInvoice.orderId}</p>
          <p>Subtotal: ${currentInvoice.subtotal.toFixed(2)}</p>
          <p>Coupon: {couponCode ? `${couponCode} (-$${discountAmount})` : "None"}</p>
          <p>Shipping Method: {shippingMethod}</p>
          <p>Shipping Cost: ${currentInvoice.shippingCost.toFixed(2)}</p>
          <hr />
          <h3>Total Paid: ${currentInvoice.finalAmount.toFixed(2)}</h3>
        </div>

        <button onClick={handleProceedToInvoice} className='go-home-btn'>
          GO TO INVOICE <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
