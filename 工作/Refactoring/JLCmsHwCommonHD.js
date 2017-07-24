/**
 * 华为EPG模板共通函数类
 *
 *  @author liyq
 */

// 分发节点名称 用于用户信息保存
var GLOBAL_NODE = "huawei";
/**
 * 页面初始化
 */
EpgCommonClass.prototype.initPage = function(flag) {

	if ($.getRequestParams('tjiptvEpgInit') == '1') {

		$.initTjIptvGolbalVar();
	}

    //标清拉伸方法
	if(flag=='SD'){
    	var QFA_doc=document.getElementsByTagName('head')[0];
    	new_element=document.createElement("meta");
    	new_element.setAttribute("name","page-view-size");
    	new_element.setAttribute("content","644*534");
    	QFA_doc.appendChild(new_element);
	}

	//高清拉伸方法
	if(flag=='HD'){

    	var QFA_doc=document.getElementsByTagName('head')[0];
    	new_element=document.createElement("meta");
    	new_element.setAttribute("name","page-view-size");
    	new_element.setAttribute("content","1280*720");
    	QFA_doc.appendChild(new_element);
	}

	if(PAGE_INFO) {

		for(var i = 0; i < PAGE_INFO.length; i++) {
			for(var j = 0; j < PAGE_INFO[i].focusImg.length; j++) {
				if(PAGE_INFO[i].focusImg[j] != "#") {

					var img = new Image();
					img.src = PAGE_INFO[i].focusImg[j];
				}
			}

		}
	}

};

/**
 * 播放直播或者回放
 *
 * @param channelNum 直播号，回放请填写空串
 * @param channelId  回放频道Id，直播不用填写
 * @param startTime  回放开始时间，直播不用填写，格式：yyyymmddhhmmss
 * @param endTime    回放结束时间，直播不用填写，格式：yyyymmddhhmmss
 */
EpgCommonClass.prototype.playLiveOrRec = function(channelNum, startTime, endTime) {

	var url = window.location.href;

	var ReturnURL = encodeURIComponent(url.replace(/&?positive=[^&]*/g,''));

	var playCtrlUrl;

    if(startTime == undefined) {
    	//防止直播、回看页面重复进入，多次按返回才能退出
    	if(url.indexOf('channel.html?') > -1 || url.indexOf('tvod.html?') > -1){
    		var matchs = url.match(/&?ReturnURL=(.*)$/);
    		if(matchs){
    			ReturnURL = matchs[1];
    		}
    	}

		playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-hw-jl/channel.html?ChannelNum=" + channelNum + "&ReturnURL=" + ReturnURL;
        // 直播
        window.location.href = playCtrlUrl;
    }else {
		playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-hw-jl/tvod.html?ChannelNum=" + channelNum + "&StartTime=" + startTime + "&EndTime=" + endTime + "&ReturnURL=" + ReturnURL;
		// 回放
        window.location.href = playCtrlUrl;
	}
};

/**
 * 媒体播放
 * @param {Object} ContentID 内容ID
 * @param {Object} categoryId 媒体ID（栏目ID）
 * @param {Object} contentIds 连续播放内容ID（输入连续播放ID或空）
 * @param {Object} contentType 内容类型（输入播放内容类型{CHAN:0,VOD（外网VODID）:1,LANVOD（内网VODID）：2，TVOD：3})
 * @param {Object} mediaType 媒体ID（{1:正片，5片花}）
 * @param {Object} seriesId 媒体ID（当播放为子集时，剧头ID，否则传入空串即可）
 * @param {Object} circleFlg  循环播放FLG（需要循环播放时‘1’否则不传或‘0’）
 */
 EpgCommonClass.prototype.playVideo = function(ContentID, categoryId, sceneNum, contentType, mediaType, seriesId,circleFlg,contentIds) {
	//alert("adPositionId"+ adPositionId + "ContentID:" + ContentID +"categoryId:" + categoryId + "sceneNum:" + sceneNum + "contentType:" + contentType + "mediaType:" + mediaType + "seriesId:" + seriesId +"circleFlg:" + circleFlg + "contentIds:" + contentIds);
	$.saveGlobalData("sceneNum",sceneNum);

    if(adPositionId == undefined || adPositionId == "undefined" || adPositionId == "" || mediaType=="5"){

        playVideoEntity(ContentID, categoryId,sceneNum,contentIds, contentType, mediaType, seriesId, circleFlg);
    }else {
    	$.saveGlobalData('tjIptvPlayListPosition', '-1');
        GLOBAL_ContentID = ContentID;

        GLOBAL_categoryId = categoryId;

        if(contentIds == undefined){
            GLOBAL_contentIds = [];
        }else{
            GLOBAL_contentIds = contentIds;
         }

        if (contentType == undefined || contentType=="null") {
            GLOBAL_contentType  = "VOD";
        } else {
            GLOBAL_contentType = contentType;
        }

        if (mediaType == undefined) {
            GLOBAL_mediaType = "1";
        }else{
            GLOBAL_mediaType = mediaType;
        }

        if (seriesId == undefined) {
            GLOBAL_seriesId = "";
        }else{
            GLOBAL_seriesId = seriesId;
        }

        if (circleFlg == undefined) {
            GLOBAL_circleFlg = '0';
        }else{
            GLOBAL_circleFlg = circleFlg;
        }
        analyseAdPosition();
    }
};

