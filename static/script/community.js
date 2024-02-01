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

var invite_code;
async function community(app) {
    app.search.title.style.display = 'block';
    app.search.title.textContent = 'Community';
    app.search.input.style.display = 'none';

	if(!invite_code) {
		const res = await app.bare.fetch('https://cdn.jsdelivr.net/gh/amethystnetwork-dev/.github/meta/discord.json');
		const json = await res.json();
		invite_code = json.invite_code;
	}

    app.main.support = app.createElement(
        'div', 
        [
            app.createElement('section', [
                app.createElement('p', `You are being taken to the Amethyst Network discord server (discord.gg/${invite_code}).`, {
                        style: {
                            'margin-bottom': '0'
                        }
                    }),
                    app.createElement('p', `Are you sure you want to <a href="https://discord.gg/${invite_code}">proceed</a>?`, {
                        style: {
                            'margin-bottom': '0'
                        }
                    }),
            ], {
                class: 'data-section'
            }),
            
        ]);
        app.search.back.style.display = 'inline';
		app.search.back.href = '#';
};

export { community };
