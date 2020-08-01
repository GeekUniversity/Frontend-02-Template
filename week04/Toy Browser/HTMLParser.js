const match = require("assert");
const css = require("css");
const cssParser = require("./CSSParser")
const layout = require("./layout")

const EOF = Symbol("EOF");
const startTag = Symbol("startTag");
let currentToken = {};
let currentAttribute = {};
let currentTextNode = null;
let domStack = [{ type: "document", children: [] }];
let rules = [];


function matchSelector(element, selector) {

    if (!element.attributes || !selector)
        return false;

    let content = selector.content;
    let selectors = [];
    let firstSelector = null;
    let secondSelector = null;
    let selectorType = 0;

    if (content.match(/^(\w+|\*{1,1})$/)) {
        selectorType = 0;
    } else if (content.match(/^(\w+|\*{1,1})?(\.\w+){0,1}$/)) {
        selectorType = 1; //class selector
        selectors = content.split(".");
    } else if (content.match(/^(\w+|\*{1,1})?(\#\w+){0,1}$/)) {
        selectorType = 2; //id selector
        selectors = content.split("#");
    } else if (content.match(/^(\w+|\*{1,1})?(\:{1,2}\w+){1,1}$/)) {
        selectorType = 3; //pseudo class
        selectors = content.split(":");
    } else if (content.match(/^([a-zA-Z]+|\*{1,1})?(\[\w+\]){1,1}$/)) {
        selectorType = 4; //Attribute selector
        selectors = content.split(/[\[\]]/);
    } else {
        console.log(content + " not matched");
        return;
    }

    firstSelector = (selectors.length === 0 ? str : selectors[0]);
    //元素为空的时候，强制设置成*,方便以后的判断
    if (firstSelector === null || firstSelector === "") {
        firstSelector = "*";
    }
    secondSelector = (selectors.length > 1 ? selectors[1] : null);

    //如果第tagname都匹配不上，则直接返回
    if (firstSelector !== "*" && firstSelector !== element.tagName) {
        return false;
    }

    //普通的 div,*
    if (selectorType === 0) {
        return true;
    } else if (selectorType === 1) { // class selector
        var attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value) {
            //多类选择器
            let attrs = attr.value.split(" ");
            for (let i = 0; i <= attrs.length; i++) {
                // if (attrs[i] === content.replace(".", '')) {
                if (attrs[i] === secondSelector) {
                    return true;
                }
            }
        }
    } else if (selectorType === 2) { //id 选择器
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === secondSelector) {
            return true;
        }
    } else if (secondSelector === 3) { //伪类
        return true;
    } else {  //属性，暂不处理
        return true;
    }
    return false;
}

function getSpecificity(selectorParts) {
    let sp = [0, 0, 0, 0];

    for (let sel of selectorParts) {
        if (sel.content.charAt(0) === "#") {
            sp[1] += 1;
        } else if (sel.content.charAt(0) === ".") {
            sp[2] += 1;
        } else {
            sp[3] += 1;
        }
    }
    return sp;
}

function compareSpecificity(sp1, sp2) {
    for (let i = 0; i < 4; i++) {
        if (sp1[0] - sp2[0]) {
            return sp1[0] - sp2[0];
        }
        if (sp1[1] - sp2[1]) {
            return sp1[1] - sp2[1];
        }
        if (sp1[2] - sp2[2]) {
            return sp1[2] - sp2[2];
        }
        if (sp1[4] - sp2[4]) {
            return sp1[4] - sp2[4];
        }
    }
}

function computeCSS(element) {

    let elements = domStack.slice().reverse();

    if (!element.computedStyle) {
        element.computedStyle = {};
    }

    //每一条rule对应一个style
    for (let rule of rules) {

        let selectorParts = [];
        /*
        * div p h1,h1#c1,div div.con > h1,div h2#c2
        * 将以上复杂CSS组合拆分
        */
        for (let ind = 0; ind < rule.selectors.length; ind++) {

            selectorParts = [...cssParser.parse(rule.selectors[ind]).reverse()];

            //先匹配本身
            if (!matchSelector(element, selectorParts[0])) {
                continue;
            }

            let matched = false;

            //匹配这个元素的父元素
            var j = 1;
            for (var i = 0; i < elements.length; i++) {
                //在实际写的时候可能不一定写的很完整
                if (selectorParts.length < j) {
                    match = true;
                    break;
                } else if (matchSelector(elements[i], selectorParts[j])) {
                    j++;
                }
            }

            if (!matched && j >= selectorParts.length) {
                matched = true;
            }

            if (matched) {

                let sp = getSpecificity(selectorParts);

                let computedStyle = element.computedStyle;

                //如果一个元素匹配类多个规则，那么它里面的属性是一个合集
                for (let dec of rule.declarations) {

                    if (!computedStyle[dec.property]) {
                        computedStyle[dec.property] = {};
                    }

                    if (!computedStyle[dec.property].specificity) {
                        computedStyle[dec.property].specificity = sp;
                        computedStyle[dec.property].value = dec.value;
                    } else if (compareSpecificity(computedStyle[dec.property].specificity, sp) < 0) {
                        computedStyle[dec.property].specificity = sp;
                        computedStyle[dec.property].value = dec.value;
                    }
                }
                // console.log("Element", element, "mached rules", rule);
            }
        }
    }
}