function playVideoEntity(ContentID, categoryId,sceneNum ,contentIds, contentType, mediaType, seriesId,circleFlg){

	if($.getGlobalData('fullScreenVodStartTime') == 0){
	    $.saveGlobalData('fullScreenVodStartTime','undefined');
	}

    var cryUser = Authentication.CTCGetConfig("UserID");
    var ReturnURL;
	var currentUrl = window.location.href;


	if(currentUrl.indexOf("FullScreenTvod_HD.html")>0 || currentUrl.indexOf("FullScreenVod_HD.html")>0){

		ReturnURL = goBackUrl;
	}else if(currentUrl.indexOf("FullScreenChannel_HD.html")>0){

		ReturnURL =  backUrl;
	}else{

		ReturnURL = currentUrl;//currentUrl.split("?")[0];
	}

    /*if(nowFullScreenVod){
		alert("2-6")
    	ReturnURL = $.getRequestParams("ReturnURL");
    }*/

	var continuousPlayFlag = 0;

	if (contentIds == undefined || contentIds.length == 0) {
		continuousPlayFlag = '0';
	} else {
		continuousPlayFlag = '1';
	}

    // 子集数不为空则为剧集播放
    /*if(sceneNum!= undefined && sceneNum!= "undefined" && sceneNum != "" && sceneNum != null){
        continuousPlayFlag = '1';
    }*/

    //for (var i=0;i< contentIds.length;i++) {
        //$.saveGlobalData('tjIptvPlayListContentIds' + i, contentIds[i]);
    //s}

    //$.saveGlobalData('tjIptvPlayListMaxTimes', contentIds.length);

    //$.saveGlobalData('tjIptvPlayListTimes', '0');
    //$.saveGlobalData('tjIptvPlayListADTimes', '0');
    //$.saveGlobalData('tjIptvPlayListFirstContId', ContentID);
	var typeMap = {
		"CHAN" : "0",
		"VOD" : "1",
		"LANVOD" : "2",
		"TVOD" : "3"
	};

	if (contentType == undefined || contentType=="null") {
		contentType = "1";
	} else {

		contentType = typeMap[contentType];
	}

	//$.saveGlobalData('tjIptvPlayListContentType', contentType);

	if (circleFlg == undefined) {
		circleFlg = '0';
	}

	//$.saveGlobalData('tjIptvPlayListCircleFlag', circleFlg);

	if (mediaType == undefined) {

		mediaType = "1";
	}

	//$.saveGlobalData('tjIptvPlayListmediaType', mediaType);

    var epgDomain = $.epgDomain();
	//var playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-hw-jl/FullScreenVod_HD.html?ContentID=" + ContentID + "&UserID=" + cryUser + "&ContinuousPlayFlag=" + continuousPlayFlag + "&contentType=" + contentType +
    //    "&mediaType=" + mediaType + "&sceneNum=" + sceneNum + "&categoryId=" + categoryId + "&seriesId=" + seriesId +"&ReturnURL=" + ReturnURL;
	var playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-hw-jl/vod.html?ContentID=" + ContentID + "&UserID=" + cryUser + "&ContinuousPlayFlag=" + continuousPlayFlag + "&contentType=" + contentType +
        "&mediaType=" + mediaType + "&sceneNum=" + sceneNum + "&categoryId=" + categoryId + "&seriesId=" + seriesId +"&ReturnURL=" + ReturnURL;
	window.location.href=playCtrlUrl;
};

/**
 * 取得子集id，当前集数
 *
 * @param seriesId 剧集ID
 * @param sceneId  指定列表从哪个子集开始
 * @param categoryId 剧集所属栏目
 * @param type id类型   外网ID:"VOD"; 内网ID:"LANVOD"
 * @param 回调函数名称
 * @return 取子集服务的jsonp地址
 */
EpgCommonClass.prototype.getHDScenesServiceUrl = function(seriesId, sceneId, categoryId, type, callBack) {
	return  $.epgDomain() + "EPG/MediaServiceDev/SeriesInfoListHD.jsp?fatherId=" + seriesId + "&&sceneId=" + sceneId + "&&callback=" + callBack;
};

/**
 * 取得子集列表
 *
 * @param seriesId 剧集ID
 * @param sceneId  指定列表从哪个子集开始
 * @param categoryId 剧集所属栏目
 * @param type id类型   外网ID:"VOD"; 内网ID:"LANVOD"
 * @param 回调函数名称
 * @return 取子集服务的jsonp地址
 */
EpgCommonClass.prototype.getScenesServiceUrl = function(seriesId, sceneId, categoryId, type, callBack) {
	return $.epgDomain() + "EPG/MediaService/SeriesInfoListHD.jsp?fatherId=" + seriesId + "&&sceneId=" + sceneId + "&&callback=" + callBack;
};

/**
 * 跳转现网详细页
 *
 * @param contentId 内容ID
 * @param category 内容所属栏目
 * @param type 内容类型    "VOD";"SERIES"
 */
EpgCommonClass.prototype.forwardOnlineDetail = function(contentID, category, type){

	var str = window.location.href.split('?')[0];
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
		epgDomainUrl = epgDomainUrl.match(reg);

	// Ttypeid用于华为epg区分片花的播放方式，暂定为000
	var url = epgDomainUrl + "vod_FilmDetail_List.jsp?FILM_ID=" + contentID + "&ReturnUrl=" + str + "&&TYPE_ID=" + category;
	$.redirect(url);
};

/**
 *  小窗口播放
 *
 */
EpgCommonClass.prototype.callSizePlay = function(frameId,left,top,width,height,vodId,columnid) {
	SIZE_PLAYER.sizePlay(left,top,width,height,"VOD",vodId);
};

/**
 *  小窗口直播
 *
 */
EpgCommonClass.prototype.callSizeLivePlay = function(frameId,left,top,width,height,channelNum) {
	var newChannelNum = $.channelMap[channelNum];
	if(newChannelNum == undefined){
		newChannelNum = channelNum;
	}
	SIZE_PLAYER.sizePlay(left,top,width,height,"CHAN",newChannelNum);
};

/**
 * 显示焦点框
 */
