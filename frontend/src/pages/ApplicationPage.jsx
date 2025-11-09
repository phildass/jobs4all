import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApplicationPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ApplicationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    skills: '',
    resume: null
  });
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedSelectedJobs = sessionStorage.getItem('selectedJobs');

    if (!storedSelectedJobs) {
      navigate('/search');
      return;
    }

    setSelectedJobs(JSON.parse(storedSelectedJobs));

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert('Please upload your resume');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/apply`, {
        jobIds: selectedJobs,
        userDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          qualification: formData.qualification,
          experience: formData.experience,
          skills: formData.skills,
          resumeName: formData.resume.name
        }
      });

      if (response.data.success) {
        sessionStorage.setItem('applicationId', response.data.applicationId);
        sessionStorage.setItem('jobCount', response.data.jobCount.toString());
        navigate('/payment');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Application submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-page">
      <div className="application-container">
        <div className="application-header">
          <h1>Application Details</h1>
          <p>Applying to {selectedJobs.length} job(s)</p>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Qualifications & Experience</h2>
            
            <div className="form-group">
              <label htmlFor="qualification">Highest Qualification *</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech, MBA, M.Sc"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">Years of Experience *</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 5 years"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Key Skills *</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="List your key skills separated by commas"
                rows="4"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Resume Upload</h2>
            
            <div className="form-group">
              <label htmlFor="resume">Upload Resume (PDF, DOC, DOCX - Max 5MB) *</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
              {formData.resume && (
                <div className="file-info">
                  Selected: {formData.resume.name}
                </div>
              )}
            </div>
          </div>

          <div className="info-notice">
            <p>💡 By submitting this application, you agree to apply for all {selectedJobs.length} selected job(s).</p>
            <p>💳 An application fee of ₹100 will be charged to process your applications.</p>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationPage;
