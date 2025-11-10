# Jobs4All - Bangalore Job Seeking Platform

A full-stack job seeking web application specifically designed for the Bangalore job market. Built with React, Node.js, Express, and MongoDB.

## Features

### For Job Seekers
- 🔍 **Search and Filter Jobs** - Browse jobs with advanced filters (location, category, salary, experience)
- 📍 **Bangalore-Specific Locations** - Jobs in Whitefield, Koramangala, HSR Layout, Indiranagar, and more
- 📝 **Easy Application** - Quick application process with cover letter and resume upload
- 📊 **Application Tracking** - Track all your applications and their status in one dashboard
- 👤 **Profile Management** - Manage your profile, skills, and experience

### For Employers
- ✍️ **Post Jobs** - Create detailed job listings with all necessary information
- 📋 **Manage Listings** - View and manage all your job postings
- 👥 **Review Applications** - See all applications and manage candidate status
- 🔐 **Secure Authentication** - JWT-based authentication for secure access

## Tech Stack

### Frontend
- **React 18** - Modern UI with hooks
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Responsive design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
jobs4all/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components (Navbar, etc.)
│   │   ├── pages/       # Page components (Home, Login, JobList, etc.)
│   │   ├── services/    # API service layer
│   │   ├── utils/       # Utilities (AuthContext)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/              # Node.js backend
│   ├── config/          # DB connection, seed data
│   ├── models/          # Mongoose schemas (User, Job, Application)
│   ├── routes/          # Express routes
│   ├── middleware/      # Auth middleware
│   ├── server.js
│   └── package.json
├── .env.example         # Environment variables template
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/phildass/jobs4all.git
cd jobs4all
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/jobs4all
JWT_SECRET=your_strong_secret_key_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 5. Seed the Database (Optional)
Populate the database with sample Bangalore jobs and test users:
```bash
cd ../server
npm run seed
```

This will create:
- 3 employer accounts
- 2 job seeker accounts
- 12 sample jobs across Bangalore locations

**Sample Login Credentials:**
- Job Seeker: `rajesh@example.com` / `password123`
- Employer: `employer1@techsolutions.com` / `password123`

## Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
# React app runs on http://localhost:3000
```

### Production Mode

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd server
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (employers only)
- `PUT /api/jobs/:id` - Update job (employers only)
- `DELETE /api/jobs/:id` - Delete job (employers only)
- `GET /api/jobs/employer/my-jobs` - Get employer's jobs

### Applications
- `POST /api/applications` - Apply for job (job seekers only)
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job/:jobId` - Get job applications (employers only)
- `PUT /api/applications/:id/status` - Update application status (employers only)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password

## Database Models

### User
- name, email, password (hashed)
- role (job_seeker/employer)
- phone, company, location
- skills, experience, resume

### Job
- title, company, description
- location (Bangalore areas)
- salaryMin, salaryMax
- experienceRequired, category
- jobType, skills
- employer (reference to User)
- status (active/closed)

### Application
- job (reference to Job)
- applicant (reference to User)
- status (pending/reviewed/accepted/rejected)
- coverLetter, resume
- appliedDate, updatedDate

## Bangalore Locations Supported
- Whitefield
- Koramangala
- HSR Layout
- Indiranagar
- Electronic City
- Marathahalli
- JP Nagar
- BTM Layout
- Jayanagar
- MG Road
- Hebbal
- Yelahanka
- Bannerghatta Road
- Sarjapur Road
- Outer Ring Road
- Other Bangalore

## Job Categories
- Software Development
- Data Science
- Product Management
- Design
- Marketing
- Sales
- HR
- Finance
- Operations
- Customer Support
- Other

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security Notes

### CodeQL Analysis
The application has been scanned with CodeQL. Key findings:

- **Rate Limiting**: Currently not implemented. For production use, consider adding rate limiting middleware like `express-rate-limit` to prevent abuse.
- **MongoDB Injection**: The application uses Mongoose ODM which provides built-in protection against NoSQL injection through parameterized queries.
- **Email Validation**: Uses a simplified but secure regex pattern that prevents ReDoS attacks.

### Production Recommendations
For production deployment, consider:
1. Add rate limiting middleware (e.g., `express-rate-limit`)
2. Implement request logging and monitoring
3. Use environment-specific secrets and keys
4. Enable HTTPS/TLS
5. Implement CSRF protection for state-changing operations
6. Add input sanitization middleware

## License
MIT License

## Support
For issues or questions, please open an issue on GitHub.

## Copilot Coding Agent Onboarding

This repository includes a comprehensive onboarding guide for automated coding agents: `.github/COPILOT-CODING-AGENT.md`

Automated agents should review that file for language detection, build/test commands, and safety guidelines.
