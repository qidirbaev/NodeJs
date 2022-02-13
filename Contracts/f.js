function add(a, b) {
    console.log(arguments);
    console.dir(WebAssembly, { showHidden: true, depth: 12 });
    return a + b;
}

add(1, 2);