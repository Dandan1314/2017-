var PAGE_INFO = [], TJ_INFO = [], DB_INFO = [], VIP_INFO = [], ZT_INFO = [], APP_INFO = [], MINE_INFO = [], TAB_INFO = [
	{
		key: 'tab_tj',
	},
	{
		key: 'tab_db',
	},
	{
		key: 'tab_vip',
	},
	{
		key: 'tab_zt',
	},
	{
		key: 'tab_app',
	},
	{
		key: 'tab_mine',
	}
];
var ACTIVE_OBJECT = {};
function initPage() {
    $.initPage();
    showDate()&&setInterval(showDate,1000);
    creatPageInfo();
    showFocus("tj_div_4")
}
/* tool func */
function addClass(id,classname) {
	if(typeof id === 'string'){
		id = $.getElem(id)
	}
	UTIL.classHelper.add(classname,id);
}
function removeClass(id,classname){
	if(typeof id === 'string'){
		id = $.getElem(id)
	}
	UTIL.classHelper.remove(classname,id);
}
function indexObj(arr, value, key) {
    for (var i = 0; i < arr.length; i++){
        if (key && arr[i][key] === value || !key && arr[i] === value)return i;}
    return -1
}
//获取dom的样式
function getStyle(element, attr){
    if(element.currentStyle){
        return element.currentStyle[attr];
    }else{
        return window.getComputedStyle(element,null)[attr];
    }
}
//重写keypresstion
$.keypressoption = {
    "KEY_UP" : function() {
        if(typeof ACTIVE_OBJECT.pressUp ==="string"){
            showFocus(ACTIVE_OBJECT.pressUp)
        }else{
            ACTIVE_OBJECT.pressUp()
        }
        return true
    },
    "KEY_LEFT" : function() {
        if(typeof ACTIVE_OBJECT.pressLeft ==="string"){
            showFocus(ACTIVE_OBJECT.pressLeft)
        }else{
            ACTIVE_OBJECT.pressLeft()
        }
        return true
    },
    "KEY_RIGHT" : function() {
        if(typeof ACTIVE_OBJECT.pressRight ==="string"){
            showFocus(ACTIVE_OBJECT.pressRight)
        }else{
            ACTIVE_OBJECT.pressRight()
        }
        return true;
    },
    "KEY_DOWN" : function() {
        if(typeof ACTIVE_OBJECT.pressDown ==="string"){
            showFocus(ACTIVE_OBJECT.pressDown)
        }else{
            ACTIVE_OBJECT.pressDown()
        }
        return true;
    },
}
//展示焦点
function showFocus(key) {
    $.getTargetObj(key);
    addClass(key,"focusBorder")

}
function showDate(){
	var e  = $.getElem('now_time');
	var d = new Date();
	var nowtime = d.format('hh:mm');
	var nowyear = d.getFullYear();
	var nowday = d.format('-MM-dd');
	var day  = d.getDay();

	var weeks = '日一二三四五六';
	e.innerHTML = '<span class = "time">'+nowtime+'</span> <span class ="date">'+nowyear+nowday+'<span> <span class =" day" >星期'+weeks.slice(day,day+1)+'<span>';
    return true;
}
function creatPageInfo() {
    var info = {};
    //tab
    var tabList = document.getElementsByClassName("tabs")[0].children;
    for (var i = 0; i < tabList.length; i++) {
        info = {
            "key": tabList[i].id,
            "pressUp": pressUp,
            "pressDown": pressDown,
            "pressLeft": pressLeft,
            "pressRight": pressRight,
            "pressOk": "",
            "args": []
        }
        TAB_INFO.push(info)
    }
    function arrInfo(className,arr) {
        var list = document.getElementsByClassName(className)[0].children[0].children;
        for(var i=0;i<list.length;i++){
            info = {
                "key": list[i].id,
                "pressUp": pressUp,
                "pressDown": pressDown,
                "pressLeft": pressLeft,
                "pressRight": pressRight,
                "pressOk": "",
                "args": []
            }
            arr.push(info)
        }
    }
    //TJ
    arrInfo("sub-page-1",TJ_INFO);
    //DB
    arrInfo("sub-page-2",DB_INFO);
    //VIP
    arrInfo("sub-page-3",VIP_INFO);
    //ZT
    arrInfo("sub-page-4",ZT_INFO);
    //APP
    arrInfo("sub-page-5",APP_INFO);
    //MINE
    arrInfo("sub-page-6",MINE_INFO);
    PAGE_INFO = PAGE_INFO.concat(TAB_INFO,TJ_INFO,DB_INFO,VIP_INFO,ZT_INFO,APP_INFO,MINE_INFO)
}
function pressUp() {
    console.log("上");
}
function pressDown() {
    console.log("下");

}
function pressLeft() {
    console.log("左");

}
// function pressRight() {
//     var activeDom =$.getElem(ACTIVE_OBJECT.key) ;
//     var activeDomTop = getStyle(activeDom,"top");
//     var activeDomLeft = getStyle(activeDom,"left");
//     var pageDom;
//     var rightBox = "";
//     var temp = Infinity;
//     for(var i=0;i<PAGE_INFO.length;i++){
//         if(PAGE_INFO[i].key !=""){
//             pageDom = $.getElem(PAGE_INFO[i].key)
//             if(getStyle(pageDom,"top") == activeDomTop && parseInt(getStyle(pageDom,"left"))>parseInt(activeDomLeft) && parseInt(getStyle(pageDom,"left"))<temp ) {
//                         temp = parseInt(getStyle(pageDom,"left"));
//                         console.log(pageDom);
//                         rightBox = pageDom;
//                 }
//             }
//         }
// }
function pressRight() {
    console.log("右");
}



