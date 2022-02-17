"use strict";

const Enum = (...args) => {
    const objectMode = typeof args[0] === 'object';
    const collection = objectMode ? args[0] : args;
    const values = {};
    const index = {};
    let numKeys = false;
    for (const name in collection) {
        const value = collection[name];
        numKeys = numKeys || typeof value === 'number';
        const key = numKeys ? value : name;
        values[key] = value;
        index[value] = key;
    }
    return class {
        constructor(arg) {
            const value = values[arg];
            this.key = value ? arg : index[arg];
        }
        static get collection() {
            return collection;
        }
        [Symbol.toPrimitive](hint) {
            const key = this.key;
            if (hint === 'number') {
                return numKeys ? key : parseInt(key, 10);
            }
            return values[key];
        }
    };
};

// Test Cases

const testEnum = Month => {
    const neg = new Month(-1);
    const zero = new Month(0);
    const first = new Month(1);
    const april = new Month(4);
    const may = new Month("May");
    const aug = new Month("Aug");
    const august = new Month("August");
    const m11 = new Month(11);
    const m12 = new Month(12);
    const m13 = new Month(13);
    const unknown = new Month("Hello");

    console.dir({
        neg, zero, first,
        april, may, aug,
        august, m11, m12,
        m13, unknown
    });
};

// Example 1
{
    const Month = Enum(
        "January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"
    );
    console.dir(Month.collection);
    testEnum(Month);
}

// Example 2
{
    const Month = Enum({
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    });
    console.dir(Month.collection);
    testEnum(Month);
}

// Example 3
{
    const Month = Enum({
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December"
    });
    console.dir(Month.collection);
    testEnum(Month);
}

// Example 4
{
    const Hundreds = Enum(100, 200, 300, 400, 500);
    console.dir(Hundreds.collection);

    const neg = new Hundreds(-1);
    const zero = new Hundreds(0);
    const h100 = new Hundreds(100);
    const h200 = new Hundreds(200);
    const h300 = new Hundreds(300);
    const h400 = new Hundreds(400);
    const unknown = new Hundreds("Hello");

    console.dir({ neg, zero, h100, h200, h300, h400, unknown });
}