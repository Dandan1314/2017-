var PAGE_INFO = [];
var PAGE_INFO_A_LIST = [
    //默认的焦点数据
    {
		key: 'f_A_list_0',
		pressUp: '',
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [0],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
    {
		key: 'f_A_list_1',
		pressUp: a_list_up,
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [1],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
	{
		key: 'f_A_list_2',
		pressUp: a_list_up,
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [2],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
	{
		key: 'f_A_list_3',
		pressUp: a_list_up,
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [3],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
	{
		key: 'f_A_list_4',
		pressUp: a_list_up,
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [4],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
	{
		key: 'f_A_list_5',
		pressUp: a_list_up,
		pressDown: a_list_down,
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [5],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	},
	{
		key: 'f_A_list_6',
		pressUp: a_list_up,
		pressDown: '',
		pressLeft: '',
		pressRight: a_list_right,
		pressOk: null,
		args: [6],
		focusImg: [],
		showLength: "",
		wholeMsg: ""
	}
];
//B列表
var PAGE_INFO_B_LIST = [];
//C列表
var PAGE_INFO_C_LIST = [];
//D列表
var PAGE_INFO_D_LIST = [];
//焦点
var ACTIVE_OBJECT;

var CHANNEL_LIST_DS,//频道数据
	channelListMap = {},
	date_ds = [],//日期数据(7条)
	schedule_ds = [],//节目单数据
	a_list_begin = 0,
	a_list_index = 0,
	b_list_begin = 0,
	b_list_index = 0,
	B_LIST_SIZE = 8,
	c_list_begin = 0,
	c_list_index = 0,
	C_LIST_SIZE = 3,
	C_LIST_TOTAL = 3,//3天回看
	d_list_begin = 0,
	SHADOW_SIZE = 1,//阴影个数
	D_LIST_SIZE = 8;
for(var i = 0; i < C_LIST_TOTAL; i++){
	var d = new Date();
	//设置成三天前
	d.setDate(d.getDate() - i);
	date_ds.push(d);//push三天
}
//获取请求地址
var SERVER_URL = $.getConstant("serverUrl");

// D列显示长度
var d_showLen = 15;
// B列显示长度
var b_showLen = 8;
//保存KEY
var PAGE_INFO_KEY = 'CHANNEL_LIST_KEY',
    PAGE_INFO_KEY_2 = 'CHANNEL_LIST_KEY_2';
//如果能取得当前焦点 否则就放在第一个上
var ACTIVE_OBJECT_KEY = $.getGlobalData(PAGE_INFO_KEY) || 'f_A_list_0';

var positive = true,
	positive_first = false;
var infos = ((infos = $.getGlobalData(PAGE_INFO_KEY_2)) && infos.split('@')) || [];
if(infos.length){
	positive = false;
	positive_first = true;
	//有值就取值,没有值就是0
	a_list_begin = infos[0] - 0;
	a_list_index = infos[1] - 0;
	b_list_begin = infos[2] - 0;
	b_list_index = infos[3] - 0;
	c_list_begin = infos[4] - 0;
	c_list_index = infos[5] - 0;
	d_list_begin = infos[6] - 0;
}
$.saveGlobalData(PAGE_INFO_KEY, 'undefined');
$.saveGlobalData(PAGE_INFO_KEY_2, 'undefined');


//////////////////////////////////////

function initPage() {
	$.recodeData('jldx-zblb','access');
	$.initPage("HD");
	loadPage();
}

function loadPage(){
	CHANNEL_LIST_DS = channelData.data;
    //取出数据,把开始条目和总条目存到对象channelListMap中
	for(var i = 0, j = 0; i < CHANNEL_LIST_DS.length; i++){
		var d = CHANNEL_LIST_DS[i];
		if(d.channelNumber <= 10){//长春
			j = 0;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else if(d.channelNumber <= 200){//吉视
			j = 1;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else if(d.channelNumber <= 300){//央视
			j = 2;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else if(d.channelNumber <= 400){//卫视
			j = 3;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else if(d.channelNumber < 500){//数字
			j = 4;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else if(d.channelNumber <= 600){//高清
			j = 5;
			channelListMap[j] || (channelListMap[j] = [i]);
		}else{//轮播
			j = 6;
			channelListMap[j] || (channelListMap[j] = [i]);
			break;
		}
		channelListMap[j][1] = i + 1;
	}
	var typeNames = ['长春', '吉视', '央视', '卫视', '数字', '高清', '轮播'];
    //写入A LIST
	for(var i = 0; i < typeNames.length; i++){
		$.getElem('f_A_list_' + i).innerHTML = typeNames[i];
	}
	if(positive){//正向
		var index = $.getRequestParams('_A_Focus_Index') - 0 || 0;
		renderList('A', {
			index : index
		});
		getTagShowFocus(ACTIVE_OBJECT_KEY.replace(/\d/, index));
	}else{//返回
		renderList('', {});
	}
	query_reservation();
}

function initPageInfo() {
    PAGE_INFO = PAGE_INFO_A_LIST.concat(PAGE_INFO_B_LIST).concat(PAGE_INFO_C_LIST).concat(PAGE_INFO_D_LIST);
}


//////////////////////////////////////

//生成直播
function createBList(begin) {
    b_list_begin = begin;
    var size = B_LIST_SIZE + SHADOW_SIZE;//每页个数
	var b_list = $.getElem('b_list');
	//清空列表
	b_list.innerHTML = '';
	//清空PAGE_INFO
	PAGE_INFO_B_LIST = [];
	var end = begin + size;
	(end > CHANNEL_LIST_DS.length) && (end = CHANNEL_LIST_DS.length);

	var items = [];
	//生成B列数据
	for(var i = begin, j = 0; i < end; i++, j++){
		var d = CHANNEL_LIST_DS[i];
		var wholeMsg = ('000' + d.channelNumber).slice(-3) + ' ' + d.channelName;
		var name = wholeMsg;
		if(UTIL.substringOneLine(name, b_showLen)){
			name = UTIL.substringOneLine(name, b_showLen - 1) + '...';
		}
		var id = 'f_B_list_' + j;
		var item = '<li id="' + id + '">' + name + '</li>';
		items.push(item);

		//生成PAGE_INFO
		if(j < B_LIST_SIZE){
			var info = {
				key : id,
				pressUp: j > 0 ? b_list_up : b_list_page_up,
				pressDown: j < (B_LIST_SIZE - 1) ? b_list_down : b_list_page_down,
				pressLeft: b_list_left,
				pressRight: b_list_right,
				pressOk: playChannel,
				args: [i, j],
				focusImg: [],
				showLength: b_showLen,
				wholeMsg: wholeMsg
			};
			PAGE_INFO_B_LIST.push(info);
		}
	}
	//生成PAGE_INFO
	initPageInfo();
	//生成列表
	b_list.innerHTML = items.join('');
}

//生成日期
function createCList(begin){
	c_list_begin = begin;
	var size = C_LIST_SIZE + SHADOW_SIZE;//每页个数
	var c_list = $.getElem('c_list'),
		d_list = $.getElem('d_list');
	//清空列表
	c_list.innerHTML = '';
	//清空D列数据
	d_list.innerHTML = '';
	//清空PAGE_INFO
	PAGE_INFO_C_LIST = [];

	var items = [];
	var end = begin + size;
	(end >= C_LIST_TOTAL) && (end = C_LIST_TOTAL);
	for(var i = begin, j = 0; i < end; i++, j++){
		var name = date_ds[i].format('MM月dd日');
		var id = 'f_C_list_' + j;
		var className = [];
		/*//今天
		if(i == 0){
			name = '今天';
			className.push('today');
		}*/
		var item = '<li id="' + id + '" class="' + className.join(' ') + '">' + name + '</li>';
		items.push(item);

		//生成PAGE_INFO
		if(j < C_LIST_SIZE){
			var info = {
				key : id,
				pressUp: j > 0 ? c_list_up : c_list_page_up,
				pressDown: j < (C_LIST_SIZE - 1) ? c_list_down : c_list_page_down,
				pressLeft: c_list_left,
				pressRight: c_list_right,
				pressOk: null,
				args: [i, j],
				focusImg: [],
				showLength: '',
				wholeMsg: ''
			};
			PAGE_INFO_C_LIST.push(info);
		}
	}
	//生成PAGE_INFO
	initPageInfo();
	//生成列表
	c_list.innerHTML = items.join('');
	b_chagne_cTop();
}

//生成节目单
function createDList(begin){
	d_list_begin = begin;
	var size = D_LIST_SIZE + SHADOW_SIZE;//每页个数
	var d_list = $.getElem('d_list');
	//清空列表
	d_list.innerHTML = '';
	//清空PAGE_INFO
	PAGE_INFO_D_LIST = [];
	var items = [];
	var now = new Date().format('yyyy-MM-dd hh:mm:ss');
	var end = begin + size;
	(end > schedule_ds.length) && (end = schedule_ds.length);
	for(var i = begin, j = 0; i < end; i++, j++){
		var d = schedule_ds[i];
		var id = 'f_D_list_' + j;
		var name = d.text;
		if(UTIL.substringOneLine(name, d_showLen)){
			name = UTIL.substringOneLine(name, d_showLen - 1) + '...';
		}
		var time = d.starttime.substring(11, 16) + '-' + d.endtime.substring(11, 16);
		var className = [];
		var type = 1;
		if(now < d.starttime){//预定
			type = 1;
			className.push('order');
		}else if(now >= d.starttime && now < d.endtime){//直播
			type = 2;
			className.push('channel');
		}else{//回看
			type = 3;
			className.push('tvod');
		}
		var item = '<li id="' + id + '" class="' + className.join(' ') + '"><div class="time">' + time + '</div><div class="title" id="f_D_list_name_' + j + '">' + name + '</div><div class="icon"></div></li>';
		items.push(item);

		//生成PAGE_INFO
		if(j < D_LIST_SIZE){
			var info = {
				key : id,
				pressUp: j > 0 ? d_list_up : d_list_page_up,
				pressDown: j < (D_LIST_SIZE - 1) ? d_list_down : d_list_page_down,
				pressLeft: d_list_left,
				pressRight: '',
				pressOk: type == 1 ? reserveAction : (type == 2 ? playChannel : playTvod),
				args: [i, j],
				focusImg: [],
				showLength: d_showLen,
				wholeMsg: d.text
			};
			PAGE_INFO_D_LIST.push(info);
		}
	}
	//生成PAGE_INFO
	initPageInfo();
	//生成列表
	d_list.innerHTML = items.join('');
	//渲染预定信息
	renderReservation();
}

//生成列表
function renderList(level, opt) {
	var b_begin, b_index, c_begin, c_index, d_begin, channelId, date;
	var _opt = {
		begin : opt.begin || 0,
		index : opt.index || 0
	};
	switch(level){
		case 'A':
			a_list_index = _opt.index;
			reset_b_index();
			b_begin = channelListMap[_opt.index][0];
			createBList(b_begin);
			createCList(0);
			date = date_ds[0];
			b_index = b_begin;
			channelId = CHANNEL_LIST_DS[b_index].channelId;
			getSchedule(date, channelId);
			break;
		case 'B':
			b_begin = _opt.begin;
			createBList(b_begin);
			createCList(0);
			date = date_ds[0];
			b_index = _opt.index;
			channelId = CHANNEL_LIST_DS[b_index].channelId;
			getSchedule(date, channelId);
			break;
		case 'C':
			c_begin = _opt.begin;
			c_index = _opt.index;
			createCList(c_begin);
			date = date_ds[c_index];
			b_index = b_list_index;
			channelId = CHANNEL_LIST_DS[b_index].channelId;
			getSchedule(date, channelId);
			break;
		case 'D':
			d_begin = _opt.begin;
			createDList(d_begin);
			break;
		default://返回
			createBList(b_list_begin);
			createCList(c_list_begin);
			date = date_ds[c_list_index];
			channelId = CHANNEL_LIST_DS[b_list_index].channelId;
			getSchedule(date, channelId);
			a_list_add_current();
			if(/f_D_list/.test(ACTIVE_OBJECT_KEY)){//在D列
				b_list_add_current();
				c_list_add_current();
			}
			break;
	}
}

//////////////////////////////////////

//获取节目单
function getSchedule(date, channelId){
	//date 转换成 格式：2013-06-12
	var url = SERVER_URL + "json/" + date.format('yyyy-MM-dd') + '/' + channelId + '.js';
	UTIL.loader(url);
}
//节目单回调
function getscheduleInfo() {
	schedule_ds = epgdata.programs || [];

	//找到节目单直播所在开始位置
	var d_list_begin_tmp = getDListStartIndex();
	
	if(positive_first && !positive){
		positive_first = false;
		//生成节目单
		createDList(d_list_begin);
		getTagShowFocus(ACTIVE_OBJECT_KEY);
	}else{
		//生成节目单
		createDList(d_list_begin_tmp);
	}
}
function _scheduleInfoCallback() {}
//获取节目单直播所在开始位置
function getDListStartIndex() {
	if(c_list_index != 0)return 0;//不在今天
	var ds = schedule_ds || [];
	var now = new Date().format('yyyy-MM-dd hh:mm:ss');
	var out = 0;
	for(var i = 0; i < ds.length; i++){
		var d = ds[i];
		if(now >= d.starttime && now < d.endtime){
			out = i;
			break;
		}
	}
	out = Math.floor(out / D_LIST_SIZE) * D_LIST_SIZE; 
	return out;
}

//////////////////////////////////////////////////////////////////////////////

//查询预定信息
function query_reservation() {
	var now = new Date().format('yyyyMMddhhmm');
    query_afterspt_reservation(now ,'query_all_reservation_callback');
}
//预定信息
var query_all_reservation_ds = {length:0};
function query_all_reservation_callback(ds) {
    query_all_reservation_ds = {length:0};
    if(ds && ds.code){
        for(var i in ds.data){
            var d = ds.data[i],
                key = 'key_' + d.channel + '_' + d.time + '00';
            query_all_reservation_ds[key] = d;
            query_all_reservation_ds.length++;
        }
    }
    renderReservation();
}
//显示预定
function renderReservation() {
	var programs = schedule_ds,
		start = d_list_begin,
		end = start + D_LIST_SIZE + SHADOW_SIZE,
		channelNumber = CHANNEL_LIST_DS[b_list_index].channelNumber,
		now = new Date().format('yyyyMMddhhmm');

	end > programs.length && (end = programs.length);
	for (var i = start, j = 0; i < end; i++, j++) {
		var d = programs[i],
			starttime = d.starttime.replace(/[:\- ]/g, ''),
			key = 'key_' + channelNumber + '_' + starttime,
			tmp_d = query_all_reservation_ds[key];
		if(now < starttime){
			if(channelNumber == (tmp_d && tmp_d.channel)){
				addClass('ordered', 'f_D_list_' + j);
			}else{
				removeClass('ordered', 'f_D_list_' + j);
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////

//操作样式
function addClass(className, el){
	if(typeof el === 'string'){
		el = $.getElem(el);
	}
	UTIL.classHelper.add(className, el);
}
function removeClass(className, el){
	if(typeof el === 'string'){
		el = $.getElem(el);
	}
	UTIL.classHelper.remove(className, el);
}
//重写$.getTargetObj
var getTargetObj = $.getTargetObj;
$.getTargetObj = function(keyOrFn){
    typeof keyOrFn === 'function' ? (keyOrFn()) : (getTargetObj(keyOrFn));
    textScroll();
};
//重写showFocusBorder
$.showFocusBorder = function(){
    hideFocusBorder();
	var id = ACTIVE_OBJECT.key;
	//显示焦点框
	addClass('focusBorder', id);
}
function getTagShowFocus(key){
    $.getTargetObj(key);
    $.showFocusBorder();
}
function hideFocusBorder(){
	var oldEl = UTIL.getElByClass('focusBorder', document.body)[0];
	oldEl && (removeClass('focusBorder', oldEl));
};
//滚动
function textScroll() {
    var showLen = ACTIVE_OBJECT.showLength;
    var id = ACTIVE_OBJECT.key.replace('f_D_list_', 'f_D_list_name_');
    var el = $.getElem(id),
        all = ACTIVE_OBJECT.wholeMsg || '',
        width = '',
        height = '';
     if($.startWith(ACTIVE_OBJECT.key, 'f_B_list')){
     	width = '83%';
     	height = '99%';
     }
    var wholeMsg = UTIL.substringOneLine(all, showLen);
    if(wholeMsg) {
        UTIL.Marquee({
            el: el,
            all: all,
            width: width,
            height: height
        });
    }else{
        UTIL.Marquee();
    }
}

function savePageInfo() {
	$.saveGlobalData(PAGE_INFO_KEY, ACTIVE_OBJECT.key);
	var infos = [
		a_list_begin,
		a_list_index,
		b_list_begin,
		b_list_index,
		c_list_begin,
		c_list_index,
		d_list_begin,
	];
	$.saveGlobalData(PAGE_INFO_KEY_2, infos.join('@'));
}

/////////////////////////////////////////

function a_list_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	a_list_index = tmp_index;
	reset_b_index();
	renderList('A', {
		index : tmp_index,
		begin : 0
	});
	getTagShowFocus('f_A_list_' + tmp_index);
}
function a_list_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	a_list_index = tmp_index;
	reset_b_index();
	renderList('A', {
		index : tmp_index,
		begin : 0
	});
	getTagShowFocus('f_A_list_' + tmp_index);
}
function a_list_right() {
	a_list_add_current();
	var next_offset = b_list_index - b_list_begin;
	getTagShowFocus('f_B_list_' + next_offset);
}
function a_list_add_current(){
	var offset = a_list_index - a_list_begin;
	var id = 'f_A_list_' + offset;
	addClass('current', id);
}
function b_list_left() {
	/*var index = ACTIVE_OBJECT.args[0];
	for(var i in channelListMap){
		var d = channelListMap[i];

	}*/
	var offset = a_list_index - a_list_begin;
	var id = 'f_A_list_' + offset;
	removeClass('current', id);
	getTagShowFocus(id);
}
function b_list_right() {
	b_list_add_current();
	var next_offset = c_list_index - c_list_begin;
	getTagShowFocus('f_C_list_' + next_offset);
}
function b_list_add_current(){
	var offset = b_list_index - b_list_begin;
	var id = 'f_B_list_' + offset;
	addClass('current', id);
}
function b_list_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] - 1;
	if(tmp_index < 0)return;
	//记录位置
	b_list_index = tmp_index;
	reset_c_index();
	changeAList();

	renderList('C', {
		index : 0,
		begin : 0
	});
	getTagShowFocus('f_B_list_' + tmp_offset);
}

function b_list_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] + 1;
	if(tmp_index >= CHANNEL_LIST_DS.length)return;
	//记录位置
	b_list_index = tmp_index;
	reset_c_index();
	changeAList();
	renderList('C', {
		index : 0,
		begin : 0
	});
	getTagShowFocus('f_B_list_' + tmp_offset);
}
function b_chagne_cTop() {
	var index = b_list_index - b_list_begin;
    removeClass('top0 top1 top2 top3 top4 top5', 'c_list');
    switch (index) {
        case 0:
            addClass('top0', 'c_list');
            break;
        case 1:
            addClass('top1', 'c_list');
            break;
        case 2:
            addClass('top2', 'c_list');
            break;
        case 3:
            addClass('top3', 'c_list');
            break;
        case 4:
            addClass('top4', 'c_list');
            break;
        default:
         	addClass('top5', 'c_list');
    }
}


function b_list_page_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	if(tmp_index < 0)return;
	//记录位置
	b_list_index = tmp_index;
	b_list_begin--;
	reset_c_index();
	changeAList();

	renderList('B', {
		index : tmp_index,
		begin : b_list_begin
	});
	//第一个
	getTagShowFocus('f_B_list_0');
}

function b_list_page_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	if(tmp_index >= CHANNEL_LIST_DS.length)return;
	//记录位置
	b_list_index = tmp_index;
	b_list_begin++;
	reset_c_index();
	changeAList();

	renderList('B', {
		index : tmp_index,
		begin : b_list_begin
	});
	//最后一个
	getTagShowFocus('f_B_list_' + (B_LIST_SIZE - 1));
}


function c_list_left() {
	var offset = b_list_index - b_list_begin;
	var id = 'f_B_list_' + offset;
	removeClass('current', id);
	getTagShowFocus(id);
}
function c_list_right() {
	c_list_add_current();
	getTagShowFocus('f_D_list_0');
}
function c_list_add_current(){
	var offset = c_list_index - c_list_begin;
	var id = 'f_C_list_' + offset;
	addClass('current', id);
}

function c_list_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] - 1;
	if(tmp_index < 0)return;
	//记录位置
	c_list_index = tmp_index;
	reset_d_index();

	renderList('C', {
		index : tmp_index,
		begin : c_list_begin
	});
	getTagShowFocus('f_C_list_' + tmp_offset);
}

function c_list_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] + 1;
	if(tmp_index >= C_LIST_TOTAL)return;
	//记录位置
	c_list_index = tmp_index;
	reset_d_index();

	renderList('C', {
		index : tmp_index,
		begin : c_list_begin
	});
	getTagShowFocus('f_C_list_' + tmp_offset);
}

function c_list_page_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	if(tmp_index < 0)return;
	//记录位置
	c_list_index = tmp_index;
	c_list_begin--;
	reset_d_index();

	renderList('C', {
		index : tmp_index,
		begin : c_list_begin
	});
	//第一个
	getTagShowFocus('f_C_list_0');
}

function c_list_page_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	if(tmp_index >= C_LIST_TOTAL)return;
	//记录位置
	c_list_index = tmp_index;
	c_list_begin++;
	reset_d_index();

	renderList('C', {
		index : tmp_index,
		begin : c_list_begin
	});
	//最后一个
	getTagShowFocus('f_C_list_' + (C_LIST_SIZE - 1));
}


