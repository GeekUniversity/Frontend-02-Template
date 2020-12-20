# 组件化
组件化比架构模式更重要，提升复用率
## Javascript 语法复习
### setTimeout和setInterval
- setInterval在执行完一次代码之后，经过了那个固定的时间间隔，它还会自动重复执行代码，而setTimeout只执行一次那段代码
- setInterval（）的参数2是间隔时间，setTimeout（）的参数2是延迟时间
### for..in, for...of
- 推荐在循环对象属性的时候，使用for…in,在遍历数组的时候的时候使用for…of。
- for…in循环出的是key，for…of循环出的是value
- for…of不能循环普通的对象，需要通过和Object.keys()搭配使用
## 对象和组件化
### 对比
|类型|子类|说明|
|---|---|---|
|对象|Properties<br>Methods<br>Inherit||
|组件|Properties<br>Methods<br>Inherit<br>Attribute<br>Config & Sate<br>Event<br>Lifecycle<br>Children||

## CSS复习
### transition
transition 属性是一个简写属性，用于设置四个过渡属性：
- transition-property
- transition-duration
- transition-timing-function
- transition-delay
### 语法
~~~CSS
transition: property duration timing-function delay;
~~~
### 说明
|属性|说明||
|---|---|---|
|transition-property|规定设置过渡效果的 CSS 属性的名称。|transition-property: none\|all\| property;<br>none：没有属性会获得过渡消息<br>all: 所有属性都会获得过渡效果|
|transition-duration|规定完成过渡效果需要多少秒或毫秒。|
|transition-timing-function|规定速度效果的速度曲线。|transition-timing-function: linear\|ease\|ease-in\|ease-out\|ease-in-out\|cubic-bezier(n,n,n,n);<br>一般都用ease
|transition-delay|定义过渡效果何时开始。|

### 例子
~~~CSS
div
{
    width:100px;
    transition: width 2s;
    -webkit-transition: width 2s; /* Safari */
}
div:hover {width:300px;}
~~~

### Property Vs Attribute
~~~~html
<body>
    <div id="div1" class="cls1 cls2" style="color: red;width: 100px;height: 100px;"></div>
    <a id="a1" href="//m.taobao.com"></a>
    <input id="input1" value="124">
    <script>
        let d = document.getElementById("div1");
        console.log(d.className)
        console.log(d.getAttribute("class"));

        d.style; //CSSStyleDeclaration
        d.getAttribute("sytle"); //字符串

        let a = document.getElementById("a1");
        console.log(a.href); //file://m.taobao.com/
        console.log(a.getAttribute("href")); ////m.taobao.com

        let i = document.getElementById("input1");
        i.getAttribute("vallue"); //始终是原来的值
        i.value; //修改过的值
    </script>
</body>
~~~~
- property 是DOM节点的属性，是JavaScript里的对象；
- attribute 是HTML标签上的特性，表现为DOM节点的attributes属性，它的值只能够是字符串；

### 组件生命周期
Created,mount,unmount,js change/set,user input,render/update,destroyed
### children
内容型的children和模板型的children
## JSX
### JSX的定义
JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面。
### 语法
const element = \<h1\>Hello, world!\<\/h1\>;
- 元素是构成 React 应用的最小单位，JSX 就是用来声明 React 当中的元素
- 在JSX中插入JavaScript表达式十分简单，直接在JSX中将JS表达式用大括号括起来即可
### vscode中使用jsx的方式
#### 1.npm init 
- 在node开发中使用npm init会生成一个pakeage.json文件，这个文件主要是用来记录这个项目的详细信息的，它会将我们在项目开发中所要用到的包，以及项目的详细信息等记录在这个项目中。方便在以后的版本迭代和项目移植的时候会更加的方便.
- 使用npm init初始化项目还有一个好处就是在进行项目传递的时候不需要将项目依赖包一起发送给对方，对方在接受到你的项目之后再执行npm install就可以将项目依赖全部下载到项目里
#### 2.npm install -g webpack webpack-cli
#### 3.npm install --save-dev webpack babel-loader
#### 4.创建webpack.config.js
#### 5.npm install --save-dev @babel/core @babel/preset-env
#### 6.npm install @babel/plugin-transform-react-jsx
#### 7. npm install webpack-dev-server --save-dev 
#### 9. npm install webpack-cli --save-dev 