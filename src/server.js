var promise = require("bluebird");
var fs = promise.promisifyAll(require("fs"));
var transform = require("./transform");
var path = require("path");
var async = require("async");
var walk = require('walk'),
	files = [];
	
var configUrl = path.join(__dirname,"../example/mustache");
var walker = walk.walk(configUrl, { followLinks: false });
walker.on('file', function (root, stat, next) {
	files.push(root + '/' + stat.name);
	next();
});
walker.on('end', function () {
	replaceFiles(files);
});
walker.on('errors',errorsHandler);
function errorsHandler(root, nodeStatsArray, next) {
  nodeStatsArray.forEach(function (n) {
    console.error("[ERROR] " + n.name)
    console.error(n.error.message || (n.error.code + ": " + n.error.path));
  });
  next();
}
function replaceFiles(files) {
	files.map(function (item) {
		async.series([
            //读取目录模板
            function (callback) {
                fs.readFile(item, "utf8", function (err, data) {
                    callback(null, data);
                });
            }
        ],
			function (err, results) {
				if (err) throw err;
				var data = results[0];
				// 转化语法
				data = transform(data);
				fs.writeFile(item, data);
			});
	});
}


