var util = require("./util");
function transform(content, opt) {
    var openTag = opt && opt.openTag || "{{",
        closeTag = opt && opt.closeTag || "}}";
    var main = "";
    util.each(content.split(openTag), function (code) {
        code = code.split(closeTag);
        var left = code[0];
        var right = code[1];
        if (code.length == 1) {
            main += left;
        } else {
            main += parser(left);
            if (right) {
                main += right;
            }
        }
    });
    return main;
}

function parser(code) {
    code = code.replace("/^\s/", "");
    var splitCont = code.split(" ");
    var key = splitCont.shift();
    var args = splitCont.join("");
    var outTag = "$";
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
            if(!(/\$\w.+/g.test(key))){
                code = outTag + output ;
            }
    }
    return code;
}
module.exports = transform;