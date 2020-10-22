# NPM
npm 安装中的 i、-g、--save、--save-dev、-D、-S的区别
## 说明 
- i是 install 的简写
- -g 是全局安装，不带 -g 会安装在个人文件夹
- -S 与 --save 的简写，安装包信息会写入 dependencies 中
- -D 与 --save-dev 的简写，安装包写入 devDependencies 中
## dependencies 与 devDependencies
- dependencies 生产阶段的依赖,也就是项目运行时的依赖
- devDependencies 开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用的
## scope包
### scope的作用
- scope相当于npm包的命名空间，如果以@开头，那它就是一个scope package。
这样分类之后就会使结构更加清晰，比如@vue下面的包都是vue用的，相当于给包做了一个分类。
- 一个scope中可以包含很多个模块; 例如：@babel下有很多模块，方便管理
### 命名规则
- scope在模块name中使用时，以@开头，后边跟一个/
- package.json中，name的写法如下：“name”: “@somescope/somepackagename”

# 模块化
## CommonJS 导入导出
CommonJS 是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 require 方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口。 CommonJS 规范的流行得益于 Node.js 采用了这种方式，后来这种方式被引入到了网页开发中

# ES6 导入导出
## 默认导入导出
~~~js
export default xxx
import xxx from "xxx"
~~~ 
## 按名称导入导出
export 名字 = 值
~~~js
export var color="red";
export function sum(num1,num2){
    return num1+num2;
}
export class Class1{

}
function mul(num1,num2){
    return num1*num2;
}
//稍后导出...
export {mul}
import {} from "xxx"
~~~
## 重命名导入导出
~~~js
//导出模块demo.js
function sum(sum1,sum2){
    return num1+num2;
}
export {sum as add}

//导入模块
import {add as sum} from "/.demo.js"
~~~
## 说明
- 导出时必须要赋值
- 你导出的名字叫什么，导入的时候取的时候也要叫什么，名字跟导出的不匹配，就得到undefined
- 在按名字导出的模块里，也可以再用默认导出，用什么方式导出的就要用对应的方式导入
- 导入的时候 import {} 加了大括号，都是按名字找用名字导出的, 不加{}都是找默认导出
- 按名字导入，名字必须跟导出的一样， 默认导入随便写名字

# 工具链

## YEOMAN
- 脚手架生成器
- npm install yeoman-generator

## Build工具（Webpack）
### 构建
构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。
- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。
### webpack说明
 webpack是一个前端的模块化打包(构建)的工具
### 功能
- 打包(构建)
- 模块化
### 特点
​ webpack将一切繁杂的、重复的、机械的工作自动处理，开发者只需要关注于功能的实现的
### 打包(构建)
- 语法转换
   - ES6--->ES5 供浏览器的解析
   - less/sass---->css 供浏览器的解析
   - TS------> ES5 供浏览器的解析
- 文件压缩和合并
  - js / html /css 文件压缩，删除所有的注释和空格，变量名简写
  - js / css 文件合并 ，将多个js文件或则css文件合并成一个js文件或则css文件​
- 提供开发期间的服务器
  - 能够自动打开浏览器，监听文件变化，自动刷新浏览器的
### 模块化
- 一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。
- Webpack 具有很大的灵活性，能配置如何处理文件。通过 Plugin 扩展，完整好用又不灵活
### 安装
- 安装 webpack-cli
- 安装 webpack
### 核心概念
#### 2-1 Entry 配置模块的入口；
#### 2-2 Output 配置如何输出最终想要的代码；
#### 2-3 Module 配置处理模块的规则；
#### 2-4 Resolve 配置寻找模块的规则；
#### 2-5 Plugins 配置扩展插件；
#### 2-6 DevServer 配置 DevServer；
#### 2-7 其它配置项 其它零散的配置项；
#### 2-8 整体配置结构 整体地描述各配置项的结构；
#### 2-9 多种配置类型 配置文件不止可以返回一个 Object，还有其他返回形式；
#### 2-10 配置总结 寻找配置 Webpack 的规律，减少思维负担。

## Babel
### 作用
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中
~~~js
//babel-loader作为webpack的loader的一种，作用同其他loader一样，实现对特定文件类型的处理
npm install --save-dev babel-loader
//babel-core的作用在于提供一系列api
npm install --save-dev @babel/core
//babel-preset-env的作用是告诉babel使用哪种转码规则进行文件处理
npm install --save-dev @babel/preset-env 
~~~
- 自从Babel 7 Babel团队切换到 scoped packages后,你现在必须使用@ babel / core而不是babel-core

## 打包工具
https://electron.org.cn/builder/index.html