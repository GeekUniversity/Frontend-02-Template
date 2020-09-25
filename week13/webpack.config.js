var paths = require("path")
module.exports = {
    mode: "development",
    entry: "./animation-demo.js",
    // output: {
    //     path: __dirname + "/dist",
    //     filename: "[name].js"
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: ".",
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    }
}