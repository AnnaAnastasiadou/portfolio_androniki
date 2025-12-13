function renderProject(projectId) {
    const project = projects.find((p) => p.id == projectId);
    if (!project) return;

    document.getElementById('project-title-bar').textContent = project.title;

    const container = document.getElementById('groups-container');
    container.innerHTML = '';

    project.groups.forEach((group) => {
        let groupElement;

        switch (group.type) {
            case 'carousel':
                groupElement = createCarouselGroup(group);
                break;
            case 'image':
                groupElement = createImageGroup(group);
                break;
            case 'video':
                groupElement = createVideoGroup(group);
                break;
            case 'pdf':
                groupElement = createPDFGroup(group);
                break;
            default:
                console.warn('Unknown group type:', group.type);
                return;
        }

        container.appendChild(groupElement);
    });
}

// Single image
function createImageGroup(group) {
    const div = document.createElement('div');
    div.className = 'group';

    const img = document.createElement('img');
    img.src = `${group.folder}1.png`;
    img.style.width = '100%';
    img.style.objectFit = 'cover';
    img.style.border = '2px solid black';

    const desc = document.createElement('div');
    desc.className = 'group-description';
    desc.innerHTML = group.description;

    div.appendChild(img);
    div.appendChild(desc);
    return div;
}

// Carousel
function createCarouselGroup(group) {
    const div = document.createElement('div');
    div.className = 'group';

    const carousel = document.createElement('div');
    carousel.className = 'carousel';

    const track = document.createElement('div');
    track.className = 'carousel-track';
    carousel.appendChild(track);

    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    carousel.appendChild(counter);

    const leftBtn = document.createElement('button');
    leftBtn.className = 'carousel-btn left';
    leftBtn.innerHTML = '&#10094;';
    const rightBtn = document.createElement('button');
    rightBtn.className = 'carousel-btn right';
    rightBtn.innerHTML = '&#10095;';
    carousel.appendChild(leftBtn);
    carousel.appendChild(rightBtn);

    const images = [];
    for (let i = 1; i <= group.totalImages; i++) {
        const img = document.createElement('img');
        img.src = `${group.folder}${i}.png`;
        images.push(img);
    }

    const firstClone = images[0].cloneNode();
    const lastClone = images[images.length - 1].cloneNode();

    track.appendChild(lastClone);
    images.forEach((img) => track.appendChild(img));
    track.appendChild(firstClone);

    let currentIndex = 1;

    function updateCarousel(animate = true) {
        track.style.transition = animate ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        let displayIndex = currentIndex;
        if (displayIndex === 0) displayIndex = group.totalImages;
        else if (displayIndex === group.totalImages + 1) displayIndex = 1;
        counter.textContent = `${displayIndex} / ${group.totalImages}`;
    }

    leftBtn.onclick = () => {
        currentIndex--;
        updateCarousel();
    };
    rightBtn.onclick = () => {
        currentIndex++;
        updateCarousel();
    };

    track.addEventListener('transitionend', () => {
        if (currentIndex === 0) currentIndex = group.totalImages;
        if (currentIndex === group.totalImages + 1) currentIndex = 1;
        updateCarousel(false);
    });

    updateCarousel();

    const desc = document.createElement('div');
    desc.className = 'group-description';
    desc.innerHTML = group.description;

    div.appendChild(carousel);
    div.appendChild(desc);
    return div;
}

// Video
function createVideoGroup(group) {
    const div = document.createElement('div');
    div.className = 'group';

    div.innerHTML = `
        <div class="video-frame">
            <iframe src="https://www.youtube.com/embed/${group.id}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="group-description">${group.description}</div>
    `;
    return div;
}

// PDF
function createPDFGroup(group) {
    const div = document.createElement('div');
    div.className = 'group';

    div.innerHTML = `
        <div class="pdf-container">
            <iframe class="pdf-embed" src="${group.path}" type="application/pdf"></iframe>
        </div>
        <div class="group-description">${group.description}</div>
    `;
    return div;
}
