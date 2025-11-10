import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout, isEmployer, isJobSeeker } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Jobs4All Bangalore
        </Link>
        
        <div className="navbar-menu">
          <Link to="/jobs" className="nav-link">
            Browse Jobs
          </Link>
          
          {isAuthenticated ? (
            <>
              {isJobSeeker && (
                <Link to="/dashboard/job-seeker" className="nav-link">
                  My Applications
                </Link>
              )}
              
              {isEmployer && (
                <Link to="/dashboard/employer" className="nav-link">
                  My Jobs
                </Link>
              )}
              
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              
              <span className="nav-user">
                {user?.name}
              </span>
              
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-success">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
