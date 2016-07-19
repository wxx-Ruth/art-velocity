#!/usr/bin/env node

var program = require("commander");
var path = require("path");
var tool = require("../src/server");
program
	.version(require("../package.json").version)
	.usage("[options] [file path]")
	.description("transform others to velocity")
	.option('-A, --artTemplate', 'parse arttemplate')
	.option('-M, --mustache', 'parse mustache')
	.parse(process.argv);
var pname = program.args[0];
if (!pname) program.help();
var configUrl = path.join(process.cwd(), pname);
var style = "";
if (program.artTemplate) {
	style = "artTemplate";
} else if (program.mustache) {
	style = "mustache";
}
tool(configUrl, style);