EpgCommonClass.prototype.showFocusBorder = function() {

	if (!ACTIVE_OBJECT.focusImg || ACTIVE_OBJECT.focusImg.length === 0) {
		return;
	}

	var divImgBorder = this.getElem('divImgBorder');
	var imgBorder = this.getElem('imgBorder');
	var divYellowBorder = this.getElem('divYellowBorder');
	var yellowBorder = this.getElem('yellowBorder');
	var activeObj = this.getElem(ACTIVE_OBJECT.key);
	if(!activeObj)return;
	var left, top, width, height;

	if(window.getComputedStyle){// 智能机顶盒
		left = parseInt(document.defaultView.getComputedStyle(activeObj, null)['left']);
		top = parseInt(document.defaultView.getComputedStyle(activeObj, null)['top']);
		width = parseInt(document.defaultView.getComputedStyle(activeObj, null)['width']);
		height = parseInt(document.defaultView.getComputedStyle(activeObj, null)['height']);
	} else {// 非智能机顶盒
		left = parseInt(activeObj.style.left);
		top = parseInt(activeObj.style.top);
		width = parseInt(activeObj.style.width);
		height = parseInt(activeObj.style.height);
	}

	if(divImgBorder){
		divImgBorder.style.visibility = "hidden";
	}
	if(divYellowBorder){
		divYellowBorder.style.visibility = "hidden";
		divYellowBorder.style.left = left + 'px';
		divYellowBorder.style.top = top + 'px';

		yellowBorder.style.width = 1;
		yellowBorder.style.height = 1;
	}

	for (var i = 0; i < ACTIVE_OBJECT.focusImg.length; i++) {
		if (ACTIVE_OBJECT.focusImg[i] === '#') {
			if(divYellowBorder){
				divYellowBorder.style.left = (left - 4) + 'px';
				divYellowBorder.style.top = (top - 4) + 'px';
				yellowBorder.style.width = width + 'px';
				yellowBorder.style.height = height + 'px';
				divYellowBorder.style.visibility = "visible";
			}
		} else {
			if(divImgBorder){
				divImgBorder.style.left = left + 'px';
				divImgBorder.style.top = top + 'px';
				imgBorder.style.width = width + 'px';
				imgBorder.style.height = height + 'px';
				imgBorder.src = ACTIVE_OBJECT.focusImg[i];
				divImgBorder.style.visibility = "visible";
			}
		}
	}
};

/**
 * 看吧页面数据收集
 */
EpgCommonClass.prototype.recodeData = function(currentPage,analysistype,columnid) {

		var d = new Date();
		var years = d.getYear();
		var month = add_zero(d.getMonth()+1);
		var days = add_zero(d.getDate());
		var hours = add_zero(d.getHours());
		var minutes = add_zero(d.getMinutes());
		var seconds=add_zero(d.getSeconds());
		var now = "" + years + month + days + hours + minutes + seconds;

		var version = "2";

		var referpage = "";
		var backUrlArray = $.getGlobalData("backUrlArray");
		if (!backUrlArray || undefined == backUrlArray || 'end' == backUrlArray) {
			referpage = "";
		}else{
			var arrayBak = backUrlArray.split("&sp;");
			referpage = arrayBak.pop();
		}

		var url;

		if(undefined == columnid){
			columnid = referpage;
		}

	    //是否第一次开机
	    if(Authentication.CTCGetConfig("EPGDomainBackup") != Authentication.CTCGetConfig("EPGDomain")){
	    	// 判断是否是专题
			var MAC = Authentication.CTCGetConfig("mac");
			if('zt'==analysistype) {
				url =  'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?&processtype=MapInfoProcess&time=' +now  + "userid=" + $.getUserId() +"&stbModel="+Authentication.CUGetConfig("STBType")+ "&stbid=" + Authentication.CUGetConfig("STBID") + "&stbtype=5" + "&version=" + version + "&spName=" + currentPage + "&analysistype=login&MAC="+MAC;
			} else {
				url =  'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&userid=' + $.getUserId() +"&stbModel="+Authentication.CUGetConfig("STBType")+'&referpage=' + referpage +'&refer=true&stbid=' + Authentication.CUGetConfig("STBID") +  '&analysistype=login&url=' + window.location.href.split('?')[0] + "&version=2&stbtype=5&columnid=" + columnid+"&MAC="+MAC;
			}
			Authentication.CTCSetConfig("EPGDomainBackup",Authentication.CTCGetConfig("EPGDomain"));
	    }else{
	    	// 判断是否是专题
			var MAC = Authentication.CTCGetConfig("mac");
			if('zt'==analysistype) {
				url =  'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?&processtype=MapInfoProcess&time=' +now  + "userid=" + $.getUserId() + "&stbid=" +"&stbModel="+Authentication.CUGetConfig("STBType")+ Authentication.CUGetConfig("STBID") + "&stbtype=5" + "&version=" + version + "&spName=" + currentPage + "&analysistype=zt&MAC="+MAC;
			} else {
				url =  'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&userid=' + $.getUserId() + "&stbModel="+Authentication.CUGetConfig("STBType")+'&referpage=' + referpage +'&refer=true&stbid=' + Authentication.CUGetConfig("STBID") +  '&analysistype=' + analysistype + '&url=' + window.location.href.split('?')[0] + "&version=2&stbtype=5&columnid=" + columnid+"&MAC="+MAC;
			}
	    }

		var JSONP = document.createElement("script");

		JSONP.type = "text/javascript";
		JSONP.src = url;

		JSONP.charset = "UTF-8";

		document.getElementsByTagName("head")[0].appendChild(JSONP);

};
/**
 * 保存全局变量
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.saveGlobalData = function(key, value) {

	if(window.parent.saveGlobalData == undefined){
		Authentication.CUSetConfig(key,value);
		return;
	}

	window.parent.saveGlobalData(key,value);
};

/**
 * 通过KEY取得全局变量
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getGlobalData = function(key) {
	var out;
	if(window.parent.getGlobalData == undefined){
		out = Authentication.CUGetConfig(key);
	}else{
		out = window.parent.getGlobalData(key);
	}

	if(out !== null && typeof out !== "undefined" && out !== 'undefined' && out !== ''){
		return out;
	}
};

/**
 * 鉴权处理
 *
 *  @param {Object} contentId  内容ID
 * @param {Object} productId 产品ID
 * @param {Object} successUrl 成功URL
 * @param {Object} failUrl 失败URL
 */
