import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultsPage.css';

function ResultsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = sessionStorage.getItem('searchResults');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      navigate('/search');
    }
  }, [navigate]);

  const toggleJobSelection = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      if (selectedJobs.length >= 10) {
        alert('You can select a maximum of 10 jobs');
        return;
      }
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleApply = () => {
    if (selectedJobs.length === 0) {
      alert('Please select at least one job to apply');
      return;
    }

    sessionStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
    navigate('/apply');
  };

  const handleBackToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <h1>Available Jobs</h1>
          <p>Found {jobs.length} jobs matching your search</p>
          <p className="selection-info">
            Selected: {selectedJobs.length}/10 jobs
          </p>
        </div>

        <div className="jobs-list">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className={`job-card ${selectedJobs.includes(job.id) ? 'selected' : ''}`}
            >
              <div className="job-header">
                <h3>{job.title}</h3>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => toggleJobSelection(job.id)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              
              <div className="job-company">{job.company}</div>
              
              <div className="job-details">
                <span className="job-location">📍 {job.location}</span>
                <span className="job-salary">💰 {job.salary}</span>
              </div>
              
              <p className="job-description">{job.description}</p>
              
              <div className="job-footer">
                <span className="job-category">🏷️ {job.category}</span>
                <span className="job-posted">🕒 {job.posted}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="actions-bar">
          <button onClick={handleBackToSearch} className="back-btn">
            ← Back to Search
          </button>
          <button 
            onClick={handleApply} 
            className="apply-btn"
            disabled={selectedJobs.length === 0}
          >
            Apply to Selected Jobs ({selectedJobs.length})
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
