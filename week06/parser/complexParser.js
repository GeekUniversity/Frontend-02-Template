/*
* 采用状态机解析复杂（complex selector）选择器,解析每个组合（compound selector）选择器的类型
* div p h1
  h1#c1
  div div.con > h1
  div h2#c2
  div div#mydiv1+p#p1
  ....
*/
var complexParser = (function () {

    let computedCSS = [];
    let currentCSS = null;
    // let currentType = "";
    let EOF = Symbol("EOF");

    function emit(css) {
        css.content = css.content.trim();
        computedCSS.push(css);
    };

    function start(chr) {
        if (chr === EOF) {
            if (computedCSS) {
                emit(currentCSS);
            }
        } else if (chr.match(/[ ~>+\|]/)) {
            return foundCombinator(chr);
        } else {
            return foundCSS(chr);
        }
    };

    function foundCSS(chr) {

        if (!currentCSS) {
            currentCSS = {
                type: "",
                content: ""
            };
        }

        currentCSS.content += chr;
        return start;
    };

    //+,>,~
    function foundCombinator(chr) {

        if (chr.match(/[ +>~]/)) {

            //提交前面一个CSS
            if (currentCSS) {
                currentCSS.type = chr;
                emit(currentCSS);
                currentCSS = null;
            }
        } else if (chr === "|") {
            return foundFirstPipeLine;
        }

        return start
    };

    function foundFirstPipeLine(chr) {
        if (chr === "|") {
            if (currentCSS) {
                currentCSS.type = "|";
                emit(currentCSS);
                currentCSS = null;
            }
            return start;
        } else {
            if (!currentCSS) {
                currentCSS.content = "";
                currentCSS.type = "";
            }
            currentCSS.content += "|";
            return start(chr);
        }
    };

    return function (css) {

        let state = start;

        computedCSS = [];
        currentCSS = null;

        for (let chr of css) {
            state = state(chr);
        }

        state(EOF);

        return computedCSS;
    };
})();
