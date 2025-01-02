# Personio Forms Autofiller
This is a Chrome extension to fill Personio forms automatically.

## How to install the extension
To install the extension in Chrome:
- Open the page: chrome://extensions
- Go to "Chrome Web Store"
- Search for Personio Forms Autofiller
- Click "Add to Chrome"

## How to use the extension
- When the installation process is done, click on Extensions and Pin the extension.
- Click on the extension icon in the top right.
- Check Start and End dates fields. They are Monday and Thursday of the current week. You might change them as you need.
- Click `Request "Work From Home"` button.
- The extension will quickly open the Request Absence dialog and automatically fill all the fields and create the Request. Also it will automatically open the Absence calendar page in the new tab so you can check the created request.

## Information for developers

### How to start working on any changes
- Clone the repository and run `npm install`.
- Build the project running `npm run watch`.
- Add your HTML to popup.html.
- Add popup JavaScript in src/popup.js.
- Add your JavaScript changes in src/index.js or imported JS files.
- Load the extension in Chrome in developer mode: Open chrome://extensions, enable "Developer mode" in the top right corner, click "Load unpacked" and select the folder that contains the extension files.
- When you make any changes click "Update" button.
- When you are ready for production build run `npm run prod`.

### Popup.html
The popup.html file is the main HTML file for the extension popup.

### JavaScript and CSS
The extension/popup.js file is the main JavaScript file which is included into the popup.html.

### Useful commands
- `npm run watch`: Starts a Webpack watch process, automatically rebuilding the extension whenever changes are made to the source files.
- `npm run dev`: Builds the extension in development mode, using Webpack's development settings.
- `npm run prod`: Builds the extension in production mode.
- `npm run clean`: Removes the generated files (bundle.js, bundle.js.map).
