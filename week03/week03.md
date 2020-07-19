# 类与对象
&#8195;&#8195;什么是原型？如果说类是面向对象语言中对象的模版，原型就是 JS中创造对象的模版。
在面向类的语言中，实例化类，就像用模具制作东西一样。实例化一个类就意味着“把类的形态复制到物理对象中”，对于每一个新实例来说都会重复这个过程。但是在JavaScript中，并没有类似的复制机制。你不能创建一个类的多个实例，只能创建多个对象，它们[[Prototype]]关联的是同一个对象。
JavaScript对象是<b>基于原型</b>的面向对象机制。在一定程度上js基于原型的对象机制依然维持了类的基本特征：抽象、封装、继承、多态。
## 对象、构造函数、原型
原型用于定义共享的属性和方法。
构造函数用于定义实例属性和方法，仅负责创造对象，与对象不存在直接的引用关系。
## 原型
如果所有对象都有私有字段[[prototype]]，就是对象的原型；读一个属性，如果对象本身没有，则会继续访问对象的原型，直到原型为空或者找到为止。
- Object.create 根据指定的原型创建新对象，原型可以是 null
- Object.getPrototypeOf 获得一个对象的原型
- Object.setPrototypeOf 设置一个对象的原型。
## 构造函数
### 构造函数的说明
- function关键字创建的函数必定同时是函数和构造器，普通函数的调用方式：直接调用<i>如： person())</i>,构造函数调用：<i>new Person()</i>
- 构造函数也是一个普通函数，创建方式和普通函数一样，但构造函数<b>习惯上首字母大写</b><br>
### 构造函数的执行过程
1. 当以 new 关键字调用时，会创建一个新的内存空间，标记为对象的实例.
2. 函数体内部的 this 指向该内存
3. 执行函数体内的代码
4. 默认返回 this。如果自定义返回值：
    - 如果return值类型，那么对构造函数没有影响，实例化对象返回空对象；
    - 如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型；

## 原型链
  原型链的核心就是依赖对象的_proto_的指向，当自身不存在的属性时，就一层层的扒出创建对象的构造函数，直至到Object时，就没有_proto_指向了。
## 参考
  https://blog.csdn.net/u012468376/article/details/53121081

## ES6 中的类
 ES6 中引入了 class 关键字，并且在标准中删除了所有[[class]]相关的私有属性描述，类的概念正式从属性升级成语言的基础设施，从此，基于类的编程方式成为了 JavaScript 的官方编程范式 

    class Animal {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(this.name + ' makes a noise.');
        }
    }

    class Dog extends Animal {
        constructor(name) {
            super(name);
        }
        speak() {
            console.log(this.name + ' barks.');
        }
    }

    let d = new Dog('Mitzie');
    d.speak(); // Mitzie barks.
# 表达式
## 运算符和表达式
| 运算符类型(由高到低)  | 内容  |
|  ----  | ----|
| Member运算  | a.b<br>a[b]<br>foo\`string`<br>super.b<br>super[ 'b' ]<br>new.target<br>new Foo()：new new a() |
| New表达式  | new Foo |
| Call表达式  | Foo()<br>super()<br>foo()['b']<br>foo().b<br>foo()\`abc` |
| Left hand & right hand  | new Foo |
| Update表达式（right hand）  | a ++ <br> a--<br>--a<br>++a |
| 单目运算符（unary）  | delete a.b <br> void foo()<br>typeof a<br>+a<br>-a<br>~a：按位运算，非整数强制转换<br>!a<br>await a |
| 乘方(Exponental)  | `**`: 3`**`2`**`3 |
| Multiplicative  | *<br>/<br>% |
| 加法  | +<br>- |
| 按位  | <<<br>>><br>>>> |
| relationship  | ><br><<br> <=<br>>=<br>instance of<br>in |
| 相等的比较  | ==<br>!=<br> ===<br>!== |
| bitwise  | &<br>^<br>`|`  |
| 逻辑运算（短路原则）  | &&<br>`||`  |
| Conditional（短路原则）  | ?:  |

