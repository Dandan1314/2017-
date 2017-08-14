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


