"use strict";

// Utils;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Cache extends Map {
    constructor() {
        super();
    }
    onmiss(key) {
        const data = db.get(key)
        const dataToCache = { data, ttl: Date.now() + 1000 * 60 };
        super.set(key, dataToCache);
        return data;
    }
    readThrough(key) {
        const data = super.get(key);
        if (data) {
            if (data.ttl > Date.now()) {
                console.log("Getting from cache...");
                return data.data;
            } else {
                super.delete(key);
            }
        }
        return this.onmiss(key);
    }
};

const cache = new Cache();

// cache.set(12345, {
//     data: { name: "John", age: 30 },
//     ttl: Date.now() + 1000 * 60
// });

const db = {
    [12345]: {
        name: "John",
        age: 30
    },
    get: async function(key) {
        await wait(1000);
        console.log("Getting from db...");
        return this[key];
    }
};

// Ma'lumot yo kesh-xotiradan yoki cache.onmiss dan keladi

(async () => {
    const data1 = await cache.readThrough(12345);
    const data2 = await cache.readThrough(12345);
    const data3 = await cache.readThrough(12345);
    console.dir({ data1, data2, data3 });
})();
