import React, { useContext, useState } from 'react';
import './Payment.css';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Payment = () => {
  const { shippingCost, discountAmount, getTotalCartAmount, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const total = getTotalCartAmount();
  const finalAmount = total - discountAmount + shippingCost;

  const handlePayment = () => {
    if (!cardNumber || !cardName || !expiry || !cvv) {
      toast.error('Please fill in all card details!');
      return;
    }

    toast.success('Payment Successful! 🎉');

    setTimeout(() => {
      const orderId = Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

      const newInvoice = {
        orderId,
        cartItems,
        subtotal: total,
        discount: discountAmount,
        shippingCost,
        finalAmount,
        date: new Date().toLocaleString(),
        status: "Processing"
      };

      const existingInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      const updatedInvoices = [...existingInvoices, newInvoice];

      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      localStorage.setItem("currentInvoiceId", orderId); 
      navigate('/orderconfirmation');
    }, 100);
  };

  return (
    <div className="payment-container">
      <div className='payment-box'>
        <h2>Payment Details</h2>
        <div className="payment-summary">
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Discount: -${discountAmount.toFixed(2)}</p>
          <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
          <hr />
          <h3>Total Payable: ${finalAmount.toFixed(2)}</h3>
        </div>

        <div className="payment-form">
          <h3>Enter Card Details</h3>
          <div className='input-row'>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <button onClick={handlePayment}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
