/**
 *  EPG模板共通函数类
 *
 *  @author liyq
 */

 /**现网地址
    Authentication.CUSetConfig("NEW_EPG_SERVICE_ADDRESS", "http://61.181.152.137:4000/");
    Authentication.CUSetConfig("NEW_EPG_SERVICE_SITENAME", "UNCEPGHD/");
    // 站点文件夹
    var GLOBAL_SITE_NAME = "UNCEPGHD/";
    // EMS后台服务管理地址TODO
    var GLOBAL_EMS_SERVER_URL = "http://61.181.152.150:29000";
    // 砸金蛋后台服务地址TODO
    var GLOBAL_EGG_SERVER_URL = "http://61.181.152.150:30000";
    // 抽奖后台服务管理地址TODO
    var GLOBAL_LOT_SERVER_URL = "http://61.181.152.200:7000";
    // 用户系统地址 TODO
    var GLOBAL_USER_SERVER_URL = "http://61.181.152.201:19090";
    // 智能推荐服务器地址
    var GLOBAL_INTELLI_RECOMMEND_SERVER = "http://61.181.152.140:9081/";
 **/

 /**
 //准生产地址
    var GLOBAL_SITE_NAME = "tjgdhdtest/";
    // EMS后台服务管理地址TODO
    var GLOBAL_EMS_SERVER_URL = "http://61.181.152.158:9983";
    // 砸金蛋后台服务地址TODO
    var GLOBAL_EGG_SERVER_URL = "http://61.181.152.158:8080";
    // 抽奖后台服务管理地址TODO
    var GLOBAL_LOT_SERVER_URL = "http://61.181.152.196:7000";
    // 用户系统地址 TODO
    var GLOBAL_USER_SERVER_URL = "http://61.181.152.158:33200";
    // 智能推荐服务器地址
    var GLOBAL_INTELLI_RECOMMEND_SERVER = "http://61.181.152.158:8189/";
 **/


 /**测试地址**/
    var GLOBAL_SITE_NAME = "siteForTestHD/";
    // EMS后台服务管理地址TODO
    var GLOBAL_EMS_SERVER_URL = "http://61.181.152.158:9984";
    // 砸金蛋后台服务地址TODO
    var GLOBAL_EGG_SERVER_URL = "http://61.181.152.158:8080";
    // 抽奖后台服务管理地址TODO
    var GLOBAL_LOT_SERVER_URL = "http://61.181.152.196:7000";
    // 用户系统地址 TODO
    var GLOBAL_USER_SERVER_URL = "http://61.181.152.158:33200";
     // 智能推荐服务器地址
    var GLOBAL_INTELLI_RECOMMEND_SERVER = "http://61.181.152.158:8189/";
    // 全运会后台服务地址TODO
    var GLOBAL_SPORTSMEET_SERVER_URL = "http://61.181.152.158:9904/";

// 服务器前缀
var GLOBAL_PATH_PREFIX = "";

// 机顶盒名称
var GLOBAL_STB_NAME = "";

// 动态服务IP
var NODE_JS_SERVER_IP = "61.181.152.150";

// 动态服务IP
var NODE_JS_SERVER_IP_HTTP = "http://61.181.152.150";

// 动态服务IP
var NODE_JS_SERVER_IP_PORT = 3000;

// 搜索服务器地址
//var GLOBAL_MONGO_DB_URL = "http://61.181.152.150:9999/";
var GLOBAL_MONGO_DB_URL = "http://61.181.152.158:10992/";

// 双屏互动服务器地址
var GLOBAL_BINDING_SERVER_IP = "61.181.152.154";
var GLOBAL_BINDING_URL = "http://" + GLOBAL_BINDING_SERVER_IP + ":3100/";
var GLOBAL_RCTL_URL = "http://" + GLOBAL_BINDING_SERVER_IP + ":3200/";
var GLOBAL_QRCODE_URL = "http://" + GLOBAL_BINDING_SERVER_IP + ":3300/";


// 媒体类型 正片1 片花2
var GLOBAL_MEDIA_TYPE = "1";

// 媒资类型ID
var GLOBAL_MAT_ID = "1000000020";

//看吧入口分发域id
var KANBA_NODE_ID = '1100000001';
// cdn取媒体rtsp地址的服务地址
var GLOBAL_PLAY_URL = "http://192.168.17.200/playvodrtsp.php";

// 首页轮播节目跳转信息
var GLOBAL_INDEX_INFO = "http://192.168.17.200/v2l/info.php?f=2.xml";

// 是否开启远程控制
var REMOTE_CTRL = true;

// 记忆播放用参数
var PLAY_BY_HISTORY_PARAMS = {};

var SOCKET_TIMER = "";

var SOCKET_TIMER_FLAG = 0;

// 二维码服务端口
var EWM_PORT = 4000;

// 全局广告位ID
var adPositionId = "undefined";

var boKongURL = "undefined";

//专题所在栏目id
var ztCategoryId = "";

// playVideo全局变量
var GLOBAL_ContentID = "";
var GLOBAL_categoryId = "";
var GLOBAL_contentIds = [];
var GLOBAL_contentType = "";
var GLOBAL_mediaType = "";
var GLOBAL_seriesId = "";
var GLOBAL_circleFlg = "";
var GLOBAL_HISTORY_PLAY = false;
var ISINPLAYLIST = false;
var GLOBAL_groupId = '';
//双屏互动返回值
var commonMsValue;

var COMMON_MS_CATEGORY_ID = 'mobile';

// 数据收集服务地址
var dataAddIP = "61.181.152.140:9080";

var SHOWFOCUS = false;

// 营业厅分组相关参数，默认不开启
var isLobby = false;
//营业厅分组定时全屏
var windowTimeLobby;
//回看进时移是否延时处理盒子集合
var TVOD_SHIFT_TIMEOUT = ['EC6108V9A_pub_tjjlt','E910'];

var chargeArr = [
     //津彩剧场
    { id:'1100000165',data:[
          {nodeId : '1100000001',chargeSpId : 'gdprdt027'},
          {nodeId : '1100000002',chargeSpId : 'gdprdt027'}
    ]},
     //优点影院
    { id:'1100000183',data:[
          {nodeId : '1100000001',chargeSpId : 'gdprdt045'},
          {nodeId : '1100000002',chargeSpId : 'gdprdt045'}
    ]},
    //津彩影院
    { id:'1100000164',data:[
          {nodeId : '1100000001',chargeSpId : 'gdprdt018'},
          {nodeId : '1100000002',chargeSpId : 'gdprdt018'}
    ]},
    //聚好看
    { id:'1100000163',data:[
          {nodeId : '1100000001',chargeSpId : 'gdprdt039'},
          {nodeId : '1100000002',chargeSpId : 'gdprdt039'}
    ]},
    //津彩动漫
    { id:'1100000283',data:[
          {nodeId : '1100000001',chargeSpId : 'gdprdt075'},
          {nodeId : '1100000002',chargeSpId : 'gdprdt075'}
    ]}
];

/**
 * 是否测试分组
 * @author wangtao
 * @date 2016年11月22日
 * @return {boolean}
 */
var TEST_GROUP_FLAG = function () {
    var userId = Authentication.CUGetConfig("UserID"),
        testIds = ['8000000000103','100000000042','601116','601059'];
    return testIds.indexOf(userId) != -1;
}();

/**
 * 页面与业务共通函数
 */
