import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = ({ onLogout }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/rooms', label: 'Rooms', icon: '🛏️' },
    { path: '/admin/reservations', label: 'Reservations', icon: '📅' },
    { path: '/admin/staff', label: 'Staff', icon: '👨‍💼' },
    { path: '/admin/departments', label: 'Departments', icon: '🏢' },
    { path: '/admin/services', label: 'Services', icon: '⚙️' },
    { path: '/admin/discounts', label: 'Discounts', icon: '🏷️' },
    { path: '/admin/price-list', label: 'Price List', icon: '💰' },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">HOTEL<span>RMS</span></div>
        <div className="nav-links">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                background: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;