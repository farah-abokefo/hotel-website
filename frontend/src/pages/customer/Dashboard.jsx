import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomerNavbar from '../../components/Layout/CustomerNavbar';
import '../../styles/dashboard.css';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0,
    pointsEarned: 0
  });
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Demo data - no API calls
      setStats({
        totalBookings: 5,
        activeBookings: 2,
        totalSpent: 1250,
        pointsEarned: 250
      });
      setUpcomingReservations([
        { id: 1001, roomNumber: 304, checkInDate: '2024-02-15', checkOutDate: '2024-02-18', status: 'confirmed' },
        { id: 1002, roomNumber: 205, checkInDate: '2024-03-01', checkOutDate: '2024-03-05', status: 'confirmed' }
      ]);
      setFeaturedRooms([
        { roomNumber: 101, roomType: 'Standard', currentPrice: 150 },
        { roomNumber: 201, roomType: 'Deluxe', currentPrice: 250 },
        { roomNumber: 301, roomType: 'Suite', currentPrice: 400 },
        { roomNumber: 401, roomType: 'Executive', currentPrice: 600 }
      ]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div>
        <CustomerNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading dashboard...</div>
      </div>
    );
  }

  // Safe values with fallbacks
  const totalBookings = stats?.totalBookings ?? 0;
  const activeBookings = stats?.activeBookings ?? 0;
  const totalSpent = stats?.totalSpent ?? 0;
  const pointsEarned = stats?.pointsEarned ?? 0;

  return (
    <div>
      <CustomerNavbar onLogout={logout} />
      
      <div className="dashboard-container">
        <div className="welcome-section">
          <div className="welcome-title">Welcome back, {user?.firstName || user?.ssn || 'Guest'}! 👋</div>
          <div className="welcome-subtitle">We're delighted to have you at Hotel RMS.</div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-number">{totalBookings}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{activeBookings}</div>
            <div className="stat-label">Active Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">${totalSpent.toLocaleString()}</div>
            <div className="stat-label">Total Spent</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">{pointsEarned}</div>
            <div className="stat-label">Reward Points</div>
          </div>
        </div>
        
        <div className="section-header">
          <h2>📅 Upcoming Reservations</h2>
          <Link to="/reservation" className="view-all">New Booking →</Link>
        </div>
        
        {!upcomingReservations || upcomingReservations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <div>No upcoming reservations</div>
            <div className="small">Book a room to get started!</div>
          </div>
        ) : (
          <div className="reservations-grid">
            {upcomingReservations.map((res) => {
              const nights = calculateNights(res.checkInDate, res.checkOutDate);
              return (
                <div key={res.id} className="reservation-card">
                  <div className="reservation-header">
                    <span className="reservation-id">#RES-{res.id}</span>
                    <span className={`status-badge status-${res.status}`}>{res.status?.toUpperCase() || 'CONFIRMED'}</span>
                  </div>
                  <div className="room-number">🛏️ Room {res.roomNumber}</div>
                  <div className="date-info">
                    <div className="date-box">
                      <div className="date-label">CHECK-IN</div>
                      <div className="date-value">{res.checkInDate}</div>
                    </div>
                    <div className="date-box">
                      <div className="date-label">CHECK-OUT</div>
                      <div className="date-value">{res.checkOutDate}</div>
                    </div>
                  </div>
                  <div className="duration">📆 {nights} night{nights !== 1 ? 's' : ''} stay</div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="section-header">
          <h2>⭐ Recommended for You</h2>
          <Link to="/rooms" className="view-all">View All Rooms →</Link>
        </div>
        
        <div className="rooms-grid">
          {featuredRooms && featuredRooms.map((room) => (
            <div key={room.roomNumber} className="room-card">
              <div className="room-image">🛏️</div>
              <div className="room-info">
                <div className="room-type">{room.roomType || 'Standard'}</div>
                <div className="room-price">${room.currentPrice || 150}<small>/ night</small></div>
                <Link to="/reservation" className="book-btn">Book Now →</Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-header">
          <h2>🚀 Quick Actions</h2>
        </div>
        
        <div className="quick-actions">
          <Link to="/reservation" className="action-card">
            <div className="action-icon">📅</div>
            <div className="action-title">New Booking</div>
          </Link>
          <Link to="/services" className="action-card">
            <div className="action-icon">⚙️</div>
            <div className="action-title">Book Services</div>
          </Link>
          <Link to="/profile" className="action-card">
            <div className="action-icon">👤</div>
            <div className="action-title">My Profile</div>
          </Link>
          <Link to="/rooms" className="action-card">
            <div className="action-icon">🛏️</div>
            <div className="action-title">Browse Rooms</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;