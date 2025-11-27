// Simple animation for diagram elements
document.addEventListener('DOMContentLoaded', function () {
    const diagrams = document.querySelectorAll('.diagram');

    diagrams.forEach((diagram, index) => {
        // Add staggered animation
        diagram.style.animation = `fadeIn 0.5s ease ${index * 0.2}s both`;
    });

    // Add CSS for fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
    document.head.appendChild(style);

    // Close button functionality
    document
        .querySelector('.close-button')
        .addEventListener('click', function () {
            window.history.back();
        });
});
