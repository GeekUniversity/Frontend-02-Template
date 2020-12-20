# CSS顶层样式表
## at-rule（at规则）
at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束
|类型|说明|例子|
|---|----|----|
|@charset|@charset 用于提示 CSS 文件使用的字符编码方式，它如果被使用，必须出现在最前面。这个规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。|@charset "utf-8"|
|@import|@import 用于引入一个 CSS 文件，除了 @charset 规则不会被引入，@import 可以引入另一个文件的全部内容。|@import "mystyle.css";<br>@import url("mystyle.css");|
|@media|它能够对设备的类型进行一些判断。在 media 的区块内，是普通规则列表|@media print {body<br> { font-size: 10pt }}
|@page|page 用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒|@page {  size: 8.5in 11in;margin: 10%;  @top-left {    content: "Hamlet";  }  @top-right {    content: "Page " counter(page);  }}||@counter-style |counter-style 产生一种数据，用于定义列表项的表现|@counter-style triangle {system: cyclic;  symbols: ‣;  suffix: " ;}|
|@keyframes |keyframes 产生一种数据，用于定义动画关键帧||
|@fontface  |ontface 用于定义一种字体，icon font 技术就是利用这个特性来实现的|@font-face {  font-family: Gentium;  src: url(http://example.com/fonts/Gentium.woff);}p { font-family: Gentium, serif; }|
|@supports|support 检查环境的特性，它与 media 比较类似。||
|@namespace |用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。||
|@ viewport|用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。||
|||
## qualified rule（普通规则）
qualified rule 则是指普通的 CSS 规则，也就是我们所熟识的，由选择器和属性指定构成的规则
# CSS选择器
## 简单选择器（simple selector）
|类型|说明|例子|
|---|---|----|
|Type (tag name) selector|For example, the selector h1 represents an h1 element in the document.|div {background-color:yellow;}|
|Class selector|full stop (. U+002E)<br>The class selector is given as a full stop (. U+002E) immediately followed by an identifier. It represents an element belonging to the class identified by the identifier|h1.pastoral { color: green }|
|Universal selector|asterisk (* U+002A)<br>The universal selector is a special type selector, that represents an element of any element type.<br>|div * {background-color:yellow;}|
|Namespaces |ns\|E<br>elements with name E in namespace ns<br>*\|E<br>elements with name E in any namespace, including those without a namespace<br>\|E<br>elements with name E without a namespace<br>E<br>if no default namespace has been declared for selectors, this is equivalent to *\|E. Otherwise it is equivalent to ns\|E where ns is the default namespace|```@namespace url(http://www.w3.org/1999/xhtml);@namespace svg url(http://www.w3.org/2000/svg);/* 匹配所有的XHTML <a> 元素, 因为 XHTML 是默认无前缀命名空间 */a {}/* 匹配所有的 SVG <a> 元素 */svg|a {}/* 匹配 XHTML 和 SVG <a> 元素 */*|a {} ```|
|ID selector|number sign (# U+0023)<br>An ID selector consists of a “number sign” (U+0023, #) immediately followed by the ID value, which must be a CSS identifier.|h1#chapter1 |
|Attribute selector|h1[title]<br>span[class="example"]<br>[att~=val]：Represents an element with the att attribute whose value is a whitespace-separated list of words, one of which is exactly "val". <br>[att\|=val]：Represents an element with the att attribute, its value either being exactly "val" or beginning with "val" immediately followed by "-" (U+002D). <br>[att^=val]：Represents an element with the att attribute whose value begins with the prefix "val". If "val" is the empty string then the selector does not represent anything.<br>[att$=val]：Represents an element with the att attribute whose value ends with the suffix "val". If "val" is the empty string then the selector does not represent anything.<br>[att*=val]：Represents an element with the att attribute whose value contains at least one instance of the substring "val". If "val" is the empty string then the selector does not represent anything.||
|pseudo-class|The syntax of a pseudo-class consists of a ":" (U+003A COLON) followed by the name of the pseudo-class as a CSS identifier, and, in the case of a functional pseudo-class, a pair of parentheses containing its arguments.|:active<br>:focus<br>:hover<br>:link<br>:visited<br>:lang<br>:first-child<br>|
|pseudo-element|CSS 伪元素用于向某些选择器设置特殊效果<br>The syntax of a pseudo-element is "::" (two U+003A COLON characters) followed by the name of the pseudo-element as an identifier. Pseudo-element names are ASCII case-insensitive. No white space is allowed between the two colons, or between the colons and the name..|:first-line<br>:first-letter<br>:before<br>:after |
||||

## 复合选择器（compound selector）
A compound selector is a sequence of simple selectors that are <b>not separated</b> by a combinator, and represents a set of simultaneous conditions on a single element. <b>If it contains a type selector or universal selector, that selector must come first in the sequence.</b> Only one type selector or universal selector is allowed in the sequence.<br>
    
    div.con
    div#com

## 复杂选择器（complex selector ）
A complex selector is a sequence of one or more compound selectors <b>separated</b> by combinators. It represents a set of simultaneous conditions on a set of elements in the particular relationships described by its combinators.

|类型|分隔符|说明|
|-------|--------|-------|
|Descendant combinator<br>后代选择器| 空格    |选择指定祖先元素内的后代元素|
|Child combinator<br>子代选择器|>|选择指定父元素内的直接子元素|
|Next-sibling combinator<br>相邻兄弟选择器|+|P+b : 同一个父元素下p标签后面的第一个兄弟元素b|
|Subsequent-sibling combinator<br>通用兄弟选择器|~|p~b : 同一个父元素下p标签后面的所有兄弟元素b|
|Column combinator<br>列合并选择器| \|\|  |例：column-selector \|\| cell-selector { /* style properties */}|
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
内联 > ID选择器 > 类选择器（=属性=伪类）> 标签选择器(=伪元素) > 通配符(*)
    
|类型|优先级|
|----|------|
|important声明| 1,0,0,0|
|ID选择器 |0,1,0,0|
|类选择器，伪类，属性 |0,0,1,0|
|标签选择器，伪元素| 0,0,0,1|
|通配符选择器| 0,0,0,0|

例：
|选择器|优先级|
|-----|-----|
|div div #id |（0,1,0,2）|
|div #my #id |（0,2,0,1）|
|div#a.b.c[id=x] |（0,1,3,1）|
|#a:not(#b)|（0,2,0,0）|
|*.a|（0,0,1,0）|
|div.a|（0，0,1,1）|
|||

#正则表达式

  可以定义标签名可以方便的取得匹配的结果

    let ret = content.match(/^(?<tag>[\w+]+|\*{1,1})?((?<id>\#\s*\w+)|(?<cls>\.\w+)|((?<nms>\|\w+))|(?<pseu>\:{1,2}\w+)|(?<att>\s*\S+\s*(((=)|(\~=)|(\|=)|(\^=)|(\$=)|(\*=))\s*\S+\s*)?))?$/);
    if (!ret) {
       return false;
    }
    let { tag, id, cls, nms, pseu, att } = ret.groups;