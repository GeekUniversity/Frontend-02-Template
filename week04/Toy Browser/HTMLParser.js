const { match } = require("assert");

const EOF = Symbol("EOF");
const startTag = Symbol("startTag");
let currentToken = {};
let currentAttribute = {};
let currentTextNode = null;
let domStack = [{ type: "document", children: [] }];

function emit(token) {

    // if (token.type === "text") {
    //     return;
    // }

    // console.log(JSON.stringify(token));

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

        top.children.push(element);
        element.parent = top;

        if (!token.isSelfClosing) {
            domStack.push(element);
        }
        currentTextNode = null;
    } else if (token.type === "endTag") {
        if (top.tagName != token.tagName) {
            throw new Error("Tag start and end don't match");
        } else {
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
    console.log("----begin parse html----\r\n" + JSON.stringify(html));
    let state = data;
    for (let chr of html) {
        state = state(chr);
    }
    state = state(EOF);
}