var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["Read"] = 1] = "Read";
    FileAccess[FileAccess["Write"] = 8] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 9] = "ReadWrite";
    FileAccess[FileAccess["Execute"] = 10] = "Execute";
})(FileAccess || (FileAccess = {}));
;
var value1 = FileAccess.Read;
var value2 = FileAccess.Write;
var value3 = FileAccess.ReadWrite;
console.dir({ value1: value1, value2: value2, value3: value3 });
