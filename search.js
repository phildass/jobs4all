// Sample job data for demonstration
const sampleJobs = [
    {
        id: 1,
        title: 'Senior Accountant',
        company: 'ABC Finance Solutions',
        location: 'Koramangala, Bengaluru',
        category: 'finance'
    },
    {
        id: 2,
        title: 'Financial Analyst',
        company: 'XYZ Consulting',
        location: 'Whitefield, Bengaluru',
        category: 'finance'
    },
    {
        id: 3,
        title: 'HR Manager',
        company: 'TechCorp India',
        location: 'Electronic City, Bengaluru',
        category: 'hr'
    },
    {
        id: 4,
        title: 'Talent Acquisition Specialist',
        company: 'Global HR Solutions',
        location: 'HSR Layout, Bengaluru',
        category: 'hr'
    },
    {
        id: 5,
        title: 'IT Support Engineer',
        company: 'InfoTech Systems',
        location: 'Marathahalli, Bengaluru',
        category: 'it'
    },
    {
        id: 6,
        title: 'Systems Administrator',
        company: 'CloudNet Technologies',
        location: 'Bellandur, Bengaluru',
        category: 'it'
    },
    {
        id: 7,
        title: 'Civil Engineer',
        company: 'BuildRight Constructions',
        location: 'Yelahanka, Bengaluru',
        category: 'engineering'
    },
    {
        id: 8,
        title: 'Mechanical Engineer',
        company: 'AutoMech Industries',
        location: 'Peenya, Bengaluru',
        category: 'engineering'
    },
    {
        id: 9,
        title: 'Electrical Engineer',
        company: 'PowerGen Solutions',
        location: 'JP Nagar, Bengaluru',
        category: 'engineering'
    },
    {
        id: 10,
        title: 'Content Writer',
        company: 'Digital Media House',
        location: 'Indiranagar, Bengaluru',
        category: 'others'
    },
    {
        id: 11,
        title: 'Marketing Executive',
        company: 'Brand Makers',
        location: 'MG Road, Bengaluru',
        category: 'others'
    },
    {
        id: 12,
        title: 'Customer Service Representative',
        company: 'ServiceFirst BPO',
        location: 'Sarjapur Road, Bengaluru',
        category: 'others'
    }
];

// Category display names
const categoryNames = {
    'finance': 'Finance and Accounting',
    'hr': 'Human Resources',
    'it': 'IT Support and Management',
    'engineering': 'Civil, Mechanical, and Electrical Engineering',
    'others': 'Others'
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is registered
    const userData = localStorage.getItem('jobs4all_user');
    
    if (!userData) {
        // Redirect to registration page if not registered
        window.location.href = 'index.html';
        return;
    }

    // Display user info
    const user = JSON.parse(userData);
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.textContent = `Welcome, ${user.name}!`;

    // Display all jobs initially
    displayJobs(sampleJobs);

    // Add search functionality
    const searchBtn = document.getElementById('searchBtn');
    const categorySelect = document.getElementById('category');
    const keywordInput = document.getElementById('keyword');

    searchBtn.addEventListener('click', performSearch);
    
    // Also search on Enter key
    keywordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Search on category change
    categorySelect.addEventListener('change', performSearch);
});

function performSearch() {
    const category = document.getElementById('category').value;
    const keyword = document.getElementById('keyword').value.trim().toLowerCase();

    let filteredJobs = sampleJobs;

    // Filter by category
    if (category) {
        filteredJobs = filteredJobs.filter(job => job.category === category);
    }

    // Filter by keyword
    if (keyword) {
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.location.toLowerCase().includes(keyword)
        );
    }

    displayJobs(filteredJobs);
}

function displayJobs(jobs) {
    const resultsDiv = document.getElementById('jobResults');
    const resultsTitle = document.getElementById('resultsTitle');

    if (jobs.length === 0) {
        resultsTitle.textContent = 'No Jobs Found';
        resultsDiv.innerHTML = '<div class="no-results">No jobs match your search criteria. Try adjusting your filters.</div>';
        return;
    }

    resultsTitle.textContent = `${jobs.length} Job${jobs.length > 1 ? 's' : ''} Found`;
    
    resultsDiv.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h4>${job.title}</h4>
            <span class="job-category">${categoryNames[job.category]}</span>
            <p class="job-company"><strong>Company:</strong> ${job.company}</p>
            <p class="job-location"><strong>Location:</strong> ${job.location}</p>
        </div>
    `).join('');
}