EpgCommonClass.prototype.authentication = function(contentId, productId, successUrl, failUrl) {

	var userId = Authentication.CTCGetConfig("UserID");
	var userToken = Authentication.CTCGetConfig("UserToken");

	var str = window.location.href;

	// 添加当前浏览URL
	if (Authentication.CUGetConfig('tjIptvViewHistory') && Authentication.CUGetConfig('tjIptvViewHistory') !== '') {

		var returnUrl = Authentication.CUGetConfig('tjIptvViewHistory') + "|" + str.split("?")[0];
	} else {

		var returnUrl = str;
	}

	var productId = productId.toString();

	Authentication.CUSetConfig('tjIptvViewHistory', returnUrl);

	Authentication.CUSetConfig('tjIptvPlayContentId', contentId);

	Authentication.CUSetConfig('tjIptvPlayProductId', productId);

	// 调用鉴权接口
	window.location.href = "http://61.181.152.136:8080/CMS-port/cmsrequest/auth?userId=" + userId + "&contentId=" + contentId + "&productId=" + productId + "&userToken=" + userToken + "&successUrl=" + successUrl + "&failUrl=" + successUrl;

};

/**
 * 订购
 */
EpgCommonClass.prototype.order = function(returnUrl) {

	var spId = "12601";
	var contentId = $.getGlobalData("tjIptvPlayContentId");
	var userId = Authentication.CTCGetConfig("UserID");
	;
	var productId = $.getGlobalData("tjIptvPlayProductId");
	var serviceId = $.getGlobalData("tjIptvPlayProductId");
	var usertoken = Authentication.CTCGetConfig("UserToken");
	// var returnUrl = FROM_PAGE;
	var EPGDomain = $.EPGDomain();

	window.location.href = "http://60.29.150.44:33500/ACS/vas/productorder?SPID=" + spId + "&ContentID=" + contentId + "&UserID=" + userId + "&ProductID=" + productId + "&ServiceID=" + serviceId + "&UserToken=" + usertoken + "&Action=ProductOrder&ReturnURL=" + returnUrl;
};

/**
 * USERTOKEN重定向
 */
EpgCommonClass.prototype.userTokenRedirect = function() {
	var userToken = Authentication.CTCGetConfig("UserToken");

	if (!userToken || userToken === null || userToken === 'null' || this.trim(userToken) === '') {
		var url = window.location.href;

		if (url.indexOf('UserToken') > -1) {

			Authentication.CTCSetConfig('UserToken', getRequestParams('UserToken'));

			return;
		}
		var spId = "1";

		window.location.href = "http://60.29.150.44:33500/ACS/vas/affirmusertoken?SPID=" + spId + "&ReturnInfo=1&Action=UserTokenRequest&ReturnURL=" + url.split("?")[0];
	}
};

/**
 * USERTOKEN更新
 */
EpgCommonClass.prototype.userTokenUpdate = function(returnUrl) {

	var userToken = Authentication.CTCGetConfig("UserToken");
	var spId = "1";
	Authentication.CUSetConfig('tjIptvUserTokenUpdated', '1');

	window.location.href = "http://60.29.150.44:33500/ACS/vas/updateusertoken?SPID=" + spId + "&OldUserToken=" + userToken + "&Action=UserTokenExpired&ReturnURL=" + returnUrl;
};

/**
 * 按键相应配置
 */
EpgCommonClass.prototype.keypressoption = {

	"KEY_RETURN" : function() {
		$.back();

		return true;
	},
	"KEY_OK" : function() {
		$.pressOkActive();
	},
	"KEY_PAGEUP" : null,
	"KEY_PAGEDOWN" : null,
	"KEY_UP" : function() {

		$.getTargetObj(ACTIVE_OBJECT.pressUp);

		$.showFocusBorder();

		return true;
	},
	"KEY_LEFT" : function() {

		$.getTargetObj(ACTIVE_OBJECT.pressLeft);

		$.showFocusBorder();

		return true;
	},
	"KEY_RIGHT" : function() {

		$.getTargetObj(ACTIVE_OBJECT.pressRight);

		$.showFocusBorder();

		return true;
	},
	"KEY_DOWN" : function() {

		$.getTargetObj(ACTIVE_OBJECT.pressDown);

		$.showFocusBorder();

		return true;
	},
	"KEY_0" : function() {
		pressNum(0);
	},
	"KEY_1" : function() {
		pressNum(1);
	},
	"KEY_2" : function() {
		pressNum(2);
	},
	"KEY_3" : function() {
		pressNum(3);
	},
	"KEY_4" : function() {
		pressNum(4);
	},
	"KEY_5" : function() {
		pressNum(5);
	},
	"KEY_6" : function() {
		pressNum(6);
	},
	"KEY_7" : function() {
		pressNum(7);
	},
	"KEY_8" : function() {
		pressNum(8);
	},
	"KEY_9" : function() {
		pressNum(9);
	},
	"KEY_VOLUME_UP" : function() {
		if(mp != undefined && mp != "undefined" && mp != null){
			var currentVolume = mp.getVolume();
			if(currentVolume >= 100) {
				currentVolume = 100;
			} else {
				currentVolume += 5;
			}
			mp.setVolume(currentVolume);
		}
	},
	"KEY_VOLUME_DOWN" : function() {
		if(mp != undefined && mp != "undefined" && mp != null){
			var currentVolume = mp.getVolume();
			if(currentVolume <= 0) {
				currentVolume = 0;
			} else {
				currentVolume -= 5;
			}
			mp.setVolume(currentVolume);
		}
	},
	"KEY_LIVE_BROADCAST" : function() {
		var targetUrl = $.getConstant("siteUrl") + 'hindex/channelList/';
		$.clearBack();
		$.redirect(targetUrl);
	},
	"KEY_REVIEW" : function() {
		var targetUrl = $.getConstant("siteUrl") + 'hindex/channelList/';
		$.clearBack();
		$.redirect(targetUrl);
	},
	"KEY_DIBBLING" : function() {
		var targetUrl = $.getConstant("siteUrl") + 'hindex/vodPage/';
		$.clearBack();
		$.redirect(targetUrl);
	},
	"KEY_INFORMATION" : function() {
		var targetUrl = $.getConstant("siteUrl") + 'hindex/wd/recent/';
		$.clearBack();
		$.redirect(targetUrl);
	},
	"EVENT_UTILITY" : null,
	"DEFULT" : function() {
		return true;
	}
};

