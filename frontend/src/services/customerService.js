import api from './api';

export const customerService = {
  // Profile
  getProfile: () => api.get('/customer/profile'),
  updateProfile: (data) => api.put('/customer/profile', data),
  
  // Statistics
  getStats: () => api.get('/customer/stats'),
  
  // Reservations
  getReservations: () => api.get('/customer/reservations'),
  getUpcomingReservations: () => api.get('/customer/reservations/upcoming'),
  getReservationHistory: () => api.get('/customer/reservations/history'),
  getActiveReservations: () => api.get('/customer/reservations/active'),
  getReservationById: (id) => api.get(`/customer/reservations/${id}`),
  createReservation: (data) => api.post('/customer/reservations', data),
  cancelReservation: (id) => api.put(`/customer/reservations/${id}/cancel`),
  
  // Services
  getReservationServices: (id) => api.get(`/customer/reservations/${id}/services`),
  addService: (reservationId, serviceId) => 
    api.post(`/customer/reservations/${reservationId}/services`, { serviceId }),
  
  // Payments
  getPayments: () => api.get('/customer/payments'),
};