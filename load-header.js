// load-header.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and inject the header
    fetch('header.html')
      .then(response => response.text())
      .then(html => {
        // Inject at the top of <body>
        document.body.insertAdjacentHTML('afterbegin', html);
      })
      .catch(error => console.error('Error loading header:', error));
  });