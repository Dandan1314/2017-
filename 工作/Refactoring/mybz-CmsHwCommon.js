/**
 * 华为EPG模板共通函数类
 *
 *  @author liyq
 */

// 分发节点名称 用于用户信息保存
var GLOBAL_NODE = "huawei";

// 用于双屏数据收集的栏目ID
var MOBILE_COLLECT_CATEGORY_ID = "10000100000000090000000000016405";

var db_search_addr = $.getConstant("mongoDBUrl");

var AD_check;
/**
 * 页面初始化
 */
EpgCommonClass.prototype.initPage = function() {
	if ($.getRequestParams('tjiptvEpgInit') == '1') {

		$.initTjIptvGolbalVar();
		
	//从OneKeySwitch.jsp的蓝色键跳转到新EPG页面（我的IPTV），记录上一个jsp页面地址
	}else if($.getRequestParams('tjiptvEpgInit') == '2'){
		var initBackUrl = $.getRequestParams('initRtnUrl');
		var backUrlArray = $.getGlobalData("backUrlArray");
		backUrlArray = backUrlArray + "&sp;" + initBackUrl;
		$.saveGlobalData("backUrlArray", backUrlArray);
	}

	if (PAGE_INFO) {

		for (var i = 0; i < PAGE_INFO.length; i++) {

			if (PAGE_INFO[i].focusImg != "#") {

				var img = new Image();
				img.src = PAGE_INFO[i].focusImg;
			}
		}
	}
};

/**
 * 播放直播或者回放
 * 
 * @param channelNum 直播号
 * @param startTime  回放开始时间，直播不用填写，格式：yyyymmddhhmmss
 * @param endTime    回放结束时间，直播不用填写，格式：yyyymmddhhmmss
 */
EpgCommonClass.prototype.playLiveOrRec = function(channelNum, startTime, endTime) {

	var ReturnURL = window.location.href;
	//新旧播控共存时临时使用，无权限页跳转直播使用
	if($.dirInPlayControl(ReturnURL) || ReturnURL.indexOf("/noauth/") > -1 || ReturnURL.indexOf("/payByVertical/") > -1){
		ReturnURL = $.popBack();
	}
	
	if (ReturnURL.indexOf('tjiptvEpgInit') > -1 || ReturnURL.indexOf('reset') > -1 ) {
		
		ReturnURL = ReturnURL.split("?")[0];
	}
	if(parent.backUrl==''||parent.backUrl==undefined||parent.backUrl=='undefined'||parent.backUrl==null) {
		
	} else {
		ReturnURL = parent.backUrl;
	}
	
	var subtypeParam = "";
	var GDsubtype = $.getGlobalData("tjiptvPlayLiveOrRecSubtype");	
	if(GDsubtype != undefined && GDsubtype != "" &&  GDsubtype != "undefined"){
		subtypeParam = "&GDsubtype=" + GDsubtype;
		
		$.saveGlobalData("GDsubTvodType", GDsubtype);	
	}
	$.saveGlobalData("tjiptvPlayLiveOrRecSubtype","undefined");	
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\//;
	epgDomainUrl = epgDomainUrl.match(reg);
    if(startTime == undefined) {
        // 直播
        top.location = epgDomainUrl + "en/ChanDirectAction.jsp?chanNum=" + channelNum  + subtypeParam + "&backurl=" + ReturnURL;
    }else {
		// 回放
        top.location =  epgDomainUrl + "hw_huifang_prepare.jsp?ChannelNum=" + channelNum + "&StartTime=" + startTime + "&EndTime=" + endTime + subtypeParam + "&backUrl="+ ReturnURL;
    }
};

/**
 * 贴片广告回调函数
 * 复写原广告ID数组
 */
function playad(callback){
    clearTimeout(AD_check);
	if(callback.resourceid!=""){
		$.saveGlobalData('tjIptvPlayListPosition', '-1');
		//第一个播放的视频是广告
		$.saveGlobalData('theFirstPlayIsAD', "true");		
		adArray = [];
		adArray.push(callback.resourceid); //复写原广告ID数组
		getAdArray();
	}
	else{
	    $.saveGlobalData('tjIptvPlayListPosition', '0');
		$.saveGlobalData('theFirstPlayIsAD', "false");
		playVideoEntity(GLOBAL_ContentID, GLOBAL_categoryId, GLOBAL_contentIds, GLOBAL_contentType, GLOBAL_mediaType, GLOBAL_seriesId, GLOBAL_circleFlg);
	}
	return false;
}

