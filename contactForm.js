document
    .getElementById('contact-form')
    .addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get Elements
        const form = this;
        const submitButton = document.getElementById('submit-form-button');
        const successMessage = document.getElementById('form-success');
        const endpoint = form.action;

        // Clear previous messages
        successMessage.classList.remove('show');
        clearErrors(form);

        // Perform Validation
        if (!validateForm(form)) {
            return;
        }

        submitButton.disabled = true;

        // Build form data for submission
        const formData = new FormData(form);

        try {
            const response = await fetch(endpoint, {
                method: form.method, // Uses the method defined in HTML (POST)
                body: formData,
                // Formspree requires an Accept header for AJAX submissions
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                // Success
                successMessage.textContent =
                    'Message sent successfully! Thank you.';
                successMessage.classList.add('show');
                form.reset();
            } else {
                // Handle non-OK status codes (e.g., 400, 500)
                const data = await response.json();
                console.error('Submission Failed:', data);

                // You can add a specific error message element here
                alert(
                    'Oops! There was an issue submitting the form. Please check your inputs.'
                );
            }
        } catch (error) {
            // Handle network errors (e.g., no internet)
            console.error('Network Error:', error);
            alert('A network error occurred. Please try again later.');
        } finally {
            // 7. Reset UI state regardless of success/failure
            submitButton.disabled = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    });

/**
 * Checks all required inputs in the form for validity.
 * @param {HTMLFormElement} form The form element to validate.
 * @returns {boolean} True if the form is valid, false otherwise.
 */
function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');
    const emailInput = form.querySelector('[name="email"]');

    // Basic required field check
    requiredInputs.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required.');
            isValid = false;
        }
    });

    // Email format check
    if (
        emailInput &&
        emailInput.value.trim() !== '' &&
        !isValidEmail(emailInput.value)
    ) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    return isValid;
}

/**
 * Helper function to validate email format using a simple regex.
 * @param {string} email The email string to check.
 * @returns {boolean}
 */
function isValidEmail(email) {
    // Basic regex: checks for something@something.something
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Displays an error message below the specified input element.
 * Assumes the input is wrapped in a container where an error element can be placed.
 * @param {HTMLElement} input The input element where the error occurred.
 * @param {string} message The error message text.
 */
function showError(input, message) {
    // Look for a parent container that holds both the input and the error message
    const formGroup = input.closest('.form-group') || input.parentNode;

    // Find or create the error element
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }

    // Add a visual error state to the input
    input.classList.add('input-error');
    errorElement.textContent = message;
}

/**
 * Clears all error messages and visual error states in the form.
 * @param {HTMLFormElement} form The form element.
 */
function clearErrors(form) {
    form.querySelectorAll('.error-message').forEach((el) => el.remove());
    form.querySelectorAll('.input-error').forEach((el) =>
        el.classList.remove('input-error')
    );
}

function clearErrorsForInput(input) {
    // 1. Find the parent container (using the class '.form-group' from earlier)
    const formGroup = input.closest('.form-group') || input.parentNode;

    // 2. Find and remove the error message element
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }

    // 3. Remove the visual error class from the input
    input.classList.remove('input-error');
}

function setupRealTimeValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            clearErrorsForInput(input);
        });
    });
}
setupRealTimeValidation();
