let downloadUrl = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "download" && message.url) {
    console.log("📥 Downloading:", message.url);

    const filename = message.url.split('/').pop().split('?')[0] || 'downloaded_file.pdf';
    downloadUrl = message.url;

    // Enable the action button
    chrome.action.setIcon({
      path: {
        "16": "icon.png",
        "48": "icon.png",
        "128": "icon.png"
      },
      tabId: sender.tab.id
    });
  }
});

// Handle action button click
chrome.action.onClicked.addListener((tab) => {
  if (downloadUrl) {
    chrome.downloads.download({
      url: downloadUrl,
      filename: downloadUrl.split('/').pop().split('?')[0] || 'downloaded_file.pdf',
      saveAs: false
    });
  }
});