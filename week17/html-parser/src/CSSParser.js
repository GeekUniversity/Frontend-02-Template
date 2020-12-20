/*
* 采用状态机解析复杂（complex selector）选择器,解析每个组合（compound selector）选择器的类型
* div p h1
  h1#c1
  div div.con > h1
  div h2#c2
*/
let computedCSS = [];
let currentCSS = null;
let currentType = "descendant";
let EOF = Symbol("EOF");

function emit(css, type) {
    css.content = css.content.trim();
    css.type = type;
    computedCSS.push(css);
}

function start(chr) {
    if (chr === EOF) {
        if (computedCSS) {
            emit(currentCSS, currentType);
        }
    } else if (chr === " ") {
        return foundWhitespace;
    } else if (chr.match(/[~>+]/)) {
        return foundCombinator(chr);
    } else {
        return foundCSS(chr);
    }
}

function foundCSS(chr) {

    if (!currentCSS) {
        currentCSS = {
            type: currentType,
            content: ""
        };
    }

    currentCSS.content += chr;
    return start;
}

//+,>,~
function foundCombinator(chr) {

    //提交前面一个CSS
    if (currentCSS) {
        emit(currentCSS, currentType);
        currentCSS = null;
    }

    if (chr === "+") {
        currentType = "nextsibling";
    } else if (chr === ">") {
        currentType = "child";
    } else if (chr === "~") {
        currentType = "subsequentsibling";
    }

    return start
}

function foundWhitespace(chr) {
    if (chr === " ") {
        return foundWhitespace;
    } else if (chr.match(/[~>+]/)) {
        return foundCombinator(chr);
    } else {

        //提交前面一个CSS
        if (currentCSS) {
            emit(currentCSS, currentType);
            currentCSS = null;
            currentType = "descendant";
        }

        return start(chr);
    }
}

module.exports.parse = function parse(css) {

    let state = start;

    computedCSS = [];
    currentCSS = null;
    currentType = "descendant";

    for (let chr of css) {
        state = state(chr);
    }

    state(EOF);

    return computedCSS;
}