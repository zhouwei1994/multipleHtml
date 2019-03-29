const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html引擎

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css提取
//配置
var config = require('./config');
const final = buildEntriesAndHTML();
const base = {
  entry: final.entries,
  output: {
    filename: "js/[name].js",
    path: path.join(__dirname, config.outputDir) //必须是绝对路径
  },
  module: {
    rules: [{
        test: /\.s[a|c]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              config: {
                path: path.resolve("./build/postcss.config.js") // 依据自己的项目结构引用文件目录
              }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // 多个文件时用数组的形式传入
              resources: config.scssGlobal
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "url-loader", // base64
          options: {
            limit: 8192,
            fallback: "file-loader",
            outputPath: 'images/',
            publicPath: "/images/"
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader?presets=es2015",
          options: {
            cacheDirectory: true // 使用缓存
          }
        }, ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            interpolate: "require"
          }
        }]
      }
    ]
  },
  // 单独打包jq插件，此插件的依赖库单独抽出来，不影响插件的开发
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 禁用默认缓存组 default 与 vendors
        default: false,
        vendors: false,
        // 自定义缓存组
        commons: {
          // chunks 规定哪部分代码需要分割
          chunks: "all",
          // minChunks 当文件出现的次数大于2时，才将该文件视为依赖文件
          minChunks: 2,
          // name 分割出来的文件名，若不指定name，以缓存组的名字作为分割出来的文件名，name作用于chunkFilename
          name: 'commons',
          // minSize 当文件的大小大于该值时，才执行该缓存组(单位为kb)
          // minSize: 1,
          // priority 规定打包的优先级(数值越大优先级越高)
          priority: 0,
        },
      }
    }
  },
  plugins: [
    // 自动加载jq
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      ...config.globalConst,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].[chunkhash:8].css"
    }),
    ...final.htmls
  ],
  resolve: {
    // npm下载的jquery不需要制定路径
    alias: {
      ...config.commonJsDef,
      "@": path.resolve(__dirname, "./../src")
    },
    // 用于查找模块的目录
    extensions: [".html", ".js", ".json", ".css", "'.scss'"],
  },
  externals: {} // 用来配置require的返回。一般用于加载cdn
};

function buildEntriesAndHTML() {
  // 用来构建entery
  const result = glob.sync(path.join(__dirname, config.htmlDir));
  const htmlConfig = {
    hash: true,
    inject: true
  };
  const entries = {
    commons: config.commonJs,
  };
  const htmls = [];
  result.forEach(item => {
    const one = path.parse(item);
    const outputfile = one.dir.split("/").slice(-1)[0];
    entries[outputfile] = one.dir + "/" + one.name + ".js";
    htmls.push(
      new HtmlWebpackPlugin({
        ...htmlConfig,
        template: item,
        filename: "./" + outputfile + ".html", // 输出html文件的路径
        chunks: ["commons", outputfile]
      })
    );
  });
  return {
    entries,
    htmls
  };
}
module.exports = base;
