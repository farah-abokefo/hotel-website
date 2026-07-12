import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomerNavbar from '../../components/Layout/CustomerNavbar';
import '../../styles/customer.css';

const CustomerRooms = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Demo data for rooms
  const rooms = [
    { roomNumber: 101, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Available', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 102, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Available', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 103, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Occupied', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 201, floorNumber: 2, roomType: 'Deluxe', currentPrice: 250, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { roomNumber: 202, floorNumber: 2, roomType: 'Deluxe', currentPrice: 250, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { roomNumber: 203, floorNumber: 2, roomType: 'Deluxe', currentPrice: 250, statusName: 'Occupied', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { roomNumber: 301, floorNumber: 3, roomType: 'Suite', currentPrice: 400, statusName: 'Available', capacity: 4, bedType: 'King + Sofa', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'] },
    { roomNumber: 302, floorNumber: 3, roomType: 'Suite', currentPrice: 400, statusName: 'Available', capacity: 4, bedType: 'King + Sofa', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'] },
    { roomNumber: 401, floorNumber: 4, roomType: 'Executive', currentPrice: 600, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Work Desk'] },
    { roomNumber: 501, floorNumber: 5, roomType: 'Presidential', currentPrice: 1000, statusName: 'Available', capacity: 6, bedType: 'King + 2 Twins', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Butler Service'] }
  ];

  // Filter rooms based on search term, type filter, and price range
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchTerm === '' || 
      room.roomNumber.toString().includes(searchTerm) ||
      room.roomType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || room.roomType.toLowerCase() === typeFilter.toLowerCase();
    const matchesPrice = room.currentPrice >= priceRange.min && room.currentPrice <= priceRange.max;
    return matchesSearch && matchesType && matchesPrice && room.statusName === 'Available';
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setPriceRange({ min: 0, max: 1000 });
  };

  // Get unique room types for filter
  const roomTypes = ['all', ...new Set(rooms.map(room => room.roomType.toLowerCase()))];

  return (
    <div>
      <CustomerNavbar onLogout={logout} />
      
      <div className="rooms-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
        <div className="page-header">
          <h1>🛏️ Our Rooms</h1>
          <p>Luxurious accommodations for every traveler</p>
        </div>
        
        <div className="filter-section" style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px' }}>
          <div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div className="filter-group">
              <label>🔍 Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Room number or type..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div className="filter-group">
              <label>🏷️ Room Type</label>
              <select className="form-control" value={typeFilter} onChange={handleTypeFilter} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <option value="all">All Types</option>
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="executive">Executive</option>
                <option value="presidential">Presidential</option>
              </select>
            </div>
            <div className="filter-group">
              <label>💰 Price Range</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  name="min"
                  className="form-control"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                <input
                  type="number"
                  name="max"
                  className="form-control"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>&nbsp;</label>
              <button onClick={resetFilters} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset Filters</button>
            </div>
          </div>
        </div>
        
        <div className="stats-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="results-count">Found <strong>{filteredRooms.length}</strong> available rooms</div>
        </div>
        
        <div className="rooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px', marginTop: '20px' }}>
          {filteredRooms.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px', gridColumn: '1 / -1' }}>
              <div className="empty-icon">🛏️</div>
              <div>No rooms available matching your criteria</div>
              <div className="small">Try adjusting your filters</div>
            </div>
          ) : (
            filteredRooms.map(room => (
              <div key={room.roomNumber} className="room-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
                <div className="room-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', textAlign: 'center', fontSize: '48px' }}>
                  {room.roomType === 'Deluxe' ? '🛋️' : room.roomType === 'Suite' ? '🏨' : '🛏️'}
                </div>
                <div className="room-info" style={{ padding: '20px' }}>
                  <div className="room-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div className="room-number" style={{ fontSize: '20px', fontWeight: 'bold' }}>Room {room.roomNumber}</div>
                      <div className="room-type" style={{ display: 'inline-block', padding: '4px 12px', background: '#e7f3ff', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#0066cc', marginTop: '5px' }}>{room.roomType}</div>
                    </div>
                    <div className="room-price" style={{ textAlign: 'right' }}>
                      <div className="price-amount" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>${room.currentPrice}</div>
                      <div className="price-period" style={{ fontSize: '12px', color: '#666' }}>/ night</div>
                    </div>
                  </div>
                  <div className="room-details" style={{ margin: '15px 0' }}>
                    <div className="detail-item" style={{ marginBottom: '8px' }}>📍 Floor {room.floorNumber}</div>
                    <div className="detail-item" style={{ marginBottom: '8px' }}>🛏️ {room.bedType}</div>
                    <div className="detail-item" style={{ marginBottom: '8px' }}>👥 {room.capacity} guests</div>
                  </div>
                  <div className="amenities" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {room.amenities.map((amenity, i) => (
                      <span key={i} style={{ padding: '4px 10px', background: '#f0f0f0', borderRadius: '15px', fontSize: '11px', color: '#666' }}>{amenity}</span>
                    ))}
                  </div>
                  <Link to="/reservation" className="book-btn" style={{ display: 'block', width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', transition: 'all 0.3s ease' }}>
                    Book Now →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerRooms;