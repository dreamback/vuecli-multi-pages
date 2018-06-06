const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");

function readDirSync(_path) {
    var $path = fs.readdirSync(_path),
        entry = {},
        htmlWebpackPlugin=[];
    $path.forEach(el=>{
        if(fs.statSync(path.resolve(_path, el+'/template.html'))){
            //生成多入口配置
            entry[el] = path.resolve(_path, el+'/main.js');
            //多入口页面模版
            htmlWebpackPlugin.push(new HtmlWebpackPlugin({
                filename: path.resolve(__dirname,'../dist/active/'+el+".html"), // 配置输出文件名和路径
                template: path.resolve(_path, el+'/template.html'), // 配置文件模板
                inject: true,
                chunks: [el,'vendor','manifest'] //entry 里面的字段
            }))
        }
    })

    // return{
    //     entry:{},
    //     plugins:[]
    // }

    return {
        entry:entry,
        plugins:htmlWebpackPlugin
    }

};

module.exports = readDirSync(path.resolve(__dirname, '../src/active') );