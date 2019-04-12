const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack =require('webpack')
module.exports = merge(common,{
    mode: 'development',
    devtool:'cheap-module-eval-source-map',
    cache: true, 
    devServer:{
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 9111,
        hot:true,
        host: "0.0.0.0",
        overlay:{
            errors:true, 
        },
        compress: false,
        proxy: {
            "/hcs": {
                // target: "http://10.90.189.109:3000",
                target: "http://uat.ehealcare.com",
                // target: "http://10.90.50.108:9009",
                secure: false,
                changeOrigin: true,
                'pathRewrite':{'^/hcs':"/hcs"}
            }
        },
        watchOptions: {
            ignored: /node_modules/, //忽略不用监听变更的目录
            aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
            poll:1000 //每秒询问的文件变更的次数
        },
        disableHostCheck:true

    },

    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
})