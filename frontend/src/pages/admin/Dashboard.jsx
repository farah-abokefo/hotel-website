import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import StatCard from '../../components/Common/StatCard';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRooms: 0,
    totalReservations: 0,
    totalStaff: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    todayCheckins: 0,
    todayCheckouts: 0,
    monthlyRevenue: 0
  });
  const [recentActivities, setRecentActivities] = useState([
    { type: 'checkin', title: 'Guest checked into Room 304', time: '10 minutes ago' },
    { type: 'booking', title: 'New reservation created', time: '1 hour ago' },
    { type: 'payment', title: 'Payment received', time: '2 hours ago' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const statsData = await adminService.getStats();
      // Ensure statsData has all required properties
      setStats({
        totalCustomers: statsData?.totalCustomers || 0,
        totalRooms: statsData?.totalRooms || 0,
        totalReservations: statsData?.totalReservations || 0,
        totalStaff: statsData?.totalStaff || 0,
        availableRooms: statsData?.availableRooms || 0,
        occupiedRooms: statsData?.occupiedRooms || 0,
        todayCheckins: statsData?.todayCheckins || 0,
        todayCheckouts: statsData?.todayCheckouts || 0,
        monthlyRevenue: statsData?.monthlyRevenue || 0
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickAccess = [
    { icon: '👥', title: 'Customers', path: '/admin/customers' },
    { icon: '🛏️', title: 'Rooms', path: '/admin/rooms' },
    { icon: '📅', title: 'Reservations', path: '/admin/reservations' },
    { icon: '👨‍💼', title: 'Staff', path: '/admin/staff' },
    { icon: '🏢', title: 'Departments', path: '/admin/departments' },
    { icon: '⚙️', title: 'Services', path: '/admin/services' },
    { icon: '🏷️', title: 'Discounts', path: '/admin/discounts' },
    { icon: '💰', title: 'Price List', path: '/admin/price-list' },
  ];

  if (loading) {
    return (
      <div>
        <AdminNavbar onLogout={logout} />
        <div className="loading" style={{ textAlign: 'center', padding: '60px' }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>🏨 Admin Dashboard</h1>
        </div>
        
        <div className="stats-grid">
          <StatCard icon="👥" value={stats.totalCustomers} label="Total Customers" />
          <StatCard icon="🛏️" value={stats.totalRooms} label="Total Rooms" extra={`${stats.availableRooms} Available | ${stats.occupiedRooms} Occupied`} />
          <StatCard icon="📅" value={stats.totalReservations} label="Total Reservations" extra={`Today: ${stats.todayCheckins} check-in, ${stats.todayCheckouts} check-out`} />
          <StatCard icon="👨‍💼" value={stats.totalStaff} label="Active Staff" />
          <StatCard icon="💰" value={`$${stats.monthlyRevenue.toLocaleString()}`} label="Monthly Revenue" />
        </div>
        
        <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>📋 Quick Access</div>
        <div className="quick-access-grid">
          {quickAccess.map((item, index) => (
            <Link to={item.path} key={index} className="quick-card">
              <div className="quick-card-icon">{item.icon}</div>
              <div className="quick-card-title">{item.title}</div>
            </Link>
          ))}
        </div>
        
        <div className="section-title" style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>🔄 Recent Activity</div>
        <div className="activity-section">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {activity.type === 'checkin' ? '✅' : activity.type === 'booking' ? '📝' : '💳'}
              </div>
              <div className="activity-details">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const loadDashboardData = async () => {
  try {
    const statsData = await adminService.getStats();
    console.log('Dashboard stats from backend:', statsData); // Add this line
    setStats({
      totalCustomers: statsData?.totalCustomers || 0,
      totalRooms: statsData?.totalRooms || 0,
      totalReservations: statsData?.totalReservations || 0,
      totalStaff: statsData?.totalStaff || 0,
      availableRooms: statsData?.availableRooms || 0,
      occupiedRooms: statsData?.occupiedRooms || 0,
      todayCheckins: statsData?.todayCheckins || 0,
      todayCheckouts: statsData?.todayCheckouts || 0,
      monthlyRevenue: statsData?.monthlyRevenue || 0
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
  } finally {
    setLoading(false);
  }
};
export default AdminDashboard;