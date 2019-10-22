import api from './lib/api-wrapper.js';

var createData = {
    type: "normal",
    url: "../pages/list.html",
    state: 'maximized'
};

const open = function () {
    api.windows.create(createData);
};

api.commands.onCommand.addListener(function (command) {
    if (command === "foo") {
        open();
    }
});
