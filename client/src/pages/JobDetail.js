import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../utils/AuthContext';
import './JobDetail.css';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isJobSeeker } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: '',
  });
  const [applying, setApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await jobsAPI.getJob(id);
      setJob(response.data);
    } catch (err) {
      setError('Failed to fetch job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!isJobSeeker) {
      alert('Only job seekers can apply for jobs');
      return;
    }
    
    setShowApplyForm(true);
  };

  const handleApplicationChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setApplying(true);
    setError('');

    try {
      await applicationsAPI.apply({
        jobId: id,
        ...applicationData,
      });
      
      setApplicationSuccess(true);
      setShowApplyForm(false);
      setTimeout(() => {
        navigate('/dashboard/job-seeker');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error && !job) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container">
        <div className="error-message">Job not found</div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        {applicationSuccess && (
          <div className="success-message">
            Application submitted successfully! Redirecting to your dashboard...
          </div>
        )}

        <div className="job-detail-layout">
          <div className="job-detail-main">
            <div className="card job-header">
              <div className="job-header-top">
                <div>
                  <h1>{job.title}</h1>
                  <h2 className="job-company">{job.company}</h2>
                </div>
                <span className="job-type-badge">{job.jobType}</span>
              </div>

              <div className="job-meta">
                <div className="meta-item">
                  <span className="meta-label">Location:</span>
                  <span className="meta-value">📍 {job.location}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Salary:</span>
                  <span className="meta-value">
                    💰 {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} per annum
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Experience:</span>
                  <span className="meta-value">💼 {job.experienceRequired}+ years</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{job.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Posted:</span>
                  <span className="meta-value">📅 {formatDate(job.postedDate)}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Job Description</h3>
              <div className="job-description">
                {job.description}
              </div>
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="card">
                <h3>Required Skills</h3>
                <div className="skills-list">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {job.employer && (
              <div className="card">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <p><strong>Contact Person:</strong> {job.employer.name}</p>
                  <p><strong>Email:</strong> {job.employer.email}</p>
                  {job.employer.phone && (
                    <p><strong>Phone:</strong> {job.employer.phone}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="job-detail-sidebar">
            <div className="card apply-card">
              {!showApplyForm ? (
                <>
                  <h3>Apply for this position</h3>
                  <p>Submit your application and our team will review it shortly.</p>
                  <button
                    onClick={handleApplyClick}
                    className="btn btn-primary btn-block"
                    disabled={job.status !== 'active'}
                  >
                    {job.status === 'active' ? 'Apply Now' : 'Job Closed'}
                  </button>
                </>
              ) : (
                <div className="apply-form">
                  <h3>Submit Application</h3>
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <form onSubmit={handleSubmitApplication}>
                    <div className="form-group">
                      <label htmlFor="coverLetter">Cover Letter</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={handleApplicationChange}
                        placeholder="Tell us why you're a great fit for this role..."
                        rows="6"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="resume">Resume Link (Optional)</label>
                      <input
                        type="url"
                        id="resume"
                        name="resume"
                        value={applicationData.resume}
                        onChange={handleApplicationChange}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>

                    <div className="apply-actions">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={applying}
                      >
                        {applying ? 'Submitting...' : 'Submit Application'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="btn btn-secondary"
                        disabled={applying}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="card job-tips">
              <h4>Application Tips</h4>
              <ul>
                <li>Tailor your cover letter to the specific role</li>
                <li>Highlight relevant experience and skills</li>
                <li>Keep your resume updated and professional</li>
                <li>Double-check for typos and errors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
