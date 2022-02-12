const promise = import('events');

console.log({ promise });

promise.then(events => {
    console.log({ defaultMaxListeners1: events.defaultMaxListeners });
});

const events = await import('events');
console.log({ defaultMaxListeners2: events.defaultMaxListeners });
