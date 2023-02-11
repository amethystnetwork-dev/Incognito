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
import { App } from './app.js'
import { gs } from './gs.js';
import { apps } from './apps.js';
import { access } from './home.js';
import { options } from './options.js';
import { support } from './support.js';
import { community } from './community.js';

window.app = new App();


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

document.title = localStorage.getItem('incog||title') || 'Venus';
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
    app.search.logo = createLink('#', '<img class="hu" src="img/hu.png"  width="50px" height="50px"><svg class="nav-logo" width="800px" height="800px" viewBox="0 0 24 24" fill="#161923" xmlns="http://www.w3.org/2000/svg"><path d="M5.29168 6C3.86656 7.59227 3 9.69494 3 12C3 12.6874 3.07706 13.3568 3.22302 14M5.29168 6C6.93964 4.15875 9.3345 3 12 3C16.2832 3 19.8675 5.99202 20.777 10M5.29168 6H12M20.777 10C20.9229 10.6432 21 11.3126 21 12C21 16.9706 16.9706 21 12 21C9.3345 21 6.93964 19.8412 5.29168 18M20.777 10H15M3.22302 14H13M3.22302 14C3.5665 15.5137 4.29154 16.8826 5.29168 18M5.29168 18H11M12 10H10" stroke="#FFA500" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M7.00073 10.0007L7.00003 10" stroke="#161923" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M16.0007 14.0007L16 14" stroke="#FFA500" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>', {
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

    app.search.input.removeAttribute('oninput');
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
    
    if (win.__uv) {
        navigator.clipboard.writeText(
            new URL('./?link=' + encodeURIComponent(btoa(win.__uv.location.href)), location.href).href
        );
    };

});

document.querySelector('.access-panel .controls .icon').addEventListener('error', event => {
    event.target.src = 'img/globe.svg';
});


document.querySelector('.access-panel').addEventListener('mouseenter', async event => {
    const frame = document.querySelector('.access-frame');
    const win = frame.contentWindow;

    if (win && win.__uv) {
        document.querySelector('.access-panel .controls input').value = Object.getOwnPropertyDescriptor(Document.prototype, 'title').get.call(win.document);
        const favi = document.querySelector.call(win.document, 'link[rel=icon]');

        if (favi && Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get.call(favi)) {
            const res = await win.__uv.client.fetch.fetch.call(
                win,
                Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get.call(favi)
            );

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            document.querySelector('.access-panel .controls .icon').src = url;
            URL.revokeObjectURL(url);
        } else {
            const res = await win.__uv.client.fetch.fetch.call(
                win,
                win.__uv.rewriteUrl(
                    '/favicon.ico'
                )
            );

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