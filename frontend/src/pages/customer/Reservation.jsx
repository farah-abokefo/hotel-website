import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerNavbar from '../../components/Layout/CustomerNavbar';
import '../../styles/customer.css';

const CustomerReservation = () => {
  const { logout } = useAuth();
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  // Demo rooms data
  const allRooms = [
    { roomNumber: 101, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Available', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 102, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Available', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 103, floorNumber: 1, roomType: 'Standard', currentPrice: 150, statusName: 'Occupied', capacity: 2, bedType: 'Queen', amenities: ['WiFi', 'TV', 'AC'] },
    { roomNumber: 201, floorNumber: 2, roomType: 'Deluxe', currentPrice: 250, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { roomNumber: 202, floorNumber: 2, roomType: 'Deluxe', currentPrice: 250, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'] },
    { roomNumber: 301, floorNumber: 3, roomType: 'Suite', currentPrice: 400, statusName: 'Available', capacity: 4, bedType: 'King + Sofa', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi'] },
    { roomNumber: 401, floorNumber: 4, roomType: 'Executive', currentPrice: 600, statusName: 'Available', capacity: 2, bedType: 'King', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Work Desk'] },
    { roomNumber: 501, floorNumber: 5, roomType: 'Presidential', currentPrice: 1000, statusName: 'Available', capacity: 6, bedType: 'King + 2 Twins', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Jacuzzi', 'Butler Service'] }
  ];

  const searchAvailableRooms = () => {
    if (new Date(checkIn) >= new Date(checkOut)) {
      alert('Check-out date must be after check-in date');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      // Filter available rooms
      const available = allRooms.filter(room => room.statusName === 'Available');
      setAvailableRooms(available);
      setStep(2);
      setLoading(false);
    }, 500);
  };

  const selectRoom = (room) => {
    setSelectedRoom(room);
    setStep(3);
  };

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomTotal = selectedRoom ? (selectedRoom.currentPrice || 150) * nights : 0;
    return { roomTotal, nights, grandTotal: roomTotal };
  };

  const confirmBooking = () => {
    const { grandTotal, nights } = calculateTotal();
    
    if (window.confirm(`Confirm booking for ${nights} night(s)?\n\nRoom: ${selectedRoom?.roomNumber}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nTotal: $${grandTotal}`)) {
      setLoading(true);
      setTimeout(() => {
        alert('Booking confirmed successfully!');
        window.location.href = '/dashboard';
      }, 500);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setAvailableRooms([]);
    } else if (step === 3) {
      setStep(2);
      setSelectedRoom(null);
    }
  };

  const { grandTotal, nights } = calculateTotal();

  return (
    <div>
      <CustomerNavbar onLogout={logout} />
      
      <div className="reservation-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <div className="page-header">
          <h1>📅 Book a Room</h1>
          <p>Select your dates, choose a room, and confirm your booking</p>
        </div>
        
        <div className="booking-steps" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
          {['Select Dates', 'Choose Room', 'Confirm'].map((label, i) => (
            <div key={i} className={`step ${step === i + 1 ? 'active' : step > i + 1 ? 'completed' : ''}`} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: step === i + 1 ? '#667eea' : step > i + 1 ? '#28a745' : '#ddd', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 10px',
                fontWeight: 'bold'
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <div style={{ fontSize: '14px', color: step === i + 1 ? '#667eea' : '#666' }}>{label}</div>
            </div>
          ))}
        </div>
        
        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="section" style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '500px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '20px' }}>Select Your Dates</h3>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Check-in Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={checkIn} 
                onChange={(e) => setCheckIn(e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '5px' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Check-out Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={checkOut} 
                onChange={(e) => setCheckOut(e.target.value)} 
                min={checkIn}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '5px' }}
              />
            </div>
            <button 
              onClick={searchAvailableRooms} 
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? 'Searching...' : 'Search Available Rooms →'}
            </button>
          </div>
        )}
        
        {/* Step 2: Room Selection */}
        {step === 2 && (
          <div className="section">
            <h3 style={{ marginBottom: '20px' }}>Choose Your Room</h3>
            <div className="rooms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
              {availableRooms.map(room => (
                <div key={room.roomNumber} className="room-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <div className="room-image" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', textAlign: 'center', fontSize: '36px' }}>
                    {room.roomType === 'Deluxe' ? '🛋️' : room.roomType === 'Suite' ? '🏨' : '🛏️'}
                  </div>
                  <div className="room-info" style={{ padding: '20px' }}>
                    <div className="room-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div>
                        <div className="room-number" style={{ fontSize: '18px', fontWeight: 'bold' }}>Room {room.roomNumber}</div>
                        <div className="room-type" style={{ fontSize: '14px', color: '#666' }}>{room.roomType}</div>
                      </div>
                      <div className="room-price" style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>${room.currentPrice}<span style={{ fontSize: '12px', fontWeight: 'normal' }}>/night</span></div>
                    </div>
                    <div className="room-details" style={{ margin: '10px 0', fontSize: '13px', color: '#666' }}>
                      <div>📍 Floor {room.floorNumber}</div>
                      <div>🛏️ {room.bedType}</div>
                      <div>👥 {room.capacity} guests</div>
                    </div>
                    <button 
                      onClick={() => selectRoom(room)}
                      style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                    >
                      Select This Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={goBack} style={{ marginTop: '20px', padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              ← Back to Dates
            </button>
          </div>
        )}
        
        {/* Step 3: Confirmation */}
        {step === 3 && selectedRoom && (
          <div className="section" style={{ background: 'white', borderRadius: '12px', padding: '30px', maxWidth: '500px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '20px' }}>Booking Summary</h3>
            <div className="booking-summary">
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Room:</strong>
                <span>Room {selectedRoom.roomNumber} - {selectedRoom.roomType}</span>
              </div>
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Check-in:</strong>
                <span>{checkIn}</span>
              </div>
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Check-out:</strong>
                <span>{checkOut}</span>
              </div>
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Nights:</strong>
                <span>{nights}</span>
              </div>
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Price per night:</strong>
                <span>${selectedRoom.currentPrice}</span>
              </div>
              <div className="detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontSize: '18px', fontWeight: 'bold' }}>
                <strong>Total Amount:</strong>
                <span style={{ color: '#28a745' }}>${grandTotal}</span>
              </div>
            </div>
            <div className="action-buttons" style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={goBack} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back</button>
              <button onClick={confirmBooking} disabled={loading} style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReservation;