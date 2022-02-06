'use strict';

console.log('Started master:', process.pid);

const calculations = item => item * 2;

process.on('message', msg => {
    console.log(`Message to worker: ${process.pid}`);
    console.log('from master: ', msg);

    const result = msg.task.map(calculations);

    process.send({ result });

});