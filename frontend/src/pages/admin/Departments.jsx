import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminDepartments = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  // Demo data for departments
  const departments = [
    { dep_id: 'D001', dep_name: 'Housekeeping', location: 'Floor 1-3', staff_count: 12, manager: 'Sarah Johnson' },
    { dep_id: 'D002', dep_name: 'Front Desk', location: 'Lobby', staff_count: 8, manager: 'Michael Brown' },
    { dep_id: 'D003', dep_name: 'Maintenance', location: 'Basement', staff_count: 6, manager: 'David Wilson' },
    { dep_id: 'D004', dep_name: 'Food & Beverage', location: 'Floor 2', staff_count: 15, manager: 'Emily Davis' },
    { dep_id: 'D005', dep_name: 'Administration', location: 'Floor 5', staff_count: 5, manager: 'Robert Taylor' },
    { dep_id: 'D006', dep_name: 'Sales & Marketing', location: 'Floor 4', staff_count: 7, manager: 'Lisa Anderson' },
    { dep_id: 'D007', dep_name: 'Finance', location: 'Floor 4', staff_count: 4, manager: 'James Martinez' },
    { dep_id: 'D008', dep_name: 'Human Resources', location: 'Floor 5', staff_count: 3, manager: 'Patricia Garcia' }
  ];

  const filteredDepartments = searchTerm === '' 
    ? departments 
    : departments.filter(dept => 
        dept.dep_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.dep_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewDetails = (dept) => {
    setSelectedDept(dept);
    setShowModal(true);
  };

  const getRandomColor = (id) => {
    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#a18cd1', '#ff9a9e', '#a8edea'];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const totalDepts = filteredDepartments.length;
  const totalStaff = filteredDepartments.reduce((sum, dept) => sum + (dept.staff_count || 0), 0);

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>🏢 Department Management</h1>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name, ID, or location..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: '300px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalDepts}</div>
            <div className="stat-label">Total Departments</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalStaff}</div>
            <div className="stat-label">Staff Members</div>
          </div>
        </div>
        
        <div className="departments-grid">
          {filteredDepartments.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No departments found
            </div>
          ) : (
            filteredDepartments.map((dept, index) => (
              <div key={dept.dep_id || index} className="department-card" style={{ borderLeft: `4px solid ${getRandomColor(dept.dep_id)}` }}>
                <div className="department-header">
                  <div>
                    <div className="department-name">{dept.dep_name}</div>
                    <div className="department-id">ID: {dept.dep_id}</div>
                  </div>
                  <div className="department-location">📍 {dept.location || 'Not specified'}</div>
                </div>
                <div className="staff-list">
                  <div className="staff-title">👥 Staff Count: {dept.staff_count || 0}</div>
                  {dept.manager && (
                    <div className="staff-item">
                      <div className="staff-name">👔 Manager: {dept.manager}</div>
                    </div>
                  )}
                </div>
                <div className="action-buttons">
                  <button className="btn-view" onClick={() => viewDetails(dept)}>View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Department Details - ${selectedDept?.dep_name}`}>
        {selectedDept && (
          <div>
            <div className="detail-row"><strong>Department ID:</strong> {selectedDept.dep_id}</div>
            <div className="detail-row"><strong>Department Name:</strong> {selectedDept.dep_name}</div>
            <div className="detail-row"><strong>Location:</strong> {selectedDept.location || 'Not specified'}</div>
            <div className="detail-row"><strong>Staff Count:</strong> {selectedDept.staff_count || 0}</div>
            {selectedDept.manager && <div className="detail-row"><strong>Manager:</strong> {selectedDept.manager}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDepartments;