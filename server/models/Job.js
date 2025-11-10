const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    enum: [
      'Whitefield',
      'Koramangala',
      'HSR Layout',
      'Indiranagar',
      'Electronic City',
      'Marathahalli',
      'JP Nagar',
      'BTM Layout',
      'Jayanagar',
      'MG Road',
      'Hebbal',
      'Yelahanka',
      'Bannerghatta Road',
      'Sarjapur Road',
      'Outer Ring Road',
      'Other Bangalore'
    ]
  },
  salaryMin: {
    type: Number,
    required: [true, 'Please provide minimum salary']
  },
  salaryMax: {
    type: Number,
    required: [true, 'Please provide maximum salary']
  },
  experienceRequired: {
    type: Number,
    required: [true, 'Please provide required experience in years'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a job category'],
    enum: [
      'Software Development',
      'Data Science',
      'Product Management',
      'Design',
      'Marketing',
      'Sales',
      'HR',
      'Finance',
      'Operations',
      'Customer Support',
      'Other'
    ]
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  skills: [{
    type: String
  }],
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ location: 1, category: 1, status: 1 });

module.exports = mongoose.model('Job', jobSchema);
