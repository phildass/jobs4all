import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import './Dashboard.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    experienceRequired: '',
    category: '',
    jobType: 'Full-time',
    skills: '',
  });

  const locations = [
    'Whitefield', 'Koramangala', 'HSR Layout', 'Indiranagar',
    'Electronic City', 'Marathahalli', 'JP Nagar', 'BTM Layout',
    'Jayanagar', 'MG Road', 'Hebbal', 'Yelahanka',
    'Bannerghatta Road', 'Sarjapur Road', 'Outer Ring Road', 'Other Bangalore'
  ];

  const categories = [
    'Software Development', 'Data Science', 'Product Management',
    'Design', 'Marketing', 'Sales', 'HR', 'Finance',
    'Operations', 'Customer Support', 'Other'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await jobsAPI.getMyJobs();
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Process skills
      const skillsArray = jobData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const jobPayload = {
        ...jobData,
        skills: skillsArray,
        salaryMin: parseInt(jobData.salaryMin),
        salaryMax: parseInt(jobData.salaryMax),
        experienceRequired: parseInt(jobData.experienceRequired),
      };

      await jobsAPI.createJob(jobPayload);
      
      // Reset form and refresh jobs
      setJobData({
        title: '',
        company: '',
        description: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        experienceRequired: '',
        category: '',
        jobType: 'Full-time',
        skills: '',
      });
      setShowCreateForm(false);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job. Please try again.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await jobsAPI.deleteJob(jobId);
      fetchJobs();
    } catch (err) {
      setError('Failed to delete job. Please try again.');
    }
  };

  const viewApplications = async (job) => {
    setSelectedJob(job);
    setLoadingApplications(true);
    
    try {
      const response = await applicationsAPI.getJobApplications(job._id);
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoadingApplications(false);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, status);
      // Refresh applications
      if (selectedJob) {
        viewApplications(selectedJob);
      }
    } catch (err) {
      setError('Failed to update application status.');
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
    return <div className="loading">Loading your jobs...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Jobs</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'Post New Job'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showCreateForm && (
          <div className="card create-job-form">
            <h2>Post a New Job</h2>
            <form onSubmit={handleCreateJob}>
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Senior React Developer"
                  />
                </div>

                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={jobData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Company Pvt Ltd"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Job Description *</label>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location *</label>
                  <select
                    name="location"
                    value={jobData.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={jobData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Job Type *</label>
                  <select
                    name="jobType"
                    value={jobData.jobType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Minimum Salary (₹/year) *</label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={jobData.salaryMin}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 600000"
                  />
                </div>

                <div className="form-group">
                  <label>Maximum Salary (₹/year) *</label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={jobData.salaryMax}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 1000000"
                  />
                </div>

                <div className="form-group">
                  <label>Experience Required (years) *</label>
                  <input
                    type="number"
                    name="experienceRequired"
                    value={jobData.experienceRequired}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="e.g., 3"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={jobData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </form>
          </div>
        )}

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{jobs.length}</div>
            <div className="stat-label">Total Jobs Posted</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {jobs.filter(job => job.status === 'active').length}
            </div>
            <div className="stat-label">Active Jobs</div>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No jobs posted yet</h3>
            <p>Click the button above to post your first job.</p>
          </div>
        ) : (
          <div className="jobs-list">
            {jobs.map(job => (
              <div key={job._id} className="job-card card">
                <div className="job-header-row">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <div className="job-actions">
                    <button
                      onClick={() => viewApplications(job)}
                      className="btn btn-secondary btn-sm"
                    >
                      View Applications
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="job-details-row">
                  <span>📍 {job.location}</span>
                  <span>💰 {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}</span>
                  <span>💼 {job.experienceRequired}+ years</span>
                  <span>📅 Posted {formatDate(job.postedDate)}</span>
                  <span className={`status-tag ${job.status}`}>
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedJob && (
          <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Applications for {selectedJob.title}</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>

              {loadingApplications ? (
                <div className="loading">Loading applications...</div>
              ) : applications.length === 0 ? (
                <div className="empty-state">
                  <p>No applications yet for this job.</p>
                </div>
              ) : (
                <div className="applications-list">
                  {applications.map(app => (
                    <div key={app._id} className="application-item card">
                      <div className="applicant-header">
                        <div>
                          <h4>{app.applicant.name}</h4>
                          <p>{app.applicant.email}</p>
                          {app.applicant.phone && <p>📞 {app.applicant.phone}</p>}
                        </div>
                        <div className="application-status">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>

                      <div className="applicant-details">
                        {app.applicant.experience !== undefined && (
                          <p><strong>Experience:</strong> {app.applicant.experience} years</p>
                        )}
                        {app.applicant.skills && app.applicant.skills.length > 0 && (
                          <div>
                            <strong>Skills:</strong>
                            <div className="skills-list">
                              {app.applicant.skills.map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {app.coverLetter && (
                        <div className="cover-letter">
                          <strong>Cover Letter:</strong>
                          <p>{app.coverLetter}</p>
                        </div>
                      )}

                      {app.resume && (
                        <div className="resume-link">
                          <a href={app.resume} target="_blank" rel="noopener noreferrer">
                            View Resume
                          </a>
                        </div>
                      )}

                      <div className="application-meta">
                        <small>Applied on {formatDate(app.appliedDate)}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
