var util = require("./util");
function transform(content, opt) {
    var openTag = opt && opt.openTag||"{{",
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
    var split = code.split(" ");
    var key = split.shift();
    var args = split.join("");
    switch (key) {
        case "if":
            code = '#if(' + args + ')';
            break;
        case "/if":
        case "/each":
            code = "#end";
            break;
        case "each":
            var list = split[0];
            var as = split[1] || "as";
            var item = split[2] || "$value";
            var index = split[3];
            code = "#foreach(" + item + " in " + list + ")";
            if (index) {
                code += "\n#set(" + index + " = #foreach.index)";
            }
            break;
        case "else":
            var param = split.shift();
            var con = split.join(" ");
            if (param && param == "if") {
                code = "#elseif(" + con + ")";
            } else {
                code = "#else";
            }
            break;
        case "include":
            code = "#include";
            break;
        default:
            code = "${" + code + "}";

    }
    return code;
}
module.exports = transform;