# Proxy 与双向绑定
- Proxy是强大且危险的设计，用了Proxy的代码会危险且强大，主要为底层库设计
- Proxy就是的动态代理...

## Proxy 的语法
  let p = new Proxy(target, handler);
## 参数
- target：需要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- handler：一个对象，其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)。具体的handler相关函数请查阅官网
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

## 可撤销的代理对象
Proxy.revocable(target, handler);

# 双向数据绑定
## 如何发现对象的哪些属性被访问了
核心就是对需要跟踪的属性进行注册回调函数，注册完成后通过proxy进行对象访问的过程中就可以通过回调函数进行业务处理
~~~~ js
effect(() => {
            container.style.backgroundColor = `rgb(${po.r},${po.g},${po.b})`;
            // console.log("aaaaaa");
        })

function effect(callback) {

    usedReactivities = [];

    callback();

    for (let reactivity of usedReactivities) {

        if (!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0], new Map());
        }

        if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
            callbacks.get(reactivity[0]).set(reactivity[1], []);
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
    }
}
~~~~

# 拖拽
## 拖拽的实现技巧
- range，鼠标侦听
~~~~ js
dragable.addEventListener("mousedown", function (event) {
    let up = (event) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        console.log("mouseup");
    }

    let move = (event) => {
        let range = getNearest(event.clientX, event.clientY);
        if (range) {
            range.insertNode(dragable);
        }
        else {
            console.log("out of ")
        }
    }

    //在MouseDown的时候再侦听mousemove和mouseup，提升性能
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
})
~~~~ 
## 位置
|类型|说明|
|---|---|
|clientX|当鼠标事件发生时（不管是onclick，还是omousemove，onmouseover等），鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置| 
|clientY|当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置|
|screenX|当鼠标事件发生时，鼠标相对于显示器屏幕x轴的位置|
|screenY|当鼠标事件发生时，鼠标相对于显示器屏幕y轴的位置|  
|offsetX|当鼠标事件发生时，鼠标相对于事件源x轴的位置|
|offsetY|当鼠标事件发生时，鼠标相对于事件源y轴的位置| 
## CSS transform
### 说明
CSStransform属性允许你旋转，缩放，倾斜或平移给定元素。这是通过修改CSS视觉格式化模型的坐标空间来实现的
<b>只能转换由盒模型定位的元素,block,inline-block</b><br>

### 例子
~~~~js
dragable.style.transform = `translate(${event.clientX - startX + baseX}px,${event.clientY - startY + baseY}px)`
~~~~

### 主要函数
|值|描述|
|---|---|
|none	|定义不进行转换。|
|matrix(n,n,n,n,n,n)	|定义 2D 转换，使用六个值的矩阵。|
|matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)	|定义 3D 转换，使用 16 个值的 4x4 矩阵。|
|translate(x,y)	|定义 2D 转换。|
|translate3d(x,y,z)	|定义 3D 转换。|
|translateX(x)	|定义转换，只是用 X 轴的值。|
|translateY(y)	|定义转换，只是用 Y 轴的值。|
|translateZ(z)	|定义 3D 转换，只是用 Z 轴的值。|
|scale(x[,y]?)	|定义 2D 缩放转换。|
|scale3d(x,y,z)	|定义 3D 缩放转换。|
|scaleX(x)	|通过设置 X 轴的值来定义缩放转换。|
|scaleY(y)	|通过设置 Y 轴的值来定义缩放转换。|
|scaleZ(z)	|通过设置 Z 轴的值来定义 3D 缩放转换。|
|rotate(angle)	|定义 2D 旋转，在参数中规定角度。|
|rotate3d(x,y,z,angle)	|定义 3D 旋转。|
|rotateX(angle)	|定义沿着 X 轴的 3D 旋转。|
|rotateY(angle)|	定义沿着 Y 轴的 3D 旋转。|
|rotateZ(angle)	|定义沿着 Z 轴的 3D 旋转。|
|skew(x-angle,y-angle)	|定义沿着 X 和 Y 轴的 2D 倾斜转换。|
|skewX(angle)	|定义沿着 X 轴的 2D 倾斜转换。|
|skewY(angle)	|定义沿着 Y 轴的 2D 倾斜转换。|
|perspective(n)	|为 3D 转换元素定义透视视图。|
|||

