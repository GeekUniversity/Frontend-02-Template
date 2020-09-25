# 异步编程
## 异步处理机制
### promise
~~~~js
var promise = new Promise(function(resolve, reject){
    // ... some code
    
    if (/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
})
~~~~
- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
- resolve作用是将Promise对象状态由“未完成”变为“成功”，也就是Pending -> Fulfilled，在异步操作成功时调用，并将异步操作的结果作为参数传递出去；而reject函数则是将Promise对象状态由“未完成”变为“失败”，也就是Pending -> Rejected，在异步操作失败时调用，并将异步操作的结果作为参数传递出去。

~~~~js
sleep(3000).then(() => {
    console.log("timeout11");
    return sleep(3000);
}).then(() => {
    console.log("timeout2");
});
~~~~
在then里面可以再次返回一个promise
#### 3种状态
- Pending状态（进行中）
- Fulfilled状态（已成功）
- Rejected状态（已失败）
#### 两种状态改变：成功或失败
- Pending -> Fulfilled
- Pending -> Rejected

### async/await
- async函数对 Generator 函数的改进，async 函数必定返回 Promise
- await后面接一个会return new promise的函数并执行它
- await只能放在async函数里

### 宏任务、微任务（复习）
````js
//正常的异步任务
setTimeout(function () {
    console.log(1);
}, 0);

//Promise微任务
new Promise((resolve, reject) => {
    resolve(2);
}).then(console.log);

//同步任务
console.log(3);
````
执行顺序：
1、同步任务
2、微任务
3、宏任务<br>
Promise是微任务（microtask）。正常的异步任务（settimeout）是被追加到下一轮时间循环，而微任务是被添加在本轮事件循环的末尾。

## 地图编辑
### 寻路算法
#### 深度优先算法、广度优先算法
广度优先算法更适合寻路的问题

#### JS 数组可以实现队列和栈
shift:从数组中把第一个元素删除，并返回这个元素的值<br>
unshift: 在数组的开头添加一个或更多元素，并返回新的长度<br>
push:在数组的中末尾添加元素，并返回新的长度<br>
pop:从数组中把最后一个元素删除，并返回这个元素的值<br>

#### 启发式寻路
一种定义为，一个基于直观和经验的构造的算法，对优化问题的实例能给出可接受的计算成本（计算时间，占用空间等） 内，给出一个近似最优解，该近似解于真实最优解的偏离程度不一定可以事先预计
另一种定义为，启发式算法是一种技术，这种技术使得在可接受的计算成本内去搜寻最好的解，但不一定能保证所得的可行解和最优解，甚至在多数情况下，无法阐述所得解同最优解的近似程
https://www.jianshu.com/p/e52d856e7d48
#### A*
A*（A-Star)算法是一种静态路网中求解最短路最有效的方法<br>
##### 公式
 f(n)=g(n)+h(n),
- f(n) 表示从起始节点经由节点n到目标节点的估计代价
- g(n) 是在状态空间中从初始节点到n节点的实际代价，函数g一般是固定的，就是初始节点到当前节点的距离，一般会选取欧式距离或者曼哈顿距离
- h(n)是从n到目标节点最佳路径的估计代价。heuristic函数，启发式函数.这里的h(n)也就是启发式函数，一般来讲，这个h(n)取两节点间直线距离作为估价值，也就是<br>
    h(n) = sqrt((x1-x0)^2+(y1-y0)^2)<br> 
    在ROS的costmap中在路径规划中是按照像素格子去计算的，也就是曼哈顿距离
    取值有两点之间的欧几里得距离(Euclidean Distance)和曼哈顿距离(Manhattan Distance)等

#### 曼哈顿距离
如果图形中只允许朝上下左右四个方向移动，则启发函数可以使用曼哈顿距离
~~~~js
function heuristic(node) =     
    dx = abs(node.x - goal.x)     
    dy = abs(node.y - goal.y)     
   return D * (dx + dy) 
~~~~

#### 欧几里得距离
如果图形中允许朝任意方向移动，则可以使用欧几里得距离。欧几里得距离是指两个节点之间的直线距离
~~~~js
function heuristic(node) =     
    dx = abs(node.x - goal.x)     
    dy = abs(node.y - goal.y)     
   return D * sqrt(dx * dx + dy * dy) 
~~~~

#### A星算法公式优化：

    f(n)= k * g(n) + (1-k) * h(n) ； k 取值 为 [0,1]

- 当k=0时，f(n)= h(n) ，A星算法就变成了最佳优先算法；以距离目标最近为导向
- 当k=1时，f(n)= g(n) ，A星算法就变成了迪杰斯特拉算法；以距离自己最近为导向
- 当k=0.5时，f(n)=g(n)+h(n) ，A星算法就变成了大家提的A星算法；以距离自己最近 + 距离目标最近 为导向
我们可以通过调节权重K的值，来调节这两种算法的影响程度