import api from '../js/lib/api-wrapper.js';
import { getRecentlyBlocked } from '../js/lib/storage.js';

let _recent;

const openOptions = () => {
    api.runtime.openOptionsPage();
};

const refresh = () => {
    getRecentlyBlocked()
        .then(value => {
            recent.innerText = value;
            setTimeout(refresh, 500);
        });
};

const init = () => {
    const linkToOptions = document.getElementById('options');
    linkToOptions.addEventListener('click', openOptions);
    _recent = document.getElementById('recent');
    refresh();
};

window.addEventListener('load', init);
