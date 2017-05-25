
var mongoose =require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/0217db")


var personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    addr:String
})

var personModel = mongoose.model("person",personSchema)


var courseSchema = new mongoose.Schema({
    name:String,
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"person"   //   引用集合的名字

    }
})


var courseModel = mongoose.model("course",courseSchema)

//  创建person数据
//personModel.create({
//    name:"张三",
//    age:18,
//    addr:"北京"
//},function(err,person){
//    if(!err){
//        courseModel.create({name:"nodejs",teacher:person._id},function(err,course){
//            if(!err){
//                console.log(course);
//            }else{
//                console.log(err)
//            }
//        })
//    }else{
//        console.log(err)
//    }
//})


//   查找nodejs 这门课程的老师

//courseModel.findOne({name:"nodejs"},function(err,course) {
//    if (!err) {
//        //console.log(course)
//        personModel.findById(course.teacher,function(err,teacher){
//            if(!err){
//               console.log(teacher.name)
//            }else{
//                console.log(err)
//            }
//        })
//    }else{
//        console.log(err)
//    }
//})


courseModel.findOne({name:"nodejs"})
    .populate("teacher")
    .exec(function(err,course){
     if(!err){
         console.log(course.teacher.name);
     }else{
         console.log(err)
     }

})