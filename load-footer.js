document.addEventListener('DOMContentLoaded', () => {
    const footerElement = document.querySelector("footer");
    if (!footerElement) {
        console.error("Error: The footer element was not found.");
        return; 
    }
    // Fetch and inject the footer
    fetch('footer.html')
      // Check if the file was loaded successfully
      .then(response => {
        if (!response.ok) {
          // Throw an error if the file is not found (404) or fails to load
          throw new Error(`Failed to load footer: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        // Insert the fetched HTML content into the footer
        footerElement.innerHTML = data;
      })
      .catch(error => {
        console.error(`An error occured while loading the footer`, error);
        footerElement.innerHTML = '<p style="color: #000080; text-align:center;">Error: Footer could not be loaded.</p>';
      });
});