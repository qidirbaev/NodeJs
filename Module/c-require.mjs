import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');
console.log(Object.keys(fs));
console.log(Object.keys(require));

console.log({ 'import.meta': import.meta });