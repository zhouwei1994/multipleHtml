const webpack = require("webpack");
const path = require("path");
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base.config');
//配置
var config = require('./config');
webpackConfig.module.rules[0].use.unshift("css-hot-loader");
module.exports = merge(webpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: Object.assign({
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    open: true,
    hot: true,
    openPage: "index.html"
  }, config.devServer)
});
