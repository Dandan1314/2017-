var PAGE_INFO = [] ;
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
var scrollingObjKey = "";
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
    var pageUp ={key:'pageUpFocus', pressUp:'pageDownFocus',pressDown:'pageDownFocus',pressLeft:'divBorder3',pressRight:'divBorder0',pressOk:pressOk,args:[],focusImg:['images/lk.png'],showLength:5,wholeMsg:""}
    var pageDown = {key:'pageDownFocus', pressUp:'pageUpFocus',pressDown:'pageUpFocus',pressLeft:'divBorder7',pressRight:'divBorder4',pressOk:pressOk,args:[],focusImg:['images/lk.png'],showLength:5,wholeMsg:""}
    PAGE_INFO = creatInfo('divBorder',8,['images/picfocus_04.png'],'','','','',12);
    PAGE_INFO.push(pageUp,pageDown);
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
            if (null != $.getElem(PAGE_INFO[i].key.replace("divBorder","divPic"))){
                $.getTargetObj(PAGE_INFO[i].key);
                scroll();
                $.showFocusBorder();
                return;
            }
        }
        scroll();
    };
    if ($.startWith(ACTIVE_OBJECT.key,'pageUpFocus')) {
        for(var i=3;i>=0;i--){
            if (null != $.getElem(PAGE_INFO[i].key.replace("divBorder","divPic"))){
                $.getTargetObj(PAGE_INFO[i].key);
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
            var tempVodName = UTIL.substringDoubleByte(vodName,PAGE_INFO[j].showLength);
            PAGE_INFO[j].wholeMsg = vodName;
            if (tempVodName){
                vodName = UTIL.substringDoubleByte(vodName,PAGE_INFO[j].showLength-1)+'...';
            }
            var _divName =  '<div id="divName' + j + '" class="divName" >' + vodName + '</div>';
            divs.push(_divPic+ _divPicFocus + _divName);
            j++;
        }else {
            //数据长度校验
            if (j <= 3) {
                PAGE_INFO[8].pressLeft = "divPicFocus" + (j - 1);
                PAGE_INFO[j-1].pressRight = "pageUpFocus";
            } else {
                PAGE_INFO[9].pressLeft = "divPicFocus" + (j - 1);
                PAGE_INFO[j-1].pressRight = "pageDownFocus";
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
function creatInfo(id,length,imgPath,a,b,imgPath2,pressOK,showlength,whoslemsg) {
    if(!id || !length)return;
    if(typeof pressOK ==='function'){
        pressOK = pressOK()
    }else {
        pressOK = '';
    }
    imgPath = imgPath || '';
    imgPath2 = imgPath2 || '';
    showlength = showlength || '';
    whoslemsg  =whoslemsg || '';
    var infos = [];
    var info = {}

    for(var i=0;i <length;i++ ){
        if(i === 0 || i%(PAGE_SIZE/2)%1===1){

        }
        if(i<=(PAGE_SIZE/2)-1){//判断是否是第一行
            info = {key:id+i,pressUp:'',pressDown:id+(i+PAGE_SIZE/2),pressLeft:id+(i-1),pressRight:id+(i+1),pressOK:pressOK,args:[i],focusImg:imgPath,showLength:showlength,whosleMsg:whoslemsg}
            if(i===0){//如果是第一个
                info.pressLeft = '';
            }
            if(i === PAGE_SIZE/2 -1){//判断是否是第一行的最后一个
                info.pressRight ='pageUpFocus'
            }
        }else{
            info = {key:id+i,pressUp:id+(i-PAGE_SIZE/2),pressDown:'',pressLeft:id+(i-1),pressRight:id+(i+1),pressOK:pressOK,args:[i],focusImg:imgPath,showLength:showlength,whosleMsg:whoslemsg}
            if(i === PAGE_SIZE -1){//判断是否是第二行的最后一个
                info.pressRight ='pageDonFocus';
            }
        }
        infos.push(info)
    }
    if(a){
        info = {key:a,pressUp:'',pressDown:b,pressLeft:id+(PAGE_SIZE/2-1),pressRight:'',pressOK:pressOK,args:'',focusImg:imgPath2,showLength:'',whosleMsg:''}
        infos.push(info)
    }
    if(b){
        info = {key:b,pressUp:a,pressDown:'',pressLeft:id+(PAGE_SIZE-1),pressRight:'',pressOK:pressOK,args:'',focusImg:imgPath2,showLength:'',whosleMsg:''}
        infos.push(info)
    }

    return infos;
}