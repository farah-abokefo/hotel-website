import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminReservations = () => {
  const { logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const response = await adminService.getReservations();
      const reservationsData = Array.isArray(response) ? response : response?.data || [];
      setReservations(reservationsData);
      setFilteredReservations(reservationsData);
    } catch (error) {
      console.error('Error loading reservations:', error);
      setReservations([]);
      setFilteredReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterData(term, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterData(searchTerm, status);
  };

  const filterData = (search, status) => {
    if (!Array.isArray(reservations)) {
      setFilteredReservations([]);
      return;
    }
    
    let filtered = [...reservations];
    
    if (status !== 'all') {
      filtered = filtered.filter(r => r.status === status);
    }
    
    if (search) {
      filtered = filtered.filter(r => 
        r.id?.toString().includes(search) ||
        r.customerName?.toLowerCase().includes(search) ||
        r.customerSsn?.toLowerCase().includes(search)
      );
    }
    
    setFilteredReservations(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setFilteredReservations(reservations);
  };

  const updateStatus = async (id, newStatus) => {
    if (window.confirm(`Update reservation status to ${newStatus}?`)) {
      try {
        await adminService.updateReservationStatus(id, newStatus);
        loadReservations();
      } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status');
      }
    }
  };

  const viewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const getStatusClass = (status) => {
    const classes = {
      'confirmed': 'status-confirmed',
      'pending': 'status-pending',
      'checked-in': 'status-checked-in',
      'checked-out': 'status-checked-out',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-pending';
  };

  const total = Array.isArray(filteredReservations) ? filteredReservations.length : 0;
  const confirmed = Array.isArray(filteredReservations) ? filteredReservations.filter(r => r.status === 'confirmed').length : 0;
  const checkedIn = Array.isArray(filteredReservations) ? filteredReservations.filter(r => r.status === 'checked-in').length : 0;

  if (loading) {
    return (
      <div>
        <AdminNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading reservations...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>📅 Reservation Management</h1>
        </div>
        
        <div className="filter-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by ID or customer..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-select" value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked In</option>
            <option value="checked-out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
          <button 
            className="btn-secondary" 
            onClick={resetFilters} 
            style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{total}</div>
            <div className="stat-label">Total Reservations</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{confirmed}</div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{checkedIn}</div>
            <div className="stat-label">Currently Checked In</div>
          </div>
        </div>
        
        <div className="reservations-grid">
          {!Array.isArray(filteredReservations) || filteredReservations.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No reservations found
            </div>
          ) : (
            filteredReservations.map((reservation, index) => (
              <div key={reservation.id ? `res-${reservation.id}` : `res-${index}`} className="reservation-card">
                <div className="reservation-header">
                  <span className="reservation-id">#RES-{reservation.id}</span>
                  <span className={`status-badge ${getStatusClass(reservation.status)}`}>
                    {reservation.status?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>
                <div className="customer-info">
                  <div className="customer-avatar">
                    {(reservation.customerName?.charAt(0) || reservation.customerSsn?.charAt(0) || '?')}
                  </div>
                  <div className="customer-details">
                    <h3>{reservation.customerName || reservation.customerSsn}</h3>
                    <p>🆔 {reservation.customerSsn}</p>
                  </div>
                </div>
                <div className="room-info">
                  <span className="room-number">🛏️ Room {reservation.roomNumber}</span>
                </div>
                <div className="date-info">
                  <div className="date-box">
                    <div className="date-label">CHECK-IN</div>
                    <div className="date-value">{reservation.checkInDate}</div>
                  </div>
                  <div className="date-box">
                    <div className="date-label">CHECK-OUT</div>
                    <div className="date-value">{reservation.checkOutDate}</div>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn-view" onClick={() => viewDetails(reservation)}>Details</button>
                  {reservation.status === 'confirmed' && (
                    <button className="btn-edit" onClick={() => updateStatus(reservation.id, 'checked-in')}>Check In</button>
                  )}
                  {reservation.status === 'checked-in' && (
                    <button className="btn-delete" onClick={() => updateStatus(reservation.id, 'checked-out')}>Check Out</button>
                  )}
                  {(reservation.status === 'confirmed' || reservation.status === 'pending') && (
                    <button className="btn-cancel" onClick={() => updateStatus(reservation.id, 'cancelled')}>Cancel</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Reservation #RES-${selectedReservation?.id}`}>
        {selectedReservation && (
          <div>
            <div className="detail-row"><strong>Customer:</strong> {selectedReservation.customerName || selectedReservation.customerSsn}</div>
            <div className="detail-row"><strong>Room Number:</strong> {selectedReservation.roomNumber}</div>
            <div className="detail-row"><strong>Check-in:</strong> {selectedReservation.checkInDate}</div>
            <div className="detail-row"><strong>Check-out:</strong> {selectedReservation.checkOutDate}</div>
            <div className="detail-row"><strong>Status:</strong> {selectedReservation.status}</div>
            <div className="detail-row"><strong>Total Amount:</strong> ${selectedReservation.totalAmount || selectedReservation.totalPrice || 0}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminReservations;