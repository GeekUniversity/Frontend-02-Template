学习笔记

## HTML 基础
### HTML的定义
来与XML，SGHML，H5之后变成了相对独立的语言

https://www.w3.org/TR/2018/SPSD-xhtml1-20180327/DTD/xhtml1-strict.dtd
https://www.w3.org/1999/xhtml/

|符号|说明|
|----|----|
|nbsp U+00A0| 空格，合并成一个？多个使用css的whitespace|
|quot|&quot ,写在属性里面需要转移|
|amp|&amp，=本身|
|lt|&lt，<|
|gt|&gt，>|

### &nbsp和white-space
```` html
<div id="div2" style="white-space: pre;">a      a</div>
<div id="div3">a&nbsp&nbsp&nbsp&nbsp&nbsp&nbspa</div>
````

### white-space的属性<br>

|属性|描述|
|---|---|
|normal|	默认。空白会被浏览器忽略。
|pre|	空白会被浏览器保留。其行为方式类似 HTML 中的 \<pre> 标签。
|nowrap|	文本不会换行，文本会在在同一行上继续，直到遇到 \<br> 标签为止。
|pre-wrap|	保留空白符序列，但是正常地进行换行。
|pre-line|	合并空白符序列，但是保留换行符。
|inherit|	规定应该从父元素继承 white-space 属性的值。

### 命名空间
xhtml,MathML,svg

### HTML解析过程
<img src="https://www.w3cplus.com/sites/default/files/blogs/2018/1812/cssom-3.png">
1、HTML的加载
　　HTML是一个网页的基础，下载完成后解析<br>
2、其他静态资源加载
　　解析HTML时，发现其中有其他外部资源链接比如CSS、JS、图片等，会立即启用别的线程下载。但当外部资源是JS时，HTML的解析会停下来，等JS下载完执行结束后才继续解析HTML，防止JS修改已经完成的解析结果<br>
3、DOM树构建
　　在HTML解析的同时，解析器会把解析完成的结果转换成DOM对象，再进一步构建DOM树<br>
4、CSSOM树构建
　　CSS下载完之后对CSS进行解析，解析成CSS对象，然后把CSS对象组装起来，构建CSSOM树<br>
5、渲染树构建
　　当DOM树和CSSOM树都构建完之后，浏览器根据这两个树构建一棵渲染树<br>
6、布局计算
　　渲染树构建完成以后，浏览器计算所有元素大小和绝对位置<br>
7、渲染
　　布局计算完成后，浏览器在页面渲染元素。经过渲染引擎处理后，整个页面就显示出来<br>
### 基础语法
#### 全局标签架构

``` html
<!DOCTYPE html>	<!-- 声明这个html页面使用的版本，这样写代表是H5最新版本 -->
<html>
<head>
<meta charset="utf-8">  <!-- 告诉浏览器使用的是utf-8字符集 -->
    <title>我的网站</title>	<!-- 这里用来编写网站的标题，显示在浏览器选项卡的位置 -->
</head>
<body>	<!-- 只有body标签里面的内容，才能真正显示在浏览器的窗口中 -->
    <h1>我的第一个标签</h1>
    
    <p>我的第一个段落</p>
</body>
</html>
```

#### 标题
标题就是我们通常理解的文档里面的标题，html里面的标题分为：h1、h2、h3、h4、h5、h6

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf8" />
    <title>标题--HTML基础语法学习</title>
</head>
<body>
    <h1>我是一个h1标题</h1>
    <h2>我是一个h2标题</h2>
    <h3>我是一个h3标题</h3>
    <h4>我是一个h4标题</h4>
    <h5>我是一个h5标题</h5>
    <h6>我是一个h6标题</h6>
