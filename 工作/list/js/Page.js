var RECODE_DATA_KEY = "pageName";
var PAGE_INFO = [];
var ACTIVE_OBJECT;
function initPage() {
    $.initPage("HD");
    $.recodeData(RECODE_DATA_KEY, 'access');
    creatList();
    creatInfo();
    $.focusTo('listItem0')
}
var col = 1;
var row =  2;
var j  = 0;
var index = 0 ;
var channel = [];
var BTN  = '';
for(var i in data){
    channel.push(data[i].channelId)
}
function creatList() {
    var arr = [] ,l = '';
    for(var i = j ,s = 0;i< j+row ; i++,s++){
        if(i>data.length){break};
        l ='<div id="listItem'+s+'" class="list_item"> '+data[i].name+'</div>'
        arr.push(l);
    }
    $('#listBox').html(arr.join(''));
}
function creatInfo() {
    var arr = [],info={};
    if(col ==1 ){
        for(var i = 0 ;i<row;i++){
            info = {
                key:'listItem'+i,
                pressDown: _down,
                pressLeft:_left,
                pressOk :  _ok,
                pressRight:_right,
                pressUp:  _up,
                info: 'listItem',
                wholeMsg:data[i].name,
                focusImg: [],
                args:[i],
                // marquee:[true,'#listItem'+i]
            }
            arr.push(info);
        }
    }
    PAGE_INFO = [];
    PAGE_INFO.push({
        key:'video',
        pressOk:function () {
            $.playLiveOrRec(channel[index]);
        },
        pressRight:function () {
            $.focusTo(BTN)
        },
        focusImg: [],
    })
   PAGE_INFO =  PAGE_INFO.concat(arr)
}
function _down () {
    if(col == 1 ){
        $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]+1));
        index ++ ;
        if(index > data.length -1){index = data.length-1};
        if(ACTIVE_OBJECT.args[0] == row-1  && j + row < data.length ){
            j++;
            creatList();
            $.focusTo(ACTIVE_OBJECT)
        }
        // console.log(index);
    }
}
function _left() {

    if(col ==1 ){
        BTN  = ACTIVE_OBJECT.key;
        $.focusTo('video')
    }
}
function _ok() {
    $.callSizeLivePlay(233,78,584,440,channel[index]);
}
function _right() {
    
}
function _up() {
    if(col == 1 ){
        $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]-1));
        index -- ;
        if(index < 1){index = 0};
        if(ACTIVE_OBJECT.args[0] == 0  && j > 0 ){
            j--;
            creatList();
            $.focusTo(ACTIVE_OBJECT)
        }
    }
}