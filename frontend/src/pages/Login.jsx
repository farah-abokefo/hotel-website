import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(username, password)
    
    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      setError(result.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🏨 Hotel RMS</h1>
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="form-control mb-3" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            className="form-control mb-3" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2" 
            disabled={loading}
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        <div style={{ marginTop: '25px', padding: '15px', background: '#f8f9fa', borderRadius: '12px' }}>
          <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Demo Credentials</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Admin:</span><span>admin / admin123</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Staff:</span><span>staff / staff123</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer:</span><span>C001 / cust123</span></div>
        </div>
      </div>
    </div>
  )
}

export default Login
