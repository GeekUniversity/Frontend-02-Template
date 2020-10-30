var Generator = require('yeoman-generator');
module.exports = class extends Generator {

    /*
    顺次执行class里面的所有代码
    */
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        // this.option('babel'); // This method adds support for a `--babel` flag
    }

    async initPackage() {

        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        const pkgJson = {
            "name": answers.name,
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha mocha --require @babel/register",
                "build": "webpack"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
                // eslint: '^3.15.0'
            },
            "dependencies": {
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { 'save-dev': false });
        this.npmInstall(["vue-loader"], { 'save-dev': true });
        this.npmInstall(["webpack", "webpack-cli", "vue-style-loader", "css-loader",
            "vue-template-compiler", "copy-webpack-plugin"], { 'save-dev': true });
        this.npmInstall(["mocha", "nyc", "babel-loader",
            "@babel/core", "@babel/preset-env", "@babel/register",
            "babel-plugin-istanbul", "@istanbuljs/nyc-config-babel"], { "save-dev": true });
    }

    copyFiles() {
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue')
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html')
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        );

        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('/test/sample.js')
        );
    }

};