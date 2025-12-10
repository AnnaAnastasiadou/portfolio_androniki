// Projects Data
const projects = [
    // --- MASTERS LEVEL THESES & RESEARCH (Project 1, 9, 8) ---
    {
        id: 1,
        title: 'The Silent Epidemic: Playful Living Environments & Loneliness',
        type: "Master's Thesis Design Project",
        location: 'Pendrecht, Rotterdam Zuid, NL',
        year: '2024-2025 (10 months)',
        link: './projects/project1.html',
        colouredImage: './assets/ringImages/cover1.png',
        image: './assets/ringImagesHover/hover1.png',
        description:
            'A comprehensive study and design proposal exploring how **playful, community-focused architectural interventions** can be used as a therapeutic tool to alleviate feelings of **urban loneliness** and foster social resilience in the Pendrecht neighbourhood. **[Youtube Animation Link 1] [Youtube Animation Link 2]** **[Research Diagrams]** **[Full Academic Paper]**',
    },
    {
        id: 2,
        title: 'Mental Mapping the University Campus',
        type: 'Honours Research Project',
        location: 'TU Delft Campus, NL',
        year: '2024-2025 (15 months)',
        link: './projects/project2.html',
        colouredImage: './assets/ringImages/cover2.png',
        image: './assets/ringImagesHover/hover2.png',
        description:
            'Research investigating the **applicability of the Mental Mapping Methodology** to understand and visualize students’ collective and individual perceptions of the **learning-scape** and its impact on their sense of place and well-being.',
    },
    {
        id: 3,
        title: 'The Role of the Architect in Spaces of Contested History',
        type: 'History Research Project',
        location: 'Nicosia, CY',
        year: '2024 (1.5 months)',
        link: './projects/project3.html',
        colouredImage: './assets/ringImages/cover3.png',
        image: './assets/ringImagesHover/hover3.jpeg',
        description:
            'Critical analysis of the architect’s ethical and design role when intervening in **sites marked by political conflict or contested heritage**, using Nicosia as a primary case study for reconciliation through design.',
    },

    // --- MASTERS LEVEL DESIGN PROJECTS (Project 2, 3) ---
    {
        id: 4,
        title: 'Hammam as Carrier of Emotions',
        type: 'Design Group Project',
        location: 'Medina of Rabat, MA',
        year: '2024 (1.5 months)',
        link: './projects/project4.html',
        colouredImage: './assets/ringImages/cover4.png',
        image: './assets/ringImagesHover/hover4.png',
        description:
            'A design exploration focusing on the **Hammam as an architectural space for emotional cleansing and communal ritual**, reinterpreting traditional Moroccan structures for contemporary urban life in the historic Medina.',
    },
    {
        id: 5,
        title: 'Re-scaffolding the American Embassy',
        type: 'Design Project',
        location: 'Korte Voorhout, Den Haag, NL',
        year: '2023-2024 (3 months)',
        link: './projects/project5.html',
        colouredImage: './assets/ringImages/cover5.png',
        image: './assets/ringImagesHover/hover5.png',
        description:
            'An architectural design project that re-imagines the iconic American Embassy site in The Hague, focusing on **adaptive reuse and public interface** to create a dynamic cultural and civic hub.',
    },

    // --- BACHELOR LEVEL THESIS & PROJECTS (Project 4, 5, 6, 7) ---
    {
        id: 6,
        title: 'Rehabilitation Center within Contested History',
        type: "Bachelor's Thesis Design Project",
        location: 'Colston Parade 1-5, Bristol, UK',
        year: '2023 (6 months)',
        link: './projects/project6.html',
        colouredImage: './assets/ringImages/cover6.png',
        image: './assets/ringImagesHover/hover6.png',
        description:
            'A design for a **rehabilitation center situated within a site of historical contention**, exploring how architecture can facilitate healing and dialogue while acknowledging a complex past.',
    },
    {
        id: 7,
        title: 'Playground Inspired by Local Folk Tales',
        type: 'Design Project',
        location: 'Hay on Wye, Wales, UK',
        year: '2022 (3 months)',
        link: './projects/project7.html',
        colouredImage: './assets/ringImages/cover7.png',
        image: './assets/ringImagesHover/hover7.png',
        description:
            'Design and conceptualization of a **public playground** using narratives and characters from local Welsh folk tales to inspire spatial organization and interactive elements for children.',
    },
    {
        id: 8,
        title: 'Social Housing by the Castle',
        type: 'Design Project',
        location: 'Hay on Wye, Wales, UK',
        year: '2021-2022 (3 months)',
        link: './projects/project8.html',
        colouredImage: './assets/ringImages/cover8.png',
        image: './assets/ringImagesHover/hover8.png',
        description:
            'Proposal for a **social housing development** adjacent to the historic Hay Castle, focusing on sensitive integration with the heritage context and promoting communal living.',
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
        description:
            'Design of a **small, sustainable live/work space** providing a shelter and studio for a photographer, maximizing views and interaction with the riparian environment of the River Taff.',
    },
];

