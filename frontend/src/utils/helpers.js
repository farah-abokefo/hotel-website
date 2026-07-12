export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'N/A';
  return `$${amount.toLocaleString()}`;
};

export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getMembershipLevel = (membershipId) => {
  const levels = { 1: 'Bronze', 2: 'Silver', 3: 'Gold', 4: 'Platinum' };
  return levels[membershipId] || 'Standard';
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    confirmed: 'status-confirmed',
    pending: 'status-pending',
    'checked-in': 'status-checked-in',
    'checked-out': 'status-checked-out',
    cancelled: 'status-cancelled',
    available: 'status-available',
    occupied: 'status-occupied',
    maintenance: 'status-maintenance',
    active: 'status-active',
    inactive: 'status-inactive',
    expired: 'status-expired'
  };
  return classes[status] || '';
};

export const getServiceIcon = (category) => {
  const icons = {
    spa: '💆',
    dining: '🍽️',
    transport: '🚗',
    entertainment: '🎭',
    other: '⚙️'
  };
  return icons[category] || '⚙️';
};

export const getRoomIcon = (roomType) => {
  const icons = {
    Standard: '🛏️',
    Deluxe: '🛋️',
    Suite: '🏨',
    Executive: '💼',
    Presidential: '👑'
  };
  return icons[roomType] || '🛏️';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9+\-\s()]{10,15}$/;
  return re.test(phone);
};

export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};