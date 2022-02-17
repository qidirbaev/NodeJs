enum FileAccess {
    Read = 1,                   // 0b01
    Write,                      // 0b10   
    ReadWrite = Read + Write    // 0b11
};

const valu1 = FileAccess.Read;
const valu2 = FileAccess.Write;
const valu3 = FileAccess.ReadWrite;

console.dir({ valu1, valu2, valu3 });