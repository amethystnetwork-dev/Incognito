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