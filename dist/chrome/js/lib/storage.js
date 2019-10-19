import api from './api-wrapper.js';

const LOG_MAX_ENTRIES = 50;
const LOG_MAX_URL_LENGTH = 100;

const loadAllConfig = () =>
    new Promise((resolve, reject) => {
        api.genericStorage.get(['simplyLog', 'banTrackerDomains'])
            .then(value => {
                if (value)
                    resolve(value);
                else
                    resolve({
                        simplyLog: 1,
                        banTrackerDomains: 1
                    });
            })
            .catch(error => {
                reject(error);
            });
    });

const saveConfigItem = (field, value) =>
    new Promise((resolve, reject) => {
        const data = {};
        data[field] = value;
        api.genericStorage.set(data)
            .then(() => {
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });

const getRecentlyBlocked = () =>
    new Promise(resolve => {
        api.genericStorage.get('recentlyBlocked')
            .then(value => {
                let list;
                if (value && value.recentlyBlocked && 'string' === typeof value.recentlyBlocked)
                    list = value.recentlyBlocked;
                else
                    list = '';
                const vector = list.split('\n').slice(0, LOG_MAX_ENTRIES).join('\n');
                resolve(vector);
            });
    });

const addBlocked = url =>
    new Promise((resolve, reject) => {
        getRecentlyBlocked()
            .then(value => {
                const list = value.split('\n');
                let shortenedUrl = url.length <= LOG_MAX_URL_LENGTH ?
                    url :
                    url.slice(0, LOG_MAX_URL_LENGTH / 2 - 2) + '····' + url.slice(-LOG_MAX_URL_LENGTH / 2 + 2);
                const line = `${new Date().toLocaleString()} → ${shortenedUrl}`;
                list.unshift(line);
                api.genericStorage.set({recentlyBlocked: list.join('\n')})
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
    });

export {loadAllConfig, saveConfigItem, getRecentlyBlocked, addBlocked};
