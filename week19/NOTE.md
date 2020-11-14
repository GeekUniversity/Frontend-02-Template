# 发布前检查
## Daily build
## BVT
BVT也即Build Verification Test，是在将release发布给test team做进一步测试之前，通过在每天新的build之上跑一系列的case来验证build是否可以测试。它的时间点发生在build完成之后，正式测试完成之前。 BVT也叫冒烟测试或者build验证测试

## Git Hooks
### git hooks的说明
Git Hooks就是那些在Git执行特定事件（如commit、push、receive等）后触发运行的脚本。
按照Git Hooks脚本所在的位置可以分为两类：
1.本地Hooks，触发事件如commit、merge等。
2.服务端Hooks，触发事件如receive等。
### git hooks的samples 文件
初始化git仓库后，可以在.git/hooks/文件夹看到相关的hook文件的demo
### 
- 一般会把lint操作放到pre-commit里面，check操作放到pre-push

### pre-commit 提交命令
~~~js
#!/usr/bin/env node
let process = require("process");
console.log("hello hooks");
process.exitCode=1;
~~~

## ESLint
- 安装
npm install --save-dev eslint
- 配置
npx eslint --init

- git stash会把所有未提交的修改（包括暂存的和非暂存的）都保存起来，用于后续恢复当前工作目录

## 无头浏览器 
- PhantomJS 比较老久了，现在推荐head less 模式
- chrome --headless --dump-dom about:blank 把dom树打印到屏幕上
- pupppeteer 是命令行简单的封装
npm install --save-dev pupppeteer
~~~javascript
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();
~~~
