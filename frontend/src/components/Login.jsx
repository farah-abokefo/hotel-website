import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const { login, loading, error } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!username.trim()) {
            setLocalError('Please enter username');
            return;
        }
        if (!password.trim()) {
            setLocalError('Please enter password');
            return;
        }

        try {
            await login(username.trim(), password.trim());
            // Redirect based on role - you can implement this
            // window.location.href = '/dashboard';
        } catch (err) {
            setLocalError(err.message);
        }
    };

    const fillCredentials = (type) => {
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
                <h1>🏨 Hotel Management System</h1>
                <h2>Login</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            disabled={loading}
                            autoComplete="off"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>
                    
                    {(localError || error) && (
                        <div className="error-message">
                            ❌ {localError || error}
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                
                <div className="demo-section">
                    <h3>Demo Credentials</h3>
                    <div className="demo-buttons">
                        <button onClick={() => fillCredentials('admin')} className="demo-btn admin">
                            Admin Demo
                        </button>
                        <button onClick={() => fillCredentials('staff')} className="demo-btn staff">
                            Staff Demo
                        </button>
                        <button onClick={() => fillCredentials('customer')} className="demo-btn customer">
                            Customer Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;