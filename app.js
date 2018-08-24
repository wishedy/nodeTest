var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var User = require('./models/UserList');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/',function(req,res){
   res.send('Hello World');
});
mongoose.connect('mongodb://localhost:27017/userList',function(err){
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
});