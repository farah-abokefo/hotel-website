import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch(role) {
      case 'admin':
        return (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/customers">Customers</Link>
            <Link to="/admin/rooms">Rooms</Link>
            <Link to="/admin/reservations">Reservations</Link>
            <Link to="/admin/staff">Staff</Link>
            <Link to="/admin/departments">Departments</Link>
            <Link to="/admin/services">Services</Link>
            <Link to="/admin/discounts">Discounts</Link>
            <Link to="/admin/price-list">Price List</Link>
          </>
        );
      case 'staff':
        return (
          <>
            <Link to="/staff">Dashboard</Link>
            <Link to="/staff/services">Services</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/dashboard">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/reservations">My Bookings</Link>
            <Link to="/services">Services</Link>
            <Link to="/profile">Profile</Link>
          </>
        );
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          HOTEL<span>RMS</span>
        </div>
        <div className="nav-links">
          {getNavLinks()}
        </div>
        <div className="user-info">
          <span>👤 {user?.firstName || 'User'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;