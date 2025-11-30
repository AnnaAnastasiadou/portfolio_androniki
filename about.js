// about.js - Make windows with 'draggable' class draggable

// --- NEW HELPER FUNCTION ---
// Function to get the current bottom edge of the navigation bar for constraints
function getNavConstraint() {
    // We use documentElement to read the CSS variable set by updateNavHeight()
    const navHeight =
        parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--nav-height'
            )
        ) || 0;

    // Add a small buffer (e.g., 5px) so the title bar doesn't touch the very bottom edge of the nav
    return navHeight + 5;
}

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

        // This navHeight is for initial positioning only.
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

            let newX = getClientX(e) - offsetX;
            let newY = getClientY(e) - offsetY;

            // 🚀 NEW CONSTRAINT LOGIC:
            const headerConstraint = getNavConstraint();

            // Stop the window from being dragged above the navigation bar's bottom edge.
            // newY should never be less than the constraint value.
            newY = Math.max(newY, headerConstraint);
            // --- END NEW CONSTRAINT LOGIC ---

            window.style.left = `${newX}px`;
            window.style.top = `${newY}px`;

            // 🚀 Call height update for downward drag extension
            updateWrapperHeight();
        }

        // End dragging
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function endDrag() {
            isDragging = false;
            window.classList.remove('dragging');
            // 🚀 Call height update after drag stops (safety)
            updateWrapperHeight();
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

    // 🚀 Call height update immediately after setting initial positions
    updateWrapperHeight();

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

    if (!nav) {
        setTimeout(updateNavHeight, 50);
        return;
    }

    if (pageWrapper) {
        const navHeight = nav.offsetHeight;

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

    // Initialize the maximum bottom point relative to the wrapper.
    let maxBottomRelativeToWrapper = 0;

    // 1. Find the lowest point among all draggable windows
    windows.forEach((win) => {
        const windowBottom = win.offsetTop + win.offsetHeight;

        if (windowBottom > maxBottomRelativeToWrapper) {
            maxBottomRelativeToWrapper = windowBottom;
        }
    });

    // 2. Determine the required height
    const requiredWrapperHeight = maxBottomRelativeToWrapper;
    const safetyMinHeight = 600;
    const padding = 100;

    // The final height is the greater of (Content height + padding) OR (Minimum safety height).
    const finalHeight = Math.max(
        requiredWrapperHeight + padding,
        safetyMinHeight
    );

    // 3. Apply the calculated height to the wrapper
    if (wrapper) {
        wrapper.style.height = `${finalHeight}px`;
        // console.log(`Wrapper height set to: ${finalHeight}px (Max window bottom: ${maxBottomRelativeToWrapper}px)`);
    }
}