EpgCommonClass.prototype.channelMap = {

	1:329,
	2:328,
	3:327,
	4:326,
	5:325,

	11:293,
	12:330,
	13:331,
	14:332,
	15:333,
	16:334,
	17:335,
	18:336,
	19:337,
	20:338,
	21:361,
	//26:340,
	//68:341,

	201:250,
	202:251,
	203:252,
	204:253,
	205:213,
	206:255,
	207:256,
	208:372,
	209:257,
	210:258,
	211:375,
	212:259,
	213:254,

	301:278,
	302:291,
	303:280,
	304:281,
	305:264,
	306:272,
	307:260,
	308:276,
	309:265,
	310:283,
	311:274,
	312:370,
	313:271,
	314:277,
	315:284,
	316:268,
	317:266,
	318:261,
	319:279,
	320:275,
	321:263,
	322:289,
	323:286,
	324:290,
	325:282,
	326:269,
	327:273,
	328:285,
	329:287,
	330:371,
	331:267,
	332:295,
	333:294,
	334:288,
	335:292,
	336:296,

	401:297,
	402:298,
	403:299,
	404:300,
	405:301,
	406:302,
	407:374,
	408:304,
	409:305,
	410:306,
	411:307,
	412:308,
	413:309,
	414:310,
	415:311,
	416:312,
	417:313,
	418:369,
	419:315,
	420:316,
	421:317,
	422:318,
	423:368,
	424:321,
	425:322,
	426:323,
	427:324,
	428:367,
	429:366,
	430:365,

	500:364,
	501:241,
	502:373,
	503:235,
	504:236,
	505:237,
	506:239,
	507:238,
	508:242,
	509:243,
	510:240,
	511:363,
	512:245,
	513:246,
	514:247,
	515:248,
	516:249,
	517:517,

	601:601,
	602:602,
	603:603,
	604:604
};

EpgCommonClass.prototype.getSearchActor = function(actor, columnid, RETURN_URL) {

	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
	epgDomainUrl = epgDomainUrl.match(reg);

	return epgDomainUrl + "self_Search.jsp?ISFIRST=2&CONDITION="+ actor +"&TYPE=1&ReturnUrl=" + RETURN_URL;
};

EpgCommonClass.prototype.getSearchDirector = function(director, columnid, RETURN_URL) {

	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
	epgDomainUrl = epgDomainUrl.match(reg);

	return epgDomainUrl + "self_Search.jsp?ISFIRST=2&CONDITION="+ director +"&TYPE=2&ReturnUrl=" + RETURN_URL;
};

/**
 *  数字按键响应
 */
function pressNum(num) {

	if ($.channelNum.length >= 3) {

		return;
	}
	// 当前地址
	var currentUrl = window.location.href;
	//双屏二级列表保存焦点
	if(currentUrl.indexOf("kanbaIndex") > 0) {
		$.saveGlobalData("GlobalListJiLinPosition", $.listJiLinMenu.getSubPosition());
	} else if(currentUrl.indexOf("VIP") > 0) {
		$.saveGlobalData("GlobalListImgPosition", $.listImgMenu.getSubPosition());
	}

	$.channelNum += num;

	showChannelNum();
	clearTimeout($.channelSwitchTimer);
	$.channelSwitchTimer = setTimeout(channelSwitch, 3000);
}

function channelSwitch() {

	if($.channelMap[parseInt($.channelNum)] != undefined){
		$.savePageInfo();
		$.playLiveOrRec(parseInt($.channelNum, 10));
	}else{
		document.getElementById("channelShowNum").innerHTML="";
		$.channelNum="";
		noChannel();
		setTimeout("deleteNoChannel()",3000);
	}
}
//显示该频道不存在
function noChannel(){

		var rootElement = document.body;
		var newElement = document.createElement("div");
		newElement.id = "noChan";
		newElement.style.position = "absolute";
		newElement.style.left = "0px";
		newElement.style.top = "0px";
		newElement.style.width = "1280px";
		newElement.style.height = "720px";
		newElement.style.zIndex = "1000";
		var pic = $.getConstant("serverUrl") + 'resources/playControl-hw-jl/images/zhibo/noChannel.png';
		newElement.innerHTML = "<img src='"+ pic +"' border=\"0\" width=\"1280\" height=\"720\" />";
		rootElement.appendChild(newElement);
}

//移除频道不存在
function deleteNoChannel(){

    var my = document.getElementById("noChan");
    if (my != null)
        my.parentNode.removeChild(my);
 }