function EpgCommon() {

    /**
     * 初始化共通函数
     */
    this.init = function() {
        //按键方式分别在中兴华为中单独实现
        //document.onkeypress = keyEvent;

        return;
    };

    /***
     *保存焦点
     */
    this.savePageInfo=function(){
    };

    /**
     * 页面初始化
     */
    this.initPage = function(flag) {
    };

    /**
     * 全局变量初始化
     */
    this.initTjIptvGolbalVar = function() {

        var initBackUrl = 'undefined';

        if ($.getRequestParams('tjiptvEpgInit') == '1') {

            initBackUrl = $.getRequestParams('initRtnUrl');
        }

        initTjGolbalVarByKey(0);

        // COMMON
        $.saveGlobalData('backUrlArray', initBackUrl);
    };

    /**
     * EPG域信息
     */
    this.epgDomain = function() {

        var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\//;

        var msg = Authentication.CUGetConfig('EPGDomain');
        msg = msg.match(reg);
        return msg;
    };

    /**
     *  按键对应
     */
    this.keymap = {
        33 : "KEY_PAGEUP",
        34 : "KEY_PAGEDOWN",
        38 : "KEY_UP",
        40 : "KEY_DOWN",
        37 : "KEY_LEFT",
        39 : "KEY_RIGHT",
        13 : "KEY_OK",
        8 : "KEY_RETURN",
        48 : "KEY_0",
        49 : "KEY_1",
        50 : "KEY_2",
        51 : "KEY_3",
        52 : "KEY_4",
        53 : "KEY_5",
        54 : "KEY_6",
        55 : "KEY_7",
        56 : "KEY_8",
        57 : "KEY_9",
        259 : "KEY_VOLUME_UP",
        260 : "KEY_VOLUME_DOWN",
        275 : "KEY_LIVE_BROADCAST",
        276 : "KEY_REVIEW",
        277 : "KEY_DIBBLING",
        278 : "KEY_INFORMATION",
        768 : "EVENT_UTILITY"
    };

    /**
     *  按键处理
     */
    this.keypressoption = null;

    /**
     * 按键处理设定
     */
    this.keyPressSettiing = function(option) {
        var name, src, copy;
        for (name in option) {

            src = this.keypressoption[name];
            copy = option[name];

            if (src === copy || typeof (copy) !== "function") {

                continue;
            } else {
                this.keypressoption[name] = copy;
            }
        }
    };

    /**
     * 播放媒体
     */
    this.playVideo = function(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg) {
    };

       /**
        * 播放直播或者回放
        */
       this.playLiveOrRec = function(channelNum, startTime, endTime) {
        };


    /**
     * 播放媒体
     */
    this.playVideoByHistory = function(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg) {

        PLAY_BY_HISTORY_PARAMS = {

            'contentID' : contentID,
            'categoryId' : categoryId,
            'contentIds' : contentIds,
            'contentType' : contentType,
            'mediaType' : mediaType,
            'seriesId' : seriesId,
            'circleFlg' : circleFlg
        };

        var userId =  $.getUserId();

        var url;

        if (seriesId == '' || seriesId == undefined) {
            url =  $.getConstant("mongoDBUrl") + 'playhistory/get/' + userId + '/' + GLOBAL_NODE + '/0/' + contentId + '/$.playVideoByHistoryCallback';
        } else {
            url = $.getConstant("mongoDBUrl") + 'playhistorySeries/get/' + userId + '/' + GLOBAL_NODE + '/0/' + seriesId + '/' + contentID + '/$.playVideoByHistoryCallback';
        }

        var JSONP;
        if (JSONP) {
            document.getElementsByTagName("head")[0].removeChild(JSONP);
        }
        JSONP = document.createElement("script");

        JSONP.type = "text/javascript";
        JSONP.src = url;

        document.getElementsByTagName("head")[0].appendChild(JSONP);

    };

    this.playVideoByHistoryCallback = function(result) {

        $.saveGlobalData('fullScreenVodStartTime', '0');

        if (result.code == 1 && result.data.startTime) {

            $.saveGlobalData('fullScreenVodStartTime', result.data.startTime);
        }

        $.playVideo(PLAY_BY_HISTORY_PARAMS.contentID,PLAY_BY_HISTORY_PARAMS.categoryId,PLAY_BY_HISTORY_PARAMS.contentIds,PLAY_BY_HISTORY_PARAMS.contentType,
            PLAY_BY_HISTORY_PARAMS.mediaType,PLAY_BY_HISTORY_PARAMS.seriesId,PLAY_BY_HISTORY_PARAMS.circleFlg);

        PLAY_BY_HISTORY_PARAMS = {};
    };

    /**
     * 取得子集id，集数
     */
    this.getHDScenesServiceUrl = function(seriesId, sceneId, categoryId, type, callBack){
    };

    /**
     * 取得子集列表
     */
    this.getScenesServiceUrl = function(seriesId, sceneId, categoryId, type, callBack){
    };

    /**
     * 跳转现网详细页
     */
    this.forwardOnlineDetail = function(contentID, category, type){
    };


    /**
     * 页面跳转（不记录本页访问历史）
     */
    this.redirect = function(url) {

        window.location.href = url;
    };

    /**
     * 页面跳转（记录本页访问历史）
     */
    this.forward = function(url) {
        $.addBackUrl();
        if(/\?/.test(url)){  // direction 用于判断是正向进入详情页重新存groupId(智能推荐分组),当反向进入详情页时不做处理
            url += '&direction=1';
        }else{
            url += '?direction=1';
        }
        window.location.href = url;
    };
    /**
     * 返回上一页（通过访问历史）
     */
    this.back = function() {

        var currentUrl = window.location.href.split("?")[0];

        //栏目ID需要传递特殊处理参数categoryId
        var params=window.location.href.split("?");
        for (var i = 0; i < params.length; i++) {

            //如果categoryId是需要保存的栏目(导读)|广告位 或者 栏目（导读）这三种格式时
            if (params[i].indexOf("categoryId" + "=") > -1 && (params[i].indexOf("|") > -1 || params[i].length==43 || params[i].length==21)) {
                currentUrl=params[0]+"?"+params[i];
                break;
            }
        }

        var backUrlArray = $.getGlobalData("backUrlArray");

        if (backUrlArray == '' || backUrlArray == undefined || backUrlArray == 'end') {

            var SD_4COLOR_INFO_URL = $.getGlobalData("SD_4COLOR_INFO_URL");
            if(SD_4COLOR_INFO_URL != undefined && SD_4COLOR_INFO_URL != null && SD_4COLOR_INFO_URL != ""
                && SD_4COLOR_INFO_URL !="undefined"){

                $.saveGlobalData("SD_4COLOR_INFO_URL","undefined");

                window.top.location.href = SD_4COLOR_INFO_URL;
				return;
            }


            window.location.href = this.backToHome();
            return;
        }

        var arrayBak = backUrlArray.split("&sp;");

        for(var i = 0; i < arrayBak.length; i++){
            if(currentUrl == arrayBak[i]){
                arrayBak.length = i;
            }
        }

        var returnUrl = arrayBak.pop();
        while(returnUrl.split("?")[0] == window.location.href.split("?")[0]){
            returnUrl = arrayBak.pop();

        }

        var key = "backUrlArray";

        if (arrayBak.length == 0) {

            $.saveGlobalData(key, "end");

            if(returnUrl == '' || returnUrl == undefined){

                returnUrl = this.backToHome();

            }

            window.location.href = returnUrl;
            return;
        }

        var value = "";

        for (var i=0; i<arrayBak.length; i++) {

            if (value == "") {

                value = arrayBak[i];
            } else {

                value = value + "&sp;" + arrayBak[i];
            }
        }

        returnUrl = returnUrl.replace(/[\?|&]direction=1/, '');

        $.saveGlobalData(key, value);
        window.location.href = returnUrl;
    };


    /**
     * 返回上一页（通过访问历史）
     */
    this.removeBack = function() {
        var backUrlArray = $.getGlobalData("backUrlArray");

        if (backUrlArray == undefined || backUrlArray == 'end') {
            return;
        }

        var arrayBak = backUrlArray.split("&sp;");
        var returnUrl = arrayBak.pop();
        if(returnUrl == window.location.href){
            var returnUrl = arrayBak.pop();
        }
        var key = "backUrlArray";

        if (arrayBak.length == 0) {

            $.saveGlobalData(key, "end");
            window.location.href = returnUrl;
            return;
        }

        var value = "";

        for (var i=0; i<arrayBak.length; i++) {

            if (value == "") {

                value = arrayBak[i];
            } else {

                value = value + "&sp;" + arrayBak[i];
            }
        }

        $.saveGlobalData(key, value);
    };

    /**
     * 用户身份确认后的userId
     */
    this.getVerifyUserId = function() {

        //return Authentication.CUGetConfig("verifyUserID");
        return $.getGlobalData("verifyUserID");
    };

    /**
     * 鉴权
     */
    this.getUserId = function() {

        return Authentication.CUGetConfig("UserID");
    };

    /**
     * 鉴权
     */
    this.authentication = function(contentId, productId, successUrl, failUrl) {
    };

    /**
     * 订购
     */
    this.order = function(returnUrl) {
    };

    /**
     * USERTOKEN重定向
     */
    this.userTokenRedirect = function() {
    };

    /**
     * USERTOKEN更新
     */
    this.userTokenUpdate = function(returnUrl) {
    };

    /**
     * 通过ID获取页面控件
     */
    this.getElem = function(id) {

        return document.getElementById(id);
    };

    /**
     * 显示焦点
     */
    this.showFocusBorder = function() {
    };

    /**
     *  更新当前焦点所在的控件信息
     */
    this.getTargetObj = function(targetId) {

        for (var i = 0; i < PAGE_INFO.length; i++) {
            if (PAGE_INFO[i].key == targetId) {
                ACTIVE_OBJECT = PAGE_INFO[i];

                return false;
            }
        }
    };

    /**
     * 通过键值获取控件控制信息
     */
    this.getTargetObjByKey = function(value) {

        var name;
        for (var i = 0; i < PAGE_INFO.length; i++) {
            if (PAGE_INFO[i].key == value) {

                return PAGE_INFO[i];
            }
        }
    };

    this.getSearchActor = function(actor, columnid, RETURN_URL) {
        return "";
    };

    this.getSearchDirector = function(director, columnid, RETURN_URL) {
        return "";
    };

    /**
     * 按下OK时处理逻辑
     */
    this.pressOkActive = function(categoryId) {

        var target = ACTIVE_OBJECT.pressOk;

        if (target && typeof (target) === 'string') {

			//根据专题页参数，判断当前逻辑为专题页跳转详情页，此时进行特殊传参处理
			if(contentUrl != undefined && FOCUS_BACKUP != undefined && (contentUrl[FOCUS_BACKUP].type == '0' || contentUrl[FOCUS_BACKUP].type == '2' || contentUrl[FOCUS_BACKUP].type == '7')){
				target = $.getConstant('baseUrl') + $.getConstant('siteName') +"detailPageHD/index.html?categoryId="+ subjectId +"&hidVodId="+ contentUrl[FOCUS_BACKUP].id;
				
			}else if(categoryId!=undefined) {
                target = target + "?categoryId=" + categoryId;
            }

            this.forward(target);
        } else if ( typeof (target) === 'function') {

            var args = ACTIVE_OBJECT.args;

            if (args.length === 0) {

                target();
            } else {

                target.apply(null, args);
            }
        }
    };

    this.channelNum = '';
    this.channelSwitchTimer = 0;
    this.channelMap = null;

    /**
     * 按下数字键
     */
    this.pressNum = function() {
    };

    /**
     * 调用小窗口播放
     */
    this.callSizePlay = function() {
    };

    /**
     * 调用小窗口直播
     */
    this.callSizeLivePlay = function() {
    };

    /**
     * 调整小窗口大小
     */
    this.changeWindowSize = function() {
    };

    /**
     * 获取播放时间
     */
    this.getCurrentPlayTime = function() {
    };

    this.socketOrder = function(mobileId, msg){
        var error = true;
        for(orderPefix  in this.remoteCtrl){
            if($.startWith(msg,orderPefix) && this.remoteCtrl[orderPefix]!=undefined && typeof(this.remoteCtrl[orderPefix]) == "function"){
                error = false;
                this.remoteCtrl[orderPefix](mobileId, msg);
            }
        }
        if(error){
            window.parent.orderOk(mobileId, false);
        }
    };

    /*
     * 刷新命名不需要检查，也无法检查手机号
     */
    this.isOrderNeedAuth = function(msg) {
        return !$.startWith(msg, 'REFRESH');
    };

    this.isGdid = function(id) {
        return (/1\d{31}/).test(id);
    };

    this.playVideoFromMobile = function(mobileId, value) {
        // window.parent.workStart();
        $.savePageInfo();
         // 当前地址
        var currentUrl = window.location.href;

        //双屏二级列表保存焦点

        //在播控页跳转双屏
        if(currentUrl.indexOf("FullScreenVod_HD.html")>0){

        } else if(currentUrl.indexOf("kanbaIndex")>0){
            $.saveGlobalData("GlobalListPosition", $.listMenu.getSubPosition());
        }else if(currentUrl.indexOf("VIP")>0){
            $.saveGlobalData("GlobalListImgPosition", $.listImgMenu.getSubPosition());
        }
        var videoInfo = value.split('@');
        commonMsValue = videoInfo;
        //剧集 ：剧头id
        var id = videoInfo[1];

        var startTime = 0;

        if (videoInfo.length == 4) {
            //剧集 ：子集id
            var contentId = videoInfo[2];
            startTime = videoInfo[3];

            $.saveGlobalData("fullScreenVodStartTime",startTime);

            // 返回给手机
            window.parent.orderOk(mobileId, true);

            $.playVideo(contentId, COMMON_MS_CATEGORY_ID, -1, $.isGdid(contentId) ? 'VOD' : 'LANVOD', '1', commonMsValue[1], 1);

            return;

        } else {

            startTime = videoInfo[2];

            $.saveGlobalData("fullScreenVodStartTime",startTime);

        }

        // 返回给手机
        window.parent.orderOk(mobileId, true);

        $.playVideo(id, COMMON_MS_CATEGORY_ID, '', $.isGdid(id) ? 'VOD' : 'LANVOD');
    };

    this.pushTvodToTv = function(mobileId, value){
        // window.parent.workStart();
        $.savePageInfo();

         // 当前地址
        var currentUrl = window.location.href;
        //在播控页跳转双屏
        if(currentUrl.indexOf("kanbaIndex")>0){
            $.saveGlobalData("GlobalListPosition", $.listMenu.getSubPosition());
        }else if(currentUrl.indexOf("VIP")>0){
            $.saveGlobalData("GlobalListImgPosition", $.listImgMenu.getSubPosition());
        }
        var videoInfo = value.split('@');
        if (videoInfo.length == 4) {
            var channelNum = videoInfo[1];
            var startTime = videoInfo[2];
            var endTime = videoInfo[3];

            // 返回给手机
            window.parent.orderOk(mobileId, true);
            $.playLiveOrRec(channelNum,startTime,endTime);

        }else{
            window.parent.orderOk(mobileId, false);
            return;
        }
    };

    this.remoteCtrl = {
        "KEY": function(mobileId, value){
            var channelInfo = value.split('_');
            if(channelInfo.length == 2){

                // 返回给手机
                $.savePageInfo();
                // 当前地址
                var currentUrl = window.location.href;
                //在播控页跳转双屏
                if(currentUrl.indexOf("kanbaIndex") > 0 && $.listMenu.getSubPosition()!=undefined) {
                    $.saveGlobalData("GlobalListPosition", $.listMenu.getSubPosition());
                } else if(currentUrl.indexOf("VIP") > 0 && $.listImgMenu.getSubPosition()!=undefined) {
                    $.saveGlobalData("GlobalListImgPosition", $.listImgMenu.getSubPosition());
                }

                window.parent.orderOk(mobileId, true);
                __common_ms_join_channel_num__(channelInfo[1]);

            }else{
                window.parent.orderOk(mobileId, false);
            }
        },
        "PUSH_TO_TV" : this.playVideoFromMobile,
        "CTRL":function(mobileId, msg) {
            var arr = msg.split("@");
            if(arr.length == 2){
                var val = msg.split("@")[1];

                keyEvent(val);

                // 返回给手机
                window.parent.orderOk(mobileId, true);
            }else{
                // 返回给手机
                window.parent.orderOk(mobileId, false);
            }
        },
        "PULL_FROM_TV":function(mobileId, msg){
            pullFromTV(mobileId, msg);
        },
        "PUSH_TVOD_TO_TV":this.pushTvodToTv,
        "REFRESH": function(mobileId, msg) {
            if (typeof onRemoteRefresh === 'function') {
                onRemoteRefresh();
            }
        }
    };

    this.getBindId = function(userId) {
        return GLOBAL_AREA + GLOBAL_CP + GLOBAL_NODE + '_' + userId;
    };

    this.shouldReturnHome = function (url){

        return $.stringContains(url, ["FullScreenTvod_HD.html",
                                "FullScreenVod_HD.html",
                                "/wqxy/",
                                "/noauth/",
                                "/zhiboPackage/",
                                "buy-failed-rainBow",
                                "buy-success-rainBow",
                                "buy-success",
                                "buy-failed",
                                "channel-buy-failed",
                                "channel-buy-success"
                                ]);

    };
    this.getBackTarget = function(){//获得上一个页面的地址

        var backUrlArray = $.getGlobalData("backUrlArray");
        if (backUrlArray == undefined || backUrlArray == 'end') {
             return "";
        }
        var arrayBak = backUrlArray.split("&sp;");
        var returnUrl = arrayBak.slice(arrayBak.length-1)[0];
        return returnUrl;

    };

    this.backToHome = function(){

            if(GLOBAL_NODE == "zte"){
                return $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/portal_default.jsp";//适配添加双屏后由四色键返回焦点不能移动问题

            }else if(GLOBAL_NODE == "huawei"){

                //var url = $.epgDomain() + GLOBAL_PREFIX+ "en/";
                // if($.isHotelMode()){
                //     url += "category_Index_epg_hotel_page.html"; // 酒店版首页
                // } else {
                //     url += "category_Index_epg_smooth_page.html";
                // }
                var url = $.epgDomain() + GLOBAL_PREFIX+ "en/category_Index_epg_smooth_page.html";
                return url;

            }

    }
}

