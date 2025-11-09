# Jobs4All

A job seeking application for those seeking employment in Bengaluru.

## Features

- **Landing Page**: Simple registration with name and email, displays total jobs available and top job categories
- **Job Search**: Search functionality with 31+ job categories dropdown
- **Job Results**: Browse and select up to 10 jobs to apply
- **Application Form**: Upload resume and enter qualification/experience details
- **Payment**: Rs 100 payment via Razorpay (UPI)

## Job Categories

The platform supports the following job categories:
- Finance and Accounting
- Human Resources
- Sales and Marketing
- Project Management
- Customer Service
- Operations and Logistics
- Software Development
- Computer Hardware Engineering
- IT Support and Management
- Civil, Mechanical, and Electrical Engineering
- Cybersecurity
- Data Science and Analytics
- Healthcare (Physicians, Nursing, Dental, Therapy, Pharmacy)
- Education (Teaching, Academic Advising, Administration, Counselling)
- Media (Journalism, PR, Graphic Design, Publishing, Social Media)
- Construction
- Hospitality and Food Service
- Legal Services
- Science and Research
- Skilled Trades
- Transportation and Logistics
- Others

## Technology Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- Axios
- Cheerio (for web scraping)
- Razorpay (for payments)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/phildass/jobs4all.git
cd jobs4all
```

2. Install root dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Configure environment variables:

Create `backend/.env`:
```
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

Run both frontend and backend together:
```bash
npm run dev
```

Or run them separately:

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

### Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

- `POST /api/register` - Register a new user
- `GET /api/stats` - Get job statistics (total jobs, top category)
- `POST /api/search-jobs` - Search for jobs by category
- `POST /api/apply` - Submit job application
- `POST /api/create-payment` - Create payment order
- `POST /api/verify-payment` - Verify payment completion

## Application Flow

1. **Landing Page**: User enters name and email to register
2. **Search Page**: User selects job category from dropdown
3. **Results Page**: User views jobs and selects up to 10 to apply
4. **Application Page**: User uploads resume and enters details
5. **Payment Page**: User pays Rs 100 via Razorpay
6. **Success**: Applications sent to all selected employers

## Notes

- The current implementation uses mock data for job listings
- In production, the job scraping functionality would integrate with real job boards and websites
- Razorpay integration requires valid API keys for live payments
- Maximum 10 job applications per submission

## License

ISC

