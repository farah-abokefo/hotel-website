import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerNavbar from '../../components/Layout/CustomerNavbar';
import '../../styles/customer.css';

const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Demo profile data
  const [profile, setProfile] = useState({
    ssnCust: user?.ssn || 'C002',
    firstName: 'Jane',
    lastName: 'Smith',
    nationality: 'American',
    phone: '0987654321',
    email: 'jane.smith@example.com',
    address: '123 Main Street, New York, NY 10001',
    membership_id: 2,
    created_at: '2024-01-15'
  });
  
  // Demo stats data
  const [stats, setStats] = useState({
    totalBookings: 5,
    activeBookings: 2,
    completedStays: 3,
    totalSpent: 1250,
    rewardPoints: 250
  });
  
  // Demo reservations data
  const [reservations, setReservations] = useState([
    { id: 1001, roomNumber: 304, checkInDate: '2024-02-15', checkOutDate: '2024-02-18', status: 'confirmed', totalAmount: 450 },
    { id: 1002, roomNumber: 205, checkInDate: '2024-03-01', checkOutDate: '2024-03-05', status: 'confirmed', totalAmount: 800 },
    { id: 1003, roomNumber: 412, checkInDate: '2024-01-10', checkOutDate: '2024-01-12', status: 'checked-out', totalAmount: 300 }
  ]);
  
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    nationality: profile.nationality,
    phone: profile.phone,
    email: profile.email,
    address: profile.address || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile with form data
    setProfile({
      ...profile,
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationality: formData.nationality,
      phone: formData.phone,
      email: formData.email,
      address: formData.address
    });
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const getMembershipBadge = () => {
    const membershipId = profile.membership_id || 1;
    const badges = { 
      1: { name: '🥉 Bronze', color: '#cd7f32' },
      2: { name: '🥈 Silver', color: '#c0c0c0' },
      3: { name: '🥇 Gold', color: '#ffd700' },
      4: { name: '💎 Platinum', color: '#e5e4e2' }
    };
    return badges[membershipId] || badges[1];
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

  const membership = getMembershipBadge();
  const nextMembership = profile.membership_id === 1 ? 'Silver' : profile.membership_id === 2 ? 'Gold' : profile.membership_id === 3 ? 'Platinum' : 'Platinum (Max)';
  const pointsToNext = profile.membership_id === 1 ? 250 : profile.membership_id === 2 ? 500 : profile.membership_id === 3 ? 1000 : 0;
  const progressPercentage = Math.min((stats.rewardPoints / (stats.rewardPoints + pointsToNext)) * 100, 100);

  return (
    <div>
      <CustomerNavbar onLogout={logout} />
      
      <div className="profile-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        {/* Profile Header */}
        <div className="profile-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px', padding: '40px', textAlign: 'center', color: 'white', marginBottom: '30px' }}>
          <div className="profile-avatar" style={{ fontSize: '64px', marginBottom: '15px' }}>{profile.firstName?.charAt(0) || '👤'}</div>
          <div className="profile-name" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>{profile.firstName} {profile.lastName}</div>
          <div className="profile-member-since" style={{ fontSize: '14px', opacity: 0.9 }}>Member since: {profile.created_at}</div>
        </div>
        
        {/* Stats Grid */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div className="stat-card" style={{ background: 'white', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stat-number" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{stats.totalBookings}</div>
            <div className="stat-label" style={{ fontSize: '13px', color: '#666' }}>Total Bookings</div>
          </div>
          <div className="stat-card" style={{ background: 'white', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stat-number" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{stats.activeBookings}</div>
            <div className="stat-label" style={{ fontSize: '13px', color: '#666' }}>Active Bookings</div>
          </div>
          <div className="stat-card" style={{ background: 'white', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stat-number" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>${stats.totalSpent}</div>
            <div className="stat-label" style={{ fontSize: '13px', color: '#666' }}>Total Spent</div>
          </div>
          <div className="stat-card" style={{ background: 'white', borderRadius: '15px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stat-number" style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{stats.rewardPoints}</div>
            <div className="stat-label" style={{ fontSize: '13px', color: '#666' }}>Reward Points</div>
          </div>
        </div>
        
        {/* Membership Card */}
        <div className="membership-card" style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div className="membership-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span className="membership-level" style={{ fontSize: '14px', color: '#666' }}>Membership Level</span>
            <span className="membership-badge" style={{ fontSize: '18px', fontWeight: 'bold', color: membership.color }}>{membership.name}</span>
          </div>
          <div className="membership-progress" style={{ marginTop: '15px' }}>
            <div className="progress-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              <span>Progress to {nextMembership}</span>
              <span>{stats.rewardPoints} / {stats.rewardPoints + pointsToNext} points</span>
            </div>
            <div className="progress-bar" style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="progress-fill" style={{ height: '100%', width: `${progressPercentage}%`, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '4px' }}></div>
            </div>
            <div className="points-info" style={{ marginTop: '8px', fontSize: '12px', color: '#999', textAlign: 'right' }}>
              {pointsToNext > 0 ? `${pointsToNext} more points to reach ${nextMembership}` : 'Maximum level reached!'}
            </div>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div className="profile-section" style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>📋 Personal Information</div>
            <button className="edit-btn" onClick={() => setIsEditing(!isEditing)} style={{ background: '#667eea', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          
          {!isEditing ? (
            <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>Full Name:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.firstName} {profile.lastName}</div>
              </div>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>SSN / ID:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.ssnCust}</div>
              </div>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>Nationality:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.nationality || 'Not specified'}</div>
              </div>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>Phone Number:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.phone || 'Not provided'}</div>
              </div>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>Email:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.email || 'Not provided'}</div>
              </div>
              <div className="info-row" style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="info-label" style={{ fontWeight: '600', color: '#666', width: '120px' }}>Address:</div>
                <div className="info-value" style={{ color: '#333' }}>{profile.address || 'Not provided'}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>First Name</label>
                  <input type="text" className="form-control" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Last Name</label>
                  <input type="text" className="form-control" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                </div>
              </div>
              <div className="form-row" style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Nationality</label>
                  <input type="text" className="form-control" value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Phone</label>
                  <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Email</label>
                <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label>Address</label>
                <textarea className="form-control" rows="2" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}></textarea>
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit" className="btn-save" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Save Changes</button>
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        
        {/* Reservation History Section */}
        <div className="profile-section" style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e0e0e0' }}>
            <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>📅 Reservation History</div>
          </div>
          {reservations.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No reservations found</div>
          ) : (
            <div className="reservations-list">
              {reservations.map(res => (
                <div key={res.id} className="reservation-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px', marginBottom: '10px' }}>
                  <div>
                    <div className="reservation-id" style={{ fontWeight: '600', color: '#667eea', marginBottom: '5px' }}>#RES-{res.id}</div>
                    <div className="reservation-dates" style={{ fontSize: '13px', color: '#666' }}>{res.checkInDate} → {res.checkOutDate}</div>
                    <div className="reservation-room" style={{ fontSize: '13px', color: '#888' }}>🛏️ Room {res.roomNumber}</div>
                  </div>
                  <div>
                    <span className={`reservation-status ${getStatusClass(res.status)}`} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>{res.status.toUpperCase()}</span>
                  </div>
                  <div className="reservation-amount" style={{ fontWeight: 'bold', color: '#28a745' }}>${res.totalAmount}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;