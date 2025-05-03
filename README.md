# Box Downloader Chrome Extension

This Chrome extension helps download files directly from Box preview pages.

## Installation (Development / Manual)

Follow these steps to load the extension directly from the source code:

1.  **Clone or Download:** Get a copy of this repository onto your local machine.
    ```bash
    git clone https://github.com/aebibtech/boxdl-chrome-extension.git
    # or download the ZIP and extract it
    ```
2.  **Open Chrome Extensions:** Open Google Chrome and navigate to `chrome://extensions/`.
3.  **Enable Developer Mode:** Ensure the "Developer mode" toggle switch in the top-right corner is turned ON.
4.  **Load Unpacked:** Click the "Load unpacked" button that appears.
5.  **Select Directory:** In the file selection dialog, navigate to and select the directory where you cloned or extracted the extension files (the folder containing `manifest.json`).
6.  **Done!** The extension should now appear in your list of extensions and be active.

## Usage

Once installed, navigate to a Box file preview page (e.g., a shared link). The extension icon should become active (colored). Click the icon to download the file with its original name.

## Contributing

Contributions are welcome! If you find a bug or have an idea for an improvement, please follow these steps:

1.  **Check Existing Issues:** Search the [Issues](https://github.com/aebibtech/boxdl-chrome-extension/issues) tab to see if your issue or idea has already been reported.
2.  **Open an Issue:** If not, open a new issue describing the bug or feature request.
3.  **Fork the Repository:** Create your own copy of the repository.
4.  **Create a Branch:** Make your changes in a dedicated branch.
5.  **Commit Changes:** Write clear commit messages.
6.  **Push and Open Pull Request:** Push your branch to your fork and open a pull request back to the main repository.

Please ensure your code follows the existing style and includes any necessary updates to documentation.

## Publishing (via GitHub Actions)

This repository is configured with a GitHub Action (`.github/workflows/publish.yml`) to automatically publish releases to the Chrome Web Store when changes are pushed to the `main` branch. This requires configuring repository secrets (`CWS_EXTENSION_ID`, `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET`, `CWS_REFRESH_TOKEN`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