function showChannelNum() {

	if (document.getElementById('channelShowNum') == undefined) {

		numDiv = document.createElement("div");
		numDiv.setAttribute("id", "channelShowNum");
        //numDiv.style.left = "375px";
        //numDiv.style.top = "8px";
        numDiv.style.left = "1007px";
        numDiv.style.top = "39px";
		numDiv.style.width = "200px";
		numDiv.style.height = "30px";
		numDiv.style.position = "absolute";
		numDiv.style.zIndex = "999";

		lineDiv = document.createElement("div");
		lineDiv.setAttribute("id", "channelShowLine");
        //lineDiv.style.left = "375px";
        //lineDiv.style.top = "8px";
        lineDiv.style.left = "1007px";
        lineDiv.style.top = "39px";
		lineDiv.style.width = "200px";
		lineDiv.style.height = "30px";
		lineDiv.style.position = "absolute";
		lineDiv.style.zIndex = "999";

		document.body.appendChild(numDiv);
		document.body.appendChild(lineDiv);
	}

	var numTabdef = '<table width=200 height=30><tr align="right"><td><font color=green size=20 font-family:黑体>';
	numTabdef += $.channelNum;
	numTabdef += '</font></td></tr></table>';
	document.getElementById("channelShowNum").innerHTML = numTabdef;

	var strBottom = '';

	for (var i = 0; i < $.channelNum.length; i++) {

		strBottom += '_';
	}

	strBottom += '';
	var lineTabdef = '<table width=200 height=30><tr align="right"><td><font color=green size=20 font-family:黑体>';
	lineTabdef += strBottom;
	lineTabdef += '</font></td></tr></table>';
}

/**
 * 小窗口
 */
