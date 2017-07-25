var PAGE_INFO = [];
var PAGE_INFO_A_LIST = [
    //默认的焦点数据
    {
        key: 'f_A_list_0',
        pressUp: '',
        pressDown:'',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [0],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_1',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [1],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_2',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [2],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_3',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [3],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_4',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [4],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_5',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [5],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    },
    {
        key: 'f_A_list_6',
        pressUp: '',
        pressDown: '',
        pressLeft: '',
        pressRight: '',
        pressOk: null,
        args: [6],
        focusImg: [],
        showLength: "",
        wholeMsg: ""
    }
];
// 默认焦点
var ACTIVE_OBJECT;
var CHANNEL_LIST_DS//频道数据

function initPage() {
    var typeNames = ['长春', '吉视', '央视', '卫视', '数字', '高清', '轮播'];
//写入A LIST
    for(var i = 0; i < typeNames.length; i++){
        $.getElem('f_A_list_' + i).innerHTML = typeNames[i];
    }
    divFocus();
    getTagShowFocus(ACTIVE_OBJECT.key)
}
//初始化焦点
function divFocus(){
    ACTIVE_OBJECT = {
        key: 'f_A_list_0',
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
//展示焦点
function getTagShowFocus(key){
    $.getTargetObj(key);
    $.showFocusBorder();
}