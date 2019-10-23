let _found_api;

/**
 * Build a tiny pseudo-API based on the browser's own.
 *
 * @param {object} root - a browser's valid API object
 */

if ('undefined' !== typeof browser && browser.windows && browser.commands && browser.browserAction)
    _found_api = browser;
else if ('undefined' !== typeof chrome && chrome.windows && chrome.commands && chrome.browserAction)
    _found_api = chrome;
else
    throw new Error(`glypher/api-wrapper: ERROR: cannot detect a valid browser API!`);

export default _found_api;
