/**
 * validation.js
 * 
 * This file contains input validation logic for the property investment calculator form.
 * It ensures that users enter valid data before submission.
 * All input fields are validated to accept only numeric values where applicable.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select all inputs that should be numeric (including floats)
    const numericInputs = document.querySelectorAll('.strict-numeric');

    numericInputs.forEach(input => {
        // 1. Keyboard Level: Allow digits, backspace, and ONE decimal point
        input.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
            const invalidChars = ['e', 'E', '+', '-'];

            // Block explicit invalid scientific notation chars
            if (invalidChars.includes(e.key)) {
                e.preventDefault();
                return;
            }

            // If user types a dot, check if one already exists
            if (e.key === '.') {
                if (input.value.includes('.')) {
                    e.preventDefault();
                }
                return;
            }

            // Allow functional keys and numbers (0-9)
            if (allowedKeys.includes(e.key) || (e.key >= '0' && e.key <= '9')) {
                return;
            } else {
                e.preventDefault();
            }
        });

        // 2. Input Level: Scrub any non-numeric/non-float characters (for paste/mobile)
        input.addEventListener('input', function() {
            // This regex allows digits and a single dot
            // It removes anything that isn't a digit or a dot
            let val = this.value.replace(/[^0-9.]/g, '');
            
            // Ensure only one dot exists in the string
            const parts = val.split('.');
            if (parts.length > 2) {
                val = parts[0] + '.' + parts.slice(1).join('');
            }
            
            this.value = val;
        });
    });
});