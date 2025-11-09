import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const JOB_CATEGORIES = [
  'Finance and Accounting',
  'Human Resources',
  'Sales and Marketing',
  'Project Management',
  'Customer Service',
  'Operations and Logistics',
  'Software Development',
  'Computer Hardware Engineering',
  'IT Support and Management',
  'Civil, Mechanical, and Electrical Engineering',
  'Cybersecurity',
  'Data Science and Analytics',
  'Physicians and Surgeons',
  'Nursing',
  'Dental Services',
  'Therapy (Physical, Occupational)',
  'Pharmacy',
  'Medical and Health Services Management',
  'Teaching (K-12, higher education)',
  'Academic Advising',
  'Educational Administration',
  'Guidance Counselling',
  'Journalism and Writing',
  'Public Relations and Advertising',
  'Graphic Design',
  'Publishing',
  'Social Media Management',
  'Construction',
  'Hospitality and Food Service',
  'Legal Services',
  'Science and Research',
  'Skilled Trades (installation, repair, maintenance)',
  'Transportation and Logistics',
  'Others'
];

function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      alert('Please select a job category');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/search-jobs`, {
        category: selectedCategory,
        keywords
      });
      
      // Store search results in session storage
      sessionStorage.setItem('searchResults', JSON.stringify(response.data.jobs));
      sessionStorage.setItem('selectedCategory', selectedCategory);
      navigate('/results');
    } catch (error) {
      console.error('Error searching jobs:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <h1>Find Your Dream Job</h1>
          <p>Search through thousands of opportunities in Bengaluru</p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label htmlFor="category">Job Category *</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a category...</option>
              {JOB_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="keywords">Keywords (Optional)</label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., senior, remote, full-time"
            />
          </div>

          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Jobs'}
          </button>
        </form>

        <div className="info-box">
          <p>🔍 We search through job boards, company websites, and local advertisements</p>
          <p>📍 All jobs are in Bengaluru region</p>
          <p>💼 New opportunities added daily</p>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
