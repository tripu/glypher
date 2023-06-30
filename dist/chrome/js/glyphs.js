let items = [];
let row;
let col;
let pos = 0;
let data;
let abortWizard = false;

const stopWizard = now => {
    if (now || abortWizard) {
        abortWizard = true;
        const overlay = document.getElementsByTagName('aside').item(0);
        overlay.style.display = 'none';
        return true;
    } else
        return false;
};

const moveCursor = dir => {
    items[row][col].classList.remove('highlight');
    if ('ArrowRight' === dir || 'KeyL' === dir || 'KeyD' === dir) {
        const width = items[row].length;
        col = (col + 1) % width;
        pos = col / width;
    } else if ('ArrowLeft' === dir || 'KeyJ' === dir || 'KeyA' === dir) {
        const width = items[row].length;
        col = (col + width - 1) % width;
        pos = col / width;
    } else if ('ArrowDown' === dir || 'KeyK' === dir || 'KeyS' === dir) {
        const height = items.length;
        row = (row + 1) % height;
        const width = items[row].length;
        col = Math.floor(pos * width);
    } else if ('ArrowUp' === dir || 'KeyI' === dir || 'KeyW' === dir) {
        const height = items.length;
        row = (row + height - 1) % height;
        const width = items[row].length;
        col = Math.floor(pos * width);
    }
    items[row][col].classList.add('highlight');
};

const processKey = e => {
    stopWizard(true);
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
    if (!stopWizard())
        setTimeout(() => {
            if (!stopWizard()) {
                const overlay = document.getElementsByTagName('aside').item(0);
                overlay.style.display = 'block';
                requestAnimationFrame(() => {
                    overlay.style.opacity = 1;
                    setTimeout(() => {
                        if (!stopWizard()) {
                            moveCursor('ArrowDown');
                            setTimeout(() => {
                                if (!stopWizard()) {
                                    moveCursor('ArrowRight');
                                    setTimeout(() => {
                                        if (!stopWizard())
                                            moveCursor('ArrowRight');
                                    }, 1000);
                                }
                            }, 1000);
                        }
                    }, 1000);
                });
            }
        }, 1000);
};

const init = () => {
    build();
    document.addEventListener('keydown', processKey);
    // window.setTimeout(showWizard, 1000);
};

window.addEventListener('load', init);
