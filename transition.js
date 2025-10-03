document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('page-header');
    const pageWrapper = document.getElementById('page-wrapper');
    const isHome = window.location.pathname === '/' || window.location.pathname.includes('index.html');
    const footer =document.querySelector('footer');
    if (isHome) {
        // Initial State: Apply home screen styles
        header.classList.add('is-home-screen');

        // pageWrapper.style.display = 'none'; // Hide the main content initially
        footer.style.display = 'none';
        // Attach click listeners to trigger the animation
        const links = header.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                // Prevent default navigation
                event.preventDefault();
                const targetUrl = this.href;

                // Start the Transition: Remove the home class, reverting to navbar CSS
                header.classList.remove('is-home-screen');
                header.classList.add('is-navbar'); // Use this if the base style is not enough

                // Fade in the main page wrapper
                // pageWrapper.style.display = 'flex';
                // pageWrapper.style.opacity = '1'; 
                // pageWrapper.style.visibility = 'visible';

                // Redirect after the transition completes (1.5 seconds)
                // setTimeout(() => {
                //     // Check if the link is navigating away from home
                //     if (targetUrl !== window.location.href) {
                //         window.location.href = targetUrl;
                //     }
                // }, 1500); 
                if (targetUrl !== window.location.href) {
                        window.location.href = targetUrl;
                }
            });
        });
        
    } else {
        // For ALL SUB-PAGES: Ensure the header is the small navbar and content is visible
        header.classList.add('is-navbar'); // Explicitly set navbar style
        // pageWrapper.style.opacity = '1';
        // pageWrapper.style.visibility = 'visible';
    }
    
    // highlightActiveLink(header); 
});