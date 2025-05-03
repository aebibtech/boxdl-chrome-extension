let intervalIdHolder = { id: null };

// Renamed function to reflect it finds more than just links
function findDownloadDetails() {
  const entries = performance.getEntries();

  // Find the first matching entry for the URL
  const firstMatch = entries.find(entry => {
    const isBox =
      entry.name.includes("public.boxcloud.com/api/2.0/files") ||
      entry.name.includes("dl.boxcloud.com/api/2.0/files");
    const isPreview = isBox && entry.name.includes("content?preview=true");
    const isInternalFiles =
      entry.name.includes("internal_files") &&
      entry.name.includes("pdf");

    return isPreview || isInternalFiles;
  });

  if (firstMatch) {
    console.log(" Found matching URL:", firstMatch.name);
    clearInterval(intervalIdHolder.id); // Stop checking once found

    // --- Find the filename --- 
    let filename = "downloaded_file"; // Default filename
    // Use the provided selector to find the filename element
    const filenameElement = document.querySelector('.SharedFileHeaderContent-name'); 
    if (filenameElement) {
        // Get the text content and remove leading/trailing whitespace
        filename = filenameElement.textContent.trim(); 
        console.log("Found filename:", filename);
    } else {
        console.log("Filename element not found using selector '.SharedFileHeaderContent-name'.");
        // Consider adding fallback selectors or logic here if needed
    }
    // --- End Find Filename ---

    // Send URL and filename to background script
    chrome.runtime.sendMessage({ 
        action: "download", 
        url: firstMatch.name,
        filename: filename // Include the extracted filename
    });

  } else {
    // Keep this log minimal or remove it if it's too noisy during normal operation
    // console.log(" No matching download URL found yet."); 
  }
}

// --- Initiate Search --- 
// Clear any previous interval just in case the script re-runs
if (intervalIdHolder.id) {
    clearInterval(intervalIdHolder.id);
}

// Run the check periodically until found
// Check more frequently initially, then maybe less often if needed?
// Using 500ms interval for faster detection.
intervalIdHolder.id = setInterval(findDownloadDetails, 500); 

// Also run an initial check shortly after the script loads
// Use a slightly shorter delay like 200ms
setTimeout(findDownloadDetails, 200);