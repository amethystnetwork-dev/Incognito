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
    'Get answers to questions in <a href="#support">support</a>',
    `Check out <a onclick="(${ah.toString()})()">Ali&#173;enHu&#173;b</a>`
];

// You can add more search engines if you want
const searchProviders = {
    google: {
        mapQuery: (query) => `http://google.com/complete/search?q=${query}&client=${(["Chrome", "Firefox", "Safari"].filter(c => navigator.userAgent.includes(c))[0] || "Chrome").toLowerCase()}`,
        parseResponse: (res) => JSON.parse(res)[1]
    },
    ddg: {
        mapQuery: (query) => `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`,
        parseResponse: (res) => JSON.parse(res).map(ac => ac.phrase)
    },
    bing: {
        mapQuery: (query) => `https://www.bing.com/AS/Suggestions?qry=${encodeURIComponent(query)}&cvid=%01&bareServer=`,
        parseResponse: (res) => ([...res.matchAll(/<span class="sa_tm_text">(.*?)<\/span>/g)]).map(phrase => phrase[1].replace(/<strong>|<\/strong>/g, ''))
    },
    brave: {
        mapQuery: (query) => `https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}`,
        parseResponse: (res) => JSON.parse(res)[1]
    },
    startpage: {
        mapQuery: (query) => `https://www.startpage.com/suggestions?q=${encodeURIComponent(query)}&segment=omnibox`,
        parseResponse: (res) => JSON.parse(res).suggestions.map(ac => ac.text)
    },
    ecosia: {
        mapQuery: (query) => `https://ac.ecosia.org/?q=${encodeURIComponent(query)}`,
        parseResponse: (res) => JSON.parse(res).suggestions
    }
};

function ah() {
    app.main.target.style.display = 'none';
    app.header.target.style.display = 'none';

    const frame = document.querySelector('.access-frame');
    frame.src = './load.html#aHR0cHM6Ly9hbGllbmh1Yi54eXovP3V0bV9zb3VyY2U9aW5jb2dfZGVwbG95JnV0bV9tZWRpdW09YW1ldGh5c3RuZXR3b3Jr';

    frame.style.display = 'block';
    document.querySelector('.access-panel').style.removeProperty('display');
}

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
			const provider = searchProviders[localStorage.getItem('incog||suggestions') || 'ddg'];
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
