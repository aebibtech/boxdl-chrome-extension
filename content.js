let intervalIdHolder = { id: null };

function findDownloadLinks() {
  const entries = performance.getEntries();

  // Find the first matching entry
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
    clearInterval(intervalIdHolder.id);
    // Send URL to background script to enable the download button
    chrome.runtime.sendMessage({ action: "download", url: firstMatch.name });
  } else {
    console.log(" No matching URL found.");
  }
}

// Give the page some time to finish loading resources
intervalIdHolder.id = setInterval(findDownloadLinks, 1000);