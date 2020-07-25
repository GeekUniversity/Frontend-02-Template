# 浏览器工作原理
## 有限状态机

## http协议解析
### ISO-OSI七层网络模型
### TCP-IP基础
TCP位于传输层，提供可靠的字节流服务。所谓字节流服务，为了方便传输将大块数据分割成以报文段为单位的数据包进行管理，可靠的传输服务是指，能够把数据准确可靠的传输给对方。
TCP层：传输数据采用流的形式、端口、包、IP地址、libtnet/libpcap
### http协议
https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html
### 浏览器工作流程
URL(http)->HTML(parse)->DOM(CSS computing)->Dom with css(layout)->Dom with position(render)->bitmap
### URL
URL详解
 URL(Uniform Resource Locator) 地址用于描述一个网络上的资源,  基本格式如下:<br>
schema://host[:port#]/path/.../[?query-string][#anchor]
|内容 |说明|
|---- |----|
|scheme|指定低层使用的协议(例如：http, https, ftp)|
|host|HTTP服务器的IP地址或者域名|
|port#|HTTP服务器的默认端口是80，这种情况下端口号可以省略。如果使用了别的端口，必须指明，例如 http://www.cnblogs.com:8080/|
|path|访问资源的路径|
|query-string|发送给http服务器的数据|
|anchor-|锚|
### HTTP状态码
    1xx消息——请求已被服务器接收，继续处理
    2xx成功——请求已成功被服务器接收、理解、并接受
    3xx重定向——需要后续操作才能完成这一请求
    4xx请求错误——请求含有词法错误或者无法被执行
    5xx服务器错误——服务器在处理某个正确请求时发生错误

### HTTP Request
Request 消息分为3部分，第一部分叫Request line, 第二部分叫Request header, 第三部分是body. header和body之间有个空行， 结构如下图：
|内容|说明|
|------|---------|
|Request Line|Method空格path-to-resource空格http/version-number|
|Header|Header-Name-1：value回车换行(\r\n)|
|Header|Header-Name-2：value回车换行(\r\n)|
|Header|...........|
|Header|Header-Name-n：value回车换行(\r\n)|
|强制空行(\r\n)||
|Body|Optional request body|
|||
- Request Line<br>
Method表示请求方法，在HTTP/1.1中规定了八中方法（如"POST","GET","PUT","DELETE","OPTIONS"，区别大小写）。当某个请求所针对的资源不支持对应的请求方法的时候，服务器应当返回状态码405（Method Not Allowed），当服务器不认识或者不支持对应的请求方法的时候，应当返回状态码501（Not Implemented）。GET和POST的区别：
    1. GET提交的数据会放在URL之后，以?分割URL和传输数据，参数之间以&相连，如EditPosts.aspx?name=test1&id=123456.  POST方法是把提交的数据放在HTTP包的Body中.
    2. GET提交的数据大小有限制（因为浏览器对URL的长度有限制），而POST方法提交的数据没有限制.
    3. GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值。
    4. GET方式提交数据，会带来安全问题，比如一个登录页面，通过GET方式提交数据时，用户名和密码将出现在URL上，如果页面可以被缓存或者其他人可以访问这台机器，就可以从历史记录获得该用户的账号和密码.

GET：EditBook?name=test1&id=123456，GET提交的数据长度有限制<br>Path-to-resoure：表示请求的资源，
<br>Http/version-number：表示HTTP协议的版本号
- Headers（头）<br>
每一个报头域都是由名字+“：”+空格+值 组成，消息报头域的名字是大小写无关的

    |内容|说明||
    |------|---------|------|
    |content-type|application/x-www-form-urlencoded|提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码
    |content-ypte|multipart/form-data|将表单的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。当上传的字段是文件时，会有Content-Type来表名文件类型；content-disposition用来说明字段的一些信息
    |content-type|raw|可以上传任意格式的文本，可以上传text、json、xml、html等|
    |content-type|binary（application/octet-stream）|相当于Content-Type:application/octet-stream,从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件|
    |content-type|application/json|Content-Type: application/json 作为响应头比较常见。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串，其中一个好处就是JSON 格式支持比键值对复杂得多的结构化数据。 这个Content-Type是对应了postman中raw数据格式。|

#### resquest body
- 例子

        1：POST / HTTP1.1
        2：Host:www.wrox.com
        3：User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)
        4：Content-Type:application/x-www-form-urlencoded
        5：Content-Length:40
        6：Connection: Keep-Alive
        7：此处应为空行
        8：name=Professional%20Ajax&publisher=Wiley
        第一部分：请求行，第一行明了是post请求，以及http1.1版本。
        第二部分：请求头部，第二行至第六行。
        第三部分：空行，第七行的空行。
        第四部分：请求数据，第八行。
### Http Response
Response消息的结构和Request消息的结构基本一样。 同样也分为三部分,第一部分叫Response line, 第二部分叫Response header，第三部分是body. header和body之间也有个空行,  结构如下图：

|内容|说明|
|---------|-------|
|Response line | Http/version-number  status code messgae|
|Response header|Content-Type:text/html|
|Response header|Header-Name-2:value|
|Response header|.......|
|Response header|空行|
|Response Body(可选)||
#### Response Header
|内容|说明|
|-------|--------|
|Transfer-Encoding|最新的 HTTP 规范里，只定义了一种传输编码：分块编码（chunked）.分块编码相当简单，在头部加入 Transfer-Encoding: chunked 之后，就代表这个报文采用了分块编码。这时，报文中的实体需要改为用一系列分块来传输。每个分块包含十六进制的长度值和数据，长度值独占一行，长度不包括它结尾的 CRLF（\r\n），也不包括分块数据结尾的 CRLF。最后一个分块长度值必须为 0，对应的分块数据没有内容，表示实体结束。|
|Content-Encoding|表示实体已经采用了的编码方式<br>gzip/compress/deflate/identity|
|Content-Type|Content-Type="Content-Type" ":" media-type|
|||

#### Response Body

#### 状态码
HTTP/1.1中定义了5类状态码， 状态码由三位数字组成，第一个数字定义了响应的类别：
1XX  提示信息 - 表示请求已被成功接收，继续处理<br>
2XX  成功 - 表示请求已被成功接收，理解，接受<br>
3XX  重定向 - 要完成请求必须进行更进一步的处理<br>
4XX  客户端错误 -  请求有语法错误或请求无法实现<br>
5XX  服务器端错误 -   服务器未能实现合法的请求<br>

## HTML
### HTML标签
主要有开始标签、结束标签、自封闭标签