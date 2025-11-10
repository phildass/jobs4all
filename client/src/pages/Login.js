import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      
      // Redirect based on role
      if (response.role === 'employer') {
        navigate('/dashboard/employer');
      } else {
        navigate('/dashboard/job-seeker');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <h1>Login to Jobs4All</h1>
          <p className="auth-subtitle">Find your dream job in Bangalore</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Job Seeker: rajesh@example.com / password123</p>
            <p>Employer: employer1@techsolutions.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
