import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StaffNavbar = ({ onLogout, staff }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/staff', label: 'Dashboard' },
    { path: '/staff/services', label: 'Services' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">HOTEL<span>RMS</span></div>
        <div className="nav-links">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="staff-info">
          <span>👋 {staff?.firstName || staff?.ssn || 'Staff'}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default StaffNavbar;