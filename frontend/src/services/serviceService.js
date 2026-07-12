import api from './api';

export const serviceService = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
  getByCategory: (category) => api.get(`/services?category=${category}`),
};