const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                { from: 'src/*.html', to: '[name].[ext]' },
            ]
        })
    ]
};