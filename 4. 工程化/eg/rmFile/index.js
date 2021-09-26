/*
 * @Author       : ganbowen
 * @Date         : 2021-09-26 21:29:32
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-09-26 21:46:30
 * @Descripttion : 删除文件
 */
const fs = require("fs")
const path = require("path")

function deleteFile(url, name){
    var files = [];
    if( fs.existsSync(url) ) {    //判断给定的路径是否存在
        files = fs.readdirSync(url);    //返回文件和子目录的数组
        files.forEach(function(file,index){
            var curPath = path.join(url,file);
            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteFile(curPath,name);
            } else {   
                if(file.indexOf(name) > -1){    //是指定文件，则删除
                    fs.unlinkSync(curPath);
                    console.log("删除文件："+curPath);
                }
            }  
        });
    } else {
        console.log("给定的路径不存在！");
    }
}

deleteFile('/Users/baiwang/Downloads/书籍/study', '(1).mp4')