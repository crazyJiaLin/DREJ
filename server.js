var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//配置引擎模板以及静态文件访问文件夹
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'view'));
app.engine('html',require('ejs').__express);
app.use(express.static(path.join(__dirname,'static')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json() );

//首页
app.get(['/','/index','/index.html'],function(req,res,next){
    res.render('index.html');
});

//路由配置
var userRouter = require('./controller/user');
app.use(userRouter);
var rentHouseRouter = require('./controller/rent-house');
app.use(rentHouseRouter);
var secondHouseRouter = require('./controller/second-house');
app.use(secondHouseRouter);
var adminRouter = require('./controller/admin');
app.use(adminRouter);

//处理404，500
app.use(function(err,req,res,next){
    console.log('error：500');
    return res.status(404).render('404.html');
});
app.use(function(err,req,res,next){
    console.log('error:404');
    return res.status(500).render('error.html');
});

var hostname = '192.168.1.100';
var port = 3000;
app.listen(port,hostname,function(err){
    if(err) throw err;
    console.log('server running at http://'+ hostname + ':' + port);
});