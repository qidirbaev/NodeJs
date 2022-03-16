"use strict";

const cache = new Map();

const db = {
    [12345]: {
        name: "John",
        age: 30
    },
    get: function(key) {
        console.log("Getting data from database...");
        return this[key];
    }
};

function makeAQuery(key) {
  // Kesh-xotiradan obiektni olish
  let data = cache.get(key);

  // Agar obiekt kesh-xotirada mavjud bo'lmasa, obiektni ma'lumotlar
  // bazasidan olish va uni keshlash
  if (data == null) {
    data = db.get(key);

    // keyin obiekt TTLiga muvofiq kesh xotiraga saqlash
    cache.set(key, data, cache.defaultTTL);
  }

  // obiektni qaytarish
  return data;
}

// obiektni oluvchi ilova kodi
const data = makeAQuery(12345);
const data2 = makeAQuery(12345);
const data3 = makeAQuery(12345);
console.dir({ data, data2, data3 });