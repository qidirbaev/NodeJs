enum FileAccess {
    Read = 1,
    Write,
    ReadWrite = "RW"
};

const valu1 = FileAccess.Read;
const valu2 = FileAccess.Write;
const valu3 = FileAccess.ReadWrite;

console.dir({ valu1, valu2, valu3 });