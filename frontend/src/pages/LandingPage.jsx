import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stats, setStats] = useState({ totalJobs: 0, topCategory: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email) {
      alert('Please enter both name and email');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/register`, { name, email });
      
      if (response.data.success) {
        // Store user data in session storage
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/search');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="hero-section">
          <h1 className="title">Jobs4All</h1>
          <p className="subtitle">Your Gateway to Employment in Bengaluru</p>
          
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-number">{stats.totalJobs}</div>
              <div className="stat-label">Jobs Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-category">{stats.topCategory}</div>
              <div className="stat-label">Most Jobs Available</div>
            </div>
          </div>
        </div>

        <div className="registration-section">
          <h2>Get Started</h2>
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Start Job Search'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
