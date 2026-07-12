import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomerNavbar = ({ onLogout }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/reservation', label: 'Reserve' },
    { path: '/services', label: 'Services' },
    { path: '/profile', label: 'Profile' },
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
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default CustomerNavbar;