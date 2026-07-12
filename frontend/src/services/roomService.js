import api from './api';

export const roomService = {
  getAll: () => api.get('/rooms'),
  getAvailable: (checkIn, checkOut) => 
    api.get(`/rooms/available?check_in=${checkIn}&check_out=${checkOut}`),
  getDetails: (roomNumber) => api.get(`/rooms/${roomNumber}`),
};