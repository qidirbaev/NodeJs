var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["Read"] = 8] = "Read";
    FileAccess[FileAccess["Write"] = 9] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 1] = "ReadWrite";
})(FileAccess || (FileAccess = {}));
;
var value1 = FileAccess.Read;
var value2 = FileAccess.Write;
var value3 = FileAccess.ReadWrite;
console.dir({ value1: value1, value2: value2, value3: value3 });
