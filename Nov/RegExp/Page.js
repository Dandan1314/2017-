/**
 *
 * Created by jack on 2017/11/20.
 */

var str = "abc123DEF";
var patt1 = /\d+/g;//全局搜索数字
console.log(str.match(patt1));

//RegExp 修饰符
// 修饰符用于执行不区分大小写和全文的搜索。
// i - 修饰符是用来执行不区分大小写的匹配。
// g - 修饰符是用于执行全文的搜索（而不是在找到第一个就停止查找,而是找到所有的匹配）
console.log(str.match(/def/i));
//test()
//test()方法搜索字符串指定的值，根据结果并返回真或假。
console.log((/dddddaa/g).test(str));
console.log(str.match(/\D+/gi));
//方括号
//[]用来查找某个范围的字符
//[abc]
console.log(str.match(/[abcd]/gi));
console.log(str.match(/[0-9]/g));
console.log(str.match(/[^abcd]/g));