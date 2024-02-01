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
const tips = [
    'Modify Inc&#173;ogni&#173;tos appearance & browser tab in <a href="#settings">settings.</a>',
    'You can enable about:blank tab cloaking in <a href="#settings">settings.</a>',
    'Access popular media & sites easily in <a href="#apps">apps.</a>',
    'This <a href="https://github.com/amethystnetwork-dev/Incognito">unofficial In&#173;cog&#173;nito version</a> is made by Am&#173;et&#173;hy&#173;st Net&#173;wo&#173;rk.',
    'Join the <a href="#community">Am&#173;et&#173;hyst Ne&#173;tw&#173;ork d&#173;i&#173;sco&#173;rd</a>',
    'Get answers to questions in <a href="#support">support</a>'
];

import { searchProviders } from "./search.js";


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
    app.search.input.focus();


    
    app.nav.community = app.createLink('#community', 'Community');
    app.nav.support = app.createLink('#support', 'Support');
    app.nav.apps = app.createLink('#apps', 'Apps');
    app.nav.games = app.createLink('#gs', 'Games');
    app.nav.settings = app.createLink('#settings', '<i class="fas fa-sliders-h secondary"></i>', {
        id: 'apps'
    })
    app.main.tip = app.createElement('div', (localStorage.getItem('incog||disabletips') !== 'none' ? tips[Math.floor(Math.random()*tips.length)] : ''), { class: 'tip' });

	async function searchSuggestions(event) {
		app.main.suggestions.innerHTML = '';
		if (!event.target.value) {
			app.nav.target.style.removeProperty('display');
			app.header.target.setAttribute('data-page', '');
			app.main.tip.style.removeProperty('display');
			app.search.logo.style.display = 'inline';
			return;
		}

		app.main.tip.style.display = 'none';
		app.header.target.removeAttribute('data-page');
		app.nav.target.style.display = 'none';
		app.search.logo.style.display = 'none';

		clearTimeout(app.timeout);
		app.timeout = setTimeout(async () => {
			const providerName = localStorage.getItem('incog||suggestions');
			const provider = searchProviders[(providerName in searchProviders) ? providerName : 'ddg'];

			const res = await app.bare.fetch(provider.mapQuery(event.target.value));
			const text = await res.text();
			const suggestions = provider.parseResponse(text);

			suggestions.forEach(element => {
				app.main.suggestions.append(app.createElement('div', element, { class: 'suggestion',
						events: {
							click() {
								app.search.input.value = element;
								const frame = document.querySelector('iframe');
								document.querySelector('main').style.display = 'none';
								document.querySelector('header').style.display = 'none';
								frame.style.display = 'block';
								frame.src = './load.html#' + encodeURIComponent(btoa(element));
								document.querySelector('.access-panel').style.removeProperty('display');
							}
						}
					}))

				});
		}, 400);
	}

	if(localStorage.getItem('incog||suggestions') !== 'none') {
    	app.main.suggestions = app.createElement('div', [], {
        	class: 'suggestions',
        	style: {
            	display: 'block'
        	} 
    	});

		app.search.input.addEventListener('input', searchSuggestions);
		app.once('exit', () => app.search.input.removeEventListener('input', searchSuggestions));
	}

    app.search.input.setAttribute('form', 'access-form');
    app.search.submit.setAttribute('form', 'access-form');

    const params = new URLSearchParams(window.location.search);

    if (params.has('link')) {
        app.main.target.style.display = 'none';
        app.header.target.style.display = 'none';
        
        const frame = document.querySelector('.access-frame');

        frame.src = './load.html#' + encodeURIComponent(params.get('link'));
        frame.style.display = 'block';

        document.querySelector('.access-panel').style.removeProperty('display');
        history.replaceState('', '', window.location.pathname + '#');
    };
};

export { access };
