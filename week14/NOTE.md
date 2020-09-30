# 手势与动画
## 鼠标事件

## 手势事件
### 移动端浏览器触摸事件
|事件名称	|描述	|包含touches组|
|---|---|---|
|touchstart	|触摸开始，多点触控，后面的手指同样会触发|	是|
|touchmove	|接触点改变，滑动时	|是|
|touchend	|触摸结束，手指离开屏幕时	|是|
|touchcancel|	触摸被取消，当系统停止跟踪触摸的时候触发	|否|

### 每个触摸事件都包括了三个触摸列表，每个列表里包含了对应的一系列触摸点（用来实现多点触控）
- touches：表示当前跟踪的触摸操作的touch对象的数组。
- targetTouches：特定于事件目标的Touch对象的数组。
- changeTouches：表示自上次触摸以来发生了什么改变的Touch对象的数组。
1. 用一个手指接触屏幕，触发事件，此时这三个属性有相同的值。
2. 用第二个手指接触屏幕，此时，touches有两个元素，每个手指触摸点为一个值。当两个手指触摸相同元素时，
targetTouches和touches的值相同，否则targetTouches 只有一个值。changedTouches此时只有一个值，
为第二个手指的触摸点，因为第二个手指是引发事件的原因
3. 用两个手指同时接触屏幕，此时changedTouches有两个值，每一个手指的触摸点都有一个值
4. 手指滑动时，三个值都会发生变化
5. 一个手指离开屏幕，touches和targetTouches中对应的元素会同时移除，而changedTouches仍然会存在元素。
6. 手指都离开屏幕之后，touches和targetTouches中将不会再有值，changedTouches还会有一个值，
此值为最后一个离开屏幕的手指的接触点。


## Web基础
### CORS（跨域资源共享）
Cross-Origin Resource Sharing，跨域资源共享.<br>
在JavaScript与REST交互的时候，有很多安全限制。默认情况下，浏览器按同源策略放行JavaScript调用API，即：
- 如果A站在域名a.com页面的JavaScript调用A站自己的API时，没有问题；
- 如果A站在域名a.com页面的JavaScript调用B站b.com的API时，将被浏览器拒绝访问，因为不满足同源策略。
- 同源要求域名要完全相同（a.com和www.a.com不同），协议要相同（http和https不同），端口要相同 。
<br>那么，在域名a.com页面的JavaScript要调用B站b.com的API时，还有没有办法？
<br>办法是有的，那就是CORS，全称Cross-Origin Resource Sharing，是HTML5规范定义的如何跨域访问资源。如果A站的JavaScript访问B站API的时候，B站能够返回响应头Access-Control-Allow-Origin: http://a.com，那么，浏览器就允许A站的JavaScript访问B站的API。
注意到跨域访问能否成功，取决于B站是否愿意给A站返回一个正确的Access-Control-Allow-Origin响应头，所以决定权永远在提供API的服务方手中