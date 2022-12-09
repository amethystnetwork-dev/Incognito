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

class Selection extends EventEmitter {
    constructor(app) {
        super();
        this.app = app;
        this.createElement = app.createElement;
        this.selectors = {};
        this.element = app.createElement('div', [], {
            class: 'selector-wrapper'
        });
    };
    switchSelector(id) {
        if (!(id in this.selectors)) return false;
        this.unselectAll();
        this.emit('select', id);
        this.selectors[id].setAttribute('data-selected', '');
        return this.selectors[id];
    };
    createSelector(id, element) {
        this.selectors[id] = element;

        element.addEventListener('click', () =>
            this.switchSelector(id)
        );

        this.element.append(element);
        return element;
    };
    unselectAll() {
        for (const key in this.selectors) {
            if (this.selectors[key].hasAttribute('data-selected')) {
                this.selectors[key].removeAttribute('data-selected')
            };
        };
        return true;
    };
};

export { Selection };