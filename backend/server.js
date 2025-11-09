const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (for demo purposes)
let users = [];
let jobStats = {
  totalJobs: 1523,
  topCategory: 'Software Development',
  categoryCounts: {
    'Finance and Accounting': 87,
    'Human Resources': 45,
    'Sales and Marketing': 123,
    'Project Management': 67,
    'Customer Service': 92,
    'Operations and Logistics': 78,
    'Software Development': 245,
    'Computer Hardware Engineering': 54,
    'IT Support and Management': 89,
    'Civil, Mechanical, and Electrical Engineering': 112,
    'Cybersecurity': 67,
    'Data Science and Analytics': 134,
    'Physicians and Surgeons': 43,
    'Nursing': 56,
    'Dental Services': 23,
    'Therapy (Physical, Occupational)': 34,
    'Pharmacy': 28,
    'Medical and Health Services Management': 38,
    'Teaching (K-12, higher education)': 98,
    'Academic Advising': 21,
    'Educational Administration': 19,
    'Guidance Counselling': 17,
    'Journalism and Writing': 31,
    'Public Relations and Advertising': 42,
    'Graphic Design': 58,
    'Publishing': 15,
    'Social Media Management': 48,
    'Construction': 67,
    'Hospitality and Food Service': 89,
    'Legal Services': 52,
    'Science and Research': 45,
    'Skilled Trades (installation, repair, maintenance)': 73,
    'Transportation and Logistics': 61,
    'Others': 142
  }
};

// Update total jobs count
const updateTotalJobs = () => {
  jobStats.totalJobs = Object.values(jobStats.categoryCounts).reduce((a, b) => a + b, 0);
  const maxCategory = Object.entries(jobStats.categoryCounts).reduce((a, b) => 
    b[1] > a[1] ? b : a
  );
  jobStats.topCategory = maxCategory[0];
};

updateTotalJobs();

// Routes
app.post('/api/register', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const user = { id: users.length + 1, name, email, createdAt: new Date() };
  users.push(user);
  
  res.json({ success: true, user });
});

app.get('/api/stats', (req, res) => {
  res.json(jobStats);
});

app.post('/api/search-jobs', async (req, res) => {
  const { category, keywords } = req.body;
  
  // Simulated job search results (in real implementation, this would scrape actual sources)
  const mockJobs = [
    {
      id: 1,
      title: `Senior ${category} Professional`,
      company: 'Tech Solutions Pvt Ltd',
      location: 'Bengaluru, Karnataka',
      salary: '₹8-12 LPA',
      description: `Seeking experienced professional for ${category} role in Bengaluru.`,
      posted: '2 days ago',
      category: category
    },
    {
      id: 2,
      title: `${category} Specialist`,
      company: 'Innovation Hub',
      location: 'Whitefield, Bengaluru',
      salary: '₹6-10 LPA',
      description: `Join our growing team in ${category} department.`,
      posted: '1 week ago',
      category: category
    },
    {
      id: 3,
      title: `Junior ${category} Associate`,
      company: 'StartUp Ventures',
      location: 'Koramangala, Bengaluru',
      salary: '₹4-7 LPA',
      description: `Great opportunity for freshers and experienced professionals in ${category}.`,
      posted: '3 days ago',
      category: category
    },
    {
      id: 4,
      title: `Lead ${category} Manager`,
      company: 'Global Corp India',
      location: 'Electronic City, Bengaluru',
      salary: '₹15-20 LPA',
      description: `Leadership role in ${category} for our Bengaluru office.`,
      posted: '5 days ago',
      category: category
    },
    {
      id: 5,
      title: `${category} Consultant`,
      company: 'Consulting Partners',
      location: 'MG Road, Bengaluru',
      salary: '₹10-15 LPA',
      description: `Consulting opportunity in ${category} with leading firm.`,
      posted: '1 day ago',
      category: category
    }
  ];
  
  res.json({ jobs: mockJobs, count: mockJobs.length });
});

app.post('/api/apply', (req, res) => {
  const { jobIds, userDetails } = req.body;
  
  if (!jobIds || !jobIds.length || jobIds.length > 10) {
    return res.status(400).json({ error: 'Please select 1-10 jobs to apply' });
  }
  
  if (!userDetails || !userDetails.name || !userDetails.email) {
    return res.status(400).json({ error: 'User details are required' });
  }
  
  res.json({ 
    success: true, 
    applicationId: `APP${Date.now()}`,
    jobCount: jobIds.length
  });
});

app.post('/api/create-payment', (req, res) => {
  const { amount, applicationId } = req.body;
  
  // In production, this would use actual Razorpay integration
  // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET });
  
  // Mock payment order
  const order = {
    id: `order_${Date.now()}`,
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    applicationId: applicationId
  };
  
  res.json(order);
});

app.post('/api/verify-payment', (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  
  // In production, verify the payment signature with Razorpay
  // For demo purposes, we'll assume payment is successful
  
  res.json({ 
    success: true, 
    message: 'Payment verified successfully',
    orderId,
    paymentId
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
