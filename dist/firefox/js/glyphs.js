let items = [];
let row;
let col;
let data;
let abortWizard = false;

const moveCursor = dir => {
    const height = items.length;
    const width = items[row].length;
    items[row][col].classList.remove('highlight');
    if ('ArrowRight' === dir || 'KeyL' === dir || 'KeyD' === dir) {
        col = (col + 1) % width;
    } else if ('ArrowLeft' === dir || 'KeyJ' === dir || 'KeyA' === dir) {
        col = (col + width - 1) % width;
    } else if ('ArrowDown' === dir || 'KeyK' === dir || 'KeyS' === dir) {
        row = (row + 1) % height;
        col = 0;
    } else if ('ArrowUp' === dir || 'KeyI' === dir || 'KeyW' === dir) {
        row = (row + height - 1) % height;
        col = 0;
    }
    items[row][col].classList.add('highlight');
};

const processKey = e => {
    abortWizard = true;
    if ('ArrowLeft' === e.code || 'ArrowRight' === e.code || 'ArrowUp' === e.code || 'ArrowDown' === e.code ||
        'KeyJ' === e.code || 'KeyL' === e.code || 'KeyI' === e.code || 'KeyK' === e.code ||
        'KeyA' === e.code || 'KeyD' === e.code || 'KeyW' === e.code || 'KeyS' === e.code)
        moveCursor(e.code);
    else if ('Space' === e.code) {
        items[row][col].classList.add('selected');
        data += items[row][col].innerText;
    } else if ('Enter' === e.code) {
        const glyph = items[row][col].innerText;
        navigator.clipboard.writeText(data + glyph)
            .catch(err => {
                console.debug(err);
            })
            .finally(() => {
                window.close();
            });
    } else if ('Escape' === e.code || 'Delete' === e.code || 'Backspace' === e.code)
        window.close();
};

const build = () => {
    const sections = document.getElementsByTagName('section');
    for (let i of sections)
        items.push(i.getElementsByTagName('div'));
    row = col = 0;
    data = '';
};

const showWizard = () => {
    const overlay = document.getElementsByTagName('aside');
};

const init = () => {
    build();
    document.addEventListener('keydown', processKey);
    window.setTimeout(showWizard, 1000);
};

window.addEventListener('load', init);
