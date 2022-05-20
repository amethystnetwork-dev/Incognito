function access(app) {
    if (document.querySelector('header').hasAttribute('data-init')) {
        document.querySelector('header').removeAttribute('data-init')
    };

    app.search.back.style.display = 'none';
    app.search.logo.style.display = 'inline';
    app.search.logo.style.marginLeft = '0';
    app.search.submit.style.display = 'inline';
    app.search.input.style.removeProperty('display');
    app.search.input.placeholder = 'Search the web';
    app.header.target.setAttribute('data-page', '');
    app.nav.target.style.removeProperty('display');
    document.querySelector('#open-nav').setAttribute('data-open', '');
    
    app.nav.community = app.createLink('#community', 'Community');
    app.nav.support = app.createLink('#support', 'Support');
    app.nav.apps = app.createLink('#apps', 'Apps');
    app.nav.games = app.createLink('#gs', 'Games');
    app.nav.settings = app.createLink('#settings', '<i class="fas fa-sliders-h secondary"></i>', {
        id: 'apps'
    })

    app.main.suggestions = app.createElement('div', [], {
        class: 'suggestions',
        style: {
            display: 'block'
        } 
    });

    app.search.input.setAttribute(
        'oninput',
        '(' + (async function() {
            app.main.suggestions.innerHTML = '';
            if (!event.target.value) {
                app.nav.target.style.removeProperty('display');
                app.header.target.setAttribute('data-page', '');
                app.search.logo.style.display = 'inline';
                return;
            }
            app.header.target.removeAttribute('data-page');
            app.nav.target.style.display = 'none';
            app.search.logo.style.display = 'none';

            clearTimeout(app.timeout);
            app.timeout = setTimeout(async () => {
                const res = await fetch('https://incog.dev/bare/v1/', {
                    headers: {
                        'x-bare-host': 'duckduckgo.com',
                        'x-bare-protocol': 'https:',
                        'x-bare-path': '/ac/?q=' + encodeURIComponent(event.target.value),
                        'x-bare-port': '443',
                        'x-bare-headers': '{}',
                        'x-bare-forward-headers': '[]'
                    }
                })
                const json = await res.json();

                for (const suggestion of json) {
                    app.main.suggestions.append(
                        app.createElement('div', suggestion.phrase, {
                            class: 'suggestion',
                            events: {
                                click() {
                                    app.search.input.value = suggestion.phrase;
                                    const frame = document.querySelector('iframe');
                                    document.querySelector('main').style.display = 'none';
                                    document.querySelector('header').style.display = 'none';
                                    frame.style.display = 'block';
                                    frame.src = './load.html#' + encodeURIComponent(btoa(suggestion.phrase));
                                    document.querySelector('.access-panel').style.removeProperty('display');
                                }
                            }
                        })
                    )
                };
            }, 400);

        }).toString() + ')()'
    );
    app.search.input.setAttribute('form', 'access-form');
    app.search.submit.setAttribute('form', 'access-form');

    const params = new URLSearchParams(window.location.search);

    if (params.has('link')) {
        app.main.target.style.display = 'none';
        app.header.target.style.display = 'none';
        
        const frame = document.querySelector('.access-frame');

        frame.src = '/load.html#' + encodeURIComponent(params.get('link'));
        frame.style.display = 'block';

        document.querySelector('.access-panel').style.removeProperty('display');
        history.replaceState('', '', window.location.pathname + '#');
    };
};

export { access };