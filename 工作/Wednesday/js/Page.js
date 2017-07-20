var RECODE_DATA_KEY = "pageName";
//数据
var PAGE_INFO =[
    {
        "key": "channelFocus1",
        "pressUp": "",
        "pressDown": "channelFocus4",
        "pressLeft": "",
        "pressRight": "channelFocus2",
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": playChannel,
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
        "pressOk": gotoTuijian,
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
        "pressOk": playVodList,
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
        "pressOk": gotoTuijian,
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
        "pressOk": gotoTuijian,
        "args": [2],
        "focusImg": ["images/focusC.png"],
        "showLength": 0,
        "wholeMsg": ""
    }
];

    //偶像养成-导读（1100002423）
    var DATA_LIST = {


    '直播1' : {contentId:'30000110000000000000000000000003',name:'直播1',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播2' : {contentId:'30000110000000000000000000000004',name:'直播2',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播3' : {contentId:'30000110000000000000000000000005',name:'直播3',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播4' : {contentId:'30000110000000000000000000000006',name:'直播4',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播5' : {contentId:'30000110000000000000000000000007',name:'直播5',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播6' : {contentId:'30000110000000000000000000000008',name:'直播6',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '直播7' : {contentId:'30000110000000000000000000000002',name:'直播7',url:'', contentType:'5',contentCharges:'','categoryId':''}
    ,


    '小图推荐1' : {contentId:'20002110000000000000000000008282',name:'小图推荐1',url:'detailPage/2000/2110/0000/0000/0000/0000/0000/JKEZgAehWkYTOWxsbdFIeavsHuULuXU8282/index.html', contentType:'4',contentCharges:'','categoryId':''}
    ,


    '小图推荐2' : {contentId:'10007110000000000000000000003757',name:'小图推荐2',url:'/tjgd/activitiesZone/superGirl/hxll/', contentType:'3',contentCharges:'','categoryId':''}

};

    //直播图（1100002425）
    var PIC_LIST = {


    '直播1' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播2' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播3' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播4' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播5' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播6' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '直播7' : {pic:'./images/liwen.jpg','url':'李玟李玟李玟李玟'}
    ,


    '大图推荐' : {pic:'./images/logo.png','url':'李玟李玟李玟李玟'}
    ,


    '小图推荐1' : {pic:'./images/wyf.jpg','url':'李玟李玟李玟李玟'}
    ,


    '小图推荐2' : {pic:'./images/wyf.jpg','url':'李玟李玟李玟李玟'}
    ,


    '赛事回顾' : {pic:'./images/wyf.jpg','url':'赛事回顾'}

};

    //赛事回顾
    DATA_SSHG_LIST_CID = "20001110000000000000000000006008";
    var DATA_SSHG_LIST = [



    {'contentName':'塑型秘籍让你过年吃不胖-告别臂臂肉','url':'detailPage/1000/1110/0000/0000/0000/0000/0026/loUTefvGCWBMhbtefFuNvwYQUFuAcxC3680.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0033/PpZeCCEsyYRfVcDBWLXsEUUTOVutsKH2340.jpg','contentId':'10001110000000000000000000263680'}
    ,

    {'contentName':'塑型秘籍让你过年吃不胖-塑造大长腿','url':'detailPage/1000/1110/0000/0000/0000/0000/0026/uLJgvUmYRoisvPHVYjTtmCpIyORcZOS3681.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0033/PpZeCCEsyYRfVcDBWLXsEUUTOVutsKH2340.jpg','contentId':'10001110000000000000000000263681'}
    ,

    {'contentName':'塑型秘籍让你过年吃不胖-练就美俏臀','url':'detailPage/1000/1110/0000/0000/0000/0000/0026/QjGAFTXoiFOtKuWUDUIaXBLARPpLYUk3682.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0033/PpZeCCEsyYRfVcDBWLXsEUUTOVutsKH2340.jpg','contentId':'10001110000000000000000000263682'}
    ,

    {'contentName':'纲到你身边-郑恺恋情问题大爆料','url':'detailPage/1000/1110/0000/0000/0000/0000/0023/VCOYZRHyXwTJtdYQFBEGHPUmAWFVeWu9350.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0027/RtYTYYlMYNouTywZkawElGsgsfBnpMG6695.jpg','contentId':'10001110000000000000000000239350'}
    ,

    {'contentName':'笑傲江湖2-“龅牙妹”搞笑全场','url':'detailPage/1000/1110/0000/0000/0000/0000/0022/BTseYVIHWWZVQCmUuSivILNOGyVsYse8149.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0025/WIbuvvjuhQkwFHBuUATgjmTSwTNtEwp9876.jpg','contentId':'10001110000000000000000000228149'}
    ,

    {'contentName':'一票难求-刘德华《解救吾先生》被勒脖','url':'detailPage/1000/1110/0000/0000/0000/0000/0022/PpZbWCEsyYRfVcDBWLXsEUUTOUrOhuE6170.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0025/UrvBOOyXfusQUjANTwJcySkGaAwFIKM6150.jpg','contentId':'10001110000000000000000000226170'}
    ,

    {'contentName':'与狗狗共舞','url':'detailPage/1000/1110/0000/0000/0000/0000/0022/FXwcDEVvTKSleoQDPujxVWmUNbVsBYd3141.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0025/nsLRvvdZVJUTrxfwtYcSdeFPBUxUPRY0193.jpg','contentId':'10001110000000000000000000223141'}
    ,

    {'contentName':'报告教练-“足球金童”欧文综艺首秀','url':'detailPage/1000/1110/0000/0000/0000/0000/0021/ryBMbmsOcyPjMkJlWwdUsneVQHxUXDk5488.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0024/uLJjUUmYRoisvPHVYjTtmCpIyOPmGWF1307.jpg','contentId':'10001110000000000000000000215488'}
    ,

    {'contentName':'我们相爱吧-刘雯泳装造型“美炸”始源','url':'detailPage/1000/1110/0000/0000/0000/0000/0019/WIbxqvjuhQkwFHBuUATgjmTSwSDBxyh9238.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0022/fcTVWWsxXnuiJaeVwPYOsKQDmDeLXVb4122.jpg','contentId':'10001110000000000000000000199238'}
    ,

    {'contentName':'世乒赛：中国女队胜波兰 男队赢巴西','url':'detailPage/1000/1110/0000/0000/0000/0000/0008/HTnfVWLPwuhyoDCXVINwLEXTryiydJO2414.html',"adId":'','contentType':'0',pic:'../../../../../../../pic/1000/4110/0000/0000/0000/0000/0007/ZKEXAAehWkYTOWxsbdFIeavsHuXvAta8584.jpg','contentId':'10001110000000000000000000082414'}

    ];

    //赛事回顾 名称
    var DATA_SSHG_LIST_NAME = {
    '20001110000000000000000000006008' : '偶像养成赛事回顾',
    '32':''

}[DATA_SSHG_LIST_CID];


var ACTIVE_OBJECT;
/*-----------------------------------------------------页面初始化----------------------------------------------------*/
function initPage() {
    $.initPage("HD");
    $.recodeData(RECODE_DATA_KEY, 'access');
    var key = $.getGlobalData('active_object_key');
    if(key){
        $.saveGlobalData('active_object_key','undefined')
    }else{
        key = 'channelFocus1'
    };
    initPic();
    $.getTargetObj(key);
    $.showFocusBorder();
}
//显示图片
function initPic(){
    var map = {
        '直播1' : 'img1',
        '直播2' : 'img2',
        '直播3' : 'img3',
        '直播4' : 'img4',
        '直播5' : 'img5',
        '直播6' : 'img6',
        '直播7' : 'img7',
        '大图推荐' : 'img8',
        '小图推荐1' : 'img9',
        '小图推荐2' : 'img10',
        '赛事回顾' : 'img11'
    };
    //直播和推荐
    for(var key in map){
        var d = PIC_LIST[key];
        var img = $.getElem(map[key]);
        img && (img.src = d.pic);
    }
    var infoMap = {
        '直播1' : 'channelInfo1',
        '直播2' : 'channelInfo2',
        '直播3' : 'channelInfo3',
        '直播4' : 'channelInfo4',
        '直播5' : 'channelInfo5',
        '直播6' : 'channelInfo6',
        '直播7' : 'channelInfo7'
    };
    //直播信息
    for(var key in infoMap){
        var d = PIC_LIST[key];
        var info = $.getElem(infoMap[key]);
        info && (info.innerHTML = d.url);
    }
}

//直播
function playChannel(num){
    // console.log(num)
    savePageInfo();
    $.playLiveOrRec(num);
}
//回顾
function playVodList() {
    var d = DATA_SSHG_LIST[0];
    var contentId = d.contentId;
    // console.log(contentId)
    savePageInfo();
    $.playVideo_chjnsh(contentId, DATA_SSHG_LIST_CID, DATA_SSHG_LIST_NAME);
}
//多种情况
function gotoTuijian(type){
    var d;
    switch(type){
        case 0 :
            d = DATA_LIST['大图推荐'];
            break;
        case 1 :
            d = DATA_LIST['小图推荐1'];
            break;
        case 2 :
            d = DATA_LIST['小图推荐2'];
            break;
    }
    if(typeof d != "undefined"){
        savePageInfo();
        switch(d.contentType){
            case "0" ://VOD
                $.playVideo(d.contentId, d.categoryId);
                break;
            case "3" ://专区
                var url = $.getConstant('baseUrl') + $.getConstant('siteName') +  (d.url || '').replace(/^\//, '');
                $.forward(url);
                break;
            case "4" ://专题
                var url = $.getConstant('baseUrl') + (d.url || '').replace(/^\//, '');
                $.forward(url);
                break;
            default:
                break;
        }
    }
}

//保存数据
function savePageInfo() {
    $.saveGlobalData('active_object_key',ACTIVE_OBJECT)
}