function __common_ms_join_channel_num__(num){
    // window.parent.workStart();
    $.channelNum = num;
    showChannelNum();

    if (window.location.href.indexOf('FullScreenChannel_HD.html') > 0 && typeof joinChannel == 'function') {
        joinChannel(num);
    } else {
        channelSwitch(COMMON_MS_CATEGORY_ID);
    }
}

/**
 * 根据id后缀取得散列路径
 *
 * @param id    id
 * @return suffix   文件后缀
 */
function getFTPFilePath(id, suffix) {

    var folders = [];
    var result = "";

    // 遍历id，每4位截取成一个文件夹
    for (var i=id.length;i>0;i=i-4) {
        folders.push(id.substring(((i>4)? (i-4): 0), i));
    }

    // 生成混淆后文件名
    var confused = confuseWord(id);

    // 拼接文件路径
    for (var i=folders.length - 1;i>0; i--) {
        result+=(folders[i]+"/");
    }

    // 拼接文件名
    result=result + confused + folders[0] + "." + suffix;

    return result;
}

/**
 * 混淆文件名称
 *
 * @param word    参数
 * @return 混淆结果
 */
function confuseWord(word) {

    var confusedWord = "";
    var weigth = 1;

    // 计算文件ID的权值，大于7位的ID截取后7位
    for (var i=(word.length - 7 <=0)?0 : word.length - 8 ;i<word.length;i++) {

        // 权值计算方法： 取后7位没位字符的ASCII码除9余数相乘
        weigth = weigth * (numToASC(word.charAt(i)) %9 + 1);
    }

    // 遍历ID，生成混淆后id
    for (var i=1;i<word.length; i++) {

        // 使用id权值生成字符权值并生成混淆字符
        confusedWord+=getChangeChar(word.charAt(i),(numToASC(word.charAt(i-1))%9 + i)*weigth*i);
    }

    return confusedWord;
}

