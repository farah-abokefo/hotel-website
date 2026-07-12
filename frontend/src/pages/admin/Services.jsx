import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/Layout/AdminNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/admin.css';

const AdminServices = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Demo data for services
  const services = [
    { service_id: 1, service_name: 'Swedish Massage', description: 'Relaxing full body massage using long strokes and kneading techniques', price: 150, category: 'spa', duration: 60, status: 'active', usage_count: 45, total_revenue: 6750 },
    { service_id: 2, service_name: 'Deep Tissue Massage', description: 'Focused deep muscle relief for tension and pain', price: 180, category: 'spa', duration: 60, status: 'active', usage_count: 32, total_revenue: 5760 },
    { service_id: 3, service_name: 'Hot Stone Massage', description: 'Warm stones used to melt away tension', price: 200, category: 'spa', duration: 75, status: 'active', usage_count: 28, total_revenue: 5600 },
    { service_id: 4, service_name: 'Airport Transfer', description: 'Luxury car to/from airport with meet and greet service', price: 80, category: 'transport', duration: 45, status: 'active', usage_count: 120, total_revenue: 9600 },
    { service_id: 5, service_name: 'City Tour', description: 'Guided tour of local attractions and landmarks', price: 120, category: 'entertainment', duration: 180, status: 'active', usage_count: 28, total_revenue: 3360 },
    { service_id: 6, service_name: 'Breakfast Buffet', description: 'International breakfast spread with hot and cold options', price: 25, category: 'dining', duration: null, status: 'active', usage_count: 200, total_revenue: 5000 },
    { service_id: 7, service_name: 'Romantic Dinner', description: 'Candlelit dinner for two with wine', price: 120, category: 'dining', duration: 90, status: 'active', usage_count: 45, total_revenue: 5400 },
    { service_id: 8, service_name: 'Laundry Service', description: 'Same-day laundry and dry cleaning', price: 30, category: 'other', duration: null, status: 'active', usage_count: 67, total_revenue: 2010 },
    { service_id: 9, service_name: 'Fitness Class', description: 'Yoga or pilates session with professional instructor', price: 40, category: 'spa', duration: 60, status: 'active', usage_count: 12, total_revenue: 480 },
    { service_id: 10, service_name: 'Private Chef', description: 'In-room private dining experience', price: 300, category: 'dining', duration: 120, status: 'active', usage_count: 8, total_revenue: 2400 }
  ];

  const getCategoryIcon = (category) => {
    const icons = { 'spa': '💆', 'dining': '🍽️', 'transport': '🚗', 'entertainment': '🎭', 'other': '⚙️' };
    return icons[category] || '⚙️';
  };

  const getCategoryName = (category) => {
    const names = { 'spa': 'Spa & Wellness', 'dining': 'Dining', 'transport': 'Transport', 'entertainment': 'Entertainment', 'other': 'Other' };
    return names[category] || category;
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const viewDetails = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const totalServices = filteredServices.length;
  const totalRevenue = filteredServices.reduce((sum, s) => sum + (s.total_revenue || 0), 0);

  return (
    <div>
      <AdminNavbar onLogout={logout} />
      
      <div className="content-container">
        <div className="page-header">
          <h1>⚙️ Service Management</h1>
        </div>
        
        <div className="filter-section">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="spa">Spa & Wellness</option>
            <option value="dining">Dining</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card">
            <div className="stat-number">{totalServices}</div>
            <div className="stat-label">Total Services</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        
        <div className="services-grid">
          {filteredServices.length === 0 ? (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '10px' }}>
              No services found
            </div>
          ) : (
            filteredServices.map(service => (
              <div key={service.service_id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">{getCategoryIcon(service.category)}</div>
                  <div className="service-name">{service.service_name}</div>
                  <div className="service-category">{getCategoryName(service.category)}</div>
                </div>
                <div className="service-body">
                  <div className="service-description">{service.description}</div>
                  <div className="service-details">
                    {service.duration && (
                      <div className="detail-row">
                        <span className="detail-label">⏱️ Duration:</span>
                        <span className="detail-value">{service.duration} minutes</span>
                      </div>
                    )}
                    <div className="detail-row">
                      <span className="detail-label">💰 Price:</span>
                      <span className="detail-value" style={{ fontWeight: 'bold', color: '#28a745' }}>${service.price}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📈 Bookings:</span>
                      <span className="detail-value">{service.usage_count || 0}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💵 Revenue:</span>
                      <span className="detail-value">${(service.total_revenue || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="btn-view" onClick={() => viewDetails(service)}>View Details</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Service Details - ${selectedService?.service_name}`}>
        {selectedService && (
          <div>
            <div className="detail-row"><strong>Service Name:</strong> {selectedService.service_name}</div>
            <div className="detail-row"><strong>Category:</strong> {getCategoryName(selectedService.category)}</div>
            <div className="detail-row"><strong>Description:</strong> {selectedService.description}</div>
            <div className="detail-row"><strong>Price:</strong> ${selectedService.price}</div>
            {selectedService.duration && <div className="detail-row"><strong>Duration:</strong> {selectedService.duration} minutes</div>}
            <div className="detail-row"><strong>Status:</strong> <span style={{ color: '#28a745' }}>🟢 Active</span></div>
            <div className="detail-row"><strong>Total Bookings:</strong> {selectedService.usage_count || 0}</div>
            <div className="detail-row"><strong>Total Revenue:</strong> ${(selectedService.total_revenue || 0).toLocaleString()}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminServices;