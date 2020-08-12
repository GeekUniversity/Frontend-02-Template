# CSS布局
## 盒模型
### 基本概念
#### Node,Element 的区别和联系
- HTML代码中可以书写开始<b>标签</b>，结束<b>标签</b> 和<b>自封闭标签</b>。一对起止<b>标签</b> ，表示一个<b>元素</b> 。DOM树中存储的是<b>元素</b>和其它类型的节点（Node）。CSS选择器选中的是<b>元素</b>。CSS选择器选中的<b>元素或伪元素</b> ，在排版时可能产生多个<b>盒</b> 。排版和渲染的基本单位是<b>盒</b> 。
- Node包括Document, Element, CharacterData(Parent of Text, Comment, etc.)。
- elemnet.children 返回element，element.childNodes 返回NodeList,c一般来说，children.length<=childNodes.length

#### 盒（Box）
CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。

- Margin(外边距) - 清除边框外的区域，外边距是透明的。
- Border(边框) - 围绕在内边距和内容外的边框。
- Padding(内边距) - 清除内容周围的区域，内边距是透明的。
- Content(内容) - 盒子的内容，显示文本和图像。

总元素的宽度=宽度+左填充+右填充+左边框+右边框+左边距+右边距<br>
总元素的高度=高度+顶部填充+底部填充+上边框+下边框+上边距+下边距

#### Box-sizing
- content-box  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。
- inherit	指定 box-sizing 属性的值，应该从父元素继承

## CSS排版
从如何写字思考CSS布局，从左到右，一行对齐、换行....
### 块级元素（block），行内元素（inline），行内块级元素（inline-block）
#### 块级元素（Block）
- 它独占一行；
- 它的宽高可以设置，如果不设置宽度，默认为浏览器的宽度，即100%的宽度；
- 块级元素可以包含块级元素和行内元素
- 例如：\<div>、\<h1-h6>、\<p>、\<table>、\<address>、\<form>、\<ul>、\<ol> 、\<li>等
#### 行内元素（inline）
- 它的宽度由内容决定，高度有内容字体大小决定；
- 给行内元素设置宽高不会起作用，margin 值只对左右起作用，padding 值也只对左右起作用
- 它可以和其他的行内元素位于同一行；
- 例如： \<a>、\<b>、\<label>、\<span>、\<img>、\<em>、\<strong>、\<i>、\<input>等。

#### 行内块级元素（inline-block）：
- 它即可以和其他的行内元素位于同一行，
- 元素的宽高及与边的间距都可以设置；
- 例如：\<input>、\<img>、\<select>等。

### 块级元素、行内元素、行内块级元素转换
- display：block；转换成块级元素。
- display：inline；转换成行内元素。
- display：inline-block；转换成行内块级元素。
### CSS排版之正常流
正常布局流(normal flow)是指在不对页面进行任何布局控制时，浏览器默认的HTML布局方式。<br/>

#### 布局步骤
1. 收集盒和文字进行
2. 计算盒和文字在行中的排布
3. 计算行与行的排布

#### 布局方式
文档流中：内联元素默认从左到右流，遇到阻碍或者宽度不够自动换行，继续按照从左到右的方式布局。块级元素单独占据一行，并按照从上到下的方式布局。

#### 正常流的行级排布
CSS行模型
- line-top
- text-top
- baseline
- text-bottom
- line-bottom

text-top 到 text-botom 如果多个字体混排，则由fontsize最大的决定<br/>
盒会影响line-top,line-bottom，不会影响text-top,text-bottom

##### line-height
line-height属性设置行间的距离（行高）。即两行文字基线之间的距离。
line-height是不允许用负值的。
https://blog.csdn.net/a2013126370/article/details/82786681

##### 行距与半行距
计算方式：line-height - font-size<br/>
我们得到的行距会平均作用于文字的上下方。<br/>
而当font-size大于line-height时，则会出现行距为负值，则两行重叠,如下：

```html 
<span style="font-size:20px;line-height:10px">a<br/>b<span>
```
#### IFC(Inline Formatting Context)
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)

- 水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
- 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中

#### BFC(Block Formatting Context)

##### BFC 定义
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。<br/>
block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context

##### BFC布局规则

- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则 相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算
##### 哪些元素会生成BFC?
- 根元素
- float属性不为none
- position为absolute或fixed
- display为inline-block, table-cell, table-caption, flex, inline-flex
- overflow不为visible
#### margin折叠
只会发生在BFC里面，只会发生在正常流里面
#### BFC合并
- Block Container
   block,inline-block,table-cell,flex item,grid cell, table-caption
- Block-level box
  display:block, display:inline-block
- block box=Block Container + Block-level Box
##### BFC合并的影响
- float
- 边距折叠
### CSS排版之Flex
#### 步骤
1.收集盒进行
2.计算盒在主轴方向的排布
3.计算和在交叉轴方向排布