/**
 * 取得混淆后字符
 *
 * @param c
 * @param i
 * @return
 */
function getChangeChar(c, i) {

    // 用字符的ASCII码加上字符权值生成目标ASCII
    var changedAscii = numToASC(c) + i;

    // 目标ASCII除122取余
    changedAscii = changedAscii%122;

    // 目标ASCII小于65:时（a之前）
    if (changedAscii < 65) {

        // 目标ASCII自增65
        changedAscii = changedAscii + 65;
    }

    // 目标ASCII大于122:时（Z之后）
    if (changedAscii > 122) {

        changedAscii = 122 - changedAscii%122;
    }

    if ((changedAscii >90 && changedAscii <97)) {

        if (i%2 == 0) {

            changedAscii = 90-changedAscii%90;
        } else {

            changedAscii = 97 + changedAscii%90;
        }
    }

    return ASCToAlpha(changedAscii);
}
function numToASC(num) {
    return parseInt(num, 10) + 48;
}

function ASCToAlpha(asc) {
    return {
        65 : 'A',
        66 : 'B',
        67 : 'C',
        68 : 'D',
        69 : 'E',
        70 : 'F',
        71 : 'G',
        72 : 'H',
        73 : 'I',
        74 : 'J',
        75 : 'K',
        76 : 'L',
        77 : 'M',
        78 : 'N',
        79 : 'O',
        80 : 'P',
        81 : 'Q',
        82 : 'R',
        83 : 'S',
        84 : 'T',
        85 : 'U',
        86 : 'V',
        87 : 'W',
        88 : 'X',
        89 : 'Y',
        90 : 'Z',
        97 : 'a',
        98 : 'b',
        99 : 'c',
        100 : 'd',
        101 : 'e',
        102 : 'f',
        103 : 'g',
        104 : 'h',
        105 : 'i',
        106 : 'j',
        107 : 'k',
        108 : 'l',
        109 : 'm',
        110 : 'n',
        111 : 'o',
        112 : 'p',
        113 : 'q',
        114 : 'r',
        115 : 's',
        116 : 't',
        117 : 'u',
        118 : 'v',
        119 : 'w',
        120 : 'x',
        121 : 'y',
        122 : 'z'
    }[asc];
}

/**
 * 广告位设置
 */
function setAdPositionId(arg){

    if(adPositionId == "undefined"){
        if(arg == "") {
            adPositionId = "undefined";
        }else{
            adPositionId = arg;
        }
    }
}

/**
 * 解析广告位
 */
function analyseAdPosition() {
    var adPath = $.getConstant('serverUrl') + "dataSource/ADPContent/" + getFTPFilePath(adPositionId,"js");

    jsonpRequestToolAddJs(adPath);
}

/**
 * 广告位js 回调函数实现
 */
function getAdArray(){
    // ZTE解析unshift不正常，需要添加该CHECK
    if (GLOBAL_contentIds.length == 0 || (GLOBAL_contentIds.length > 0 && GLOBAL_contentIds[0] != GLOBAL_ContentID)) {

        GLOBAL_contentIds.unshift(GLOBAL_ContentID);
    }

   // var contentIdsMixAdIds = GLOBAL_contentIds;

    var contentIdsMixAdIds = [];

        for (var i = 0; i < GLOBAL_contentIds.length; i++) {

            if(i != 0){
                contentIdsMixAdIds.push("AD" + adArray[Math.floor(Math.random()*(adArray.length))]);
            }
            contentIdsMixAdIds.push(GLOBAL_contentIds[i]);
        }
     adPositionId = "undefined";

    if (GLOBAL_seriesId != undefined && GLOBAL_seriesId != ""){ //剧集
	$.saveGlobalData("GLOBAL_ContentID",GLOBAL_ContentID);
        $.saveGlobalData("tjIptvPlayAdPosition",adArray);
        $.saveGlobalData("GLOBAL_categoryId",GLOBAL_categoryId);
        $.saveGlobalData("GLOBAL_contentType",GLOBAL_contentType);
        $.saveGlobalData("GLOBAL_mediaType",GLOBAL_mediaType);
        $.saveGlobalData("GLOBAL_seriesId",GLOBAL_seriesId);
        $.saveGlobalData("GLOBAL_circleFlg",GLOBAL_circleFlg);
        //if(GLOBAL_HISTORY_PLAY){ // 记忆播放
        //    playVideoEntity(GLOBAL_ContentID, GLOBAL_categoryId,$.getGlobalData("sceneNum"), contentIdsMixAdIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg);
        //}else{
            playVideoEntity("AD" + adArray[Math.floor(Math.random()*(adArray.length))], GLOBAL_categoryId,$.getGlobalData("sceneNum"), contentIdsMixAdIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg,GLOBAL_groupId);
        //}

      }else{ //VOD
        $.saveGlobalData("GLOBAL_ContentID",GLOBAL_ContentID); // 贴片返回详情页用
        $.saveGlobalData("GLOBAL_categoryId",GLOBAL_categoryId);
        playVideoEntity("AD" + adArray[Math.floor(Math.random()*(adArray.length))], GLOBAL_categoryId,$.getGlobalData("sceneNum"), contentIdsMixAdIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg,GLOBAL_groupId);
    }
}

