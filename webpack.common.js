const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: ["@babel/polyfill", "./src/index.js"]
  },
  output: {
    filename: "[name]-[hash].bundle.js",
    chunkFilename: "[name]-[hash]-[id].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [
          "css-hot-loader",
          devMode ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "src"),
        use: [
          "css-hot-loader",
          devMode ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },

          {
            loader: "postcss-loader"
          },
          {
            loader: "less-loader"
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            outputPath: "img"
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "vue-loader"
        }
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
          minSize: 0
        },
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        styles: {
          name: "styles",
          test: /\.(le|c)ss$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            // drop_console: true
          }
        }
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    // new PurgecssPlugin({
    //   paths: () => glob.sync([`${PATHS.src}/**/*.js`,`${PATHS.src}/**/*.less`,], { nodir: true })
    // }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "./dist/index.html"),
      template: path.resolve(__dirname, "./index-tmpl.html"),
      title: "饿了了",
      inject: true,
      showErrors: true,
      hash: true,
      vendor: "./vendor.dll.js",
      minify:
        process.env.NODE_ENV === "development"
          ? false
          : {
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: true, //折叠空白区域 也就是压缩代码
              removeAttributeQuotes: true //去除属性引用
            }
    }),

    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
    // new CopyWebpackPlugin([{ from: "logo.png" }])
  ]
};
