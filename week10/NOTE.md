# LL算法与AST
- AST 抽象语法树
- 核心算法分别为：LL，LR算法

## 生成器函数
function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象
~~~~js
function* generator(i) {
  yield i;
  yield i + 10;
}
const gen = generator(10);
console.log(gen.next().value);
// expected output: 10
console.log(gen.next().value);
// expected output: 20
~~~~
生成器函数在执行时能暂停，后面又能从暂停处继续执行。

调用一个生成器函数并不会马上执行它里面的语句，而是返回一个这个生成器的 迭代器 （ iterator ）对象。当这个迭代器的 next() 方法被首次（后续）调用时，其内的语句会执行到第一个（后续）出现yield的位置为止，yield 后紧跟迭代器要返回的值。或者如果用的是 yield*（多了个星号），则表示将执行权移交给另一个生成器函数（当前生成器暂停执行）。
~~~~js
function* idMaker(){
  var index = 0;
  while(index<3)
    yield index++;
}

var gen = idMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
~~~~
## 复习正则表达式
### 分组匹配
- 分组就是在正则表达式中用（）包起来的内容代表了一个分组
### Exec 与 Match
- exec 是正则表示的方法，Match是字符串的方法
- 当正则表达式无子表达式，并且定义为非全局匹配时，exec和match执行的结果是一样，均返回第一个匹配的字符串内容；
- 当正则表达式无子表达式，并且定义为全局匹配时（g），exec和match执行，如果存在多处匹配内容，则match返回的是多个元素数组；
- 当正则表达式有子表示时，并且定义为非全局匹配，exec和match执行的结果是一样如上边的第5种情况；
- 当正则表达式有子表示时，并且定义为全局匹配（g），exec和match执行的结果不一样，此时match将忽略子表达式，只查找全匹配正则表达式并返回所有内容

### exec
而没有使用 g 修饰符，每次调用exec()方法后，lastIndex值永远都为0 ，所以每次调用exec()最多只会检索出一个相同的字符。
至于使用了g修饰符，找到匹配的字符串后，lastIndex的值会被重置为匹配内容的下一个字符在 需要检索字符串 中的位置索引。
- 返回值
    - 此数组的第 0 个元素是与正则表达式相匹配的文本
    - 第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），            
    - 第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。
    - index 属性声明的是匹配文本的第一个字符的位置。
    - input 属性则存放的是被检索的字符串 string。

## 字符串算法
|类型|说明|
|---|---|
|字典树|处理大量高重复字符串的存储和分析|
|KMP|在长字符串里找模式，时间复杂度可以做到M+N|
|WildCard|带通配符的字符串模式<br>ab*c?d*abc*a?d|
|正则|字符串通用匹配模式|
|状态机|通用字符串分析|
|LL/LR|字符串多层级结构|

### 字典树
#### 说明
字典树(TrieTree)，又称单词查找树或键树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计和排序大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：最大限度地减少无谓的字符串比较，查询效率比哈希表高
#### 应用场景
- 字符串检索
- 文本预测、自动完成，see also，拼写检查
- 词频统计
- 字符串最长公共前缀
- 字符串搜索的前缀匹配 
#### 基本特征
- 根节点不包含字符，除根节点外每一个节点都只包含一个字符。
- 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串。
- 每个节点的所有子节点包含的字符都不相同。

### KMP
#### 介绍
KMP 算法是 D.E.Knuth、J,H,Morris 和 V.R.Pratt 三位神人共同提出的，称之为 Knuth-Morria-Pratt 算法，简称 KMP 算法。该算法相对于 Brute-Force（暴力）算法有比较大的改进，主要是消除了主串指针的回溯，从而使算法效率有了某种程度的提高
#### 算法介绍
KMP算法的核心，是一个被称为部分匹配表(Partial Match Table)的数组。PMT中的值是字符串的前缀集合与后缀集合的交集中最长元素的长度。

### Wildcard
- 最后一个星号应该尽量匹配多，前面的应该尽量匹配少
- ? 可以充当任一字符
- \* 可以作为长度大于等于0的任一字符串
- ab*cd*abc*a?b
https://www.jianshu.com/p/b61f91678151