function emit(token) {
    let top = domStack[domStack.length - 1];

    if (token.type === "startTag") {
        let element = {
            type: "element",
            tagName: token.tagName,
            children: [],
            attributes: []
        };

        for (let p in token) {
            if (p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
            }
        }

        element.parent = top;

        //计算CSS
        computeCSS(element);

        top.children.push(element);

        if (!token.isSelfClosing) {
            domStack.push(element);
        }

        currentTextNode = null;

    } else if (token.type === "endTag") {

        // console.log(JSON.stringify(token));

        if (top.tagName != token.tagName) {
            throw new Error("Tag start and end don't match");
        } else {

            //收集CSS，一般都是在标签之前
            if (token.tagName === "style") {
                addCSSRules(top.children[0].content);
            }
            layout(top);
            domStack.pop();
        }

        currentTextNode = null;
    } else if (token.type === "text") {
        if (currentTextNode === null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function addCSSRules(cssContent) {
    // console.log(css.parse(cssContent));
    let ast = css.parse(cssContent);
    // css.parse()
    // console.log(ast, null, "  ");
    rules.push(...ast.stylesheet.rules);
}

function data(chr) {
    if (chr === '<') {
        return tagOpen;
    } else if (chr === EOF) {
        emit({
            type: "EOF"
        })
        return;
    } else {
        emit({
            type: "text",
            content: chr
        });
        return data;
    }
}

function tagOpen(chr) {
    if (chr === "/") {
        return endTagOpen;
    } else if (chr.match(/^[A-Za-z]$/)) {
        //reconsume逻辑
        currentToken = {
            type: "startTag",
            tagName: ""
        };
        return tagName(chr);
    } else {
        return;
    }
}

function endTagOpen(chr) {
    if (chr.match(/^[A-Za-z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        };
        return tagName(chr);
    } else if (chr === ">") {

    } else if (chr === EOF) {

    } else {

    }
}

function tagName(chr) {
    if (chr.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (chr === "/") {
        return selfClosingStartTag;
    } else if (chr.match(/^[A-Za-z]$/)) {
        currentToken.tagName += chr//.toLowerCase();
        return tagName;
    } else if (chr === ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function selfClosingStartTag(chr) {
    if (chr === ">") {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (chr === "EOF") {

    } else {

    }
}

function beforeAttributeName(chr) {
    if (chr.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (chr === ">" || chr === "/" || chr === EOF) {
        return afterAttributeName(chr);
    } else if (chr === "=") {
        return attributeName;
    } else {
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(chr);
    }
}

function attributeName(chr) {
    if (chr.match(/^[\t\n\f >]$/) || chr === "/" || chr === ">" || chr === EOF) {
        return afterAttributeName(chr);
    } else if (chr === "=") {
        return beforeAttributeValue;
    } else if (chr === "\u0000") {

    } else if (chr === "\"" || chr === "'" || chr === "<") {

    } else {
        currentAttribute.name += chr;
        return attributeName;
    }
}

function afterAttributeName(chr) {
    if (chr.match(/^[\t\b\f ]$/)) {
        return afterAttributeName;
    } else if (chr === "/") {
        return selfClosingStartTag;
    } else if (chr === "=") {
        return beforeAttributeValue;
    } else if (chr === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (chr === EOF) {
        emit({
            type: EOF
        });
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(chr);
    }
}

function beforeAttributeValue(chr) {
    // if (chr.match(/^[\t\n\f ]$/)) {
    //按照标准应该是上面的代码
    if (chr.match(/^[\t\n\f ]$/) || chr === "/" || chr === ">" || chr === EOF) {
        return beforeAttributeValue;
    } else if (chr === "\"") {
        return doubleQuotedAttributeValue;
    } else if (chr === "\'") {
        return singleQuotedAttributeValue;
    } else if (chr === ">") {
        // return data; 此处为什么注释掉？
    } else {
        return unquotedAttributeValue(chr)
    }
}

function doubleQuotedAttributeValue(chr) {
    if (chr === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (chr == "\u0000") {

    } else if (chr === EOF) {
        emit({
            type: EOF
        });
    } else if (chr === "&") {
        console.log(chr);
    } else {
        currentAttribute.value += chr;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(chr) {
    if (chr === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (chr == "\u0000") {

    } else if (chr === EOF) {
        emit({
            type: EOF
        });
    } else if (chr === "&") {
        console.log(chr);
    } else {
        currentAttribute.value += chr;
        return singleQuotedAttributeValue;
    }
}

function unquotedAttributeValue(chr) {
    if (chr.match(/^[\t\f\n ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (chr === "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (chr === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (chr === "\u0000") {

    } else if (chr === "\"" || chr === "'" || chr === "<" || chr === "=" || chr === "`") {

    } else if (chr === EOF) {
        emit({
            type: EOF
        });
    } else {
        currentAttribute.value += chr;
        return unquotedAttributeValue;
    }
}

function afterQuotedAttributeValue(chr) {
    if (chr.match(/^[\t\f\n ]$/)) {
        return beforeAttributeName;
    } else if (chr === "//") {
        return selfClosingStartTag;
    } else if (chr === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (chr === EOF) {
        emit({
            type: EOF
        });
    } else {
        return beforeAttributeName(chr);
    }
}

module.exports.parseHTML = function parseHTML(html) {
    // console.log("----begin parse html----\r\n" + JSON.stringify(html));
    let state = data;
    for (let chr of html) {
        state = state(chr);
    }
    state = state(EOF);

    // console.log(JSON.stringify(domStack,null," "));
    return domStack;
}