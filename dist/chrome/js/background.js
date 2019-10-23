import api from './api-wrapper.js';

const windowOptions = {
    url: '../pages/glyphs.html',
    type: 'normal',
    state: 'maximized'
};

let promise = null;
let popup = null;

const show = () => {
    if (null === promise && null === popup) {
        promise = api.windows.create(windowOptions);
        if (promise)
            promise.then(
                w => {
                    popup = w.id;
                    promise = null;
                },
                err => console.debug(err)
            );
    } else
        api.windows.update(popup, { focused: true });
};

api.browserAction.onClicked.addListener(show);

api.commands.onCommand.addListener(command => {
    if (command === 'show')
        show();
});

api.windows.onRemoved.addListener(id => {
    if (null !== popup && id === popup)
        promise = null;
    popup = null;
});
