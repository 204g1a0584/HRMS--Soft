// validation.js

// Function to check if email and password fields are filled
function checkFields() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login');
    const errorMessage = document.querySelector('.error-message');

    if (emailInput.value.trim() && passwordInput.value.trim()) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

// Add event listeners for input fields
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.addEventListener('input', checkFields);
    passwordInput.addEventListener('input', checkFields);
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting for demonstration

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector('.alert-message'); // Corrected the error message element

    if (!emailInput.value || !passwordInput.value) {
        errorMessage.textContent = "Please enter both email and password.";
    } else {
        errorMessage.textContent = ""; // Clear error message
        // You can add your code to handle form submission here.
    }
});