#### 分行
1.根据主轴尺寸对元素进行分行
2.若设置了no-wrap，则强制进行分行
#### 定义
- Flex布局则是一种新的布局方案，通过为修改父div的display属性，让父元素成为一个flex容器，从而可以自由的操作容器中子元素(项目)的排列方式。<br/>
- 采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称 "项目"。<br/>
- 容器默认存在两根轴：主轴（main axis）和交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。<br/>
- 任何一个容器（包括行内元素）都可以指定为Flex布局。<br/>
- 设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html

#### Flex 容器的属性
##### flex-direction（属性决定主轴的方向（即项目的排列方向））
    .box {
      flex-direction: row | row-reverse | column | column-reverse;
    }
    row（默认值）：主轴为水平方向，起点在左端。
    row-reverse：主轴为水平方向，起点在右端。
    column：主轴为垂直方向，起点在上沿。
    column-reverse：主轴为垂直方向，起点在下沿。  
#### flex-wrap
默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。<br/>

    .box{
    flex-wrap: nowrap | wrap | wrap-reverse;
    }
    nowrap（默认）：不换行。
    wrap：换行，第一行在上方。
    wrap-reverse：换行，第一行在下方。
#### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

    .box {
      flex-flow: <flex-direction> \|\| <flex-wrap>;
    }
#### justify-content属性
justify-content属性定义了项目在主轴上的对齐方式。

    .box {
      justify-content: flex-start | flex-end | center | space-between | space-around;
    }
    flex-start（默认值）：左对齐
    flex-end：右对齐
    center： 居中
    space-between：两端对齐，项目之间的间隔都相等。
    space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
#### align-items属性
align-items属性定义项目在交叉轴上如何对齐。

    .box {
      align-items: flex-start | flex-end | center | baseline | stretch;
    }
    flex-start：交叉轴的起点对齐。
    flex-end：交叉轴的终点对齐。
    center：交叉轴的中点对齐。
    baseline: 项目的第一行文字的基线对齐。
    stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### align-content属性
align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

    .box {
      align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }
    flex-start：与交叉轴的起点对齐。
    flex-end：与交叉轴的终点对齐。
    center：与交叉轴的中点对齐。
    space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
    space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    stretch（默认值）：轴线占满整个交叉轴。

align-content属性是将flex子项作为一个整体起作用，它的基本单位是子项构成的行，只在两种情况下有效果：①子项多行且flex容器高度固定 ②子项单行，flex容器高度固定且设置了flex-wrap:wrap;

#### Flex项目属性
- order ：定义项目的排列顺序。数值越小，排列越靠前，默认为0
- flex-grow：属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
- flex-basis：flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
- flex：flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
- align-self：align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。 align-self: auto | flex-start | flex-end | center | baseline | stretch;
### CSS排版之Grid
网格布局（Grid）是最强大的 CSS 布局方案。它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。
#### 基本概念
- 容器和项目： 采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。项目只能是容器的顶层子元素，不包含项目的子元素
- 行和列：容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。
- 单元格：行和列的交叉区域，称为"单元格"（cell）。
- 网格线：划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。

## 动画（Animation）
### Animation
|值|说明|
|---|---|
|animation-name|指定要绑定到选择器的关键帧的名称|
|animation-duration|动画指定需要多少秒或毫秒完成|
|animation-timing-function|设置动画将如何完成一个周期|
|animation-delay|	设置动画在启动前的延迟间隔。|
|animation-iteration-count|定义动画的播放次数。|
|animation-direction|指定是否应该轮流反向播放动画。|
|animation-fill-mode|规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。|
|animation-play-state|指定动画是否正在运行或已暂停。|

### Transition
通过过渡transition，可以让web前端开发人员不需要javascript就可以实现简单的动画交互效果.
|值|说明|
|---|---|
|transition-property| 过渡属性(默认值为all)
|transition-duration| 过渡持续时间(默认值为0s)
|transiton-timing-function| 过渡函数(默认值为ease函数)
|transition-delay| 过渡延迟时间(默认值为0s)

## 颜色
- HSL和HSV都是一种将RGB色彩模型中的点在圆柱坐标系中的表示法。
- HSL即色相、饱和度、亮度（英语：Hue, Saturation, Lightness）。
- HSV即色相、饱和度、明度（英语：Hue, Saturation, Value），又称HSB，其中B即英语：Brightness。

- 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
- 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值。
- 明度（V），亮度（L），取0-100%。

<b>HSL 可以方便的换肤？更换H就好了？</b>

## 绘制
### 几何图形
- border
- box-shadow
- border-radius
### 文字
- font
- text-decoration:text-decoration 这个 CSS 属性是用于设置文本的修饰线外观的（下划线、上划线、贯穿线/删除线  或 闪烁）它是 text-decoration-line, text-decoration-color, text-decoration-style, 和新出现的 text-decoration-thickness 属性的缩写
<br/><'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>

### 位图
- background-image

    body
    {
        background-image:url('paper.gif');
        background-color:#cccccc;
    }

### data url + svg
