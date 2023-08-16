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
async function apps(app) {
    app.search.input.placeholder = 'Search apps'
    app.search.back.style.display = 'inline';
    app.search.back.href = '#';

    app.main.library = app.createElement('div', await compileGs(app), {
        class: 'gs-library',
        style: {}
    });
    app.main.emptySearch = app.createElement('div', [
        app.createElement('p', 'No results found.'),
    ], {
        class: 'gs-empty',
        style: {
            display: 'none'
        }
    });

	function searchApps() {
		let count = 0;

		app.main.library.querySelectorAll('.gs-entry').forEach(node => {
			if (node.getAttribute('data-title').toLowerCase().includes(app.search.input.value.toLowerCase())) {
				node.setAttribute('data-active', '1');
				count++;
			} else {
				node.removeAttribute('data-active');
			};
		}); 

		if (!count) {
			app.main.library.style.display = 'none';
			app.main.emptySearch.style.display = 'block';
		} else {
			app.main.library.style.removeProperty('display');
			app.main.emptySearch.style.display = 'none';
		};
	}

	app.search.input.addEventListener('input', searchApps);
	app.once('exit', () => app.search.input.removeEventListener('input', searchApps));
};


async function compileGs(app) {
    const res = await fetch('./source/apps.json');
    const json = await res.json();
    const arr = [];

    app.search.input.placeholder = `Search apps (${json.length})`
    for (const entry of json) {
        arr.push(
            app.createElement('div', [], {
                class: 'gs-entry',
                style: {
                    background: `url(${entry.img})`,
                    'background-size': 'cover'
                },
                attrs: {
                    'data-title': entry.title,
                    'data-active': ''
                },
                events: {
                    click(event) {
                        const frame = document.querySelector('iframe');
                        document.querySelector('main').style.display = 'none';
                        document.querySelector('header').style.display = 'none';
                        frame.style.display = 'block';
                        frame.src = (entry.location.startsWith('https://') || entry.location.startsWith('http://')) ? './load.html#' + encodeURIComponent(btoa(entry.location))
                        : entry.location;

                        document.querySelector('.access-panel').style.removeProperty('display');
                    }
                }
            })
        )
    };

    return arr;
};

export { apps };