function SizePlayer(){

	// 播放器对象
	this.mp =  new MediaPlayer();

	// 媒体Json
	this.json = "";

	// 直播序号
	this.channelIndex = -1;

	// 传入参数 vodId 或 直播号
	this.mediaCode = "";

	// 播放类型
	this.playtype = "";

	// 六位 progid
	this.progId = "";

	this.left = 0;
	this.top = 0;
	this.width = 0;
	this.height = 0;

	this.muteFlag = 0;
	this.panelTimer;
	this.volume = 0;

	this.sizePlay = function(left, top, width, height, type, code){
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.playtype = type;
		this.mediaCode = code;

		var thisobj = this;
		window.onunload = function(){
			thisobj.destoryMP();
		};

		var params = "";
		if(type == "VOD"){
			params = "type=VOD&mediacode=" + code + "&contenttype=1";

		}else{
			params = "type=CHAN&value=" + code + "&mediacode=" + code + "&contenttype=1";
		}

		var epgDomain = $.epgDomain();

		var jspPath = epgDomain + "EPG/jsp/default/HD/SIZE_PLAY_DATA.jsp";
		var url = jspPath + "?" + params;
		this.jspLoadTool(url);
	};

	this.jspLoadTool = function() {
		var JSP_SCRIPT;
		return function(url) {
			if(JSP_SCRIPT){
				document.getElementsByTagName("head")[0].removeChild(JSP_SCRIPT);
			}
			JSP_SCRIPT= document.createElement("script");
			JSP_SCRIPT.type = "text/javascript";
			JSP_SCRIPT.charset = "UTF-8";
			JSP_SCRIPT.src = url + "&random4cache=" + Math.random();
			document.getElementsByTagName("head")[0].appendChild(JSP_SCRIPT);
		};
	}();

	this.jspCallBack = function(data){
		if(!data.isSuccess){
			// 错误处理
			// var errorMsg = data.errorMsg;
			// alert(errorMsg)
			return;
		}

		this.json = '[{mediaUrl:"'+data.mediaUrl+'",';
		this.json +=	'mediaCode:"' + this.mediaCode + '",';
		this.json +=	'mediaType:1,';
		this.json +=	'audioType:1,';
		this.json +=	'videoType:3,';
		this.json +=	'streamType:2,';
		this.json +=	'drmType:1,';
		this.json +=	'fingerPrint:0,';
		this.json +=	'copyProtection:1,';
		this.json +=	'allowTrickmode:0,';
		this.json +=	'startTime:0,';
		this.json +=	'endTime:10000.3,';
		this.json +=	'entryID:"jsonentry1"}]';

		this.channelIndex = data.channelIndex;
		this.progId = data.progId;
		this.start();
		this.initDiv();
		this.initCtrl();
	};

	this.initDiv = function(){
		var content = "<div id='divVolumeBg' style='position:absolute; left:0px; top:452px;'><img src='yl_ditu' width='1280' height='135' /></div><div id='divVolume' style='position:absolute; left:207px; top:479px; display:none;'><img src='yl_pic' width='82' height='82' /></div><div id='divMute' style='position:absolute; left:207px; top:479px; display:none;'><img src='jy' width='79' height='79' /></div><div id='divVolumeNum' style='position:absolute; left:300px; top:500px; font-size:28px; color:white; display:none;'></div><div id='divVolumeItem0' style='position:absolute; left:350px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem1' style='position:absolute; left:392px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem2' style='position:absolute; left:432px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem3' style='position:absolute; left:474px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem4' style='position:absolute; left:515px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem5' style='position:absolute; left:557px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem6' style='position:absolute; left:598px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem7' style='position:absolute; left:640px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem8' style='position:absolute; left:680px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem9' style='position:absolute; left:722px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem10' style='position:absolute; left:763px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem11' style='position:absolute; left:805px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem12' style='position:absolute; left:846px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem13' style='position:absolute; left:887px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem14' style='position:absolute; left:928px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem15' style='position:absolute; left:970px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem16' style='position:absolute; left:1011px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem17' style='position:absolute; left:1053px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem18' style='position:absolute; left:1094px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div><div id='divVolumeItem19' style='position:absolute; left:1135px; top:488px; display:none;'><img src='biao_pic' border='0' width='34' height='58' /></div>";
		var path = $.getConstant("serverUrl") + "resources/playControl-hw-jl/";

		var ditu = "images/playcontrol/playVodHD/yl_ditu.png";
		var yl = "images/playcontrol/playVodHD/yl.png";
		var jy = "images/playcontrol/playVodHD/jy.png";
		var biao = "images/playcontrol/playVodHD/biao.png";

		content = content.replace("yl_ditu",path + ditu);
		content = content.replace("yl_pic",path + yl);
		content = content.replace("jy",path + jy);
		content = content.replace(/biao_pic/g,path + biao);
		//content = content.replace(/display:none;/g,"display:block;");

		// 菜单容器层
		var divVolumeControl = document.createElement("div");
		divVolumeControl.id = "divVolumeControl";
		divVolumeControl.innerHTML = content;
		divVolumeControl.style.display = "none";
		document.body.appendChild(divVolumeControl);
	};

	this.setVolumeItem = function(){
		this.mp.setMuteFlag(0);
		this.mp.setVolume(this.volume);

		// 显示音量图标隐藏静音图标
		$.getElem("divVolume").style.display = "";
		$.getElem("divMute").style.display = "none";

		// 隐藏所有音量图标
		for(var i=0;i<20;i++) {
			$.getElem("divVolumeItem"+i).style.display = "none";
		}

		var showVolume = this.volume/5;

		// 根据当前音量显示音量图标
		for(var j=0;j<showVolume;j++) {
			$.getElem("divVolumeItem"+j).style.display = "";
		}

		$.getElem("divVolumeNum").innerHTML = showVolume;
		$.getElem("divVolumeNum").style.display = "";

		// 显示音量面板
		$.getElem("divVolumeControl").style.display = "";

		this.doHidePannel();
	};

	this.doHidePannel = function(){
		clearTimeout(this.panelTimer);
		this.panelTimer = setTimeout(function(){
			$.getElem("divVolumeControl").style.display = "none";
		}, 5000);
	};

	this.initCtrl = function(){

		// 定义按键
		$.keymap[261] = "KEY_MUTE";

		var thisObj = this;

		$.keyPressSettiing({
			"KEY_VOLUME_UP":function(){
				thisObj.volume = thisObj.mp.getVolume();
				if(thisObj.volume >= 100) {
					thisObj.volume = 100;
				} else {
					thisObj.volume += 5;
				}
				thisObj.setVolumeItem();
			},
			"KEY_VOLUME_DOWN":function(){
				thisObj.volume = thisObj.mp.getVolume();
				if(thisObj.volume <= 0) {
					thisObj.volume = 0;
				} else {
					thisObj.volume -= 5;
				}
				thisObj.setVolumeItem();
			},
			"KEY_MUTE":function(){
				if(thisObj.muteFlag == 1){
					thisObj.muteFlag = 0;
					thisObj.mp.setMuteFlag(0);
					thisObj.setVolumeItem();
				} else {
					thisObj.muteFlag = 1;
					thisObj.mp.setMuteFlag(1);

					// 显示静音图标隐藏音量图标
					$.getElem("divVolume").style.display = "none";
					$.getElem("divMute").style.display = "";
					$.getElem("divVolumeNum").style.display = "none";

					// 隐藏所有音量元素图标
					for(var i=0;i<20;i++) {
						$.getElem("divVolumeItem"+i).style.display = "none";
					}

					// 显示音量面板
					$.getElem("divVolumeControl").style.display = "";

					this.doHidePannel();
				}
			}
		});
	};

	this.start = function(){
		this.initMediaPlay();
		if(this.playtype == "CHAN"){
			this.mp.leaveChannel();
		}

		this.mp.setSingleMedia(this.json);
		this.mp.setAllowTrickmodeFlag(0);

		this.mp.setNativeUIFlag(0);
		this.mp.setMuteUIFlag(0);
		this.play();

	    if(this.playtype == "VOD"){
			var thisObj = this;

			// 数据收集
			setTimeout(function(){thisObj.dataCollection();},2000);
		}
	};

	this.initMediaPlay = function(){
		var instanceId = this.mp.getNativePlayerInstanceID();
		var playListFlag = 0;
		var videoDisplayMode = 0;
		var muteFlag = 0;
		var subtitleFlag = 0;
		var videoAlpha = 0;
		var cycleFlag = 1;
		var randomFlag = 0;
		var autoDelFlag = 0;
		var useNativeUIFlag = 1;
		this.mp.initMediaPlayer(instanceId,playListFlag,videoDisplayMode,this.height,this.width,this.left,this.top,muteFlag,useNativeUIFlag,subtitleFlag,videoAlpha,cycleFlag,randomFlag,autoDelFlag);
	};

	this.play = function(){
		this.mp.setVideoDisplayArea(this.left,this.top,this.width,this.height);
		this.mp.setVideoDisplayMode(0);
		this.mp.refreshVideoDisplay();

		if(this.playtype == "CHAN") {
			this.mp.joinChannel(this.channelIndex);
		}

		if(this.playtype == "VOD"|| this.playtype == "TVOD"){

			if ($.getGlobalData("smallScreenPlayedTime") != undefined && $.getGlobalData("smallScreenPlayedTime") != "undefined") {
				var type = 1;
				var speed = 1;

				this.mp.playByTime(type,$.getGlobalData("smallScreenPlayedTime"),speed);
			} else {
				this.mp.playFromStart();
			}
		}
	};

	this.joinChannel = function(index){
		this.channelIndex = index;
		this.mp.leaveChannel();
		this.mp.joinChannel(index);
	};

	this.dataCollection = function(){
		Authentication.CUSetConfig('vodIndexQ', 'yes');
	    var data=VS.vodPlay(this.progId, mp.getMediaDuration(), VODNAME, COLID);
        IPTVDATOOLS.sendAjaxRequest(data);
	};

	this.destoryMP = function(){
		if(this.playtype == "CHAN") {
			this.mp.leaveChannel();
		}
		this.mp.stop();
	};
}

