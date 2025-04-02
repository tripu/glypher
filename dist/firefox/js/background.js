import api from './api-wrapper.js';

const windowOptions = {
    url: '../pages/glyphs.html',
    type: 'normal', // normal popup
    state: 'maximized' // maximized fullscreen
};

let popup = null;

const processNewWindow = w => popup = w.id;

const show = () => {
    if (null === popup) {
        popup = 'OPENING';
        // Include callback in case we're on Chrom*:
        const promise = api.windows.create(windowOptions, processNewWindow);
        if (promise)
            // ie, FF:
            promise
                .then(processNewWindow)
                .catch(err => console.debug(err));
    } else if ('number' === typeof popup)
        api.windows.update(popup, { focused: true });
};

api.action.onClicked.addListener(show);

api.commands.onCommand.addListener(command => {
    if (command === 'show')
        show();
});

api.windows.onRemoved.addListener(id => {
    if (null !== popup && 'number' === typeof popup && id === popup)
        popup = null;
});
