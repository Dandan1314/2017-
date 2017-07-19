/**
 *  EPG模板共通函数类
 *
 *  @author liyq
 */

// 服务器前缀
var GLOBAL_PATH_PREFIX = "";

// 站点文件夹
//var GLOBAL_SITE_NAME = "ceshi2/";
var GLOBAL_SITE_NAME = "siteForTestSD/";

// 机顶盒名称
var GLOBAL_STB_NAME = "";

// 动态服务IP
var NODE_JS_SERVER_IP = "61.181.152.150";

// 动态服务IP  TODO
var NODE_JS_SERVER_IP_HTTP = "http://61.181.152.150";

// 动态服务IP
var NODE_JS_SERVER_IP_PORT = 3000;

// 搜索服务器地址TODO
var GLOBAL_SEARCH_DB_URL = "http://61.181.152.150:9999/";
//NODEJS服务地址
//var GLOBAL_MONGO_DB_URL = "http://61.181.152.158:9999/";
var GLOBAL_MONGO_DB_URL = "http://61.181.152.150:9999/";

// EMS后台服务管理地址TODO
//var GLOBAL_EMS_SERVER_URL = "http://61.181.152.150:29000";
var GLOBAL_EMS_SERVER_URL = "http://61.181.152.158:9984";

// 抽奖后台服务管理地址TODO
//var GLOBAL_LOT_SERVER_URL = "http://61.181.152.196:7000";
var GLOBAL_LOT_SERVER_URL = "http://61.181.152.200:7000";

// 砸金蛋后台服务地址TODO
var GLOBAL_EGG_SERVER_URL = "http://61.181.152.150:30000";
//var GLOBAL_EGG_SERVER_URL = "http://61.181.152.158:8080";

// 媒体类型 正片1 片花2
var GLOBAL_MEDIA_TYPE = "1";

// 媒资类型ID
var GLOBAL_MAT_ID = "1000000020";

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

// playVideo全局变量
var GLOBAL_ContentID = "";
var GLOBAL_categoryId = "";
var GLOBAL_contentIds = [];
var GLOBAL_contentType = "";
var GLOBAL_mediaType = "";
var GLOBAL_seriesId = "";
var GLOBAL_circleFlg = "";
var ISINPLAYLIST = false;

// 数据收集开关
var NEED_DATA_RECODE = true;

//专题所在栏目id
var ztCategoryId = "";

/******************************************/
/* 准生产环境用IP配置--start(上线时请删除)*/
/******************************************/
function settingEpg() {
	
	NODE_JS_SERVER_IP = '61.181.152.158';
	
	//NODE_JS_SERVER_IP_HTTP = 'http://61.181.152.158';
	
	//NODE_JS_SERVER_IP_PORT = 23000;
	
	GLOBAL_MONGO_DB_URL = "http://61.181.152.158:29999/";
	
	//EWM_PORT = 24000;
}

//settingEpg();
/*****************************************/
/* 准生产环境用IP配置--end(上线时请删除)**/
/*****************************************/

/**
 * 页面与业务共通函数 
 */
