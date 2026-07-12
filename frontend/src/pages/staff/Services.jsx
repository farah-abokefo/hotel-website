import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StaffNavbar from '../../components/Layout/StaffNavbar';
import Modal from '../../components/Common/Modal';
import '../../styles/staff.css';

const StaffServices = () => {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState('available');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [taskNotes, setTaskNotes] = useState('');

  // Demo data for services
  const services = [
    { service_id: 1, service_name: 'Swedish Massage', description: 'Relaxing full body massage using long strokes', price: 150, category: 'spa', duration: 60, status: 'active' },
    { service_id: 2, service_name: 'Deep Tissue Massage', description: 'Focused deep muscle relief', price: 180, category: 'spa', duration: 60, status: 'active' },
    { service_id: 3, service_name: 'Airport Transfer', description: 'Luxury car to/from airport', price: 80, category: 'transport', duration: 45, status: 'active' },
    { service_id: 4, service_name: 'Breakfast Buffet', description: 'International breakfast spread', price: 25, category: 'dining', duration: null, status: 'active' },
    { service_id: 5, service_name: 'Laundry Service', description: 'Same-day laundry service', price: 30, category: 'other', duration: null, status: 'active' },
    { service_id: 6, service_name: 'Romantic Dinner', description: 'Candlelit dinner for two', price: 120, category: 'dining', duration: 90, status: 'active' },
    { service_id: 7, service_name: 'City Tour', description: 'Guided tour of local attractions', price: 120, category: 'entertainment', duration: 180, status: 'active' }
  ];

  // Demo data for assigned tasks
  const [assignedTasks, setAssignedTasks] = useState([
    { task_id: 101, service_id: 1, reservation_id: 1001, room_number: 304, status: 'in-progress', assigned_date: '2024-01-15', customer_name: 'John Smith', notes: '' },
    { task_id: 102, service_id: 3, reservation_id: 1002, room_number: 205, status: 'pending', assigned_date: '2024-01-16', customer_name: 'Sarah Johnson', notes: '' },
    { task_id: 103, service_id: 4, reservation_id: 1003, room_number: 412, status: 'pending', assigned_date: '2024-01-16', customer_name: 'Michael Brown', notes: '' },
    { task_id: 104, service_id: 5, reservation_id: 1001, room_number: 304, status: 'completed', assigned_date: '2024-01-14', customer_name: 'John Smith', notes: 'Completed on time', completed_date: '2024-01-14' }
  ]);

  const getCategoryIcon = (category) => {
    const icons = { 'spa': '💆', 'dining': '🍽️', 'transport': '🚗', 'entertainment': '🎭', 'other': '⚙️' };
    return icons[category] || '⚙️';
  };

  const getStatusText = (status) => {
    const texts = { 'pending': '⏳ Pending', 'in-progress': '⚙️ In Progress', 'completed': '✅ Completed' };
    return texts[status] || status;
  };

  const assignTask = (serviceId) => {
    const service = services.find(s => s.service_id === serviceId);
    if (window.confirm(`Assign "${service?.service_name}" to yourself?`)) {
      const newTask = {
        task_id: Date.now(),
        service_id: serviceId,
        reservation_id: Math.floor(Math.random() * 10000),
        room_number: Math.floor(Math.random() * 500) + 100,
        status: 'pending',
        assigned_date: new Date().toISOString().split('T')[0],
        customer_name: 'New Guest',
        notes: ''
      };
      setAssignedTasks([...assignedTasks, newTask]);
      alert(`Task "${service?.service_name}" assigned successfully!`);
      setCurrentTab('assigned');
    }
  };

  const openTaskModal = (task, type) => {
    setCurrentTask(task);
    setActionType(type);
    setTaskNotes(task.notes || '');
    setShowTaskModal(true);
  };

  const confirmTaskAction = () => {
    if (actionType === 'start') {
      setAssignedTasks(assignedTasks.map(task => 
        task.task_id === currentTask.task_id 
          ? { ...task, status: 'in-progress', notes: taskNotes }
          : task
      ));
      alert('Task started successfully!');
    } else if (actionType === 'complete') {
      setAssignedTasks(assignedTasks.map(task => 
        task.task_id === currentTask.task_id 
          ? { ...task, status: 'completed', notes: taskNotes, completed_date: new Date().toISOString().split('T')[0] }
          : task
      ));
      alert('Task completed successfully!');
    }
    setShowTaskModal(false);
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.service_id === serviceId);
    return service?.service_name || 'Unknown Service';
  };

  const pendingTasks = assignedTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = assignedTasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = assignedTasks.filter(t => t.status === 'completed').length;

  return (
    <div>
      <StaffNavbar onLogout={logout} staff={user} />
      
      <div className="services-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
        <div className="page-header">
          <h1>⚙️ Department Services</h1>
          <p>Manage and track service requests from guests</p>
        </div>
        
        <div className="stats-grid small">
          <div className="stat-card" onClick={() => setCurrentTab('assigned')} style={{ cursor: 'pointer' }}>
            <div className="stat-number">{pendingTasks}</div>
            <div className="stat-label">Pending Tasks</div>
          </div>
          <div className="stat-card" onClick={() => setCurrentTab('assigned')} style={{ cursor: 'pointer' }}>
            <div className="stat-number">{inProgressTasks}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card" onClick={() => setCurrentTab('completed')} style={{ cursor: 'pointer' }}>
            <div className="stat-number">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card" onClick={() => setCurrentTab('available')} style={{ cursor: 'pointer' }}>
            <div className="stat-number">{services.length}</div>
            <div className="stat-label">Total Services</div>
          </div>
        </div>
        
        <div className="tabs" style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e0e0e0' }}>
          <button 
            className={`tab ${currentTab === 'available' ? 'active' : ''}`} 
            onClick={() => setCurrentTab('available')}
            style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: currentTab === 'available' ? '2px solid #667eea' : 'none', background: 'none', fontSize: '14px' }}
          >
            Available Services
          </button>
          <button 
            className={`tab ${currentTab === 'assigned' ? 'active' : ''}`} 
            onClick={() => setCurrentTab('assigned')}
            style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: currentTab === 'assigned' ? '2px solid #667eea' : 'none', background: 'none', fontSize: '14px' }}
          >
            My Assigned Tasks ({pendingTasks + inProgressTasks})
          </button>
          <button 
            className={`tab ${currentTab === 'completed' ? 'active' : ''}`} 
            onClick={() => setCurrentTab('completed')}
            style={{ padding: '10px 20px', cursor: 'pointer', borderBottom: currentTab === 'completed' ? '2px solid #667eea' : 'none', background: 'none', fontSize: '14px' }}
          >
            Completed ({completedTasks})
          </button>
        </div>
        
        {currentTab === 'available' && (
          <div className="services-grid">
            {services.map(service => (
              <div key={service.service_id} className="service-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                <div className="service-header" style={{ padding: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="service-icon" style={{ fontSize: '36px' }}>{getCategoryIcon(service.category)}</div>
                  <div className="service-name" style={{ flex: 1, fontWeight: 'bold' }}>{service.service_name}</div>
                </div>
                <div className="service-body" style={{ padding: '20px' }}>
                  <div className="service-description" style={{ marginBottom: '15px', color: '#666' }}>{service.description}</div>
                  <div className="service-details" style={{ marginBottom: '15px' }}>
                    {service.duration && <div>⏱️ Duration: {service.duration} minutes</div>}
                    <div>💰 Price: <strong>${service.price}</strong></div>
                  </div>
                  <button 
                    className="btn-start" 
                    onClick={() => assignTask(service.service_id)}
                    style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Assign to Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {currentTab === 'assigned' && (
          <div className="services-grid">
            {assignedTasks.filter(t => t.status !== 'completed').map(task => {
              const service = services.find(s => s.service_id === task.service_id);
              return (
                <div key={task.task_id} className="service-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                  <div className="service-header" style={{ padding: '15px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <div className="service-name">{service?.service_name || 'Task'}</div>
                  </div>
                  <div className="service-body" style={{ padding: '20px' }}>
                    <div className="service-details">
                      <div>🛏️ Room: {task.room_number}</div>
                      <div>👤 Customer: {task.customer_name}</div>
                      <div>📅 Assigned: {task.assigned_date}</div>
                    </div>
                    <div className={`task-status status-${task.status}`} style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', marginBottom: '12px' }}>
                      {getStatusText(task.status)}
                    </div>
                    <div className="action-buttons" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                      {task.status === 'pending' && (
                        <button className="btn-start" onClick={() => openTaskModal(task, 'start')} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>Start Task</button>
                      )}
                      {task.status === 'in-progress' && (
                        <button className="btn-complete" onClick={() => openTaskModal(task, 'complete')} style={{ padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>Complete Task</button>
                      )}
                      <button className="btn-view" onClick={() => openTaskModal(task, 'view')} style={{ padding: '8px 16px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>View Details</button>
                    </div>
                  </div>
                </div>
              );
            })}
            {assignedTasks.filter(t => t.status !== 'completed').length === 0 && (
              <div className="empty-state" style={{ textAlign: 'center', padding: '60px' }}>No assigned tasks</div>
            )}
          </div>
        )}
        
        {currentTab === 'completed' && (
          <div className="services-grid">
            {assignedTasks.filter(t => t.status === 'completed').map(task => {
              const service = services.find(s => s.service_id === task.service_id);
              return (
                <div key={task.task_id} className="service-card" style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                  <div className="service-header" style={{ padding: '15px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white' }}>
                    <div className="service-name">✅ {service?.service_name || 'Completed Task'}</div>
                  </div>
                  <div className="service-body" style={{ padding: '20px' }}>
                    <div className="service-details">
                      <div>🛏️ Room: {task.room_number}</div>
                      <div>👤 Customer: {task.customer_name}</div>
                      <div>📅 Completed: {task.completed_date || task.assigned_date}</div>
                    </div>
                    <button className="btn-view" onClick={() => openTaskModal(task, 'view')} style={{ width: '100%', padding: '10px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '15px' }}>View Details</button>
                  </div>
                </div>
              );
            })}
            {assignedTasks.filter(t => t.status === 'completed').length === 0 && (
              <div className="empty-state" style={{ textAlign: 'center', padding: '60px' }}>No completed tasks</div>
            )}
          </div>
        )}
      </div>
      
      {/* Task Modal */}
      <Modal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} title={actionType === 'start' ? 'Start Service Task' : actionType === 'complete' ? 'Complete Service Task' : 'Task Details'}>
        <div className="form-group">
          <label>Task Information</label>
          {currentTask && (
            <div style={{ marginBottom: '15px' }}>
              <p><strong>Service:</strong> {getServiceName(currentTask.service_id)}</p>
              <p><strong>Room:</strong> {currentTask.room_number}</p>
              <p><strong>Customer:</strong> {currentTask.customer_name}</p>
            </div>
          )}
          <label>Notes</label>
          <textarea 
            className="form-control" 
            rows="4" 
            placeholder="Add notes about this task..." 
            value={taskNotes}
            onChange={(e) => setTaskNotes(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>
        <div className="modal-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          {(actionType === 'start' || actionType === 'complete') && (
            <button className="btn-submit" onClick={confirmTaskAction} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>
              {actionType === 'start' ? 'Start Task' : 'Complete Task'}
            </button>
          )}
          <button className="btn-cancel" onClick={() => setShowTaskModal(false)} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 }}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default StaffServices;