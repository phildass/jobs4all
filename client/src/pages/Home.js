import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated, isEmployer, isJobSeeker } = useAuth();

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Find Your Dream Job in Bangalore</h1>
          <p className="hero-subtitle">
            Connecting talented professionals with top companies across Bangalore
          </p>
          
          <div className="hero-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/jobs" className="btn btn-secondary btn-large">
                  Browse Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs" className="btn btn-primary btn-large">
                  Browse Jobs
                </Link>
                {isJobSeeker && (
                  <Link to="/dashboard/job-seeker" className="btn btn-secondary btn-large">
                    My Applications
                  </Link>
                )}
                {isEmployer && (
                  <Link to="/dashboard/employer" className="btn btn-secondary btn-large">
                    Post a Job
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>Why Choose Jobs4All?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Bangalore Focused</h3>
              <p>Jobs specifically in Bangalore's top tech hubs and business districts</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Quality Opportunities</h3>
              <p>Curated job listings from verified employers and top companies</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Simple and fast application process with instant confirmation</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>Monitor your job applications and get real-time status updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="locations">
        <div className="container">
          <h2>Popular Locations in Bangalore</h2>
          <div className="locations-grid">
            <div className="location-tag">Whitefield</div>
            <div className="location-tag">Koramangala</div>
            <div className="location-tag">HSR Layout</div>
            <div className="location-tag">Indiranagar</div>
            <div className="location-tag">Electronic City</div>
            <div className="location-tag">Marathahalli</div>
            <div className="location-tag">JP Nagar</div>
            <div className="location-tag">MG Road</div>
          </div>
        </div>
      </div>

      <div className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of professionals finding their perfect job match</p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
