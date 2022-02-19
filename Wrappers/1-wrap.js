"use strict";

const wrap = f => {
    console.log(`Wrap function: ${f.name}`);
    return (...args) => {
        console.log(`Called wrapped function: ${f.name}`);
        console.dir({ args });
   
        const result = f(...args);
        console.log(`Returned from wrapped function: ${f.name}`);
        console.dir({ result });
        return result;
    };
};

// Usage:

const f = (par1, par2) => {
    console.dir({ method: { par1, par2 } });
    return [par1, par2];
};

const wrapped = wrap(f);
wrapped("Urim", "Thum");
