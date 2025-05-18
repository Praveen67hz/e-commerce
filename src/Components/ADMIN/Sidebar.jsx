import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='admin-sidebar'>
        <h2>Admin Panel</h2>
        <ul>
            <li><Link to = '/adminproducts'>Products</Link></li>
            <li><Link to ='/adminusers'>Users</Link></li>
            <li><Link to ='/orderhistory'>Manage Orders</Link></li>
            <li></li>
        </ul>
      
    </div>
  )
}

export default Sidebar;
