var DEFAULT_INFO = [];
var PICLIST_INFO=[
    {key:'divBorder0', pressUp:'',pressDown:'divBorder4',pressLeft:'',pressRight:'divBorder1',pressOk:pressOk,args:[0],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder1', pressUp:'',pressDown:'divBorder5',pressLeft:'divBorder0',pressRight:'divBorder2',pressOk:pressOk,args:[1],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder2', pressUp:'',pressDown:'divBorder6',pressLeft:'divBorder1',pressRight:'divBorder3',pressOk:pressOk,args:[2],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder3', pressUp:'',pressDown:'divBorder7',pressLeft:'divBorder2',pressRight:'pageUpFocus',pressOk:pressOk,args:[3],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder4', pressUp:'divBorder0',pressDown:'divBorder0',pressLeft:'divBorder3',pressRight:'divBorder5',pressOk:pressOk,args:[4],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder5', pressUp:'divBorder1',pressDown:'divBorder1',pressLeft:'divBorder4',pressRight:'divBorder6',pressOk:pressOk,args:[5],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder6', pressUp:'divBorder2',pressDown:'divBorder2',pressLeft:'divBorder5',pressRight:'divBorder7',pressOk:pressOk,args:[6],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'divBorder7', pressUp:'divBorder3',pressDown:'divBorder3',pressLeft:'divBorder6',pressRight:'pageDownFocus',pressOk:pressOk,args:[7],focusImg:['images/picfocus_04.png'],showLength:12,wholeMsg:""},
    {key:'pageUpFocus', pressUp:'pageDownFocus',pressDown:'pageDownFocus',pressLeft:'divBorder3',pressRight:'divBorder0',pressOk:pressOk,args:[],focusImg:['images/lk.png'],showLength:5,wholeMsg:""},
    {key:'pageDownFocus', pressUp:'pageUpFocus',pressDown:'pageUpFocus',pressLeft:'divBorder7',pressRight:'divBorder4',pressOk:pressOk,args:[],focusImg:['images/lk.png'],showLength:5,wholeMsg:""}
];
var picList = [
    {name:'卡梅隆·安东尼'},
    {name:'斯蒂芬·库里'},
    {name:'凯文·杜兰特（Kevin Durant）'},
    {name:"詹姆斯·哈登（James Harden）"},
    {name:"凯里·欧文（Kyrie Irving）"},
    {name:"勒布朗·詹姆斯（LeBron James）"},
    {name:"林书豪（Jeremy Lin）"},
    {name:'克里斯·保罗（Chris Paul）'},
    {name:'德怀恩·韦德（Dwyane Wade）',},
    {name:'拉塞尔·威斯布鲁克（Russell Westbrook）'},
    {name:'卡梅隆·安东尼'},
    {name:'斯蒂芬·库里'},
    {name:'凯文·杜兰特（Kevin Durant）'},
    {name:"詹姆斯·哈登（James Harden）"},
    {name:"凯里·欧文（Kyrie Irving）"},
    {name:"勒布朗·詹姆斯（LeBron James）"},
    {name:"林书豪（Jeremy Lin）"},
    {name:'克里斯·保罗（Chris Paul）'},
    {name:'德怀恩·韦德（Dwyane Wade）',},
    {name:'拉塞尔·威斯布鲁克（Russell Westbrook）'},
    {name:'卡梅隆·安东尼'},
    {name:'斯蒂芬·库里'},
    {name:'凯文·杜兰特（Kevin Durant）'},
    {name:"詹姆斯·哈登（James Harden）"},
    {name:"凯里·欧文（Kyrie Irving）"},
    {name:"勒布朗·詹姆斯（LeBron James）"},
    {name:"林书豪（Jeremy Lin）"},
    {name:'克里斯·保罗（Chris Paul）'},
    {name:'德怀恩·韦德（Dwyane Wade）',},
    {name:'拉塞尔·威斯布鲁克（Russell Westbrook）'},
]
var picPath  = [
    './players/anthony.png',
    './players/curry.png',
    './players/durant.png',
    './players/harden.png',
    './players/irving.png',
    './players/james.png',
    './players/lin.png',
    './players/paul.png',
    './players/wade.png',
    './players/westbrook.png',
    './players/anthony.png',
    './players/curry.png',
    './players/durant.png',
    './players/harden.png',
    './players/irving.png',
    './players/james.png',
    './players/lin.png',
    './players/paul.png',
    './players/wade.png',
    './players/westbrook.png',
    './players/anthony.png',
    './players/curry.png',
    './players/durant.png',
    './players/harden.png',
    './players/irving.png',
    './players/james.png',
    './players/lin.png',
    './players/paul.png',
    './players/wade.png',
    './players/westbrook.png',
]
// 默认焦点
var ACTIVE_OBJECT;
//初始页码
var PAGE_NUM=1;
//最大分页数
var PAGE_COUNT;
var PAGE_SIZE = 8
PAGE_INFO=DEFAULT_INFO.concat(PICLIST_INFO);

