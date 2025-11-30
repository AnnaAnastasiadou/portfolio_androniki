// about.js - Make windows with 'draggable' class draggable

function getNavConstraint() {
    const navHeight =
        parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--nav-height'
            )
        ) || 0;
    return navHeight + 5; // small buffer
}

document.addEventListener('DOMContentLoaded', function () {
    const draggableWindows = document.querySelectorAll('.window.draggable');
    const container = document.getElementById('page-wrapper-draggable');

    if (!container) return;

    // Force GPU layer for smoother repaint
    container.style.willChange = 'transform, height';

    // Set wrapper to relative for better mobile behavior
    container.style.position = 'relative';
    container.style.minHeight = '100vh';
    container.style.overflowX = 'hidden';

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
        const navHeight =
            parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    '--nav-height'
                )
            ) || 0;

        if (index === 0) {
            window.style.top = `${navHeight + 50}px`;
            window.style.left = '10%';
        } else {
            window.style.top = `${navHeight + 20}px`;
            window.style.left = '20%';
        }

        window.style.zIndex = index === 0 ? '11' : '10';
        titleBar.style.cursor = 'move';
        titleBar.style.userSelect = 'none';

        titleBar.addEventListener('mousedown', startDrag);
        titleBar.addEventListener('touchstart', startDrag, { passive: false });

        function startDrag(e) {
            if (e.target.classList.contains('close-button')) return;
            e.preventDefault();

            isDragging = true;
            const rect = window.getBoundingClientRect();
            offsetX = getClientX(e) - rect.left;
            offsetY = getClientY(e) - rect.top;

            draggableWindows.forEach((w) => (w.style.zIndex = '10'));
            window.style.zIndex = '100';
            window.classList.add('dragging');
        }

        document.addEventListener('mousemove', dragMove);
        document.addEventListener('touchmove', dragMove, { passive: false });

        function dragMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            let newX = getClientX(e) - offsetX;
            let newY = getClientY(e) - offsetY;

            const headerConstraint = getNavConstraint();
            newY = Math.max(newY, headerConstraint);

            window.style.left = `${newX}px`;
            window.style.top = `${newY}px`;

            updateWrapperHeight();
        }

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        function endDrag() {
            isDragging = false;
            window.classList.remove('dragging');
            updateWrapperHeight();
        }

        window.addEventListener('mousedown', function (e) {
            if (!titleBar.contains(e.target)) {
                draggableWindows.forEach((w) => (w.style.zIndex = '10'));
                window.style.zIndex = '100';
            }
        });
    });

    updateWrapperHeight();

    // Add style for visual feedback
    const style = document.createElement('style');
    style.textContent = `
        .window.draggable .window-title-bar { cursor: move !important; user-select: none !important; }
        .window.draggable.dragging { box-shadow: 6px 6px 0 0 #000000; cursor: move !important; }
    `;
    document.head.appendChild(style);

    // Update wrapper on scroll/touchmove for mobile smoothness
    document.addEventListener('scroll', updateWrapperHeight, { passive: true });
    document.addEventListener('touchmove', updateWrapperHeight, {
        passive: true,
    });
});

function updateNavHeight() {
    const nav = document.querySelector('nav');
    const wrapper = document.getElementById('page-wrapper-draggable');
    if (!nav || !wrapper) return;

    const navHeight = nav.offsetHeight || 0;
    wrapper.style.setProperty('--nav-height', navHeight + 'px');
    updateWrapperHeight();
}

document.addEventListener('DOMContentLoaded', updateNavHeight);
window.addEventListener('load', updateNavHeight);
window.addEventListener('resize', updateNavHeight);
setTimeout(updateNavHeight, 100);
setTimeout(updateNavHeight, 500);

function updateWrapperHeight() {
    const wrapper = document.getElementById('page-wrapper-draggable');
    if (!wrapper) return;

    const windows = document.querySelectorAll('.window.draggable');
    let maxBottom = 0;

    windows.forEach((win) => {
        const bottom = win.offsetTop + win.offsetHeight;
        if (bottom > maxBottom) maxBottom = bottom;
    });

    const padding = 100;
    const minHeight = 600;
    wrapper.style.height = Math.max(maxBottom + padding, minHeight) + 'px';
}
