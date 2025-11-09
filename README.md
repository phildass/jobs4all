# Jobs4All

A job seeking application for those seeking employment in Bengaluru.

## Features

- **Simple Registration**: Register with just your name and email address
- **Job Search**: Search for jobs across multiple categories
- **Category Filtering**: Filter jobs by specific categories
- **Keyword Search**: Search for jobs using keywords
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Job Categories

The application supports the following job categories:
- Finance and Accounting
- Human Resources
- IT Support and Management
- Civil, Mechanical, and Electrical Engineering
- Others

## How to Use

1. **Registration**: Open `index.html` in your browser and register with your name and email
2. **Search Jobs**: After registration, you'll be redirected to the search page
3. **Filter Jobs**: Use the dropdown menu to filter by category or enter keywords to search
4. **View Results**: Browse through available job listings with company and location details

## Running the Application

### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

### Option 2: Local HTTP Server
For the best experience, serve the files using a local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js (requires http-server package)
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then navigate to `http://localhost:8080/index.html` in your browser.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage for data persistence

## File Structure

```
jobs4all/
├── index.html      # Landing page with registration form
├── search.html     # Job search page
├── styles.css      # Styling for both pages
├── script.js       # Registration form logic
├── search.js       # Job search and filtering logic
└── README.md       # This file
```

## Browser Support

This application works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Open source - feel free to use and modify as needed.
