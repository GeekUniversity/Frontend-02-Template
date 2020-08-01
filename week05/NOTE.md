# 浏览器工作原理
## CSS Computing
### CSS选择器（部分）
#### 简单选择器（simple selector）
|类型|说明|例子|
|---|---|----|
|Type (tag name) selector|For example, the selector h1 represents an h1 element in the document.|div {background-color:yellow;}|
|Class selector|full stop (. U+002E)<br>The class selector is given as a full stop (. U+002E) immediately followed by an identifier. It represents an element belonging to the class identified by the identifier|h1.pastoral { color: green }|
|ID selector|number sign (# U+0023)<br>An ID selector consists of a “number sign” (U+0023, #) immediately followed by the ID value, which must be a CSS identifier.|h1#chapter1 |
|Universal selector|asterisk (* U+002A)<br>The universal selector is a special type selector, that represents an element of any element type.<br>|div * {background-color:yellow;}|
|Attribute selector|h1[title]<br>span[class="example"]<br>[att~=val]：Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val". <br>[att\|=val]：Represents an element with the att attribute, its value either being exactly "val" or beginning with "val" immediately followed by "-" (U+002D). <br>[att^=val]：Represents an element with the att attribute whose value begins with the prefix "val". If "val" is the empty string then the selector does not represent anything.<br>[att$=val]：Represents an element with the att attribute whose value ends with the suffix "val". If "val" is the empty string then the selector does not represent anything.<br>[att*=val]：Represents an element with the att attribute whose value contains at least one instance of the substring "val". If "val" is the empty string then the selector does not represent anything.||
|pseudo-class|The syntax of a pseudo-class consists of a ":" (U+003A COLON) followed by the name of the pseudo-class as a CSS identifier, and, in the case of a functional pseudo-class, a pair of parentheses containing its arguments.|:active<br>:focus<br>:hover<br>:link<br>:visited<br>:lang<br>:first-child<br>|
|pseudo-element|CSS 伪元素用于向某些选择器设置特殊效果<br>The syntax of a pseudo-element is "::" (two U+003A COLON characters) followed by the name of the pseudo-element as an identifier. Pseudo-element names are ASCII case-insensitive. No white space is allowed between the two colons, or between the colons and the name..|:first-line<br>:first-letter<br>:before<br>:after |
||||

#### 复合选择器（compound selector）
A compound selector is a sequence of simple selectors that are <b>not separated</b> by a combinator, and represents a set of simultaneous conditions on a single element. <b>If it contains a type selector or universal selector, that selector must come first in the sequence.</b> Only one type selector or universal selector is allowed in the sequence.<br>
    
    div.con
    div#com

#### 复杂选择器（complex selector ）
A complex selector is a sequence of one or more compound selectors <b>separated</b> by combinators. It represents a set of simultaneous conditions on a set of elements in the particular relationships described by its combinators.

|类型|分隔符|说明|
|-------|--------|-------|
|Descendant combinator<br>后代选择器| 空格    |选择指定祖先元素内的后代元素|
|Child combinator<br>子代选择器|>|选择指定父元素内的直接子元素|
|Next-sibling combinator<br>相邻兄弟选择器|+|P+b : 同一个父元素下p标签后面的第一个兄弟元素b
|Subsequent-sibling combinator<br>通用兄弟选择器|~|p~b : 同一个父元素下p标签后面的所有兄弟元素b
|||

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8"> 
    <title>菜鸟教程(runoob.com)</title> 
    <style>
    body {color:red;}
    h1,h1#c1,div.con>h1,div h2#c2{color:blue;}
    p.ex {color:rgb(0,0,255);}
    </style>
    </head>

    <body>
    <h1 id="c1">这是标题 1</h1>
        <h2 id="c2">h2</h2>
    <h1>这是标题 1</h1>
        <div class="con">
            <div><h1>H1：3333</h1></div>
            <h1>H1：11111</h1>
            <h2 id="c2">h2</h2>
            <h3 id="c2">h3</h3>
        </div>
    </body>
    </html>

#### 选择器列表（selector list）

### CSS选择器的优先级
    内联 > ID选择器 > 类选择器 > 标签选择器
    内连样式 优先级 1000
    id 选择器 优先级 100
    类选择器 优先级 10
    元素选择器 优先级 1
    统配选择器 优先级 0
    
    例：
    div div #id
    [0,1,0,2]

    div #my #id
    [0,2,0,1]
# CSS布局
## Flex
    flex-direction:row
    main:width x left right
    cross:height y top bottom

    flex-direction:cloumn
    main:height y top bottom
    cross:width x left right



