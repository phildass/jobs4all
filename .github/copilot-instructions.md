# GitHub Copilot Instructions for Jobs4All

## Project Overview

Jobs4All is a full-stack job seeking web application specifically designed for the Bangalore job market. The application enables job seekers to search and apply for jobs, while employers can post job listings and manage applications.

**Tech Stack:**
- **Frontend:** React 18 with React Router 6, Axios for API calls
- **Backend:** Node.js with Express framework
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT-based authentication with bcryptjs for password hashing

## Project Structure

```
jobs4all/
├── .github/               # GitHub configuration and workflows
├── client/                # React frontend application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable React components (Navbar, etc.)
│   │   ├── pages/        # Page components (Home, Login, JobList, etc.)
│   │   ├── services/     # API service layer
│   │   ├── utils/        # Utilities (AuthContext)
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   └── package.json      # Frontend dependencies
├── server/                # Node.js/Express backend
│   ├── config/           # Database connection and seed data
│   ├── models/           # Mongoose schemas (User, Job, Application)
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Authentication middleware
│   ├── server.js         # Server entry point
│   └── package.json      # Backend dependencies
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

## Build & Test Commands

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm

### Installation

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env` in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Strong secret key for JWT tokens
   - `PORT`: Backend server port (default: 5000)
   - `CLIENT_URL`: Frontend URL for CORS (default: http://localhost:3000)

### Running the Application

**Backend Server:**
```bash
cd server
npm run dev  # Development mode with nodemon
# OR
npm start    # Production mode
```
Server runs on `http://localhost:5000`

**Frontend:**
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

### Database Seeding

To populate the database with sample Bangalore jobs and test users:
```bash
cd server
npm run seed
```

This creates:
- 3 employer accounts
- 2 job seeker accounts
- 12 sample jobs across Bangalore locations

Sample credentials:
- Job Seeker: `rajesh@example.com` / `password123`
- Employer: `employer1@techsolutions.com` / `password123`

### Testing

**Frontend:**
```bash
cd client
npm test
```

**Backend:**
Currently no automated tests are configured. Manual testing via API endpoints at `http://localhost:5000/api/*`

### Build Commands

**Frontend Production Build:**
```bash
cd client
npm run build
```

## Technical Conventions

### Code Style
- Follow existing code formatting in the repository
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility

### Security Requirements
- **Never commit secrets or credentials** to the repository
- Use environment variables for sensitive configuration
- Always hash passwords before storing (using bcryptjs)
- Validate and sanitize all user inputs
- Use Mongoose ODM to prevent NoSQL injection attacks

### API Conventions
- RESTful API design patterns
- JWT tokens for authentication (sent in Authorization header)
- Consistent error response format
- Express-validator for input validation

### Database Guidelines
- Use Mongoose schemas with proper validation
- Define indexes for frequently queried fields
- Use proper relationships (references) between models

## Contribution Workflow

1. **Before making changes:**
   - Ensure MongoDB is running
   - Set up environment variables in `.env`
   - Install dependencies for both client and server
   - Run the application to verify it works

2. **Making changes:**
   - Keep changes small and focused on a single issue
   - Test changes locally before committing
   - Follow existing code patterns and structure
   - Update documentation if changing functionality

3. **Before committing:**
   - Test both frontend and backend if changes affect both
   - Verify API endpoints work correctly
   - Check for console errors in browser and server
   - Ensure no secrets are committed

4. **Pull Request Requirements:**
   - Descriptive title and description
   - List of changes made
   - Testing steps performed
   - Screenshots for UI changes

## Important Files & Locations

### Configuration Files
- `.env`: Environment variables (DO NOT COMMIT - use `.env.example` as template)
- `client/package.json`: Frontend dependencies and scripts
- `server/package.json`: Backend dependencies and scripts

### Key Backend Files
- `server/server.js`: Main server configuration
- `server/config/db.js`: Database connection
- `server/models/`: Data models (User, Job, Application)
- `server/routes/`: API route definitions
- `server/middleware/auth.js`: Authentication middleware

### Key Frontend Files
- `client/src/App.js`: Main React component with routing
- `client/src/utils/AuthContext.js`: Authentication state management
- `client/src/services/api.js`: API client configuration
- `client/src/pages/`: All page components

## Prohibited Actions

- **Do NOT** commit `.env` files or any files containing secrets
- **Do NOT** modify database schemas without understanding impact on existing data
- **Do NOT** remove or disable authentication middleware
- **Do NOT** add dependencies without justification
- **Do NOT** expose sensitive user data in API responses
- **Do NOT** make breaking changes to API endpoints without versioning

## Safe Automation Guidelines

- Always test changes locally before creating a PR
- Keep automated changes minimal and focused
- Add proper error handling for new code
- Validate inputs and handle edge cases
- Maintain backward compatibility when possible
- Document any new environment variables in `.env.example`

## Bangalore-Specific Features

The application supports these Bangalore locations:
- Whitefield, Koramangala, HSR Layout, Indiranagar
- Electronic City, Marathahalli, JP Nagar, BTM Layout
- Jayanagar, MG Road, Hebbal, Yelahanka
- Bannerghatta Road, Sarjapur Road, Outer Ring Road

Job categories include:
- Software Development, Data Science, Product Management
- Design, Marketing, Sales, HR, Finance
- Operations, Customer Support

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Jobs
- `GET /api/jobs` - Get all jobs (with optional filters)
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

## Security Notes

### Known Considerations
- **Rate Limiting:** Not currently implemented. For production, add `express-rate-limit` middleware
- **MongoDB Injection:** Protected via Mongoose ODM parameterized queries
- **Email Validation:** Uses secure regex pattern to prevent ReDoS attacks

### Production Recommendations
1. Add rate limiting middleware
2. Implement request logging and monitoring
3. Enable HTTPS/TLS
4. Add CSRF protection for state-changing operations
5. Implement input sanitization middleware
6. Use strong, unique JWT secrets
7. Set appropriate CORS policies

## Questions or Issues?

For questions or issues:
1. Check existing documentation in README.md
2. Review code comments in relevant files
3. Open a GitHub issue with detailed description
4. Tag appropriate maintainers if needed
