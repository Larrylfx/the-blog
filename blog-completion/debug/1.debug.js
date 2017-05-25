/*
   console.log()

   debug   可以选择性打印 不同环境变量的值
 */
console.log("11111")

var successDubug = require("debug")("blog:success")
var failDubug = require("debug")("blog:fail")
var warningDubug = require("debug")("blog:warning")


successDubug("success")
failDubug("fail")
warningDubug("warning")
















