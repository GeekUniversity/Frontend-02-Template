# 发布系统

npx express-generator

## 发布系统流程
publish-tool->publish-server->server
### publish-tool
- 客户端，负责将需要发布的内容打包发布到服务端
- 客户端压缩<br>
npm install --save archiver
~~~js
//会生成一个子文件夹
archive.directory("./sample/", "newdir");
//不会生成子文件夹
archive.directory("./sample/",false);
~~~
### publish-server
- 服务端，负责接收客户端发送的内容并更新到正式的服务器
- 解压缩<br>
npm install unzipper --save
~~~js
req.pipe(unzipper.Extract({ path: '../server/public/' }));
~~~
- script命令
~~~js
"scripts": {
    "start": "node ./server.js",
    // publish 负责把publish-server 推送到服务器上
    "publish": "scp -r ./* root@47.92.151.210:/usr/greektime/publish-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
~~~
### Server
- 正式服务器

### 常用的工具（命令）
## SCP 命令
scp是secure copy的简写，用于在Linux下进行远程拷贝文件的命令，和它类似的命令有cp，不过cp只是在本机进行拷贝不能跨服务器，而且scp传输是加密的。

## NodeJS 流
### Readable Stream
event：close
event：data

### Write Stream
.write
.end

### OAuth2.0的认证流程
- publish-tool 负责请求access_code 
- publish-server 接受回调换取token，并把token返回给publish-tool
- publish-tool 根据token进行系统发布
- publish-server 负责权限的校验