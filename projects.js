// Projects Data
const projects = [
    {
        id: 4,
        title: 'Re-scaffolding the American Embassy',
        type: 'Design Project',
        location: 'Korte Voorhout, Den Haag, NL',
        year: '2023-2024 (3 months)',
        link: './projects/project4.html',
        colouredImage: './assets/ringImages/cover4.png',
        image: './assets/compressedHover/hover4.jpg',
    },
    {
        id: 5,
        title: 'The Role of the Architect in Spaces of Contested History',
        type: 'History Research Project',
        location: 'Nicosia, CY',
        year: '2024 (1.5 months)',
        link: './projects/project5.html',
        colouredImage: './assets/ringImages/cover5.png',
        image: './assets/compressedHover/hover5.jpg',
    },
    {
        id: 6,
        title: 'Rehabilitation Center within Contested History',
        type: "Bachelor's Thesis Design Project",
        location: 'Colston Parade 1-5, Bristol, UK',
        year: '2023 (6 months)',
        link: './projects/project6.html',
        colouredImage: './assets/ringImages/cover6.png',
        image: './assets/compressedHover/hover6.jpg',
    },
    {
        id: 7,
        title: 'Playground Inspired by Local Folk Tales',
        type: 'Design Project',
        location: 'Hay on Wye, Wales, UK',
        year: '2022 (3 months)',
        link: './projects/project7.html',
        colouredImage: './assets/ringImages/cover7.png',
        image: './assets/compressedHover/hover7.jpg',
    },
    {
        id: 8,
        title: 'Social Housing by the Castle',
        type: 'Design Project',
        location: 'Hay on Wye, Wales, UK',
        year: '2021-2022 (3 months)',
        link: './projects/project8.html',
        colouredImage: './assets/ringImages/cover8.png',
        image: './assets/compressedHover/hover8.jpg',
    },
    {
        id: 9,
        title: 'Shelter for a Photographer by the River',
        type: 'Design Project',
        location: 'River Taff, Cardiff, UK',
        year: '2020-2021 (3 months)',
        link: './projects/project9.html',
        colouredImage: './assets/ringImages/cover9.png',
        image: './assets/ringImagesHover/hover9.png',
    },
    {
        id: 10,
        title: 'Mental Mapping the University Campus',
        type: 'Honours Research Project',
        location: 'TU Delft Campus, NL',
        year: '2024-2025 (15 months)',
        link: './projects/project10.html',
        colouredImage: './assets/ringImages/cover10.png',
        image: './assets/ringImagesHover/hover10.jpg',
    },
    {
        id: 11,
        title: 'Non-architecture creative tales in the form of paintings and collages',
        type: 'Paintings, Collages, Drawings',
        location: 'Cyprus',
        year: 'ongoing',
        link: './projects/project11.html',
        colouredImage: './assets/ringImages/cover11.png',
        image: './assets/ringImagesHover/hover11.jpg',
    },
    {
        id: 1,
        title: 'The Silent Epidemic: Playful Living Environments & Loneliness',
        type: "Master's Thesis Design Project",
        location: 'Pendrecht, Rotterdam Zuid, NL',
        year: '2024-2025 (10 months)',
        link: './projects/project1.html',
        colouredImage: './assets/ringImages/cover1.png',
        image: './assets/compressedHover/hover1.jpg',
    },
    {
        id: 2,
        title: 'Master Thesis Paper',
        type: 'Research Project',
        location: '—',
        year: '—',
        link: './projects/project2.html',
        colouredImage: './assets/ringImages/cover2.png',
        image: './assets/compressedHover/hover2.jpg',
    },
    {
        id: 3,
        title: 'Hammam as Carrier of Emotions',
        type: 'Design Group Project',
        location: 'Medina of Rabat, MA',
        year: '2024 (1.5 months)',
        link: './projects/project3.html',
        colouredImage: './assets/ringImages/cover3.png',
        image: './assets/compressedHover/hover3.jpg',
    },
];

function createCenterHub() {
    const centerHub = document.createElement('div');
    centerHub.className = 'ring-center project-preview';

    // Create the text layer
    const centerText = document.createElement('div');
    centerText.className = 'center-text';
    centerText.innerHTML =
        '<span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!';

    // Create an image layer for EACH project
    projects.forEach((project, index) => {
        const imageLayer = document.createElement('div');
        imageLayer.className = 'center-image-layer';
        imageLayer.dataset.projectId = project.id;
        imageLayer.style.backgroundImage = `url("${project.image}")`;
        imageLayer.style.backgroundSize = 'cover';
        imageLayer.style.backgroundPosition = 'center';
        imageLayer.style.backgroundRepeat = 'no-repeat';
        imageLayer.style.opacity = '0';
        centerHub.appendChild(imageLayer);
    });

    // Add text layer on top
    centerHub.appendChild(centerText);

    // Set gradient background
    centerHub.style.backgroundImage = `conic-gradient(
        from 0deg,
        rgba(0, 0, 255, 0.3),
        rgba(0, 255, 255, 0.3),
        rgba(0, 255, 0, 0.3),
        rgba(255, 255, 0, 0.3), 
        rgba(255, 0, 0, 0.3),
        rgba(255, 0, 255, 0.3),
        rgba(0, 0, 255, 0.3)
    )`;

    return centerHub;
}

function updateCenterHubSize(centerHub, centerHubRadius) {
    const centerSize = centerHubRadius * 2;
    centerHub.style.width = `${centerSize}px`;
    centerHub.style.height = `${centerSize}px`;
}

