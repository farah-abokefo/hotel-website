import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminStaff = () => {
  const { logout } = useAuth();
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    setLoading(true);
    try {
      const response = await adminService.getStaff();
      const staffData = Array.isArray(response) ? response : response?.data || [];
      setStaff(staffData);
      setFilteredStaff(staffData);
    } catch (error) {
      console.error('Error loading staff:', error);
      setStaff([]);
      setFilteredStaff([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredStaff(staff);
    } else {
      const filtered = staff.filter(member => 
        member.firstName?.toLowerCase().includes(term) ||
        member.lastName?.toLowerCase().includes(term) ||
        member.ssnStaff?.toLowerCase().includes(term)
      );
      setFilteredStaff(filtered);
    }
  };

  const viewDetails = (member) => {
    setSelectedStaff(member);
    setShowModal(true);
  };

  const totalStaff = filteredStaff.length;
  const totalSalary = filteredStaff.reduce((sum, s) => sum + (s.salary || 0), 0);

  if (loading) {
    return (
      <div>
        <AdminNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading staff...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>👨‍💼 Staff Management</h1>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name or SSN..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '300px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalStaff}</div>
            <div className="stat-label">Total Staff</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${totalSalary.toLocaleString()}</div>
            <div className="stat-label">Total Monthly Salary</div>
          </div>
        </div>
        
        <div className="staff-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {filteredStaff.length === 0 ? (
            <div className="empty-state">No staff found</div>
          ) : (
            filteredStaff.map(member => (
              <div key={member.ssnStaff} className="staff-card" style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div className="staff-header" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div className="staff-avatar" style={{ fontSize: '48px' }}>{member.sex === 'M' ? '👨' : '👩'}</div>
                  <div>
                    <div className="staff-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{member.firstName} {member.lastName}</div>
                    <div className="staff-id" style={{ fontSize: '12px', color: '#999' }}>SSN: {member.ssnStaff}</div>
                    {member.departmentName && <div className="department-badge" style={{ fontSize: '11px', background: '#e7f3ff', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginTop: '5px' }}>{member.departmentName}</div>}
                  </div>
                </div>
                <div className="staff-details">
                  <div className="detail-row"><span className="detail-label">📞 Contact:</span><span className="detail-value">{member.contactNumber || 'N/A'}</span></div>
                  <div className="detail-row"><span className="detail-label">👔 Role:</span><span className="detail-value">{member.role || 'Staff'}</span></div>
                  <div className="detail-row"><span className="detail-label">💰 Salary:</span><span className="detail-value">${member.salary?.toLocaleString()}/month</span></div>
                </div>
                <div className="action-buttons" style={{ marginTop: '15px' }}>
                  <button className="btn-view" onClick={() => viewDetails(member)}>View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Staff Details - ${selectedStaff?.firstName} ${selectedStaff?.lastName}`}>
        {selectedStaff && (
          <div>
            <div className="detail-row"><strong>SSN:</strong> {selectedStaff.ssnStaff}</div>
            <div className="detail-row"><strong>Full Name:</strong> {selectedStaff.firstName} {selectedStaff.lastName}</div>
            <div className="detail-row"><strong>Contact:</strong> {selectedStaff.contactNumber || 'N/A'}</div>
            <div className="detail-row"><strong>Gender:</strong> {selectedStaff.sex === 'M' ? 'Male' : 'Female'}</div>
            <div className="detail-row"><strong>Role:</strong> {selectedStaff.role || 'Staff'}</div>
            <div className="detail-row"><strong>Salary:</strong> ${selectedStaff.salary?.toLocaleString()}/month</div>
            <div className="detail-row"><strong>Department:</strong> {selectedStaff.departmentName || 'Not assigned'}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminStaff;