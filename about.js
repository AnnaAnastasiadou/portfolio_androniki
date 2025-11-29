// about.js - Make windows with 'draggable' class draggable
document.addEventListener('DOMContentLoaded', function () {
    const draggableWindows = document.querySelectorAll('.window.draggable');
    const container = document.getElementById('page-wrapper-draggable');

    console.log('Found draggable windows:', draggableWindows.length);

    // Helper functions for touch/mouse
    function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }
    function getClientY(e) {
        return e.touches ? e.touches[0].clientY : e.clientY;
    }

    draggableWindows.forEach((window, index) => {
        const titleBar = window.querySelector('.window-title-bar');
        let isDragging = false;
        let offsetX, offsetY;
        const navHeight =
            parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    '--nav-height'
                )
            ) || 0;

        // Remove conflicting styles
        window.style.position = 'absolute';
        window.style.margin = '0';
        window.style.transform = 'none';

        // Set initial positions
        if (index === 0) {
            window.style.top = `${navHeight + 50}px`;
            window.style.left = '10%';
        } else {
            window.style.top = `${navHeight + 20}px`;
            window.style.left = '20%';
        }

        window.style.zIndex = index === 0 ? '11' : '10';

        // Style title bar
        titleBar.style.cursor = 'move';
        titleBar.style.userSelect = 'none';

        // Start dragging (mouse + touch)
        titleBar.addEventListener('mousedown', startDrag);
        titleBar.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            if (e.target.classList.contains('close-button')) return;
            e.preventDefault();

            isDragging = true;

            const rect = window.getBoundingClientRect();
            offsetX = getClientX(e) - rect.left;
            offsetY = getClientY(e) - rect.top;

            // Bring window to front
            draggableWindows.forEach((w) => (w.style.zIndex = '10'));
            window.style.zIndex = '100';

            window.classList.add('dragging');
        }

        // Drag movement (mouse + touch)
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });

        function dragMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            const newX = getClientX(e) - offsetX;
            const newY = getClientY(e) - offsetY;

            window.style.left = `${newX}px`;
            window.style.top = `${newY}px`;
        }

        // End dragging
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function endDrag() {
            isDragging = false;
            window.classList.remove('dragging');
        }

        // Close button
        // const closeBtn = window.querySelector('.close-button');
        // closeBtn.addEventListener('click', function () {
        //     window.style.display = 'none';
        // });

        // Bring to front on click
        window.addEventListener('mousedown', function (e) {
            if (e.target === window || window.contains(e.target)) {
                if (!titleBar.contains(e.target)) {
                    draggableWindows.forEach((w) => (w.style.zIndex = '10'));
                    window.style.zIndex = '100';
                }
            }
        });
    });

    // Minimal CSS for visual feedback
    const style = document.createElement('style');
    style.textContent = `
        .window.draggable .window-title-bar {
            cursor: move !important;
            user-select: none !important;
        }
        
        .window.draggable.dragging {
            box-shadow: 6px 6px 0 0 #000000;
            cursor: move !important;
        }
        
        .close-button {
            cursor: pointer !important;
            padding: 2px 6px;
            background: #c0c0c0;
            border: 1px solid;
            border-color: #dfdfdf #808080 #808080 #dfdfdf;
        }
        
        .close-button:hover {
            background: #e0e0e0 !important;
        }
        
        .close-button:active {
            border-color: #808080 #dfdfdf #dfdfdf #808080;
        }
    `;
    document.head.appendChild(style);
});

function updateNavHeight() {
    const nav = document.querySelector('nav');
    const pageWrapper = document.getElementById('page-wrapper-draggable');

    // If nav isn't found yet, wait 50ms and try again
    if (!nav) {
        setTimeout(updateNavHeight, 50);
        return;
    }

    if (pageWrapper) {
        const navHeight = nav.offsetHeight;

        // Safety check: if height is 0, image/styles might not be loaded yet. Retry.
        if (navHeight === 0) {
            setTimeout(updateNavHeight, 50);
            return;
        }

        pageWrapper.style.setProperty('--nav-height', navHeight + 'px');
        console.log('Nav height updated to:', navHeight);

        updateWrapperHeight();
    }
}

// Run immediately
document.addEventListener('DOMContentLoaded', updateNavHeight);

// Run when window fully loads (images etc)
window.addEventListener('load', updateNavHeight);

// Run on resize
window.addEventListener('resize', updateNavHeight);

// EXTRA SAFETY: If you use a load-header.js script, listen for a custom event
// or just poll for it briefly to ensure it catches the injection.
setTimeout(updateNavHeight, 100);
setTimeout(updateNavHeight, 500);

function updateWrapperHeight() {
    const wrapper = document.getElementById('page-wrapper-draggable');
    const windows = document.querySelectorAll('.window.draggable');
    const nav = document.querySelector('nav');

    // Get the height of the navigation bar to determine the minimum content area.
    // Use 0 as a fallback if the nav isn't found yet.
    const navHeight = nav ? nav.offsetHeight : 0;

    // Initialize the maximum bottom point relative to the wrapper.
    let maxBottomRelativeToWrapper = 0;

    // 1. Find the lowest point among all draggable windows
    windows.forEach((win) => {
        // win.offsetTop: distance from the top of the *wrapper*
        // win.offsetHeight: height of the window element
        const windowBottom = win.offsetTop + win.offsetHeight;

        if (windowBottom > maxBottomRelativeToWrapper) {
            maxBottomRelativeToWrapper = windowBottom;
        }
    });

    // 2. Determine the required height

    // The required height for the wrapper itself needs to cover the maxBottomRelativeToWrapper.
    const requiredWrapperHeight = maxBottomRelativeToWrapper;

    // Define a minimum visible height based on the viewport, using a fixed pixel value
    // (e.g., 600px) instead of unstable vh, or calculating the required space.
    // Let's use 600px as a reliable baseline minimum height for screen visibility.
    const safetyMinHeight = 600;

    // Add padding (100px) to prevent content from touching the very bottom.
    const padding = 100;

    // The final height is the greater of (Content height + padding) OR (Minimum safety height).
    const finalHeight = Math.max(
        requiredWrapperHeight + padding,
        safetyMinHeight
    );

    // 3. Apply the calculated height to the wrapper
    // This forces the absolute container to grow, pushing the footer down.
    if (wrapper) {
        wrapper.style.height = `${finalHeight}px`;
        // console.log(`Wrapper height set to: ${finalHeight}px (Max window bottom: ${maxBottomRelativeToWrapper}px)`);
    }
}
