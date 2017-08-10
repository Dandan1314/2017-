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

   
}
window.onload = function () {
    showDate()&&setInterval(showDate,1000);
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