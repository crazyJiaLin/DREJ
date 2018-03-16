var express = require('express');
var router = express.Router();
var db = require('./../model/db');  //自定义数据库model
var md5 = require('md5');

router.post('/isAdmin',function(req,res){
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.body);
    var sql = 'select password from admin where mobile = ?';
    db.query(sql,[req.body.mobile],function(results,fields){
        console.log(results[0]);
        if(results.length <= 0){
            res.json({
                errCode : -1,
                errMsg : '没有找到相应的管理员'
            })
        }else{
            res.json({
                errCode : 1,
                errMsg : '找到相应的管理员',
                password : results[0].password
            })
        }
        // if(md5(md5(req.body.password)) == results[0].password){
        //     res.json({
        //         errCode : 1,
        //         errMsg : '管理员验证成功'
        //     });
        // }else{
        //     res.json({
        //         errCode : -2,
        //         errMsg : '管理员验证失败'
        //     });
        // }
    });
});

router.post('/adminLogin',function(req,res){
    console.log(req.body);
    var sql = 'select mobile from admin where mobile = ?';
    res.json({
        errCode : 1,
        errMsg : '管理员验证成功'
    });
});

module.exports = router;