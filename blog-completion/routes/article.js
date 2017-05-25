var express = require("express")
//  权限管理  模块
var auth = require("../middleware/auth")
//  发表文章模块
var articleModel = require("../mongodb/db").articleModel;
var userModel = require("../mongodb/db").userModel;
//  路由容器
var router = express.Router()

var multer = require("multer")   //   支持图片上传

var storage = multer.diskStorage({   //  配置图片上传
    destination: function (req, file, cb) {   //  上传后保存的地方
        cb(null, "../public/uploads")
    },
    filename: function (req, file, cb) {   // 上传后文件名
        cb(null, file.originalname)
    }
})


var upload = multer({storage: storage})  //  配置文件上传

router.get("/add", auth.checkLogin, function (req, res) {
    res.render("article/add", {title: "添加文章页", content: "添加文章页内容"})
})


router.post("/add", auth.checkLogin, upload.single("poster"), function (req, res) {
    var articleInfo = req.body;
    //console.log(articleInfo);
    articleInfo.createDate = Date.now();    //  获取当前时间

    articleInfo.user = req.session.user._id;   //  取出作者的id


    //  判断上传图片
    if (req.file) {
        articleInfo.poster = "/uploads/" + req.file.filename;
    }

    //console.log(req.file);
    /*
     { fieldname: 'poster',
     originalname: '04 (2).JPG',
     encoding: '7bit',
     mimetype: 'image/jpeg',
     destination: '../public/uploads',
     filename: '04 (2).JPG',
     path: '..\\public\\uploads\\04 (2).JPG',
     size: 1914888 }
     */

    articleModel.create(articleInfo, function (err, doc) {
        if (!err) {
            req.flash("success", "发表文章成功")
            res.redirect("/")
        } else {
            req.flash("error", "发表文章失败")
            res.redirect("back")
        }
    })
})

//  跳转到详情页
router.get("/detail", auth.checkLogin, function (req, res) {
    //var us = req.session.user.username;
    //console.log(us)
    // 1.获取文章对应的id
    var id = req.query.keyId;
    //var user = req.query.username;
    //console.log(user);
    // 在数据库中查找对应的id的文章信息
    articleModel.findById(id, function (err, article) {
        if (!err) {
            //console.log(article);
            //console.log(article.user)
            var userId = article.user
            userModel.findById(userId, function (err, userInfo) {
                req.flash("success", "获取文章信息成功")
                res.render("article/detail", {
                    title: "详情页首页",
                    article: article,
                    articleUser: userInfo,
                    sessionUser: req.session.user.username
                })
            })
        } else {
            req.flash("error", "获取文章信息失败")
            res.redirect("back")
        }
    })
})

// 删除记录

router.get("/remove", auth.checkLogin, function (req, res) {
    var id = req.query.keyId;
    //console.log(id);
    articleModel.findOneAndRemove({_id: id}, function (err, doc) {
        if (!err) {
            req.flash("success", "删除文章信息成功")
            res.redirect("/")
        } else {
            req.flash("error", "删除文章信息失败")
            res.redirect("back")
        }
    })
})

//  获取编辑页
router.get("/edit", auth.checkLogin, function (req, res) {
    var id = req.query.keyId;
    articleModel.findById({_id: id}, function (err, article) {
        if (!err) {
            //console.log(article);
            req.flash("success", "获取文章信息成功")
            res.render("article/edit", {
                title: "详情页首页",
                article: article
            })
        } else {
            req.flash("error", "获取文章信息失败")
            res.redirect("back")
        }
    })
})


router.post('/edit', auth.checkLogin, upload.single('poster'), function (req, res, next) {
    var id = req.query.keyId;
    var articleInfo = req.body;
    console.log(articleInfo)
    articleModel.findById(id, function (err, article) {
        if (!err) {
            articleInfo.createDate = Date.now();    //  获取当前时间
            //  判断上传图片
            if (req.file) {
                articleInfo.poster = "/uploads/" + req.file.filename;
            }
            articleModel.update({_id: id}, {$set: articleInfo}, function (err, article) {
                if (!err) {
                    req.flash('success', '更新成功');
                    res.redirect('/');
                } else {
                    req.flash('error', '更新失败');
                    res.redirect('back');
                }
            });
        } else {
            req.flash('error', '获取失败');
            res.redirect('back');
        }
    })
});

//  导出项目
module.exports = router