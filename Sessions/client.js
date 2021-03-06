'use strict';

const Session = require('./session.js');

const UNIX_EPOCH = new Date(0);
const COOKIE_EXPIRES = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
const COOKIE_DELETE = `=deleted; Expires=${UNIX_EPOCH.toUTCString()}; Path=/; Domain=`;

const parseHost = host => {
    if (!host) return 'no-host-name-in-http-headers';
    const portOffset = host.lastIndexOf(':');
    if (portOffset > -1) host = host.substr(0, portOffset);
    return host;
};

class Client {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.token = undefined;
        this.session = null;
        this.cookie = {};
        this.host = parseHost(req.headers.host);
        this.preparedCookie = [];
        this.parseCookie();
    }

    async static getInstance(req, res) {
        const client = new Client(req, res);
        await Session.restore(client);
        return client;
    }

    parseCookie() {
        const { req } = this;
        const { cookie } = req.headers;
        if (!cookie) return;
        const items = cookie.split(';');
        for (const item of items) {
            const parts = item.split('=');
            const key = parts[0].trim();
            const val = parts[1] || '';
            this.cookie[key] = val.trim();
        }
    }

    setCookie(name, val, httpOnly = false) {
        const { host } = this;
        
        const expires = `expires=${COOKIE_EXPIRES}`;
        let cookie = `${name}=${val}; ${expires}; Path=/; Domain=${host}`;
        if (httpOnly) cookie += '; HttpOnly';
        this.preparedCookie.push(cookie);
    }

    deleteCookie(name) {
        this.preparedCookie.push(name + COOKIE_DELETE + this.host);
    }

    sendCookie() {
        const { res, preparedCookie } = this;
        // console.dir({ preparedCookie, headersSent: res.headersSent });
        if (preparedCookie.length && !res.headersSent) {
            console.dir({ preparedCookie });
            res.setHeader('Set-Cookie', preparedCookie);
        }
    }
}

module.exports = Client;