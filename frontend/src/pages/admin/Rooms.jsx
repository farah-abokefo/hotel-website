import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import '../../styles/admin.css';

const AdminRooms = () => {
  const { logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Hardcoded room types for filter
  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const response = await adminService.getRooms();
      const roomsData = Array.isArray(response) ? response : response?.data || [];
      setRooms(roomsData);
      setFilteredRooms(roomsData);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setRooms([]);
      setFilteredRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterRooms(term, statusFilter, typeFilter);
  };

  const handleStatusFilterChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterRooms(searchTerm, value, typeFilter);
  };

  const handleTypeFilterChange = (e) => {
    const value = e.target.value;
    setTypeFilter(value);
    filterRooms(searchTerm, statusFilter, value);
  };

  const filterRooms = (search, status, type) => {
    let filtered = [...rooms];
    
    if (status !== 'all') {
      filtered = filtered.filter(room => {
        const statusName = room.statusName?.toLowerCase();
        return statusName === status.toLowerCase();
      });
    }
    
    if (type !== 'all') {
      filtered = filtered.filter(room => 
        room.roomType?.toLowerCase() === type.toLowerCase()
      );
    }
    
    if (search) {
      filtered = filtered.filter(room => 
        room.roomNumber?.toString().includes(search)
      );
    }
    
    setFilteredRooms(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setFilteredRooms(rooms);
  };

  const getStatusClass = (statusName) => {
    const classes = {
      'Available': 'status-available',
      'Occupied': 'status-occupied',
      'Maintenance': 'status-maintenance',
    };
    return classes[statusName] || 'status-available';
  };

  const totalRooms = filteredRooms.length;
  const availableRooms = filteredRooms.filter(r => r.statusName === 'Available').length;
  const occupiedRooms = filteredRooms.filter(r => r.statusName === 'Occupied').length;

  if (loading) {
    return (
      <div>
        <AdminNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading rooms...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>🛏️ Room Management</h1>
        </div>
        
        <div className="filter-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by room number..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-select" value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <select className="filter-select" value={typeFilter} onChange={handleTypeFilterChange}>
            <option value="all">All Room Types</option>
            {roomTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
          <button className="btn-secondary" onClick={resetFilters} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset Filters</button>
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalRooms}</div>
            <div className="stat-label">Total Rooms</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{availableRooms}</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{occupiedRooms}</div>
            <div className="stat-label">Occupied</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalRooms ? Math.round((availableRooms / totalRooms) * 100) : 0}%</div>
            <div className="stat-label">Availability Rate</div>
          </div>
        </div>
        
        <div className="rooms-grid">
          {filteredRooms.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No rooms found
            </div>
          ) : (
            filteredRooms.map(room => {
              const statusName = room.statusName || 'Unknown';
              return (
                <div key={room.roomNumber} className="room-card">
                  <div className="room-header">
                    <div className="room-number">Room {room.roomNumber}</div>
                    <div className="room-floor">Floor {room.floorNumber}</div>
                    <div className={`status-indicator ${getStatusClass(statusName)}`}></div>
                  </div>
                  <div className="room-body">
                    <div className="room-type">{room.roomType || 'Standard'}</div>
                    <div className="room-details">
                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value">{statusName}</span>
                      </div>
                    </div>
                    <div className="price-tag">${room.currentPrice || 150} <span className="small">/ night</span></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;