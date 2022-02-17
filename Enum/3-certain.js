var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["Read"] = 1] = "Read";
    FileAccess[FileAccess["Write"] = 2] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 3] = "ReadWrite";
})(FileAccess || (FileAccess = {}));
;
var valu1 = FileAccess.Read;
var valu2 = FileAccess.Write;
var valu3 = FileAccess.ReadWrite;
console.dir({ valu1: valu1, valu2: valu2, valu3: valu3 });
