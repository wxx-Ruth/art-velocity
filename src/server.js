var promise = require("bluebird");
var fs = promise.promisifyAll(require("fs"));
// var fs = require("fs");
var tool = require("./art-velocity");
var path = "../example/index.html";
fs.readFileAsync(path, "utf-8").then(function(content) {
	var html = tool(content);
	return fs.writeFileAsync(path,html);
});