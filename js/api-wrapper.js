let _found_api;

/**
 * Build a tiny pseudo-API based on the browser's own.
 *
 * @param {object} root - a browser's valid API object
 */

if ('undefined' !== typeof browser && browser.windows && browser.commands && browser.action)
    _found_api = browser;
else if ('undefined' !== typeof chrome && chrome.windows && chrome.commands) {
    if (chrome.action)
        _found_api = chrome;
    else if (chrome.browserAction) {
        const wrapper = Object.create(chrome);
        wrapper.action = chrome.browserAction;
        _found_api = wrapper;
    }
}

if (!_found_api)
    throw new Error(`glypher/api-wrapper: ERROR: cannot detect a valid browser API!`);

export default _found_api;
