import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../../../frontend/public/src/services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login({ username, password });
      const { token, role: userRole, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setRole(userRole);
      
      return { success: true, role: userRole };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setRole(null);
  };

  const isAdmin = () => role === 'admin';
  const isStaff = () => role === 'staff' || role === 'admin';
  const isCustomer = () => role === 'customer' || role === 'staff' || role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      login,
      logout,
      isAdmin,
      isStaff,
      isCustomer,
    }}>
      {children}
    </AuthContext.Provider>
  );
};