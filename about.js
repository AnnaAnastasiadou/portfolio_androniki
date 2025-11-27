// about.js - Make windows with 'draggable' class draggable
document.addEventListener('DOMContentLoaded', function () {
    const draggableWindows = document.querySelectorAll('.window.draggable');
    const container = document.getElementById('page-wrapper-draggable');

    console.log('Found draggable windows:', draggableWindows.length);

    draggableWindows.forEach((window, index) => {
        const titleBar = window.querySelector('.window-title-bar');
        let isDragging = false;
        let offsetX, offsetY;

        // Remove ALL conflicting styles
        window.style.position = 'absolute';
        window.style.margin = '0';
        // window.style.width = index === 0 ? '350px' : '450px';
        // window.style.height = index === 0 ? '400px' : '500px';
        // window.style.maxWidth = 'none';
        // window.style.animation = 'none';
        window.style.transform = 'none';

        // Set initial positions
        if (index === 0) {
            window.style.top = '40%';
            window.style.left = '10%';
        } else {
            window.style.top = '20%';
            window.style.left = '20%';
        }

        // Make sure z-index is set
        window.style.zIndex = index === 0 ? '100' : '10';

        // Make title bar draggable
        titleBar.style.cursor = 'move';
        titleBar.style.userSelect = 'none';

        // Start dragging when clicking on title bar ONLY
        titleBar.addEventListener('mousedown', function (e) {
            if (e.target.classList.contains('close-button')) return;

            isDragging = true;

            // Calculate the offset between mouse position and window position
            const rect = window.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            // Bring to front
            document.querySelectorAll('.window.draggable').forEach((w) => {
                w.style.zIndex = '10';
            });
            window.style.zIndex = '100';

            window.classList.add('dragging');
            e.preventDefault();
        });

        // During dragging
        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            // Calculate new position based on mouse position minus the offset
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            // Apply new position
            window.style.left = `${newX}px`;
            window.style.top = `${newY}px`;
        });

        // End dragging
        document.addEventListener('mouseup', function () {
            if (isDragging) {
                isDragging = false;
                window.classList.remove('dragging');
            }
        });

        // Close button functionality
        const closeBtn = window.querySelector('.close-button');
        closeBtn.addEventListener('click', function () {
            window.style.display = 'none';
        });

        // Bring to front when clicking anywhere on window (but don't drag)
        window.addEventListener('mousedown', function (e) {
            if (e.target === window || window.contains(e.target)) {
                // Don't bring to front if clicking on title bar (already handled)
                if (!titleBar.contains(e.target)) {
                    document
                        .querySelectorAll('.window.draggable')
                        .forEach((w) => {
                            w.style.zIndex = '10';
                        });
                    window.style.zIndex = '100';
                }
            }
        });
    });

    // Add minimal CSS via JavaScript for visual feedback
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