/**
 * 调用广告系统  
 * stbid:机顶盒ID
 * action:投放类型      (1：视频前贴片广告   2：换台标版广告 3：音量标版广告  4：暂停标版广告   5：退出标版广告) 
 * playtype:播放类型    （1：点播    2：回看   3：直播）
 * channel:目标频道ID
 * categoryid:栏目ID
 * contentid:内容ID
 * callback:回掉函数名称
 *        
 */
function AdvertisingInterface(stbid,action,playtype,channel,categoryid,contentid){
	//154 上线地址  158 测试地址
	var url = "http://61.181.152.154:31000/IPTVADService/AdvertisementRequest?stbid="+stbid+"&action="+action+"&playtype="+playtype+"&channel="+channel+"&categoryid="+categoryid+"&contentid="+contentid+"&mmmmm="+Math.random()+"&callback=playad" ;
	//var url = "http://61.181.152.158:9991/IPTVADService/AdvertisementRequest?stbid="+stbid+"&action="+action+"&playtype="+playtype+"&channel="+channel+"&categoryid="+categoryid+"&contentid="+contentid+"&mmmmm="+Math.random()+"&callback=playad" ;
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
		JSONP_REQUEST_FOR_USER_INFO.src = url //+"?" + new Date().getTime();
		document.getElementsByTagName("head")[0].appendChild(JSONP_REQUEST_FOR_USER_INFO);
	};
}();



/**
 * 媒体播放
 * @param {Object} ContentID 内容ID
 * @param {Object} categoryId 媒体ID（栏目ID）
 * @param {Object} contentIds 连续播放内容ID（输入连续播放ID或空）
 * @param {Object} contentType 内容类型（输入播放内容类型{CHAN:0,VOD（外网VODID）:1,LANVOD（内网VODID）：2，TVOD：3})
 * @param {Object} mediaType 媒体ID（{1:正片，5片花}）
 * @param {Object} seriesId 媒体ID（当播放为剧集子集时，剧头ID，否则传入空串即可）
 * @param {Object} circleFlg  循环播放FLG（需要循环播放时‘1’否则不传或‘0’）
 * @param {Object} topicSceneId 媒体ID（当播放为系列剧子集时，剧头ID，否则传入空串即可）
 */
