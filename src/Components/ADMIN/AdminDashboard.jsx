import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const revenue = invoices.reduce((acc, invoice) => acc + invoice.finalAmount, 0);

    setTotalOrders(invoices.length);
    setTotalProducts(products.length);
    setTotalRevenue(revenue);
    setTotalUsers(users.length);
    setRecentOrders([...invoices].reverse().slice(0, 4));
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar/>
      <h2 className="dashboard-title">ADMIN DASHBOARD</h2>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>${totalRevenue}</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

      <div className="quick-actions">
        <button onClick={() => navigate('/addproduct')}>➕ Add Product</button>
        <button onClick={() => navigate('/editproduct/13')}>✏️ Edit Product</button>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={order.orderId || index}>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>${order.finalAmount}</td>
                <td>{order.status}</td>
                <td>
       
                <button
                    className="view-invoice-btn"
                    onClick={() => {
                      localStorage.setItem("currentInvoiceId", order.orderId);
                      navigate('/invoice');
                    }}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
