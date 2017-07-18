/**
 * 华为EPG模板共通函数类
 *
 *  @author liyq
 */

 /**现网地址 
	var FRAME_NUMBER = "frame1030";

	// 站点文件夹
	var GLOBAL_SITE_NAME = "UNCEPGHD/";
**/


/**准生产地址
	var FRAME_NUMBER = "frame1075";

	// 站点文件夹
	var GLOBAL_SITE_NAME = "tjgdhdtest/";
 **/

 /**测试地址**/
	var FRAME_NUMBER = "frame1077";

	// 站点文件夹
	var GLOBAL_SITE_NAME = "siteForTestHD/";




// 分发节点名称 用于用户信息保存

var GLOBAL_NODE = "zte";
var GLOBAL_DIST_NODE = '1100000002';
var db_search_addr = $.getConstant("mongoDBUrl");

//记录当前播放内容类型 数据收集
PLAY_TYPE = "";

// 天津
var GLOBAL_AREA = "0022";
var AD_check;

/* cp code
 * 001: 保留，现用于测试
 * 002: 联通
 * 003: 移动
 * 004: 电信
 * 005: 天房
 */
var GLOBAL_CP = "002";
//测试分组
//var TEST_GROUP_FLAG_CHANNL = function () {
//    var teamId = top.jsGetControl('TEAM_ID');
//    var Ret = false;
//    if(teamId == '13') {
//        Ret = true;
//    }
//    return Ret;
//}();
EpgCommonClass.prototype.init = function() {
	document.onkeypress = keyEvent;
}

$.init();
/**
 * 页面初始化
 */