/**
 * 工具类共通函数
 */
function EpgToolCommon() {
	//高标清判断
	this.checkStbVersion = function(){
		// 中兴（1：标清，2：高清）
		if(GLOBAL_NODE == "zte"){
			var frameNumber = $.getGlobalData("frameNumber");
			if(contains(frameNumber,'1076') ||contains(frameNumber,'1074') || contains(frameNumber,'843')){
				return 1;
			}
			if(contains(frameNumber,'1077') ||contains(frameNumber,'1075') || contains(frameNumber,'1030') || contains(frameNumber,'1083')){
				return 2;
			}
			
		//华为（1：标清，2：高清，3：OTT，4：OTT高清，6：酒店版）
		}else if(GLOBAL_NODE == "huawei"){
			var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
			
			var versionHW = "1";
			
			if (contains(epgDomainUrl,"defaultgdgq")) {
				
				versionHW = "2";
			}
			if (contains(epgDomainUrl,"defaulttjott")) {
				
				versionHW = "3";
			}
			
			if (contains(epgDomainUrl,"defaulttjotthd")) {
				
				versionHW = "4";
			}
            // if($.isHotelMode()) {
            //
            //     versionHW = "6";
            // }
			return versionHW;
		}
		return "1";
	};
	
	//匹配特殊URL中的参数（如SP地址）
	this.matchParams = function(url){
		var platformFlag = "";
		var stbid = "";
		var UserID = "";
		
		//检查盒子高标清
		var stbVersion = $.checkStbVersion();
		
		//中兴（1：标清，2：高清）
		if(GLOBAL_NODE == "zte"){
			stbid = top.jsGetControl("StbId");
			UserID = top.jsGetControl("UserID");
			
			if(stbVersion == "1"){
				platformFlag = "zte_sd";
			}else{
				platformFlag = "zte_hd";
			}
		
		//华为（1：标清，2：高清，3：OTT，4：OTT高清）
		}else if(GLOBAL_NODE == "huawei"){
			stbid = Authentication.CUGetConfig("STBID");
			UserID = Authentication.CUGetConfig("UserID");
			
			if(stbVersion == "1"){
				platformFlag = "huawei_sd";
			}else{
				platformFlag = "huawei_hd";
			}
		}
		//处理中兴高清的“应用”模块地址，使用parent.location.href(此时首页可能为portal或portal?color=...),跳页时去除color参数,否则会出现返回为四色键页;注:使用parent.location.href是防止返回后双屏功能失效
		var useTopFrame = false;
		var doTopUrl = parent.location.href.split("?color")[0];
		var sp = url.split("#");
		if(GLOBAL_NODE == "zte" && stbVersion == "2" && (sp[1] == 'YINGYONG' || sp[1] == 'KTV' || sp[1] == 'YOUXI' || sp[1] == 'LEYUAN')){
			useTopFrame = true;
		}
		if(sp[1] == 'YINGYONG' || sp[1] == 'KTV' || sp[1] == 'YOUXI' || sp[1] == 'LEYUAN'){
			url = sp[0];
		}
		
		var obj = {
			"{platformFlag}": platformFlag,//盒子型号区分标识
			"{stbid}": stbid,//机顶盒ID
			"{UserID}": UserID,//用户ID
			"{ReturnURL}": useTopFrame ? doTopUrl : window.location.href,//当前页地址
			"{userId}": UserID,//用户ID-联通页跳转使用
			"{LoginID}": UserID,//用户ID-联通页跳转使用
			"{ReturnUrl}": useTopFrame ? doTopUrl : window.location.href,//当前页地址-联通页跳转使用
			"{endUrl}": useTopFrame ? doTopUrl : window.location.href//当前页地址-联通页跳转使用
		};
		for(var key in obj){
			url = url.replace(key,obj[key]);
		}
		return url;
	};
	
    this.startWith = function(t, s) {

        if (s == null || s == "" || t.length == 0 || s.length > t.length)
            return false;
        if (t.substr(0, s.length) == s)
            return true;
        else
            return false;
        return true;
    };
    this.endWith = function(t, s) {
        if (s == null || s == "" || t.length == 0 || s.length > t.length)
            return false;
        var reg = new RegExp(s + "$");
        return reg.test(t);
    };
    this.trim = function(t) {
        return t.replace(/(^\s*)|(\s*$)/g, '');
    };
    this.isEmpty = function(s) {
        return ((s == undefined) || (s == "") || (s == null) || (s.length == 0));
    };
    this.getRequestParams = function(key,url) {
        if(typeof url === 'undefined'){
            var str = window.location.href;
        }else{
            var str = url;
        }

        var value = "";
        if(key == "initRtnUrl"){
            var index = str.indexOf("initRtnUrl");
            str = str.substring(index, str.length);
            value = str.replace("initRtnUrl=","");
            return value;
        }

        var uri = str.split("?");

        if(uri.length < 2){
            return value;
        }

        var params = uri[1].split("&");

        for (var i = 0; i < params.length; i++) {

            if (params[i].indexOf(key + "=") > -1) {
                value = params[i].toString().replace(key + "=", "");
            }
        }
        return value;
    };

    this.getConstant = function(key) {

        var url = window.location.href;
        var strRegex = "^((?:https|http|ftp|rtsp|mms)?://(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*/)pub/([A-Za-z1-9_-]+/)([A-Za-z1-9_-]+/).*$";
        var reg = new RegExp(strRegex);
        reg.exec(url.split("?")[0]);
        GLOBAL_PATH_PREFIX = RegExp.$1;
        GLOBAL_STB_NAME = RegExp.$2;
        siteName = RegExp.$3;

        if(url.indexOf("jsp")> -1){//华为首页jsp跳转路径截取
            GLOBAL_PATH_PREFIX = Authentication.CUGetConfig("NEW_EPG_SERVICE_ADDRESS");
            GLOBAL_SITE_NAME = Authentication.CUGetConfig("NEW_EPG_SERVICE_SITENAME");
            GLOBAL_STB_NAME = Authentication.CUGetConfig("NEW_EPG_SERVICE_STBNAME");
			this.saveGlobalData("GLOBAL_SITE_NAME", GLOBAL_SITE_NAME);
			this.saveGlobalData("GLOBAL_STB_NAME", GLOBAL_STB_NAME);

        }else if (siteName == 'resources/' || siteName == 'detailPage/' || siteName=='playControl-hw-hd/' || siteName=='playControl-zte-hd/' || siteName=='js/'|| siteName=='playControl-hw-hd-new/' || siteName=='playControl-zte-hd-new/' || this.dirInPlayControl()){
            if (this.getGlobalData('GLOBAL_SITE_NAME') != undefined && this.getGlobalData('GLOBAL_SITE_NAME') != 'undefined' && this.getGlobalData('GLOBAL_SITE_NAME') != '') {


                GLOBAL_SITE_NAME = this.getGlobalData('GLOBAL_SITE_NAME');
                GLOBAL_STB_NAME = this.getGlobalData('GLOBAL_STB_NAME');
            }

        }else {

            this.saveGlobalData("GLOBAL_SITE_NAME", siteName);
            this.saveGlobalData("GLOBAL_STB_NAME", GLOBAL_STB_NAME);
            GLOBAL_SITE_NAME = siteName;
        }
        var map = {
            "serverUrl" : GLOBAL_PATH_PREFIX + "pub/",
            "stbFolder" : GLOBAL_STB_NAME,
            "siteName" : GLOBAL_SITE_NAME,
            "baseUrl" : GLOBAL_PATH_PREFIX + "pub/" + GLOBAL_STB_NAME,
            "playCtrlUrl" : GLOBAL_PATH_PREFIX + "pub/" + GLOBAL_STB_NAME + "vodPlayController/index.html",
            "playListCtrlUrl" : GLOBAL_PATH_PREFIX + "pub/" + GLOBAL_STB_NAME + "vodPlayListController/index.html",
            "mongoDBUrl" : GLOBAL_MONGO_DB_URL,
            "mediaType" : GLOBAL_MEDIA_TYPE,
            "mediaMatId" : GLOBAL_MAT_ID,
            "node" : GLOBAL_NODE,
            "mediaPlayer" : GLOBAL_PLAY_URL,
            "picServerUrl" : GLOBAL_PATH_PREFIX + "pic/",
            "qrCodeImageServerUrl": GLOBAL_QRCODE_URL + "pic/"
        };

        if(this.getGlobalData('GLOBAL_NODE') == undefined || this.getGlobalData('GLOBAL_NODE') == 'undefined' || this.getGlobalData('GLOBAL_NODE') == '') {

            this.saveGlobalData("GLOBAL_NODE", GLOBAL_NODE);
        }

        return map[key];

    };

    this.saveGlobalData = function(key, value) {
    };
    this.getGlobalData = function(key) {
    };
    this.msgEllipsis = function() {

        var scrollingObjKey = "";

        return {
            scroll:function(){
                if(scrollingObjKey != ACTIVE_OBJECT.key){
                    this.stop();
                    this.start();
                }
            },
            start:function(){
                if (ACTIVE_OBJECT.showLength != undefined && ACTIVE_OBJECT.showLength != '') {

                    if($.getTextShowLength(ACTIVE_OBJECT.wholeMsg) > ACTIVE_OBJECT.showLength){

                        var width = $.getElem(ACTIVE_OBJECT.key).style.width - 10;
                        var height = $.getElem(ACTIVE_OBJECT.key).style.height;

                        var scrollHtml = "<marquee width='" + width +"' height='" + height + "' scrollamount='4'>"+ACTIVE_OBJECT.wholeMsg+"</marquee>";
                        $.getElem(ACTIVE_OBJECT.key).innerHTML = scrollHtml;
                        scrollingObjKey = ACTIVE_OBJECT.key;
                    }
                }
            },
            stop:function(){

                if (scrollingObjKey != "") {

                    for(var i=0;i<PAGE_INFO.length;i++){
                      if((PAGE_INFO[i].key == scrollingObjKey) && ($.getTextShowLength(PAGE_INFO[i].wholeMsg) > PAGE_INFO[i].showLength)){
                          $.getElem(scrollingObjKey).innerHTML = PAGE_INFO[i].wholeMsg.substring(0,PAGE_INFO[i].showLength) + "..";
                      }
                    }
                    scrollingObjKey = "";
                }
            }
        };
    }();
    this.getTextShowLength = function(text) {

        var chinese = new RegExp("[\u0391-\uFFE5]");
        var strLength = 0;
        for(var i = 0; i < text.length; i++) {

            var temp = text.substring(i, i + 1);

            if(chinese.test(temp)) {
                strLength += 1;
            } else {
                /*
                 * 其他字符长度占1个
                 */
                strLength += 0.5;
            }
        }
        return strLength;
    };
    this.addBackUrl = function(url) {
        var currentUrl = url || window.location.href,
            wholeUrl = currentUrl,
            params = currentUrl.split('?'),
            backUrlArray = $.getGlobalData('backUrlArray');

        //栏目ID需要传递特殊处理参数categoryId
        for (var i = 0; i < params.length; i++) {
            //如果categoryId是需要保存的栏目(导读)|广告位 或者 栏目（导读）这三种格式时
            if (params[i].indexOf('categoryId=') > -1 && (params[i].indexOf('|') > -1 || params[i].length == 43 || params[i].length == 21)) {
                currentUrl = params[0] + '?' + params[i];
                break;
            }
        }

        if (this.getRequestParams('ztCategoryId', wholeUrl)) { //传入有专题所在的栏目id
            //currentUrl = currentUrl+'-ztCategoryId='+this.getRequestParams('ztCategoryId',wholeUrl);
            currentUrl = wholeUrl;
        } else if (this.getBackTarget().indexOf('ztCategoryId') > -1) { //上一个页面有专题所在的栏目id
            var index = currentUrl.indexOf("direction=1");
            if(index >=0) currentUrl = currentUrl.substr(0,index-1);
            if(/\?/.test(currentUrl)){
                currentUrl += '&ztCategoryId=' + this.getRequestParams('ztCategoryId', this.getBackTarget());
            }else{
                currentUrl +='?ztCategoryId=' + this.getRequestParams('ztCategoryId', this.getBackTarget());
            }
        } else if (currentUrl.indexOf("categoryId=")>=0 && currentUrl.indexOf("hidVodId=")>=0){
            currentUrl = wholeUrl;
        }

        if (typeof backUrlArray == 'undefined' || backUrlArray == null || backUrlArray == '') {
            backUrlArray = currentUrl;
        } else {
            backUrlArray = backUrlArray + '&sp;' + currentUrl;
        }

        $.saveGlobalData('backUrlArray', backUrlArray);
    };
    this.recodeData = function(referpage,analysistype) {

    };
    this.checkRemoteJS = "";
    this.addDateTimeWeekDiv = function() {
		var rootElement = document.body;

		var newElement = document.createElement("div");
		newElement.id = "divTopTime";
        newElement.style.position = "absolute";
        newElement.style.left = "1070px";
        newElement.style.top = "38px";
        newElement.style.width = "96px";
        newElement.style.height = "32px";
		newElement.style.color = "white";
		newElement.style.fontSize = "30px";
        newElement.style.lineHeight = "32px";
        newElement.style.textAlign = "center";
        newElement.style.fontFamily = "微软雅黑";
        var newElementHtmlContent = document.createTextNode("");
        newElement.appendChild(newElementHtmlContent);
        rootElement.appendChild(newElement);

		newElement = document.createElement("div");
		newElement.id = "divTopDate";
        newElement.style.position = "absolute";
        newElement.style.left = "1166px";
        newElement.style.top = "45px";
        newElement.style.width = "70px";
        newElement.style.height = "20px";
        newElement.style.color = "white";
        newElement.style.fontSize = "18px";
        newElement.style.lineHeight = "20px";
        newElement.style.textAlign = "center";
        newElement.style.fontFamily = "微软雅黑";
		newElementHtmlContent = document.createTextNode("");
		newElement.appendChild(newElementHtmlContent);
		rootElement.appendChild(newElement);

		 // 页面初始化完成后执行一次
		 this.setDateTimeWeek();

		 // 设置每秒定时执行一次
		 setInterval(this.setDateTimeWeek,1000);
	};
	this.setDateTimeWeek = function(){
		var now = new Date();
        var week = now.getDay();
        var hh = now.getHours();
        var mm = now.getMinutes();
        // 当前时间字符串
        var currentTime = "";

        if(hh < 10)
            currentTime += "0";
        currentTime += hh + ":";

        if (mm < 10)
            currentTime += '0';
        currentTime += mm;

        // 判断是星期几
        var currentWeek = "";

        if (week == 0) {
            currentWeek = "星期日";
        } else if (week == 1) {
            currentWeek = "星期一";
        } else if (week == 2) {
            currentWeek = "星期二";
        } else if (week == 3) {
            currentWeek = "星期三";
        } else if (week == 4) {
            currentWeek = "星期四";
        } else if (week == 5) {
            currentWeek = "星期五";
        } else if (week == 6) {
            currentWeek = "星期六";
        }
        $.getElem("divTopTime").innerHTML = currentTime;
		$.getElem("divTopDate").innerHTML = currentWeek;
	};
    this.addLikeCount = function(vodId,callBack) {
        var url = GLOBAL_MONGO_DB_URL + "search/updateLikeCount/vodId/" + vodId + "/addLikeCountHandler";
        jsonpRequestToolAddJs(url);

    };
    this.getLikeCount = function(vodId,callBack) {
        var url = GLOBAL_MONGO_DB_URL + "search/vodInfo/vodId/" + vodId + "/getLikeCountHandler";
        jsonpRequestToolAddJs(url);
    };

    this.checkChargeSpId = function(id, node) {
        for(var i = 0; i < chargeArr.length; i++) {
            if(chargeArr[i].id == id) {
                for( j = 0; j < chargeArr[i].data.length; j++) {
                    if(chargeArr[i].data[j].nodeId == node) {
                        return chargeArr[i].data[j].chargeSpId;
                    }
                }
            }
        }
        return '';
    };


    this.stringContains = function(str, arr){
        for (var i = 0; i < arr.length; i++){

            if (str.indexOf(arr[i]) > -1){
                return true;
            }
        }
        return false;
    };

    this.jsonpRequestTool = function() {
        var JSONP_REQUEST_FOR_USER_INFO = [];
        return function(url, clearCache) {
            var node;
            if (JSONP_REQUEST_FOR_USER_INFO.length > 10) {
                document.getElementsByTagName('head')[0].removeChild(JSONP_REQUEST_FOR_USER_INFO.shift());
            }

            node = document.createElement('script');
            node.reload = '1';
            node.type = 'text/javascript';
            node.charset = 'UTF-8';
            if (typeof clearCache !== 'undefined') {
                node.src = url;
            } else  if (url.indexOf('?') !== -1) {
                node.src = url + '&' + getCurrentTime('yyyyMMddhhmmss');
            } else {
                node.src = url + '?' + getCurrentTime('yyyyMMddhhmmss');
            }

            document.getElementsByTagName('head')[0].appendChild(node);
            JSONP_REQUEST_FOR_USER_INFO.push(node);
        };
    }();
}

