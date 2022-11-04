/*
  _____                   _                _     _                                                                      
 |  __ \                 | |              | |   | |                                                                     
 | |__) |   ___    _ __  | |_    ___    __| |   | |__    _   _                                                          
 |  ___/   / _ \  | '__| | __|  / _ \  / _` |   | '_ \  | | | |                                                         
 | |      | (_) | | |    | |_  |  __/ | (_| |   | |_) | | |_| |                                                         
 |_|       \___/  |_|     \__|  \___|  \__,_|   |_.__/   \__, |                                                         
                                                          __/ |                                                         
                                                         |___/                                                          
                                _     _                     _       _   _          _                               _    
     /\                        | |   | |                   | |     | \ | |        | |                             | |   
    /  \     _ __ ___     ___  | |_  | |__    _   _   ___  | |_    |  \| |   ___  | |_  __      __   ___    _ __  | | __
   / /\ \   | '_ ` _ \   / _ \ | __| | '_ \  | | | | / __| | __|   | . ` |  / _ \ | __| \ \ /\ / /  / _ \  | '__| | |/ /
  / ____ \  | | | | | | |  __/ | |_  | | | | | |_| | \__ \ | |_    | |\  | |  __/ | |_   \ V  V /  | (_) | | |    |   < 
 /_/    \_\ |_| |_| |_|  \___|  \__| |_| |_|  \__, | |___/  \__|   |_| \_|  \___|  \__|   \_/\_/    \___/  |_|    |_|\_\
                                               __/ |                                                                    
                                              |___/                                                                     
*/
async function gs(app) {
    app.search.input.placeholder = 'Search library'
    app.search.back.style.display = 'inline';
    app.search.back.href = '#';

    app.main.library = app.createElement('div', await compileGs(app), {
        style: {
            'margin-bottom': '40px'
        }
    });
    app.main.emptySearch = app.createElement('div', [
        app.createElement('p', 'No results found.')
    ], {
        class: 'gs-empty',
        style: {
            display: 'none'
        }
    });
    app.main.player = app.createElement('div', [
        app.createElement('iframe', [], {
            class: 'gs-frame',
            events: {
                focus(event) {
                    event.target.contentWindow.focus();
                }
            },
            attrs: {
                tabindex: 1,
                src: 'about:blank'
            }
        }),
        app.createElement('p', [], {
            class: 'author'
        }),
        app.createElement('div', [], {
            class: 'description'
        })
    ], {
        class: 'gs-player',
        style: {
            display: 'none',
        } 
    });

    app.search.input.setAttribute(
        'oninput',
        '(' + (function() {
            let count = 0;

            app.main.library.querySelectorAll('.gs-entry').forEach(node => {
                if (node.getAttribute('data-title').toLowerCase().includes(app.search.input.value.toLowerCase())) {
                    node.setAttribute('data-active', '1');
                    count++;
                } else {
                    node.removeAttribute('data-active');
                };
            }); 

            app.main.library.querySelectorAll('.category').forEach(node => {
                if (!node.querySelectorAll('.gs-library .gs-entry[data-active]').length) {
                    node.style.display = 'none';
                } else {
                    node.style.removeProperty('display');
                };
            });

            if (!count) {
                app.main.library.style.display = 'none';
                app.main.emptySearch.style.display = 'block';
            } else {
                app.main.library.style.removeProperty('display');
                app.main.emptySearch.style.display = 'none';
            };
        }).toString() + ')()'
    )
};


async function compileGs(app) {
    const res = await fetch('./gs.json');
    const json = await res.json();

    const list = {
        multi: [],
        featured: [],
        web: [],
        indie: [],
        nes: [],
        snes: [],
        gba: [],
        sega: [],
        gfn: [],
        n64: [],
    };

    for (const entry of json) {
        const elem = app.createElement('div', [], {
            class: 'gs-entry',
            style: {
                background: `url(${entry.img})`,
                'background-size': 'cover'
            },
            attrs: {
                'data-title': entry.title,
                'data-active': '1'
            },
            events: {
                click(event) {
                    function foc() {
                        if (window.location.hash !== '#gs' || !app.main.player) {
                            return window.removeEventListener('click', foc);
                        };
                        app.main.player.querySelector('iframe').contentWindow.focus()
                    };
                    app.main.library.style.display = 'none';
                    app.main.player.style.display = 'block';
                    app.search.input.style.display = 'none';
                    app.search.title.style.display = 'block';
                    app.search.title.textContent = entry.title;

                    window.addEventListener('click', foc);

                    app.nav.fullscreen = app.createElement('button', 'fullscreen', {
                        class: 'submit', 
                        style: {
                            'font-family': 'Material Icons',
                            'font-size': '30px',
                            color: 'var(--accent)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        },
                        events: {
                            click() {
                                app.main.player.querySelector('iframe').requestFullscreen();
                                app.main.player.querySelector('iframe').contentWindow.focus();
                            }
                        }
                    });

                    app.main.player.querySelector('iframe').src = entry.location;
                    app.main.player.querySelector('.author').textContent = entry.author || '';
                    app.main.player.querySelector('.description').textContent = entry.description || '';

                    window.scrollTo({ top: 0 });

                    app.search.back.setAttribute(
                        'onclick', 
                        '(' + (() => {

                            if (window.location.hash !== '#gs') return this.removeAttribute('onclick');

                            event.preventDefault();
                            
                            app.main.library.style.removeProperty('display');
                            app.search.input.style.removeProperty('display');
                            app.search.title.style.display = 'none';
                            app.search.title.textContent = '';
                            app.main.player.style.display = 'none';
                            app.main.player.querySelector('iframe').src = 'about:blank';
                            delete app.nav.fullscreen;

                            this.removeAttribute('onclick');

                        }).toString() + ')()'
                    );
                   /*
                   nav(entry.location, entry.title, entry.img);
                   */
                }
            }        });

        if (entry.featured) {
            list.featured.push(elem);
        } else {
            (list[entry.category] || list.indie).push(elem);
        };
    };

    return [
        app.createElement('section', [
            app.createElement('span', 'Featured', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', list.featured, {
                class: 'gs-library'
            })
        ], {
            class: 'data-section featured category',
            attrs: {
                'data-category': 'featured'
            }
        }), 
        app.createElement('section', [
            app.createElement('span', 'Multiplayer', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', list.multi, {
                class: 'gs-library'
            })
        ], {
            class: 'data-section multi category',
            attrs: {
                'data-category': 'multi'
            }
        }),
        app.createElement('section', [
            app.createElement('span', 'Mobile & Web', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', list.web, {
                class: 'gs-library'
            })
        ], {
            class: 'data-section web category',
            attrs: {
                'data-category': 'web'
            }
        }),
        app.createElement('section', [
            app.createElement('span', 'Indie', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', list.indie, {
                class: 'gs-library'
            })
        ], {
            class: 'data-section indie category',
            attrs: {
                'data-category': 'indie'
            }
        }),
        app.createElement('section', [
            app.createElement('span', 'Nintendo', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', [ ...list.gba, ...list.snes, ...list.nes, ...list.n64 ], {
                class: 'gs-library'
            })
        ], {
            class: 'data-section nintendo category',
            attrs: {
                'data-category': 'nintendo'
            }
        }),
        app.createElement('section', [
            app.createElement('span', 'GeForce Now', {
                style: {
                    display: 'block',
                    'margin-bottom': '30px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('div', list.gfn, {
                class: 'gs-library'
            })
        ], {
            class: 'data-section gfn category',
            attrs: {
                'data-category': 'gfn'
            }
        })
    ]
};

export { gs };
