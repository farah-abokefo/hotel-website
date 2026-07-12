import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(username, password);
    
    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin');
      } else if (result.role === 'staff') {
        navigate('/staff');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const fillDemo = (type) => {
    if (type === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else if (type === 'staff') {
      setUsername('staff');
      setPassword('staff123');
    } else if (type === 'customer') {
      setUsername('C002');
      setPassword('cust123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🏨 Hotel <span>RMS</span></h1>
          <p>Reservation Management System</p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        
        <div className="demo-credentials">
          <div className="demo-title">📋 Quick Demo</div>
          <div className="demo-row">
            <button onClick={() => fillDemo('admin')} className="demo-btn admin">Admin</button>
            <button onClick={() => fillDemo('staff')} className="demo-btn staff">Staff</button>
            <button onClick={() => fillDemo('customer')} className="demo-btn customer">Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;