function Common() {

    EpgCommon.call(this);

    EpgToolCommon.call(this);
}

function EpgCommonClass() {
}

EpgCommonClass.prototype = new Common();
window.$ = new EpgCommonClass();

$.init();

function keyEvent(val) {

	if (typeof(val) === "undefined" || val === 'undefined') {
        val = window.event;
    }
    if(typeof(val) == "object"){
        val = val.which ? val.which : val.keyCode;
    }
    if(isLobby && val!=768){//营业厅分组在按键响应时清空全屏时间，重新计时,创维智能机顶盒会一直刷新768，屏蔽该按键
        showLobby();
    }
    // 通过按键值，取得keypressoption中的处理对象，假如处理对象是函数时，执行该函数，否则执行默认函数
    ( typeof ($.keypressoption[$.keymap[val]]) == "function" && $.keypressoption[$.keymap[val]]()) || $.keypressoption["DEFULT"]();

    return false;
}

function add_zero(temp) {

     if(temp<10) return "0"+temp;
     else return temp;
}

function contains(string,substr,isIgnoreCase)
{
    if(isIgnoreCase)
    {
     string=string.toLowerCase();
     substr=substr.toLowerCase();
    }
     var startChar=substr.substring(0,1);
     var strLen=substr.length;
         for(var j=0;j<string.length-strLen+1;j++)
         {
             if(string.charAt(j)==startChar)//如果匹配起始字符,开始查找
             {
                   if(string.substring(j,j+strLen)==substr)//如果从j开始的字符与str匹配，那ok
                   {
                         return true;
                   }
             }
         }
         return false;
}

