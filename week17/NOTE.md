# 工具链
## 测试工具
### Mocha
npm install -G mocha
- 解决无法使用export的问题
npm install --save-dev @babel/core @babel/register
npm install --save-dev @babel/preset-env
- 调用本地的mocha（永远调用本地的模块是个好习惯）
.\node_modules\.bin\mocha  --require @babel/register
- 或者修改package.json
~~~~ js
"scripts": {
    "test": "mocha  --require @babel/register"
  }
~~~~ 
### nyc
测试代码覆盖率
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |      50 |      100 |      50 |      50 | 
 add.js   |      50 |      100 |      50 |      50 | 6

#### nyc babel插件
npm install --save-dev babel-plugin-istanbul
npm install --save-dev @istanbuljs/nyc-config-babel

https://www.npmjs.com/package/@istanbuljs/nyc-config-babel