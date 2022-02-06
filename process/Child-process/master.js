'use strict';

const os = require('os');
const cp = require('child_process');

process.stdout.write('Master process.dy');

console.log('Started master:', process.pid);

const cpuCount = os.cpus().length;
const workers = [];

for (let i = 0; i < cpuCount; i++) {
    const worker = cp.fork('./worker.js');
    console.log('Started worker: ' + worker.pid);
    workers.push(worker);
}

const task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
const results = [];

workers.forEach(worker => {
    worker.send({ task });

    worker.on('exit', code => {
        console.log(`Worker ${worker.pid} died with code ${code}`);
    });

    worker.on('message', msg => {
        
        console.log('Message from worker:', msg);
        results.push(msg.result);

        if(results.length === cpuCount) {
            console.log('Result:', results);
            process.exit(0);
        }
    });

    setTimeout(() => process.exit(1), 5000);

});