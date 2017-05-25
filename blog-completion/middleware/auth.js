//  权限管理
//   登陆以后能操作的的事情
module.exports.checkLogin =function(req,res,next){
    if(req.session.user){   //  已经登录
        next()
    }else{
        req.flash("error","当前页面需要登录后才能访问，请先登录")
        res.redirect("/user/login")
    }
}
// 没有登录能操作的事情
module.exports.checkNotLogin =function(req,res,next){
    if(req.session.user){   //  已经登录
        req.flash("error","当前页面需要未登录才能访问，请先退出")
        res.redirect("/")
    }else{
        next()
    }
}


