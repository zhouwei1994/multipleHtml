//定义编译环境
process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf')
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //js压缩
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const webpackConfig = require('./webpack.base.config');
//配置
var config = require('./config');
//删除之前的包
rimraf(path.join(path.resolve(__dirname, config.outputDir)), err => {
  if (err) throw err;
  //执行webpack
  webpack(merge(webpackConfig,
      //打包专属配置
      {
        plugins: [
          //代码压缩
          new UglifyJSPlugin(),
          //优化css为压缩格式
          new OptimizeCSSAssetsPlugin()
        ]
      }),
    function (err, stats) {
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log('生成失败，出现错误.\n');
        process.exit(1)
      }
      console.log('打包完成.\n');
    })
});
