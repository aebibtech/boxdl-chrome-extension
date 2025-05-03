let downloadUrl = null;
let downloadFilename = null; // Variable to store the filename

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download" && message.url) {
    console.log("Received download message:", message);

    // Use the filename from the message if provided, otherwise derive from URL
    const filename = (message.filename && typeof message.filename === 'string' && message.filename.trim() !== '') 
                      ? message.filename.trim() 
                      : message.url.split('/').pop().split('?')[0] || 'downloaded_file'; // Basic fallback
    
    console.log(`📥 Preparing download. URL: ${message.url}, Filename: ${filename}`);

    // Store URL and determined filename
    downloadUrl = message.url;
    downloadFilename = filename; 

    // Enable the action button (no change needed here)
    chrome.action.setIcon({
      path: {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
      },
      tabId: sender.tab.id
    });
    
    // Optional: Send a response back to content script if needed
    // sendResponse({ status: "received" }); 
  }
  // Return true if you intend to send a response asynchronously (optional)
  // return true; 
});

// Handle action button click
chrome.action.onClicked.addListener((tab) => {
  // Check if we have both URL and Filename stored
  if (downloadUrl && downloadFilename) { 
    console.log(`🖱️ Action clicked. Downloading ${downloadFilename} from ${downloadUrl}`);
    chrome.downloads.download({
      url: downloadUrl,
      filename: downloadFilename, // Use the stored filename
      saveAs: false // Set to true if you want the user to choose the save location/name
    });

    // Optional: Clear the stored details after initiating the download
    // downloadUrl = null;
    // downloadFilename = null;
    // Consider disabling the icon again here if needed

  } else {
    console.log("🖱️ Action clicked, but download URL or filename not ready.");
  }
});