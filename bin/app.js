#!/usr/bin/env node

var program = require("commander");
var path = require("path");
var tool = require("../src/server");
program
	.version(require("../package.json").version)
	.usage("[options] [file path]")
	.description("transform others to velocity")
	.option('-A, --artTemplate <string>', 'parse arttemplate')
	.option('-M, --mustache <string>', 'parse mustache')
	.parse(process.argv);
console.log(program.artTemplate);
var pname = program.args[0];
if (!pname) {
	program.help();
} else {
	var configUrl = path.join(__dirname, program.artTemplate || program.mustache);
	var style = "";
	if (program.artTemplate) {
		style = "art";
	} else if (program.mustache) {
		style = "mustache";
	}
	tool(configUrl, style);
}