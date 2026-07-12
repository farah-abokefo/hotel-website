import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerNavbar from '../../components/Layout/CustomerNavbar';
import '../../styles/customer.css';

const CustomerServices = () => {
  const { user, logout } = useAuth();
  const [cart, setCart] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');

  // Demo data for services
  const services = [
    { service_id: 1, service_name: 'Swedish Massage', description: 'Relaxing full body massage using long strokes and kneading techniques', price: 150, category: 'spa', duration: 60, rating: 4.8, reviews: 245 },
    { service_id: 2, service_name: 'Deep Tissue Massage', description: 'Focused deep muscle relief for tension and pain', price: 180, category: 'spa', duration: 60, rating: 4.9, reviews: 189 },
    { service_id: 3, service_name: 'Hot Stone Massage', description: 'Warm stones used to melt away tension', price: 200, category: 'spa', duration: 75, rating: 4.7, reviews: 156 },
    { service_id: 4, service_name: 'Airport Transfer', description: 'Luxury car to/from airport with meet and greet service', price: 80, category: 'transport', duration: 45, rating: 4.6, reviews: 320 },
    { service_id: 5, service_name: 'City Tour', description: 'Guided tour of local attractions and landmarks', price: 120, category: 'entertainment', duration: 180, rating: 4.5, reviews: 178 },
    { service_id: 6, service_name: 'Breakfast Buffet', description: 'International breakfast spread with hot and cold options', price: 25, category: 'dining', duration: null, rating: 4.7, reviews: 567 },
    { service_id: 7, service_name: 'Romantic Dinner', description: 'Candlelit dinner for two with wine', price: 120, category: 'dining', duration: 90, rating: 4.9, reviews: 234 },
    { service_id: 8, service_name: 'Laundry Service', description: 'Same-day laundry and dry cleaning', price: 30, category: 'other', duration: null, rating: 4.4, reviews: 189 },
    { service_id: 9, service_name: 'Fitness Class', description: 'Yoga or pilates session with professional instructor', price: 40, category: 'spa', duration: 60, rating: 4.6, reviews: 98 },
    { service_id: 10, service_name: 'Private Chef', description: 'In-room private dining experience', price: 300, category: 'dining', duration: 120, rating: 5.0, reviews: 45 }
  ];

  // Demo data for customer's active reservations
  const reservations = [
    { id: 1001, roomNumber: 304, checkInDate: '2024-02-15', checkOutDate: '2024-02-18', status: 'confirmed' },
    { id: 1002, roomNumber: 205, checkInDate: '2024-03-01', checkOutDate: '2024-03-05', status: 'confirmed' }
  ];

  const getCategoryIcon = (category) => {
    const icons = { 'spa': '💆', 'dining': '🍽️', 'transport': '🚗', 'entertainment': '🎭', 'other': '⚙️' };
    return icons[category] || '⚙️';
  };

  const getCategoryName = (category) => {
    const names = { 'spa': 'Spa & Wellness', 'dining': 'Dining', 'transport': 'Transport', 'entertainment': 'Entertainment', 'other': 'Other Services' };
    return names[category] || category;
  };

  const filteredServices = currentCategory === 'all' 
    ? services 
    : services.filter(s => s.category === currentCategory);

  const addToCart = (service) => {
    if (!selectedReservation) {
      alert('Please select a reservation first');
      return;
    }
    
    const exists = cart.find(item => item.service_id === service.service_id);
    if (exists) {
      setCart(cart.filter(item => item.service_id !== service.service_id));
    } else {
      setCart([...cart, service]);
    }
  };

  const removeFromCart = (serviceId) => {
    setCart(cart.filter(item => item.service_id !== serviceId));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const checkout = () => {
    if (!selectedReservation) {
      alert('Please select a reservation');
      return;
    }
    
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    const { total } = calculateTotal();
    
    if (window.confirm(`Confirm booking ${cart.length} service(s) for $${total.toFixed(2)}?`)) {
      alert('Services booked successfully!');
      setCart([]);
      setSelectedReservation('');
    }
  };

  const categories = [
    { id: 'all', name: 'All Services', icon: '📋' },
    { id: 'spa', name: 'Spa & Wellness', icon: '💆' },
    { id: 'dining', name: 'Dining', icon: '🍽️' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
    { id: 'other', name: 'Other', icon: '⚙️' }
  ];

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div>
      <CustomerNavbar onLogout={logout} />
      
      <div className="services-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
        <div className="page-header">
          <h1>⚙️ Hotel Services</h1>
          <p>Enhance your stay with our premium services</p>
        </div>
        
        <div className="services-layout" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Left Column - Services */}
          <div style={{ flex: 3 }}>
            <div className="category-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab ${currentCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setCurrentCategory(cat.id)}
                  style={{
                    padding: '10px 20px',
                    background: currentCategory === cat.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f0f0f0',
                    color: currentCategory === cat.id ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            
            <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {filteredServices.map(service => (
                <div key={service.service_id} className="service-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div className="service-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                    <span className="service-icon" style={{ fontSize: '36px' }}>{getCategoryIcon(service.category)}</span>
                    <span className="service-category" style={{ fontSize: '12px', opacity: 0.8 }}>{getCategoryName(service.category)}</span>
                  </div>
                  <div className="service-info" style={{ padding: '20px' }}>
                    <div className="service-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div className="service-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{service.service_name}</div>
                      <div className="service-price" style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>${service.price}</div>
                    </div>
                    <div className="service-description" style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{service.description}</div>
                    <div className="service-meta" style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '13px', color: '#666' }}>
                      {service.duration && <div>⏱️ {service.duration} min</div>}
                      <div>⭐ {service.rating} ({service.reviews} reviews)</div>
                    </div>
                    <button 
                      className={`add-to-cart-btn ${cart.find(item => item.service_id === service.service_id) ? 'in-cart' : ''}`}
                      onClick={() => addToCart(service)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: cart.find(item => item.service_id === service.service_id) ? '#28a745' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {cart.find(item => item.service_id === service.service_id) ? '✓ Added to Cart' : 'Add to Cart +'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Cart Sidebar */}
          <div className="cart-sidebar" style={{ flex: 1, background: 'white', borderRadius: '15px', padding: '20px', position: 'sticky', top: '20px', height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="cart-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              🛒 Your Cart
              <span className="cart-badge" style={{ background: '#667eea', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '12px' }}>{cart.length}</span>
            </div>
            
            <div className="reservation-selector" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>📅 Select Reservation</label>
              <select 
                className="form-control" 
                value={selectedReservation} 
                onChange={(e) => setSelectedReservation(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="">Select an active reservation</option>
                {reservations.map(res => (
                  <option key={res.id} value={res.id}>
                    #RES-{res.id} - Room {res.roomNumber} ({res.checkInDate} to {res.checkOutDate})
                  </option>
                ))}
              </select>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart" style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                <div className="empty-cart-icon" style={{ fontSize: '48px', marginBottom: '15px' }}>🛒</div>
                <div>Your cart is empty</div>
                <div className="small" style={{ fontSize: '12px', marginTop: '5px' }}>Add services to enhance your stay</div>
              </div>
            ) : (
              <>
                <div className="cart-items" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {cart.map(item => (
                    <div key={item.service_id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f0f0f0' }}>
                      <div className="cart-item-info">
                        <div className="cart-item-name" style={{ fontSize: '14px', fontWeight: '500' }}>{item.service_name}</div>
                        <div className="cart-item-price" style={{ fontSize: '12px', color: '#28a745' }}>${item.price}</div>
                      </div>
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item.service_id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '5px' }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary" style={{ padding: '15px 0', borderTop: '1px solid #e0e0e0', marginTop: '15px' }}>
                  <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-total" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e0e0e0', fontWeight: 'bold', fontSize: '16px' }}>
                    <span>Total:</span>
                    <span style={{ color: '#28a745' }}>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="checkout-btn" 
                  onClick={checkout} 
                  disabled={!selectedReservation || cart.length === 0}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: !selectedReservation || cart.length === 0 ? '#ccc' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: !selectedReservation || cart.length === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    marginTop: '15px'
                  }}
                >
                  Checkout (${total.toFixed(2)})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServices;