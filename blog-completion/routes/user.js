var express = require('express');

//  引入  userModel 数据库集合
var userModel = require("../mongodb/db").userModel;

var md5 = require("../md5/md5"); //引入md5加密模块

var auth = require("../middleware/auth")

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 注册
router.get('/reg',auth.checkNotLogin,function (req, res, next) {
    res.render('user/reg', {title: "注册页", content: "用户注册页内容"})
});
//  注册
router.post("/reg",auth.checkNotLogin, function (req, res) {
    //1、获取表单提交的内容
    var userInfo = req.body;
    //检测用户是否注册过:【查询条件】用户名和密码不能完全相同
    userInfo.password = md5(userInfo.password)   //  进行加密

    userInfo.avatar = "https://secure.gravatar.com/avatar/"+userInfo.email+"?s=48"
    var query = {username: userInfo.username, password: userInfo.password};
    userModel.findOne(query, function (err, doc) {
        if (!err) {
            if (doc) { //找到，则注册过
                    //console.log("当前用户已经注册，请更换用户名和密码")
                    req.flash("error","当前用户已经注册，请更换用户名和密码")
                    res.redirect("back");
            } else { //没找到，则没有注册过
                //2、保存用户的注册信息 -->数组-->文件-->数据库
                userModel.create(userInfo, function (err, doc) {
                    if (!err) {
                        //3、跳转到登录页面
                        //console.log("注册用户信息成功");
                        req.flash("success","注册用户信息成功")
                        res.redirect("/user/login");
                    } else {
                        //console.log("注册用户信息失败");
                        req.flash("error","注册用户信息失败")
                        res.redirect("back");
                    }
                });
            }
        } else {
            req.flash("error","当前用户没有注册,请注册")
            //console.log("数据库中查找注册信息失败");
            res.redirect("back");
        }
    });

});


//  登录
router.get('/login',auth.checkNotLogin, function (req, res, next) {
    res.render('user/login', {title: "用户登录页标题", content: "用户登录页内容"});
});

router.post("/login",auth.checkNotLogin, function (req, res, next) {
    var userInfo = req.body    //  获取登录信息
    userInfo.password = md5(userInfo.password)  //  加密后进行查找
    userModel.findOne(userInfo, function (err, doc) {
        if (!err) {         //  进行查找
            if (doc) {
                req.flash("success","登录成功")
                req.session.user = doc   //   保存用户信息在session中
                res.redirect("/")     //  登录成功跳转
            } else {
                req.flash("error","当前用户没有注册，请先注册")
                res.redirect("/user/reg")   //  没有登录成功注册
            }
        } else {
            req.flash("error","登录失败")
            res.redirect("back")
        }
    })
})


//  登出
router.get('/logout',auth.checkLogin, function (req, res, next) {
    req.flash("success","您已成功退出")
    req.session.user = null  // 清除session
    res.redirect('/');
});


module.exports = router;
