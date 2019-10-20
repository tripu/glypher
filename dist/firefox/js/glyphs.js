import api from '../lib/api-wrapper.js';

var createData = {
    type: "panel",
    url: "../pages/list.html",
    state: 'maximized'
};

api.browserAction.onClicked.addListener(function () {
    var creating = api.windows.create(createData);
    // var creating = api.tabs.create({ active: true, url: '../pages/list.html' });
});
