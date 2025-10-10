const projects = [
    {
        id: 1,
        title: "title1",
        type: "type1",
        location: "location1",
        year: "year1",
        color: "rgba(144, 0, 0, 0.2)",
        image: "./assets/1.20 construction detail.png",
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
        title: "title3",
        type: "type1",
        location: "location3",
        year: "year3",
        color: "rgba(0, 144, 96, 0.2)",
        image: "./assets/134846858_2471407886486792_986618414788423814_n.jpg",
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

    // Ring dimensions
    const innerRadius = 150;
    const outerRadius = 250;
    const centerX = 250;
    const centerY = 250;

    // Add center hub
    const centerHub = document.createElement('div');
    centerHub.className = 'ring-center';
    centerHub.innerHTML = '<div class="center-text">Hover over projects<br>for preview</div>';
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
        // Create inner div for background
        // const innerDiv = document.createElement('div');
        // innerDiv.className = 'segment-inner';
        // innerDiv.style.backgroundColor = project.color;
        // segment.appendChild(innerDiv);

        // Set project color for the ::before overlay (if you use it in CSS)
        segment.style.setProperty('--segment-color', project.color); 

        // Add project image
        segment.style.backgroundImage = `url("${project.image}")`;
        // if (startAngle >= 0 && startAngle < 90) {
        //     segment.style.backgroundPosition = "center bottom";
        // } else if (startAngle >= 90 && startAngle < 180) {
        //     segment.style.backgroundPosition = "center top";
        // } else if (startAngle >= 180 && startAngle < 270) {
        //     segment.style.backgroundPosition = "right top";
        // } else if (startAngle >= 270 && startAngle <= 360) {
        //     segment.style.backgroundPosition = "left center";
        // }

        // const image = document.createElement('img');
        // image.className = 'project-image';
        // image.src = project.image;
        // image.alt = project.title;
        // segment.appendChild(image);
        

        // Add the label element
        // const label = document.createElement('div');
        // label.className = 'project-label';
        // label.textContent = project.title;
        // label.style.setProperty('--label-angle', `${midAngle}deg`);
        // segment.appendChild(label);

        // Add event listeners
        segment.addEventListener('mouseenter', () => showProjectPreview(project));
        segment.addEventListener('click', () => showProjectDetails(project));

        ringContainer.appendChild(segment);
    
    });
        // Initialize preview areas
        initializePreviewAreas();
}

// Show project preview on hover
function showProjectPreview(project) {
    const preview = document.querySelector('.projects-preview');
    preview.innerHTML = `
        <div style="text-align: center; width: 100%;">
            <img src="${project.image}" alt="${project.title}" style="max-width: 100%; max-height: 180px; border: 2px solid #808080;">
            <h3 style="margin-top: 1rem; color: #000080;">${project.title}</h3>
            <p style="color: #333;">${project.type} • ${project.location}</p>
        </div>
    `;
}

// Show project details on click
function showProjectDetails(project) {
    const details = document.getElementById('project-details');
    details.innerHTML = `
        <div class="project-detail-item">
            <strong>Project:</strong> ${project.title}
        </div>
        <div class="project-detail-item">
            <strong>Type:</strong> ${project.type}
        </div>
        <div class="project-detail-item">
            <strong>Location:</strong> ${project.location}
        </div>
        <div class="project-detail-item">
            <strong>Year:</strong> ${project.year}
        </div>
        <div class="project-detail-item" style="margin-top: 1rem;">
            <strong>Description:</strong> ${project.description}
        </div>
    `;
}

// Initialize preview and details areas
function initializePreviewAreas() {
    const preview = document.querySelector('.projects-preview');
    const details = document.getElementById('project-details');
    
    preview.innerHTML = '<div class="preview-placeholder">Hover over a project to see preview</div>';
    details.innerHTML = '<div class="preview-placeholder">Click on a project to see details</div>';
}


document.addEventListener('DOMContentLoaded', createRing);