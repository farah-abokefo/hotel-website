import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminDiscounts = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // Demo data for discounts
  const discounts = [
    { discount_id: 1, discount_percentage: 10, discount_name: 'Summer Sale', valid_from: '2024-06-01', valid_to: '2024-08-31', min_amount: 100, status: 'active', usage_count: 45, total_savings: 2250 },
    { discount_id: 2, discount_percentage: 15, discount_name: 'Early Bird', valid_from: '2024-01-01', valid_to: '2024-12-31', min_amount: 0, status: 'active', usage_count: 32, total_savings: 1920 },
    { discount_id: 3, discount_percentage: 20, discount_name: 'Weekend Special', valid_from: '2024-01-01', valid_to: '2024-12-31', min_amount: 200, status: 'active', usage_count: 28, total_savings: 2240 },
    { discount_id: 4, discount_percentage: 5, discount_name: 'First Booking', valid_from: '2024-01-01', valid_to: '2024-12-31', min_amount: 0, status: 'active', usage_count: 67, total_savings: 1340 },
    { discount_id: 5, discount_percentage: 25, discount_name: 'Holiday Special', valid_from: '2024-12-20', valid_to: '2025-01-05', min_amount: 300, status: 'active', usage_count: 12, total_savings: 1200 },
    { discount_id: 6, discount_percentage: 30, discount_name: 'Winter Escape', valid_from: '2024-12-01', valid_to: '2025-02-28', min_amount: 500, status: 'active', usage_count: 8, total_savings: 2400 },
    { discount_id: 7, discount_percentage: 12, discount_name: 'Loyalty Member', valid_from: '2024-01-01', valid_to: '2024-12-31', min_amount: 0, status: 'active', usage_count: 89, total_savings: 3200 },
    { discount_id: 8, discount_percentage: 18, discount_name: 'Group Booking', valid_from: '2024-01-01', valid_to: '2024-12-31', min_amount: 1000, status: 'inactive', usage_count: 5, total_savings: 900 }
  ];

  const filteredDiscounts = discounts.filter(discount => {
    const matchesStatus = statusFilter === 'all' || discount.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      discount.discount_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.discount_percentage?.toString().includes(searchTerm) ||
      discount.discount_id?.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const viewDetails = (discount) => {
    setSelectedDiscount(discount);
    setShowModal(true);
  };

  const totalDiscounts = filteredDiscounts.length;
  const activeDiscounts = filteredDiscounts.filter(d => d.status === 'active').length;
  const avgPercentage = totalDiscounts > 0 ? Math.round(filteredDiscounts.reduce((sum, d) => sum + d.discount_percentage, 0) / totalDiscounts) : 0;
  const totalSavings = filteredDiscounts.reduce((sum, d) => sum + (d.total_savings || 0), 0);

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>🏷️ Discount Management</h1>
        </div>
        
        <div className="filter-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name, ID, or percentage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalDiscounts}</div>
            <div className="stat-label">Total Discounts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{activeDiscounts}</div>
            <div className="stat-label">Active Discounts</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{avgPercentage}%</div>
            <div className="stat-label">Average Discount</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${totalSavings.toLocaleString()}</div>
            <div className="stat-label">Total Savings</div>
          </div>
        </div>
        
        <div className="discounts-grid">
          {filteredDiscounts.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No discounts found
            </div>
          ) : (
            filteredDiscounts.map(discount => (
              <div key={discount.discount_id} className="discount-card">
                <div className="discount-header">
                  <div className="discount-percentage">{discount.discount_percentage}% <small>OFF</small></div>
                  <div className="discount-badge" style={{ background: discount.status === 'active' ? '#28a745' : '#dc3545' }}>
                    {discount.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                  </div>
                </div>
                <div className="discount-body">
                  {discount.discount_name && (
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{discount.discount_name}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">#{discount.discount_id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Valid:</span>
                    <span className="detail-value">{discount.valid_from} → {discount.valid_to || 'Ongoing'}</span>
                  </div>
                  {discount.min_amount > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Min Spend:</span>
                      <span className="detail-value">${discount.min_amount}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Times Used:</span>
                    <span className="detail-value">{discount.usage_count || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Savings:</span>
                    <span className="detail-value" style={{ fontWeight: 'bold', color: '#28a745' }}>${(discount.total_savings || 0).toLocaleString()}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn-view" onClick={() => viewDetails(discount)}>View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Discount Details - ${selectedDiscount?.discount_name || selectedDiscount?.discount_percentage + '% OFF'}`}>
        {selectedDiscount && (
          <div>
            <div className="detail-row"><strong>Discount ID:</strong> #{selectedDiscount.discount_id}</div>
            <div className="detail-row"><strong>Percentage:</strong> {selectedDiscount.discount_percentage}% OFF</div>
            <div className="detail-row"><strong>Name:</strong> {selectedDiscount.discount_name || 'Unnamed'}</div>
            <div className="detail-row"><strong>Valid From:</strong> {selectedDiscount.valid_from || 'Not set'}</div>
            <div className="detail-row"><strong>Valid To:</strong> {selectedDiscount.valid_to || 'No expiry'}</div>
            <div className="detail-row"><strong>Minimum Amount:</strong> ${selectedDiscount.min_amount || 0}</div>
            <div className="detail-row"><strong>Status:</strong> {selectedDiscount.status === 'active' ? 'Active' : 'Inactive'}</div>
            <div className="detail-row"><strong>Times Used:</strong> {selectedDiscount.usage_count || 0}</div>
            <div className="detail-row"><strong>Total Savings:</strong> ${(selectedDiscount.total_savings || 0).toLocaleString()}</div>
            <div className="detail-row"><strong>Average Savings per Use:</strong> ${Math.round((selectedDiscount.total_savings || 0) / (selectedDiscount.usage_count || 1))}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDiscounts;