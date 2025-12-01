// --- Function to get the current height of the navigation bar ---
function getNavHeight() {
    const header = document.querySelector('nav, header, .navbar, .header');
    return header ? header.offsetHeight : 80;
}

// --- Helper function to get the constraint (bottom edge of the navbar) ---
function getNavConstraint() {
    const header = document.querySelector('nav, header, .navbar, .header');
    const navBottomPosition = header
        ? header.offsetTop + header.offsetHeight
        : 85;
    const buffer = 5;
    return navBottomPosition + buffer;
}

// --- Helper function to get the correct clientX/clientY from mouse or touch event ---
function getClientCoords(e) {
    if (e.touches && e.touches.length) {
        return {
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY,
        };
    }
    return {
        clientX: e.clientX,
        clientY: e.clientY,
    };
}

// --- Function to update container height without excessive growth ---
function updateContainerHeight() {
    const windows = document.querySelectorAll('.window');

    let maxBottom = 0;

    windows.forEach((win) => {
        const rect = win.getBoundingClientRect();
        const bottom = rect.bottom + window.scrollY;

        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    });

    // This ensures the page height always covers the lowest window
    const requiredHeight = maxBottom + 100; // extra breathing room

    document.body.style.minHeight = requiredHeight + 'px';

    const wrapper = document.querySelector('#page-wrapper');
    if (wrapper) {
        wrapper.style.minHeight = requiredHeight + 'px';
    }
}

// --- Debounce function to prevent too many rapid updates ---
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Create a debounced version for performance
const debouncedUpdateContainerHeight = debounce(updateContainerHeight, 50);

// --- 1. Set Initial Position Below Navbar (Load Logic) ---
// window.addEventListener('load', () => {
//     const navHeight = getNavHeight();
//     const windowPadding = 20;
//     const viewportWidth = window.innerWidth;
//     const viewportHeight = window.innerHeight;

//     const MOBILE_BREAKPOINT = 769;

//     document.querySelectorAll('.window').forEach((win, index) => {
//         let leftPosition, topPosition;

//         if (index === 0) {
//             if (viewportWidth <= MOBILE_BREAKPOINT) {
//                 // Mobile: 5% from left (using viewport percentage)
//                 leftPosition = 10;
//             } else {
//                 // Laptop/Desktop: 20% from left
//                 leftPosition = viewportWidth * 0.2;
//             }

//             topPosition = getNavConstraint() + 120;
//         } else {
//             const windowWidth = win.offsetWidth;

//             // You can also make this position responsive:
//             if (viewportWidth <= MOBILE_BREAKPOINT) {
//                 // Mobile: Start closer to the left edge
//                 leftPosition = 1;
//             } else {
//                 // Desktop: Set a fixed/percentage offset
//                 leftPosition = viewportWidth * 0.1;
//             }

//             topPosition = getNavConstraint() + 50;
//         }

//         win.style.position = 'absolute';
//         win.style.left = leftPosition + 'px';
//         win.style.top = topPosition + 'px';
//         win.style.zIndex = (10 - index).toString();

//         const bar = win.querySelector('.window-title-bar');
//         if (bar) {
//             bar.style.touchAction = 'none';
//         }
//     });

//     setTimeout(updateContainerHeight, 100);
// });

