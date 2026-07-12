// src/components/Common/StatCard.jsx
import React from 'react';

const StatCard = ({ icon, value, label, extra, trend, onClick }) => {
  // Ensure value is displayed correctly
  const displayValue = value !== undefined && value !== null ? value : 0;
  
  return (
    <div className="stat-card" onClick={onClick}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-number">{displayValue}</div>
      <div className="stat-label">{label}</div>
      {extra && <div className="stat-extra">{extra}</div>}
      {trend && <div className="stat-trend">{trend}</div>}
    </div>
  );
};

export default StatCard;