// Optimized hover - just change opacity of the correct layer
function handleSegmentHover(project, centerHub) {
    const centerText = centerHub.querySelector('.center-text');
    const allImageLayers = centerHub.querySelectorAll('.center-image-layer');

    // Hide text
    centerText.style.opacity = '0';

    // Hide all image layers
    allImageLayers.forEach((layer) => {
        layer.style.opacity = '0';
    });

    // Show only the hovered project's layer
    const activeLayer = centerHub.querySelector(
        `[data-project-id="${project.id}"]`
    );
    if (activeLayer) {
        activeLayer.style.opacity = '1';
    }

    centerHub.style.border = 'none';

    showProjectPreview(project);
}

function handleSegmentLeave(centerHub) {
    const centerText = centerHub.querySelector('.center-text');
    const allImageLayers = centerHub.querySelectorAll('.center-image-layer');

    // Hide all image layers
    allImageLayers.forEach((layer) => {
        layer.style.opacity = '0';
    });

    // Show text
    centerText.style.opacity = '1';
    centerText.style.color = '#ffffff';
    centerHub.style.border = '';

    centerHub.style.backgroundImage = `conic-gradient(
        from 0deg,
        rgba(0, 0, 255, 0.3),
        rgba(0, 255, 255, 0.3),
        rgba(0, 255, 0, 0.3),
        rgba(255, 255, 0, 0.3), 
        rgba(255, 0, 0, 0.3),
        rgba(255, 0, 255, 0.3),
        rgba(0, 0, 255, 0.3)
    )`;

    centerText.innerHTML =
        '<span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!';

    // Clear project details
    const details = document.getElementById('project-details');
    details.innerHTML = '';
}

// Keep your existing functions
function createRing() {
    const ringContainer = document.getElementById('projects-ring');
    if (!ringContainer) return;

    ringContainer.innerHTML = '';

    const totalProjects = projects.length;
    const angleStep = 360 / totalProjects;

    const ringSize = ringContainer.offsetWidth;
    const innerRadiusRatio = 0.3;
    const outerRadiusRatio = 0.5;
    const centerHubRatio = 0.2;

    const innerRadius = ringSize * innerRadiusRatio;
    const outerRadius = ringSize * outerRadiusRatio;
    const centerHubRadius = ringSize * centerHubRatio;

    const centerX = ringSize / 2;
    const centerY = ringSize / 2;

    // Create center hub with all image layers
    const centerHub = createCenterHub();
    ringContainer.appendChild(centerHub);

    // Create all project segments
    projects.forEach((project, index) => {
        const segment = createProjectSegment(
            project,
            index,
            angleStep,
            innerRadius,
            outerRadius,
            centerX,
            centerY,
            centerHub
        );
        ringContainer.appendChild(segment);
    });

    updateCenterHubSize(centerHub, centerHubRadius);
}

function createProjectSegment(
    project,
    index,
    angleStep,
    innerRadius,
    outerRadius,
    centerX,
    centerY,
    centerHub
) {
    const segment = document.createElement('div');
    segment.className = 'project-segment';

    // Calculate angles
    const startAngle = index * angleStep;
    const endAngle = startAngle + angleStep;

    // Convert angles to radians
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate the four corner points
    const innerStartX = centerX + innerRadius * Math.cos(startRad);
    const innerStartY = centerY + innerRadius * Math.sin(startRad);

    const innerEndX = centerX + innerRadius * Math.cos(endRad);
    const innerEndY = centerY + innerRadius * Math.sin(endRad);

    const outerStartX = centerX + outerRadius * Math.cos(startRad);
    const outerStartY = centerY + outerRadius * Math.sin(startRad);

    const outerEndX = centerX + outerRadius * Math.cos(endRad);
    const outerEndY = centerY + outerRadius * Math.sin(endRad);

    // Create the clip-path for the ring segment
    const clipPath = `path("M ${innerStartX} ${innerStartY} L ${outerStartX} ${outerStartY} A ${outerRadius} ${outerRadius} 0 0 1 ${outerEndX} ${outerEndY} L ${innerEndX} ${innerEndY} A ${innerRadius} ${innerRadius} 0 0 0 ${innerStartX} ${innerStartY} Z")`;

    // Set segment styles
    segment.style.clipPath = clipPath;
    segment.id = project.title;
    segment.style.backgroundImage = `url("${project.colouredImage}")`;
    // segment.style.backgroundSize = '30%';
    // segment.style.backgroundPosition = 'center';
    segment.style.backgroundRepeat = 'no-repeat';

    // Add event listeners
    addSegmentEventListeners(segment, project, centerHub);

    return segment;
}

function addSegmentEventListeners(segment, project, centerHub) {
    segment.addEventListener('mouseenter', () => {
        handleSegmentHover(project, centerHub);
    });

    segment.addEventListener('mouseleave', () => {
        handleSegmentLeave(centerHub);
    });

    segment.addEventListener('click', () => {
        showProjectDetails(project);
    });
}

function showProjectPreview(project) {
    const details = document.getElementById('project-details');
    details.innerHTML = `
        <div class="left">
            <div class="project-detail-item">
                <span class="bold">Project:</span> ${project.title}
            </div>
            <div class="project-detail-item">
                <span class="bold">Type:</span> ${project.type}
            </div>
        </div>
        <div class = "right">
            <div class="project-detail-item">
                <span class="bold">Location:</span> ${project.location}
            </div>
            <div class="project-detail-item">
                <span class="bold">Year:</span> ${project.year}
            </div>
        </div>
    `;
}

function showProjectDetails(project) {
    sessionStorage.setItem('selectedProject', JSON.stringify(project));
    window.location.href = project.link;
}

// Preload images
function preloadImages() {
    projects.forEach((project) => {
        const img = new Image();
        img.src = project.image;
        const coloredImg = new Image();
        coloredImg.src = project.colouredImage;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    window.addEventListener('resize', createRing);
    createRing();
});
