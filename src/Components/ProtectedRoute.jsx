import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useContext(ShopContext);

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
