var PAGE_INFO = [];
var ACTIVE_OBJECT;
//初始页数
var PAGE_NUM = 1;
//数据长度
var dataLength = data.length;
//存放每页数据的盒子
var json =[];
// 根据页数来判断记录当前json盒子的索引
var page = PAGE_NUM -1;
// 行数 / 列数
var row = 3;
var col = 5;
//一页的最大个数
var PAGE_SIZE = row * col ;
//总页数
var PAGE_COUNT=Math.ceil(dataLength/PAGE_SIZE );
//初始化界面
function initPage() {
    $.initPage();
    concat();
    showFocus('divBorder0')
}
//展示焦点
function showFocus(key) {
    $.getTargetObj(key);
    $.showFocusBorder();
}
//把数据分成若干页
function paging() {
    var j ;
    for(var i = 0;i<dataLength;i++){
        j = Math.floor(i/PAGE_SIZE);
        json[j] || (json[j] = []);
        json[j].push(data[i].name)
    }
}
//根据数据创建焦点元素
function creatFocus() {
    var _divBorder ;
    var _divList;
    var _divLists = [];
    var  _divBorders = [];
    var divBorders = $.getElem('divBorders');
    var divLists = $.getElem('divList');

    for(var i = 0;i<json[page].length;i++){
        _divBorder = '<div id="divBorder'+i+'"></div>';
        _divBorders.push(_divBorder);
        _divList = '<div id="divList'+i+'" class="divList"></div>';
        _divLists.push(_divList);
    }
    divBorders.innerHTML = _divBorders.join('');
    divLists.innerHTML = _divLists.join('');
    $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
    setStyle('divList',105,130,10,74,107,127);
}
//根据数据创造PAGE_INFO
function creatInfo() {
    //首先清空
    PAGE_INFO = [];
    var pageLength = json[page].length;
    var lineTotal = Math.ceil(pageLength/col);
    for(var i=0;i<pageLength;i++){
            var line = Math.floor(i/col);
            var iPage_INFO = {
                "key":"divBorder"+i,
                "pressUp":line===0 ? '' : ('divBorder' + (i-col)),
                // "pressDown":line===0 ? ( lineTotal===1?'':( pageLength-col>i?('divBorder'+(i+col)):('divBorder'+(pageLength-1)) ) ) : '',
                "pressDown":line === Math.floor(pageLength/col)-1 ? '': ( pageLength-col>i?('divBorder'+(i+col)):('divBorder'+(pageLength-1)) )  ,
                "pressLeft":i===0?"":('divBorder'+(i-1)),
                "pressRight":lineTotal===1 ? (i===pageLength-1?"pageUpFocus":('divBorder'+(i+1))) : (i===col-1?"pageUpFocus":(i===pageLength-1?"pageDownFocus":('divBorder'+(i+1)))),
                "pressOk":pressOk,
                "focusImg":['images/picfocus_04.png'],
                "args":[i],
                "wholeMsg":json[page][i]
            };

            PAGE_INFO.push(iPage_INFO);
        $.getElem('divList'+i+'').innerHTML  = PAGE_INFO[i].wholeMsg;
    }
    var UD_INFO = [
        {"key":"pageUpFocus",
            "pressUp":"",
            "pressDown":"pageDownFocus",
            "pressLeft":lineTotal===1?('divBorder'+(pageLength-1)):('divBorder'+(col-1)),
            "pressRight":"",
            "pressOk":pressOk,
            "focusImg":["images/lk.png"],
            "args":[]},
        {"key":"pageDownFocus",
            "pressUp":"pageUpFocus",
            "pressDown":"",
            "pressLeft":'divBorder'+ (pageLength-1),
            "pressRight":"",
            "pressOk":pressOk,
            "focusImg":["images/lk.png"],
            "args":[]}
    ];
    PAGE_INFO = PAGE_INFO.concat(UD_INFO);

}
//翻页
function pressOk () {
    if(ACTIVE_OBJECT.key== "pageUpFocus"){
        if(PAGE_NUM > 1){
            PAGE_NUM--;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }else {
            return false
        }
        if(page>0){
            --page;
            creatFocus();
            creatInfo();
        }
    }
    if(ACTIVE_OBJECT.key == "pageDownFocus"){
        if(PAGE_NUM < PAGE_COUNT){
            PAGE_NUM++;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }else{
            return false
        }
        if(json[page+1]){
            ++page;
            creatFocus();
            creatInfo();
            if(PAGE_NUM == PAGE_COUNT){
                ACTIVE_OBJECT.pressLeft = 'divBorder'+(json[page].length-1)
            }
        }

    }
}
//合并方法
function concat() {
    paging();
    creatFocus();
    creatInfo();
}
//根据行数和列数来设置样式
function setStyle(id,width,height,leftMargin,topMargin,left,top) {

    $.getElem('pageUpFocus').style.left = col *(leftMargin+ width) -leftMargin +left +10 +'px';
    $.getElem('pageDownFocus').style.left = col *(leftMargin+ width) -leftMargin +left +10+'px';
    $.getElem('pageup').style.left = col *(leftMargin+ width) -leftMargin +left +10+'px';
    $.getElem('pagedown').style.left = col *(leftMargin+ width) -leftMargin +left +10+'px';
    $.getElem('pagenumdiv').style.left = col *(leftMargin+ width) -leftMargin +left +13+'px';

    $.getElem('pageup').style.top = (Math.ceil(json[page].length/col) *(topMargin +height) -topMargin)/2 -height+top-20+'px';
    $.getElem('pageUpFocus').style.top = (Math.ceil(json[page].length/col) *(topMargin +height) -topMargin)/2 -height-20+top+'px';
    $.getElem('pagedown').style.top = (Math.ceil(json[page].length/col)*(topMargin +height) - topMargin)/2 + height+top+'px';
    $.getElem('pageDownFocus').style.top = (Math.ceil(json[page].length/col) *(topMargin +height) - topMargin)/2 + height+top+'px';
    $.getElem('pagenumdiv').style.top = (Math.ceil(json[page].length/col)*(topMargin +height) -topMargin)/2 + height+'px';
    // if(json[page].length <=col ){
    //     $.getElem('pageup').style.top = ((topMargin +height) -topMargin) -height+top+'px';
    //     $.getElem('pageUpFocus').style.top = ((topMargin +height) -topMargin)-height+top+'px';
    //     $.getElem('pagedown').style.top = ((topMargin +height) - topMargin) + height+top+'px';
    //     $.getElem('pageDownFocus').style.top = ((topMargin +height) - topMargin)+ height+top+'px';
    //     $.getElem('pagenumdiv').style.top = ((topMargin +height) -topMargin)+ height+'px';
    // }
    for(var i=0;i<json[page].length;i++){
        var liveCol = parseInt(i/col);
        var liveRow = parseInt(i%col);
        $.getElem(id+i).style.left = liveRow * (leftMargin+ width)+left+'px';
        $.getElem(id+i).style.top =liveCol *(topMargin +height) +top+ 'px';
        $.getElem('divBorder'+i+'').style.left = liveRow * (leftMargin+ width)+98+'px';
        $.getElem('divBorder'+i+'').style.top =liveCol *(topMargin +height) +118+ 'px';
    }

}
