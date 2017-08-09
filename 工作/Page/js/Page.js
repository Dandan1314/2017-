var PAGE_INFO = [];
var ACTIVE_OBJECT;
function initPage() {
    $.initPage();
    showDate() && setInterval(showDate(),60000);
   
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

function showDate(){
	var e  = $.getElem('now_time');
	var d = new Date();
	var nowtime = d.format('hh:mm');
	var nowyear = d.getFullYear();
	var nowday = d.format('-MM-dd');
	var day  = d.getDay();
	var weeks = '日一二三四五六';
	e.innerHTML = '<span class = "time">'+nowtime+'</span> <span class ="date">'+nowyear+nowday+'<span> <span class =" day" >星期'+weeks.slice(day,day+1)+'<span>';

  
}