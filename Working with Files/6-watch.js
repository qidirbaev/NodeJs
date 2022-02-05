'use strict';

const fs = require('fs');

fs.watch('./6-watch.js', (eventType, filename) => {
    console.dir({ eventType, filename });
});

// changes in 6-watch.js will be logged to the console
