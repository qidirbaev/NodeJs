"use strict";

class Cache extends Map {
    constructor() {
        super();
        this.defaultTTL = 1000 * 60;
    }
    writeThrough(...args) {
        const callback = args.pop();
        const key = generateCacheKey(args[0]);
        const value = {
            id: args[0],
            data: args[1],
            ttl: Date.now() + this.defaultTTL
        };
        super.set(key, value);
        return callback(key, value);
    }
};

const db = {
    save: function(key, value) {
        console.log("Saving to db...");
        this[key] = value;
        return value;
    }
};

const generateCacheKey = (customerId) => {
    const key = 'customer-' + customerId;
    return key;
};

function updateCustomer(customerId, customerData) {
  console.log(cache.writeThrough(
    customerId, customerData,
    (key, value) => {
      return db.save(key, value);
    }
  ));
}

const cache = new Cache();

updateCustomer(12345, { name: "John", age: 30 });
updateCustomer(12345, { name: "John", age: 30 });
updateCustomer(12345, { name: "John", age: 30 });

// function updateCustomer(customerId, customerData) {
//   const record = db.findAndUpdate(customerId, customerData);
//   // then set or update the record in the cache
//   cache.set(customerId, record, cache.defaultTTL);
// }
