import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Customer Services
export const customerService = {
  getProfile: () => api.get('/customer/profile'),
  updateProfile: (data) => api.put('/customer/profile', data),
  getStats: () => api.get('/customer/stats'),
  getReservations: () => api.get('/customer/reservations'),
  getUpcomingReservations: () => api.get('/customer/reservations/upcoming'),
  getReservationHistory: () => api.get('/customer/reservations/history'),
  createReservation: (data) => api.post('/customer/reservations', data),
  cancelReservation: (id) => api.put(`/customer/reservations/${id}/cancel`),
  addService: (reservationId, serviceId) => api.post(`/customer/reservations/${reservationId}/services`, { service_id: serviceId }),
  getActiveReservations: () => api.get('/customer/reservations/active'),
};

// Room Services
export const roomService = {
  getAll: () => api.get('/admin/rooms'),
  getAvailable: (checkIn, checkOut) => 
    api.get(`/rooms/available?check_in=${checkIn}&check_out=${checkOut}`),
  getDetails: (roomNumber) => api.get(`/rooms/${roomNumber}`),
  bookRoom: (data) => api.post('/customer/reservations', data),
};

// Service Services
export const serviceService = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
};

// Staff Services
export const staffService = {
  getProfile: () => api.get('/staff/profile'),
  getStats: () => api.get('/staff/stats'),
  getRecentReservations: () => api.get('/staff/reservations/recent'),
  getTodayCheckins: () => api.get('/staff/checkins/today'),
  getTodayCheckouts: () => api.get('/staff/checkouts/today'),
  getRecentActivities: () => api.get('/staff/activities/recent'),
  getTasks: () => api.get('/staff/tasks'),
  assignTask: (serviceId) => api.post('/staff/tasks', { service_id: serviceId }),
  startTask: (taskId, notes) => api.put(`/staff/tasks/${taskId}/start`, { notes }),
  completeTask: (taskId, notes) => api.put(`/staff/tasks/${taskId}/complete`, { notes }),
};

// Admin Services
export const adminService = {
  getCustomers: () => api.get('/admin/customers'),
  getCustomer: (ssn) => api.get(`/admin/customers/${ssn}`),
  createCustomer: (data) => api.post('/admin/customers', data),
  updateCustomer: (ssn, data) => api.put(`/admin/customers/${ssn}`, data),
  deleteCustomer: (ssn) => api.delete(`/admin/customers/${ssn}`),
  
  getRooms: () => api.get('/admin/rooms'),
  createRoom: (data) => api.post('/admin/rooms', data),
  updateRoom: (number, data) => api.put(`/admin/rooms/${number}`, data),
  deleteRoom: (number) => api.delete(`/admin/rooms/${number}`),
  
  getReservations: () => api.get('/admin/reservations'),
  updateReservationStatus: (id, status) => 
    api.put(`/admin/reservations/${id}/status`, { status }),
  
  getStaff: () => api.get('/admin/staff'),
  createStaff: (data) => api.post('/admin/staff', data),
  updateStaff: (ssn, data) => api.put(`/admin/staff/${ssn}`, data),
  deleteStaff: (ssn) => api.delete(`/admin/staff/${ssn}`),
  
  // getDepartments: () => api.get('/admin/departments'),
  // createDepartment: (data) => api.post('/admin/departments', data),
  // updateDepartment: (id, data) => api.put(`/admin/departments/${id}`, data),
  // deleteDepartment: (id) => api.delete(`/admin/departments/${id}`),
  
  getServices: () => api.get('/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  
  getDiscounts: () => api.get('/admin/discounts'),
  createDiscount: (data) => api.post('/admin/discounts', data),
  updateDiscount: (id, data) => api.put(`/admin/discounts/${id}`, data),
  deleteDiscount: (id) => api.delete(`/admin/discounts/${id}`),
  
  getPriceList: () => api.get('/admin/price-list'),
  createPriceEntry: (data) => api.post('/admin/price-list', data),
  updatePriceEntry: (id, data) => api.put(`/admin/price-list/${id}`, data),
  deletePriceEntry: (id) => api.delete(`/admin/price-list/${id}`),
  
  // Remove or comment out these if they don't exist:
  // getRoomTypes: () => api.get('/room-types'),
  // getRoomStatusTypes: () => api.get('/room-status-types'),
  
  getStats: () => api.get('/admin/dashboard/stats'),
};
export default api;