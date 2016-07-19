var promise = require("bluebird");
var fs = promise.promisifyAll(require("fs"));
var transform = require("./transform");
var path = require("path");
var async = require("async");
var walk = require('walk'),
	files = [];
function tool(url, style) {
	fs.statAsync(url).then(function (stat) {
		if (stat.isDirectory()) {
			dirTransform(url,style);
		} else {
			fileTransform(url,style);
		}
	})
}
function dirTransform(url, style) {
	var walker = walk.walk(url, {
		followLinks: false
	});
	walker.on('file', function (root, stat, next) {
		files.push(root + '/' + stat.name);
		next();
	});
	walker.on('end', function () {
		files.map(function (item) {
			fileTransform(item, style);
		});
	});
	walker.on('errors', errorsHandler);
}
function fileTransform(file, style) {
	fs.readFileAsync(file, "utf8").then(function (data) {
		data = transform(data, style || "artTemplate");
		fs.writeFileAsync(file, data);
	});
}
function errorsHandler(root, nodeStatsArray, next) {
	nodeStatsArray.forEach(function (n) {
		console.error("[ERROR] " + n.name)
		console.error(n.error.message || (n.error.code + ": " + n.error.path));
	});
	next();
}
module.exports = tool;