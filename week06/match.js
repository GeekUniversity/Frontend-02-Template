
function matchSelector(content, element) {
    if (!content && !element) {
        return false;
    }

    let selectors = [];
    let firstSelector = null;
    let secondSelector = null;
    let selectorType = 0;

    //分解复合选择器
    if (content.match(/^(\w+|\*{1,1})$/)) {
        selectorType = 0;
    } else if (content.match(/^(\w+|\*{1,1})?(|\w+){0,1}$/)) {
        selectorType = 1; //svg|a
        selectors = content.split("|");
    }
    else if (content.match(/^(\w+|\*{1,1})?(\.\w+){0,1}$/)) {
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

    firstSelector = (selectors.length === 0 ? content : selectors[0]);

    //元素为空的时候，强制设置成*,方便以后的判断
    if (firstSelector === null || firstSelector === "") {
        firstSelector = "*";
    }

    firstSelector = firstSelector.toUpperCase();
    secondSelector = (selectors.length > 1 ? selectors[1].toUpperCase() : null);

    //如果第tagname都匹配不上，则直接返回
    if (firstSelector !== "*" && firstSelector !== element.nodeName) {
        return false;
    }

    //普通的 div,*
    if (selectorType === 0) {
        return true;
    } else if (selectorType === 1) { // class selector
        //多类选择器
        for (let i = 0; i <= element.classList.length; i++) {
            if (element.classList[i] === secondSelector) {
                return true;
            }
        }
    } else if (selectorType === 2 && element.attributes.length > 0) { //id 选择器
        // var attr = element.attributes.getNamedItem("id").value;
        if (element.id && element.id.toUpperCase() === secondSelector) {
            return true;
        }
    } else if (secondSelector === 3) { //伪类
        return true;
    } else {  //属性，暂不处理
        return true;
    }
    return false;
}

function matchComplexSelector(complexSelector, element) {

    //将复杂选择器分解为复合选择器
    let computedCSS = parseCSS(complexSelector, element).reverse();
    if (computedCSS.length <= 0) {
        return false;
    }

    if (!matchSelector(computedCSS[0].content, element)) {
        return false;
    }

    let ind = 1;
    let currElement = element;
    let currSelector = computedCSS[0];

    for (let ind = 1; ind < computedCSS.length; ind++) {
        if (currSelector.type === " ") { // 子代选择器

            //需要遍历所有的父类，看是否可以匹配
            while (currElement.parentNode) {
                currElement = currElement.parentNode;

                if (matchSelector(computedCSS[ind].content, currElement)) {
                    logEle(currElement);
                    matched = true;
                    break;
                }
                else {
                    matched = false;
                }
            }

            //只要有一个没有找到就返回false
            if (!matched) {
                return false;
            }
        } else if (currSelector.type === ">") {

            //查找直接的父类
            if (!matchedSelector(computedCSS[ind].content, matchedElement.parent)) {
                if (matchSelector(computedCSS[ind].content, currElement.nextElementSibling)) {
                    logEle(currElement);
                    return true;
                } else {
                    currElement = currElement.nextElementSibling;
                }
            }
        } else if (currSelector.type === "+") {
            if (currElement.previousElementSibling && matchSelector(computedCSS[ind].content, currElement.previousElementSibling)) {
                logEle(currElement);
                return true;
            } else {
                return false;
            }
        } else if (currSelector.type === "~") {
            while (currElement.previousElementSibling) {
                currElement = currElement.previousElementSibling;
                if (matchSelector(computedCSS[ind].content, currElement)) {
                    logEle(currElement);
                    return true;
                }
            }
            return false;
        }
    }

    return matched;
}

function logEle(element){
    console.log("matched element: %o",element);
}
function match(selector, ele) {

    if (!selector || !ele) {
        return false;
    }

    // console.log(ele);

    let selectorList = [];

    //1.首先分解selectorList
    selectorList = selector.split(",");
    if (selectorList.length <= 0) {
        return false;
    }

    for (let sel of selectorList) {
        if (matchComplexSelector(sel, ele)) {
            return true;
        }
    }

    return false;
}