// Create the perfect ring depending on the number of projects
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

    // Create center hub
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

function createCenterHub() {
    const centerHub = document.createElement('div');
    centerHub.className = 'ring-center project-preview';
    centerHub.innerHTML =
        '<div class="center-text"><span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!</div>';

    const centerImageLayer = document.createElement('div');
    centerImageLayer.className = 'center-image-layer';
    centerHub.appendChild(centerImageLayer);

    centerHub.style.backgroundImage = `conic-gradient(
        from 0deg,
        rgba(255, 0, 0, 0.2),
        rgba(255, 255, 0, 0.2), 
        rgba(0, 255, 0, 0.2), 
        rgba(0, 255, 255, 0.2), 
        rgba(0, 0, 255, 0.2),
        rgba(255, 0, 255, 0.2),
        rgba(255, 0, 0, 0.2)
    )`;

    return centerHub;
}

function updateCenterHubSize(centerHub, centerHubRadius) {
    const centerSize = centerHubRadius * 2;
    centerHub.style.width = `${centerSize}px`;
    centerHub.style.height = `${centerSize}px`;
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
    // segment.style.backgroundColor = project.color;
    // segment.style.setProperty('--segment-color', project.color);
    segment.style.backgroundImage = `url("${project.colouredImage}")`;
    segment.style.backgroundSize = 'cover';
    segment.style.backgroundPosition = 'center';
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

function handleSegmentHover(project, centerHub) {
    const centerImageLayer = centerHub.querySelector('.center-image-layer');
    const centerText = centerHub.querySelector('.center-text');

    centerImageLayer.style.backgroundImage = `url("${project.image}")`;
    centerImageLayer.style.backgroundSize = 'cover';
    centerImageLayer.style.backgroundPosition = 'center';
    centerImageLayer.style.backgroundRepeat = 'no-repeat';
    centerImageLayer.style.opacity = 1;

    centerText.style.opacity = 0;
    centerText.style.color = 'transparent';
    centerHub.style.border = 'none';

    showProjectPreview(project);
}

function handleSegmentLeave(centerHub) {
    const centerImageLayer = centerHub.querySelector('.center-image-layer');
    const centerText = centerHub.querySelector('.center-text');

    centerImageLayer.style.opacity = 0;
    centerText.style.opacity = 1;
    centerText.style.color = '#ffffff';
    centerHub.style.border = '';

    centerHub.style.backgroundImage = `conic-gradient(
        from 0deg,
        rgba(255, 0, 0, 0.2),
        rgba(255, 255, 0, 0.2), 
        rgba(0, 255, 0, 0.2), 
        rgba(0, 255, 255, 0.2), 
        rgba(0, 0, 255, 0.2),
        rgba(255, 0, 255, 0.2),
        rgba(255, 0, 0, 0.2)
    )`;
    centerText.innerHTML =
        '<span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!';

    // Clear project details
    const details = document.getElementById('project-details');
    details.innerHTML = '';
}

// Show project preview on hover
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

// Show project details on click
function showProjectDetails(project) {
    sessionStorage.setItem('selectedProject', JSON.stringify(project));
    window.location.href = project.link;
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', createRing);
    createRing();
});
