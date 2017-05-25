var express = require('express');  // express 模块来创建app
var path = require('path');      //   path 模块  path,join()  __dirname()   path.resolve()
//  处理 ico 文件的模块
var favicon = require('serve-favicon');
//  输出日志 的模块
var logger = require('morgan');
//  处理cookie的模块     req.cookies()
var cookieParser = require('cookie-parser');
//  处理post请求体的 模块   req,.body
var bodyParser = require('body-parser');


//  session 模块
var session = require("express-session");

var MongoStore = require("connect-mongo")(session)  //  session链接数据库

var flash = require("connect-flash")   //  引入 flash 模块



//    首页的路由文件
var index = require('./routes/index');
var user = require('./routes/user');
var article = require("./routes/article");

//  创建app
var app = express();

// view engine setup   模板引擎文件的根目录
app.set('views', path.join(__dirname, 'views'));
//  模板引擎的文件的类型
app.set('view engine', 'html');
//  使用ejs 语法解析html文件
app.engine("html", require("ejs").__express);

//使用session
app.use(session({
    resave:true,
    secret:"come",
    saveUninitialized:true,
    store:new MongoStore({
           //   讲session 和数据库关联  以后session会自动存储在对应的数据库中
        url:require("./dbUrl").dbUrl
    })
}));
//   使用flash 放在session 后面
app.use(flash())


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//  使用日志模块
app.use(logger('dev'));
//  使用bodyparser 模块 {age:18}
app.use(bodyParser.json());
//   处理表单请求的
app.use(bodyParser.urlencoded({extended: false}));
//  使用cookieparse
app.use(cookieParser());
//  静态资源文件的根路径
app.use(express.static(path.join(__dirname, 'public')));


//  将所有的路由的公告操作方放到公共中间件执行
app.use(function(req,res,next){
    //  向所有的引擎文件
    res.locals.user = req.session.user;      //  所有页面都需要用户
    res.locals.success = req.flash("success")   //  成功的信息
    res.locals.error = req.flash("error")

    res.locals.keyword = req.session.keyword;   //  保存关键字

    next();
})


//  使用路由
app.use('/', index);   //  首页路由
app.use('/user', user); //  用户页路由
app.use("/article", article); //  文章页路由


// catch 404 and forward to error handler
//  上面的路由都不匹配是执行下面的中间件
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
//   错误处理中间件
app.use(function (err, req, res, next) {
    // set locals, only providing error in development.
    // 可以给模板引擎文件传递数据
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//  导出莫模块
module.exports = app;