</body>
</html>
```

### 段落（P标签）
段落表示一段普通的文字，类似文章中的一个段落

### 文本
HTML 文本格式化标签
````html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" />
        <title>文本--HTML基础语法</title>
    </head>
    <body>
        <b>PHP是世界上最美的语言！！！</b> <!-- b标签，用于加粗字体 -->
        <b>PHP</b>是世界上最美的语言！！！ <!-- b标签，仅对PHP加粗 -->
        <em>PHP</em>是世界上最美的语言！！！<br>
        <i>PHP</i>是世界上最美的语言！！！<br>	<!-- i标签，斜体 -->
        <strong>PHP</strong>是世界上最美的语言！！！<br>	<!-- strong标签，类似加粗 -->
        <sub>PHP</sub>是世界上最美的语言！！！<br>	<!-- sub标签，下沉 -->
        <sup>PHP</sup>是世界上最美的语言！！！<br>	<!-- sup标签，上浮 -->
        <ins>PHP</ins>是世界上最美的语言！！！<br>	<!-- ins标签，下滑线  -->
        <del>PHP</del>是世界上最美的语言！！！<br>	<!-- del标签，文本划线删除 -->
    </body>
</html>
````

### 属性
每一个标签都会拥有一堆属性，来描述这个标签的一些功能。

### 链接
如果在一个 \<a> 标签内包含一个 target 属性，浏览器将会载入和显示用这个标签的 href 属性命名的、名称与这个目标吻合的框架或者窗口中的文档。如果这个指定名称或 id 的框架或者窗口不存在，浏览器将打开一个新的窗口，给这个窗口一个指定的标记，然后将新的文档载入那个窗口。从此以后，超链接文档就可以指向这个新的窗口。

    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf8" />
            <title>链接--HTML基础语法</title>
        </head>
        <body>
            <a href="http://www.baidu.com" target="_blank">点击我可以打开百度页面</a> <!--target标签表示在新的标签页打开 -->
            <a href="http://www.jd.com" target="_blank"><h1>点击跳转京东<h1></a>
        </body>
    </html>
### 图片
在网页中显示一张图片

    <img src="haha.jpg" title="图片的标题" alt="图片的属性" width="100px" height="100px" />

绝对路径和相对路径

- 绝对路径是指一个完整的可以从开头找到这个图片的路径<br/>
- 相对路径是指相对于当前的页面所在的路径

### 列表
    无序列表（常用）
    <ul>
        <li>第一个列表内容</li>
        <li>第二个列表内容</li>
    </ul>
<br/>

    有序列表（用的少）
    <ol>
        <li>第一个列表内容</li>
        <li>第二个列表内容</li>
    </ol>
<br/>

    <dl>	<!-- 自定义列表 -->
        <dt>操作系统</dt>
        <dd>- Linux</dd>
        <dd>- Windows</dd>
    </dl>

### 表格

    <table border="1" cellspacing="0" cellpadding="0">
        <tr>
            <th>头部一</th>
            <th>头部二</th>
        </tr>
        <tr>
            <td>第一行，第一列</td>
            <td>第一行，第二列</td>
        </tr>
        <tr>
            <td>第二行，第一列</td>
            <td>第二行，第二列</td>
        </tr>
    </table>

### 区块
- 块级元素：div是指一块内容的标签，div不显示任何东西，用来包含其他标签，称之为一块内容，需要配合CSS样式来进行页面布局。 h1、p、ul、table都是块级元素，会以新行来开始。
- 内联元素：span标签用来包裹文字。b、id、a、img通常不会以新行开始。

### 表单
表单是用来在网页上显示给用户输入的标签，然后提交给后台服务器进行处理。

- 定义：
```html
<form action="xxx.php" method="post">    
</form>
```    
- 表单元素：

多数情况下被用到的表单标签是输入标签（\<input>），输入类型是由类型属性（type）进行定义的，常用的输入类型如下：

- 文本
```html
<form >
    <input type="text" name="username" value="Kim" />
</form>
```
- 密码
```html
<form>
	Password: <input type="password" name="pwd">
</form>
```
- 单选按钮（Radio Buttons）
```html
<form>
	<input type="radio" name="sex" value="male">Male<br>
	<input type="radio" name="sex" value="female">Female
</form>
```
- 多选按钮（Checkboxes）
```html
<form>
	<input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
	<input type="checkbox" name="vehicle" value="Car">I have a car 
</form>
```
- 提交按钮（Submit Button）
```html
<form name="input" action="html_form_action.php" method="get">
	Username: <input type="text" name="user">
	<input type="submit" value="Submit">
</form>
```

### 框架
框架（iframe）,iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。它能够将另一个HTML页面嵌入到当前页面中。每个嵌入的浏览上下文（embedded browsing context）都有自己的会话历史记录(session history)和DOM树

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" />
        <title>框架--HTML基础语法</title>
    </head>
    <body>
        <iframe src="http://www.baidu.com" width="500px" height="1000px"></iframe>
    </body>
</html>
```

### 头部
完整的头部标签：
``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf8" />
        <base href="http://www.runoob.com/images/" target="_link">  <!-- 页面中 所有的链接的默认地址-->
        <title>头部--HTML基础语法</title>
        <meta name="keywords" content="PHP学习之路">  <!--  这个是做seo优化的时候用的 -->
        <meta name="description" content="改变世界的PHP">    <!--  这个是做seo优化的时候用的 -->
        <meta http-equiv="refresh" content="30">  <!-- 刷新跳转页面 -->
        <link rel="stylesheet" type="text/css" href="mystyle.csss">  <!-- 引入css样式 -->
    </head>
    <body>
        文档内容......
    </body>
