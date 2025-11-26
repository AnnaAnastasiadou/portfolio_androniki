// Projects Data
const projects = [
    {
        id: 1,
        title: 'title3',
        type: 'type1',
        location: 'location3',
        year: 'year3',
        color: 'rgba(0, 144, 96, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 2,
        title: 'title2',
        type: 'type2',
        location: 'location2',
        year: 'year2',
        color: 'rgba(0, 0, 144, 0.2)',
        image: './compressed/1.40 Detail Section.jpg',
        description: 'Write description here',
    },
    {
        id: 3,
        title: 'title1',
        type: 'type1',
        location: 'location1',
        year: 'year1',
        color: 'rgba(144, 0, 0, 0.2)',
        image: './compressed/1.20 construction detail.jpg',
        description: 'Write description here',
    },
    {
        id: 4,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 5,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 6,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 7,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 8,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 9,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
    },
    {
        id: 10,
        title: 'title4',
        type: 'type4',
        location: 'location4',
        year: 'year4',
        color: 'rgba(144, 137, 0, 0.2)',
        image: './compressed/project-image1.jpg',
        description: 'Write description here',
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
    segment.style.backgroundColor = project.color;
    segment.style.setProperty('--segment-color', project.color);
    segment.style.backgroundImage = `url("${project.image}")`;

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
    alert(`Opening project ${project.title}`);
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', createRing);
    createRing();
});
