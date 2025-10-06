document.addEventListener('DOMContentLoaded', () => {
    const colorBoxes = document.querySelectorAll('.project-color-box');
    const cycleImages = document.querySelectorAll('.preview-cycle-image');
    
    const previewImage = document.getElementById('preview-image');
    const projectDetails = document.getElementById('project-details');
    const detailTitle = document.getElementById('detail-title');
    const detailLocation = document.getElementById('detail-location');
    const detailType = document.getElementById('detail-type');

    let cycleIndex = 0;
    let cycleInterval;
    const cycleDuration = 5000; 
    const transitionDuration = 500; // Match CSS transition duration for images/opacity

    // --- Screen Saver Logic ---
    function startCycle() {
        clearInterval(cycleInterval); // Clear any running interval
        cycleIndex = 0; // Reset index

        if (cycleImages.length > 0) {
            cycleImages.forEach(img => {
                img.style.opacity = '0'; // Ensure all are explicitly faded out first
                img.classList.remove('active'); // Remove active class as it might interfere
            });
            
            // Introduce a slight delay for the transition to work when reappearing
            // This allows the browser to register opacity: 0 before opacity: 1
            requestAnimationFrame(() => {
                cycleImages[cycleIndex].classList.add('active'); // Make first image active
                cycleImages[cycleIndex].style.opacity = '1'; // Explicitly set opacity to 1
            });
        }
        
        cycleInterval = setInterval(() => {
            cycleImages[cycleIndex].classList.remove('active');
            cycleImages[cycleIndex].style.opacity = '0'; // Fade out current

            cycleIndex = (cycleIndex + 1) % cycleImages.length;
            
            // Fade in the next image
            cycleImages[cycleIndex].classList.add('active');
            cycleImages[cycleIndex].style.opacity = '1'; 
        }, cycleDuration);
    }
    
    function stopCycle() {
        clearInterval(cycleInterval);
        cycleImages.forEach(img => {
            img.classList.remove('active');
            img.style.opacity = '0'; // Explicitly set opacity to 0 when stopping
        });
    }

    // --- CORE HOVER FEATURE LOGIC ---
    const handleHover = (event) => {
        const box = event.currentTarget;
        const imageUrl = box.dataset.imageUrl;
        
        stopCycle(); // Stop the screen saver and fade out cycle images

        // 1. Prepare hover image for transition
        previewImage.src = imageUrl;
        previewImage.classList.remove('hidden'); // Make it display: block (but still opacity:0 by default CSS)
        
        // 2. Load and Show project details (text overlay)
        detailTitle.textContent = box.dataset.title;
        detailLocation.textContent = box.dataset.location;
        detailType.textContent = box.dataset.type;
        projectDetails.classList.add('visible-details');// Make it display: block

        // 3. Trigger opacity transitions for BOTH image and details
        // Use requestAnimationFrame for a "next frame" update to allow CSS transition to run
        requestAnimationFrame(() => {
            previewImage.style.opacity = '1'; // Fade in the hover image
            // If you want details to fade:
            // projectDetails.style.opacity = '1'; 
            // (You'd need to add opacity: 0 and transition to .project-details .hidden in CSS)
        });
    };

    const handleMouseLeave = () => {
        // 1. Start fading out the hover image and details
        previewImage.style.opacity = '0'; // Fade out the hover image
        // If you want details to fade out:
        projectDetails.classList.remove('visible-details');

        // 2. Once the fade-out transition is complete, set display: none and restart cycle
        setTimeout(() => {
            previewImage.classList.add('hidden'); // Hide completely after fade
            previewImage.src = ""; // Clear source for next hover
            
            startCycle(); // Restart the screen saver cycle
        }, transitionDuration); // Wait for the transition duration
    };

    // --- Initialization ---
    colorBoxes.forEach(box => {
        const overlayColor = box.dataset.overlayColor;
        if (overlayColor) {
            box.style.setProperty('--overlay-color', overlayColor);
        }
        box.addEventListener('mouseenter', handleHover);
        box.addEventListener('mouseleave', handleMouseLeave);
    });
    
    startCycle(); // Start the screen saver on page load
});