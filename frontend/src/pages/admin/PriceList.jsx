import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminPriceList = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Demo data for price list
  const priceList = [
    { list_no: 1, room_type_id: 1, room_type: 'Standard', price: 150, datee: '2024-01-01', expiry_date: null, notes: 'Standard room rate - Best value', status: 'Current' },
    { list_no: 2, room_type_id: 2, room_type: 'Deluxe', price: 250, datee: '2024-01-01', expiry_date: null, notes: 'Deluxe room with extra amenities', status: 'Current' },
    { list_no: 3, room_type_id: 3, room_type: 'Suite', price: 400, datee: '2024-01-01', expiry_date: null, notes: 'Spacious suite with separate living area', status: 'Current' },
    { list_no: 4, room_type_id: 4, room_type: 'Executive', price: 600, datee: '2024-01-01', expiry_date: null, notes: 'Executive suite with business amenities', status: 'Current' },
    { list_no: 5, room_type_id: 5, room_type: 'Presidential', price: 1000, datee: '2024-01-01', expiry_date: null, notes: 'Ultimate luxury experience', status: 'Current' },
    { list_no: 6, room_type_id: 1, room_type: 'Standard', price: 120, datee: '2023-01-01', expiry_date: '2023-12-31', notes: 'Previous year rate', status: 'Expired' },
    { list_no: 7, room_type_id: 2, room_type: 'Deluxe', price: 200, datee: '2023-01-01', expiry_date: '2023-12-31', notes: 'Previous year rate', status: 'Expired' },
    { list_no: 8, room_type_id: 3, room_type: 'Suite', price: 350, datee: '2023-01-01', expiry_date: '2023-12-31', notes: 'Previous year rate', status: 'Expired' }
  ];

  const filteredPriceList = searchTerm === '' 
    ? priceList 
    : priceList.filter(entry => 
        entry.room_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.price?.toString().includes(searchTerm) ||
        entry.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const viewDetails = (entry) => {
    setSelectedPrice(entry);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    if (status === 'Current') {
      return <span style={{ background: '#28a745', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>✓ Current</span>;
    } else {
      return <span style={{ background: '#dc3545', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>✗ Expired</span>;
    }
  };

  const totalEntries = filteredPriceList.length;
  const currentEntries = filteredPriceList.filter(p => p.status === 'Current').length;
  const avgPrice = totalEntries > 0 ? Math.round(filteredPriceList.reduce((sum, p) => sum + p.price, 0) / totalEntries) : 0;
  const highestPrice = totalEntries > 0 ? Math.max(...filteredPriceList.map(p => p.price)) : 0;

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>💰 Price List Management</h1>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by room type or price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalEntries}</div>
            <div className="stat-label">Total Price Entries</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{currentEntries}</div>
            <div className="stat-label">Current Prices</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${avgPrice}</div>
            <div className="stat-label">Average Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${highestPrice}</div>
            <div className="stat-label">Highest Price</div>
          </div>
        </div>
        
        <div className="price-table-container" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px', overflow: 'hidden' }}>
            <thead style={{ background: '#34495e', color: 'white' }}>
              <tr>
                <th style={{ padding: '12px', textAlign: 'left' }}>Room Type</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Effective Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPriceList.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No price entries found</td>
                </tr>
              ) : (
                filteredPriceList.map(entry => (
                  <tr key={entry.list_no} style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <td style={{ padding: '12px' }}>
                      <strong>{entry.room_type}</strong>
                      {entry.notes && <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{entry.notes}</div>}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>${entry.price}</span>
                      <span style={{ fontSize: '12px', color: '#999' }}> / night</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {entry.datee}
                      {entry.expiry_date && <div style={{ fontSize: '11px', color: '#999' }}>until {entry.expiry_date}</div>}
                    </td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(entry.status)}</td>
                    <td style={{ padding: '12px' }}>
                      <button className="btn-view" onClick={() => viewDetails(entry)} style={{ padding: '6px 12px', fontSize: '12px' }}>Details</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Price Details - ${selectedPrice?.room_type}`}>
        {selectedPrice && (
          <div>
            <div className="detail-row"><strong>Room Type:</strong> {selectedPrice.room_type}</div>
            <div className="detail-row"><strong>Price:</strong> <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>${selectedPrice.price}</span> / night</div>
            <div className="detail-row"><strong>Effective Date:</strong> {selectedPrice.datee}</div>
            {selectedPrice.expiry_date && <div className="detail-row"><strong>Expiry Date:</strong> {selectedPrice.expiry_date}</div>}
            <div className="detail-row"><strong>Status:</strong> {selectedPrice.status}</div>
            {selectedPrice.notes && <div className="detail-row"><strong>Notes:</strong> {selectedPrice.notes}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPriceList;