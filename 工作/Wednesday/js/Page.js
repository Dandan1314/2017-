var RECODE_DATA_KEY = "pageName";
var PAGE_INFO =[
    {
        "key": "channelFocus1",
        "pressUp": "",
        "pressDown": "channelFocus4",
        "pressLeft": "",
        "pressRight": "channelFocus2",
        "pressOk": '',
        "args": [801],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus2",
        "pressUp": "",
        "pressDown": "channelFocus5",
        "pressLeft": "channelFocus1",
        "pressRight": "channelFocus3",
        "pressOk": '',
        "args": [802],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus3",
        "pressUp": "",
        "pressDown": "tuijianFocusBig",
        "pressLeft": "channelFocus2",
        "pressRight": "",
        "pressOk": '',
        "args": [803],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus4",
        "pressUp": "channelFocus1",
        "pressDown": "channelFocus6",
        "pressLeft": "",
        "pressRight": "channelFocus5",
        "pressOk": '',
        "args": [804],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus5",
        "pressUp": "channelFocus2",
        "pressDown": "channelFocus7",
        "pressLeft": "channelFocus4",
        "pressRight": "tuijianFocusBig",
        "pressOk": '',
        "args": [805],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus6",
        "pressUp": "channelFocus4",
        "pressDown": "tuijianFocusHuigu",
        "pressLeft": "",
        "pressRight": "channelFocus7",
        "pressOk": '',
        "args": [806],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "channelFocus7",
        "pressUp": "channelFocus5",
        "pressDown": "tuijianFocus1",
        "pressLeft": "channelFocus6",
        "pressRight": "tuijianFocusBig",
        "pressOk": '',
        "args": [807],
        "focusImg": ["images/focusA.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "tuijianFocusBig",
        "pressUp": "channelFocus3",
        "pressDown": "tuijianFocus2",
        "pressLeft": "channelFocus5",
        "pressRight": "",
        "pressOk": '',
        "args": [0],
        "focusImg": ["images/focusB.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "tuijianFocusHuigu",
        "pressUp": "channelFocus6",
        "pressDown": "",
        "pressLeft": "",
        "pressRight": "tuijianFocus1",
        "pressOk": '',
        "args": [],
        "focusImg": ["images/focusC.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "tuijianFocus1",
        "pressUp": "channelFocus7",
        "pressDown": "",
        "pressLeft": "tuijianFocusHuigu",
        "pressRight": "tuijianFocus2",
        "pressOk": '',
        "args": [1],
        "focusImg": ["images/focusC.png"],
        "showLength": 0,
        "wholeMsg": ""
    },
    {
        "key": "tuijianFocus2",
        "pressUp": "tuijianFocusBig",
        "pressDown": "",
        "pressLeft": "tuijianFocus1",
        "pressRight": "",
        "pressOk": '',
        "args": [2],
        "focusImg": ["images/focusC.png"],
        "showLength": 0,
        "wholeMsg": ""
    }
];
var ACTIVE_OBJECT;
function initPage() {
    $.initPage("HD");
    $.recodeData(RECODE_DATA_KEY, 'access');
    var key = $.getGlobalData('active_object_key');
    $.getTargetObj('channelFocus1')
    $.showFocusBorder();
}
function savePageInfo() {
    $.saveGlobalData('active_object_key',ACTIVE_OBJECT)
}
