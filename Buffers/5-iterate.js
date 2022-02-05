'use strict';

const buffer = Buffer.from('Бегзат');

for (const char of buffer.values()) {
    console.log({ char });
}

for (const [index, code] of buffer.entries()) {
    const char = String.fromCharCode(code);
    console.log({ index, code, char });
}