'use strict';

const socket = new WebSocket('ws://localhost:8080');

const buildAPI = methods => {
    const api = {};
    for (const method of methods) {
        api[method] = async (...args) => new Promise((resolve, reject) => {
            socket.send(JSON.stringify({ method, args }));
            socket.onmessage = event => {
                const data = JSON.parse(event.data);
                resolve(data);
            };
        });
    }
    return api;
};

const show = async () => {
    const svg = await api.render('Rect1');
    const output = document.getElementById('output');
    output.innerHTML = svg;
};

const scenario = async () => {
    await api.rect('Rect1', -10, 10, 10, -10);
    await api.move('Rect1', 5, 5);
    await api.rotate('Rect1', 5);
    const data = await api.read('Rect1');
    console.dir({ data });
    await show();
};

const api = buildAPI(['rect', 'move', 'rotate', 'read', 'render', 'resize']);

const btn = document.getElementById('btn');

btn.addEventListener('click', scenario);
