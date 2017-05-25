//   加密 ，模块到出
module.exports =function(input) {
    // 引入crypto 模块
    var crypto = require("crypto")
    // 选择md5 加密算法
    var md5 = crypto.createHash("md5")
    //  md5 加密数据
    md5.update(input);
    //  返回加密的数据
    return md5.digest("hex");
}