
var crypto = require("crypto")

//console.log(crypto.getHashes())

//  创建md5
var md5 = crypto.createHash("md5")
//  向md5 进行传递数据
md5.update("1")
//  讲数据进行加密
var result = md5.digest("hex")
console.log(result)

//   md5  sha1
/*
 [ 'DSA',
 'DSA-SHA',
 'DSA-SHA1',
 'DSA-SHA1-old',
 'RSA-MD4',
 'RSA-MD5',
 'RSA-MDC2',
 'RSA-RIPEMD160',
 'RSA-SHA',
 'RSA-SHA1',
 'RSA-SHA1-2',
 'RSA-SHA224',
 'RSA-SHA256',
 'RSA-SHA384',
 'RSA-SHA512',
 'dsaEncryption',
 'dsaWithSHA',
 'dsaWithSHA1',
 'dss1',
 'ecdsa-with-SHA1',
 'md4',
 'md4WithRSAEncryption',
 'md5',
 'md5WithRSAEncryption',
 'mdc2',
 'mdc2WithRSA',
 'ripemd',
 'ripemd160',
 'ripemd160WithRSA',
 'rmd160',
 'sha',
 'sha1',
 'sha1WithRSAEncryption',
 'sha224',
 'sha224WithRSAEncryption',
 'sha256',
 'sha256WithRSAEncryption',
 'sha384',
 'sha384WithRSAEncryption',
 'sha512',
 'sha512WithRSAEncryption',
 'shaWithRSAEncryption',
 'ssl2-md5',
 'ssl3-md5',
 'ssl3-sha1',
 'whirlpool' ]
 */

