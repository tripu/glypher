let _found_api;

/**
 * Build a tiny pseudo-API based on the browser's own.
 *
 * @param {object} root - a browser's valid API object
 */

const populateAPI = root =>
    ({
        webRequest: root.webRequest,
        runtime: root.runtime
    });

/**
 * Promisify Chromium/Chrome's callback-based storage methods.
 *
 * cf https://developer.chrome.com/extensions/storage
 *
 * @param {object} root - Chromium/Chrome's valid API object
 */

 const promisifyGetterAndSetter = root =>
    ({
        get: data =>
            new Promise((resolve, reject) => {
                root.storage.sync.get(data, result => {
                    if (root.runtime.lastError)
                        reject(root.runtime.lastError.message);
                    else
                        resolve(result);
                });
            }),
        set: data =>
            new Promise((resolve, reject) => {
                root.storage.sync.set(data, result => {
                    if (root.runtime.lastError)
                        reject(root.runtime.lastError.message);
                    else
                        resolve(result);
                });
            }),
    });

if ('undefined' !== typeof browser && browser.webRequest && browser.runtime && browser.storage) {
    _found_api = populateAPI(browser);
    _found_api.genericStorage = browser.storage.sync;
} else if ('undefined' !== typeof chrome && chrome.webRequest && chrome.runtime && chrome.storage) {
    _found_api = populateAPI(chrome);
    _found_api.genericStorage = promisifyGetterAndSetter(chrome);
} else
    throw new Error(`blocktrack/api-wrapper: ERROR: cannot detect a valid browser API!`);

export default _found_api;
