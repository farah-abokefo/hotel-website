import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminCustomers = () => {
  const { logout } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getCustomers();
      // Handle response properly - it might be an array directly or have a data property
      const customersData = Array.isArray(response) ? response : response?.data || [];
      setCustomers(customersData);
      setFilteredCustomers(customersData);
    } catch (error) {
      console.error('Error loading customers:', error);
      setCustomers([]);
      setFilteredCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => 
        (customer.firstName?.toLowerCase().includes(term)) ||
        (customer.lastName?.toLowerCase().includes(term)) ||
        (customer.ssnCust?.toLowerCase().includes(term)) ||
        (customer.email?.toLowerCase().includes(term))
      );
      setFilteredCustomers(filtered);
    }
  };

  const viewCustomerBookings = async (customer) => {
    setSelectedCustomer(customer);
    // You can fetch bookings here if you have an endpoint
    setCustomerBookings([]);
    setShowBookingsModal(true);
  };

  const totalCustomers = filteredCustomers.length;

  if (loading) {
    return (
      <div>
        <AdminNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading customers...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>👥 Customer Management</h1>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name, SSN, or email..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '300px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalCustomers}</div>
            <div className="stat-label">Total Customers</div>
          </div>
        </div>
        
        <div className="customers-grid">
          {filteredCustomers.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No customers found
            </div>
          ) : (
            filteredCustomers.map(customer => (
              <div key={customer.ssnCust} className="customer-card">
                <div className="customer-name">
                  <div>
                    {customer.firstName} {customer.lastName}
                    <div className="customer-ssn">SSN: {customer.ssnCust}</div>
                  </div>
                </div>
                <div className="customer-details">
                  <div className="detail-row">
                    <span className="detail-label">📧 Email:</span>
                    <span className="detail-value">{customer.email || 'Not provided'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📱 Phone:</span>
                    <span className="detail-value">{customer.phone || 'Not provided'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">🌍 Nationality:</span>
                    <span className="detail-value">{customer.nationality || 'Not specified'}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn-view" onClick={() => viewCustomerBookings(customer)}>View Bookings</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showBookingsModal} onClose={() => setShowBookingsModal(false)} title={`📋 Bookings - ${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`}>
        {customerBookings.length === 0 ? (
          <div className="empty-state">No bookings found</div>
        ) : (
          customerBookings.map(booking => (
            <div key={booking.id} className="booking-item">
              <strong>Booking #{booking.id}</strong><br />
              Room: {booking.roomNumber}<br />
              Check-in: {booking.checkInDate}<br />
              Check-out: {booking.checkOutDate}<br />
              <hr />
            </div>
          ))
        )}
      </Modal>
    </div>
  );
};

export default AdminCustomers;