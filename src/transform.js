var util = require("./util");
var item = "";
var outTag = "$";

function transform(content, opt) {
    var openTag = opt && opt.openTag || "{{",
        closeTag = opt && opt.closeTag || "}}";
    var main = "";
    var key = {};
    util.each(content.split(openTag), function (code) {
        code = code.split(closeTag);
        var left = code[0];
        var right = code[1];
        if (code.length == 1) {
            main += left;
        } else {
            main += parser(left,opt);
            if (right) {
                main += right;
            }
        }
    });
    return main;
}
function  parser(code,style) {
     if(style=="art"){
        return parserArt(code);
     }else{
        return parserMustache(code);
     } 
}
function parserArt(code) {
    code = code.replace("/^\s/", "");
    var splitCont = code.split(" ");
    var key = splitCont.shift();
    var args = splitCont.join("");
    switch (key) {
        case "if":
            code = "#if(" + outTag + args + ")";
            break;
        case "/if":
        case "/each":
            code = "#end";
            break;
        case "each":
            var list = outTag + splitCont[0];
            var as = splitCont[1] || "as";
            var item = splitCont[2] ? outTag + splitCont[2] : "$value";
            var index = splitCont[3];
            code = "#foreach(" + item + " in " + list + ")";
            if (index) {
                code += "\n\r#set(" + index + " = #foreach.index)";
            }
            break;
        case "$index":
            code += "#foreach.index" + args;
            break;
        case "else":
            var param = splitCont.shift();
            var con = splitCont.join(" ");
            if (param && param == "if") {
                code = "#elseif($" + con + ")";
            } else {
                code = "#else";
            }
            break;
        case "include":
            code = "#parse(" + args + ")";
            break;
        default:
            var output = "{" + code + "}";
            if (!(/\$\w.+/g.test(key))) {
                code = outTag + output;
            }
            if (/\#\w.+/g.test(key)) {
                code = outTag + "esc.javascript(" + outTag + output.replace(/\#/g, "") + ")";
            }
    }
    return code;
}
function parserMustache(code) {
    code = code.replace("/^\s/", "");
    if (/^\#\w.+/.test(code)) { //{{#list}}
        code = "#foreach(" + outTag + "item in " + code.replace(/^\#/, outTag) + ")";
        item = "item";
    } else if (/^\/\w.+/.test(code)) { //{{/list}}
        item = "";
        code = "#end";
    } else if (/^\>\s\w+/.test(code)) { //子模板引入
        code = "#parse(" + code.replace(/^\>\s/, "") + ")";
    } else if (/^\w.+/.test(code)) { //变量输出
        code = item != "" ? outTag + "{" + item + "." + code + "}" : outTag + "{" + code + "}";
    } else if (/\{(\w.+)\}/.test(code)) { //{{{name}}}不转义
        code = outTag + "esc.javascript(" + outTag + code.replace(/\{\}/, "$1") + ")";
    } else if (/\^\w.+/.test(code)) {//undefined,null,false
        code = "#if(!" + outTag + code.replace(/\^/, "") + ")";
    } else if (/\./.test(code)) {//枚举
        code = item != "" ? outTag + "{" + item + "}" : "";
    }
    return code;
}
module.exports = transform;