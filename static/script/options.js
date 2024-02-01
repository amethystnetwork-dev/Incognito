/**
 * Incognito
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
import { Selection } from './selection.js';
import { Tabs } from './tabs.js';

async function options(app) {
    document.querySelector('#open-nav').setAttribute('data-open', '');
    app.search.title.style.display = 'block';
    app.search.title.textContent = 'Options';
    app.search.input.style.display = 'none';

    const tabs = new Tabs(app);

    const themes = [
        { id: 'ocean', content: 'Ocean' },
        { id: 'midnight', content: 'Midnight' },
        { id: 'simple', content: 'Simple' },
        { id: 'space', content: 'Space' },
        { id: 'morning', content: 'Morning' },
        { id: 'terminal', content: 'Terminal' },
        { id: 'resilent', content: 'Resilient' },
        { id: 'fancy', content: 'Fancy' }
    ]

    const backgroundThemes = [
        { id: 'particles', content: 'Particles' },
        { id: 'stars', content: 'Stars' },
        { id: 'none', content: 'None' }
    ]

    const searchEngines = [
        { id: 'google', content: 'Google' },
        { id: 'ddg', content: 'DuckDuckGo' },
        { id: 'bing', content: 'Bing' },
        { id: 'brave', content: 'Brave' },
        { id: 'startpage', content: 'Startpage' }
    ]

    const searchEngineSuggestions = [
        ...searchEngines,
        { id: 'ecosia', content: 'Ecosia' },
        { id: 'none', content: 'None' }
    ]

    const enableTips = [
        { id: 'enabled', content: 'Enabled' },
        { id: 'none', content: 'None' }
    ]

    const selection = new Selection(app);
    const backgroundSelection = new Selection(app);
    const searchSelection = new Selection(app);
    const searchSuggestionSelection = new Selection(app);
    const disableTips = new Selection(app);

    themes.forEach(entry => {
        selection.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });
    selection.on('select', id => {
        if (id in selection.selectors) {
            selection.selectors[id].setAttribute('data-selected', '');
        };
        document.body.setAttribute('data-appearance', id);
        localStorage.setItem('incog||appearance', id);
    });
    selection.switchSelector((localStorage.getItem('incog||appearance') || 'ocean'));
    
    backgroundThemes.forEach(entry => {
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
                case 'particles':
                    app.destroyParticles();
                    particlesJS.load('.particles', './json/particles.json'); 
                    break;
                case 'stars':
                app.destroyParticles();
                particlesJS.load('.particles', './json/stars.json');
            };
        };
        localStorage.setItem('incog||background', id);
    })
    backgroundSelection.switchSelector((localStorage.getItem('incog||background') || 'none'));

    searchEngines.forEach(entry => {
        searchSelection.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });
    searchSelection.on('select', id => {
        if (id in searchSelection.selectors) {
            searchSelection.selectors[id].setAttribute('data-selected', '');
        };
        localStorage.setItem('incog||search', id)
    })

    searchEngineSuggestions.forEach(entry => {
        searchSuggestionSelection.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });
    searchSuggestionSelection.on('select', id => {
        if (id in searchSuggestionSelection.selectors) {
            searchSuggestionSelection.selectors[id].setAttribute('data-selected', '');
        };
        localStorage.setItem('incog||suggestions', id)
    })

    // I am not going to style a on-off switch
    enableTips.forEach(entry => {
        disableTips.createSelector(entry.id, app.createElement('li', entry.content, {
            class: 'selector'
        }))
    });

    disableTips.on('select', id => {
        if (id in disableTips.selectors) {
            disableTips.selectors[id].setAttribute('data-selected', '');
        };
        localStorage.setItem('incog||disabletips', id)
    })

    disableTips.switchSelector((localStorage.getItem('incog||disabletips') || 'enabled'));

    tabs.on('switch', id => {
        document.querySelectorAll('[data-selected]').forEach(node => {
            node.removeAttribute('data-selected');
        });
        if (app.nav[id]) {
            app.nav[id].setAttribute('data-selected', '');
        };
    });

    tabs.createTab('appearance', app.createElement('div', [
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
            ], { class: 'data-section' }),
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
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('span', 'Tips', {
                    style: {
                        display: 'block',
                        'margin-bottom': '10px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                disableTips.element
            ], {
                class: 'data-section'
            }),
            app.createElement('section', [
                app.createElement('button', 'Reset Appearance', {
                    style: {
                        'width': '300px',
                        display: 'inline-block',
                        'padding': '14px 18px',
                        'margin': '5px 0',
                        'color': 'var(--text-color)',
                        'text-decoration': 'none',
                        'font-size': '14px',
                        'background': '0 0',
                        'border': '1px solid var(--border-color)',
                        'border-radius': '2px',
                        'outline': 'none',
                        'font-family': 'inherit',
                    },
                    events: {
                        click() {
                            localStorage.removeItem('incog||appearance')
                            localStorage.removeItem('incog||background')
                            localStorage.removeItem('incog||disabletips')
                            window.location.hash = '';
                            window.location.reload()
                        }
                    }
                })
            ], { class: 'data-section' })
    ], { class: 'appearance' }));

    tabs.createTab('tabs', app.createElement('div', [
        app.createElement('section', [
            app.createElement('span', 'Auto Tab', {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
            app.createElement('input', [], {
                attrs: {
                    placeholder: 'Enter a URL'
                },
                style: {
                    width: '300px',
                },
                events: {
                    keydown(event) {
                        if(event.key === 'Enter') {
                            if(!(event.target.value == null || event.target.value == '')) {
                                var url;
                                try {url = new URL(event.target.value) } catch {
                                    try {url = new URL('http://' + event.target.value)} catch {}
                                }
                                if(url) tabURL(url.toString());
                            }
                        }
                    }
                }
            })
        ], { class: 'data-section' }),
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
                    id: 'data-title',
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
            ], { class: 'data-section' }),
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
                    id: 'data-icon',
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
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('span', 'about:blank cloaking', {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                app.createElement('button', 'Go about:blank', {
                    style: {
                        'width': '300px',
                        display: 'inline-block',
                        'padding': '14px 18px',
                        'margin': '5px 0',
                        'color': 'var(--text-color)',
                        'text-decoration': 'none',
                        'font-size': '14px',
                        'background': '0 0',
                        'border': '1px solid var(--border-color)',
                        'border-radius': '2px',
                        'outline': 'none',
                        'font-family': 'inherit',
                    },
                    events: {
                        click() {
                            /*
The about:blank script is based off of ABC by
  _____             _   _      _                      _    
 |  ___|__   __ _  | \ | | ___| |___      _____  _ __| | __
 | |_ / _ \ / _` | |  \| |/ _ \ __\ \ /\ / / _ \| '__| |/ /
 |  _| (_) | (_| | | |\  |  __/ |_ \ V  V / (_) | |  |   < 
 |_|  \___/ \__, | |_| \_|\___|\__| \_/\_/ \___/|_|  |_|\_\  
*/
                        try {
                            var page = window.open()
                            page.document.body.innerHTML = `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="${window.location.href}"></iframe>`
                        } catch {return}
                        window.location.replace((localStorage.getItem('incog||ab') || 'https://google.com'))
                        }
                    }
                }),
                app.createElement('p', 'Use about:blank to cloak your tab. (opens in a new tab)', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('span', 'about:blank redirect', {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                app.createElement('input', [], {
                    attrs: {
                        value: (localStorage.getItem('incog||ab') || 'https://google.com'),
                        placeholder: 'Enter a URL'
                    },
                    style: {
                        width: '300px',
                    },
                    events: {
                        input(event) {
                            try {
                                new URL(event.target.value)
                                localStorage.setItem('incog||ab', event.target.value)
                            } catch {}
                        }
                    }
                }),
                app.createElement('p', 'The URL that Incognito redirects to when using about:blank.', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('button', 'Reset Tab', {
                    style: {
                        'width': '300px',
                        display: 'inline-block',
                        'padding': '14px 18px',
                        'margin': '5px 0',
                        'color': 'var(--text-color)',
                        'text-decoration': 'none',
                        'font-size': '14px',
                        'background': '0 0',
                        'border': '1px solid var(--border-color)',
                        'border-radius': '2px',
                        'outline': 'none',
                        'font-family': 'inherit',
                    },
                    events: {
                        click() {
                            localStorage.removeItem('incog||ab')
                            localStorage.removeItem('incog||icon')
                            localStorage.removeItem('incog||title')
                            window.location.hash = '';
                            window.location.reload()
                        }
                    }
                })
            ], { class: 'data-section' })
    ]));

    tabs.createTab('search', app.createElement('div', [
            app.createElement('section', [
                app.createElement('span', 'Search Engine', {
                    style: {
                        display: 'block',
                        'margin-bottom': '10px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                searchSelection.element,
                app.createElement('p', 'Change the search engine used.', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('span', 'Search Suggestions', {
                    style: {
                        display: 'block',
                        'margin-bottom': '6px',
                        'font-size': '18px',
                        'font-weight': '500'
                    }
                }),
                searchSuggestionSelection.element,
                app.createElement('p', 'Change the search engine used in the search suggestions.', {
                    style: {
                        'margin-bottom': '0'
                    }
                })
            ], { class: 'data-section' }),
            app.createElement('section', [
                app.createElement('button', 'Reset Search Engine', {
                    style: {
                        'width': '300px',
                        display: 'inline-block',
                        'padding': '14px 18px',
                        'margin': '5px 0',
                        'color': 'var(--text-color)',
                        'text-decoration': 'none',
                        'font-size': '14px',
                        'background': '0 0',
                        'border': '1px solid var(--border-color)',
                        'border-radius': '2px',
                        'outline': 'none',
                        'font-family': 'inherit',
                    },
                    events: {
                        click() {
                            localStorage.removeItem('incog||search')
                            localStorage.removeItem('incog||suggestions')
                            window.location.hash = '';
                        }
                    }
                })
            ], { class: 'data-section' })
    ]));

    tabs.createTab('about', app.createElement('div', await createAbout(app)))
    
    app.nav.about = app.createElement('a', 'About', {
        events: {
            click() {
                tabs.switchTab('about');
            }
        },
        id: 'about'
    });

    app.nav.search = app.createElement('a', 'Search Engine', {
        events: {
            click() {
                tabs.switchTab('search');
                searchSelection.switchSelector((localStorage.getItem('incog||search') || 'google'));
                searchSuggestionSelection.switchSelector((localStorage.getItem('incog||suggestions') || 'ddg'));
            }
        },
        id: 'search'
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
                backgroundSelection.switchSelector((localStorage.getItem('incog||background') || 'none'));
                disableTips.switchSelector((localStorage.getItem('incog||disabletips') || 'enabled'));
            }
        },
        id: 'appearance',
    });

    tabs.switchTab('appearance');

    app.search.back.style.display = 'inline';
	app.search.back.href = '#';
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
                style: { 'margin-bottom': '0' }
            })
        )
    };

    for (const entry of json.socials) {
        socials.push(
            app.createElement('p', `${entry.name}${entry.data ? ' - ' + entry.data : ''}`, {
                style: { 'margin-bottom': '0' }
            })
        )
    };

    for (const entry of json.contact) {
        contacts.push(
            app.createElement('p', `${entry.name}${entry.data ? ' - ' + entry.data : ''}`, {
                style: { 'margin-bottom': '0' }
            })
        )
    };

	const license = `Incognito

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`.split("").map(c => c == "\n" ? app.createElement("br") : c);

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
                style: { 'margin-bottom': '0' }
            })
        ], { class: 'data-section' }),
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
        ], { class: 'data-section' }),
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
        ], { class: 'data-section' }),
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
        ], { class: 'data-section' }) : null,
		app.createElement('section', [
			app.createElement('span', 'License', {
                style: {
                    display: 'block',
                    'margin-bottom': '6px',
                    'font-size': '18px',
                    'font-weight': '500'
                }
            }),
			app.createElement("p", license)
		], { class: 'data-section' })
    ]
};

async function tabURL(url) {
    // A mess of code from Tsunami 2.0 and HolyUB modified to work with Incognito
    const res = await app.bare.fetch(url);
    const parsedURL = new URL(res.finalURL);
    var dom = new DOMParser().parseFromString(await res.text(), "text/html");
    var title = parsedURL.href;
    if(dom.getElementsByTagName("title")[0]) title = dom.getElementsByTagName("title")[0].innerText;
    var icon = "data:,"
    if(dom.querySelector("link[rel='shortcut icon']")) icon = dom.querySelector("link[rel='shortcut icon']").attributes.href.value;
    if(dom.querySelector("link[rel='icon']")) icon = dom.querySelector("link[rel='icon']").attributes.href.value;
    if(icon.startsWith('/')) icon = parsedURL.origin + icon; else if(icon.startsWith('./')) {
        if(parsedURL.href.endsWith('/')) icon = parsedURL.href + icon.slice(2); else icon = parsedURL.href + icon.slice(1)
    }
    app.icon.href = icon
    document.title = title
    document.getElementById('data-icon').value = icon;
    document.getElementById('data-title').value = title;
    localStorage.setItem('incog||icon', icon)
    localStorage.setItem('incog||title', title);
}

export { options }
