
var mongoose = require("mongoose")

mongoose.connect(require("../dbUrl").dbUrl)

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,

    //  头像
    avatar:String
})

//
var userModel = mongoose.model("user",userSchema)

var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    poster:String,
    createDate :{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"     //  用户的集合
    }
})


var articleModel = mongoose.model("article",articleSchema);


module.exports.userModel = userModel;  //  导出数据库
module.exports.articleModel = articleModel; //  到出数据