</html>
```
## 语义标签
### 说明
根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。
### HTML5 语义化标签
|类型|作用|
|----|----|
|\<article\>|定义文章。
|\<aside\>|	定义页面内容以外的内容。
|\<details\>|	定义用户能够查看或隐藏的额外细节。
|\<figcaption\>|	定义 \<figure> 元素的标题。
|\<figure>|	规定自包含内容，比如图示、图表、照片、代码清单等。
|\<footer>|	定义文档或节的页脚。
|\<header>|	规定文档或节的页眉。
|\<main>	|规定文档的主内容。
|\<mark>	|定义重要的或强调的文本。
|\<nav>	|定义导航链接。
|<section>	|定义文档中的节。
|\<summary>	|定义 \<details> 元素的可见标题。
|\<time>	|定义日期/时间。


## 浏览器事件
### 处理过程（捕获、目标、冒泡）
- 捕获阶段（Capture Phase）<br/>
事件的第一个阶段是捕获阶段。事件从文档的根节点流向目标对象节点。途中经过各个层次的DOM节点，并在各节点上触发捕获事件，直到到达事件的目标节点。捕获阶段的主要任务是建立传播路径，在冒泡阶段，事件会通过这个路径回溯到文档跟节点。

- 目标阶段（Target Phase）<br/>
当事件到达目标节点的，事件就进入了目标阶段。事件在目标节点上被触发，然后会逆向回流，直到传播至最外层的文档节点。

- 冒泡阶段（Bubble Phase）<br/>
事件在目标元素上触发后，并不在这个元素上终止。它会随着DOM树一层层向上冒泡，回溯到根节点。
冒泡过程非常有用。它将我们从对特定元素的事件监听中释放出来，如果没有事件冒泡，我们需要监听很多不同的元素来确保捕获到想要的事件。

简单的理解：<b>捕获阶段就是系统接到外部设备的输入信号，一步步找到最终目标对象的过程，冒泡阶段就是由目标对象一层层向外传递事件的过程。</b>

    document.getElementById("parent").addEventListener("mousedown", () => {
                console.log("key1.1")
            }, true)

    最后一个参数：布尔值，指定事件是否在捕获或冒泡阶段执行

### 自定义事件
```js
// 首先需要提前定义好事件，并且注册相关的EventListener
/*创建方式一*/
/*var myEvent = new Event('event_name');*/

/*创建方式二*/
/*var myEvent = new CustomEvent('event_name', {
    detail: { title: 'This is title!',name:'woochon'},
});*/

/*创建方式三*/
var myEvent = document.createEvent('CustomEvent');
myEvent.initCustomEvent('event_name', true, true,  { title: 'This is title!',name:'woochon'});

window.addEventListener('event_name', function (event) {
    console.log('得到数据为：', event.detail);
});

myEvent.detail.title="111111111111111111";

// 随后在对应的元素上触发该事件
if (window.dispatchEvent) {
    window.dispatchEvent(myEvent);
} else {
    window.fireEvent(myEvent);
}
 ```
### 焦点
document.body.focus();<br>
document.body.blur();

### DOM API
#### 定义
文档对象模型是用来描述 HTML 文档，同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述 HTML 文档。HTML 文档是一个由标签嵌套而成的树形结构，因此，DOM 也是使用树形的对象模型来描述一个 HTML 文档。
#### DOM API 大致会包含 4 个部分（节点、事件、range、遍历）。
##### 节点：DOM 树形结构中的节点相关 API。
<img src="https://static001.geekbang.org/resource/image/6e/f6/6e278e450d8cc7122da3616fd18b9cf6.png" style="width:400px;height:200px">

    Element: <tagname>...</tagname>
    Text: text
    Comment: <!-- comments -->
    DocumentType: <!Doctype html>
    ProcessingInstruction: <?a 1?>

firstChild，firstElementChild

##### 事件：触发和监听事件相关 API。

##### Range：操作文字范围相关 API。
- 定义<br>
Range 接口表示一个包含节点与文本节点的一部分的文档片段。可以用 Document 对象的 Document.createRange 方法创建 Range，也可以用 Selection 对象的 getRangeAt 方法获取 Range。另外，还可以通过 Document 对象的构造函数 Range() 来得到 Range。
- 创建<br>
document.createRange() 方法创建 Range 对象.两个边界点都被设置为文档的开头.<br>
new Range()
- 其他方法
1. Range.setEnd()方法用于设置 Range的结束位置。
如果结束节点类型是 Text， Comment, or CDATASection之一, 那么 endOffset指的是从结束节点算起字符的偏移量。 对于其他 Node 类型节点， endOffset是指从结束结点开始算起子节点的偏移量（<em>不包括自己</em>）。
2. 如果设置的结束点在起始点之上（在文档中的位置），将会导致选区折叠，起始点和结束点都会被设置为指定的结束位置。

##### 遍历<br>
遍历 DOM 需要的 API。
- NodeIterator

```js
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
var node;
while(node = iterator.nextNode())
{
    console.log(node);
}

