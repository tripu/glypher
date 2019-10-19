import { loadAllConfig, saveConfigItem } from '../js/lib/storage.js';

const values = {};
let simplyLog, banTrackerDomains;

const loadConfig = () =>
    loadAllConfig()
        .then(value => {
            simplyLog.value = value.simplyLog;
            banTrackerDomains.value = value.banTrackerDomains;
            values.simplyLog.innerHTML = simplyLog.value < .01 ? 'OFF' : simplyLog.value;
            values.banTrackerDomains.innerHTML = banTrackerDomains.value < .01 ? 'OFF' : banTrackerDomains.value;
        })
        .catch(error => {
            throw new Error(error);
        });

const saveConfig = event => {
    if (event && event.currentTarget && event.currentTarget.id) {
        const field = event.currentTarget.id;
        const value = event.currentTarget.value;
        saveConfigItem(field, value)
            .then(() => {
                values[field].innerHTML = value < .01 ? 'OFF' : value;
            })
            .catch(error => {
                throw new Error(error);
            });
    } else
        throw new Error(`blocktrack/options: ERROR: cannot read change of settings!`);
};

const init = () => {
    simplyLog = document.getElementById('simplyLog');
    values.simplyLog = document.getElementById('simplyLogValue');
    banTrackerDomains = document.getElementById('banTrackerDomains');
    values.banTrackerDomains = document.getElementById('banTrackerDomainsValue');
    simplyLog.addEventListener('change', saveConfig);
    banTrackerDomains.addEventListener('change', saveConfig);
    loadConfig();
};

window.addEventListener('load', init);