function d_list_left() {
	var offset = c_list_index - c_list_begin;
	var id = 'f_C_list_' + offset;
	removeClass('current', id);
	getTagShowFocus(id);
}

function d_list_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] - 1;
	if(tmp_index < 0)return;
	//记录位置
	d_list_index = tmp_index;

	getTagShowFocus('f_D_list_' + tmp_offset);
	reserveAction.isLoading = false;
}

function d_list_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	var tmp_offset = ACTIVE_OBJECT.args[1] + 1;
	if(tmp_index >= schedule_ds.length)return;
	//记录位置
	d_list_index = tmp_index;

	getTagShowFocus('f_D_list_' + tmp_offset);
	reserveAction.isLoading = false;
}

function d_list_page_up() {
	var tmp_index = ACTIVE_OBJECT.args[0] - 1;
	if(tmp_index < 0)return;
	//记录位置
	d_list_index = tmp_index;
	d_list_begin--;

	renderList('D', {
		index : tmp_index,
		begin : d_list_begin
	});
	//第一个
	getTagShowFocus('f_D_list_0');
}

function d_list_page_down() {
	var tmp_index = ACTIVE_OBJECT.args[0] + 1;
	if(tmp_index >= schedule_ds.length)return;
	//记录位置
	d_list_index = tmp_index;
	d_list_begin++;

	renderList('D', {
		index : tmp_index,
		begin : d_list_begin
	});
	//最后一个
	getTagShowFocus('f_D_list_' + (D_LIST_SIZE - 1));
}

