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
function createComponent(element) {
    return new Proxy({}, {
        get: (target, prop) => {
            if (prop === 'target') return element;
            if (prop === 'text') return element.textContent;
            if (prop === 'style') return element.style;
            if (prop === 'clear') return clear;

            return target[prop];
        },
        set: (target, prop, val) => {
            if (prop === 'text') return (element.textContent = val, true);            
            if (typeof val === 'string') val = document.createElement(val);

            if (prop in target) {
                target[prop].remove();
                delete target[prop];
            };

            element.append(val);
            target[prop] = val

            return true;
        },
        deleteProperty: (target, prop) => {
            target[prop].remove();
            return delete target[prop];
        },
    });

    function clear() {
        this.text = '';
        for (const key in this) {
            delete this[key];
        };
    };
};

export { createComponent }; 