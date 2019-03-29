const path = require("path");
module.exports = {
  // 生产环境构建文件的目录(默认为：dist)
  outputDir: "../dist",
  //编译html的文件位置
  htmlDir: "../src/pages/**/*.html",
  //公共文件（将和页面js分开打包）
  commonJs: ["jquery", "main"],
  //公共文件定义
  commonJsDef: {
    main: path.join(__dirname, "./../src/main.js")
  },
  //配置全局变量
  globalConst: {
    $gl: [path.resolve(__dirname, "./../src/config/global.js"), 'default'],
  },
  //配置scss全局变量(多个文件时用数组的形式传入)
  scssGlobal: path.resolve(__dirname, "./../src/style/mixin.scss"),
  //服务器配置
  devServer: {
    //域名
    host: 'localhost',
    //是否https
    https: false,
    //服务器端口号
    port: 8000,
    //配置自动启动浏览器
    open: true,
    //打开的文件
    openPage: "index.html",
    //配置服务器代理
    proxy: {
      '/api': {
        target: 'http://www.aaa.com',
        // 代理WebSockets
        ws: true,
        // 虚拟主机站点需要
        changeOrigin: true
      },
    }
  }
}
