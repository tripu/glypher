document.addEventListener('keydown', e => {
    if ('Escape' === e.code || 'Enter' === e.code)
        window.close();
});
