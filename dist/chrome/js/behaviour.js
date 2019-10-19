import api from './lib/api-wrapper.js';
import { loadAllConfig, addBlocked } from './lib/storage.js';
import heuristics from './heuristics/index.js';

const MINIMUM_TRACKER_THRESHOLD = .75;

const FILTER = {
    urls: ['<all_urls>']
};

const EXTRA_INFO_SPEC = ['blocking'];

const generateListener = event =>
    async details => {
        const probabilities = [];
        const handlers = [];
        const config = await loadAllConfig();
        heuristics.forEach(h => {
            const id = h.id;
            const evaluators = h.evaluators;
            let weight = 1;
            if (config && config[id])
                weight = config[id];
            if (weight > 0 && evaluators.hasOwnProperty(event)) {
                const result = evaluators[event](details);
                probabilities.push(result.trackerProbability * weight);
                if (result.handler)
                    handlers.push(result.handler);
            }
        });
        // if (handlers.length > 0) {
        //     let filter = api.webRequest.filterResponseData(details.requestId);
        //     let decoder = new TextDecoder("utf-8");
        //     let encoder = new TextEncoder();
        //     filter.ondata = event => {
        //       let str = decoder.decode(event.data, {stream: true});
        //       str = str.replace(/Example/g, 'WebExtension Example');
        //       filter.write(encoder.encode(str));
        //       filter.disconnect();
        //     }
        // }
        const blocked = -1 !== probabilities.findIndex(p => p >= MINIMUM_TRACKER_THRESHOLD);
        if (blocked)
            addBlocked(details.url)
                .then(() => {
                    console.debug(`blocktrack: ${details.url} blocked`);
                })
                .catch(error => {
                    throw new Error(`blocktrack: ERROR: cannot log blocked URL!`);
                });
        return {cancel: blocked};
    };

api.webRequest.onBeforeRequest.addListener(generateListener('onBeforeRequest'), FILTER, [...EXTRA_INFO_SPEC, 'requestBody']);
api.webRequest.onHeadersReceived.addListener(generateListener('onHeadersReceived'), FILTER, [...EXTRA_INFO_SPEC, 'responseHeaders']);