function initTjGolbalVarByKey(index) {

    var keys = $.getGlobalData('tjIptvGlobalKeys' + index);

    if (keys == undefined || keys == 'undefined' || keys == '') {

        return;
    }

    var keyArray = keys.split(',');

    for (var i=0;i<keyArray.length;i++) {

        if (keyArray[i] == "" || "TJIPTVSOCKETIOSTATUS" == keyArray[i]) {

            continue;
        }

        $.saveGlobalData(keyArray[i], 'undefined');
    }

    $.saveGlobalData('tjIptvGlobalKeys' + index, 'undefined');

    initTjGolbalVarByKey(index + 1);
}

// 初始化页面邮件信息
function myEmailCallback(returnData) {
    var unreadedNum ;
    if(returnData.code == 1){
        unreadedNum = returnData.unreadNum;
    }else {
        unreadedNum = 0;
    }

    if(unreadedNum>0){
        document.getElementById('emailPointDiv').style.visibility = 'visible';

        if(unreadedNum < 10) {
            document.getElementById('emailMore').style.visibility = 'hidden';
            document.getElementById('emailNum').style.visibility = 'visible';
            document.getElementById('emailNum').innerHTML = unreadedNum
        } else {
            document.getElementById('emailMore').style.visibility = 'visible';
            document.getElementById('emailNum').style.visibility = 'hidden';
        }
    } else {
        document.getElementById('emailPointDiv').style.visibility = "hidden";
        document.getElementById('emailMore').style.visibility = 'hidden';
        document.getElementById('emailNum').style.visibility = "hidden";
        document.getElementById('emailNum').innerHTML = "";
    }

}

var jsonpRequestToolAddJs = function() {

    return function(url,id) {
        var JSONP_REQUEST_FOR_USER_INFO;
        JSONP_REQUEST_FOR_USER_INFO= document.createElement("script");
        JSONP_REQUEST_FOR_USER_INFO.id = "idsss";
        JSONP_REQUEST_FOR_USER_INFO.reload = "1";
        JSONP_REQUEST_FOR_USER_INFO.type = "text/javascript";
        JSONP_REQUEST_FOR_USER_INFO.charset = "UTF-8";
        JSONP_REQUEST_FOR_USER_INFO.src = url+"?" + getCurrentTime("yyyyMMddhhmmss");
        document.getElementsByTagName("head")[0].appendChild(JSONP_REQUEST_FOR_USER_INFO);
    };
}();

var __common_jsonp__ = function() {
    return function(url) {
          IS_SERVICE_RETURN = false;
          var option = {
            // 地址
            url: null,
            cache: false,
            jsonp: 'callback',
            await: true,
            timeout: 3000,
            callback: null
          };
          // 空函数，方便检测错误信息
          function jsonpLog(msg){}
          if (!url) {
            jsonpLog('params error:no url!');
            return;
            // throw new Error('params error no url!');
          } else if (typeof url === 'object') {
            if (!url.url) {
              jsonpLog('params error:no url!');
              return;
              // throw new Error('params error no url!');
            }
            for (var field in url) {
              if (url.hasOwnProperty(field)) {
                option[field] = url[field];
              }
            }
          } else if (typeof url === 'string') {
            option.url = url;
          } else {
            jsonpLog('params error:typeof url error!');
            return;
            // throw new Error('type of url error!');
          }
          if (!option.cache) {
            option.url += (option.url.indexOf('?') === -1 ? '?' : '&') + Math.random();
          }
          option.callback = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : option.callback;

          if (option.await) {
            setTimeout(function() {
              createScript(option.url);
            }, 0);
          } else {
            createScript(option.url);
          }

          function createScript(url) {
            //临时对象，方便随后进行的删除
            var temp = {};
            temp.node = document.createElement('script');
            temp.node.type = 'text/javascript';
            temp.node.charset = 'utf-8';
            temp.node.reload = 1;
            temp.node.src = url;
            document.body.appendChild(temp.node);

            option.timeout && setTimeout(removeCallBack, option.timeout);

            if (option.jsonp && typeof option.callback === 'function') {
              window[option.jsonp] = function() {
                try {
                  option.callback.apply(null, Array.prototype.slice.call(arguments));
                } catch (e) {
                  jsonpLog('system error:' + e.toString());
                  return;
                  // throw new Error(e.toString());
                } finally {
                  removeCallBack();
                }
              };
            }

            function removeCallBack() {
              if (!temp.node) return;
              delete window[option.jsonp];
              temp.node.parentNode.removeChild(temp.node);
              delete temp.node;
            }
          }
    };
}();

var jsonp = __common_jsonp__;
/**
 * 取得当前时间
 */
function getCurrentTime(format){
    var today = new Date();
    return today.format(format);
}

function socketOrder(mobileId, msg){
    $.socketOrder(mobileId, msg);
}

