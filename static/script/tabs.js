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