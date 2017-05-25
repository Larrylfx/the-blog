var express = require('express');
var router = express.Router();

var markdown = require("markdown").markdown; //  引入markdown
var articleModel = require("../mongodb/db").articleModel;  //  引入文章

/* GET home page. */
//   所有路由传递一个user
router.get('/', function (req, res, next) {
    var keyword = req.query.keyword;  //   获取搜索关键字
    var queryObj = {}  //  find 查找条件
    if (keyword) {
        req.session.keyword = keyword;   //  保存到session  中
        var reg = new RegExp(keyword, "i")  //  忽略大小写
        queryObj = {$or: [{title: reg}, {content: reg}]}   // 在标题中内容中查找
    }

    var pageNum = parseInt(req.query.pageNum)  || 1;    //  定义初始化页数
    var pageSize = parseInt(req.query.pageSize) || 4 ;  //  定义每一页最大展示个数

    articleModel.find(queryObj)
        .skip((pageNum - 1) * pageSize)  //
        .limit(pageSize)              //
        .populate("user")              //  将对象的外键 的id 拿出来
        .exec(function (err, article) {
            if (!err) {
                req.flash("success", "获取列表成功")

                article.forEach(function (article, index) {
                    article.content = markdown.toHTML(article.content) //  转化markdown 语法
                })

                articleModel.count(queryObj, function (err, count) {        //返回符合条件的文档数。
                    if (!err) {
                        res.render('index', {
                            title: '首页的标题',
                            articles: article,
                            keyword: keyword,
                            pageNum: pageNum,
                            pageSize: pageSize,
                            totalPage:Math.ceil(parseInt(count )/ pageSize)  // 向上取整   总条数  /  每页的显示数量   =   总页数
                        });
                    } else {
                        req.flash("error", "获取条数失败")
                        res.redirect("back")
                    }
                })
            } else {
                req.flash("error", "获取列表失败")
                res.redirect("back")
            }
        })
});

module.exports = router;