```
- TreeWalker 
``` js
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
var node;
while(node = walker.nextNode())
{
    if(node.tagName === "p")
        node.nextSibling();
    console.log(node);
}
```
## CSSOM
### 定义
The CSS Object Model is a set of APIs allowing the manipulation of CSS from JavaScript. It is much like the DOM, but for the CSS rather than the HTML. It allows users to read and modify CSS style dynamically.

### CSS rules
- CSSStyleRule
    - selectorText String
    - style K-V结构
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSNamespaceRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportsRule
### 借助javascript修改CSS
```js
//不包括标签中的style
document.styleSheets

```
- 修改样式
```js
document.styleSheets[0].insertRule("p { color:pink; }", 0)
document.styleSheets[0].removeRule(0)
```
- 获取一个元素经过计算的属性
```js

window.getComputedStyle(elt, pseudoElt);
```
- 修改HTMLElement的style对象中对应的CSS属性
- 修改HTMLElement的style的cssText的值
- 借助DOM属性setAttribute()来修改HTMLElement的style

## CSSOM View
与浏览器最终渲染出来的效果相关
### 窗口 API
- window.innerHeight，window.innerWidth（重要）
  代表了实际使用的viewport
- window.outerWidth,window.outerHeight（不重要）
  包含了工具栏等空间，浏览器窗口一共占据的空间
- window.devicePixelRatio（重要）
  代表了物理像素和程序像素的比值，正常是1:1，retnia屏是1:2，部分安卓机是1:3，重要的属性
window.screen（不太重要）
- window.screen.width，window.screen.height
- window.screen.availWidth，window.screen.availHeight

窗口 API 用于操作浏览器窗口的位置、尺寸等。
window.open。。。。
moveTo(x, y) 窗口移动到屏幕的特定坐标；<br>
moveBy(x, y) 窗口移动特定距离；<br>
resizeTo(x, y) 改变窗口大小到特定尺寸；<br>
resizeBy(x, y) 改变窗口大小特定尺寸。<br>

### 视口滚动 （window的api）
API可视区域（视口）滚动行为由 window 对象上的一组 API 控制。
scrollX 是视口的属性，表示 X 方向上的当前滚动距离，有别名 pageXOffset；<br>
scrollY 是视口的属性，表示 Y 方向上的当前滚动距离，有别名 pageYOffset；<br>
scroll(x, y) 使得页面滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}；<br>
scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

### 元素滚动 
API接下来我们来认识一下元素滚动 API，在 Element 类（参见 DOM 部分），为了支持滚动，加入了以下 API。
scrollTop 元素的属性，表示 Y 方向上的当前滚动距离。<br>
scrollLeft 元素的属性，表示 X 方向上的当前滚动距离。<br>
scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。<br>
scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。<br>
scroll(x, y) 使得元素滚动到特定的位置，有别名 scrollTo，支持传入配置型参数 {top, left}。<br>
scrollBy(x, y) 使得元素滚动到特定的位置，支持传入配置型参数 {top, left}。<br>
scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近。

### 布局API
<img src="https://static001.geekbang.org/resource/image/b6/10/b6c7281d86eb7214edf17069f95ae610.png">

### 元素的布局
- getClientRects()：返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。<br>
- getBoundingClientRect()：返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域<br>
获取元素相对坐标<br>

- 两者的不同，getClientRects返回的是一个collection：{"0":{"x":8,"y":8,"width":1488,"height":94,"top":8,"right":1496,"bottom":102,"left":8}}。getBoundingClientRect返回的是一个rect：{"x":8,"y":8,"width":1488,"height":94,"top":8,"right":1496,"bottom":102,"left":8}<br>
```js
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```
## 其他API
