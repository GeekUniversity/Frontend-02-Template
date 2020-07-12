# 泛语言分类体系
## 按照语法分类
- 非形式语言：中文、英文等
- 形式语言（乔姆斯基谱系）
    - 0型 无限制文法
    - 1型 上下文相关文法
    - 2型 上下文无关文法
    - 3型 正则文法<br>
## （产生式）BNF
- 定义：它是以美国人巴科斯(Backus)和丹麦人诺尔(Naur)的名字命名的一种形式化的语法表示方法，用来描述语法的一种形式体系，是一种典型的元语言
- 语法：<non-terminal> ::= <replacement>
        non-terminal意为非终止符，就是说我们还没有定义完的东西，还可以继续由右边的replacement，也就是代替物来进一步解释、定义。我们场景的语言如C、C++、Java等都有自己的BNF语法定义的规范。
- 规则：
    - 在双引号中的字("word")代表着这些字符本身。
    - 在双引号外的字（有可能有下划线）代表着语法部分。
    - 尖括号( < > )内包含的为必选项。
    - 方括号( [ ] )内包含的为可选项。
    - 大括号( { } )内包含的为可重复0至无数次的项。
    - 竖线( | )表示在其左右两边任选一项，相当于"OR"的意思。
    - ::= 是“被定义为”的意思。
- 例子：
    <type-specifier> ::= void
                   | char
                   | short
                   | int
                   | long
                   | float
                   | double
                   | signed
                   | unsigned
                   | <struct-or-union-specifier>
                   | <enum-specifier>
                   | <typedef-name>
## 编程语言分类
- 形式语言-用途 
    - 数据描述语言 JSON 、HTML、XAML、SQL、CSS 
    - 编程语言： C++、C、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskel、JavaScript       
- 形式语言-表达方式 
    - 声明式语言 JSON 、HTML、XAML、SQL、CSS 、Lisp、Clojure、Haskel
    - 命令型语言： C++、C、Java、C#、Python、Ruby、Perl、T-SQL、JavaScript <br>
# Javascript基础
## 数据类型
### Number
JS中的Number，采用IEEE-754 双进度表示，如下图：<br>
![Image text](https://github.com/yangjie8421/Frontend-02-Template/blob/master/week02/IEEE-754.png)

1. M = 2<sup>-1</sup> + 2<sup>-2</sup>+ 2<sup>-3</sup>+....+2<sup>-52</sup> <br>
2. IEEE754并不能准确的反应小数的精度（0.1+0.2 不等于0.3)，在实际使用的时候要注意

### String
1. Unicode只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。它给每一个「字符」分配一个唯一的 ID（学名为码位 / 码点 / Code Point）。
2. UTF8是编码规则。UTF8是Unicode的一种实现方式。UTF-8最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。
4. UTF8-编码规则：
    - 对于单字节的符号，字节的第一位设为0，后面7位为这个符号的unicode码。因此对于英语字母，UTF-8编码和ASCII码是相同的
    - 对于n字节的符号（n>1），第一个字节的前n位都设为1，第n+1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的unicode码。
    - Utf8 和 Unicode对应关系：<br>
        | Unicode        | UTF-8        | 
        | --------       | -----:       | 
        | 0000 ~007F     | 0XXX XXXX    |  
        | 0080 ~07FF     | 110X XXXX 10XX XXXX |
        | 0800 ~FFFF     | 1110 XXXX 10XX XXXX 10XX XXXX      | 
        | 10000 ~1FFFFF  | 11110XXX 10XXXXXX 10XXXXXX 10XXXXXX     | 

## 对象
### 对象的分类
- 宿主对象: 由JavaScript宿主环境提供的对象，行为由宿主环境决定,简单来说就是用户的机器环境，包括操作系统和浏览器.
- 固有（内置）对象：ECMAScript规范中要求实现的一些函数和对象，具体包括Object,Function,Number,Boolean,Array,String,RegExp,Error,Date,Global,Math.
- 原生对象：
- 普通对象：由我们创建的那些对象
### 函数对象
函数是第一类对象（first-class object），被称为一等公民。函数与对象共存，我们也可以认为函数就是其他任意类的对象。由此可见，对象有的功能，函数也会拥有.
### Symbol对象
- 特性
    - Symbol是一个基础数据类型（primitive type）。
    - 每个Symbol实例都是唯一的。因此，当你比较两个Symbol实例的时候，将总会返回false
- 使用场景
    - 使用Symbol来替代常量
    - 使用Symbol来作为对象属性名(key)
    - 使用Symbol定义类的私有属性/方法
    - 注册和获取全局Symbol<br>
        let gs1 = Symbol.for('global_symbol_1')  //注册一个全局Symbol
        let gs2 = Symbol.for('global_symbol_1')  //获取全局Symbol
        gs1 === gs2  // true
## 变量的作用域
### 块作用域
JS中作用域有：全局作用域、函数作用域。没有块作用域的概念。ECMAScript 6(简称ES6)中新增了块级作用域。块作用域由 { } 包括，if语句和for语句里面的{ }也属于块作用域。 
### var、let、const三者的区别
- var定义变量，没有块的概念，可以跨块访问，不能跨函数访问，不初始化出现undefined，不会报错。
- let定义变量，只能在块作用域里访问，也不能跨函数访问，对函数外部无影响。
- const定义常量，只能在块作用域里访问，也不能跨函数访问，使用时必须初始化(即必须赋值)，而且不能修改。