window.addEventListener('load', () => {
    const navConstraint = getNavConstraint();
    const viewportWidth = window.innerWidth;
    const MOBILE_BREAKPOINT = 1024;

    const windows = document.querySelectorAll('.window.draggable');
    const portraitWin = windows[0]; // first window (profile/portrait)
    const textWin = windows[1]; // second window (about/text)
    let portraitLeft;
    let textLeft;
    let portraitTop;
    let textTop;

    if (!portraitWin || !textWin) return;

    // === MOBILE LAYOUT (portrait stacked above text) ===
    if (viewportWidth <= MOBILE_BREAKPOINT) {
        const portraitWidth = Math.min(viewportWidth * 0.7, 350); // Using 90vw for better mobile fill
        const textWidth = Math.min(viewportWidth * 0.9, 600);

        portraitWin.style.width = portraitWidth + 'px';
        textWin.style.width = textWidth + 'px';

        portraitLeft = (viewportWidth - portraitWidth) / 2;
        portraitTop = navConstraint + 20;

        textTop = portraitTop + portraitWin.offsetHeight - 100;
        textLeft = (viewportWidth - textWidth) / 2;
    }

    // === DESKTOP / LAPTOP LAYOUT (portrait left, text right) ===
    else {
        const portraitWidth = Math.min(viewportWidth * 0.5, 350); // Using 90vw for better mobile fill
        const textWidth = Math.min(viewportWidth * 0.7, 600);
        const windowsSpace = 50;
        const bothWindowsWidth = portraitWidth + windowsSpace + textWidth;

        portraitWin.style.width = portraitWidth + 'px';
        textWin.style.width = textWidth + 'px';

        portraitLeft = (viewportWidth - bothWindowsWidth) / 2;
        portraitTop = navConstraint + 30;

        // Text on right
        textLeft = portraitLeft + portraitWidth + windowsSpace;
        textTop = navConstraint + 30;
    }
    portraitWin.style.position = 'absolute';
    portraitWin.style.left = portraitLeft + 'px';
    portraitWin.style.top = portraitTop + 'px';
    portraitWin.style.zIndex = '20';
    textWin.style.position = 'absolute';
    textWin.style.left = textLeft + 'px';
    textWin.style.top = textTop + 'px';
    textWin.style.zIndex = '19';
    setTimeout(updateContainerHeight, 100);
});

// --- 2. Scroll-Aware Dragging Logic with Complete Boundary Constraints ---

let draggingWindow = null;
let startDocumentX = 0;
let startDocumentY = 0;
let originWindowLeft = 0;
let originWindowTop = 0;

function startDrag(e) {
    const bar = e.target.closest('.window-title-bar');
    if (!bar) return;

    draggingWindow = bar.parentElement;
    e.preventDefault();

    const coords = getClientCoords(e);

    originWindowLeft = parseFloat(draggingWindow.style.left) || 0;
    originWindowTop = parseFloat(draggingWindow.style.top) || 0;

    startDocumentX = coords.clientX + window.scrollX;
    startDocumentY = coords.clientY + window.scrollY;

    draggingWindow.style.zIndex =
        Math.max(
            ...Array.from(document.querySelectorAll('.window')).map(
                (w) => parseInt(w.style.zIndex) || 0
            )
        ) + 1;

    draggingWindow.classList.add('dragging');
}

function handleMove(e) {
    if (!draggingWindow) return;
    e.preventDefault();

    const coords = getClientCoords(e);

    const currentDocumentX = coords.clientX + window.scrollX;
    const currentDocumentY = coords.clientY + window.scrollY;

    const dx = currentDocumentX - startDocumentX;
    const dy = currentDocumentY - startDocumentY;

    // Calculate the new absolute position
    let newLeft = originWindowLeft + dx;
    let newTop = originWindowTop + dy;

    // --- COMPLETE BOUNDARY CONSTRAINTS ---
    const minTopConstraint = getNavConstraint();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const windowWidth = draggingWindow.offsetWidth;
    const windowHeight = draggingWindow.offsetHeight;

    // Apply constraints
    newTop = Math.max(minTopConstraint, newTop); // Don't go above nav
    newLeft = Math.max(0, newLeft); // Don't go beyond left edge
    newLeft = Math.min(viewportWidth - windowWidth, newLeft); // Don't go beyond right edge
    newTop = Math.min(viewportHeight - 100, newTop); // Don't go too far down

    draggingWindow.style.left = newLeft + 'px';
    draggingWindow.style.top = newTop + 'px';

    // Update container height (debounced for performance)
    debouncedUpdateContainerHeight();
}

function endDrag() {
    if (draggingWindow) {
        draggingWindow.classList.remove('dragging');
    }
    draggingWindow = null;

    // Final container height update
    updateContainerHeight();
}

// --- Event Listeners Setup ---
document.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseup', endDrag);

document.addEventListener('touchstart', startDrag, { passive: false });
document.addEventListener('touchmove', handleMove, { passive: false });
document.addEventListener('touchend', endDrag);
document.addEventListener('touchcancel', endDrag);

// Update on window resize
window.addEventListener('resize', updateContainerHeight);

// Add CSS for visual feedback and window sizing
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
    
    /* Smooth transition for container height changes */
    #page-wrapper {
        transition: min-height 0.3s ease;
    }

`;
document.head.appendChild(style);
