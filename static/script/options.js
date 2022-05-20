import { Selection } from './selection.js';
import { Tabs } from './tabs.js';

async function options(app) {
    document.querySelector('#open-nav').setAttribute('data-open', '');
    app.search.title.style.display = 'block';
    app.search.title.textContent = 'Options';
    app.search.input.style.display = 'none';

    const tabs = new Tabs(app);
    const selection = new Selection(app);

    const backgroundSelection = new Selection(app);
    

    [
        {
            id: 'ocean',
            content: 'Ocean',
        },
        {
            id: 'midnight',
            content: 'Midnight',
        },
        {
            id: 'space',
            content: 'Space'
        },
        {
            id: 'morning',
            content: 'Morning',
        },
        {
            id: 'terminal',
            content: 'Terminal',
        },
        {
            id: 'resilent',
            content: 'Resilient',
        }
    ].forEach(entry => {
        selection.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });

    [
        {
            id: 'stars',
            content: 'Stars',
        },
        {
            id: 'particles',
            content: 'Particles'
        },
        {
            id: 'none',
            content: 'None'
        }
    ].forEach(entry => {
        backgroundSelection.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });

    backgroundSelection.on('select', id => {
        if (id in backgroundSelection.selectors) {
            backgroundSelection.selectors[id].setAttribute('data-selected', '');
        };

        if (id === 'none') {
            app.destroyParticles();
        } else if (localStorage.getItem('incog||background') !== id) {
            switch(id) {
                case 'stars':
                app.destroyParticles();
                particlesJS.load('.particles', './json/stars.json');
                break;
            case 'particles':
                app.destroyParticles();
                particlesJS.load('.particles', './json/particles.json'); 
            };
        };

        localStorage.setItem('incog||background', id);
    })

    selection.on('select', id => {
        if (id in selection.selectors) {
            selection.selectors[id].setAttribute('data-selected', '');
        };
        document.body.setAttribute('data-appearance', id);
        localStorage.setItem('incog||appearance', id);
    });

    selection.switchSelector(localStorage.getItem('incog||appearance'));
    backgroundSelection.switchSelector((localStorage.getItem('incog||background') || 'none'));

    tabs.on('switch', id => {
        document.querySelectorAll('[data-selected]').forEach(node => {
            node.removeAttribute('data-selected');
        });
        if (app.nav[id]) {
            app.nav[id].setAttribute('data-selected', '');
        };
    });

    tabs.createTab('appearance', app.createElement(
        'div',
        [
            app.createElement('section', [
                app.createElement('span', 'Theme', {
                    style: {
                        display: 'block',
                        'margin-bottom': '10px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                selection.element
            ], {
                class: 'data-section'
            }),
            app.createElement('section', [
                app.createElement('span', 'Background', {
                    style: {
                        display: 'block',
                        'margin-bottom': '10px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                backgroundSelection.element
            ], {
                class: 'data-section'
            })
        ],
        {
            class: 'appearance',
        }
    ));


    tabs.createTab('tabs', app.createElement(
        'div',
        [
            app.createElement('section', [
                app.createElement('span', 'Tab Title', {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                app.createElement('input', [], {
                    attrs: {
                        value: document.title,
                        placeholder: 'Empty title'
                    },
                    style: {
                        width: '300px',
                    },
                    events: {
                        input(event) {
                            document.title = event.target.value;
                            localStorage.setItem('incog||title', event.target.value);
                        }
                    }
                }),
                app.createElement('p', 'Change the title of Incognito\'s browser tab title.', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], {
                class: 'data-section'
            }),
            app.createElement('section', [
                app.createElement('span', 'Tab Icon', {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                app.createElement('input', [], {
                    attrs: {
                        value: app.icon.href,
                        placeholder: 'No icon'
                    },
                    style: {
                        width: '300px',
                    },
                    events: {
                        input(event) {
                            app.icon.href = event.target.value;
                            localStorage.setItem('incog||icon', event.target.value);
                        }
                    }
                }),
                app.createElement('p', 'Change the icon of Incognito\'s browser tab. To change it into something like Google, type in "https://www.google.com/favicon.ico"', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], {
                class: 'data-section'
            })
        ]
    ));

    tabs.createTab('about', app.createElement(
        'div', 
        
        await createAbout(app)
        )
    )
    
    app.nav.about = app.createElement('a', 'About', {
        events: {
            click() {
                tabs.switchTab('about');
            }
        },
        id: 'about'
    });


    app.nav.tabs = app.createElement('a', 'Browser Tab', {
        events: {
            click() {
                tabs.switchTab('tabs');
            }
        },
        id: 'tabs'
    });

    app.nav.appearance = app.createElement('a', 'Appearance', {
        events: {
            click() {
                tabs.switchTab('appearance');
                selection.switchSelector((localStorage.getItem('incog||appearance') || 'ocean'));
            }
        },
        id: 'appearance',
    });

    tabs.switchTab('appearance');


    app.search.back.style.display = 'inline';
    app.search.back.setAttribute(
        'onclick',
        '(' + (function(){
            window.location.hash = '';
        }).toString() + ')();'
    )
    app.main.content = tabs.element;
}

async function createAbout(app) {
    const res = await fetch('./about.json');
    const json = await res.json();
    
    const authors = [];
    const socials = [];
    const contacts = [];

    for (const entry of json.authors) {
        authors.push(
            app.createElement('p', `${entry.name}${entry.data ? ' - ' + entry.data : ''}`, {
                style: {
                    'margin-bottom': '0'
                }
            })
        )
    };

    for (const entry of json.socials) {
        socials.push(
            app.createElement('p', `${entry.name}${entry.data ? ' - ' + entry.data : ''}`, {
                style: {
                    'margin-bottom': '0'
                }
            })
        )
    };

    for (const entry of json.contact) {
        contacts.push(
            app.createElement('p', `${entry.name}${entry.data ? ' - ' + entry.data : ''}`, {
                style: {
                    'margin-bottom': '0'
                }
            })
        )
    };

    return [
        app.createElement('section', [
            app.createElement('span', json.main.title, {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('p', json.main.data, {
                style: {
                    'margin-bottom': '0'
                }
            })
        ], {
            class: 'data-section'
        }),
        app.createElement('section', [
            app.createElement('span', 'Authors', {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', authors)
        ], {
            class: 'data-section'
        }),
        app.createElement('section', [
            app.createElement('span', 'Socials', {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', socials)
        ], {
            class: 'data-section'
        }),
        contacts.length ? app.createElement('section', [
            app.createElement('span', 'Contact', {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', contacts)
        ], {
            class: 'data-section'
        }) : null
    ];


};

export { options };