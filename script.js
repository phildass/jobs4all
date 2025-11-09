// Registration Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any previous error messages
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        // Validate inputs
        if (!name || !email) {
            showError('Please fill in all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Store user data in localStorage
        const userData = {
            name: name,
            email: email,
            registrationDate: new Date().toISOString()
        };

        localStorage.setItem('jobs4all_user', JSON.stringify(userData));

        // Redirect to search page
        window.location.href = 'search.html';
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
});