/////////////////////////////////////

//重置下标
function reset_b_index() {
	b_list_index = channelListMap[a_list_index][0];
	reset_c_index();
	reset_d_index();
}
function reset_c_index() {
	c_list_index = 0;
	reset_d_index();
}
function reset_d_index() {
	d_list_index = getDListStartIndex();
}

//B列改变，修改A列位置
function changeAList(){
	var tmp_index = a_list_index;
	for(var i in channelListMap){
		var d = channelListMap[i];
		var start = d[0];
		var end = d[1];
		if(b_list_index >= start && (typeof end === 'undefined' || b_list_index < end)){
			tmp_index = i;
			break;
		}
	}
	if(a_list_index !== tmp_index){
		removeClass('current', 'f_A_list_' + a_list_index);
		a_list_index = tmp_index;
		addClass('current', 'f_A_list_' + a_list_index);
	}
}


//////////////////////////////////////

//预定
function reserveAction() {
	if(!reserveAction.isLoading){
		var channel = CHANNEL_LIST_DS[b_list_index];
		var channelNumber = channel.channelNumber;
		var index = ACTIVE_OBJECT.args[0];
		var d = schedule_ds[index];
		var name = d.text;
		var startTime = d.starttime.replace(/[:\- ]/g, '');
		var id = ACTIVE_OBJECT.key;
		var el = $.getElem(id);
		reserveAction.isLoading = true;
		setTimeout(function(){
			reserveAction.isLoading = false;
		}, 400);
		if(/ordered/.test(el.className)){
			delete query_all_reservation_ds['key_' + channelNumber + '_' + startTime];
			query_all_reservation_ds.length--;
			removeClass('ordered',el);
            del_reservation(channelNumber, name, startTime.substring(0, 12), "tip_reservation_del");
		}else{
			addClass('ordered',el);
            make_reservation(channelNumber, name, startTime.substring(0, 12), "tip_reservation_make");
		}
	}
}
function playChannel() {
	var channel = CHANNEL_LIST_DS[b_list_index];
	playLiveOrRec(channel.channelNumber);
}
function playTvod() {
	var index = ACTIVE_OBJECT.args[0];
	var d = schedule_ds[index];
	var channel = CHANNEL_LIST_DS[b_list_index];
	var starttime = d.starttime.replace(/[:\- ]/g, '');
	var endtime = d.endtime.replace(/[:\- ]/g, '');
	playLiveOrRec(channel.channelNumber, starttime, endtime, d.text);
}

//直播回看
function playLiveOrRec(num, st, et, name) {
	savePageInfo();
	$.playLiveOrRec(num, st, et, name);
}

///////////////////////////////////////////

function replaceReservationCallback(d){
	// $.showFocusBorder();
	if(d.code == 1){
		tip_reservation_make();
	}
}
function tip_reservation_del(){
}
function tip_reservation_make(){
	clearTimeout(query_reservation.timer);
	query_reservation.timer = setTimeout(query_reservation, 200);
}