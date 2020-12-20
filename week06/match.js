
/*
* 需要引入attParser.js和complexParser.js，在github上面
* 支持选择器列表，复杂选择器，复合选择器
* 命名空间选择器只实现了tagname的比较
* || 选择器未支持
*/
function match(selector, ele) {

    if (!selector || !ele) {
        return false;
    }

    let selectorList = [];

    //1.首先分解selectorList
    selectorList = selector.split(",");
    if (selectorList.length <= 0) {
        return false;
    }

    //2. 匹配selectorList
    for (let sel of selectorList) {
        if (matchComplexSelector(sel, ele)) {
            return true;
        }
    }

    return false;
}

/*
* 匹配复杂选择器
*/
function matchComplexSelector(complexSelector, element) {

    /*
    * 将复杂选择器分解为带类型的复合选择器,如：div div#mydiv1+p#p1 会分解为：
    * {"type":"","content":"div"},{"type":"+","content":"div#mydiv1"},{"type":" ","content":"p#p1"}
    */
    let computedCSS = complexParser(complexSelector, element).reverse();

    console.log(JSON.stringify(computedCSS));

    if (computedCSS.length <= 0) {
        return false;
    }

    if (!matchSelector(computedCSS[0].content, element)) {
        return false;
    }

    let ind = 1;
    let currElement = element;

    for (ind = 1; ind < computedCSS.length; ind++) {

        if (computedCSS[ind].type === " ") {           // 后代
            let matched = false;

            //后代选择器需要一直向上找
            while (currElement.parentNode) {
                currElement = currElement.parentNode;

                if (matchSelector(computedCSS[ind].content, currElement)) {
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                return false;
            }
        } else if (computedCSS[ind].type === ">") {    // 子代
            if (currElement.parentNode) {
                currElement = currElement.parentNode;
                if (!matchSelector(computedCSS[ind].content, currElement)) {
                    return false;
                }
            }
        } else if (computedCSS[ind].type === "+") {
            if (currElement.previousElementSibling && matchSelector(computedCSS[ind].content, currElement.previousElementSibling)) {
                currElement = currElement.previousElementSibling;
            } else {
                return false;
            }
        } else if (computedCSS[ind].type === "~") {

            let matched = false;
            while (currElement.previousElementSibling) {
                currElement = currElement.previousElementSibling;
                if (matchSelector(computedCSS[ind].content, currElement)) {
                    logEle(currElement);
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                return false;
            }
        } else if (computedCSS[ind].type === "|") {
            //暂不处理命名空间
            return true;
        }
    }

    return true;
}

/*
*  匹配复合选择器和简单选择器
*/
function matchSelector(content, element) {

    if (!content && !element) {
        return false;
    }

    /*
     * 支持如下形式:
     * div 或 *
     * id 选择器 div#id
     * 类选择器  div.attr
     * 命名空间  div|ele
     * 伪类,伪元素 div:attr，div::attr
     * 属性选择器(支持空格) [attr],div[attr]，div[attr=val]
     */
    let ret = content.match(/^(?<tag>[\w+]+|\*{1,1})?((?<id>\#\s*\w+)|(?<cls>\.\w+)|((?<nms>\|\w+))|(?<pseu>\:{1,2}\w+)|(?<att>\s*\S+\s*(((=)|(\~=)|(\|=)|(\^=)|(\$=)|(\*=))\s*\S+\s*)?))?$/);
    if (!ret) {
        return false;
    }
    let { tag, id, cls, nms, pseu, att } = ret.groups;

    //对于[attr]这种，tag解析出来的是空，所以赋值为*
    //转成大写是因为nodeName都是大写
    tag = tag ? tag.toUpperCase() : "*"

    let tagMatched = matchTag(tag,element);

    if (id) {                //id选择器
        return (tagMatched && matchId(tag, id, element));
    } else if (cls) {        //class选择器
        return (tagMatched && matchCls(tag, cls, element));
    } else if (nms) {        //命名空间
        return matchNms(tag, nms, element);
    } else if (pseu) {       //伪类，伪元素
        return (tagMatched && matchPseu(tag, pseu, element));
    } else if (att) {        //属性
        return (tagMatched && matchAttr(tag, att, element));
    } else {                 //其他直接返回元素比较的结果
        return tagMatched;
    }
}

function matchTag(tag, element) {
    //如果第tagname都匹配不上，则直接返回false
    if (tag !== "*" && tag !== element.nodeName) {
        return false;
    } else {
        return true;
    }
}

/*
 匹配Id选择器
*/
function matchId(tag, id, element) {

    id = (id.charAt(0) === "#" ? id.substring(1) : id);

    return (element.id && element.id.toUpperCase() === id.toUpperCase());
}

/*
匹配类选择器
*/
function matchCls(tag, cls, element) {

    cls = (cls.charAt(0) === "." ? cls.substring(1) : cls);

    //多类选择器
    for (let i = 0; i <= element.classList.length; i++) {
        if (element.classList[i].toUpperCase() === cls.toUpperCase()) {
            return true;
        }
    }
    return false;
}

/*
匹配命名空间
*/
function matchNms(tag, nms, element) {

    //暂时不比较命名空间

    nms = (nms.charAt(0) === "|" ? nms.substring(1) : nms);

    //比较元素名字
    return (nms.toUpperCase === element.nodeName.toUpperCase);
}

/*
匹配伪类，伪元素，只要元素tagName能匹配就算匹配上
*/
function matchPseu(tag, cls, element) {

    //如果第tagname都匹配不上，则直接返回false
    if (tag !== "*" && tag !== element.nodeName) {
        return false;
    } else {
        return true;
    }
}

/*
匹配属性
*/
function matchAttr(tag, att, element) {

    let attr = attrParser(att);

    if (attr.type === "=") {//匹配[attr=vale]
        let attrVal = element.attributes.getNamedItem(attr.name);
        if (attrVal && attrVal.nodeValue.toUpperCase() !== attr.value.toUpperCase()) {
            return false;
        }
    }
    return true;
}


function logEle(element) {
    console.log("matched element: %o", element);
}

