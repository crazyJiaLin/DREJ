var express = require('express');
var router = express.Router();
var db = require('./../model/db');  //自定义数据库model
var UUID = require('uuid');  
var uploadModel = require('./../model/upload-model');//上传model
var dateFormat = require('dateformat');

router.post('/submitSecondHose',function(req,res){
     /**设置响应头允许ajax跨域访问**/
     res.setHeader("Access-Control-Allow-Origin","*");
     uploadModel.uploadPhotoArr(req,'second',function(err,fields,uploadPathArr){
         if(err){
            res.json({
                errCode : -1,
                errMsg : '上传图片出错'
            });
             throw err;
             return;
         }
        //  console.log(fields);
        //  console.log(uploadPathArr.toString());

        //  操作成功后插入数据库
        var id = UUID.v1();
        var sql = 'insert into second_hand (id,title,area,floor,total_money,unit_money,house_type,towards,accomplish_date,decoration,release_phone,release_name,release_time,pay_way,description,title_pic,slider_pic,is_recommend) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        // var sql = 'insert into second_hand (id,title,area,slider_pic) values(?,?,?,?)'
        db.query(sql,[
            id,
            fields.title,
            fields.area,
            fields.floor,
            fields.total_money,
            Math.ceil(parseInt(fields.total_money)/parseInt(fields.area)),
            fields.house_type,
            fields.towards,
            fields.accomplish_date,
            fields.decoration,
            fields.release_phone,
            fields.release_name,
            dateFormat(new Date(), "yyyy-mm-dd"),
            fields.pay_way,
            fields.description,
            uploadPathArr[0] ? uploadPathArr[0].toString() : '/img/default-img500x500.jpg',
            uploadPathArr ? uploadPathArr.toString() : '/img/default-img500x500.jpg',
            1
        ],function(rows,fields){
            if(rows.affectedRows > 0){
                res.json({
                    errCode : 1,
                    errMsg : '发布房源成功'
                });
            }else{
                res.json({
                    errCode : -2,
                    errMsg : '插入数据库失败'
                });
            }
        });
     });   
});
//首页推荐，根据推荐展示信息
router.post('/secondRec',function(req,res){
    var sql = 'select id,title,title_pic from second_hand where is_recommend = 1';
    db.query(sql,[],function(results,fields){
        // console.log(results);
        res.json({
            errCode : 1,
            errMsg : '查询成功',
            list : results
        });
    });
});

module.exports = router;