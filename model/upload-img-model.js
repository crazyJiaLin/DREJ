var fs = require('fs');
var path = require('path');
var dateFormat = require('dateformat');

module.exports = {
    /**通过base64上传（文件超过65kpost请求会出错）
     * 参数1,base64编码
     * 参数2,静态资源下的路径
     * 参数3,回调函数，callback(err,uploadPath),返回错误对象和新地址
     */
    uploadBase64Img : function(imgData,insertDir,callback){
        // imgData.data:app中文件路径
        // imgData.base64Data : base64数据
        var reqImgPath = imgData.data;
        var imgBase64 = imgData.base64Data;
        
        //过滤data:URL
        var base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, "");
        var newBuffer = new Buffer.from(base64Data, 'base64');
        var curTime = dateFormat(new Date(), "yyyymmddHHMMss");
        var extName = path.extname(reqImgPath);
        var newName = curTime + '_' + Math.floor(Math.random()*9999) + extName;
        var newPath = path.join(__dirname,'../static',insertDir, newName);
        console.log('newPath:'+ newPath);
        fs.writeFile(newPath, dataBuffer, function(err) {
            if(err){
                return callback && callback(err,null);
            }else{
                callback && callback(null,path.join('/',insertDir, newName));
            }
        });
    }
};