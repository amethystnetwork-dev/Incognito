async function support(app) {
    app.search.title.style.display = 'block';
    app.search.title.textContent = 'Support';
    app.search.input.style.display = 'none';
    app.main.support = app.createElement(
        'div', 
        await getData(app));
        app.search.back.style.display = 'inline';
    app.search.back.setAttribute(
        'onclick',
        '(' + (function(){
            window.location.hash = '';
        }).toString() + ')();'
    )
};

async function getData(app) {
    const res = await fetch('./support.json');
    const json = await res.json();

    const entries = [];

    for (const entry of json) {
        entries.push(
            app.createElement('section', [
                app.createElement('span', entry.question, {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                app.createElement('p', entry.answer, {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], {
                class: 'data-section'
            })
        )
    };
    return entries;
};
 
export { support };