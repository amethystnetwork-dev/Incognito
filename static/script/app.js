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