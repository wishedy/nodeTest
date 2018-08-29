var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
import router from './routes/index.js';
var mongoose = require('mongoose');
var app = express();
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://cangdu.org');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
var User = require('./models/UserList');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));
app.get('/',function(req,res){
    if(req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.send('你好'+name+'，欢迎来到我的家园。');
    }else{
        var user={
            name:"Chen-xy",
            age:"22",
            address:"bj"
        }
        req.session.user=user;
        res.send('你好'+user.name+'，欢迎登录页面。');
    }
});
/*app.get('/',function(req,res){
   res.send('Hello World');
});*/
router(app);
/*mongoose.connect('mongodb://localhost:27017/userList',function(err){
if(err){
    console.log('数据库连接失败');
}else{
    console.log('数据库连接成功');
    app.post('/nodeTest/delete',function(req,res){
        var paramJson =  JSON.parse(req.body.paramJson);
        var id = paramJson.id;
        var name = paramJson.name;
        console.log(name,id);

        User.findOne({id:id},function(error,UserInfo){
            console.log(UserInfo);
            if(error){
                //用户信息，存在
            }else{
                //用户存在
                if(UserInfo){
                    console.log('用户存在');
                    User.remove({id:id},function(error){
                        if(!error){
                            //console.log(info);
                            console.log('删除成功');
                            res.send(JSON.parse(JSON.stringify({hello:"world",a:'返回参数'})));
                        }
                    })
                }
            }
        });
    });
    app.post('/nodeTest/update',function(req,res){
        console.log(req.body);
        var paramJson =  JSON.parse(req.body.paramJson);
        var name = paramJson.name;
        var sex = paramJson.sex;
        var age = paramJson.age;
        var id = paramJson.id;
        User.update({id: id}, {name: name}, {multi: false}, function(err, docs){
            if(err) console.log(err);
            console.log('更改成功：' + docs);
        });
        res.send(JSON.parse(JSON.stringify({hello:"world",a:'返回参数'})));
    });
    app.post('/nodeTest/login',function(req,res){
        console.log(req.body);
        var paramJson =  JSON.parse(req.body.paramJson);
        var name = paramJson.name;
        var sex = paramJson.sex;
        var age = paramJson.age;
        var id = paramJson.id;
        User.findOne({name:name},function(UserInfo){
            if(UserInfo){
                //用户信息 存在
                console.log(UserInfo);
            }else{
                //用户信息不存在
                var user = new User({
                   name:name,
                   id:id,
                   sex:sex,
                   age:age
                });
                return user.save();
            }
        }).then(function(newUserInfo){
            console.log(newUserInfo);
        });
        res.send(JSON.parse(JSON.stringify({hello:"world",a:'返回参数'})));
    });
    var server = app.listen(3000,function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
}
});*/
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});