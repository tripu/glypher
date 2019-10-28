// let sections = [];
let items = [];
let row;
let col;

const moveCursor = dir => {
    const height = items.length;
    const width = items[row].length;
    items[row][col].classList.remove('highlight');
    if ('ArrowRight' === dir) {
        col = (col + 1) % width;
    } else if ('ArrowLeft' === dir) {
        col = (col + width - 1) % width;
    } else if ('ArrowDown' === dir) {
        row = (row + 1) % height;
        col = 0;
    } else if ('ArrowUp' === dir) {
        row = (row + height - 1) % height;
        col = 0;
    }
    items[row][col].classList.add('highlight');
};

const processKey = e => {
    if ('Escape' === e.code)
        window.close();
    else if ('ArrowLeft' === e.code || 'ArrowRight' === e.code || 'ArrowUp' === e.code || 'ArrowDown' === e.code)
        moveCursor(e.code);
    else if ('Enter' === e.code) {
        const glyph = items[row][col].innerText;
        const copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: glyph });
        document.dispatchEvent(copyEvent);
        // window.close();
    }
};

const build = () => {
    const sections = document.getElementsByTagName('section');
    for (let i of sections) {
        items.push(i.getElementsByTagName('div'));
    }
    row = col = 0;
};

const init = () => {
    build();
    document.addEventListener('keydown', processKey);
};

window.addEventListener('load', init);