EpgCommonClass.prototype.initPage = function(flag) {

	FRAME_NUMBER = $.getGlobalData("frameNumber");

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
EpgCommonClass.prototype.playLiveOrRec = function(channelNum, startTime, endTime, flag) {

    var ReturnURL = window.location.href;
    //在彩虹音乐
    if($.dirInPlayControl() && ReturnURL.indexOf('error')<0){
        ReturnURL = $.popBack();
    }else if(ReturnURL.indexOf("FullScreenVod_HD.html")>0){
        ReturnURL = goBackUrl + "?categoryId=" + categoryIdJs + "&hidVodId=" + hidVodId;
    }else if(ReturnURL.indexOf("FullScreenTvod_HD.html")>0){
        ReturnURL = goBackUrl;
    }else if(ReturnURL.indexOf("FullScreenChannel_HD.html")>0){
        ReturnURL = backUrl;
    }else if(ReturnURL.indexOf("error_channel.html")>0 ||ReturnURL.indexOf("error_tvod.html")>0){
        ReturnURL = returnUrl;
    }else if(ReturnURL.indexOf("/shouyeZhiBo/")>0 || ReturnURL.indexOf("/wqxy/")>0 ||ReturnURL.indexOf("/noauth/")>0 ||ReturnURL.indexOf("/noSupport/")>0){//noauth 为彩虹音乐鉴权页 noSupport为特殊环境不支持订购页
        //彩虹无权限页跳转直播：前一页面是播控、静态页，做不同处理
		if(ReturnURL.indexOf("/rainBowLivePackageHD/noauth/")>0 || ReturnURL.indexOf("/rainBowPackageHD/noauth/")>0){
			var referrerUrl = document.referrer;
			if($.dirInPlayControl(referrerUrl)){
				ReturnURL = $.popBack();
			}else{
				$.popBack();
        ReturnURL = document.referrer;
			}
		}else{
			ReturnURL = document.referrer;
		}
    }else if(ReturnURL.indexOf("/zhiboPackage/")>0 || ReturnURL.indexOf("channel-buy-failed")>0 || ReturnURL.indexOf("channel-buy-success")>0 ){
        ReturnURL = $.getGlobalData("AUTH_CHANNEL_URL");
    }else if(ReturnURL.indexOf("detailPageHD")>=0 && ReturnURL.indexOf("categoryId=")>=0 && ReturnURL.indexOf("hidVodId=")>=0){
        ReturnURL = ReturnURL;
    }else if(ReturnURL.indexOf("searchFlat")>=0 && ReturnURL.indexOf("direction=1")>=0){
        ReturnURL = ReturnURL.substr(0,ReturnURL.indexOf("direction=1")-1);
    }else if (ReturnURL.indexOf("categoryId=")>=0) {
        ReturnURL = ReturnURL;
    }else{
        ReturnURL = ReturnURL.split("?")[0];
    }

    ReturnURL = encodeURIComponent(ReturnURL);

    $.saveGlobalData('tjiptvChannelReturnUrlForZte', ReturnURL);
    var subtypeParam = "",
        GDsubtype = $.getGlobalData("tjiptvPlayLiveOrRecSubtype"),
        playCtrlUrl = '';

    if (GDsubtype != undefined && GDsubtype != "" && GDsubtype != "undefined") {
        subtypeParam = "&subtype=" + GDsubtype;
        top.jsSetControl("GDsubtype", GDsubtype);
    }
    $.saveGlobalData("tjiptvPlayLiveOrRecSubtype", "undefined");

	//添加双屏后返回的地址在播控或鉴权页直接返回首页
    if ($.shouldReturnHome(ReturnURL)) {
        ReturnURL = $.epgDomain() + "iptvepg/" + FRAME_NUMBER + "/portal_default.jsp";
    }

    ztCategoryId = getZtCategoryId();

    if (startTime == undefined) { // 直播
        playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-zte-hd/FullScreenChannel_HD.html?ChannelNum=" + channelNum + subtypeParam + "&ztCategoryId=" + ztCategoryId + "&backUrl=" + ReturnURL;
        window.location.href = playCtrlUrl;
    } else { // 回放
        playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-zte-hd/FullScreenTvod_HD.html?ChannelNum=" + (channelTurn(channelNum, true) ? channelTurn(channelNum, true) : channelNum) + "&StartTime=" + startTime + "&EndTime=" + endTime + "&flag=" + flag + subtypeParam + "&ztCategoryId=" + ztCategoryId + "&backUrl=" + ReturnURL;
        window.location.href = playCtrlUrl;
    }
};

/**
 * 媒体播放
 * @param {Object} ContentID 内容ID
 * @param {Object} categoryId 媒体ID（栏目ID）
 * @param {Object} contentIds 连续播放内容ID（输入连续播放ID或空）
 * @param {Object} contentType 内容类型（输入播放内容类型{CHAN:0,VOD（外网VODID）:1,LANVOD（内网VODID）：2，TVOD：3})
 * @param {Object} mediaType 媒体ID（{1:正片，5片花，6假片花}）
 * @param {Object} seriesId 媒体ID（当播放为子集时，剧头ID，否则传入空串即可）
 * @param {Object} circleFlg  循环播放FLG（需要循环播放时‘1’否则不传或‘0’）
 * @param {Object} groupId 智能推荐所需分组信息，用于数据收集
 */
 EpgCommonClass.prototype.playVideo = function(ContentID, categoryId, sceneNum, contentType, mediaType, seriesId,circleFlg,contentIds, groupId) {
     adArray = [];
     $.saveGlobalData("tjIptvPlayAdPosition", adArray);
     //解决高标清由于传参位置不同，导致的专题不能联播问题
     if (typeof(sceneNum) == "object") {

         contentIds = sceneNum;
     }

     $.saveGlobalData("sceneNum", sceneNum);
     //$.saveGlobalData("AUTH_PASS", AUTH_PASS ? '1' : '0'); // 鉴权 0没通过  1通过

     if (mediaType == '5' || mediaType == '6') {
         playVideoEntity(ContentID, categoryId, sceneNum, contentIds, contentType, mediaType, seriesId, circleFlg);
         return;
     }

     var successUrl = window.location.href;

     if (chargeSpIdArr != undefined && chargeSpIdArr != "undefined" && chargeSpIdArr.length != 0) { // 最近观看 '继续观看'按钮
		for (var i=0; i<chargeSpIdArr.length; i++) {
			if(chargeSpIdArr[i] != '1001' && chargeSpIdArr[i] != '123456') {  // 排除基础套餐和测试套餐
				playVideoEntity(ContentID, categoryId, sceneNum, contentIds, contentType, mediaType, seriesId, circleFlg);
				return;
			}
		}
	 }
	 if (packagesIdArray != undefined && packagesIdArray != "undefined") { // 详情页进播控
		for(var i = 0; i < packagesIdArray.length; i++){
			for(var j in window.CHARGE_PARAM){
				if('1100000001' != j && packagesIdArray[i] == j){ // 排除基础套餐
                    playVideoEntity(ContentID, categoryId, sceneNum, contentIds, contentType, mediaType, seriesId, circleFlg, groupId);
					return;
				}
			}
		}
     }
	 if (successUrl.indexOf("buy-success.html") > -1) { // 订购成功页
         playVideoEntity(ContentID, categoryId, sceneNum, contentIds, contentType, mediaType, seriesId, circleFlg, groupId);
         return;
     }

     AD_check = setTimeout(function () {
         if (adPositionId == undefined || adPositionId == "undefined" || adPositionId == "" || mediaType == "5" || mediaType == "6") {
             $.saveGlobalData('tjIptvPlayListPosition', '0');
             playVideoEntity(ContentID, categoryId, sceneNum, contentIds, contentType, mediaType, seriesId, circleFlg, groupId);
         } else {
             $.saveGlobalData('tjIptvPlayListPosition', '-1');
             GLOBAL_ContentID = ContentID;
             GLOBAL_categoryId = categoryId;
            if (typeof contentIds === 'undefined' || contentIds == "null" || contentIds == ""|| contentIds == null || contentIds == "undefined") {
                 GLOBAL_contentIds = [];
             } else {
                 GLOBAL_contentIds = contentIds;
             }

            if (typeof contentType === 'undefined' || contentType == "null" || contentType == ""|| contentType == null || contentType == "undefined") {
                GLOBAL_contentType = "VOD";
            } else {
                GLOBAL_contentType = contentType;
            }

            if (typeof mediaType === 'undefined' || mediaType == "" || mediaType == "undefined" || mediaType == "null"|| mediaType == null) {
                GLOBAL_mediaType = "1";
            } else {
                GLOBAL_mediaType = mediaType;
            }
            if (typeof seriesId === 'undefined' || seriesId == "" || seriesId == "undefined" ||seriesId  == "null"|| seriesId == null) {
                GLOBAL_seriesId = "";
            } else {
                GLOBAL_seriesId = seriesId;
            }

            if (typeof circleFlg === 'undefined' || circleFlg == "" || circleFlg == "undefined" || circleFlg == "null"|| circleFlg == null) {
                 GLOBAL_circleFlg = '0';
             } else {
                 GLOBAL_circleFlg = circleFlg;
             }
            GLOBAL_groupId = groupId;
             analyseAdPosition();
         }
     }, 2500);
     GLOBAL_ContentID = ContentID;
     GLOBAL_categoryId = categoryId;

     if (typeof contentIds === 'undefined' || contentIds == "null" || contentIds == ""|| contentIds == null || contentIds == "undefined") {
         GLOBAL_contentIds = [];
     } else {
         GLOBAL_contentIds = contentIds;
     }

     if (typeof contentType === 'undefined' || contentType == "null" || contentType == ""|| contentType == null || contentType == "undefined") {
         GLOBAL_contentType = "VOD";
     } else {
         GLOBAL_contentType = contentType;
     }

     if (typeof mediaType === 'undefined' || mediaType == "" || mediaType == "undefined" || mediaType == "null"|| mediaType == null) {
         GLOBAL_mediaType = "1";
     } else {
         GLOBAL_mediaType = mediaType;
     }

     if (typeof seriesId === 'undefined' || seriesId == "" || seriesId == "undefined" ||seriesId  == "null"|| seriesId == null) {
         GLOBAL_seriesId = "";
     } else {
         GLOBAL_seriesId = seriesId;
     }

     if (typeof circleFlg === 'undefined' || circleFlg == "" || circleFlg == "undefined" || circleFlg == "null"|| circleFlg == null) {
         GLOBAL_circleFlg = '0';
     } else {
         GLOBAL_circleFlg = circleFlg;
     }

    GLOBAL_groupId = groupId;
     //当前播放广告状态
     if(seriesId!="" && typeof seriesId!= "undefined" && seriesId!="undefined" && seriesId!=null &&seriesId!="null"){
         firstTime = true;
         AdvertisingInterfaceForTP($.getUserId(), 1, 1, "", categoryId, seriesId);//有广告 电视剧
     } else {
         firstTime = true;
         AdvertisingInterfaceForTP($.getUserId(), 1, 1, "", categoryId, ContentID);//有广告 vod
     }
     return;
 };
/**
 * 调用广告系统(贴片)
 * stbid:机顶盒ID
 * action:投放类型      (1：视频前贴片广告   2：换台标版广告 3：音量标版广告  4：暂停标版广告   5：退出标版广告)
 * playtype:播放类型    （1：点播    2：回看   3：直播）
 * channel:目标频道ID
 * categoryid:栏目ID
 * contentid:内容ID
 * callback:回掉函数名称
 */
function AdvertisingInterfaceForTP(stbid,action,playtype,channel,categoryid,contentid){
    var url = "http://61.181.152.158:9991/IPTVADService/AdvertisementRequest?control=1&stbid="+stbid+"&action="+action+"&playtype="+playtype+"&channel="+channel+"&categoryid="+categoryid+"&contentid="+contentid+"&mmmmm="+Math.random()+"&callback=playad" ;
    // var url = "http://61.181.152.154:31000/IPTVADService/AdvertisementRequest?control=1&stbid="+stbid+"&action="+action+"&playtype="+playtype+"&channel="+channel+"&categoryid="+categoryid+"&contentid="+contentid+"&mmmmm="+Math.random()+"&callback=playad" ;
	jsonpAD(url);
}
var jsonpAD = function() {
    var JSONP_REQUEST_FOR_USER_INFO;
    return function(url) {
        if(JSONP_REQUEST_FOR_USER_INFO){
            document.getElementsByTagName("head")[0].removeChild(JSONP_REQUEST_FOR_USER_INFO);
        }
        JSONP_REQUEST_FOR_USER_INFO= document.createElement("script");
        JSONP_REQUEST_FOR_USER_INFO.reload = "1";
        JSONP_REQUEST_FOR_USER_INFO.type = "text/javascript";
        //JSONP_REQUEST_FOR_USER_INFO.charset = "UTF-8";
        JSONP_REQUEST_FOR_USER_INFO.src = url;
        document.getElementsByTagName("head")[0].appendChild(JSONP_REQUEST_FOR_USER_INFO);
    };
}();

/**
 * 贴片广告回调函数
 * 复写原广告ID数组
 */
function playad(callback){
    clearTimeout(AD_check);
    if(callback.resourceid!=""){ // 有贴片广告
        $.saveGlobalData('tjIptvPlayADFlag', "true");
        $.saveGlobalData('tjIptvPlayListPosition', '-1');
        adArray = [];
        adArray.push(callback.resourceid); //复写原广告ID数组
        getAdArray();
    } else{
        $.saveGlobalData('tjIptvPlayListPosition', '0');
        playVideoEntity(GLOBAL_ContentID, GLOBAL_categoryId, $.getGlobalData("sceneNum"), GLOBAL_contentIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg, GLOBAL_groupId);
    }
    return false;
}


function playVideoEntity(ContentID, categoryId,sceneNum ,contentIds, contentType, mediaType, seriesId,circleFlg, groupId){
	var bp = 0;

	if($.getGlobalData('fullScreenVodStartTime') == 0){
	    $.saveGlobalData('fullScreenVodStartTime','undefined');
	}

    var cryUser =  $.getUserId();
	var ReturnURL;
	var currentUrl = window.location.href;
	if(currentUrl.indexOf("FullScreenTvod_HD.html")>0 || currentUrl.indexOf("FullScreenVod_HD.html")>0 || currentUrl.indexOf("playControl-zte-hd-new/vod.html")>0){
		ReturnURL = goBackUrl;
	}else if(currentUrl.indexOf("FullScreenChannel_HD.html")>0){
		ReturnURL =  backUrl;
	}else if(currentUrl.indexOf("auth_rainBow_hd") > 0){
		var backUrlArray = $.getGlobalData("backUrlArray");
		if (backUrlArray == undefined || backUrlArray == 'end') {
			return;
		}
		var arrayBak = backUrlArray.split("&sp;");
		var returnUrl = arrayBak[arrayBak.length - 1];
		ReturnURL = returnUrl;
	}else{
		ReturnURL = currentUrl.split("?")[0];
	}

	//栏目ID需要传递特殊处理参数categoryId
	var params = window.location.href.split("?");
	for(var i = 0; i < params.length; i++) {

		//如果categoryId是需要保存的栏目(导读)|广告位 或者 栏目（导读）这三种格式时
		if(params[i].indexOf("categoryId" + "=") > -1 && (params[i].indexOf("|") > -1 || params[i].length == 43 || params[i].length == 21)) {
			ReturnURL = params[0] + "?" + params[i];
			break;
		}
	}

    if(typeof(nowFullScreenVod)!="undefined"){
    	ReturnURL = $.getRequestParams("ReturnURL");
    }

	var continuousPlayFlag = 0;

	if (contentIds == undefined || contentIds.length == 0) {
		continuousPlayFlag = '0';
	} else {
		continuousPlayFlag = '1';
	}

    // 子集数不为空则为剧集播放
    if(sceneNum!= undefined && sceneNum!= "undefined" && sceneNum != "" && sceneNum != null){
        continuousPlayFlag = '1';
    }


	for(var i = 0; i < contentIds.length; i++) {
		$.saveGlobalData('tjIptvPlayListContentIds' + i, contentIds[i]);
	}

	$.saveGlobalData('tjIptvPlayListMaxTimes', contentIds.length);
    $.saveGlobalData('tjIptvPlayListTimes', '0');
    $.saveGlobalData('tjIptvPlayListADTimes', '0');
    $.saveGlobalData('tjIptvPlayListFirstContId', ContentID);

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

	$.saveGlobalData('tjIptvPlayListContentType', contentType);

	if (circleFlg == undefined) {
		circleFlg = '0';
	}

	$.saveGlobalData('tjIptvPlayListCircleFlag', circleFlg);

	if (mediaType == undefined) {

		mediaType = "1";
	}


	if($.getGlobalData("fullScreenVodStartTime") != undefined && $.getGlobalData("fullScreenVodStartTime") != "undefined") {
		bp = $.getGlobalData("fullScreenVodStartTime");
	}

	$.saveGlobalData('tjIptvPlayListmediaType', mediaType);
    if (groupId == undefined || groupId == "null") {
        groupId = "";
    }
    var epgDomain = $.epgDomain();

	//添加双屏后返回的地址在播控或鉴权页直接返回首页
	//if($.shouldReturnHome(ReturnURL)){
	//	ReturnURL = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/portal.jsp";
	//}

	ztCategoryId = getZtCategoryId();

	var playCtrlUrl = $.getConstant("serverUrl") + "resources/playControl-zte-hd/FullScreenVod_HD.html?ContentID=" + ContentID + "&UserID=" + cryUser + "&ContinuousPlayFlag=" + continuousPlayFlag + "&contentType=" + contentType+"&breakpoint=" + bp +
        "&mediaType=" + mediaType + "&sceneNum=" + sceneNum + "&categoryId=" + categoryId + "&seriesId=" + seriesId +"&circleFlg="+ circleFlg + "&ztCategoryId=" + ztCategoryId + "&groupId=" + groupId + "&ReturnURL=" + ReturnURL;
	window.location.href=playCtrlUrl;

}

EpgCommonClass.prototype.epgDomain = function() {

	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\//;

	var msg = top.jsGetControl('ServerAddress');
	msg = msg.match(reg);

	return msg;
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
	return $.getScenesServiceUrl(seriesId, sceneId, categoryId, type, callBack);
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
		if(type == "VOD"){

		var data = "search/Scenes/id/"+ seriesId + "/" + callBack;
		var url = db_search_addr + data;
		var JSONP;
		if (JSONP) {
			document.getElementsByTagName("head")[0].removeChild(JSONP);
		}
		JSONP = document.createElement("script");

		JSONP.type = "text/javascript";
		JSONP.src = url;
		//JSONP.charset = "UTF-8";
		document.getElementsByTagName("head")[0].appendChild(JSONP);
    	//var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_MultiSerPlay_1.jsp?programid=" + seriesId +
                                  //"&columnid=" + categoryId +
                                  //"&vodtype=10&fatherId=" + seriesId  +
                                  //"&sceneId=" + sceneId +
                                  //"&callback=" + callBack;
	}

	if(type == "LANVOD"){
    	var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/ZteId_MultiSerPlay.jsp?columnid=" + categoryId +
                                  "&vodtype=10&fatherId=" + seriesId +
                                  "&sceneId=" + sceneId +
                                  "&callback=" + callBack;

        return url;
	}
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

	var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER + "/vod_detail.jsp?columnid=" + category + "&programid=" + contentID + "&programtype=" + type + "&ReturnUrl=" + str;
	$.redirect(url);
	return;
};

/**
 *  小窗口播放
 *
 */
EpgCommonClass.prototype.callSizePlay = function(frameId,left,top,width,height,vodId,columnid) {

	SIZE_PLAYER.sizePlay(left,top,width,height,"VOD",vodId);  // TODO
};

/**
 *  小窗口直播
 *
 */
EpgCommonClass.prototype.callSizeLivePlay = function(frameId,left,top,width,height,channelNum) {
	// var newChannelNum = $.channelMap[channelNum];
	// if(newChannelNum == undefined){
		// newChannelNum = channelNum;
	// }
	SIZE_PLAYER.sizePlay(left,top,width,height,"CHAN",channelNum);// TODO
};

/**
 * 获取播放时间
 */
EpgCommonClass.prototype.getCurrentPlayTime = function() {
	 return SIZE_PLAYER.getCurrentPlayTime();
};

/**
 * 通过KEY取得用户身份确认后的userId
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getVerifyUserId = function() {
	return top.jsGetControl("verifyUserID");
};

/**
 * 通过KEY取得全局变量
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getUserId = function() {

	return top.jsGetControl("UserID");
};

/**
 * 显示焦点框
 */
EpgCommonClass.prototype.showFocusBorder = function() {
if (!ACTIVE_OBJECT.focusImg) {
		return;
	}

	// 智能机顶盒
	if(window.getComputedStyle){
		this.getElem('divImgBorder').style.visibility = "hidden";
		this.getElem('divYellowBorder').style.visibility = "hidden";
		this.getElem('divYellowBorder').style.left = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['left'];
		this.getElem('divYellowBorder').style.top = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['top'];
		this.getElem('yellowBorder').style.width = 1;
		this.getElem('yellowBorder').style.height = 1;

		for (var i = 0; i < ACTIVE_OBJECT.focusImg.length; i++) {

			if (ACTIVE_OBJECT.focusImg[i] === '#') {
				this.getElem('divYellowBorder').style.left = parseInt(document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['left']) - 4;
				this.getElem('divYellowBorder').style.top = parseInt(document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['top']) - 4;
				this.getElem('yellowBorder').style.width = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['width'] ;
				this.getElem('yellowBorder').style.height = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['height'];
				this.getElem('divYellowBorder').style.visibility = "visible";
			} else {
				this.getElem('divImgBorder').style.left = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['left'];
				this.getElem('divImgBorder').style.top = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['top'];
				this.getElem('imgBorder').style.width = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['width'];
				this.getElem('imgBorder').style.height = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['height'];
				this.getElem('imgBorder').src = ACTIVE_OBJECT.focusImg[i];
				this.getElem('divImgBorder').style.visibility = "visible";
			}

		}

	// 非智能机顶盒
	} else {

		if(navigator.appCodeName.indexOf("iPanel")>-1) {
			this.getElem('divImgBorder').style.visibility = "hidden";
			this.getElem('divYellowBorder').style.visibility = "hidden";
			this.getElem('divYellowBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left;
			this.getElem('divYellowBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top;
			this.getElem('yellowBorder').style.width = 1;
			this.getElem('yellowBorder').style.height = 1;

			for (var i = 0; i < ACTIVE_OBJECT.focusImg.length; i++) {
				if (ACTIVE_OBJECT.focusImg[i] === '#') {
					this.getElem('divYellowBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left - 4;
					this.getElem('divYellowBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top - 4;
					this.getElem('yellowBorder').style.width = this.getElem(ACTIVE_OBJECT.key).style.width ;
					this.getElem('yellowBorder').style.height = this.getElem(ACTIVE_OBJECT.key).style.height;
					this.getElem('divYellowBorder').style.visibility = "visible";
				} else {
					this.getElem('divImgBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left;
					this.getElem('divImgBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top;
					this.getElem('imgBorder').style.width = this.getElem(ACTIVE_OBJECT.key).style.width;
					this.getElem('imgBorder').style.height = this.getElem(ACTIVE_OBJECT.key).style.height;
					this.getElem('imgBorder').src = ACTIVE_OBJECT.focusImg[i];
					this.getElem('divImgBorder').style.visibility = "visible";
				}

			}
		} else {
			this.getElem('divImgBorder').style.visibility = "hidden";
			this.getElem('divYellowBorder').style.visibility = "hidden";
			this.getElem('divYellowBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left;
			this.getElem('divYellowBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top;
			this.getElem('yellowBorder').style.width = 1;
			this.getElem('yellowBorder').style.height = 1;
			for (var i = 0; i < ACTIVE_OBJECT.focusImg.length; i++) {
				if (ACTIVE_OBJECT.focusImg[i] === '#') {
					this.getElem('divYellowBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left - 4;
					this.getElem('divYellowBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top - 4;
					this.getElem('yellowBorder').style.width = this.getElem(ACTIVE_OBJECT.key).style.width - 9;
					this.getElem('yellowBorder').style.height = this.getElem(ACTIVE_OBJECT.key).style.height;
					this.getElem('divYellowBorder').style.visibility = "visible";
				} else {
					this.getElem('divImgBorder').style.left = this.getElem(ACTIVE_OBJECT.key).style.left;
					this.getElem('divImgBorder').style.top = this.getElem(ACTIVE_OBJECT.key).style.top;
					this.getElem('imgBorder').style.width = this.getElem(ACTIVE_OBJECT.key).style.width;
					this.getElem('imgBorder').style.height = this.getElem(ACTIVE_OBJECT.key).style.height;
					this.getElem('imgBorder').src = ACTIVE_OBJECT.focusImg[i];
					this.getElem('divImgBorder').style.visibility = "visible";
				}

			}

		}

	}
};

/**
 * 看吧页面数据收集
 */
EpgCommonClass.prototype.recodeData = function(referpage,analysistype) {
	var referpage1 = document.referrer//加垂直入口记录

	if(referpage1.indexOf(FRAME_NUMBER) > -1){
	referpage1=referpage1.split(FRAME_NUMBER)[1].split('?')[0]
	}
	else{
	referpage1=referpage1.split('?')[0]
	}

	var d = new Date();
	var years = d.getYear();
	var month = add_zero(d.getMonth()+1);
	var days = add_zero(d.getDate());
	var hours = add_zero(d.getHours());
	var minutes = add_zero(d.getMinutes());
	var seconds=add_zero(d.getSeconds());

	var now = "" + years + month + days + hours + minutes + seconds;
	var version = "4";
	var url;

	// 如果是专题的页面
	if('zt'==analysistype) {

		ztCategoryId = $.getRequestParams("ztCategoryId");
		var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ '/ztsend_iptv.jsp?spName=' + encodeURI(encodeURI(referpage)) + '&referpage=' + encodeURI(encodeURI(referpage1));
		var div = document.createElement("div");
			div.style.display="none";

			div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
			document.body.appendChild(div);
		return;
	} else {
		url =  'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&referpage=' + referpage1 + '&refer=true&stbid=' + top.jsGetControl("STBID") + '&userid=' + $.getUserId() + '&analysistype=' + analysistype + '&url=' + window.location.href.split('?')[0] + "&version="+ version + "&stbtype=1"+ '&columnid=' + referpage;
	}

	var JSONP;
	if (JSONP) {
		document.getElementsByTagName("head")[0].removeChild(JSONP);
	}
	JSONP = document.createElement("script");

	JSONP.type = "text/javascript";
	JSONP.src = url;

	JSONP.charset = "UTF-8";

	document.getElementsByTagName("head")[0].appendChild(JSONP);
};

/**
 * 保存是否清空 二级列表全局变量(音乐星人物、娱乐图片栏目)
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.saveListClear = function(value) {

	$.saveGlobalData("picCate",value);
};

/**
 * 获得是否清空 二级列表全局变量(音乐星人物)
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getListClear = function() {

	return $.getGlobalData("picCate");
};


EpgCommonClass.prototype.recordDataOfDetailPage = function(productid,state) {

	var d = new Date();
	var years = d.getYear();
	var month = add_zero(d.getMonth()+1);
	var days = add_zero(d.getDate());
	var hours = add_zero(d.getHours());
	var minutes = add_zero(d.getMinutes());
	var seconds=add_zero(d.getSeconds());
	var now = "" + years + month + days + hours + minutes + seconds;

	var version = "4"; //$.getGlobalData("frameVersion");

	var url =  'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&stbid='+$.getGlobalData("StbId")+'&time='+now+'&userid='+$.getUserId()+'&stbtype=1&version='+version+'&processtype=MapInfoProcess&analysistype=product&productid='+productid+'&state='+state

	var JSONP;
	if (JSONP) {
		document.getElementsByTagName("head")[0].removeChild(JSONP);
	}
	JSONP = document.createElement("script");

	JSONP.type = "text/javascript";
	JSONP.src = url;

	JSONP.charset = "UTF-8";

	document.getElementsByTagName("head")[0].appendChild(JSONP);
}

/*抽奖发送数据收集*/
EpgCommonClass.prototype.recordDataOfLotteryDraw = function(vendor,prizes,phoneNum) {

		var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ '/lotteryDraw_send_iptv.jsp?vendor=' + encodeURI(encodeURI(vendor)) + '&prizes=' + encodeURI(encodeURI(prizes))+'&phoneNum='+phoneNum;
		var div = document.createElement("div");
			div.style.display="none";

			div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
			document.body.appendChild(div);

}


/**
 * 保存全局变量
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.getConstant = function(key) {

		var url = window.location.href;
		var strRegex = "^((?:https|http|ftp|rtsp|mms)?://(?:[0-9]{1,3}\.){3}[0-9]{1,3}.*/)pub/([A-Za-z1-9_-]+/)([A-Za-z1-9_-]+/).*$";
		var reg = new RegExp(strRegex);
		reg.exec(url.split("?")[0]);
		GLOBAL_PATH_PREFIX = RegExp.$1;
		GLOBAL_STB_NAME = RegExp.$2;
		siteName = RegExp.$3;

		if(url.indexOf("jsp")> -1 && url.indexOf("index.html") < 0){//中兴首页jsp跳转路径截取,从四色键跳转的jsp不进入此方法


			GLOBAL_PATH_PREFIX = top.jsGetControl("NEW_EPG_SERVICE_ADDRESS_ZTE");
			GLOBAL_SITE_NAME = top.jsGetControl("NEW_EPG_SERVICE_SITENAME_ZTE");
			GLOBAL_STB_NAME = top.jsGetControl("NEW_EPG_SERVICE_STBNAME_ZTE");
			this.saveGlobalData("GLOBAL_SITE_NAME", GLOBAL_SITE_NAME);
			this.saveGlobalData("GLOBAL_STB_NAME", GLOBAL_STB_NAME);

		}else if (GLOBAL_STB_NAME == 'resources/' || siteName == 'detailPage/' || siteName=='playControl-hw-hd/' || siteName=='playControl-zte-hd/' || siteName=='js/' || this.dirInPlayControl()){
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

/**
 * 保存全局变量
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.saveGlobalData = function(key, value) {


	var argv = new Array;
	argv.push(key);
	argv.push(value);
	top.controlWrite(2, argv);
};


/**
 * 页面跳转（不记录本页访问历史）
 */
EpgCommonClass.prototype.redirect = function(url) {
	window.location.href = url;
	//双屏临时注释掉否则跳转iframe层级不对，无法获得父页面socket
	//top.mainWin.document.location = url;
};

/**
 * 页面跳转（不记录本页访问历史,从顶层页面跳转）
 */
EpgCommonClass.prototype.redirectTop = function(url) {

	top.mainWin.document.location = url;
};

/**
 * 页面跳转（记录本页访问历史）
 */
EpgCommonClass.prototype.forward = function(url) {
	$.addBackUrl();
	if(/\?/.test(url)){  // direction 用于判断是正向进入详情页重新存groupId(智能推荐分组),当反向进入详情页时不做处理
		url += '&direction=1';
	}else{
		url += '?direction=1';
	}
	window.location.href = url;
	//双屏临时注释掉否则跳转iframe层级不对，无法获得父页面socket
	//top.mainWin.document.location = url;
};



/**
 * 通过KEY取得全局变量
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getGlobalData = function(key) {
	var out = top.jsGetControl(key);
	if(typeof out !== "undefined" && out !== 'undefined' && out !== ''){
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
};
/**
 * 订购
 */
EpgCommonClass.prototype.order = function(returnUrl) {
    // TODO
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
			//静音时，设置为非静音
			if(mp.getMuteFlag()){
				mp.setMuteFlag(0);
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
			if(currentVolume <= 0){
				mp.setMuteFlag(1);//设置为静音状态
			}
		}
	},
	"KEY_LIVE_BROADCAST" : function() {
		$.savePageInfo();
	    // 当前地址
		var currentUrl = window.location.href;
		var targetUrl = $.getConstant("baseUrl") + $.getConstant("siteName") + 'zhibo/index.html';
		if(currentUrl.indexOf("zhibo")> 0 || currentUrl.indexOf("resources/playControl-zte-hd") > 0){
			$.redirect(targetUrl);
		}else{
			if($.redirectFlag){
				$.redirect(targetUrl);
			}else{
				$.forward(targetUrl);
			}
		}

	},
	"KEY_REVIEW" : function() {
		$.savePageInfo();
	        // 当前地址
		var currentUrl = window.location.href;
		var targetUrl = $.getConstant("baseUrl") + $.getConstant("siteName") + 'zhibo/index.html';
		if(currentUrl.indexOf("zhibo")>0){
			$.redirect(targetUrl);
		}else{
			if($.redirectFlag){
				$.redirect(targetUrl);
			}else{
				$.forward(targetUrl);
			}
		}
	},
	"KEY_DIBBLING" : function() {
		// 当前地址
		var currentUrl = window.location.href;
		var targetUrl = $.getConstant("baseUrl") + $.getConstant("siteName") + 'kanbaIndex/news/';
		if($.redirectFlag){
			$.redirect(targetUrl);
		}else{
			$.forward(targetUrl);
		}

	},
	"KEY_INFORMATION" : function() {
		$.savePageInfo();
		// 当前地址
		var currentUrl = window.location.href.split("?")[0];

		// 我的IPTV目录
		var urlPrefix = $.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptv';

		// 最近观看地址
		var targetUrl =$.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptv/recent/';
		//$.savePageInfo();

		//在新播控时，使用上个url当返回路径

		if($.startWith(currentUrl, urlPrefix) ||$.dirInPlayControl(currentUrl) || currentUrl.indexOf("multiPackageHD")>0){
			$.redirect(targetUrl);
		}else{
			if($.redirectFlag){
				$.redirect(targetUrl);
			}else{
				$.forward(targetUrl);
			}
		}
	},
	"EVENT_UTILITY" : null,
	"DEFULT" : function() {
		return true;
	}
};

EpgCommonClass.prototype.channelMap = {  //TODO
	1 : 113,
	2 : 114,
	3 : 115,
	4 : 116,
	5 : 117,
	6 : 118,
	7 : 119,
	8 : 120,
	9 : 121,
	10 : 122,
	11 : 123,
	12 : 124,
	13 : 125,
	61 : 126,
	60 : 127,
	59 : 128,
	58 : 129,
	57 : 130,
	56 : 131,
	55 : 132,
	54 : 133,
	53 : 134,
	52 : 135,
	51 : 136,
	50 : 137,
	49 : 138,
	48 : 139,
	47 : 140,
	46 : 141,
	45 : 142,
	44 : 143,
	43 : 144,
	42 : 145,
	41 : 146,
	40 : 147,
	39 : 148,
	38 : 149,
	37 : 150,
	36 : 151,
	35 : 152,
	34 : 153,
	33 : 154,
	32 : 155,
	31 : 156,
	30 : 157,
	29 : 158,
	28 : 159,
	27 : 160,
	26 : 161,
	25 : 162,
	24 : 163,
	23 : 164,
	14 : 165,
	15 : 166,
	16 : 167,
	17 : 168,
	18 : 169,
	19 : 170,
	20 : 171,
	21 : 172,
	22 : 173,
	100 : 212,
	999 : 233,
	0 : 292,
	0 : 293,
	0 : 294,
	0 : 296,
	0 : 297,
	0 : 298,
	0 : 299,
	91 : 303,
	92 : 304,
	93 : 305,
	94 : 306,
	95 : 307,
	62 : 312,
	105 : 332,
	106 : 333,
	101 : 334,
	0 : 336,
	402 : 394,
	800 : 413
};

/**
 * 根据演员检索
 */
EpgCommonClass.prototype.getSearchActor = function(actor, columnid, RETURN_URL) {

	return $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/vod_searchbyman_result.jsp?columnid="+columnid+"&actor="+ actor +"&ReturnUrl=" + RETURN_URL;
}

/**
 * 根据导演检索
 */
EpgCommonClass.prototype.getSearchDirector = function(director, columnid, RETURN_URL) {

	return $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/vod_searchbyman_result.jsp?columnid="+columnid+"&director="+ director +"&ReturnUrl=" + RETURN_URL;
}

/**
 *  按键事件
 */
function keyEvent(val) {
    if (val === undefined || val === 'undefined') {
        val = window.event;
    }
    if(typeof(val) == "object"){
        val = val.which ? val.which : val.keyCode;
    }

    // 通过按键值，取得keypressoption中的处理对象，假如处理对象是函数时，执行该函数，否则执行默认函数
    ( typeof ($.keypressoption[$.keymap[val]]) == "function" && $.keypressoption[$.keymap[val]]()) || $.keypressoption["DEFULT"]();

    return false;

}

/**
 *  数字按键响应
 */
// TODO
function pressNum(num) {

	if ($.channelNum.length >= 3) {
		return;
	}

    saveGlobalListPosition();
	$.channelNum += num;
	var viewSize = document.getElementsByName('page-view-size')[0].getAttribute('content');

	if(viewSize == "1280*720") {
		showChannelNum();
	} else {
		showChannelNumSD()
	}

	clearTimeout($.channelSwitchTimer);

	$.channelSwitchTimer = setTimeout(channelSwitch, 2000);
}

function showChannelNumSD() {

	if (document.getElementById('channelShowNumSD') == undefined) {
		numDiv = document.createElement("div");
		numDiv.setAttribute("id", "channelShowNumSD");
		numDiv.style.left = "375px";
		numDiv.style.top = "8px";
		numDiv.style.width = "200px";
		numDiv.style.height = "30px";
		numDiv.style.position = "absolute";
		numDiv.style.zIndex = "999";
		document.body.appendChild(numDiv);
	}

	var numTabdef = '<table width=200 height=30><tr align="right"><td><font color="#00ebff" size=20 font-family:黑体>';
	numTabdef += $.channelNum;
	numTabdef += '</font></td></tr></table>';
	document.getElementById("channelShowNumSD").innerHTML = numTabdef;
}

function saveGlobalListPosition(){
	// 当前地址
	var currentUrl = window.location.href;
	//双屏二级列表保存焦点
	if(currentUrl.indexOf("kanbaIndex") > 0 && currentUrl.indexOf("resources/playControl-zte-hd") < 0) {
		$.saveGlobalData("GlobalListPosition", $.listMenu.getSubPosition());
	} else if(currentUrl.indexOf("/VIP/") > 0 && currentUrl.indexOf("/wqxy/") < 0) {
		$.saveGlobalData("GlobalListImgPosition", $.listImgMenu.getSubPosition());
	}
}

function channelSwitch() {
    $.savePageInfo();
    //如果是高码率频道号 则进入错误页(author wangtao)
    if(channelTurn($.channelNum,true)){
        SIZE_PLAYER.destoryMP(); //关闭小窗口播放
        // var url = $.getConstant("serverUrl") + "resources/playControl-zte-hd/error/error_" + ( startTime ? "tvod" : "channel") + ".html?ReturnURL=" + window.location.href.split("?")[0];
        var curPage = window.location.href;
        var ReturnUrl = encodeURIComponent(curPage.split("?")[0]);
        if(curPage.indexOf("categoryId=")>=0 && curPage.indexOf("hidVodId=")>=0){
            ReturnUrl = encodeURIComponent(curPage);
        }
        var url = $.getConstant("serverUrl") + "resources/playControl-zte-hd/error/error_" + ( startTime ? "tvod" : "channel") + ".html?ReturnURL=" + ReturnUrl;
        window.location.href = url;
        return;
    }
    $.playLiveOrRec($.channelNum);
}

function showChannelNum() {

	if (document.getElementById('channelShowNum') == undefined) {

		numDiv = document.createElement("div");
		numDiv.setAttribute("id", "channelShowNum");
        //numDiv.style.left = "375px";
        //numDiv.style.top = "8px";
        numDiv.style.right = "142px";
        numDiv.style.top = "20px";
		numDiv.style.textAlign = "right";
		numDiv.style.height = "68px";
		numDiv.style.position = "absolute";
		numDiv.style.color = "#00EBFF";
		numDiv.style.zIndex = "999";
		numDiv.style.fontFamily = "微软雅黑";
		numDiv.style.fontSize = "72px";

		lineDiv = document.createElement("div");
		lineDiv.setAttribute("id", "channelShowLine");
        //lineDiv.style.left = "375px";
        //lineDiv.style.top = "8px";
        lineDiv.style.left = "900px";
        lineDiv.style.top = "39px";
		lineDiv.style.width = "200px";
		lineDiv.style.height = "30px";
		lineDiv.style.position = "absolute";
		lineDiv.style.zIndex = "999";

		document.body.appendChild(numDiv);
		document.body.appendChild(lineDiv);
	}

	document.getElementById("channelShowNum").innerHTML = $.channelNum;

	var strBottom = '';

	for (var i = 0; i < $.channelNum.length; i++) {

		strBottom += '_';
	}

	strBottom += '';
	var lineTabdef = '<table width=200 height=30><tr align="right"><td><font color="#00ebff" size=72 font-family:黑体>';
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

    this.muteFlag = (this.mp.getMuteFlag && this.mp.getMuteFlag()) || 0;
    this.panelTimer;
    this.volume = 0;
    // 小窗口播放标识 用于判断首页是否为第一屏  0为第一屏
    this.isGuidePage = $.getGlobalData("isGuidePage") || '0';

    this.bp=-1;
    this.sizePlay = function(left, top, width, height, type, code){

		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.playtype = type;
		this.mediaCode = code;


		var thisobj = this;

        //window.onunload = function() {
            thisobj.destoryMP();
        //};

        var params = "";
        if(type == "VOD"){


			if ($.getGlobalData("smallScreenPlayedTime") != undefined && $.getGlobalData("smallScreenPlayedTime") != "undefined") {
				this.bp = $.getGlobalData("smallScreenPlayedTime");
		        $.saveGlobalData("smallScreenPlayedTime", 'undefined');
			}else{
				this.bp = 0;
			}
			if(this.bp != -1){
				params = "type=VOD&mediacode=" + code + "&contenttype=1&breakpoint=" + this.bp;
			}else{
				params = "type=VOD&mediacode=" + code + "&contenttype=1&breakpoint=0";
			}
		}else{
			params = "type=CHAN&value=" + code + "&mediacode=" + code + "&contenttype=1";
		}

		var epgDomain = $.epgDomain();
		var jspPath = epgDomain + "iptvepg/" + FRAME_NUMBER + "/SIZE_PLAY_DATA.jsp";
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
			JSP_SCRIPT.src = url + "&random4cache=" + getCurrentTime("yyyyMMddhhmmss");
			document.getElementsByTagName("head")[0].appendChild(JSP_SCRIPT);
		};
	}();

	this.jspCallBack = function(data){
		if(!data.isSuccess){
			// TODO 错误处理
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
        //超女专区小窗口不显示音量
        //if(!/\/superGirl\//.test(window.location.href) && !(RESOLUTION && RESOLUTION == 'SD')){
            this.initDiv();
        //}
        this.initCtrl();
    };

    this.initDiv = function(){
        var content = '<div id="divMute" style="display:none;position:absolute;top:514px;left:60px;"><img style="position:absolute;width:55px;height:48px;" src="images/mute.png"></div>' +
            '<div id="divVolume" style="display:none;position:absolute;left:0;top:0;">' +
            '<div id="posv1" style="position:absolute;left:0px;top:572px;"><img style="position:absolute;" src="images/ditu.png" border="0" width="1280" height="148" /></div>' + //底图
            '<div id="posv2" style="position:absolute;left:239px;top:620px;"><img style="position:absolute;" src="images/yl.png" border="0" width="42" height="42" /></div>' + //音量图标
            '<div id="posv3" style="position:absolute;left:980px;top:620px;width:41px;height:27px;color:white;text-align:center;font-size:27px;font-family:微软雅黑;"></div>' + //音量值
            '<div id="posv4" style="position:absolute;left:301px;top:637px;"><img id="vprogressbar" style="position:absolute;z-index:99" src="images/jindutiao.png" border="0" width="0" height="5" /></div>' + //音量条
            '<div id="posv5" style="position:absolute;left:239px;top:620px;"><img style="position:absolute;" src="images/jy.png" border="0" width="42" height="42" /></div>' + // 静音图标
            '<div id="posv6" style="position:absolute;left:301px;top:637px;width:652px;height:5px;"><img style="position:absolute;" src="images/jinduditu.png" border="0" width="652" height="5" /></div>' + // 音量条底图
            '<div id="posv7" style="position:absolute;left:301px;top:629px;width:20px;height:20px;"><img id="divvPoint" style="position:absolute;z-index:100" src="images/gundong.png" border="0" width="20" height="20" /></div>' + //音量滚动点
            '</div>';

        var path = $.getConstant("serverUrl") + "resources/playControl-zte-hd/images/playcontrol/playChannelHD/yl_images";

        content = content.replace(/images/g, path);

        // 菜单容器层
        var divVolumeControl = document.createElement("div");
        divVolumeControl.id = "divVolumeControl";
        divVolumeControl.innerHTML = content;
        divVolumeControl.style.position = "absolute";
        divVolumeControl.style.top = "0";
        divVolumeControl.style.left = "0";
        divVolumeControl.style.zIndex = 9000;
        document.body.appendChild(divVolumeControl);
        // 盒子兼容 创维E910每次小窗口播放this.mp.getMuteFlag()都为0,即有声
        if(this.muteFlag != this.mp.getMuteFlag()){
            this.muteFlag = this.mp.getMuteFlag();
        }

        if(this.muteFlag){ // 当前为静音态,中兴重新播放小窗口this.mp.setMuteFlag()都为0,依据this.muteFlag重新设置静音状态
            $.getElem("divMute").style.display = "block";
        }else{
            $.getElem("divMute").style.display = "none";
        }
    };

    this.setVolumeItem = function(){
        if(this.muteFlag == 1){ //当前静音状态
            // 隐藏静音图标
            this.mp.setMuteFlag(0);
            this.muteFlag = 0;
            $.getElem("divMute").style.display = "none";
        }

        this.mp.setVolume(this.volume);
        // 显示音量面板
        $.getElem("divVolume").style.display = "block";
        $.getElem("posv2").style.visibility = "hidden"; //音量图标
        $.getElem("posv5").style.visibility = "hidden"; //静音图标

        if (this.volume == 0) {
            $.getElem("posv5").style.visibility = "visible";
        } else {
            $.getElem("posv2").style.visibility = "visible";
        }
        $.getElem("posv3").style.visibility = 'visible';
        $.getElem('posv3').innerHTML = this.volume / 5; //显示音量值
        // 总长 652
        var percent = this.volume/100;
        $.getElem('vprogressbar').style.width = 652 * percent + 'px'; //音量条
        $.getElem('divvPoint').style.left = -10 + 652 * percent + 'px'; //音量点

        this.doHidePannel();
    };

    this.doHidePannel = function(){
        clearTimeout(this.panelTimer);
        this.panelTimer = setTimeout(function() {
            $.getElem("divVolume").style.display = "none";
        }, 5000);
    };

	this.initCtrl = function(){

		// 定义按键
		$.keymap[261] = "KEY_MUTE";

		var thisObj = this;

        $.keyPressSettiing({
            "KEY_VOLUME_UP":function(){
                if(thisObj.isGuidePage == '0'){ // 有小窗口播放的屏有效
                    thisObj.volume = thisObj.mp.getVolume();
                    if (thisObj.volume >= 100) {
                        thisObj.volume = 100;
                    } else {
                        if(thisObj.muteFlag == 0){
                            thisObj.volume += 5;
                        }
                    }
                    thisObj.setVolumeItem();
                }
            },
            "KEY_VOLUME_DOWN":function(){
                if(thisObj.isGuidePage == '0') {
                    thisObj.volume = thisObj.mp.getVolume();
                    if (thisObj.volume <= 0) {
                        thisObj.volume = 0;
                    } else {
                        if(thisObj.muteFlag == 0){
                            thisObj.volume -= 5;
                        }
                    }
                    thisObj.setVolumeItem();
                }
            },
            "KEY_MUTE":function(){

                if(thisObj.isGuidePage == '0'){
                    thisObj.volume = thisObj.mp.getVolume();
                    //当前为静音状态,隐藏静音图标
                    if (thisObj.muteFlag == 1) {
                        thisObj.muteFlag = 0;
                        thisObj.mp.setMuteFlag(0);
                        $.getElem("divMute").style.display = "none";
                    } else { //当前为非静音状态,隐藏音量面板,显示静音图标
                        thisObj.muteFlag = 1;
                        thisObj.mp.setMuteFlag(1);
                        clearTimeout(this.panelTimer);
                        $.getElem("divVolume").style.display = "none";
                        $.getElem("divMute").style.display = "block";
                    }
                }
            }
        });
    };

	this.start = function(){
		this.initMediaPlay();
		if(this.playtype == "CHAN"){
			this.mp.leaveChannel();
			if(SIZE_PLAYER.mediaCode !=911){//导视小窗口不发数据收集
				setTimeout(function(){
					var channelParameter = LiveVarianceParameter.getLiveBasicParameter(SIZE_PLAYER.mediaCode,"wu",2);
					IPTVDATOOLS.sendAjaxRequest(channelParameter);
				},2000);
			}

		}
        this.mp.setSingleOrPlaylistMode(0);
		this.mp.setSingleMedia(this.json);
		this.mp.setAllowTrickmodeFlag(0);

		this.mp.setNativeUIFlag(0);
		this.mp.setMuteUIFlag(0);
		this.play();
	    if(this.playtype == "VOD"){
			var thisObj = this;
			// 数据收集
			setTimeout('dataCollectionFun()',2000);
		}
	};

	this.initMediaPlay = function(){
		var instanceId = this.mp.getNativePlayerInstanceID();
		var playListFlag = 0;
		var videoDisplayMode = 0;
		var muteFlag = 0;
		var subtitleFlag = 0;
		var videoAlpha = 0;
		var cycleFlag = 0;
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
			if (this.bp != -1) {
		        this.mp.playByTime(1,this.bp,1);
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
		if(!COLID){
			COLID = CATEGORY_ID;
		}
	    var data=VS.vodPlay(this.mediaCode, this.mp.getMediaDuration(), VODNAME, COLID);
        IPTVDATOOLS.sendAjaxRequest(data);
	};

	this.destoryMP = function(){
		if(this.playtype == "CHAN") {
			this.mp.leaveChannel();
		}
		this.mp.stop();
	};

	this.getCurrentPlayTime =function(){
		return this.mp.getCurrentPlayTime();
	};

}
var SIZE_PLAYER = new SizePlayer();

function dataCollectionFun() {
	Authentication.CUSetConfig('vodIndexQ', 'yes');
	if(!COLID){
		COLID = CATEGORY_ID;
	}
	ztCategoryId = getZtCategoryId();
	var data=VS.vodPlay(SIZE_PLAYER.mediaCode, SIZE_PLAYER.mp.getMediaDuration(), VODNAME, COLID,ztCategoryId);
	IPTVDATOOLS.sendAjaxRequest(data);
}

function getCurrentTime(format){
	var today = new Date();
	return today.format(format);
}

Date.prototype.format = function(format)
{
	var o =
	{
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(),    //day
		"h+" : this.getHours(),   //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format))
	format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
	if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
	return format;

}
/**********************************************
 * IPTVDA constants; 数据收集
 **********************************************/
var IPTVDASITE = "http://"+dataAddIP+"/EPGDataAnalysis/ReciveServlet?"; // 4TEST;
var version = "4";

// IPTVDA Utils;
var IPTVDATOOLS = {

	sendAjaxRequest : function(params) {
		//进入播控记录数据收集
		if(PLAY_TYPE == "vodPlay" || PLAY_TYPE == "serialPlay" || PLAY_TYPE == "tvodPlay"){
            PLAY_TYPE = "";
			var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER + '/vod_tvod_send_iptv.jsp?'+params;
			var div = document.createElement("div");
			div.style.display = "none";
			div.innerHTML = '<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
			document.body.appendChild(div);
			return;

		}

		var req;
		req=new XMLHttpRequest();

		req.open("GET", IPTVDASITE + params, true);
		req.send(null);
	} ,

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

}

// IPTVDA User Info Log CLASS;
var STBUserURLParameter = {

	// get the basic information according to user;
	getUserBasicParameter:function() {
		var	version = "4";
		return   "userid=" + top.jsGetControl("UserID")
			   + "&stbid=" + top.jsGetControl("STBID")
			   + "&stbtype=1" + "&time=" + IPTVDATOOLS.tranferTime2Str(new Date())
			   + "&processtype=MapInfoProcess&version=" + version;
	}
}

// IPTVDA Live Play Log Class;
var LiveVarianceParameter = {

	// get the Live number & Live name when user click on the remote handling;
	getLiveBasicParameter : function(liveNum,adname,type) {
	//	return STBUserURLParameter.getUserBasicParameter() + "&liveNum=" + liveNum + "&liveName=" + liveName;
		return STBUserURLParameter.getUserBasicParameter() + "&channelid=" + (channelTurn(liveNum, true) ? channelTurn(liveNum, true) : liveNum) + "&analysistype=channelcontinuebegin&adname=" + adname + "&pathid=" + type;
	},

	liveQ:function(type, quitType) {
		if(type=='index')
		{
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=access&url=portal";
		}
		else if(type=='color')
		{
			//Authentication.CUSetConfig('liveIndexQ', 'no');
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=color&quittype=" + quitType;
		}
		else
		{
			//Authentication.CUSetConfig('liveIndexQ', 'no');
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=access&quittype=osd";
		}
	},

		liveIn : function() {
		return STBUserURLParameter.getUserBasicParameter() + "&analysistype=channelstate";
	}
}

// video, serial, tvod playing OR quit logging class;
var VS={

	// play section;
    vodPlay:function(mediacode, duration, vodname ,vodTypeID,ztCategoryId, groupId)
	{
		PLAY_TYPE = "vodPlay";
		if (ztCategoryId == undefined) {
            ztCategoryId = "";
        }
        if (groupId == undefined) {
            groupId = "";
        }
        var chargeSpIds = getVsProductIds(mediacode);
		return 'vodid='+mediacode+'&vodname='+encodeURI(encodeURI(vodname))
        +'&analysistype=vodbegin'+'&times='+duration+'&colid=' + vodTypeID+'&ztCategoryId='+ztCategoryId+'&playtype='+PLAY_TYPE + '&chargeSpIds=' + chargeSpIds + '&groupId=' + groupId;
	},

    serialPlay:function(mediacode, duration, serialName, serialNum ,vodTypeID, vodseriesname,ztCategoryId, seriesId, groupId)
	{
		PLAY_TYPE = "serialPlay";
		if (ztCategoryId == undefined) {
            ztCategoryId = "";
        }
        if (groupId == undefined) {
            groupId = "";
        }
        var chargeSpIds = getVsProductIds(seriesId);
		return 'vodid='+mediacode + '&serialnum='+serialNum +'&times='+duration+'&vodname='+encodeURI(encodeURI(serialName))
           +'&analysistype=vodbegin'+'&colid=' + vodTypeID+'&ztCategoryId='+ztCategoryId+'&playtype='+PLAY_TYPE + '&chargeSpIds=' + chargeSpIds + '&groupId=' + groupId;
	},

/*
 *
 {"tvodname":"骞垮","processtype":"MapInfoProcess","time":"20120530150207",
  "stbid":"00100299007011500003B075D5C8473F","userid":"gd001",
  "tvodbegintime":"2012.05.30 09:10:00","analysistype":"tvodbegin","tvodchno":"7","tvodtimes":"1200","version":"1","stbtype":"1"}
 */

	// TVOD Play Format;
	tvodPlay: function(tvodchno, tvodname, duration, begintime)
	{
		PLAY_TYPE = "tvodPlay";
		return 'tvodchno=' + encodeURI(encodeURI(channelTurn(tvodchno, true) ? channelTurn(tvodchno, true) : tvodchno))
			   +"&tvodname="+encodeURI(encodeURI(tvodname))+"&tvodtimes="+ duration
			   + "&tvodbegintime=" + begintime + "&analysistype=tvodbegin"+'&playtype='+PLAY_TYPE;
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
	},
	ADQ:function(type,adname) {
			return STBUserURLParameter.getUserBasicParameter() + "&analysistype=adpop&adname="+adname+"&pathid="+type;
	},
	//回看连播遥控器事件数据收集
	reviewPlay:function(str){
        var stime = IPTVDATOOLS.tranferTime2Str(new Date());
        var eventData = str + "|" + stime;

		return   STBUserURLParameter.getUserBasicParameter()
               + "&eventdata=" + eventData + "&eventcode=03"
               + "&analysistype=event"
               + "&ignore=adnamepathid"
               ;
	}

}

//应用模块、首页导视时长数据收集
var KLogin = {

    kLog : function() {
        return STBUserURLParameter.getUserBasicParameter() + "&analysistype=kalaok";
    },
    yingyongLog : function() {
		return STBUserURLParameter.getUserBasicParameter() + "&analysistype=yingyong";
    },
    yyGameLog : function() {
		return STBUserURLParameter.getUserBasicParameter() + "&analysistype=yyGame";
    },
    leYuanLog : function() {
		return STBUserURLParameter.getUserBasicParameter() + "&analysistype=leyuan";
    },
    guideLog : function(length) {
		return STBUserURLParameter.getUserBasicParameter() + "&analysistype=portal&length="+length;
    }
}

// K 歌click data collection.
function ck() {
    var p = KLogin.kLog();
    IPTVDATOOLS.sendAjaxRequest(p);
}
// 应用click data collection.
function cyingyong() {
    var p = KLogin.yingyongLog();
    IPTVDATOOLS.sendAjaxRequest(p);
}
// 游戏click data collection.
function cgame() {
    var p = KLogin.yyGameLog();
    IPTVDATOOLS.sendAjaxRequest(p);
}

// 乐园click data collection.
function cleyuan() {
    var p = KLogin.leYuanLog();
    IPTVDATOOLS.sendAjaxRequest(p);
}

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
//超级女声
EpgCommonClass.prototype.playVideo_chjnsh = function(contentId, categoryId, categoryName){
	var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'zte';
	$.saveGlobalData('tjIptvPlayListTimes', '0');
	var ReturnURL;
	var currentUrl = window.location.href;
	if(currentUrl.indexOf("FullScreenTvod_HD.html")>0 || currentUrl.indexOf("FullScreenVod_HD.html")>0){
		ReturnURL = goBackUrl;
	}else if(currentUrl.indexOf("FullScreenChannel_HD.html")>0){
		ReturnURL =  backUrl;
	}else{
		ReturnURL = currentUrl.split("?")[0];
	}
	var _categoryName = encodeURIComponent(categoryName);
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "-hd-new/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&categoryName=" + _categoryName + "&seriesId=&multiVod=1&logoName=chjnsh&multiVodLoop=1&fromMini=1";
	//开机第一次加载才显示列表
	if($.getGlobalData('GlobalCJNSFirstLogin') === '1'){
		$.saveGlobalData2('GlobalCJNSFirstLogin', '2');
		url += '&first_kj=1';
	}
	url += "&ReturnURL=" + ReturnURL;
	$.forward(url);
};
//体育
EpgCommonClass.prototype.playVideo_ty = function(contentId, categoryId, categoryName){
	this.playVideoList('ty', contentId, categoryId, categoryName);
};
//新播
EpgCommonClass.prototype.playVideoList = function(type, contentId, categoryId, categoryName){
	switch(type){
		case 'qc':
			playVideo_instance({
				contentId : contentId,
				categoryId : categoryId,
				terminalPage : 'terminalPage_qc.html',
				group : 'qc'
			});
			break;
		case 'ty':
			playVideo_instance({
				contentId : contentId,
				categoryId : categoryId,
				categoryName : categoryName,
				group : 'ty',
				fromMini : 1,
				multiVod : 1,
				multiVodLoop : 1
			});
			break;
        case 'yfqnw':
            playVideo_instance({
                contentId : contentId,
                categoryId : categoryId,
                categoryName : categoryName,
                group : 'yfqnw',
                fromMini : 1,
                multiVod : 1,
                multiVodLoop : 1
            });
            break;
		default:
			playVideo_instance({
				contentId : contentId,
				categoryId : categoryId,
				categoryName : categoryName,
				group : 'ty',
				fromMini : 1,
				multiVod : 1,
				multiVodLoop : 1
			});
			break;
	}
	function playVideo_instance(opt){
		if(!opt)return;

	        var globalDataKey = {
	            "ty" : "GlobalTYFirstLogin",
	            "yfqnw" : "GlobalTYFirstLogin"
	        }[opt.group];

		var first_kj = '';
		//开机第一次加载才显示列表
		if(globalDataKey && $.getGlobalData2(globalDataKey) === '1'){
			$.saveGlobalData2(globalDataKey, '2');
			first_kj = 1;
		}
		var cfg = {
			ContentID : opt.contentId,
			categoryId : opt.categoryId,
			categoryName : encodeURIComponent(opt.categoryName || ''),
			fromMini : opt.fromMini || '',
			multiVod : opt.multiVod || '',
			multiVodLoop : opt.multiVodLoop || '',
    		logoName : opt.group || 'ty',
			first_kj : first_kj,
			UserID : $.getUserId(),
			ztCategoryId : getZtCategoryId(),
			contentType : 1,
			mediaType : 1,
			sceneNum : '',
			seriesId : '',
			terminalPage : opt.terminalPage || '',
			ReturnURL : ''
		};
		var _type = 'zte';

		$.saveGlobalData('tjIptvPlayListTimes', '0');

		var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "-hd-new/vod.html"

		var out = [];
		for(var key in cfg){
			out.push(key + '=' + cfg[key]);
		}
		url += '?' + out.join('&');

		if(/playControl/.test(window.location.href)){
			$.redirect(url);
		}else{
			$.forward(url);
		}
	};
};



//彩虹音乐-文字列表
EpgCommonClass.prototype.playVideo_chyy = function(opt){
	var _opt = opt || {};
	_opt.type = 5;
	this._playVideo_chyy(this.playVideo_chyy_getUrl(_opt));
};
//彩虹音乐-歌手
EpgCommonClass.prototype.playVideo_chyy_gs = function(opt){
	var _opt = opt || {};
	_opt.type = 6;
	this._playVideo_chyy(this.playVideo_chyy_getUrl(_opt));
};
//彩虹音乐
EpgCommonClass.prototype.playVideo_chyy_getUrl = function(opt){
	var cfg = {
		ContentID : opt.ContentID,
		categoryId : opt.categoryId,
		contentIds : opt.contentIds,
		seriesId : opt.seriesId || '',
		cycle : opt.cycle || 1,
		single : opt.single || 0,
		noList : opt.noList ? 1 : '',
		title : encodeURIComponent(opt.title),
		authed : opt.authed ? 1 : '',
		charge : opt.charge ? 1 : '',
		type : opt.type,
		contentType : opt.contentType || 1,
		mediaType : opt.mediaType || 1,
		sendVS : opt.sendVS || '',
		callback : opt.callback || '',
		width : opt.width || '',
		height : opt.height || '',
		left : opt.left || '',
		top : opt.top || ''
	};
	var url = $.getConstant("serverUrl") + 'resources/playControl-chyy-hd/miniPlay.html';
	var out = [];
	for(var key in cfg){
		out.push(key + '=' + cfg[key]);
	}
	url += '?' + out.join('&');
	return url;
};
//彩虹音乐
EpgCommonClass.prototype._playVideo_chyy = function(url){
	$.forward(url + '&a=' + new Date().getTime());
};

//获取URL
(function(){
    var _epgDomain = $.epgDomain();
    var _URLS = {
        "URL_JSP_CHANNEL" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/CHANNEL_DATA.jsp',
        "URL_JSP_CHANNEL_MINI" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/CHANNEL_MINI_DATA.jsp',
        "URL_JSP_VOD" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/VOD_DATA.jsp',
        "URL_JSP_TVOD_PRE" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/TVOD_DATA_PRE.jsp',
        "URL_JSP_TVOD" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/TVOD_DATA.jsp'
    }
    $.getUrl(_URLS);
})();

//盒子内置获取方法
EpgCommonClass.prototype.saveGlobalData2 = function(key, value) {
	top.jsSetControl(key, value + '');
};
//盒子内置保存方法
EpgCommonClass.prototype.getGlobalData2 = $.getGlobalData;
