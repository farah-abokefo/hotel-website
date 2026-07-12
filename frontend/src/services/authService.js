import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.clear();
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (token && user && user !== 'undefined') {
      try {
        return { user: JSON.parse(user), role };
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};