var scrollingObjKey = "";
initPage()


//初始化界面
function initPage() {
    $.initPage();
    initPageInfo();
    loadDataForList();
    //设置按键
    $.keyPressSettiing({
        "KEY_LEFT" : pressLeft,
        "KEY_RIGHT" : pressRight,
        "KEY_UP" : pressUp,
        "KEY_DOWN" : pressDown,
        "KEY_PAGEUP":'',
        "KEY_PAGEDOWN":''
    })
    divFocus();
    $.getTargetObj(ACTIVE_OBJECT.key);
    $.showFocusBorder();
}
//初始化焦点
function divFocus(){
    ACTIVE_OBJECT = {
        key: 'divBorder0',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: '',
        args: [],
        focusImg: [],
        wholeMsg: ""
    };
}
//合并信息
function initPageInfo(){
    PAGE_INFO =DEFAULT_INFO.concat(PICLIST_INFO);
}
//操作
function pressRight  () {
    $.getTargetObj(ACTIVE_OBJECT.pressRight)
    scroll();
    $.showFocusBorder();

}
function pressLeft () {
    if ($.startWith(ACTIVE_OBJECT.key,'pageDownFocus')) {
        for(var i=7;i>=0;i--){
            if (null != $.getElem(PICLIST_INFO[i].key.replace("divBorder","divPic"))){
                $.getTargetObj(PICLIST_INFO[i].key);
                scroll();
                $.showFocusBorder();
                return;
            }
        }
        scroll();
    };
    if ($.startWith(ACTIVE_OBJECT.key,'pageUpFocus')) {
        for(var i=3;i>=0;i--){
            if (null != $.getElem(PICLIST_INFO[i].key.replace("divBorder","divPic"))){
                $.getTargetObj(PICLIST_INFO[i].key);
                scroll();
                $.showFocusBorder();
                return;
            }
        }
        scroll();
    };
    $.getTargetObj(ACTIVE_OBJECT.pressLeft);
    if($.startWith(ACTIVE_OBJECT.key,'divPicFocus')){
        scroll();
        $.showFocusBorder();
        return;
    }
    $.showFocusBorder();
    scroll();
}
function pressUp () {
    //排行
    if($.startWith(ACTIVE_OBJECT.pressUp,'divPic')){
        var showKey = ACTIVE_OBJECT.pressUp;
        $.getTargetObj(showKey);
        scroll();

        $.showFocusBorder();
        return;
    }

    $.getTargetObj(ACTIVE_OBJECT.pressUp);
    scroll();
    $.showFocusBorder();
}
function pressDown () {
    if($.startWith(ACTIVE_OBJECT.pressDown,'divBorder')){
        if ($.getElem(ACTIVE_OBJECT.pressDown.replace('divBorder','divPic'))==null){
            return;
        }
        var showKey = ACTIVE_OBJECT.pressDown;
        $.getTargetObj(showKey);
        scroll();

        $.showFocusBorder();
        return;
    }

    $.getTargetObj(ACTIVE_OBJECT.pressDown);
    scroll();
    $.showFocusBorder();
}
function pressOk () {

    if(ACTIVE_OBJECT.key== "pageUpFocus"){
        if(PAGE_NUM > 1){
            --PAGE_NUM;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }else {
            PAGE_NUM = PAGE_COUNT;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }
    }
    if(ACTIVE_OBJECT.key == "pageDownFocus"){
        if(PAGE_NUM < PAGE_COUNT){
            ++PAGE_NUM;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }else{
            PAGE_NUM = 1;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }
    }
    loadDataForList();
}
/**
 * ----------------------------------------------字体滚动-------------------------------------------------------------*
 */
