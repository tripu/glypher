let _found_api;

/**
 * Build a tiny pseudo-API based on the browser's own.
 *
 * @param {object} root - a browser's valid API object
 */

const populateAPI = root =>
    ({
        windows: root.windows,
        tabs: root.tabs
    });

if ('undefined' !== typeof browser && browser.windows && browser.tabs)
    _found_api = populateAPI(browser);
else if ('undefined' !== typeof chrome && chrome.windows && chrome.tabs)
    _found_api = populateAPI(chrome);
else
    throw new Error(`glypher/api-wrapper: ERROR: cannot detect a valid browser API!`);

export default _found_api;
