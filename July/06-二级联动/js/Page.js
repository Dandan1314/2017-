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
var PAGE_INFO_B_LIST = [];
var PAGE_INFO_C_LIST = [];
var PAGE_INFO_D_LIST = [];
// 默认焦点
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

    d_list_index= 0,
    SHADOW_SIZE = 1;//阴影个数
// B列显示长度
var b_showLen = 8;
function initPage() {
    $.initPage();
    loadPage();
    initPageInfo();
    getTagShowFocus('f_A_list_0')
}
//合并数组
function initPageInfo() {
    PAGE_INFO = PAGE_INFO_A_LIST.concat(PAGE_INFO_B_LIST).concat(PAGE_INFO_C_LIST).concat(PAGE_INFO_D_LIST)
}
function aList() {
    var typeNames = ['长春', '吉视', '央视', '卫视', '数字', '高清', '轮播'];
    //写入A LIST
    for(var i = 0; i < typeNames.length; i++){
        $.getElem('f_A_list_' + i).innerHTML = typeNames[i];
    }
}
function loadPage() {
    //取出频道列表信息
    CHANNEL_LIST_DS = channelData.data;
    for(var i =0,j=0;i<CHANNEL_LIST_DS.length;i++){
        var d = CHANNEL_LIST_DS[i];
        if(d.channelNumber <=10){//长春
            j =0;
        }else if(d.channelNumber <= 200){//吉林
          j=1
            // channelListMap[j] || (channelListMap[j] = [i]);
        }else if (d.channelNumber <= 300){//央视
            j=2;
        }else if(d.channelNumber <= 400){
            j=3;
        }else if(d.channelNumber <= 500){//卫视
            j=4;
        }else if(d.channelNumber <= 600){//高清
            j=5;
        }else{//轮播
            j=6
        }
        channelListMap[j] || (channelListMap[j] = [i]);
        channelListMap[j][1] = i + 1;
    }
    aList();
    var index = 0;
    renderList('A',{
        index : index
    })

}
function createBList(begin) {
    b_list_begin = begin;
    var size =B_LIST_SIZE+SHADOW_SIZE;
    var b_list = $.getElem('b_list');
    b_list.innerHTML = '';
    PAGE_INFO_B_LIST = [];
    var  end = begin +size;
    (end>CHANNEL_LIST_DS.length) && (end = CHANNEL_LIST_DS.length);
    var items = [];
    //生成B列数据
    for(var i = begin,j=0;i<end;i++,j++){
        var d = CHANNEL_LIST_DS[i];
        var wholeMsg = ('000'+d.channelNumber).slice(-3) + ' '+d.channelName;
        var name  = wholeMsg;
        if(UTIL.substringOneLine(name,b_showLen)){
            name = UTIL.substringOneLine(name,b_showLen-1)+ '...';
        }
        var id = 'f_B_list_'+j;
        var item = '<li id="'+id+'">'+name+'</li>'
        items.push(item);
        //生成PAGE_INFO
        if(j<B_LIST_SIZE){
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
            PAGE_INFO_B_LIST.push(info)
        }
        initPageInfo();
        //生成列表
        b_list.innerHTML = items.join('');
    }
}

//生成列表
    function renderList(level,opt) {
        var b_begin, b_index, c_begin, c_index, d_begin, channelId, date;
        var _opt = {
            begin :opt.begin || 0,
            index : opt.index || 0
        };
        switch (level){
            case 'A':
                a_list_index = _opt.index;
                b_begin = channelListMap[_opt.index][0];
                createBList(b_begin);
                date = date_ds[0];
                b_index = b_begin;
                channelId = CHANNEL_LIST_DS[b_index].channelId;
                break
            case 'B':
                b_begin = _opt.begin;
                createBList(b_begin);
                date = date_ds[0];
                b_index = _opt.index;
                channelId = CHANNEL_LIST_DS[b_index].channelId;
                break
            default://返回
                createBList(b_list_begin);
                a_list_add_current();
                break;
        }

    }
//样式操作
//增加样式
function addClass(el,className) {
    if(typeof el === 'string'){
        el = $.getElem(el);
    }
    UTIL.classHelper.add(className, el);
}
//移除样式
function removeClass(el,className) {
    if(typeof el === 'string'){
        el = $.getElem(el)
    }
    UTIL.classHelper.remove(className,el)
}
//重写$.getTargetObj
var getTargetObj = $.getTargetObj;
$.getTargetObj = function (keyOrFn) {
    typeof keyOrFn === 'function' ? (keyOrFn()) : (getTargetObj(keyOrFn));
}
//重写showFocusBorder
$.showFocusBorder = function () {
    hideFocusBorder();
    var id = ACTIVE_OBJECT.key;
    //显示焦点框
    addClass(id,'focusBorder');
}
function getTagShowFocus(key) {
    $.getTargetObj(key)
    $.showFocusBorder();
}
function hideFocusBorder() {
    var oldEl = UTIL.getElByClass('focusBorder',document.body)[0];
    oldEl &&(removeClass(oldEl,'focusBorder'))
}
///////////////////////////////////////////
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
    getTagShowFocus('f_B_list_'+next_offset);
}
function a_list_add_current(){
    var offset = a_list_index - a_list_begin;
    var id = 'f_A_list_' + offset;
    addClass(id,'current');
}
function b_list_left() {
    var offset = a_list_index - a_list_begin;
    var id = 'f_A_list_' + offset;
    removeClass(id,'current');
    getTagShowFocus(id);
}
function b_list_right() {
    b_list_add_current();
    var next_offset = c_list_index - c_list_begin;
    getTagShowFocus('f_C_list_' + next_offset);
}
function b_list_add_current(){
    var offset = b_list_index - b_list_begin;
    var id = 'f_B_list' + offset;
    addClass(id,'current');
}
function b_list_up() {
    var tmp_index = ACTIVE_OBJECT.args[0] - 1;
    var tmp_offset = ACTIVE_OBJECT.args[1] - 1;
    if(tmp_index < 0)return;
    //记录位置
    b_list_index = tmp_index;
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
    changeAList();
    renderList('C', {
        index : 0,
        begin : 0
    });
    getTagShowFocus('f_B_list_' + tmp_offset);
}
function b_list_page_up() {
    var tmp_index = ACTIVE_OBJECT.args[0] - 1;
    if(tmp_index < 0)return;
    //记录位置
    b_list_index = tmp_index;
    b_list_begin--;
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
    changeAList();

    renderList('B', {
        index : tmp_index,
        begin : b_list_begin
    });
    //最后一个
    getTagShowFocus('f_B_list_' + (B_LIST_SIZE - 1));
}


/////////////////////////////////////


//重置下标
function reset_b_index() {
    b_list_index = channelListMap[a_list_index][0];
}
function playChannel() {
    var channel = CHANNEL_LIST_DS[b_list_index];
    playLiveOrRec(channel.channelNumber);
}
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
        removeClass('f_A_list_' + a_list_index,'current');
        a_list_index = tmp_index;
        addClass( 'f_A_list_' + a_list_index,'current');
    }
}