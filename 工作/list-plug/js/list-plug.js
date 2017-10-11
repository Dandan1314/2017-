(function (factory) {
    var path = '//'
    document.write('<link rel="stylesheet" href="css/list-plug.css">');
    window.LIST_TOOL = window.LIST_TOOL || factory();
})(function () {
    var col = 1;
    var row =  8;
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
    function _init() {
        creatBox();
        creatList();
        creatInfo();
        $.focusTo('listItem0')
    }
    function creatBox() {
        var video =  document.createElement('div'),listBox =  document.createElement('div');
        video.id = "video",video.className = 'video';
        listBox.id = 'listBox',listBox.className = 'listBox';
        document.body.appendChild(video);
        document.body.appendChild(listBox);
    }
    function creatInfo() {
        var arr = [],info={};
        if(/*col ==1*/1 ){
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
        if(1){
            if(ACTIVE_OBJECT.args[0] == row-1  && j + row < data.length ){
                j++;
                creatList();
                $.focusTo(ACTIVE_OBJECT)
            }else{
                $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]+col));
            }
            index ++ ;
            if(index > data.length -1){index = data.length-1};
        }
    }
    function _left() {
        if(col ==1 ){
            BTN  = ACTIVE_OBJECT.key;
            $.focusTo('video')
        }
    }
    function _ok() {
        // $.callSizeLivePlay(233,78,584,440,channel[index]);
    }
    function _right() {

    }
    function _up() {
        if(1){
            if(ACTIVE_OBJECT.args[0] == 0  && j > 0 ){
                j--;
                creatList();
                $.focusTo(ACTIVE_OBJECT)
            }else{
                $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]-col));
            }

            index -- ;
            if(index < 1){index = 0};

        }
    }
    return {
        init : _init,
        channel :channel
    }
})
