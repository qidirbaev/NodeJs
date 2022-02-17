var FileAccess;
(function (FileAccess) {
    FileAccess["Read"] = "R";
    FileAccess["Write"] = "W";
    FileAccess["ReadWrite"] = "RW";
})(FileAccess || (FileAccess = {}));
;
var value1 = FileAccess.Read;
var value2 = FileAccess.Write;
var value3 = FileAccess.ReadWrite;
console.dir({ value1: value1, value2: value2, value3: value3 });
