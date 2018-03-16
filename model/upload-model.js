
var path = require('path');
var fs = require('fs');
//post
var formidable = require('formidable');
var dateFormat = require('dateformat');

module.exports = {
    /**通过formdata上传图片
     * 参数1,express请求
     * 参数2,静态资源下的路径
     * 参数3,回调函数，callback(err,fields,uploadPath),返回错误对象,表单字段和新地址
     */
    uploadPhoto : function(req,dirName,callback){
        //上传文件
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,'../static',dirName);
        //保留文件扩展名
        form.keepExtensions = true;
        form.encoding = 'utf-8';

        form.onPart = function(part) {
            if (part.filename != '') {
            // let formidable handle all non-file parts 
            form.handlePart(part);
            }
        };
        form.parse(req, function(err, fields, files) {
            if(err) {
                callback && callback(err,null,null);
                return;
            }
            if(!files.userfile){
                var errMsg = {
                    errCode : -10,
                    errMsg : '文件为空'
                };
                callback && callback(errMsg,null,null);
                return;
            }
            var time = dateFormat(new Date(), "yyyymmddHHMMss");
            var extName = path.extname(fields.imgName);
            var newName = time + '_' + Math.floor(Math.random()*9999) + extName;
            
            var oldPath = files.userfile.path;
            var newPath = path.join(__dirname,'../static',dirName, newName);
            //修改文件的名字
            fs.renameSync(oldPath,newPath);
            callback && callback(null, fields, path.join('/',dirName,newName).split('\\').join('/'));
        }); 
    },
    uploadPhotoArr : function(req,dirName,callback){
        //上传文件
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname,'../static',dirName);
        //保留文件扩展名
        form.keepExtensions = true;
        form.encoding = 'utf-8';
        form.onPart = function(part) {
            if (part.filename != '') {
            // let formidable handle all non-file parts 
            form.handlePart(part);
            }
        };
        form.parse(req, function(err, fields, files) {
            if(err) {
                callback && callback(err,null,null);
                throw err;
                return;
            }
            var uploadPathArr = [];
            // console.log(fields);
            // console.log(files);
            for(var key in files){  //for in 遍历一个一个修改文件名称
                if(!files[key]){
                    var errMsg = {
                        errCode : -10,
                        errMsg : key +' 文件为空'
                    };
                    callback && callback(errMsg,null,null);
                    return;
                }
                var time = dateFormat(new Date(), "yyyymmddHHMMss");
                var extName = '.png';
                var newName = time + '_' + Math.floor(Math.random()*9999) + extName;
                
                var oldPath = files[key].path;
                var newPath = path.join(__dirname,'../static',dirName, newName);
                //修改文件的名字
                fs.renameSync(oldPath,newPath);
                var finalPath = path.join('/',dirName,newName).split('\\').join('/');
                uploadPathArr.push(finalPath);
            }
            callback && callback(null,fields,uploadPathArr);
        }); 
    }
};