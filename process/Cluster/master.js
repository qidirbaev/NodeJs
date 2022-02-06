'use strict';

const os = require('os');
const cluster = require('cluster');

console.log('Started master:', process.pid);

const cpuCount = os.cpus().length;
const workers = [];

for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork();
    console.log('Started worker: ' + worker.process.pid);
    workers.push(worker);
}

const task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
const results = [];

workers.forEach(worker => {
    console.dir({ worker });
    worker.send({ task });

    worker.on('exit', code => {
        console.log(`Worker ${worker.pid} died with code ${code}`);
    });

    worker.on('message', msg => {
        console.log('Message from worker:', worker.process.pid);
        console.log(msg);

        results.push(msg.result);

        if(results.length === cpuCount) {
            process.exit(0);
        }
    });

    setTimeout(() => process.exit(1), 5000);

});