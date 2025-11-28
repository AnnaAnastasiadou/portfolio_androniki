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

        // Remove conflicting styles
        window.style.position = 'absolute';
        window.style.margin = '0';
        window.style.transform = 'none';

        // Set initial positions
        if (index === 0) {
            window.style.top = '40%';
            window.style.left = '10%';
        } else {
            window.style.top = '20%';
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
