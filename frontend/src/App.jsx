// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

// Auth Pages
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminCustomers from './pages/admin/Customers';
import AdminRooms from './pages/admin/Rooms';
import AdminReservations from './pages/admin/Reservations';
import AdminStaff from './pages/admin/Staff';
import AdminDepartments from './pages/admin/Departments';
import AdminServices from './pages/admin/Services';
import AdminDiscounts from './pages/admin/Discounts';
import AdminPriceList from './pages/admin/PriceList';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerRooms from './pages/customer/Rooms';
import CustomerReservation from './pages/customer/Reservation';
import CustomerServices from './pages/customer/Services';
import CustomerProfile from './pages/customer/Profile';

// Staff Pages
import StaffDashboard from './pages/staff/Dashboard';
import StaffServices from './pages/staff/Services';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

const Unauthorized = () => (
  <div className="unauthorized-container">
    <h1>401 - Unauthorized</h1>
    <p>You don't have permission to access this page.</p>
    <a href="/">Go to Dashboard</a>
  </div>
);

function AppRoutes() {
  const { role } = useAuth();
  
  const getDefaultRoute = () => {
    if (role === 'admin') return '/admin';
    if (role === 'staff') return '/staff';
    return '/dashboard';
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/customers" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminCustomers />
        </ProtectedRoute>
      } />
      <Route path="/admin/rooms" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminRooms />
        </ProtectedRoute>
      } />
      <Route path="/admin/reservations" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminReservations />
        </ProtectedRoute>
      } />
      <Route path="/admin/staff" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminStaff />
        </ProtectedRoute>
      } />
      <Route path="/admin/departments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDepartments />
        </ProtectedRoute>
      } />
      <Route path="/admin/services" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminServices />
        </ProtectedRoute>
      } />
      <Route path="/admin/discounts" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDiscounts />
        </ProtectedRoute>
      } />
      <Route path="/admin/price-list" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminPriceList />
        </ProtectedRoute>
      } />
      
      {/* Customer Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
          <CustomerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/rooms" element={
        <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
          <CustomerRooms />
        </ProtectedRoute>
      } />
      <Route path="/reservation" element={
        <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
          <CustomerReservation />
        </ProtectedRoute>
      } />
      <Route path="/services" element={
        <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
          <CustomerServices />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['customer', 'staff', 'admin']}>
          <CustomerProfile />
        </ProtectedRoute>
      } />
      
      {/* Staff Routes */}
      <Route path="/staff" element={
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <StaffDashboard />
        </ProtectedRoute>
      } />
      <Route path="/staff/services" element={
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <StaffServices />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;