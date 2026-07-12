import api from './api';

export const staffService = {
  // Profile
  getProfile: () => api.get('/staff/profile'),
  updateProfile: (data) => api.put('/staff/profile', data),
  
  // Statistics
  getStats: () => api.get('/staff/stats'),
  
  // Tasks
  getTasks: () => api.get('/staff/tasks'),
  getPendingTasks: () => api.get('/staff/tasks/pending'),
  getCompletedTasks: () => api.get('/staff/tasks/completed'),
  startTask: (taskId, notes) => api.put(`/staff/tasks/${taskId}/start`, { notes }),
  completeTask: (taskId, notes) => api.put(`/staff/tasks/${taskId}/complete`, { notes }),
  getTaskDetails: (taskId) => api.get(`/staff/tasks/${taskId}`),
  
  // Reservations
  getRecentReservations: () => api.get('/staff/reservations/recent'),
  getTodayCheckins: () => api.get('/staff/checkins/today'),
  getTodayCheckouts: () => api.get('/staff/checkouts/today'),
  processCheckin: (id) => api.put(`/staff/reservations/${id}/checkin`),
  processCheckout: (id) => api.put(`/staff/reservations/${id}/checkout`),
  
  // Activities
  getRecentActivities: () => api.get('/staff/activities/recent'),
  
  // Schedule
  getSchedule: () => api.get('/staff/schedule'),
  
  // Department Services
  getDepartmentServices: () => api.get('/staff/department/services'),
  createServiceRequest: (data) => api.post('/staff/services/request', data),
};