## 模板字符串
### 说明
ES6引入了一种新型的字符串字面量语法，我们称之为模板字符串（template strings）。除了使用反撇号字符 ` 代替普通字符串的引号 ' 或 " <br>
### 常见的使用场景
- 多行字符串<br>
console.log(\`<br>
    string1<br>
    string2<br>
    string3\`);
- 插入表达式<br>
var a = 5;<br>
var b = 10;<br>
console.log(\`Fifteen is ${a + b} and not ${2 * a + b}.\`);
- 嵌套模板<br>
const classes = \`header ${ isLargeScreen() ? '  ' :
 \`icon-${item.isCollapsed ? 'expander' : 'collapser'}\` }\`;
- 标签函数<br>
var person = 'Mike';<br>
var age = 28;<br>
function myTag(strings, personExp, ageExp) {<br>
  var str0 = strings[0]; // "that "<br>
  var str1 = strings[1]; // " is a "<br>
  var ageStr;<br>
  if (ageExp > 99){<br>
    ageStr = 'centenarian';<br>
  } else {<br>
        ageStr = 'youngster';<br>
  }<br>
  return str0 + personExp + str1 + ageStr;​<br>
}<br>
var output = myTag`that ${ person } is a ${ age }`;<br>
console.log(output);

## 类型转换
### 类型转换的例子
    - a +b
    - "false"==false
    - a[o]=1
### ==与===
 &#8195;&#8195;相等运算符“==”如果两个操作数不是同一类型，那么相等运算符会尝试一些类型转换<br>
 &#8195;&#8195;“===”首先计算其操作数的值，然后比较这两个值，比较过程没有任何类型转换<br>
 &#8195;&#8195;<b>在实际中建议用“===”,"==="的比较规则： </b>

    1. 如果类型不同，就不相等
    2. 如果两个都是数值，并且是同一个值，那么[相等]；(！例外)的是，如果其中至少一个是NaN，那么[不相等]。（判断一个值是否是NaN，只能用isNaN()来判断）
    3. 如果两个都是字符串，每个位置的字符都一样，那么相等；否则不相等 。
    4. 如果两个值都是true，或者都是false，那么相等。
    5. 如果两个值都引用同一个对象或函数，那么相等；否则不相等。
    6. 如果两个值都是null，或者都是undefined，那么相等。
### 装箱和拆箱
&#8195;&#8195;把基本数据类型转换为对应的引用类型的操作称为装箱，把引用类型转换为基本的数据类型称为拆箱
#### 装箱
 &#8195;&#8195;每当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型对象，从而让我们能够调用一些方法来操作这些数据。

    var s1 = "some text";
    var s2 = s1.substring(2);
#### 拆箱
    var obj = {
                [Symbol.toPrimitive](){return 3},   //优先级最高，有一定会调
                toString(){return 2},               //arr[obj] = 100，优先调用
                valueOf() { return 1 },             //碰到+，优先调用，转Number
            }
# JS语句
## 运行时相关概念
## 简单语句和复合语句
## 声明
# JS语句结构化
## 宏任务和微任务
### 宏任务(MacroTask)
传递个JavaScript引擎的任务，宏任务在宿主环境中运行。
宿主环境就是能使javascript完美运行的环境，只要能完美运行javascript的引擎就是javascript的宿主环境。目前我们常见的两种宿主环境有浏览器和node

    run <script>（同步的代码执行）
    setTimeout
    setInterval
    setImmediate (Node环境中)
    requestAnimationFrame
    I/O
    UI rendering
    .....
    
### 微任务(MicroTask)
在JavaScript引擎内部运行的任务，只有Promise会产生微任务。

    process.nextTick (Node环境中)
    Promise callback
    Object.observe (基本上已经废弃)
    MutationObserver
### 执行顺序
在同一次事件循环中，微任务先于宏任务执行
## 事件循环
- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数
- 当指定的事情完成时，Event Table会将这个函数移入Event Queue
- 当栈中的代码执行完毕，执行栈（call stack）中的任务为空时，就会读取任务队列（Event quene）中的事件，去执行对应的回调
- 如此循环，形成js的事件循环机制（Event Loop）

在事件循环中，每进行一次循环操作称为tick，在此次 tick 中选择最先进入队列的任务( oldest task )，如果有则执行(一次)检查是否存在 Microtasks ，如果存在则不停地执行，直至清空Microtask Queue更新 render主线程重复执行上述步骤
## JS函数调用
### 执行上下文（Execution Context）
1. 定义<br>
https://blog.csdn.net/Fundebug/article/details/88680660
执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行
2. 执行上下文的类型
- 全局执行上下文： 这是默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。它做了两件事：
    - 创建一个全局对象，在浏览器中这个全局对象就是 window 对象。
    - 将 this 指针指向这个全局对象。一个程序中只能存在一个全局执行上下文。
- 函数执行上下文： 每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤。
- Eval 函数执行上下文： 运行在 eval 函数中的代码也获得了自己的执行上下文。

### 执行上下文的生命周期
- 创建阶段
当函数被调用，但未执行任何其内部代码之前，会做以下三件事：<br>
    - 创建变量对象：首先初始化函数的参数 arguments，提升函数声明和变量声明。下文会详细说明。
    - 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
    - 确定 this 指向：包括多种情况，下文会详细说明
在一段 JS 脚本执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为 undefined，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。

另外，一个函数在执行之前，也会创建一个函数执行上下文环境，跟全局上下文差不多，不过 函数执行上下文中会多出 this arguments 和函数的参数。

- 执行阶段
执行变量赋值、代码执行

- 回收阶段
执行上下文出栈等待虚拟机回收执行上下文

### this指针
        function fun1(){
            //window
            console.log(this);
        };

        function Fun2(){
            this.name="123";
            console.log(this);
        }

        //Func2
        var fun2 = new Fun2();
         
         //window
        console.log(this);
### 执行上下文栈（Execution Context Stack）
浏览器里的JavaScript解释器被实现为单线程。这意味着同一时间只能发生一件事情，其他的行文或事件将会被放在叫做执行栈里面排队。<br>函数多了，就有多个函数执行上下文，每次调用函数创建一个新的执行上下文，那如何管理创建的那么多执行上下文呢？JavaScript 引擎创建了执行上下文栈来管理执行上下文。可以把执行上下文栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。<br>当前正在被执行的叫Running Execution Context Stack
 
 ### 执行上下文栈的结构
 - ES3<br>
scope:作用域，也常常被叫做作用域链
variable object:变量对象，用于存储变量的对象
this value: this值
- ES5<br>
lexical environment: 词法环境 ,当获取变量时使用。
variable environment: 变量环境，当声明变量时使用。
this value: this值
- ES2018<br>
    状态组件  |  范围   |   说明   
    :- | :-  | :-
    code evaluation state|所有|Any state needed to perform, suspend, and resume evaluation of the code associated with this execution context.<br>用于恢复代码执行位置,类似于java的PC Register
    Function|所有|If this execution context is evaluating the code of a function object, then the value of this component is that function object. If the context is evaluating the code of a Script or Module, the value is null.<br>执行的任务是函数时使用，表示正在被执行的函数
    Realm|所有|The Realm Record from which associated code accesses ECMAScript resources.<br>使用的基础库和内置对象实例
    ScriptOrModule|所有|The Module Record or Script Record from which associated code originates. If there is no originating script or module, as is the case for the original execution context created in InitializeHostDefinedRealm, the value is null.<br>执行的任务是脚本或者模块时使用，表示正在被执行的代码
    Lexical Environment|for code Execution|Identifies the Lexical Environment used to resolve identifier references made by code within this execution context.（this，supper，new.target,变量）
    Variable Environment|for code Execution|Identifies the Lexical Environment whose EnvironmentRecord holds bindings <b>created by VariableStatements</b> within this execution context.<br>历史包袱，仅来处理var声明的变量
    Generator|for code Execution|The GeneratorObject that this execution context is evaluating<br>仅生成器上下文有这个属性，表示当前生成器

#### Lexcial Environments
A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code.
A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment. Usually a Lexical Environment is
associated with some specific syntactic structure of ECMAScript code such as a FunctionDeclaration, a BlockStatement,
or a Catch clause of a TryStatement and a new Lexical Environment is created each time such code is evaluated

        A lexcial Environment是一个规范类型，用于定义特定变量和函数标识符在 ECMAScript 代码的词法嵌套结构上的关联关系.
        A Lexical Environment 由一个 Environment Record 和一个有可能为null的指向外部（outer） Lexical Environment引用组成。通常一个Lexcial Environment 和一些句法结构有关（如：Function Declaration，a BlockStatement，一个TryStatement的Catch 语句）
        outer environment reference 用于定义嵌套的引用关系
        A global environment is a Lexical Environment which does not have an outer environment

### Realms 
all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set ofintrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of
that global environment, and other associated state and resources.
Realm iframe

 ### 函数（闭包，Closure）
 每一个函数都会生成一个闭包,闭包的作用域链包含着它自己的作用域，以及包含它的函数的作用域和全局作用域。