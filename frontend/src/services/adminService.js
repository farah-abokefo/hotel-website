import api from './api';

export const adminService = {
  // Dashboard
  getStats: () => api.get('/admin/dashboard/stats'),
  
  // Customers
  getCustomers: () => api.get('/admin/customers'),
  getCustomer: (ssn) => api.get(`/admin/customers/${ssn}`),
  createCustomer: (data) => api.post('/admin/customers', data),
  updateCustomer: (ssn, data) => api.put(`/admin/customers/${ssn}`, data),
  deleteCustomer: (ssn) => api.delete(`/admin/customers/${ssn}`),
  getCustomerCount: () => api.get('/admin/customers/count'),
  
  // Rooms
  getRooms: () => api.get('/admin/rooms'),
  getRoom: (number) => api.get(`/admin/rooms/${number}`),
  createRoom: (data) => api.post('/admin/rooms', data),
  updateRoom: (number, data) => api.put(`/admin/rooms/${number}`, data),
  deleteRoom: (number) => api.delete(`/admin/rooms/${number}`),
  
  // Room Types
  getRoomTypes: () => api.get('/room-types'),
  getRoomStatusTypes: () => api.get('/room-status-types'),
  
  // Reservations
  getReservations: () => api.get('/admin/reservations'),
  getReservationById: (id) => api.get(`/admin/reservations/${id}`),
  updateReservationStatus: (id, status) => 
    api.put(`/admin/reservations/${id}/status`, { status }),
  getReservationCount: () => api.get('/admin/reservations/count'),
  getTodayCheckins: () => api.get('/admin/reservations/today-checkins'),
  getTodayCheckouts: () => api.get('/admin/reservations/today-checkouts'),
  
  // Staff
  getStaff: () => api.get('/admin/staff'),
  getStaffMember: (ssn) => api.get(`/admin/staff/${ssn}`),
  createStaff: (data) => api.post('/admin/staff', data),
  updateStaff: (ssn, data) => api.put(`/admin/staff/${ssn}`, data),
  deleteStaff: (ssn) => api.delete(`/admin/staff/${ssn}`),
  getStaffCount: () => api.get('/admin/staff/count'),
  
  // Departments
  getDepartments: () => api.get('/admin/departments'),
  createDepartment: (data) => api.post('/admin/departments', data),
  updateDepartment: (id, data) => api.put(`/admin/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/admin/departments/${id}`),
  
  // Services
  getAdminServices: () => api.get('/admin/services'),
  createService: (data) => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id) => api.delete(`/admin/services/${id}`),
  
  // Discounts
  getDiscounts: () => api.get('/admin/discounts'),
  createDiscount: (data) => api.post('/admin/discounts', data),
  updateDiscount: (id, data) => api.put(`/admin/discounts/${id}`, data),
  deleteDiscount: (id) => api.delete(`/admin/discounts/${id}`),
  
  // Price List
  getPriceList: () => api.get('/admin/price-list'),
  createPriceEntry: (data) => api.post('/admin/price-list', data),
  updatePriceEntry: (id, data) => api.put(`/admin/price-list/${id}`, data),
  deletePriceEntry: (id) => api.delete(`/admin/price-list/${id}`),
  
  // Membership
  getMembershipLevels: () => api.get('/membership-levels'),
};