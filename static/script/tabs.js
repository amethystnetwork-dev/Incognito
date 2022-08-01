import EventEmitter from "./events.js";

class Tabs extends EventEmitter {
    constructor(app) {
        super();
        this.app = app;
        this.createElement = app.createElement;
        this.tabs = {};
        this.element = app.createElement('div', [], {
            class: 'tab-wrapper'
        });
    };
    switchTab(id) {
        if (!(id in this.tabs)) return false;
        this.hideAll();
        this.emit('switch', id);
        this.tabs[id].style.display = 'block';
        return this.tabs[id];
    };
    createTab(id, element) {
        this.tabs[id] = element;
        element.style.display = 'none';
        this.element.append(element);
        return element;
    };
    hideAll() {
        for (const key in this.tabs) {
            this.tabs[key].style.display = 'none';
        };
        return true;
    };
};

export { Tabs };