function stop(){
    //随焦点滚动
    if (scrollingObjKey != "") {
        for(var i = 0; i < PAGE_INFO.length; i++) {
            var scrollText;
            if((PAGE_INFO[i].key == scrollingObjKey) && (scrollText = UTIL.substringDoubleByte(PAGE_INFO[i].wholeMsg, PAGE_INFO[i].showLength))) {
                scrollText = UTIL.substringDoubleByte(PAGE_INFO[i].wholeMsg, PAGE_INFO[i].showLength - 1);
                if($.startWith(scrollingObjKey, "divBorder")){
                    var _divName = scrollingObjKey.replace("divBorder","divName");
                    $.getElem(_divName).innerHTML = scrollText + '...';
                    break;
                }
            }
        }
        scrollingObjKey = "";
    }

}
function start (){
    //随焦点滚动
    var wholeMsg = UTIL.substringDoubleByte(ACTIVE_OBJECT.wholeMsg, ACTIVE_OBJECT.showLength);
    if(wholeMsg) {
        if($.startWith(ACTIVE_OBJECT.key, "divBorder")){
            var _divName = ACTIVE_OBJECT.key.replace("divBorder","divName");
            UTIL.Marquee({
                el : $.getElem(_divName),
                all : ACTIVE_OBJECT.wholeMsg,
                width : '102px',
                height : '60px'
            });
        }
        scrollingObjKey = ACTIVE_OBJECT.key;
    }
}
function scroll() {
    //随焦点滚动
    if (scrollingObjKey != ACTIVE_OBJECT.key) {
        stop();
        start();
    }
}
/*
 * ------------------------------------------------获取页面显示信息---------------------------------------------------*
 * */
function loadDataForList() {
    clearTimeout(picLoadData.timer);
    var listdiv=$.getElem("divPic");
    var j = 0;
    var divs = [];
    for(var i = (PAGE_NUM-1) * 8;i < PAGE_NUM * 8;i++){
        if(picList[i]){
            var _divPic = '<div id="divPic' + j + '" class="divPic" ></div>';
            var _divPicFocus = '<div id="divPicFocus' + j + '" ></div>';
            var vodName = UTIL.textHandler(picList[i].name);
            var tempVodName = UTIL.substringDoubleByte(vodName,PICLIST_INFO[j].showLength);
            PICLIST_INFO[j].wholeMsg = vodName;
            if (tempVodName){
                vodName = UTIL.substringDoubleByte(vodName,PICLIST_INFO[j].showLength-1)+'...';
            }
            var _divName =  '<div id="divName' + j + '" class="divName" >' + vodName + '</div>';
            divs.push(_divPic+ _divPicFocus + _divName);
            j++;
        }else {
            //数据长度校验
            if (j <= 3) {
                PICLIST_INFO[8].pressLeft = "divPicFocus" + (j - 1);
                PICLIST_INFO[j-1].pressRight = "pageUpFocus";
            } else {
                PICLIST_INFO[9].pressLeft = "divPicFocus" + (j - 1);
                PICLIST_INFO[j-1].pressRight = "pageDownFocus";
            }
        }
    }
    listdiv.innerHTML = divs.join('');
    picLoadData();
    var csize=picList.length;
    PAGE_COUNT = Math.ceil(csize/PAGE_SIZE);
    $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
}
function picLoadData() {
    clearTimeout(picLoadData.timer);
    var  j = 0;
    var picServerUrl = $.getConstant("picServerUrl");
    picLoadData.timer = setTimeout(function () {
        for(var i = (PAGE_NUM-1)*8;i<PAGE_NUM *8 ;i++){
            if(picList[i]){
                var src = '<img width="105px" height="130px" src="' + picPath[i] + '"/>';
                $.getElem('divPic'+j).innerHTML = src;
                j++;
            }
        }
    },900)

}
