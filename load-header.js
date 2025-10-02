function highlightActiveLink() {
  let currentPath = window.location.href.split('/');
  const currentPage = currentPath[currentPath.length - 1]
  console.log("Current path",currentPath ? currentPath: "none");
  console.log(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) {
        console.error("Error: The required element '#header-placeholder' was not found.");
        return; 
    }
    // Fetch and inject the header
    fetch('header.html')
      // Check if the file was loaded successfully
      .then(response => {
        if (!response.ok) {
          // Throw an error if the file is not found (404) or fails to load
          throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        // Insert the fetched HTML content into the placeholder
        placeholder.innerHTML = data;
        // Highlight the current page's link after the header is inserted
        highlightActiveLink();
      })
      .catch(error => {
        console.error(`An error occured while loading the header`, error);
        placeholder.innerHTML = '<p style="color: #000080; text-align:center;">Error: Navigation could not be loaded.</p>';
      });
});