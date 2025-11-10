import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationsAPI } from '../services/api';
import './Dashboard.css';

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'reviewed':
        return '#17a2b8';
      case 'accepted':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  if (loading) {
    return <div className="loading">Loading your applications...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Applications</h1>
          <Link to="/jobs" className="btn btn-primary">
            Browse More Jobs
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{applications.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {applications.filter(app => app.status === 'pending').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {applications.filter(app => app.status === 'reviewed').length}
            </div>
            <div className="stat-label">Reviewed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
            <div className="stat-label">Accepted</div>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>Start applying for jobs to see your applications here.</p>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map(application => (
              <div key={application._id} className="application-card card">
                <div className="application-header">
                  <div>
                    <h3>
                      <Link to={`/jobs/${application.job._id}`}>
                        {application.job.title}
                      </Link>
                    </h3>
                    <p className="application-company">{application.job.company}</p>
                  </div>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(application.status) }}
                  >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </span>
                </div>

                <div className="application-details">
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span>{application.job.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Salary:</span>
                    <span>
                      {formatSalary(application.job.salaryMin)} - {formatSalary(application.job.salaryMax)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Applied on:</span>
                    <span>{formatDate(application.appliedDate)}</span>
                  </div>
                  {application.updatedDate !== application.appliedDate && (
                    <div className="detail-item">
                      <span className="detail-label">Last updated:</span>
                      <span>{formatDate(application.updatedDate)}</span>
                    </div>
                  )}
                </div>

                {application.coverLetter && (
                  <div className="cover-letter-preview">
                    <strong>Cover Letter:</strong>
                    <p>{application.coverLetter.substring(0, 200)}...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
