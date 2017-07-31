var PAGE_INFO =[];
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
    {path:'./players/anthony.png'},
    {path:'./players/curry.png'},
    {path:'./players/durant.png'},
    {path:'./players/harden.png'},
    {path:'./players/irving.png'},
    {path:'./players/james.png'},
    {path:'./players/lin.png'},
    {path:'./players/paul.png'},
    {path:'./players/wade.png'},
    {path: './players/westbrook.png'},
    {path:'./players/anthony.png'},
    {path:'./players/curry.png'},
    {path:'./players/durant.png'},
    {path:'./players/harden.png'},
    {path:'./players/irving.png'},
    {path:'./players/james.png'},
    {path:'./players/lin.png'},
    {path:'./players/paul.png'},
    {path:'./players/wade.png'},
    {path: './players/westbrook.png'},
    {path:'./players/anthony.png'},
    {path:'./players/curry.png'},
    {path:'./players/durant.png'},
    {path:'./players/harden.png'},
    {path:'./players/irving.png'},
    {path:'./players/james.png'},
    {path:'./players/lin.png'},
    {path:'./players/paul.png'},
    {path:'./players/wade.png'},
    {path: './players/westbrook.png'}

]
var ACTIVE_OBJECT;
var LINE_SIZE = 4//每行的个数
var ROW_SIZE = 2 //行数
var PAGE_NUM = 1;//初始页码
var TOTAL_SIZE = LINE_SIZE*ROW_SIZE //总数
var json= {},json2 = {};
var page = 0;
function initPage() {
    $.initPage();
    loadPage();
    showFoucs('divBorder0');
}
function showFoucs(key){
    $.getTargetObj(key);
    $.showFocusBorder();
}
function loadPage(){
    for(var i=0,j=0;i<picList.length;i++){
        j = Math.floor(i/TOTAL_SIZE);
        json[j] || (json[j] = []);
        json2[j] || (json2[j] = []);
        json[j].push(picList[i].name);
        json2[j].push(picPath[i].path);
    }
    createList()
}
function createList() {
    clearTimeout(picLoadData.timer);
    var list = $.getElem('divPic');
    list.innerHTML = '';
    var divs = [];
    var pageLength = json2[page].length;
    for (var i = 0,j=0; i < pageLength; i++) {
        var _divPic = '<div id="divPic'+j+'" class="divPic"></div>'
        var _divPicFocus = '<div id="divPicFocus' + j + '" ></div>';
        var _divName =  '<div id="divName' + j + '" class="divName" ></div>';
        divs.push(_divPic+_divPicFocus+_divName);
        j++
    }
    list.innerHTML = divs.join('');
    var csize=picList.length;
    PAGE_COUNT = Math.ceil(csize/TOTAL_SIZE);
    $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;


    picLoadData();
    createInfo()

}
function picLoadData() {
    clearTimeout(picLoadData.timer);
    var pageLength = json2[page].length;
    var  j = 0;
    picLoadData.timer = setTimeout(function () {
        for(var i = 0;i< pageLength;i++){
                var src = '<img width="105px" height="130px" src="' + json2[PAGE_NUM-1][i] + '"/>';
                // var str = '<h2>'+json2[page][i]+'</h2>'
                $.getElem('divPic'+j).innerHTML = src;
                j++;

        }
    },900)}
function createInfo(){
    PAGE_INFO = [];
    var pageLength = json2[page].length;
    var lineTotal = Math.ceil(pageLength/LINE_SIZE);
    for(var i=0;i<pageLength;i++){
        var line = Math.floor(i/LINE_SIZE);
        var iPage_INFO = {
            "key":"divBorder"+i,
            "pressUp":line===0 ? '' : ('divBorder' + (i-LINE_SIZE)),
            "pressDown":line===0 ? ( lineTotal===1?'':( pageLength-LINE_SIZE>i?('divBorder'+(i+LINE_SIZE)):('divBorder'+(pageLength-1)) ) ) : '',
            "pressLeft":i===0?"":('divBorder'+(i-1)),
            "pressRight":lineTotal===1 ? (i===pageLength-1?"pageUpFocus":('divBorder'+(i+1))) : (i===LINE_SIZE-1?"pageUpFocus":(i===pageLength-1?"pageDownFocus":('divBorder'+(i+1)))),
            "pressOk":"",
            "focusImg":['images/picfocus_04.png'],
            "args":[i],
            "wholeMsg":json[page][i]
        };
        $.getElem('divName'+i+'').innerHTML = iPage_INFO.wholeMsg;

        PAGE_INFO.push(iPage_INFO);
    }
    var PREV_INFO = {
        "key":"pageUpFocus",
        "pressUp":"",
        "pressDown":"pageDownFocus",
        "pressLeft":lineTotal===1?('divBorder'+(pageLength-1)):('divBorder'+(LINE_SIZE-1)),
        "pressRight":"",
        "pressOk":pressOk,
        "focusImg":['images/lk.png'],
        "args":[]
    };

    var NEXT_INFO = {
        "key":"pageDownFocus",
        "pressUp":"pageUpFocus",
        "pressDown":"",
        "pressLeft":'divBorder'+ (pageLength-1),
        "pressRight":"",
        "pressOk":pressOk,
        "focusImg":['images/lk.png'],
        "args":[]
    };

    PAGE_INFO.push(PREV_INFO);
    PAGE_INFO.push(NEXT_INFO);
}
function pressOk () {
    if(ACTIVE_OBJECT.key== "pageUpFocus"){
        if(PAGE_NUM > 1){
            PAGE_NUM--;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
        }else {
            // PAGE_NUM = PAGE_COUNT;
            // $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
            return false
        }
        if(page>0){
            --page;
            createList();
        }
    }
    if(ACTIVE_OBJECT.key == "pageDownFocus"){
        if(PAGE_NUM < PAGE_COUNT){
            PAGE_NUM++;
            $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;

        }else{
            // PAGE_NUM = 1;
            // $.getElem('pagenumdiv').innerHTML= PAGE_NUM +"/"+ PAGE_COUNT;
            return false
        }
        if(json[page+1]){
            ++page;
            createList();
            if(PAGE_NUM == PAGE_COUNT){
                ACTIVE_OBJECT.pressLeft = 'divBorder'+(json2[page].length-1)
            }
        }
    }
}