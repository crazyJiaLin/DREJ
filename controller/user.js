var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var db = require('./../model/db');  //自定义数据库model
var md5 = require('md5');     
var UUID = require('uuid');  
var uploadModel = require('./../model/upload-model');//上传model

/**
 * 登陆
 */
router.post('/login', function(req, res){
    // console.log(req.body);
    db.query('select * from user where mobile = ?', [req.body.mobile], function(result,fields){
            // console.log(result[0].username);
            if(result.length == 0){
                res.json({
                    errCode : -1,
                    errMsg : '该手机未注册'
                });
                return;
            }
            if( md5(md5(req.body.password)) == result[0].password ){
                res.json({
                    errCode : 1,
                    errMsg : '登陆成功',
                    userInfo : {
                        id : result[0].id,
                        username : result[0].username,
                        mobile : result[0].mobile,
                        portrait : result[0].portrait,
                        inform : result[0].inform,
                    }
                });
            }else{
                res.json({
                    errCode : -2,
                    errMsg : '密码错误'
                });
            }
        }
    );
});
/**
 * 注册
 */
router.post('/regest',function(req,res){
    var sql1 = 'select id from user where mobile = ?';
    db.query(sql1,[req.body.mobile],function(result,fields){
        if(result.length != 0){
            res.json({
                errCode : -1,
                errMsg : '用户已经存在'
            });
            return;
        }
        var id = UUID.v1();
        var password = md5(md5(req.body.password));
        var sql2 = 'insert into user (id,username,password,mobile) values(?,?,?,?)'
        db.query(sql2,[id,req.body.username,password,req.body.mobile],function(result,fields){
            console.log('注册受影响行数：'+result.affectedRows);
            if(result.affectedRows > 0){
                res.json({
                    errCode : 1,
                    errMsg : '注册成功'
                });
            }else{
                res.json({
                    errCode : -2,
                    errMsg : '注册失败'
                });
            }
        });
    });
});

//忘记密码
router.post('/resetPSD',function(req,res){
    var sql1 = 'select * from user where mobile = ?';
    db.query(sql1,[req.body.mobile],function(results,fields){
        // console.log(results[0]);
        if(results.length == 0){
            return res.json({
                errCode : -1,
                errMsg : '未找到用户'
            });
        }
        var new_password = md5(md5('000000'));
        var sql2 = 'update user set password = ? where id = ?';
        db.query(sql2,[new_password,results[0].id],function(row,fields){
            // console.log('影响行数： '+row.affectedRows);
            if(row.affectedRows > 0){
                return res.json({
                    errCode : 1,
                    errMsg : '重置密码成功',
                    new_password : '000000'
                });
            }
            res.json({
                errCode : -2,
                errMsg : '重置密码失败'
            });
        });
    });
});
/**
 * 更新密码
 */
router.post('/updatePSD',function(req,res){
    console.log(req.body);
    var sql1 = 'select * from user where mobile = ?';
    db.query(sql1,[req.body.mobile],function(result,fields){
        if(result.length == 0){
            res.json({
                errCode : -1,
                errMsg : '未找到用户名'
            });
            return;
        }
        if(md5(md5(req.body.old_password)) != result[0].password){
            res.json({
                errCode : -2,
                errMsg : '密码验证失败'
            });
            return;
        }
        //验证成功后，开始进行更新
        var sql2 = 'update user set password = ? where mobile = ?';
        var new_password = md5(md5(req.body.new_password));
        db.query(sql2,[new_password,req.body.mobile],function(result,fields){
            if(result.affectedRows > 0){
                res.json({
                    errCode : 1,
                    errMsg : '修改密码成功'
                });
            }else{
                res.json({
                    errCode : -3,
                    errMsg : '修改密码失败'
                });
            }
        });
    });
});

//上传头像
router.post('/uploadPortrait',function(req,res){
    /**设置响应头允许ajax跨域访问**/
    res.setHeader("Access-Control-Allow-Origin","*");
    uploadModel.uploadPhoto(req,'user',function(err,fields,uploadPath){
        if(err){
            if(err.errCode == -10){
                return res.json(err);
            }else{
                throw err;
                return res.json({
                    errCode : 0,
                    errMsg : '文件上传失败'
                });
            }
        }
        if(!fields.mobile){
            return res.json({
                errCode : -1,
                errMsg : '请上传用户手机号'
            });
        }
        var sql1 = 'select * from user where mobile = ?';
        db.query(sql1,[fields.mobile],function(results,fields){
            // console.log(results[0]);
            if(results.length == 0){
                return res.json({
                    errCode : -2,
                    errMsg : '不存在此用户'
                });
            }
            var sql2 = 'update user set portrait = ? where id = ?';
            db.query(sql2,[uploadPath,results[0].id],function(row,fields){
                // console.log(row);
                if(row.affectedRows > 0){
                    res.json({
                        errCode : 1,
                        errMsg : '文件上传成功',
                        photoPath : uploadPath
                    });
                }else{
                    res.json({
                        errCode : -3,
                        errMsg : '文件上传错误'
                    });
                }
            });
        }); 
    });
});

module.exports = router;



