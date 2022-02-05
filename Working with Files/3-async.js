'use strict';

const fs = require('fs');

fs.readFile('1-readFileSync.js', 'utf-8', (err, buffer) => {
  if (err) {
    console.error(err);
    process.exit(0);
  };

  console.log('Files size: ', buffer.length);

  const src = buffer.toString();
  const lines = src.split('\n').filter(line => !!line);
  const content = lines.join('\n');

  fs.writeFile('1-readFileSync.txt', content, err => {
      if (err) {
        console.error(err);
        process.exit(0);
      }
      console.log('New File size: ', content.length);
  });
});

console.log('Read file async example');