"use strict";

const wrapFunction = f => {
    console.log(`Wrap function: ${f.name}`);
    return (...args) => {
        console.log(`Called wrapper for: ${f.name}`);
        console.dir({ args });
        if (args.length > 0) {
            const callback = args[args.length - 1];
            if (typeof callback === "function") {
                args[args.length - 1] = (...args) => {
                    console.log(`Callback: ${f.name}`);
                    console.dir({ args });
                    return callback(...args);
                };
            }
        }
        console.log('Call: ' + f.name);
        console.dir({ args });
        const result = f(...args);
        console.log(`Ended wrapper for: ${f.name}`);
        return result;
    };
};

const cloneInterface = anInterface => {
    const clone = [];
    for (const method in anInterface) {
        const f = anInterface[method];
        clone[method] = wrapFunction(f);
    }
    return clone;
};

// UsagE:

const interfaceName = {
    methodName(par1, par2, callback) {
        console.dir({ method: { par1, par2 } });
        callback(null, { field: 'value' });
    }
};

const cloned = cloneInterface(interfaceName);
cloned.methodName("Urim", "Thum", () => {
    console.log('Fire');
});