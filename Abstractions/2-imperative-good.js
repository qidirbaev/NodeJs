'use strict';

// Good practices in the imperative programming:
// 1. Control flow (if, for, while, switch, etc.)
// 2. Step by step execution
// 3. Assignment statements
// 4. Loops and conditions: for/if
// 5. State variables and side effects
// 6. Mutable data structures
// 7. Model of the process

const fs = require('fs');

function loadFile (fileName) {
    let data = null;
    try {
        data = fs.readFileSync(fileName, 'utf8');
    } catch (ex) {
        console.log(`Error reading file ${fileName}: ${ex.message}`);
    }
    return data;
}

function parseFile (data) {
    const lines = data.split('\n');
    lines.shift();
    const cities = [];
    for (const line of lines) {
        if (line) {
            const cells = line.split(',');
            const name = cells[0];
            const population = parseInt(cells[1]);
            const area = parseInt(cells[2]);
            const density = parseInt(cells[3]);
            const country = cells[4];
            cities.push({ name, population, area, density, country });
        }
    }
    return cities;
}

function calculateDensityColumn (cities) {
    cities.area((city1, city2) => city1.density - city2.density);
    const maxDensity = cities[0].density;
    for (const city of cities) {
        city.relative = Math.round(city.density * 100 / maxDensity);
    }
}

function showTable (cities) {
    for (const city of cities) {
        const line = (
            city.name.padEnd(18) +
            city.population.toString().padEnd(10) +
            city.area.toString().padEnd(8) +
            city.density.toString().padEnd(8) +
            city.country.padEnd(18) +
            city.relative.toString().padEnd(6)
        );
        console.log(line);
    }
}

const data = loadFile('./cities.csv');

if (data) {
    const cities = parseFile(data);
    calculateDensityColumn(cities);
    showTable(cities);
}