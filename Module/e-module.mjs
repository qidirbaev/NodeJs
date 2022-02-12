import m from "https://domain.com/module.js";
console.log(m);
console.log();
// console.log(module);
// console.log(__filename);
console.log({ fileName: import.meta.url })