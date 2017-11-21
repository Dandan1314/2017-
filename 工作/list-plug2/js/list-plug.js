(function (factory) {
    var userInfo = {
        col: 2,
        row: 3,
        id : 'listItem',
        className : 'list_item',
        width  : 100,
        height : 40,
        lMargin : 30,
        tMargin : 10,
        left : 850,
        top : 100
    }
    document.write('<link rel="stylesheet" href="css/list-plug.css">');
    window.LIST_TOOL = window.LIST_TOOL || factory(userInfo);
})(function (opt) {
    var col = opt.col || 1;//列数
    var row =  opt.row || 5;//行数
    var pageSize = col*row //一页的最大个数
    var j  = 0;//当前页数
    var index = 0 ;//当前焦点在列表内的索引
    var channel = [];//存放频道号的数组
    var BTN  = '';//记录焦点
    var arr = [];//记录当前页共有多少条list
    function creatBox() {//创建父级盒子
        var video =  document.createElement('div'),listBox =  document.createElement('div');
        video.id = "video",video.className = 'video';
        listBox.id = 'listBox',listBox.className = 'listBox';
        document.body.appendChild(video);
        document.body.appendChild(listBox);
    }
    for(var i in data){
        channel.push(data[i].channelId)
    }
    /***********************************************starting***********************************************************/
    //创建元素
    function creatList() {
         arr = [] ;var l = '';
        var a = j*col
        var len = (a+pageSize) >= data.length ? data.length : (a+pageSize)
        for(var i = a ,s = 0;i < len; i++,s++){
            //当数量超出数据长度时停止循环
            var p = $.substringElLength(''+ data[i].name,'16px',opt.width+'px').flag ?  $.substringElLength(''+ data[i].name,'16px',opt.width+'px').cut : data[i].name
            l ='<div id="'+opt.id+s+'" class="'+opt.className+'"> '+p+'</div>'
            arr.push(l);
        }
        $('#listBox').html(arr.join(''));
    }
    //创建PageInfo信息
    function creatInfo() {

        var infoArr = [],info={};
        var a = j*col
            for(var i = 0 ;i<arr.length;i++){
                info = {
                    key:opt.id+i,
                    pressDown: _down,
                    pressLeft:_left,
                    pressOk :  _ok,
                    pressRight:_right,
                    pressUp:  _up,
                    info: opt.id,
                    wholeMsg:data[a+i].name,
                    focusImg: [],
                    args:[i],
                    marquee:[ $.substringElLength(''+ data[a+i].name,'16px',opt.width+'px').flag,'#'+opt.id+i]
                    //
                }
                infoArr.push(info);
            }
        //先清空
        PAGE_INFO = [];
        PAGE_INFO.push({
            key:'video',
            pressOk:function () {
                $.playLiveOrRec(channel[index]);
            },
            pressRight:function () {
                $.focusTo(BTN)
            }
        })
        PAGE_INFO =  PAGE_INFO.concat(infoArr)
    }
    //设置样式
    function setStyle() {
        if(!opt.id)return;
        var cfg = {};
        cfg.id = opt.id ;
        cfg.top = opt.top || 0;
        cfg.left = opt.left || 0;
        cfg.width = opt.width || 100;
        cfg.height =  opt.height || 100;
        cfg.lMargin = opt.lMargin || 10;
        cfg.tMargin = opt.tMargin || 10;
        for(var i=0,len = arr.length;i<len;i++){
            var liveCol = parseInt(i/col);
            var liveRow = parseInt(i%col);
            $('#'+cfg.id+i)[0].style.position = 'absolute';
            $('#'+cfg.id+i)[0].style.width = cfg.width +'px';
            $('#'+cfg.id+i)[0].style.height = cfg.height +'px';
            $('#'+cfg.id+i)[0].style.left = liveRow * (cfg.lMargin+ cfg.width)+ cfg.left+'px';
            $('#'+cfg.id+i)[0].style.top =liveCol *( cfg.tMargin +cfg.height) +cfg.top+ 'px';
        }
    }
    //操作
    function _down () {
            var liverow = Math.floor(ACTIVE_OBJECT.args[0]/col)
            if(liverow== row - 1  && j + row < Math.ceil(data.length /col)){
                j++;
                creatList();
                setStyle()
                creatInfo();
                $.focusTo(ACTIVE_OBJECT.key);
                if($('#'+ACTIVE_OBJECT.key).length){
                    $.focusTo(ACTIVE_OBJECT.key)
                }else{
                    $.focusTo(PAGE_INFO[PAGE_INFO.length-1].key);
                }

            }else{
                if($('#'+ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]+col)).length){
                    $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]+col));
                }else{
                    $.focusTo(PAGE_INFO[PAGE_INFO.length-1].key);
                }
            }
    }
    function _left() {
        var liverow = Math.floor(ACTIVE_OBJECT.args[0]/col)
            if(ACTIVE_OBJECT.args[0]/col == liverow){
                BTN  = ACTIVE_OBJECT.key;
                $.focusTo('video')
            }else{
                var f = ACTIVE_OBJECT.info +(ACTIVE_OBJECT.args[0]-1);
                $.focusTo(f)
            }
    }
    function _ok() {
        var l = j*col + ACTIVE_OBJECT.args[0],a = channel[l];
        console.log(a);
    }
    function _right() {
        var f = ACTIVE_OBJECT.info +(ACTIVE_OBJECT.args[0]+1);
        $.focusTo(f)
    }
    function _up() {
            var liverow = Math.floor(ACTIVE_OBJECT.args[0]/col);
            if(liverow == 0 && j > 0 ){
                j--;
                creatList();
                setStyle()
                creatInfo();
                $.focusTo(ACTIVE_OBJECT.key)
            }else{
                $.focusTo(ACTIVE_OBJECT.info+ (ACTIVE_OBJECT.args[0]-col));
            }
    }
    /****************************************************ending***************************************************/
    //对外接口
    function _init() {
        creatBox();
        creatList();
        setStyle()
        creatInfo();
        $.focusTo('listItem0')
    }
    return {
        init : _init,
    }
})

