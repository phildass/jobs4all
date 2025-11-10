import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import './JobList.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    search: '',
    minSalary: '',
    experienceRequired: '',
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = {
        ...filters,
        page: pagination.currentPage,
        limit: 10,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });

      const response = await jobsAPI.getJobs(params);
      setJobs(response.data.jobs);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      });
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      category: '',
      search: '',
      minSalary: '',
      experienceRequired: '',
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const formatSalary = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="job-list-page">
      <div className="container">
        <h1>Browse Jobs in Bangalore</h1>
        
        <div className="job-list-layout">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="card">
              <h3>Filters</h3>
              
              <form onSubmit={handleSearch}>
                <div className="form-group">
                  <label>Search</label>
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Job title, company..."
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Minimum Salary (LPA)</label>
                  <input
                    type="number"
                    name="minSalary"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    placeholder="e.g., 500000"
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    name="experienceRequired"
                    value={filters.experienceRequired}
                    onChange={handleFilterChange}
                    placeholder="Max years"
                  />
                </div>

                <button type="button" onClick={clearFilters} className="btn btn-secondary btn-block">
                  Clear Filters
                </button>
              </form>
            </div>
          </div>

          {/* Jobs List */}
          <div className="jobs-content">
            {loading ? (
              <div className="loading">Loading jobs...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : jobs.length === 0 ? (
              <div className="no-jobs">
                <p>No jobs found matching your criteria.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="jobs-count">
                  Showing {jobs.length} of {pagination.total} jobs
                </div>

                <div className="jobs-grid">
                  {jobs.map(job => (
                    <Link to={`/jobs/${job._id}`} key={job._id} className="job-card">
                      <div className="job-card-header">
                        <h3>{job.title}</h3>
                        <span className="job-type-badge">{job.jobType}</span>
                      </div>
                      
                      <div className="job-company">{job.company}</div>
                      
                      <div className="job-details">
                        <span className="job-detail-item">
                          📍 {job.location}
                        </span>
                        <span className="job-detail-item">
                          💰 {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)}
                        </span>
                        <span className="job-detail-item">
                          💼 {job.experienceRequired}+ years
                        </span>
                      </div>

                      <div className="job-category">{job.category}</div>
                      
                      {job.skills && job.skills.length > 0 && (
                        <div className="job-skills">
                          {job.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="skill-tag">{skill}</span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="skill-tag">+{job.skills.length - 3}</span>
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
                      disabled={pagination.currentPage === 1}
                      className="btn btn-secondary"
                    >
                      Previous
                    </button>
                    
                    <span className="pagination-info">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="btn btn-secondary"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
