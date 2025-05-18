import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [ordereditems, setOrderedItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    
    const loggedInUser = users.find(user => user.email === currentUserEmail);
    
    setCurrentUser(loggedInUser || null);
    setOrderedItems(invoices);
  }, []);

  const handleRemoveOrders = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = ordereditems.filter(order => order.orderId !== orderId);
      setOrderedItems(updatedOrders);
      localStorage.setItem('invoices', JSON.stringify(updatedOrders));
    }
  };

  return (
    <div className='order-history'>
      <div className='order-box'>
        <h2>PREVIOUS ORDERS</h2>

        {ordereditems.length === 0 ? (
          <p className="no-orders">No previous orders found.</p>
        ) : (
          <div className="orders-container">
            {ordereditems.map((order) => {
              const status = order.status || "Pending";
              const statusClass = status.toLowerCase().replace(/\s/g, "-");

              return (
                <div className="order-card" key={order.orderId}>
                  <div className="order-info">
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Total:</strong> ${order.finalAmount}</p>
                    <p><strong>Status:</strong>
                      <span className={`order-status ${statusClass}`}>
                        {status}
                      </span>
                    </p>
                  </div>
                  <div className='order-buttons'>
                  <button
                    className="view-invoice-btn"
                    onClick={() => {
                      localStorage.setItem("currentInvoiceId", order.orderId);
                      navigate('/invoice');
                    }}
                  >
                    View Invoice
                  </button>

                  {currentUser?.role === 'admin' && (
                    <button 
                      className='remove-order-btn' 
                      onClick={() => handleRemoveOrders(order.orderId)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;