import React, { useState, useEffect } from 'react';
import { staffService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import StaffNavbar from '../../components/Layout/StaffNavbar';
import StatCard from '../../components/Common/StatCard';
import '../../styles/staff.css';

const StaffDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    pendingTasks: 0,
    reservationsHandled: 0,
    activeReservations: 0,
    customerSatisfaction: 0
  });
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Try to fetch from API, but use demo data if it fails
      const statsData = await staffService.getStats();
      setStats(statsData);
      
      const reservations = await staffService.getRecentReservations();
      setRecentReservations(Array.isArray(reservations) ? reservations : []);
      
      const activities = await staffService.getRecentActivities();
      setRecentActivities(Array.isArray(activities) ? activities : []);
    } catch (error) {
      console.error('Error loading dashboard, using demo data:', error);
      // Demo data
      setStats({
        tasksCompleted: 48,
        pendingTasks: 12,
        reservationsHandled: 156,
        activeReservations: 8,
        customerSatisfaction: 94
      });
      setRecentReservations([
        { id: 1001, roomNumber: 304, customerName: 'John Smith', checkInDate: '2024-01-15', checkOutDate: '2024-01-18', status: 'confirmed' },
        { id: 1002, roomNumber: 205, customerName: 'Sarah Johnson', checkInDate: '2024-01-16', checkOutDate: '2024-01-20', status: 'checked-in' },
        { id: 1003, roomNumber: 412, customerName: 'Michael Brown', checkInDate: '2024-01-17', checkOutDate: '2024-01-19', status: 'confirmed' },
        { id: 1004, roomNumber: 108, customerName: 'Emily Davis', checkInDate: '2024-01-18', checkOutDate: '2024-01-22', status: 'pending' }
      ]);
      setRecentActivities([
        { type: 'checkin', title: 'Guest checked into Room 304', time: '10 minutes ago' },
        { type: 'booking', title: 'New reservation #RES-1005 created', time: '1 hour ago' },
        { type: 'service', title: 'Room service delivered to Room 205', time: '2 hours ago' },
        { type: 'payment', title: 'Payment received $450 from Room 412', time: '3 hours ago' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    const icons = { checkin: '✅', checkout: '🚪', booking: '📝', service: '⚙️', payment: '💳' };
    return icons[type] || '📌';
  };

  const getActivityClass = (type) => {
    const classes = { checkin: 'checkin', booking: 'booking', service: 'service', payment: 'payment' };
    return classes[type] || 'booking';
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

  if (loading) {
    return (
      <div>
        <StaffNavbar onLogout={logout} staff={user} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <StaffNavbar onLogout={logout} staff={user} />
      
      <div className="staff-dashboard" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
        <div className="welcome-section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px', padding: '30px', color: 'white', marginBottom: '30px' }}>
          <div className="welcome-title" style={{ fontSize: '28px', marginBottom: '10px' }}>Welcome back, {user?.firstName || 'Staff'}! 👋</div>
          <div className="current-time">📅 {currentTime.toLocaleDateString()} | ⏰ {currentTime.toLocaleTimeString()}</div>
        </div>
        
        <div className="stats-grid">
          <StatCard icon="✅" value={stats.tasksCompleted} label="Tasks Completed" />
          <StatCard icon="⏰" value={stats.pendingTasks} label="Pending Tasks" />
          <StatCard icon="📅" value={stats.reservationsHandled} label="Reservations Handled" />
          <StatCard icon="👥" value={stats.activeReservations} label="Active Guests" />
          <StatCard icon="⭐" value={`${stats.customerSatisfaction}%`} label="Satisfaction Rate" />
        </div>
        
        <div className="two-column" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginTop: '30px' }}>
          <div className="section" style={{ background: 'white', borderRadius: '15px', padding: '20px' }}>
            <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>📅 Recent Reservations</div>
            <div className="reservation-list">
              {Array.isArray(recentReservations) && recentReservations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No recent reservations</div>
              ) : (
                Array.isArray(recentReservations) && recentReservations.map((res) => (
                  <div key={res.id} className="reservation-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                    <div>
                      <div className="reservation-id" style={{ fontWeight: '600', color: '#667eea' }}>#RES-{res.id}</div>
                      <div className="reservation-details" style={{ fontSize: '13px', color: '#666' }}>
                        {res.customerName} | Room {res.roomNumber}
                      </div>
                      <div className="reservation-dates" style={{ fontSize: '12px', color: '#999' }}>
                        {res.checkInDate} → {res.checkOutDate}
                      </div>
                    </div>
                    <div>
                      <span className={`status-badge ${getStatusClass(res.status)}`} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="section" style={{ background: 'white', borderRadius: '15px', padding: '20px' }}>
            <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>🔄 Recent Activity</div>
            <div className="activity-list">
              {Array.isArray(recentActivities) && recentActivities.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No recent activity</div>
              ) : (
                Array.isArray(recentActivities) && recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                    <div className={`activity-icon ${getActivityClass(activity.type)}`} style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="activity-title" style={{ fontWeight: '500', marginBottom: '4px' }}>{activity.title}</div>
                      <div className="activity-time" style={{ fontSize: '11px', color: '#999' }}>{activity.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;