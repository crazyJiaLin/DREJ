var express = require('express');
var router = express.Router();

router.get(['/','/index','/index.html'],function(req,res,next){
    res.render('index.html');
});
router.get('/test.get',function(req,res){
    console.log(req.params);
    res.json({
        errCode : 1,
        errMsg : '数据请求成功'
    });

});

module.exports = router;