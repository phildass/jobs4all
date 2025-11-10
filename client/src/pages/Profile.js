import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import { useAuth } from '../utils/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    company: '',
    location: '',
    resume: '',
    skills: [],
    experience: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getProfile();
      const data = response.data;
      setProfileData({
        name: data.name || '',
        phone: data.phone || '',
        company: data.company || '',
        location: data.location || '',
        resume: data.resume || '',
        skills: data.skills || [],
        experience: data.experience || '',
      });
    } catch (err) {
      setError('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await usersAPI.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="card profile-card">
              <div className="profile-avatar">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <h2>{profileData.name}</h2>
              <p className="profile-email">{user?.email}</p>
              <span className="profile-role">
                {user?.role === 'employer' ? 'Employer' : 'Job Seeker'}
              </span>
            </div>
          </div>

          <div className="profile-content">
            <div className="card">
              <h2>Edit Profile</h2>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                  />
                </div>

                {user?.role === 'employer' && (
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={profileData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Pvt Ltd"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Koramangala, Bangalore"
                  />
                </div>

                {user?.role === 'job_seeker' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="experience">Years of Experience</label>
                      <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="resume">Resume Link</label>
                      <input
                        type="url"
                        id="resume"
                        name="resume"
                        value={profileData.resume}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Skills</label>
                      <div className="skills-input">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSkill();
                            }
                          }}
                          placeholder="Add a skill"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="btn btn-secondary"
                        >
                          Add
                        </button>
                      </div>
                      {profileData.skills.length > 0 && (
                        <div className="skills-list">
                          {profileData.skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag">
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="remove-skill"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
