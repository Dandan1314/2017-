/*样式类*/
//添加类名
function addClass(id,classname) {
    if(typeof id === 'string'){
        id = $.getElem(id)
    }
    UTIL.classHelper.add(classname,id);
}
//移除类名
function removeClass(id,classname){
    if(typeof id === 'string'){
        id = $.getElem(id)
    }
    UTIL.classHelper.remove(classname,id);
}
//获取dom的样式
function getStyle(element, attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else{
        return window.getComputedStyle(element,null)[attr];
    }
}
/**
 *
 * @param str -属性名
 * @param str -属性值
 * @returns -传i返回当前dom元素,不传返回当前dom[t]的值 只能返回内部值,如果是外部连接,请使用getStyle
 * @forxeample dom("box").attr("style").width)|dom("box").attr("className","box")
 */
function dom(t) {
    if ("string" == typeof t)var r = document.getElementById(t); else var r = t;
    return r && !r.attr && (r.attr = attr), r;
}
function attr(t, i) {
    return i ? (this[t] = "" + i, this) : this[t]
}
//获取
/*数组*/
//根据key值和属性值来获取对象在数组中的索引
function indexObj(arr, value, key) {
    for (var i = 0; i < arr.length; i++){
        if (key && arr[i][key] === value || !key && arr[i] === value)return i;}
    return -1
}
/*字段*/
//判断字符长度是否超出
function substring(name, l){
    var trunc= UTIL.substringOneLine(name, l);
    if(trunc){
        return UTIL.substringOneLine(name, l-1)+'...';
    }
}
/*功能类*/
//根据ID展示焦点
function getTargetObj(key) {
    $.getTargetObj(key);
    $.showFocusBorder();
}
/*时间类*/
//是否是闰年
Date.prototype.isLeapYear = function () {
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
}
//把日期分割成数组
Date.prototype.toArray = function() {
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
}
//日期计算
Date.prototype.DateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
//日期差
Date.prototype.DateDiff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's' :return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}
//| 字符串转成日期类型
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
//+---------------------------------------------------
function StringToDate(DateStr)
{

    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate))
    {
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
        var arys= DateStr.split('-');
        myDate = new Date(arys[0],--arys[1],arys[2]);
    }
    return myDate;
}
//判断当前月的天数
Date.prototype.MaxDayOfDate = function() {
    var myDate = this;
    var ary = myDate.toArray();
    var date1 = (new Date(ary[0],ary[1]+1,1));
    var date2 = date1.dateAdd(1,'m',1);
    var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));
    return result;
}
//返回当前值在数组的索引
/**
 * 
 * @param arr
 * @param value
 * @param key
 * @returns {number}
 */

function indexObj(n, r, k) {
    for (var e = 0; e < n.length; e++)if (k && n[e][k] === r || !k && n[e] === r)return e;
    return -1
}
/*定时器*/
//清除全局所有定时器
//调试的时候可以使用
var pageTimer = {} ; //定义计算器全局变量
//赋值模拟
pageTimer["timer1"] = setInterval(function(){},2000);
pageTimer["timer2"] = setInterval(function(){},2000);
//全部清除方法
for(var each in pageTimer){
    clearInterval(pageTimer[each]);
}
//暴力清除定时器
for(var i = 1; i < 1000; i++) {
    clearInterval(i);
}
/*正则表达式*/
var Chinese = new RegExp('[\u0391-\uFFE5]');
/*最短的数组去重*/
//ES6新增方法set

[...new Set([1, "1", 2, 1, 1, 3])]
/*取出数组中的最大值和最小值*/
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
var maxInNumbers = Math.max.apply(Math, numbers);
var minInNumbers = Math.min.apply(Math, numbers);
/*arguments转化为数组*/
var argArray = Array.prototype.slice.call(arguments);
// 或者ES6：
var argArray = Array.from(arguments)
//offsetTop 和getBoundingClientRect().top的区别;
//offsetTop获取的是到上一个定位元素的距离;
//一个对象转换城多个对象
function myObjFn(obj) {
    var arr = [];
    var l  ;
    for (var key in obj) {
        l = {};
        l[key] = obj[key];
        arr.push(l)
    }
    return arr ;
}