var SIZE_PLAYER = new SizePlayer();

/**********************************************
 * IPTVDA constants; 数据收集
 **********************************************/
var IPTVDASITE = "http://"+dataAddIP+"/EPGDataAnalysis/ReciveServlet?"; // 4TEST;
var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
var version = "1";

// IPTVDA Utils;
var IPTVDATOOLS = {

	sendAjaxRequest : function(params) {
		var req=new XMLHttpRequest();
		req.open("GET", IPTVDASITE + params, false);
		req.send(null);
	},

	// format the date to timstr (ex. 20120101101033)
	tranferTime2Str : function(date) {
		var str = "";
		str += date.getYear();

		str +=   ((date.getMonth() < 9) ? ("0" + (date.getMonth() + 1)) : "" + (date.getMonth() + 1))
		   + ((date.getDate() < 10) ? ("0" + date.getDate()) : "" + date.getDate())
		   + ((date.getHours() < 10) ? ("0" + date.getHours()) : "" + date.getHours())
		   + ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : "" + date.getMinutes())
		   + ((date.getSeconds() < 10) ? ("0" + date.getSeconds()) : "" + date.getSeconds());

		return str;
	},

	// time edition;
	getFullDate: function(date) {
		var str = "";
		str += date.getYear();

		str +=   ((date.getMonth() < 9) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1))
			   + ((date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate());
		return str;
	}

};

// IPTVDA User Info Log CLASS;
var STBUserURLParameter = {

	// get the basic information according to user;
	getUserBasicParameter:function() {

		if (containsIPDATA(epgDomainUrl,"default")) {
			version = "2";
		}
		return   "userid=" + Authentication.CUGetConfig("UserID")
			   + "&stbid=" + Authentication.CUGetConfig("STBID")
			   + "&stbtype=5" + "&time=" + IPTVDATOOLS.tranferTime2Str(new Date())
			   + "&processtype=MapInfoProcess&version=" + version;
	}
};

// IPTVDA Live Play Log Class;
var LiveVarianceParameter = {

	// get the Live number & Live name when user click on the remote handling;
	getLiveBasicParameter : function(liveNum, liveName) {
		return STBUserURLParameter.getUserBasicParameter() + "&channelid=" + liveNum + "&analysistype=channelcontinuebegin";
	},
	getLiveBasicParameterContinue : function(liveNum) {
		return STBUserURLParameter.getUserBasicParameter() + "&channelid=" + liveNum + "&analysistype=channelstate";
	},

	/*
	直播首页退出
	*/
	liveQ:function(type, quitType) {
		if(type=='index')
		{
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=access&url=portal";
		}
		else if(type=='color')
		{
			Authentication.CUSetConfig('liveIndexQ', 'no');
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=color&quittype=" + quitType;
		}
		else
		{
			Authentication.CUSetConfig('liveIndexQ', 'no');
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=access&url=osd";
		}
	}

};


// video, serial, tvod playing OR quit logging class;
var VS={

	// play section;
	vodPlay:function(mediacode, duration, vodname ,vodTypeID)
	{
		return STBUserURLParameter.getUserBasicParameter()
		       +'&vodid='+mediacode+'&vodname='+vodname
		       +'&times='+duration+'&analysistype=vodbegin&colid=' + vodTypeID;
	},

	serialPlay:function(mediacode, duration, serialName, serialNum ,vodseriesname, vodTypeID)
	{
		return STBUserURLParameter.getUserBasicParameter()
	       +'&vodid='+mediacode +'&times='+duration+'&vodname='+serialName
	       +'&analysistype=vodseriesbegin'+'&colid=' + vodTypeID;
	},


	// TVOD Play Format;
	tvodPlay: function(tvodchno, tvodname, duration, begintime)
	{
		return STBUserURLParameter.getUserBasicParameter() + '&tvodchno=' + (tvodchno+"").replace('现网', '')
			   +"&tvodname="+tvodname+"&tvodtimes="+ duration
			   + "&tvodbegintime=" + begintime + "&analysistype=tvodbegin";
	},

	// quit section;
	vodQ:function(type, quitType) {
		if(type=='index')
		{
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=access&url=portal";
		}
		else if(type=='color')
		{
			Authentication.CUSetConfig("vodIndexQ", "no");
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=color&quittype=" + quitType;
		}
		else
		{
			Authentication.CUSetConfig("vodIndexQ", "no");
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=vodend&quittype=osd";
		}
	}

};

function containsIPDATA(string,substr,isIgnoreCase)
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

(function(){
    var _epgDomain = $.epgDomain(),
    	_siteUrl = $.getConstant('siteUrl');
    var _URLS = {
        "URL_JSP_CHANNEL" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/CHANNEL_DATA.jsp',
        "URL_JSP_CHANNEL_MINI" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/CHANNEL_MINI_DATA.jsp',
        "URL_JSP_VOD" : _epgDomain + 'EPG/MediaService/VOD_DATA.jsp',
        "URL_JSP_TVOD_PRE" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/TVOD_DATA_PRE.jsp',
        "URL_JSP_TVOD" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/TVOD_DATA.jsp',
        "URL_WAIT" : _siteUrl + 'hindex/wait/',
        "HOME" : _siteUrl + 'hindex/sy/'
        // "HOME" : Authentication.CUGetConfig('EPGDomain')
    }
    $.getUrl(_URLS);
})();

//设置数据收集类型
$V.setStbtype(5);

SERVICES(GLOBAL_NODE);

EpgCommonClass.prototype.saveGlobalData2 = function(key, value) {
	Authentication.CUSetConfig(key, value + '');
};