function isOrderNeedAuth(msg) {
    return $.isOrderNeedAuth(msg);
}

function pullFromTV(mobileId, msg){
    var backObj = {
        'type': 'pull', //返回类型为从电视拉取信息
        'code':'-1',  // '1':成功;'-1':失败;
        'errorType ':'0'
    }

    window.parent.sendBack(mobileId, JSON.stringify(backObj));
}


/**
 * 频道转换（高清标清转换为其他码率对应频道）
 */
function channelTurn(channelNum, showFlag) {
    var channelMatchs = {
        // 1:301,
        // 4:304,
        // 5:305,
        // 6:306,
        // 8:308,
        // 13:313,
        // 14:314,
        // 16:316,
        // 19:320,
        // 21:322,
        // 22:323,
        // 24:325,
        // 26:327,
        // 33:331,
        // 47:332,
        // 34:333,
        // 65:334,
        // 29:335,
        // 43:336,
        // 36:337,
        // 46:338,
        // 37:339,
        // 52:341,
        // 42:342
    };

    if (TEST_GROUP_FLAG) { //测试分组使用
        channelMatchs = {}
    }

    if (showFlag) {
        for (var channelPro in channelMatchs) {
            if (channelMatchs[channelPro] == channelNum) {
                return channelPro;
            }
        }
        return undefined;
    } else {
        return channelMatchs[channelNum];
    }
}

//日期格式化
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)){
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};
//格式化时间
Date.prototype.Format = function(formatStr){
    var str = formatStr;
    var Week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()+1>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str=str.replace(/M/g,this.getMonth()+1);

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
};

//获取URL
EpgCommonClass.prototype.getUrl = function(URLS){
    this.getUrl = function(key){
        return URLS[key] || '';
    };
};

//在播控目录
$.dirInPlayControl = function(url){
    var tmp = (url || window.location.href).split('?')[0];
    return /[^_](vod|tvod|channel|miniPlay|miniPlay_hw|terminalPage_qc)\.html/.test(tmp);
};
//获取returnUrl
$.popBack = function() {
    var returnUrl = '';

    var backUrlArray = $.getGlobalData("backUrlArray");

    if (backUrlArray == undefined || backUrlArray == 'end') {
        if(GLOBAL_NODE == "zte" && (window.location.href.indexOf("/myiptvNew") != -1)){
            returnUrl = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/portal_default.jsp";
        }else{
            returnUrl = '';
        }
    }
    var arrayBak = backUrlArray.split("&sp;");
    returnUrl = arrayBak.pop();
    var key = "backUrlArray";

    if (arrayBak.length == 0) {
        $.saveGlobalData(key, "end");

        returnUrl = '';
    }

    var value = "";

    for (var i=0; i<arrayBak.length; i++) {

        if (value == "") {

            value = arrayBak[i];
        } else {

            value = value + "&sp;" + arrayBak[i];
        }
    }

    $.saveGlobalData(key, value);
    return returnUrl;
};
//数字、字符串数组去重
$.filterSame4StringOrNumber = function(obj){
    if(!(obj instanceof Array)) return obj;

    var type = typeof obj[0], result = [], check = {};

    for (var i = 0; i < obj.length; i++) {
        if(typeof obj[i] !== 'string' && typeof obj[i] !== 'number') return obj;
        if(typeof obj[i] !== type) return obj;
        if (!check[obj[i]]) {
            result.push(obj[i]);
            check[obj[i]] = 1;
        }
    }
    return result;
}
//get方法
function $get(url, asyn){
    // log(url + '  asyn: ' + asyn);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, !!asyn);
    xhr.send(null);
}
//获取专题栏目号
function getZtCategoryId(){
    if (ztCategoryId == "undefined" || ztCategoryId == "" || ztCategoryId == undefined){
        if($.getBackTarget().indexOf("ztCategoryId")> -1){//上一个页面有专题所在的栏目id
            ztCategoryId =  $.getRequestParams("ztCategoryId",$.getBackTarget());
        }else{
            ztCategoryId = "";
        }
    }

    return ztCategoryId;
}
//获取数据收集用的套餐号
function getVsProductIds(mediacode){
    var chargeSpIds = '';
    //片花不发
    var mediaType = $.getGlobalData('tjIptvPlayListmediaType');
    // if(mediaType != '5'){
    if(mediaType == '1'){
        chargeSpIds = AUTH_LIB && AUTH_LIB.getVsProductIds && AUTH_LIB.getVsProductIds(mediacode) || '';
    }
    return chargeSpIds;
}

function getStbType(){
    var strStbType = "";
    if ("zte" === GLOBAL_NODE) {
        strStbType = ztebw.ioctlRead("infoHWProduct");
    }
    var temStbType = Authentication.CUGetConfig("STBType");
    if (temStbType) {
        strStbType = temStbType;
    }
    return strStbType;
}
function sendJsonp(msg, logLevel) {
    var url = 'http://61.181.152.158:21727/log';

    url += '?userID=' + $.getUserId();
    url += '&platform=' + GLOBAL_NODE + '&stbType=' + getStbType();
    url += '&logLevel=' + (logLevel || 'INFO');
    url += '&data=' + encodeURIComponent(msg);

    $.jsonpRequestTool(url);
}

//解析参数
function getParam(str,key)  {
    var params = str.split("&");
    var value;
    for (var i = 0; i < params.length; i++) {

        if (params[i].indexOf(key + "=") > -1) {
            value = params[i].toString().replace(key + "=", "");
        }
    }
    return value;
}
/************ 新版联通首页相关代码 begin*****************/
//增强上下左右事件
$.enhanceEvent = function(){

	(function(){
		var LAST_ACTIVE_OBJECT;
		function pressBefore(key){//'pressLeftBefore'
			LAST_ACTIVE_OBJECT = ACTIVE_OBJECT;
			var fn = ACTIVE_OBJECT['press' + key + 'Before'];
			if(typeof fn === 'function'){
				var params = ACTIVE_OBJECT['press' + key + 'BeforeParams'] || [];
				fn.apply(ACTIVE_OBJECT, params);
			}
		}
		function pressAfter(key){//'pressLeftAfter'
			var fn = LAST_ACTIVE_OBJECT['press' + key + 'After'];
			if(typeof fn === 'function'){
				var params = LAST_ACTIVE_OBJECT['press' + key + 'AfterParams'] || [];
				fn.apply(LAST_ACTIVE_OBJECT, params);
			}
            if(SIZE_PLAYER.isGuidePage == '1'){ // 离开第一屏,隐藏静音图标和音量面板
                clearTimeout(SIZE_PLAYER.panelTimer);
                $.getElem("divVolume").style.display = "none";
                $.getElem("divMute").style.display = "none";
            }
		}
		//重写上下左右事件
		$.keyPressSettiing({
			"KEY_LEFT": function(){
				pressBefore('Left');
				if(ACTIVE_OBJECT.pressLeft && ACTIVE_OBJECT.pressLeft !== ''){
					$.getTargetObj(ACTIVE_OBJECT.pressLeft);
					$.showFocusBorder();
				}
				pressAfter('Left');
				return true;
			},
			"KEY_RIGHT": function(){
				pressBefore('Right');
				if(ACTIVE_OBJECT.pressRight && ACTIVE_OBJECT.pressRight !== ''){
					$.getTargetObj(ACTIVE_OBJECT.pressRight);
					$.showFocusBorder();
				}
				pressAfter('Right');
				return true;
			},
			"KEY_UP": function(){
				pressBefore('Up');
				if(ACTIVE_OBJECT.pressUp && ACTIVE_OBJECT.pressUp !== ''){
					$.getTargetObj(ACTIVE_OBJECT.pressUp);
					$.showFocusBorder();
				}
				pressAfter('Up');
				return true;
			},
			"KEY_DOWN": function(){
				pressBefore('Down');
				if(ACTIVE_OBJECT.pressDown && ACTIVE_OBJECT.pressDown !== ''){
					$.getTargetObj(ACTIVE_OBJECT.pressDown);
					$.showFocusBorder();
				}
				pressAfter('Down');
				return true;
			}
		});
	 })();
};