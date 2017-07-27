var lengthLine = 4; //每行的个数
var lengthTotal = lengthLine*2;	//总数
var page = 0;
var json = {};
var timer = null;

var PAGE_INFO = [];
var ACTIVE_OBJECT;

function initPage(){
    loadPage();
    showFoucs("divBorder0");
}

function showFoucs(key){
    $.getTargetObj(key);
    $.showFocusBorder();
}

function loadPage(){
    //根据每页内容的数量将数据分成若干页
    for(var i=0,j=0;i<data.length;i++){
        j = Math.floor(i/lengthTotal);
        json[j] || (json[j] = []);
        json[j].push(data[i].name);
    }
    createList();

};

//根据页数创建对应的标签
function createList(){
    var oList = $.getElem('list');
    var oFocus = $.getElem('focus');
    var pageLength = json[page].length;
    oList.innerHTML = '';
    oFocus.innerHTML = '';
    for(var i=0;i<pageLength;i++){
        var newList = document.createElement('div');
        newList.id = 'list' + i;
        newList.className = 'list';
        oList.appendChild(newList);
        var newFocus = document.createElement('div');
        newFocus.id = 'listfocus' + i;
        oFocus.appendChild(newFocus);
    }
    timer = setTimeout(function(){
        for(var i=0;i<pageLength;i++){
            var oList = $.getElem('list'+i);
            oList.innerHTML = json[page][i];
        }
    },200);

    createInfo();
}

//根据页数创建对应的焦点配置
function createInfo(){
    PAGE_INFO = [];
    var pageLength = json[page].length;
    var lineTotal = Math.ceil(pageLength/LINE_SIZE);

    for(var i=0;i<pageLength;i++){
        var line = Math.floor(i/LINE_SIZE);

        var iPage_INFO = {
            "key":"listfocus"+i,
            "pressUp":line===0 ? '' : ('listfocus' + (i-LINE_SIZE)),
            "pressDown":line===0 ? ( lineTotal===1?'':( pageLength-LINE_SIZE>i?('listfocus'+(i+LINE_SIZE)):('listfocus'+(pageLength-1)) ) ) : '',
            "pressLeft":i===0?"":('listfocus'+(i-1)),
            "pressRight":lineTotal===1 ? (i===pageLength-1?"prevfocus":('listfocus'+(i+1))) : (i===LINE_SIZE-1?"prevfocus":(i===pageLength-1?"nextfocus":('listfocus'+(i+1)))),
            "pressOk":"",
            "focusImg":["images/focus.png"],
            "args":[]
        };
        PAGE_INFO.push(iPage_INFO);
    }
    var PREV_INFO = {
        "key":"pageup",
        "pressUp":"",
        "pressDown":"pagedown",
        "pressLeft":lineTotal===1?('listfocus'+(pageLength-1)):(id+(LINE_SIZE-1)),
        "pressRight":"",
        "pressOk":pressOk,
        "focusImg":["images/focus.png"],
        "args":[]
    };

    var NEXT_INFO = {
        "key":"pagedown",
        "pressUp":"pageup",
        "pressDown":"",
        "pressLeft":'listfocus'+ (pageLength-1),
        "pressRight":"",
        "pressOk":pressOk,
        "focusImg":["images/focus.png"],
        "args":[]
    };

    PAGE_INFO.push(PREV_INFO);
    PAGE_INFO.push(NEXT_INFO);
}

//加载下一页
function loadNextPage(){

    if(json[page+1]){
        clearTimeout(timer);
        page++;
        createList();
    }
    showFoucs('nextfocus');
}
//加载上一页
function loadPrevPage(){

    if(page>0){
        clearTimeout(timer);
        page--;
        createList();
    }
    showFoucs('prevfocus');
}
