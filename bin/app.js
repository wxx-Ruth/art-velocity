#!/usr/bin/env node
var program = require("commander");
program
    .version(require("../package.json").version)
    .description("transform others to velocity")
    .option('-A, --arttemplate', 'parse arttemplate')
    .option('-M, --mustache', 'parse mustache')
    .parse(process.argv);
    console.log("sfsfssf");
    if (program.arttemplate) console.log('  - arttemplate');
if (program.mustache) console.log('  - mustache');
program
.command('deploy <name>')
.description('部署一个服务节点')
.action(function(name){
console.log('Deploying "%s"', name);
});