function EpgCommon() {

	/**
	 * 初始化共通函数
	 */
	this.init = function() {
		document.onkeypress = keyEvent;
		setTimeout("$.addSocketJs()",0);
		return;
	};

	/**
	 * 页面初始化 
	 */
	this.initPage = function() {
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

		var msg = Authentication.CUGetConfig('EPGDomain')
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
		257: "KEY_CHANNEL_UP",
		258: "KEY_CHANNEL_DOWN",
		259 : "KEY_VOLUME_UP",
		260 : "KEY_VOLUME_DOWN",
		261 : "KEY_VOLUME_Mute",
		275 : "KEY_LIVE_BROADCAST",
		276 : "KEY_REVIEW",
		277 : "KEY_DIBBLING",
		278 : "KEY_INFORMATION",
		768 : "EVENT_UTILITY",
		280 : "KEY_DELETE"
	};
	
	/**
	 *  按键处理 
	 */
	this.keypressoption = {};
	
	/**
	 * 按键处理设定 
	 */
	this.keyPressSettiing = function(option) {
		var name, src, copy
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
		}
		
		var userId =  $.getUserId();
		
		var url;
		
		if (seriesId == '' || seriesId == undefined) {
			url =  $.getConstant("mongoDBUrl") + 'playhistory/get/' + userId + '/' + GLOBAL_NODE + '/0/' + contentID + '/$.playVideoByHistoryCallback';
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
		$.saveGlobalData('isBack', false);
		window.location.href = url;
	};
	
	/**
	 * 页面跳转（记录本页访问历史） 
	 */
	this.forward = function(url) {
		$.saveGlobalData('isBack', false);
		$.addBackUrl();
		window.location.href = url;
	};
	
	/**
	 * 页面跳转（记录本页访问历史及参数） 
	 */
	this.forwardWithVar = function(url) {
		$.saveGlobalData('isBack', false);
		$.addBackUrlWithVar(url);
		window.location.href = url;
	};
	
	/**
	 * 返回上一页（通过访问历史） 
	 */
	this.back = function() {
		$.saveGlobalData('isBack', true);
	
		var backUrlArray = $.getGlobalData("backUrlArray");
		
		if (backUrlArray == undefined || backUrlArray == 'end') {
			if(GLOBAL_NODE == "zte" && (window.location.href.indexOf("/myiptvNew") != -1)){
				window.location.href = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/portal.jsp";
			}else{
				return;
			}
		}
		var arrayBak = backUrlArray.split("&sp;");
		for (var i = 0; i < arrayBak.length; i++) {
            //if (currentUrl  == arrayBak[i]) {//专题页带栏目号会反复返回
			if (window.location.href  == arrayBak[i]) {
                arrayBak.length = i;
            }
        }
		var returnUrl = arrayBak.pop();
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
		window.location.href = returnUrl;
	};

	//新旧播控共存时临时使用
	this.popBack = function() {
		var returnUrl = '';
	
		var backUrlArray = $.getGlobalData("backUrlArray");
		
		if (backUrlArray == undefined || backUrlArray == 'end') {
			if(GLOBAL_NODE == "zte" && (window.location.href.indexOf("/myiptvNew") != -1)){
				returnUrl = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/portal.jsp";
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
	
	/**
	 * 用户身份确认后的userId
	 */
	this.getVerifyUserId = function() {

		return Authentication.CUGetConfig("verifyUserID");
	};
	
	/**
	 * 鉴权 
	 */
	this.getUserId = (function(){
		var userId = (Authentication.CUGetConfig("UserID") || top.jsGetControl("UserID"));
		return function() {
			return userId;
		};
	})();
	
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
	}
	
	/**
	 * 按下OK时处理逻辑 
	 */
	this.pressOkActive = function(categoryId) {

		var target = ACTIVE_OBJECT.pressOk;

		if ( typeof (target) === 'string') {
			
			if(target == '')return;
			if(categoryId!=undefined) {
				if(target.indexOf("?") < 0){
					target = target + "?categoryId=" + categoryId;
				}
			}
			
			this.forward(target)
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
	 * 初始化远程控制 
	 */
	this.initRemoteCtrl = function(remoteCtrl) {
		
		var name, copy;
		
		for (name in this.keypressoption) {
			
			copy = this.keypressoption[name];
			
			if (name in remoteCtrl) {
				
				continue;
				
			} else {
				
				remoteCtrl[name] = copy;
			}
			
		}
		
		try{
			var userid = Authentication.CUGetConfig("UserID");
			
			var socket = io.connect(NODE_JS_SERVER_IP_HTTP , {
			     port : NODE_JS_SERVER_IP_PORT
			 });
	
			 socket.on('connect', function() {
			         socket.emit('login', userid);
			 });
			 socket.on('order', function (order) {
	
			 	for(orderPefix  in remoteCtrl){
			 		
			 		if($.startWith(order,orderPefix) && remoteCtrl[orderPefix]!=undefined && typeof(remoteCtrl[orderPefix]) == "function"){
			 			remoteCtrl[orderPefix](order);	
			 		}
			 	}
			});
			return true;		
		}catch(e){
			
			return false;
		}	
	};
	
	this.playVideoFromMobile = function(value) {
	
		var videoInfo = value.split('@');
		
		var id = videoInfo[1];
		
		var startTime = 0;
		
				
		if (videoInfo.length == 4) {
				
			var contentIds = videoInfo[2];
			
			startTime = videoInfo[3];
		
			$.saveGlobalData("fullScreenVodStartTime",startTime);
			
			$.playVideo(contentIds,MOBILE_COLLECT_CATEGORY_ID,"","VOD","1",id);
			
			return;
			
		} else {
			
			startTime = videoInfo[2];
		
			$.saveGlobalData("fullScreenVodStartTime",startTime);

		}
		$.playVideo(id,MOBILE_COLLECT_CATEGORY_ID);
	};
	this.playChannelFromMobile = function(value){
		var channelInfo = value.split('_');
		if(channelInfo.length == 2){
			$.channelNum = channelInfo[1];
			showChannelNum();
			channelSwitch();
		}
	}
	this.remoteCtrl = {
		"KEY": this.playChannelFromMobile,
		"PUSH_TO_TV" : this.playVideoFromMobile
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
}

/**
 * 工具类共通函数 
 */
function EpgToolCommon() {
	/**
	 * 	高标清判断
	 */
	this.checkStbVersion = function() {
		
		// 中兴（1：标清，2：高清）
		if(GLOBAL_NODE == "zte"){
			var versionZte = $.getGlobalData("frameVersion");
			if(versionZte != null && versionZte != "" && versionZte != undifined && versionZte != "undifined"){
				return versionZte;
				
			}
			
		//华为（1：标清，2：高清，3：OTT，4：OTT高清）
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
			
			return versionHW;
		}
		
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
	}
	//在播控目录
	this.dirInPlayControl = function(url){
		var tmp = (url || window.location.href).split('?')[0];
		return /(vod|tvod|channel|vod_zte|terminalPage_qc)\.html/.test(tmp);
	};
	this.getConstant = function(key) {

		// var tempMap = this.getGlobalData("GLOBAL_CONSTANTS_DATA");

		// if (tempMap != undefined && tempMap != null && tempMap !="undefined" && tempMap !="") { 			
			// // return tempMap[key];
		// }

		var url = window.location.href;
		
		var strRegex = "^((?:https|http|ftp|rtsp|mms)?://(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*/)pub/([A-Za-z1-9_-]+/)([A-Za-z1-9_-]+/).*$";
		var reg = new RegExp(strRegex);
		reg.exec(url.split("?")[0]);

		GLOBAL_PATH_PREFIX = RegExp.$1;
		GLOBAL_STB_NAME = RegExp.$2;
		siteName = RegExp.$3;


		if (siteName == 'detailPage/' || siteName == 'js/' || this.dirInPlayControl()) {
			var tmp_GLOBAL_STB_NAME = this.getGlobalData('GLOBAL_STB_NAME');
			if(tmp_GLOBAL_STB_NAME != undefined && tmp_GLOBAL_STB_NAME != 'undefined' && tmp_GLOBAL_STB_NAME != '') {
				GLOBAL_STB_NAME = tmp_GLOBAL_STB_NAME;
			}
			var tmp_GLOBAL_SITE_NAME = this.getGlobalData('GLOBAL_SITE_NAME');
			if(tmp_GLOBAL_SITE_NAME != undefined && tmp_GLOBAL_SITE_NAME != 'undefined' && tmp_GLOBAL_SITE_NAME != '') {
				
				siteName = tmp_GLOBAL_SITE_NAME;
			}
		} else {
			this.saveGlobalData("GLOBAL_STB_NAME", GLOBAL_STB_NAME);
			this.saveGlobalData("GLOBAL_SITE_NAME", siteName);
			GLOBAL_SITE_NAME = siteName;
		}
		
		var map = {
			"serverUrl" : GLOBAL_PATH_PREFIX + "pub/",
			"stbFolder" : GLOBAL_STB_NAME,
			"siteName" : GLOBAL_SITE_NAME,
			"baseUrl" : GLOBAL_PATH_PREFIX  + "pub/" + GLOBAL_STB_NAME,
			"playCtrlUrl" : GLOBAL_PATH_PREFIX  + "pub/" + GLOBAL_STB_NAME + "vodPlayController/index.html",
			"playListCtrlUrl" : GLOBAL_PATH_PREFIX  + "pub/" + GLOBAL_STB_NAME + "vodPlayListController/index.html",
			"mongoDBUrl" : GLOBAL_MONGO_DB_URL,
			"searchDBUrl" : GLOBAL_SEARCH_DB_URL,
			"mediaType" : GLOBAL_MEDIA_TYPE,
			"mediaMatId" : GLOBAL_MAT_ID,
			"node" : GLOBAL_NODE,
			"mediaPlayer" : GLOBAL_PLAY_URL,
			"picServerUrl" : GLOBAL_PATH_PREFIX + "pic/"
		};

		// this.saveGlobalData("GLOBAL_CONSTANTS_DATA", map);
		var tmp_GLOBAL_NODE = this.getGlobalData('GLOBAL_NODE');
		if (tmp_GLOBAL_NODE == undefined || tmp_GLOBAL_NODE == 'undefined' || tmp_GLOBAL_NODE == '') {
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
						
						var scrollHtml = "<marquee width='" + width +"' height='" + height + "' scrollamount='4'>"+ACTIVE_OBJECT.wholeMsg+"</marquee>"
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
		}
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
	}
	this.addBackUrl = function() {
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

		if (backUrlArray == undefined || backUrlArray == null || backUrlArray == '') {

			backUrlArray = currentUrl;
		} else {

			backUrlArray = backUrlArray + "&sp;" + currentUrl
		}
		var key = "backUrlArray";
		var value = backUrlArray;
		$.saveGlobalData(key, value);
	};
	/**
	 * 	param url:已拼接URL
	 */
	this.addBackUrlWithVar = function(url){
		//返回页面URL
		var currentUrl = window.location.href.split("?")[0];
		var cid = url.split("?")[1];
		var backUrlArray = $.getGlobalData("backUrlArray");
		if (judgeInvalid(backUrlArray)) {
			backUrlArray = currentUrl+"?"+cid;
		} else {
			backUrlArray = backUrlArray + "&sp;" + currentUrl + "?"+cid;
		}
		$.saveGlobalData("backUrlArray", backUrlArray);
	};
	
	this.recodeData = function(referpage,analysistype) {
	
	};
	
	//详细页订购数据收集
	this.recordDataOfDetailPage = function(productid,state){};
	
	this.checkRemoteJS = "";
	this.addSocketJs = function() {
		
		SOCKET_TIMER_FLAG = SOCKET_TIMER_FLAG + 1;
		
		if (SOCKET_TIMER_FLAG > 4) {
			
			clearTimeout(SOCKET_TIMER);
			
			return;
		}
		
		var scoketStatus = $.getGlobalData("TJIPTVSOCKETIOSTATUS");
		
		if (scoketStatus == undefined || scoketStatus == "undefined") {
			
			SOCKET_TIMER = setTimeout("$.addSocketJs()",500);
			
		} else {
			
			clearTimeout(SOCKET_TIMER);
			
			if ('on' == scoketStatus && io === undefined) {
			
				jsonpRequestToolAddJs(NODE_JS_SERVER_IP_HTTP+ ":" + NODE_JS_SERVER_IP_PORT + "/socket.io/socket.io.js");
	
				$.checkRemoteJS = setInterval("runRemoteJs()",1000);
			}
			
			return;
		}
	};
	this.addDateTimeWeekDiv = function() {
		var rootElement = document.body;
		var newElement = document.createElement("div");
		newElement.id = "divTopTime";
		newElement.style.color = "white";
		newElement.style.fontSize = "40px";
		newElement.style.position = "absolute";
		newElement.style.left = "960px";
		newElement.style.top = "-10px";
		newElement.style.width = "100px";
		newElement.style.height = "30px";
		var newElementHtmlContent = document.createTextNode("");
		newElement.appendChild(newElementHtmlContent);
		rootElement.appendChild(newElement);
		
		newElement = document.createElement("div");
		newElement.id = "divTopDate";
		newElement.style.color = "white";
		newElement.style.fontSize = "20px";
		newElement.style.position = "absolute";
		newElement.style.left = "1088px";
		newElement.style.top = "5px";
		newElement.style.width = "200px";
		newElement.style.height = "30px";
		newElementHtmlContent = document.createTextNode("");
		newElement.appendChild(newElementHtmlContent);
		rootElement.appendChild(newElement);
		
		// 页面初始化完成后执行一次
		this.setDateTimeWeek();
		
		// 设置每秒定时执行一次
		setInterval(this.setDateTimeWeek,1000);
	};
	this.setDateTimeWeek = function() {
		var now = new Date();
       
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var day = now.getDate();
		var week = now.getDay();  
	   
		var hh = now.getHours();
		var mm = now.getMinutes();
		
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
	   
		// 当前日期字符串
		var currentDate = year + "-";
	   
		if(month < 10)
			currentDate += "0";
		currentDate += month + "-";
	   
		if(day < 10)
			currentDate += "0";
		currentDate += day;
	   
		// 当前时间字符串
		var currentTime = "";
		
		if(hh < 10)
			currentTime += "0";
		currentTime += hh + ":";
		
		if (mm < 10) 
			currentTime += '0';
		currentTime += mm;
		
		$.getElem("divTopTime").innerHTML = currentTime;
		$.getElem("divTopDate").innerHTML = currentDate + " " + currentWeek;
	};
	this.addLikeCount = function(vodId,callBack) {
		var url = GLOBAL_MONGO_DB_URL + "search/updateLikeCount/vodId/" + vodId + "/addLikeCountHandler?d=" + new Date().getTime();
		jsonpRequestTool(url);
		
	};
	this.getLikeCount = function(vodId,callBack) {
		var url = GLOBAL_MONGO_DB_URL + "search/vodInfo/vodId/" + vodId + "/getLikeCountHandler?d=" + new Date().getTime();
		jsonpRequestTool(url);
	};
	
	// 判断对象是否无效或空或未定义
	this.judgeInvalid = function(arg){
		return ( null == arg || "null" == arg || undefined == arg || "undefined" == arg || "" == arg );
	}
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

function keyEvent() {
	
	var val = event.which ? event.which : event.keyCode;
	
	// 通过按键值，取得keypressoption中的处理对象，假如处理对象是函数时，执行该函数，否则执行默认函数
	( typeof ($.keypressoption[$.keymap[val]]) == "function" && $.keypressoption[$.keymap[val]]()) || $.keypressoption["DEFULT"]();

	return true;
}

function add_zero(temp) {
	
	 if(temp<10) return "0"+temp;
	 else return temp;
}

function contains(string,substr,isIgnoreCase){
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
		
		if (keyArray[i] == "" || "TJIPTVSOCKETIOSTATUS" == keyArray[i]  || "WHITELIST" == keyArray[i] || "CHARGE" == keyArray[i] || "AUTHLIST" == keyArray[i] ) {
			
			continue;
		}
		
		$.saveGlobalData(keyArray[i], 'undefined');
	}
	
	$.saveGlobalData('tjIptvGlobalKeys' + index, 'undefined');
	
	initTjGolbalVarByKey(index + 1);
}

var runRemoteJs = function() {
	try{
		
		if (io) {
			
			$.initRemoteCtrl($.remoteCtrl);
	
			clearInterval($.checkRemoteJS);
		}
		
	}catch(e) {
		
		// TODO
	}

}

var jsonpRequestToolAddJs = function() {
	
	return function(url,id) {
		
		var JSONP_REQUEST_FOR_USER_INFO;
		JSONP_REQUEST_FOR_USER_INFO= document.createElement("script");
		JSONP_REQUEST_FOR_USER_INFO.id = id;
		JSONP_REQUEST_FOR_USER_INFO.reload = "1";
		JSONP_REQUEST_FOR_USER_INFO.type = "text/javascript";
		JSONP_REQUEST_FOR_USER_INFO.charset = "UTF-8";
		JSONP_REQUEST_FOR_USER_INFO.src = url;
		document.getElementsByTagName("head")[0].appendChild(JSONP_REQUEST_FOR_USER_INFO);
	};
}();

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
            adPositionId = "undefined"
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
function getAdArray(flag){

	if (ISINPLAYLIST) {
		
		//处理广告列表
		processAdInPlayList();
		
		return;
	}

	// ZTE解析unshift不正常，需要添加该CHECK
	if (GLOBAL_contentIds.length == 0 || (GLOBAL_contentIds.length > 0 && GLOBAL_contentIds[0] != GLOBAL_ContentID)) {
	
		GLOBAL_contentIds.unshift(GLOBAL_ContentID);
	}

	var contentIdsMixAdIds = GLOBAL_contentIds;

	if (GLOBAL_seriesId != undefined && GLOBAL_seriesId != "") {
		
		contentIdsMixAdIds = [];
		
		for (var i = 0; i < GLOBAL_contentIds.length; i++) {
	        if(i != 0){
	            contentIdsMixAdIds.push("AD" + adArray[Math.floor(Math.random()*(adArray.length))]);
	        }
	        contentIdsMixAdIds.push(GLOBAL_contentIds[i]);
	    }
	}
    
    adPositionId = "undefined"
   if (flag==-1) {
   		 //后面的连播广告
    	playChainVideoEntity("AD" + adArray[Math.floor(Math.random()*(adArray.length))], GLOBAL_categoryId, contentIdsMixAdIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg,GLOBAL_ContentID);
   }else{
   		//播放第一条广告
		playVideoEntity("AD" + adArray[Math.floor(Math.random()*(adArray.length))], GLOBAL_categoryId, contentIdsMixAdIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg);
   }
    
    
}

// 初始化页面邮件信息
function myEmailCallback(returnData) {

    var unreadedNum = 0;
    for(var i = 0; i < returnData.data.length; i++) {
        var data = returnData.data[i];
        if(data.readStatus == "0"){//判断此邮件是否已读
            unreadedNum++;//未读邮件总数加1
        }
    }
    if(unreadedNum>9){
        document.getElementById('emailPointDiv').style.visibility = "visible";
        document.getElementById('emailMoreDiv').style.visibility = "visible";
        document.getElementById('emailNum').style.visibility = "hidden";
    }

    else if(unreadedNum>0 && unreadedNum<=9){
        document.getElementById('emailPointDiv').style.visibility = "visible";
        document.getElementById('emailMoreDiv').style.visibility = "hidden";
        document.getElementById('emailNum').style.visibility = "visible";
        document.getElementById('emailNum').innerHTML = unreadedNum;
    }
    else if(unreadedNum==0){
        document.getElementById('emailPointDiv').style.visibility = "hidden";
        document.getElementById('emailMoreDiv').style.visibility = "hidden";
        document.getElementById('emailNum').style.visibility = "hidden";
        document.getElementById('emailNum').innerHTML = "";     
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
//取得当前时间 ，用于获得jsonp时间戳
function getCurrentTime(format){
    var today = new Date();
    return today.format(format);
}

function out(val){
	
	if(document.getElementById("out") == undefined){
		var div = document.createElement("div");
		div.id = "out";
		div.style.color="red";
		document.body.appendChild(div);
	}
	document.getElementById("out").innerHTML = document.getElementById("out").innerHTML + "  " + val;
	
}

EpgCommonClass.prototype.getUrl = function(URLS){
	this.getUrl = function(key){
		return URLS[key] || '';
	};
};

/*
*	MediaPlayer播放适配器(MP)
*
* 	V20160105
* 		1、修复创维盒子不能快进快退播放
*
* 	V20151215
* 		1、修正华为不能播放VOD节目BUG
*
*	V20150923
*		1、修正低版本浏览器错误（参数或function里声明的变量被赋值到this上）
*
*/
(function(root, factory, undefined) {
	root.MP || (root.MP = factory());
})(window, function(){
	//配置,参数1：默认配置，参数2：自定义配置
	var _config = function(dft, cfg){
		var opt = {};
		for (var i in dft) {
			opt[i] = dft[i];
		}
		if (cfg) {
			for (var key in opt) {
				(cfg.hasOwnProperty(key)) && (opt[key] = cfg[key]);
			}
		}
		return opt;
	};
	//初始化play方法，依赖MediaPlayer实例
	var _initPlay = function(it) {
		var play;
		var play1 = function(channel) {
			it.who.joinChannel(channel);
			//存储
			it.channelNum = channel;
		};
		var play2 = function() {
			if(it.startTime){
				it.playByTime(it.startTime);
			}else{
				it.who.playFromStart();
			}
		};
		var play3 = function(){
			it.who.playFromStart();
		};
		switch (it.mediaType) {
			case MP.mediaType.TYPE_CHANNEL:
				play = play1;
				break;
			case MP.mediaType.TYPE_VOD:
				play = play2;
				break;
			case MP.mediaType.TYPE_TVOD:
				play = play3;
				break;
			case MP.mediaType.TYPE_MUSIC:

				break;
		}
		(typeof play === 'function') && (it.play = play);
	};

	var MP = function(_mediaType, cfg) {
		this.mediaType = _mediaType || MP.mediaType.TYPE_CHANNEL;
		var who = new MediaPlayer();

		//默认配置
		var dft = {
			nativePlayerinstanceID: who.getNativePlayerInstanceID(),
			playlistFlag: 0, //播放模式。 0：单媒体的播放模式 (默认值)，1: 播放列表的播放模式
			videoDisplayMode: 1, //视频窗口的显示模式. 1: 全屏显示2: 按宽度显示，3: 按高度显示255: 视频显示窗口将被关闭。它将在 保持媒体流连接的前提下，隐藏视频窗口。如果流媒体播放没有被暂停，将继续播放音频
			height: 0,
			width: 0,
			left: 0,
			top: 0,
			muteFlag: 0, //0: 设置为有声 (默认值) 1: 设置为静音
			useNativeUIFlag: 0, //0: 不使能用Player的本地UI显示功能 1:使能用Player的本地UI显示功能 (默认值) 
			nativeUIFlag : 0,
			subtitleFlag: 0, //0:  不显示字幕 (默认值) 1:  显示字幕 
			videoAlpha: 0, //0－100 之间的整数值，0 表示不透明,100 表示完全透明.(默认值为 0) 
			cycleFlag: 0, //
			randomFlag: 0, //
			autoDelFlag: 0 //
		};
		//用户自定义配置
		var opt = _config(dft, cfg);
		
		who.initMediaPlayer(opt.nativePlayerinstanceID, opt.playlistFlag, opt.videoDisplayMode, opt.height, opt.width, opt.left, opt.top, opt.muteFlag, opt.useNativeUIFlag, opt.subtitleFlag, opt.videoAlpha, opt.cycleFlag, opt.randomFlag, opt.autoDelFlag);
		//刷新
		who.refreshVideoDisplay();
		this.who = who;

		_initPlay(this);

		return this;
	};
	//播放
	MP.prototype.play = function(){};
	//根据时间播放，VOD/TVOD:传秒数，Channel：传从1970.01.01年至今的秒数
	MP.prototype.playByTime = function(time) {
		var type = 1,
			speed = 1,
			timestamp = time - 0;
		//从本地时间转换成GMT(20150525T084655Z)
		if(this.mediaType === MP.mediaType.TYPE_CHANNEL){
			var localDate = new Date(timestamp * 1000);

			//GMT格式(20150525T084655Z)
			var gmtDate = new Date(localDate.getTime() + (localDate.getTimezoneOffset() * 60 * 1000));
			var yyyy = gmtDate.getFullYear(),
				mm = gmtDate.getMonth() + 1,
				dd = gmtDate.getDate(),
				hh = gmtDate.getHours(),
				MM = gmtDate.getMinutes(),
				ss = gmtDate.getSeconds();
			mm < 10 && (mm = '0' + mm);
			dd < 10 && (dd = '0' + dd);
			hh < 10 && (hh = '0' + hh);
			MM < 10 && (MM = '0' + MM);
			ss < 10 && (ss = '0' + ss);
			//最终格式
			timestamp = '' + yyyy + mm + dd + 'T' + hh + MM + ss + '.00Z';
			//Channel type = 2
			type = 2;
		}
		this.who.playByTime(type, timestamp + '', speed);
		return this;
	};
	//跳到媒体末端播放
	MP.prototype.playFromEnd = function(){
		this.who.gotoEnd();
		return this;
	};
	//暂停播放
	MP.prototype.pause = function() {
		this.who.pause();
		return this;
	};
	//恢复播放
	MP.prototype.resume = function() {
		this.who.resume();
		return this;
	};
	//停止播放
	MP.prototype.stop = function() {
		this.who.stop();
	};
	//设置媒体播放器播放媒体内容
	MP.prototype.setMedia = function(opt){
		//默认配置
		var dft = {
			mediaUrl: "",
			mediaCode: "mediaCode",
			mediaType: 2,
			audioType: 1,
			videoType: 1,
			streamType: 1,
			drmType: 1,
			fingerPrint: 0,
			copyProtection: 1,
			allowTrickmode: 1,
			startTime: 0,
			endTime: -1,
			entryID: "entryID"
		};
		custom = _config(dft, opt);
		this.startTime = custom.startTime;
		var str = '';
		// if(typeof JSON !== 'undefined'){
			// str = JSON.stringify([custom])
		// }else{//兼容中兴B600
			str = (function(objs){
				var out = [];
				for(var key in objs){
					var val = objs[key];
					val = typeof val === 'string' ? ('"' + val + '"') : val;
					out.push(key + ':' + val);
				}
				return out.join(',');
			})(custom);
			str = '[{' + str + '}]';
		// }
		this.who.setSingleMedia(str);
		return this;
	};

	MP.prototype.getVolume = function(){
		return this.who.getVolume() - 0;
	};
	MP.prototype.setVolume = function(v){
		if(v > 0 && v <= 100){
			this.who.setMuteFlag(0);//个别盒子BUG，先设置未静音
			this.who.setVolume(v);
		}else{
			this.who.setMuteFlag(1);
		}
		return this;
	};
	//返回以秒为单位的数字 
	MP.prototype.getCurrentTime = function(){
		//媒体播放到的当前时间点 对 VoD 为从该媒体起 始点开始计算的相对时间， 以秒为单位；对 TVoD 为当前播放点的绝对时间；对 Channel 返回20130701T085555.00Z
		var time = this.who.getCurrentPlayTime();
		//从GMT(20150525T084655Z)转换成本地时间
		if(this.mediaType === MP.mediaType.TYPE_CHANNEL){
			var yyyy = time.substring(0,4),
				mm = time.substring(4,6),
				dd = time.substring(6,8),
				hh = time.substring(9,11),
				MM = time.substring(11,13),
				ss = time.substring(13,15);
			//date为GMT时间
			var date = new Date(yyyy,mm,dd,hh,MM,ss);
			//本地时间的毫秒
			var local = date.getTime() - (date.getTimezoneOffset() * 60 * 1000);
			//真正的秒数
			time = parseInt(local/1000);
		}
		return time - 0;
	};
	// 整数，以秒为单位获取当前播放的媒体的总时长 
	MP.prototype.getTotalTime = function(){
		var t = this.who.getMediaDuration() - 0;
		//创维金盒子BUG：获取时长为2小时
		(UTIL.STB.isSkyworth && UTIL.STB.appVersion === 5 && t === 7200) && (t = -1);
		return t;
	};
	//返回直播号
	MP.prototype.getChannelNum = function(){
		//兼容创维：创维不能获取当前直播号
		if(typeof this.channelNum !== 'undefined'){
			return this.channelNum;
		}
		return this.who.getChannelNum();
	};
	
	//类型
	MP.mediaType = {
		TYPE_CHANNEL : 1,//直播
		TYPE_VOD : 2,//点播
		TYPE_TVOD : 3,//直播回放
		TYPE_MUSIC : 4
	};
	return MP;
});

/*
*	工具包(UTIL)
*
* 	V20160222
* 		1、修复中兴盒子setTimeout提前执行BUG
* 		
* 	V20160127
* 		1、Marquee添加实例化功能
*
*	V20151130
*		1、修复中兴部分BUG
* 	
* 	V20151127
* 		1、修改部分BUG
* 		2、添加新功能
* 		3、兼容中兴及创维盒子
*
* 	V20151119
* 		1、添加元素选择器
* 		2、添加跑马灯
*
*	V20151113
*		1、修改loaderData等于loader
*		2、兼容中兴：赋值样式时不生效的BUG
*
* 	V20151104
* 		1、兼容中兴：loaderData添加charset参数
* 		2、修正AutoHide.prototype.setKeyRespond设置为null时的BUG
*
*	V20150925
*		1、兼容中兴：script标签的属性只能通过setAttribute赋值
*
*	V20150923
*		1、修正analyseArray返回值错误问题
*		2、兼容中兴
*/
(function(root, factory, undefined){
	root.UTIL || (root.UTIL = factory());
})(window, function(){
	var doc = document,
		win = window,
		head = document.getElementsByTagName("head")[0];


	var _UTIL = {};
	_UTIL.STB = {};
	_UTIL.STB.appName = navigator.appName;
	_UTIL.STB.appVersion = navigator.appVersion.replace(/ ?\(.*$/, '');
	_UTIL.STB.isZte = /ztebw/.test(_UTIL.STB.appName);
	_UTIL.STB.isZteZXV10B700 = false;
	_UTIL.STB.isSkyworth = /skyworth/i.test(navigator.userAgent);
	_UTIL.STB.isAndroid = /android/i.test(navigator.userAgent);
	_UTIL.STB.appVersion = _UTIL.STB.isZte && (/ztebw v/.test(_UTIL.STB.appVersion)) ? 0 : parseInt(_UTIL.STB.appVersion);
	//兼容名称
	_UTIL.STB.compatible = '';
	//兼容创维E1100  中兴Z600
	if(_UTIL.STB.isSkyworth && _UTIL.STB.appVersion === 4){
		_UTIL.STB.compatible = '-skyworth-4';
	}else if(_UTIL.STB.isZte && _UTIL.STB.appVersion === 0){
		_UTIL.STB.compatible = '-zte-0';
		//中兴高清ZXV10 B700
		if(ztebw.ioctlRead("infoHWProduct").substring(0,10) == "ZXV10 B700"){
			_UTIL.STB.isZteZXV10B700 = true;
		}
	}
	
	//兼容创维，向集合添加.length属性
	var _addLengthForArray = function(ds){
		if(ds && typeof ds.length === 'undefined'){
			for(var i = 0; ds.hasOwnProperty(i); i++){}
			ds.length = i;
		}
		return ds;
	};
	//去除首尾空格
	var _trim = (function(){
		if('trim' in String.prototype){
			return function(str){
				return String.prototype.trim.call(str);
			};
		}else{
			var reg = /^ *| *$/g;
			return function(str){
				if(typeof str !== 'string'){//不是string时进入
					try{
						if(str === null || str === undefined){
							return str;//null undefined
						}else{
							str = str.toString();
							if(typeof str !== 'string'){//还不是string时，返回[object Object]
								return '[object Object]';
							}
						}
					}catch(e){}
				}
				return (str || '').replace(reg, '');
			}
		}
	})();
	// 中文字符装换成英文字符
	var _textHandler = function(str){
    	str = str.replace(/[：“”]/g,function(a){
        	return {
	            /*'？' : '?',
	            '！' : '!',
	            '（' : '(',
	            '）' : ')',
	            '“' : '"',
	            '”' : '"',
	            '‘' : "'",
	            '’' : "'",*/
	            '“' : '"',
	            '”' : '"',
	    		'：' : ':'
			}[a] || '';
    	 });
    	return str;
	};
	_UTIL.textHandler = _textHandler;

	//截取字符串 全角:1 半角:1
	//参数doubleByteLength为正整数
	//无需截取返回空串
	var _substringDoubleByte = function(str, doubleByteLength){
		if(str && typeof str === 'string' && doubleByteLength > 0){
			if(_UTIL.STB.isZte && _UTIL.STB.appVersion === 0){
				if(/[ :()'"-\d]/.test(str.charAt(6))){
					doubleByteLength--;	
				}
			}
			if(str.length > doubleByteLength){//需要截取
				var tmp = str.substring(0, doubleByteLength);
				return tmp;
			}
		}
		return '';
	};
	_UTIL.substringDoubleByte = _substringDoubleByte;

	//截取字符串 全角:1 半角:0.5
	//参数doubleByteLength为正整数
	//无需截取返回空串
	var _substringOneLine = function(str, doubleByteLength){
		if(str && typeof str === 'string' && doubleByteLength > 0){
			if(str.length > doubleByteLength){//需要截取
				var tmp = str.substring(0, doubleByteLength);
				var enReg = /[\x00-\xff]/g;

				// var moreEnLength = (tmp.match(enReg) || []).length / 2;
				//兼容创维,获取正确长度
				var moreEnLength = 0;
				tmp.replace(enReg, function(){
					moreEnLength++;
				});
				moreEnLength = moreEnLength / 2;
				if(moreEnLength > 0){//不足
					var moreStr = '';
					var arr = str.split('');
					for(var i = doubleByteLength; i < arr.length; i++){
						if(arr[i].charCodeAt(0) <= 255){
							moreEnLength -= 0.5;
						}else{
							moreEnLength -= 1;
						}
						if(moreEnLength >= 0){
							moreStr += arr[i];
						}else{
							i = arr.length * 10;
						}
					}
					tmp += moreStr;
					//相同，返回空串
					if(tmp.length === str.length){
						return ''
					}
				}
				return tmp;
			}
		}
		return '';
	};
	_UTIL.substringOneLine = _substringOneLine;
	
	_UTIL.addLength = function(ds){
		return _addLengthForArray(ds);
	}
	//加载JS
	_UTIL.loader = function(){
		var sList = [],
			sListMaxSize = 10;
		return function(url, success, error, params){
			var _params = params || ({
				"charset" : ""
			});
			var s = doc.createElement('script');
			s.setAttribute('type', 'text/javascript');
			s.setAttribute('charset', _params.charset || 'UTF-8');
			s.onload = typeof success === 'function' ? success : null;
			s.onerror = typeof error === 'function' ? error : null;
			s.src = url;
			head.appendChild(s);
			sList.push(s);
			if(sList.length > sListMaxSize){
				document.getElementsByTagName("head")[0].removeChild(sList.shift());
			}
		};
	}();
	_UTIL.loaderData = function(url, success, error, params){
		_UTIL.loader(url + (/\?/.test(url) ? '&' : '?') + new Date().getTime(), success, error, params);
	};
	//元素选择
	_UTIL.Element = (function() {
		var _key = 1;
		if ('nextElementSibling' in doc.documentElement) {
			_key = 0;
		}
		var _children = ({
			'0': function(el) {
				var out = [];
				if (el) {
					out = el.children;
				}
				return out;
			},
			'1': function(el) {
				var out = null;
				if (el) {
					out = el.childNodes;
					_addLengthForArray(out);
				}
				return out;
			}
		})[_key];
		var _next = ({
			'0': function(el) {
				var out = null;
				if (el) {
					out = el.nextElementSibling;
				}
				return out;
			},
			'1': function(el) {
				var out = null;
				if (el) {
					out = el.nextSibling;
				}
				return out;
			}
		})[_key];
		var _previous = ({
			'0': function(el) {
				var out = null;
				if (el) {
					out = el.previousElementSibling;
				}
				return out;
			},
			'1': function(el) {
				var out = null;
				if (el) {
					out = el.previousSibling;
				}
				return out;
			}
		})[_key];
		var _first = ({
			'0': function(el) {
				var out = null;
				if (el) {
					out = el.firstElementChild;
				}
				return out;
			},
			'1': function(el) {
				var out = null;
				if (el) {
					out = el.firstChild;
				}
				return out;
			}
		})[_key];
		var _last = ({
			'0': function(el) {
				var out = null;
				if (el) {
					out = el.lastElementChild;
				}
				return out;
			},
			'1': function(el) {
				var out = null;
				if (el) {
					out = el.lastChild;
				}
				return out;
			}
		})[_key];
		var _isDOM = (function(){
			var out;
			if (typeof HTMLElement === 'function') {
				out = function(obj){
					return !!(obj instanceof HTMLElement);
				};
			}else{
				out = function(obj) {
					return !!(obj && typeof obj !== 'undefined' && obj.nodeType === 1 && typeof obj.nodeName === 'string');
				};
			}
			return out;
		})();
		var _isEqualNode = (function(){
			var out;
			if('isEqualNode' in document.documentElement){
				out = function(dom, dom2){
					return dom === dom2;//dom && (dom.isEqualNode(dom2));
				}
			}else{
				out = function(dom, dom2){
					if(_isDOM(dom) && _isDOM(dom2)){
						try{
							var r = dom.nodeName === dom2.nodeName &&
									dom.nodeType === dom2.nodeType &&
									dom.nodeValue === dom2.nodeValue &&
									dom.innerHTML === dom2.innerHTML;// &&//undefined === undefined true
									// dom.parentNode.innerHTML === dom2.parentNode.innerHTML;
							//再对比元素的前一个元素
							if(r){
								if(_isDOM(dom.previousSibling) && _isDOM(dom2.previousSibling)){
									return _isEqualNode(dom.previousSibling, dom2.previousSibling);
								}else{
									return dom.previousSibling === dom2.previousSibling;// null === null true
								}
							}
							return !!r;
						}catch(e){
							return false;
						}
					}
					return false;
				};
			}
			return out;
		})();
		return {
			children: _children,
			next: _next,
			previous: _previous,
			first: _first,
			last: _last,
			get : function(id){
				return doc.getElementById(id);
			},
			getByClass : function(className, oParent){
				var ds = oParent.getElementsByTagName('*'),
					els = [],
					re = new RegExp('\\b' + className + '\\b', 'i');
				_addLengthForArray(ds);
				for(var i = 0, len = ds.length; i < len; i++){
					var obj = ds[i];
					obj && (re.test(obj.className)) && (els.push(obj));
				}
				return els;
			},
			getByTag : function(tagName, oParent){
				oParent || (oParent = doc);
				var els = oParent.getElementsByTagName(tagName);
				_addLengthForArray(els);
				return els;
			},
			isDOM : _isDOM,
			isEqualNode : _isEqualNode
		};
	})();
	//样式操作
	_UTIL.classHelper = (function(){
		var _classList = (function(){
			if('classList' in document.documentElement){
				return function(el){
					return Array.prototype.slice.call(el.classList, 0);
				};
			}else{
				return function(el){
					return ((el && el.className) || '').split(' ');
				}
			}
		})();
		return {
			add : function(className, el){
				var re = new RegExp('\\b' + className + '\\b', 'i');
				if(el && className && (!re.test(el.className || ''))){
					var classList = _classList(el);
					classList.push(className);
					el.className = _trim(classList.join(' '));
					if(_UTIL.STB.isZte && _UTIL.STB.appVersion <= 1){
						//去除中兴黑框
						el.style.display = el.style.display;
					}
				}
				return this;
			},
			remove : function(className, el){
				if(el && className){
					var classList = _classList(el);
					var out = [];
					for (var i in classList) {
						var tmp = classList[i];
						if(className !== tmp){
							out.push(tmp);
						}
					};
					el.className = _trim(out.join(' '));
					if(_UTIL.STB.isZte && _UTIL.STB.appVersion <= 1){
						//去除中兴黑框
						el.style.display = el.style.display;
					}
				}
				return this;
			}
		};
	})();
	_UTIL.indexOf = (function(){
		var indexOf;
		if('indexOf' in Array.prototype){
			indexOf = function(items, item){
				return Array.prototype.indexOf.call(items, item);
			}
		}else{
			indexOf = function(items, item){
				if(items && item){//有效时
					_addLengthForArray(items);
					if(_UTIL.Element.isDOM(item)){//DOM入口
						var isEq = _UTIL.Element.isEqualNode;
						for(i = 0, len = items.length; i < len; i++){
							if(isEq(items[i], item)){
								return i;
							}
						}
					}else{//普通对象入口
						for(i = 0, len = items.length; i < len; i++){
							if(items[i] === item){
								return i;
							}
						}
					}
				}
				return -1;
			};
		}
		return function(items, item){
			return indexOf(items, item);
		};
	})();
	_UTIL.reverse = (function(){
		/*if('reverse' in Array.prototype){
			reverse = function(items){
				return Array.prototype.reverse.call(items);
			}
		}else{
		}*/
		var reverse = function(items){
			var out = [];
			if(items){//有效时
				_addLengthForArray(items);
				for(i = items.length - 1; i >= 0; i--){
					out.push(items[i]);
				}
			}
			return out;
		};
		return function(items){
			return reverse(items);
		};
	})();
	//节流阀
	_UTIL.Throttle = function(fn){
		var Throttle = function(fn){
			this._fn = (typeof fn === 'function') ? fn : function(){};
		};
		Throttle.prototype.begin = function(delay){
			clearTimeout(this._timer);
			var fn = this._fn;
			var it = this;
			var _interval = delay || 100;
			var bTime = new Date().getTime();
			function _do(d){
				var _inv = _interval - (new Date().getTime() - d);
				if(_inv < 100){//兼容中兴盒子首次加载，setTimeout执行提前
					fn();
				}else{
					it.timer = setTimeout(function(){
						_do(bTime);
					}, _inv);
				}
			};
			this._timer = setTimeout(function(){
				_do(bTime);
			}, _interval);
		};
		Throttle.prototype.clear = function(){
			clearTimeout(this._timer);
		};
		return new Throttle(fn);
	};
	//分析两个数组，找出相同及不同
	_UTIL.analyseArray = function(arr1, arr2){
		var identical = [],//相同部分
			difference1 = [],//不同部分1
			difference2 = [];//不同部分2

		if(arr1.length === 0 || arr1.length === 0){
			difference1 = arr1.slice(0);
			difference2 = arr2.slice(0);
		}else{
			var ii = {};

			for(var i in arr1){
				ii[arr1[i]] = i;
			}
			for(var i in arr2){
				var a2 = arr2[i];
				if(ii[a2] >= 0){
					ii[a2] = true;
					identical.push(a2);
				}else{
					difference2.push(a2);
				}
			}
			for(var i in ii){
				var _index = ii[i];
				if(_index !== true){
					difference1.push(arr1[_index]);
				}
			}
		}
		return [identical, difference1, difference2];
	};
	//跑马灯
	/*
		options = {
			el : element,
			all : '1234567890',
			short : '123...',
			width : 100px || 100%,
			height : 100px || 100%
		}
	*/
	var _Marquee_last;
	var _Marquee = function(options) {
		/*
		last = {
			el : el,
			text : text
		}
		*/
		var _U_E = _UTIL.Element;
		if(this instanceof _Marquee){
			var who = this;
			return function(options){
				var beginNew = options && _U_E.isDOM(options.el);
				var last = who.last;

				//已经滚动，不再重新滚动
				if(last && beginNew && _U_E.isEqualNode(options.el, last.el) && (/\<marquee[^>]*\>/i.test(last.el.innerHTML))){
					return;
				}

				//还原前一个
				if (last) {
					last.el && (last.el.innerHTML !== "") && (/\<marquee[^>]*\>/i.test(last.el.innerHTML)) && (last.el.innerHTML = last.text || '');
					who.last = null;
				}
				//开始现在
				if(beginNew){
					who.last = {
						el: options.el,
						text: options.short || options.el.innerText || options.el.textContent || options.el.innerHTML
					};
					_Marquee_begin(options);
				}
			};
		}else{
			var beginNew = options && _U_E.isDOM(options.el);

			//已经滚动，不再滚动
			if(_Marquee_last && beginNew && _U_E.isEqualNode(options.el, _Marquee_last.el) && (/\<marquee[^>]*\>/i.test(_Marquee_last.el.innerHTML))){
				return;
			}

			//还原前一个
			if (_Marquee_last) {
				_Marquee_last.el && (_Marquee_last.el.innerHTML !== "") && (/\<marquee[^>]*\>/i.test(_Marquee_last.el.innerHTML)) && (_Marquee_last.el.innerHTML = _Marquee_last.text || '');
				_Marquee_last = null;
			}
			//开始现在
			if(beginNew){
				_Marquee_last = {
					el: options.el,
					text: options.short || options.el.innerText || options.el.textContent || options.el.innerHTML
				};
				_Marquee_begin(options);
			}
		}
	};
	var _Marquee_begin = function(options){
		options.height = options.height || '99%';
		options.width = options.width || '98%';
		options.el.innerHTML = '<marquee width="' + options.width + '" height="' + options.height + '" scrollamount="4">' + options.all + '</marquee>';
	}
	_UTIL.Marquee = _Marquee;
	//自动隐藏面板工具
	_UTIL.AutoHide = function(interval, silenceKeyRespond){
		var _pluginToArray = function(plugins){
			var out = [];
			for(var i = 0, l = plugins.length; i < l; i++){
				var t = plugins[i];
				out.push(t.key);
			}
			return out;
		};
		var _arrayToPlugin = function(arr){
			var out = [];
			for(var i = 0, l = arr.length; i < l; i++){
				var key = arr[i];
				out.push(page.plugin[key]);
			}
			return out;
		};
		var _hide = function(toHide){
			for (var i = toHide.length - 1; i >= 0; i--) {
				var panel = toHide[i];
				panel.hide();
			};
		};
		var _show = function(toShow){
			for (var i = toShow.length - 1; i >= 0; i--) {
				var panel = toShow[i];
				panel.show();
			};
		};
		var _afterHideToShow = function(it){
			var after = it.tempAfter;
			if(after.list.length){
				_show(after.list);
				it.temp = after.list.slice(0);
				it.timer = setTimeout(function(){
					it.hide();
				}, (after.interval || it.interval));
				//keyRespondObj
				it.setKeyRespond(after.keyRespondObj);
			}
		};
		var AutoHide = function(interval, silenceKeyRespond){
			//延时
			this.interval = interval;
			//timer
			this.timer = null;
			//临时显示
			this.temp = [];
			//临时显示隐藏后显示
			this.tempAfter = {
				list : [],
				interval : undefined,
				keyRespondObj : undefined
			};
			//永久显示
			this.always = [];
			//按键响应对象
			this.silenceKeyRespond = silenceKeyRespond;//默认
			this.keyRespondObj;
			return this;
		};
		AutoHide.prototype.setSilenceKeyRespond = function(silenceKeyRespond){
			this.silenceKeyRespond = silenceKeyRespond;//默认
			return this;
		};
		AutoHide.prototype.setKeyRespond = function(obj, stubborn){
			if(this.isLockShow){
				return this;
			}
			this.keyRespondObj = obj;
			//顽固的，不能处理其他按键
			this.keyRespondObj && (this.keyRespondObj._stubborn = obj && stubborn);
			return this;
		};
		AutoHide.prototype.keyRespond = function(keyString){
			var keyRespond = this.keyRespondObj;
			//true 阻止默认事件
			var respond = keyRespond && (typeof keyRespond[keyString] === 'function') && (keyRespond[keyString]());

			if(this.isLockShow){//锁定时，不响应默认事件
				return true;
			}
			//顽固的，不能处理其他按键
			var stubborn = keyRespond && keyRespond._stubborn;

			respond = respond || stubborn;

			//没有阻止 并且不顽固
			if(!respond){
				keyRespond = this.silenceKeyRespond;
				respond = keyRespond && (typeof keyRespond[keyString] === 'function') && (keyRespond[keyString]());
			}
			return respond;
		};
		//普通显示，自动隐藏，参数 list为数组	interval(可选)，临时时间   hasAfter(可选),隐藏后还有要显示的
		AutoHide.prototype.show = function(list, interval, hasAfter){
			if(this.isLockShow){
				return this;
			}
			var it = this;
			list || (list = []);

			clearTimeout(it.timer);
			var tempShow = _UTIL.analyseArray(_pluginToArray(it.temp), _pluginToArray(list));
			//tohide
			_hide(_arrayToPlugin(tempShow[1]));
			it.temp.length = 0;
			//toshow
			_show(_arrayToPlugin(tempShow[2]));
			it.temp = list.slice(0);
			function _doShow(d){
				var _inv = _interval - (new Date().getTime() - d);
				if(_inv < 400){//兼容中兴盒子首次加载，setTimeout执行提前
					it.hide();
					if(hasAfter){
						//显示
						_afterHideToShow(it);
						//一次性使用
						it.tempAfter.list.length = 0;
						it.tempAfter.interval = undefined;
						it.tempAfter.keyRespondObj = undefined;
					}
				}else{
					it.timer = setTimeout(function(){
						_doShow(dBegin);
					}, _inv);
				}
			};
			var _interval = interval || it.interval;
			var dBegin = new Date().getTime();
			it.timer = setTimeout(function(){
				_doShow(dBegin);
			}, _interval);
			return this;
		};
		//隐藏普通
		AutoHide.prototype.hide = function(){
			if(this.isLockShow){
				return this;
			}
			clearTimeout(this.timer);
			//清空按键响应对象
			this.setKeyRespond(null);
			_hide(this.temp);
			this.temp.length = 0;
			return this;
		};
		//设置隐藏普通后显示,一次性使用
		AutoHide.prototype.setAfterHideToShow = function(list, keyRespondObj, interval){
			if(this.isLockShow){
				return this;
			}
			list || (list = []);
			this.tempAfter.list = list || [];
			keyRespondObj && (this.tempAfter.keyRespondObj = keyRespondObj);
			interval && (this.tempAfter.interval = interval);
			return this;
		}
		//永久显示，不自动隐藏，参数为数组
		AutoHide.prototype.lockShow = function(list){
			if(this.isLockShow){
				return this;
			}
			this.isLockShow = true;
			var it = this;
			list || (list = []);

			clearTimeout(it.timer);
			var ds = _UTIL.analyseArray(_pluginToArray(it.temp), _pluginToArray(list));
			//tohide
			_hide(_arrayToPlugin(ds[1]));
			it.temp.length = 0;
			//toshow
			_show(_arrayToPlugin(ds[2]));
			it.always = list.slice(0);
			return this;
		};
		//解除永久显示
		AutoHide.prototype.removeLock = function(){
			if(!this.isLockShow)return this;
			this.isLockShow = false;
			this.show(this.always.slice(0));
			this.always.length = 0;
			return this;
		};
		return new AutoHide(interval || 5000, silenceKeyRespond || {});
	};


	//根据ID获取元素
	_UTIL.getEl = function(id){
		return this.Element.get(id);
	};
	//根据className获取元素,oParent必选
	_UTIL.getElByClass = function(className, oParent){
		return this.Element.getByClass(className, oParent);
	};
	//根据tagName获取元素,oParent可选
	_UTIL.getElByTag = function(tagName, oParent){
		return this.Element.getByTag(tagName, oParent);
	};
	return _UTIL;
});

/*
*	服务接口
*/
(function(root, factory){
	//默认加载工具
	var jsonpRequestTool = function() {
		var sList = [],
			sListMaxSize = 10;
		return function(url) {
			var s= document.createElement("script");
			s.type = "text/javascript";
			s.charset = "UTF-8";
			s.src = url + (/\?/.test(url) ? '&' : '?') + new Date().getTime();
			document.getElementsByTagName("head")[0].appendChild(s);
			sList.push(s);
			if(sList.length > sListMaxSize){
				document.getElementsByTagName("head")[0].removeChild(sList.shift());
			}
		};
	}();

	var base = $.getConstant("mongoDBUrl");
	//预定
	var base_reservation = 'http://61.181.152.145:3000/';
	//EMAIL
	var base_email = 'http://61.181.152.150:9984/';

	var option = {
		_base : base,
		userId : $.getUserId(),
		node : undefined,
		platform : 0,//GLOBAL_PLATFORM,
		callback : '!',
		loader : jsonpRequestTool
	};
	var items = {
		search : {
			getVodInfoById : ':base/search/vodInfo/vodId/:vodId/:callback?'// search the vodInfo by vodId
		},
		favorite : {
			getByContentId : ':base/favorite/get/:userId/:node/:platform/:contentId/:callback?'
		},
		history : {
			add : {
				// synchronize the play history, contentId :vod 或 剧集 ID;   sceneId：当播放的是子集的时候子集ID，否则是  'null' 字符串
				url : ':base/history/insert/:userId/:node/:platform/:contentId/:sceneId/:name/:category/:type/:timeStamp/:callback?'
				,
				sceneId : 'null'
				,
				type : 14
			}
			,
			getByContentId : ':base/playhistory/get/:userId/:node/:platform/:contentId/:callback?'//VOD是否已被收藏或存在播放记录
			,
			getBySeriesId : ':base/playhistorySceneBySeriesId/get/:userId/:node/:platform/:contentId/:callback?'//根据剧头获得子集播放记录
			,
			getBySceneContentId : ':base/playhistorySeries/get/:userId/:node/:platform/:contentId/:sceneId/:callback?'//取得剧集是否需要断点续播
		},
		reservation : {
			_mybase : base_reservation
			,
			//time格式 201506101710
			add : ':mybase/reservation/put/company/:node/user/:userId/channel/:channel/program/:name/time/:time/?callback=:callback?'
			,
			remove : ':mybase/reservation/del/company/:node/user/:userId/channel/:channel/program/:name/time/:time/?callback=:callback?'
			,
			get : ':mybase/reservation/get/company/:node/user/:userId/period/all?callback=:callback?'
		},
		channelfavorite : {
			add : ':base/channelfavorite/insert/:userId/:node/:platform/:channelNum/:callback?'
			,
			remove : ':base/channelfavorite/deletebychannelnum/:userId/:node/:channelNum/:callback?'
			,
			empty : ':base/channelfavorite/delete/:userId/:callback?'
			,
			getByChannelNum : ':base/channelfavorite/getByChannelnum/:userId/:node/:channelNum/:callback?'
			,
			get : ':base/channelfavorite/get/:userId/:callback?'
		},
		email : {
			_mybase : base_email
			,
			get : ':mybase/search/email/getEmailInfosByUserId/userId/:userId/beginNum/:beginNum/endNum/:endNum/:callback?'
			,
			getNums : ':mybase/search/email/getEmailInfosByUserId/userId/:userId/beginNum/0/endNum/0/:callback?'
		}
	};
	// root.SERVICES || (root.SERVICES = factory(items, option));
	if(!root.SERVICES){
		root.SERVICES = function(node){
			option.node = node || 'zte';
			root.SERVICES = factory(items, option);

			//添加I like接口
			root.SERVICES.iLike || (root.SERVICES.iLike = {});
			root.SERVICES.iLike.get = function(param, loader){
				this.getCallbackAfter = param.callback;
				root.SERVICES.search.getVodInfoById({
					vodId : param.vodId,
					callback : 'SERVICES.iLike.getCallback'
				}, option.loader);
			}
			root.SERVICES.iLike.getCallback = function(d){
				var likeCount = 0;
				d && d.vodInfo && d.vodInfo[0] && (likeCount = d.vodInfo[0].likeCount - 0);
				var after = this.getCallbackAfter;
				if(after){
					typeof after === 'function' && (after(likeCount));
					typeof after === 'string' && (eval(after + '(likeCount)'));
				}
			}
		};
	}
})(window, function(objs, option){
	var dftLoader = option.loader;
	var out = {};
	for(var i in objs){//添加分类
		out[i] = {};
		var obj = objs[i];
		if(objs.hasOwnProperty(i)){
			var base = obj._base || option._base;
			base = base.replace(/:(\d+|\/)/g, '&#58;$1').replace(/\/?$/, '/');//转义http及端口号:，并以/结尾
			for(var j in obj){//添加方法
				if(obj.hasOwnProperty(j) && /^[^_]/.test(j)){//非_开头
					var url = (obj[j].url || obj[j] || '').replace('\:base/', base).replace('\:userId', option.userId).replace('\:node', option.node).replace('\:platform', option.platform);
					out[i][j] = (function(_url, _cdata, _pcdata){
						return function(param, loader){
							var _param = param || {};
							var cbname = _param.callback ? _param.callback : option.callback;
							var url = _url.replace(/\:callback\??/, cbname).replace(/\:([^\/]*)/g, function(a, b){
								return (_param[b] || _cdata[b] || _pcdata['_' + b] || '').toString().replace(/^\/|\/$/g, '');//参数不能以/开头或结束
							});
							url = url.replace(/&#58;(\d+|\/)/g, ':$1');//http及端口号还原:
							//使用自定义加载
							if(typeof loader === 'function'){
								loader(url);
							}else{//使用默认加载方式
								dftLoader(url);
							}
						}
					})(url, obj[j], obj);
				}
			}
		}
	}
	return out;
});
var $U = window.UTIL;
function $get(url, asyn){
	// log(url + '  asyn: ' + asyn);
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, !!asyn);
	xhr.send(null);
}
//数据收集
var $V = {
	setStbtype : function(stbtype){
		this._stbtype = stbtype || 1;
		var x = 1;
		if(this._stbtype === 1 ) {
			x = $.getGlobalData("frameVersion") || 1;
			//中兴高清
			if(UTIL.STB.isZteZXV10B700){
				x = 2;
			}
		}else {
			var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
			if (contains(epgDomainUrl,"defaultgdgq")) {
				x = "2";
			}else if(contains(epgDomainUrl,"defaulttjotthd")) {
				x = "4";
			}
		}
		this._version = x;
	},
	_version : 1,
	_stbtype : 1,//1中兴 2华为
	_base : function(){
		return 'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?';
	},
	_baseParam : function(){
		return "userid=" + $.getUserId()
				+ "&stbid=" + (Authentication.CUGetConfig("STBID") || $.getGlobalData("StbId"))
				+ "&stbtype=" + this._stbtype + "&time=" + new Date().format('yyyyMMddhhmmss')
				+ "&processtype=MapInfoProcess&version=" + this._version;
	},
	vodPlay : function(mediacode, duration, vodname, categoryId,ztCategoryId){
		var url;
		if (ztCategoryId == undefined) {
            ztCategoryId = "";
        }
		if(this._stbtype === 1){//jsp转编码发送
			var name = encodeURI(encodeURI(vodname));
			url = $.epgDomain() + 'iptvepg/' + FRAME_NUMBER + '/vs_vod.jsp?times=' + duration + '&' + this._baseParam() + '&vodid=' + mediacode + '&colid=' + categoryId  +'&ztCategoryId='+ztCategoryId + '&vodname=' + name;
			if(!-[1,]){
				url = url.replace('vs_vod.jsp', 'vs_vod_js.jsp');
				UTIL.loaderData(url, null, null, {charset : 'GBK'});
			}else{
				var div = document.createElement("div");
				div.style.display="none";
				div.innerHTML='<iframe src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0"></iframe>';
				document.body.appendChild(div);
			}
		}else{
			url = this._base() + 'times=' + duration + '&' + this._baseParam() + '&vodid=' + mediacode + '&vodname=' + vodname + '&analysistype=vodbegin&colid=' + categoryId + '&ztCategoryId='+ztCategoryId;
			$get(url, true);
		}
	},
	serialPlay : function(mediacode, duration, serialName, serialNum, categoryId){
		var url = this._base() + '&vodid=' + mediacode + '&times=' + duration + '&vodname=' + serialName + '&analysistype=vodseriesbegin' + '&colid=' + categoryId;
		$get(url, true);
	},
	vodQ : function(type){
		var url = this._base() + this._baseParam();
		if (type == 'index'){
			url += "&analysistype=access&url=portal";
		} else if (type == 'color') {
			url += "&analysistype=color";
		} else {
			url += "&analysistype=vodend&quittype=osd";
		}
		$get(url, false);
	}
};

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
//获取当前节目套餐字符串，播放时数据收集用 例 'test1,test2'
function getChargeSpIds(contentId, seriesId){
	var chargeSpIds = AUTH_LIB && AUTH_LIB.getVsProductIds && AUTH_LIB.getVsProductIds(seriesId || contentId) || '';
	return chargeSpIds;
}
