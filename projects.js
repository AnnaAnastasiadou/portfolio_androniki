const projects = [
    {
        id: 1,
        title: "title3",
        type: "type1",
        location: "location3",
        year: "year3",
        color: "rgba(0, 144, 96, 0.2)",
        image: "./assets/134846858_2471407886486792_986618414788423814_n.jpg",
        description: "Write description here"
    },
    {
        id: 2,
        title: "title2",
        type: "type2",
        location: "location2",
        year: "year2",
        color: "rgba(0, 0, 144, 0.2)",
        image: "./assets/1.40 Detail Section.png",
        description: "Write description here"
    },
    {
        id: 3,
        title: "title1dfbhhfnfg rddghsrtryjdyj",
        type: "type1",
        location: "location1",
        year: "year1",
        color: "rgba(144, 0, 0, 0.2)",
        image: "./assets/1.20 construction detail.png",
        description: "Write description here"
    },
    {
        id: 4,
        title: "title4",
        type: "type4",
        location: "location4",
        year: "year4",
        color: "rgba(144, 137, 0, 0.2)",
        image: "./assets/3c826ccd-7422-4084-b0c0-8ff7c81d6869.jpg",
        description: "Write description here"
    }
];

// Create the perfect ring depepnding on the numer of projects
function createRing() {
    const ringContainer = document.getElementById("projects-ring");
    ringContainer.innerHTML = '';

    const totalProjects = projects.length;
    const angleStep = 360 / totalProjects;

    const ringSize = ringContainer.offsetWidth; 
    const innerRadiusRatio = 0.30;
    const outerRadiusRatio = 0.50; 
    const innerRadius = ringSize * innerRadiusRatio;
    const outerRadius = ringSize * outerRadiusRatio;
    const centerX = ringSize / 2;
    const centerY = ringSize / 2; 
    // Ring dimensions
    // const innerRadius = 150;
    // const outerRadius = 250;
    // const centerX = 250;
    // const centerY = 250;

    // Add center hub
    const centerHub = document.createElement('div');
    centerHub.className = 'ring-center project-preview';
    centerHub.innerHTML = '<div class="center-text"><span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!</div>';

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
    ringContainer.appendChild(centerHub);

    projects.forEach((project, index) => {
        const segment = document.createElement("div");
        segment.className = "project-segment";

        // Calculate angles 
        const startAngle = index * angleStep;
        const endAngle = startAngle + angleStep;
        const midAngle = startAngle + (angleStep / 2);

        // Convert angles to radians
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const midRad = (midAngle * Math.PI) / 180;

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
        // M : move to coordinate
        // L: draw straight line
        // A: draws an arc from the given coordinates, specifying size of arc(big/small) and direction(clockwise/anti-clockwise)
        
        // Set segment styles
        segment.style.clipPath = clipPath;
        segment.id = project.title;
        segment.style.backgroundColor = project.color;
        segment.style.labelColor= `${midAngle}deg`;

        // Set project color for the ::before overlay (if you use it in CSS)
        segment.style.setProperty('--segment-color', project.color); 

        // Add project image
        segment.style.backgroundImage = `url("${project.image}")`;

        // Add event listeners
        segment.addEventListener('mouseenter', () => {
            const centerImageLayer = centerHub.querySelector('.center-image-layer');
            const centerText = centerHub.querySelector(".center-text");

            centerImageLayer.style.backgroundImage = `url("${project.image}")`;
            centerImageLayer.style.backgroundSize = "cover";
            centerImageLayer.style.backgroundPosition = "center";
            centerImageLayer.style.backgroundRepeat = "no-repeat";
            centerImageLayer.style.opacity = 1; 

            centerText.style.opacity = 0; 

            centerText.style.color = 'transparent';

            centerHub.style.border = "none";
            // centerHub.style.boxShadow = "none";
            showProjectPreview(project);
        });

        segment.addEventListener('mouseleave', () => {
            const centerImageLayer = centerHub.querySelector('.center-image-layer');
            const centerText = centerHub.querySelector(".center-text");
            centerImageLayer.style.opacity = 0; 
            centerText.style.opacity = 1; 

            centerText.style.opacity = 1; 
            centerText.style.color = '#ffffff';
            centerHub.style.border = ''; 
            // centerHub.style.boxShadow = ''; 
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
            centerText.innerHTML = '<span class="bold">Hover</span> over projects for a preview. <span class="bold">Click</span> for more details!';
        });

        segment.addEventListener('click', () => showProjectDetails(project));

        ringContainer.appendChild(segment);
    
    });

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


document.addEventListener('DOMContentLoaded', createRing);