EpgCommonClass.prototype.playVideo = function(ContentID, categoryId, contentIds, contentType, mediaType, seriesId,circleFlg, topicSceneId) {
    //默认第一个播放的视频不是广告
	$.saveGlobalData('theFirstPlayIsAD', "false");
	
    var AD_KEY = "open";
	//存广告播放开关
    $.saveGlobalData('tjIptvPlayAD_KEY', AD_KEY);
	if(AD_KEY=='open'){

		AD_check = setTimeout(function(){
			if(adPositionId == undefined || adPositionId == "undefined" || adPositionId == ""  || adPositionId == "null" || mediaType=="5"){
				$.saveGlobalData('tjIptvPlayListPosition', '0');
				playVideoEntity(ContentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg);
			}else {
				$.saveGlobalData('tjIptvPlayListPosition', '-1');
				GLOBAL_ContentID = ContentID;
			
				GLOBAL_categoryId = categoryId;
			
				if(contentIds == undefined){
					GLOBAL_contentIds = [];
				}else{
					GLOBAL_contentIds = contentIds;
				 }
				
				if (contentType == undefined) {
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
				//解析广告位 
				analyseAdPosition();  
			}
		},2500);
		GLOBAL_ContentID = ContentID;
		GLOBAL_categoryId = categoryId;
		if(contentIds == undefined) {
			GLOBAL_contentIds = [];
		} else {
			GLOBAL_contentIds = contentIds;
		}
		if(contentType == undefined) {
			GLOBAL_contentType = "VOD";
		} else {
			GLOBAL_contentType = contentType;
		}
		if(mediaType == undefined) {
			GLOBAL_mediaType = "1";
		} else {
			GLOBAL_mediaType = mediaType;
		}
		if(seriesId == undefined) {
			GLOBAL_seriesId = "";
		} else {
			GLOBAL_seriesId = seriesId;
		}
		if(circleFlg == undefined) {
			GLOBAL_circleFlg = '0';
		} else {
			GLOBAL_circleFlg = circleFlg;
		}
		//当前播放广告状态
	         if(seriesId!="" && seriesId!=undefined && seriesId!="undefined" && seriesId!=null &&seriesId!="null"){
				firstTime = true;
	         	AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, seriesId);//有广告 电视剧
	         }else{
	         	firstTime = true;
				if(topicSceneId!="" && topicSceneId!=undefined && topicSceneId!="undefined" && topicSceneId!=null && topicSceneId!="null"){
					$.saveGlobalData('tjIptvPlayListTopicSceneId', topicSceneId);
					AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, topicSceneId);//有广告 系列剧
				}else{
					AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, ContentID);//有广告 vod
				}
	         	
	         }
	}
	else{
		
		if(adPositionId == undefined || adPositionId == "undefined" || adPositionId == "null" || adPositionId == "" || mediaType=="5"){
			
			$.saveGlobalData('tjIptvPlayListPosition', '0');
			playVideoEntity(ContentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg);
		}else {
			$.saveGlobalData('tjIptvPlayListPosition', '-1');
			GLOBAL_ContentID = ContentID;
		
			GLOBAL_categoryId = categoryId;
		
			if(contentIds == undefined){
				GLOBAL_contentIds = [];
			}else{
				GLOBAL_contentIds = contentIds;
			 }
			
			if (contentType == undefined) {
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
	}
};

function playVideoEntity(ContentID, categoryId, contentIds, contentType, mediaType, seriesId,circleFlg){
	
	//第一条广告播放
   	if ($.startWith(ContentID,"AD")) {
   		 $.saveGlobalData('playOneIsAD','true');
		 //开始播放或连播的标识
		 $.saveGlobalData('isfirstOne','true');
   	}else{
		$.saveGlobalData('playOneIsAD','false');
		$.saveGlobalData('isfirstOne','null');
	}
    //TODO
	//media.js不能改，用这种方法暂时适配
	if($.getGlobalData('fullScreenVodStartTime')==='0'){
	    $.saveGlobalData('fullScreenVodStartTime','undefined');
	}
	
    var cryUser = Authentication.CTCGetConfig("UserID");

	var ReturnURL = window.location.href.split("?")[0];
	//在订购成功页，返回前一个页
	if(ReturnURL.indexOf('auth-ppv') > -1){
		ReturnURL = $.popBack();
	}

	//栏目ID需要传递特殊处理参数categoryId
	 var params=window.location.href.split("?");
     for (var i = 0; i < params.length; i++) {
	 
	    //如果categoryId是需要保存的栏目(导读)|广告位 或者 栏目（导读）这三种格式时
		if (params[i].indexOf("categoryId" + "=") > -1 && (params[i].indexOf("|") > -1 || params[i].length==43 || params[i].length==21)) {
			ReturnURL=params[0]+"?"+params[i];
			break;
		}
	}

	//下一个VOD的ID
	var nextVodId = "";
	
	//继续播放的标志
	var continuousPlayFlag;
	
	if (contentIds == undefined || contentIds.length == 0) {
		//如果列表为空，则不继续播放下一个
		continuousPlayFlag = '0';
		$.saveGlobalData('tjIptvPlayListRtnURL', ReturnURL);
	} else {

		continuousPlayFlag = '1';

		//记录当前页
		var tempRtnURL = ReturnURL;

		ReturnURL = $.getConstant('serverUrl') + "resources/common/huawei/playListSD/index.html";
		
		//标记:下一个总是取节目列表的第一个，考虑的是从单个节目直接进入251415
		nextVodId = contentIds[0];
		
		var maxLength = contentIds.length > 50 ? 50 : contentIds.length;

		for (var i=0;i< maxLength;i++) {
			$.saveGlobalData('tjIptvPlayListContentIds' + i, contentIds[i]);
		}
		//存最大的播放次数
		$.saveGlobalData('tjIptvPlayListMaxTimes', maxLength);
		
		
		$.saveGlobalData('tjIptvPlayListTimes', '0');
		$.saveGlobalData('tjIptvPlayListRtnURL', tempRtnURL);
		
		$.saveGlobalData('tjIptvPlayListFirstContId', ContentID);
		
		$.saveGlobalData('tjIptvPlayListSeriesId', seriesId);
		
		$.saveGlobalData('tjIptvPlayListCategoryId', categoryId);
	}
	
	var typeMap = {
		"CHAN" : "0",
		"VOD" : "1",
		"LANVOD" : "2",
		"TVOD" : "3"
	};

	if (contentType == undefined) {
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
	
	$.saveGlobalData('tjIptvPlayListmediaType', mediaType);
	
	var epgDomain = $.epgDomain();
	
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	
	var version = "1";
	
	if (contains(epgDomainUrl,"defaultgdgq")) {
		
		version = "2";
	}
	if (contains(epgDomainUrl,"defaulttjott")) {
		
		version = "3";
	}
	
	if (contains(epgDomainUrl,"defaulttjotthd")) {
		
		version = "4";
	}
	//正式播放
	ztCategoryId = getZtCategoryId();
	var chargeSpIds = getChargeSpIds(ContentID, seriesId);
	$.saveGlobalData('tjIptvPlayListZtCategoryId', ztCategoryId);
	$.saveGlobalData('tjIptvPlayListChargeSpIds', chargeSpIds);
	window.location.href = epgDomain + "EPG/MediaService/FullScreen.jsp?ContentID=" + ContentID + "&UserID=" + cryUser + "&ContinuousPlayFlag=" + continuousPlayFlag + "&contentType=" + contentType +
		"&mediaType=" + mediaType + "&nextVodId=" + nextVodId + "&categoryId=" + categoryId + "&chargeSpIds="+ chargeSpIds +"&stbVersion=" +version +  "&seriesId=" + seriesId + "&ztCategoryId=" + ztCategoryId + "&ReturnURL=" + ReturnURL;
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
		JSONP.charset = "UTF-8";
		document.getElementsByTagName("head")[0].appendChild(JSONP);

	}

	if(type == "LANVOD"){
		return $.epgDomain() + "EPG/MediaService/LanSeriesInfoList.jsp?fatherId=" + seriesId + "&&sceneId=" + sceneId + "&&callback=" + callBack;
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

	ztCategoryId = getZtCategoryId();
	
	document.getElementById(frameId).src = $.epgDomain() + "EPG/MediaService/PlayTrailerInVas.jsp?left=" + left + "&top=" + top + "&width=" + width + "&height=" + height + "&type=VOD&mediacode=" + vodId +"&ztCategoryId=" + ztCategoryId+ "&contenttype=1";
};

/**
 *  小窗口直播
 * 
 */
EpgCommonClass.prototype.callSizeLivePlay = function(frameId,left,top,width,height,channelNum) {
	
	channelNum = $.channelMap[channelNum];
	
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
	epgDomainUrl = epgDomainUrl.match(reg);
	
	document.getElementById(frameId).src = epgDomainUrl + "PlayTrailerInVas.jsp?left=" + left + "&top=" + top + "&width=" + width 
		+ "&height=" + height + "&type=CHAN&value=" + channelNum + "&mediacode=" + channelNum + "&contenttype=1";
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
				this.getElem('yellowBorder').style.width = document.defaultView.getComputedStyle(this.getElem(ACTIVE_OBJECT.key), null)['width'];
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
				this.getElem('yellowBorder').style.width = this.getElem(ACTIVE_OBJECT.key).style.width;
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

};

/**
 * 看吧页面数据收集 
 */
EpgCommonClass.prototype.recodeData = function(referpage,analysistype) {
	var referpage1 = document.referrer//加垂直入口记录
	if(referpage1.split('?')[0].indexOf("SaveCurrFocus.jsp") > -1){
		referpage1=referpage1.split('&url=')[1]
	}
	if(referpage1.split('?')[0].indexOf("/en/") > -1){
	referpage1=referpage1.split('/en/')[1].split('?')[0];
	}
	else{
	referpage1=referpage1.split('?')[0]
	}
	if (!NEED_DATA_RECODE) {
		
		return;
	}
	
	var d = new Date();
	var years = d.getYear();
	var month = add_zero(d.getMonth()+1);
	var days = add_zero(d.getDate());
	var hours = add_zero(d.getHours());
	var minutes = add_zero(d.getMinutes());
	var seconds=add_zero(d.getSeconds());
	
	var now = "" + years + month + days + hours + minutes + seconds;
	
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	
	var version = "1";
	
	if (contains(epgDomainUrl,"defaultgdgq")) {
		
		version = "2";
	}
	if (contains(epgDomainUrl,"defaulttjott")) {
		
		version = "3";
	}
	
	if (contains(epgDomainUrl,"defaulttjotthd")) {
		
		version = "4";
	}
	
	// 如果是专题的页面
	if('zt'==analysistype) {
		
		var url =$.epgDomain() + "EPG/MediaService/DataRecodeForTJIPTV.jsp?spName=" + encodeURI(encodeURI(referpage)) + '&referpage=' + encodeURI(encodeURI(referpage1));
		
		var div = document.createElement("div");
		div.style.display="none";
		div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
		document.body.appendChild(div);

		return;
	} else {
		var url =  'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&referpage=' + referpage1 + '&refer=true&stbid=' + Authentication.CUGetConfig("STBID") + '&userid=' + $.getUserId() + '&analysistype=' + analysistype + '&url=' + window.location.href.split('?')[0] + "&version="+ version + "&stbtype=2" + '&columnid=' + referpage;
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

EpgCommonClass.prototype.recordDataOfDetailPage = function(productid,state) {

	var d = new Date();
	var years = d.getYear();
	var month = add_zero(d.getMonth()+1);
	var days = add_zero(d.getDate());
	var hours = add_zero(d.getHours());
	var minutes = add_zero(d.getMinutes());
	var seconds=add_zero(d.getSeconds());
	var now = "" + years + month + days + hours + minutes + seconds;
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var version = "1";
	if (contains(epgDomainUrl,"defaultgdgq")) {
		
		version = "2";
	}
	if (contains(epgDomainUrl,"defaulttjott")) {
		
		version = "3";
	}
	
	if (contains(epgDomainUrl,"defaulttjotthd")) {
		
		version = "4";
	}
	
	var url =  'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&stbid='+Authentication.CUGetConfig("STBID")+'&time='+now+'&userid='+$.getUserId()+'&stbtype=2&version='+version+'&processtype=MapInfoProcess&analysistype=product&productid='+productid+'&state='+state
	
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

		var url =$.epgDomain() + "EPG/MediaService/DataRecodeForLotteryDrawTJIPTV.jsp?vendor=" + encodeURI(encodeURI(vendor)) + '&prizes=' + encodeURI(encodeURI(prizes))+'&phoneNum='+phoneNum;
		
		var div = document.createElement("div");
		div.style.display="none";
		if(pageType == "HD"){//ott机顶盒发数据会修改页面分辨率，发数据后将页面分辨率重新设置
			div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0"  onload="ztFinish()"> </iframe > ';
		}else{
			div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
		}
		
		document.body.appendChild(div);

}

/**
 * 保存全局变量
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.saveGlobalData = function(key, value) {
	
	Authentication.CUSetConfig(key, value + '');
	
	var keyInfo = checkKeys(key,0);
	
	if (keyInfo.hasKey == false) {
		
		var index = parseInt(keyInfo.maxIndex);
		
		if (index == 0) {
			
			Authentication.CUSetConfig('tjIptvGlobalKeys' + index,"," + key + ",");
		} else {
			
			var preKey = Authentication.CUGetConfig('tjIptvGlobalKeys' + (index-1))
		
			if (preKey.length >= 3000) {
				
				Authentication.CUSetConfig('tjIptvGlobalKeys' + index,"," + key + ",");
			} else {
				
				preKey = preKey + key + ',';
				
				Authentication.CUSetConfig('tjIptvGlobalKeys' + (index-1),preKey);
			}
		}
		
	}
};

function checkKeys(key,index) {
	
	var keys = Authentication.CUGetConfig('tjIptvGlobalKeys' + index);
	
	var result;
	
	if (keys == undefined || keys == 'undefined' || keys == '') {
		
		result = {hasKey:false, maxIndex: index};

		return result;
	}
	
	//var keyArray = keys.split(',');
	
	// var hasKey = false;
	
	// for (var i=0;i<keyArray.length;i++) {
// 		
		// if (key == keyArray[i]) {
// 			
			// hasKey = true;
// 			
			// break;
		// }
	// }
	if (keys.indexOf("," + key + ",") > -1) {
		
		result = {hasKey:true};
		
		return result;
	} else {
		
		return checkKeys(key,index+1);
	}
};

/**
 * 通过KEY取得全局变量
 *
 * @param {Object} key
 */
EpgCommonClass.prototype.getGlobalData = function(key) {
	var out = Authentication.CUGetConfig(key);
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
	"KEY_VOLUME_Mute" : function() {
		if(mp != undefined && mp != "undefined" && mp != null){
			var muteFlag = mp.getMuteFlag();
			if(muteFlag == 1){//如果为静音状态，设置为非静音状态
				mp.setMuteFlag(0);
			} else {// 否则设置为静音状态
				mp.setMuteFlag(1);
			}
		}
	},	
	"KEY_LIVE_BROADCAST" : function() {
		var currentUrl = window.location.href.split("?")[0];
		//在新播控时，使用上个url当返回路径
		if($.dirInPlayControl(currentUrl)){
			currentUrl = $.popBack();
		}
		var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
		var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
		epgDomainUrl = epgDomainUrl.match(reg);
		$.redirect(epgDomainUrl + "chan_RecordList.jsp?ISFIRST=1&ReturnUrl=" + currentUrl);
	},
	"KEY_REVIEW" : function() {
		var currentUrl = window.location.href.split("?")[0];
		//在新播控时，使用上个url当返回路径
		if($.dirInPlayControl(currentUrl)){
			currentUrl = $.popBack();
		}
		var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
		var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
		epgDomainUrl = epgDomainUrl.match(reg);
		$.redirect(epgDomainUrl + "tvod_progBillByRepertoire.jsp?ISFIRST=1&ReturnUrl=" + currentUrl);
	},
	"KEY_DIBBLING" : function() {
		var currentUrl = window.location.href.split("?")[0];
		//在新播控时，使用上个url当返回路径
		if($.dirInPlayControl(currentUrl)){
			currentUrl = $.popBack();
		}
		var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
		var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
		epgDomainUrl = epgDomainUrl.match(reg);
		$.redirect(epgDomainUrl + "vod_Category.jsp?MainPage=1&INDEXPAGE=0&ISFIRST=1&subjectType=10|0|4|9999&ReturnUrl=" + currentUrl);
		//$.redirect(epgDomainUrl + "vod_Category.jsp?MainPage=1&INDEXPAGE=0&ISFIRST=1&subjectType=10|0|4|9999&ReturnUrl="+"#categoryId#"+ $.getRequestParams("categoryId"));
	},
	"KEY_INFORMATION" : function() {
		
		// 当前地址
		var currentUrl = window.location.href.split("?")[0];
		
		// 我的IPTV目录
		var urlPrefix = $.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptv';
		
		// 最近观看地址
		var targetUrl = $.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptv/recent/';
		//在新播控时，无权限页跳转四色键时
		if($.startWith(currentUrl, urlPrefix) || $.dirInPlayControl(currentUrl) || currentUrl.indexOf("/noauth/") > -1 || currentUrl.indexOf("/payByVertical/") > -1){
			$.redirect(targetUrl);
		}else{
			$.forward(targetUrl);
		}
	},
	"EVENT_UTILITY" : null,
	"DEFULT" : function() {
		return true;
	}
};

EpgCommonClass.prototype.channelMap = {
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
	800 : 413,
	64 : 952
};

EpgCommonClass.prototype.getSearchActor = function(actor, columnid, RETURN_URL) {
	
	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
	epgDomainUrl = epgDomainUrl.match(reg);
	
	return epgDomainUrl + "self_Search.jsp?ISFIRST=2&CONDITION="+ actor +"&TYPE=1&ReturnUrl=" + RETURN_URL;
}

EpgCommonClass.prototype.getSearchDirector = function(director, columnid, RETURN_URL) {

	var epgDomainUrl = Authentication.CTCGetConfig('EPGDomain');
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\/EPG\/jsp\/[a-z,A-Z,0-9]*\/en\//;
	epgDomainUrl = epgDomainUrl.match(reg);
	
	return epgDomainUrl + "self_Search.jsp?ISFIRST=2&CONDITION="+ director +"&TYPE=2&ReturnUrl=" + RETURN_URL;
}

/**
 *  数字按键响应
 */
// TODO
function pressNum(num) {
	if ($.channelNum.length >= 3) {

		return;
	}

	$.channelNum += num;
	showChannelNum();
	clearTimeout($.channelSwitchTimer);
	$.channelSwitchTimer = setTimeout(channelSwitch, 1000);
}

function channelSwitch() {
	
	$.playLiveOrRec($.channelNum);
}

function showChannelNum() {

	if (document.getElementById('channelShowNum') == undefined) {

		numDiv = document.createElement("div");
		numDiv.setAttribute("id", "channelShowNum");
		numDiv.style.left = "375px";
		numDiv.style.top = "8px";
		numDiv.style.width = "200px";
		numDiv.style.height = "30px";
		numDiv.style.position = "absolute";
		numDiv.style.zIndex = "999";

		lineDiv = document.createElement("div");
		lineDiv.setAttribute("id", "channelShowLine");
		lineDiv.style.left = "375px";
		lineDiv.style.top = "8px";
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

	//document.getElementById("channelShowLine").innerHTML = lineTabdef;

}

//娱乐头条
EpgCommonClass.prototype.playVideo_yltt = function(contentId, categoryId){
	var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'hw';
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&seriesId=&multiVod=1&logoName=yltt&multiVodLoop=1";
	//开机第一次加载才显示列表
	if($.getGlobalData('GlobalYLTTFirstLogin') === '1'){
		$.saveGlobalData2('GlobalYLTTFirstLogin', '2');
		url += '&first_kj=1';
	}
	$.forward(url);
};
//超级女声
EpgCommonClass.prototype.playVideo_chjnsh = function(contentId, categoryId, categoryName){
	var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'hw';
	var _categoryName = encodeURIComponent(categoryName);
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&categoryName=" + _categoryName + "&seriesId=&multiVod=1&logoName=chjnsh&multiVodLoop=1&fromMini=1";
	//开机第一次加载才显示列表
	if($.getGlobalData('GlobalCJNSFirstLogin') === '1'){
		$.saveGlobalData2('GlobalCJNSFirstLogin', '2');
		url += '&first_kj=1';
	}
	$.forward(url);
};
//体育
EpgCommonClass.prototype.playVideo_ty = function(contentId, categoryId, categoryName){
	ztCategoryId = getZtCategoryId();
	var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'hw';
	var _categoryName = encodeURIComponent(categoryName);
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&categoryName=" + _categoryName + "&seriesId=&multiVod=1&logoName=ty&multiVodLoop=1&fromMini=1"+ "&ztCategoryId=" + ztCategoryId;
	//开机第一次加载才显示列表
	if($.getGlobalData('GlobalTYFirstLogin') === '1'){
		$.saveGlobalData2('GlobalTYFirstLogin', '2');
		url += '&first_kj=1';
	}
	$.forward(url);
};
//体育单条VOD
EpgCommonClass.prototype.playVideo_ty_one = function(contentId, categoryId){
    $.playVideo(contentId, categoryId, [], "VOD", "1", "", "1");
	/*var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'hw';
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&seriesId=";
	$.forward(url);*/
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
			"ty" : "GlobalTYFirstLogin"
		}[opt.group];

		var first_kj = '';
		//开机第一次加载才显示列表
		if(globalDataKey && $.getGlobalData(globalDataKey) === '1'){
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
			logoName : 'ty',
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
		var _type = 'hw';

		$.saveGlobalData('tjIptvPlayListTimes', '0');

		var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html"

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

(function(){
    var _epgDomain = $.epgDomain();
    var _URLS = {
        "URL_JSP_CHANNEL" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/CHANNEL_DATA.jsp',
        "URL_JSP_CHANNEL_MINI" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/CHANNEL_MINI_DATA.jsp',
        "URL_JSP_VOD" : _epgDomain + 'EPG/MediaService/VOD_DATA.jsp',
        "URL_JSP_TVOD_PRE" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/TVOD_DATA_PRE.jsp',
        "URL_JSP_TVOD" : _epgDomain + 'EPG/jsp/defaulttj/newEpg/TVOD_DATA.jsp'
    }
    $.getUrl(_URLS);
})();

//设置数据收集类型
$V.setStbtype(2);

SERVICES(GLOBAL_NODE);

EpgCommonClass.prototype.saveGlobalData2 = function(key, value) {
	Authentication.CUSetConfig(key, value + '');
};