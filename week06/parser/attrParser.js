/*
* 分解元素属性，支持
* =,*=,|=,
*/
var attrParser = (function () {
    let EOF = Symbol("EOF");
    let currAttr = {}

    function start(chr) {
        if (chr.match(/[ \t\f]/)) {
            return start;
        } else if (chr === "[") {
            return foundStart(chr);
        } else if (chr === "]") {
            return end;
        } else if (chr === EOF) {
            return end;
        } else {  //属性必须以[开始
            return end;
        }
    }

    function foundEqu(chr) {
        if (chr === "]") {
            return start(chr);
        } else if (chr.match(/\S+/)) {
            if (!currAttr) {
                currAttr = {
                    name: "",
                    value: "",
                    type: "="
                }
            }
            //不拼接",'
            if (!chr.match(/[\"\"\'\']/)){
                currAttr.value += chr;
            }
            return foundEqu;
        }
        else {
            return start(chr);
        }
    }

    function foundStart(chr) {
        if (chr === "=") {
            return foundEqu;
        }
        else if (chr === "["){
            if (!currAttr) {
                currAttr = {
                    name: "",
                    value: "",
                    type: "="
                }
            }
            return foundStart;
        } else if (chr.match(/[\*\|\^\$\~]/)) {
            
            currAttr.type = chr;
            return foundFirst;

        } else if (chr.match(/\S+/)) {
            currAttr.name += chr;
            return foundStart;
        } else if (chr === "]") {
            return start(chr);
        } else {
            return foundStart;
        }
    };

    function end(chr) {
        return end;
    };

    function foundFirst(chr) {
        if (chr === "=") {
            return foundEqu;
        } else { //不是=就是非法的属性
            currAttr = null;
            return end;
        }
    };

    return function (attr) {

        let state = start;
        currAttr = null;
        attributes = [];
        for (let chr of attr) {
            state = state(chr);
        }

        if (state === end) {
            state(EOF);
        } else {
            currAttr = null;
        }

        return currAttr;
    };
})();
