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

console.log(`Incognito
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`);

if(['netlify.app', 'vercel.app', 'github.io', 'gitlab.io', 'pages.dev'].filter(host => window.location.hostname.includes(host)).length) throw alert(`You cannot deploy to ${window.location.hostname}. Did you read the notice before deploying?`);

import { App } from './app.js';
import { gs } from './gs.js';
import { apps } from './apps.js';
import { access } from './home.js';
import { options } from './options.js';
import { support } from './support.js';
import { community } from './community.js';

window.app = new App();

app.bare = new Ultraviolet.BareClient(new URL(__uv$config.bare, window.location));

switch(localStorage.getItem('incog||background')) {
    case 'stars':
        particlesJS.load('.particles', './json/stars.json');
        break;
    case 'particles':
        particlesJS.load('.particles', './json/particles.json'); 
};

app.openNav = function() {
    document.querySelector('#close-nav').style.display = 'flex';
    document.querySelector('nav').style.display = 'flex';
};

app.closeNav = function() {
    document.querySelector('#close-nav').style.removeProperty('display')
    document.querySelector('nav').style.removeProperty('display')
};

app.destroyParticles = function() {
    if (window.pJSDom && window.pJSDom.length) window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
    return true;
};

document.querySelector('#open-nav').addEventListener('click', app.openNav);
document.querySelector('#close-nav').addEventListener('click', app.closeNav);

document.title = localStorage.getItem('incog||title') || 'Incognito';
window.icon = document.querySelector('#favicon');

icon.href = localStorage.getItem('incog||icon') || './index.svg';

app.on('init', () => {
    app.icon = document.querySelector('#favicon');
    app.search.back = app.createElement('a', 'chevron_left', {
        class: 'submit', 
        style: {
            'font-family': 'Material Icons',
            'font-size': '30px',
            'color': 'var(--accent)',
            'display': 'none',
        }
    });
    app.search.title = app.createElement('div', [], {
        class: 'title',
        style: {
            'font-size': '16px',
            'font-weight': '500',
            color: 'var(--accent)',
            display: 'none',
        }
    });
    app.search.logo = createLink('#', '<img class="hu" src="img/hu.png"  width="50px" height="50px"><svg class="nav-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 365.37 365.37"><defs>    <style>       .cls-1{    fill:none;    stroke-width:18px;}  .cls-1, .cls-2 {    stroke: var(--accent);    stroke-miterlimit:10;} .cls-2 {    fill: var(--accent);    stroke-width:5px;}    </style>  </defs><circle class="cls-1" cx="182.68" cy="182.68" r="173.68"></circle><path class="cls-2" d="M210.41,66.38A115.27,115.27,0,0,1,70.52,248.19,134,134,0,1,0,210.41,66.38Z" transform="translate(-17.32 -17.32)"></path></svg>', {
        style: {
            display: 'none'
        }
    });
    app.search.input = app.createElement('input', [], {
        attrs: {
            placeholder: ''
        },
        class: 'interactive',
    });
    app.search.submit = app.createElement('button', '<i class="fas fa-search"></i>', {
        class: 'submit', 
        style: {
            display: 'none'
        }
    });
});

app.on('exit', async () => {
    document.querySelector('#open-nav').removeAttribute('data-open');
    if (document.querySelector('header').hasAttribute('data-init')) {
        document.querySelector('header').removeAttribute('data-init')
    };
    
    if (app.search.logo.style.display === 'none') {
        app.search.logo.style.removeProperty('display');
    };

    if (document.querySelector('header').hasAttribute('data-page')) {
        document.querySelector('header').removeAttribute('data-page');
    };

    app.search.logo.style.display = 'none';
    app.search.submit.style.display = 'none';
	
    app.search.title.textContent = '';
    app.search.title.style.display = 'none';

    app.nav.clear();
    app.main.clear();

    app.main.target.classList.toggle('transition')
});


app.on('after', () => {
    app.main.target.classList.toggle('transition')
});


document.querySelector('#access-form').addEventListener('submit', event => {
    event.preventDefault();
    app.main.target.style.display = 'none';
    app.header.target.style.display = 'none';
    
    const frame = document.querySelector('.access-frame');

    frame.src = '/load.html#' + btoa(event.target[0].value);
    frame.style.display = 'block';

    document.querySelector('.access-panel').style.removeProperty('display');
});

document.querySelector('.close-access').addEventListener('click', event => {
    event.preventDefault();
    app.main.target.style.display = 'block';
    app.header.target.style.display = 'flex';
    
    const frame = document.querySelector('.access-frame');

    frame.src = 'about:blank';
    frame.style.display = 'none';

    document.querySelector('.access-panel').style.display = 'none';
});

document.querySelector('.refresh-access').addEventListener('click', () => {
    const frame = document.querySelector('.access-frame');
    const win = frame.contentWindow;

    try {
        win.location.reload();
    } catch(e) {

    };
});

document.querySelector('.access-link').addEventListener('click', () => {
    const frame = document.querySelector('.access-frame');
    const win = frame.contentWindow;
    
    if (win.__uv$location) {
        navigator.clipboard.writeText(
            new URL('./?link=' + encodeURIComponent(btoa(win.__uv$location.href)), location.href).href
        );
    };

});

document.querySelector('.access-panel .controls .icon').addEventListener('error', event => {
    event.target.src = 'img/globe.svg';
});


document.querySelector('.access-panel').addEventListener('mouseenter', async event => {
    const frame = document.querySelector('.access-frame');
    const win = frame.contentWindow;

    const { bare } = app;

    if (win && win.__uv) {
        document.querySelector('.access-panel .controls input').value = Object.getOwnPropertyDescriptor(Document.prototype, 'title').get.call(win.document);
        const favi = document.querySelector.call(win.document, 'link[rel=icon]');

        if (favi && Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get.call(favi)) {
            const res = await bare.fetch(
                __uv$config.decodeUrl(Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get.call(favi).replace(new URL(__uv$config.prefix, window.location.origin), ""))
            );

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            document.querySelector('.access-panel .controls .icon').src = url;
            URL.revokeObjectURL(url);
        } else {
            const res = await bare.fetch(new URL('/favicon.ico', win.__uv$location.origin));

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            document.querySelector('.access-panel .controls .icon').src = url;
            URL.revokeObjectURL(url);
        };
    };
});

app.on('default', access);
app.on('#gs', gs);
app.on('#apps', apps);
app.on('#settings', options);
app.on('#support', support);
app.on('#community', community);

app.init();


function createLink(href = null, content = '', config = {}) {
    const elem = app.createElement('a', content, config);
    if (href) elem.href = href;
    return elem;
};

function timeout(time = 1000) {
    return new Promise(resolve => 
        setTimeout(resolve, time)
    );
};