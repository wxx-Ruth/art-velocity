export default {
    tool: tool
}

function tool(id, opt) {
    var tpl = document.querySelector("#" + id).innerHTML;
    opt = opt || {
        openTag: "{{",
        closeTag: "}}"
    };
    transform(tpl, opt);
}
function transform(tpl, opt) {
    var openTag = opt.openTag,
        closeTag = opt.closeTag;
    var main = "";
    forEach(tpl.split(openTag), function (code) {
        code = code.split(closeTag);
        var $0 = code[0];
        var $1 = code[1];
        if (code.length == 1) {
            main += html($0)
        } else {
            main += logic($0);
            if ($1) {
                main += $1;
            }
        }
    });
}
function logic(code) {
    code = parser(code)
}
function parser(code) {
    code = code.replace("/^\s/", "");
    var split = code.split(" ");
    var key = split.shift();
    var args = split.join("");
    switch (key) {
        case "if":
            code = '#if(' + args + '){';
            break;
        case "/if":
        case "/each":
            code = "#end";
            break;
        case "each":
            var list = split[0];
            var as = split[1] || "as";
            var item = split[2] || "$value";
            var index = split[3] || "$index";
            code = "#foreach("+ item + "in"+ list +")"
        case "else":
        default:
            code = "${"+ args +"}";

    }
}