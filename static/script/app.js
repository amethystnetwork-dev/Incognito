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

import EventEmitter from "./events.js";
import { createComponent } from './component.js';

class App extends EventEmitter {
    constructor(hashes = []) {
        super();
        this.header = createComponent(document.querySelector('header'));
        this.search = createComponent(document.querySelector('header .search'));
        this.nav = createComponent(document.querySelector('nav'));
        this.main = createComponent(document.querySelector('main'));
        this.hashes = hashes;
    };
    init() {
        window.addEventListener('hashchange', event => {
            const ancestor = new URL(event.oldURL);
            this.emit('exit', ancestor, location);
            (this.emit(location.hash, this) || this.emit('default', this))
            this.emit('after', null);
        });
        this.emit('init', this);
        this.emit(location.hash, this) || this.emit('default', this);
    };
    createLink(href = null, content = '', config = {}) {
        const elem = this.createElement('a', content, config);
        if (href) elem.href = href;
        return elem;
    };
    createElement(elemName, content = '', config = {}) {
        const element = document.createElement(elemName);
    
        if ('events' in config) {
            for (const name in config.events) {
                element.addEventListener(name, config.events[name]);
            };
        };

        if ('attrs' in config) {
            for (const name in config.attrs) {
                element.setAttribute(name, config.attrs[name])
            };
        };
    
        if ('style' in config && 'style' in element) {
            for (const name in config.style) {
                element.style.setProperty(name, config.style[name])
            };
        };
    
        if ('id' in config) {
            element.id = config.id;
        };
    
        if ('class' in config) {
            if (Array.isArray(config.class)) {
                element.classList.add(...config.class);
            } else {
                element.className = config.class;
            };
        };
    
        if (typeof content === 'object') {
            if (Array.isArray(content)) {
                element.append(
                    ...content.filter(node => !!node)
                );
            } else {
                element.append(content);
            }
        } else {
            element.innerHTML = content;
        };
    
        if ('decorate' in config) {
            config.decorate(element);
        };

        return element;
    };
};

export { App };