/**
 * 中兴EPG模板共通函数类
 *
 *  @author liyq
 */

// 分发节点名称 用于用户信息保存
var GLOBAL_NODE = "zte";

// 中兴默认播放栏目Id
var ZTE_DEFAULT_COLUMN = "1C0304";

// 播放对象
var MEDIA_PLAYER;

//var FRAME_NUMBER = "frame843";
var FRAME_NUMBER = 'frame1068';//frame1068测试, frame1074准生产

// 用于双屏数据收集的栏目ID
var MOBILE_COLLECT_CATEGORY_ID = "mobile";

var db_search_addr = $.getConstant("mongoDBUrl");
var AD_check;
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
    
    if (ReturnURL.indexOf('reset') > -1 ) {
		
		ReturnURL = ReturnURL.split("?")[0];
	}
	
	if(top.extrWin.maxNo==''||top.extrWin.maxNo=='undefined'||top.extrWin.maxNo==undefined ) {
		$.saveGlobalData('tjiptvChannelReturnUrlForZte', ReturnURL);
	} 
    if(($.getGlobalData('tjiptvChannelReturnUrlForZte')==undefined 
		|| $.getGlobalData('tjiptvChannelReturnUrlForZte')=='undefined'|| $.getGlobalData('tjiptvChannelReturnUrlForZte')=='') && !($.getGlobalData("backUrlArray")==undefined || $.getGlobalData("backUrlArray")=="undefined" || $.getGlobalData("backUrlArray")=="end")) {
		$.saveGlobalData('tjiptvChannelReturnUrlForZte', ReturnURL);
	} 
	var GDsubtype = $.getGlobalData("tjiptvPlayLiveOrRecSubtype");	
	if(GDsubtype != undefined && GDsubtype != "" &&  GDsubtype != "undefined"){
		subtypeParam = "&GDsubtype=" + GDsubtype;
		top.jsSetControl("GDsubtype",GDsubtype);
	}
	$.saveGlobalData("tjiptvPlayLiveOrRecSubtype","undefined");	
	
    if(startTime == undefined || startTime=="") {
        // 直播
        window.location.href = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/channel_play.jsp?mixno="+channelNum + "&backurl=" + ReturnURL;
        
    }else {
	
       // 回放
        window.location.href =  $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/zte_huifang_prepare.jsp?ChannelNum=" + channelNum + "&StartTime=" + startTime + "&EndTime=" + endTime+ "&backurl=" + ReturnURL;
    }
        
};

/**
 * 贴片广告回调函数
 * 复写原广告ID数组
 * callback :  {"resourceid":"100000************"}返回广告内容ID
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


/**
 * 媒体播放
 * @param {Object} contentID 内容ID
 * @param {Object} categoryId 媒体ID（栏目ID）
 * @param {Object} contentIds 连续播放内容ID（输入连续播放ID或空）
 * @param {Object} contentType 内容类型（输入播放内容类型{CHAN:0,VOD（外网VODID）:1,LANVOD（内网VODID）：2，TVOD：3})
 * @param {Object} mediaType 媒体ID（{1:正片，5片花}）
 * @param {Object} seriesId 媒体ID（当播放为剧集子集时，剧头ID，否则传入空串即可）
 * @param {Object} circleFlg  循环播放FLG（需要循环播放时‘1’否则不传或‘0’）
 * @param {Object} topicSceneId 媒体ID（当播放为系列剧子集时，剧头ID，否则传入空串即可）
 */
EpgCommonClass.prototype.playVideo = function(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg, topicSceneId) {
	//联播数据收集用
	$.saveGlobalData('tjIptvZteCategoryId', categoryId);
	$.saveGlobalData('ADcontentID', contentID);
	$.saveGlobalData('ADcategoryId', categoryId);
	$.saveGlobalData('ADseriesId', seriesId);
	//默认第一个播放的视频不是广告
	$.saveGlobalData('theFirstPlayIsAD', "false");
	
	var AD_KEY = "open";
	//存广告播放开关
    $.saveGlobalData('tjIptvPlayAD_KEY', AD_KEY);
	if(AD_KEY=='open'){
		    AD_check = setTimeout(function(){
			if(adPositionId===undefined || adPositionId.length===0 ||adPositionId == "undefined" || adPositionId == "null"  || mediaType=="5"){
				$.saveGlobalData('tjIptvPlayListPosition', '0');
				playVideoEntity(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg);
			}else {
				$.saveGlobalData('tjIptvPlayListPosition', '-1');
				GLOBAL_ContentID = contentID;
			
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
		},2500);
		GLOBAL_ContentID = contentID;

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
			AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, seriesId);//有广告 电视剧
		 }else{
			 if(topicSceneId!="" && topicSceneId!=undefined && topicSceneId!="undefined" && topicSceneId!=null && topicSceneId!="null"){
				 $.saveGlobalData('tjIptvPlayListTopicSceneId', topicSceneId);
				 AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, topicSceneId);//有广告 系列剧
			 }else{
				 AdvertisingInterface($.getUserId(), 1, 1, "", categoryId, contentID);//有广告 vod
			 }
		 }
	}
	else{

			if(adPositionId===undefined || adPositionId.length===0 ||adPositionId == "undefined" ||adPositionId == "null" || mediaType=="5"){
				$.saveGlobalData('tjIptvPlayListPosition', '0');
				playVideoEntity(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg);
			}else {
				$.saveGlobalData('tjIptvPlayListPosition', '-1');
				GLOBAL_ContentID = contentID;
			
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

function playVideoEntity(contentID, categoryId, contentIds, contentType, mediaType, seriesId, circleFlg) {

    // 单播结束、连播全部结束 返回地址
    var allOverReturnURL = window.location.href.split("?")[0];
	//在订购成功页，返回前一个页
	if(allOverReturnURL.indexOf('auth-ppv') > -1){
		allOverReturnURL = $.popBack();
	}
	
	ztCategoryId = getZtCategoryId();
	var chargeSpIds = getChargeSpIds(contentID, seriesId);
	
	$.saveGlobalData('tjIptvPlayListZtCategoryId', ztCategoryId);
	
    //栏目ID需要传递特殊处理参数categoryId
	var params=window.location.href.split("?");
        for (var i = 0; i < params.length; i++) {
			if (params[i].indexOf("categoryId" + "=") > -1 && (params[i].indexOf("|") > -1 || params[i].length==43 || params[i].length==21)) {
			allOverReturnURL=params[0]+"?"+params[i];
			break;
		}
	}
	
    $.saveGlobalData('tjiptvChannelReturnUrlForZte', allOverReturnURL);
    
    // 连播中转地址
    var playListUrl = $.getConstant("serverUrl") + "resources/common/zte/playListSD/index.html";
    
    // 用户
    var cryUser = $.getUserId();

    var continuousPlayFlag = '0';
	
	var isAd = false;

    // 媒体类型
    if (mediaType == undefined) {
        
        mediaType = "1";
    }

    
    // 内容类型
    var typeMap = {
        "CHAN" : "0",
        "VOD" : "1",
        "LANVOD" : "2",
        "TVOD" : "3"
    };

    if (circleFlg == undefined) {
        circleFlg = '0';
    }
    
    $.saveGlobalData('tjIptvPlayListCircleFlag', circleFlg);
    
    if (contentType == undefined) {
        contentType = "1";
    } else {
        contentType = typeMap[contentType];
    }
	
	var contentIdForRec = contentID;
    
	//第一条广告播放
    if($.startWith(contentID,"AD")){
		contentID = contentID.replace("AD", "");
		$.saveGlobalData('playOneIsAD','true');
		//开始播放或连播的标识
		$.saveGlobalData('isfirstOne','true');
		isAd = true;
		//用于播放的jsp
		$.saveGlobalData('tjIptvZtePlayListCurrentItemIsAd', "true");
    }else{
	    $.saveGlobalData('playOneIsAD','false');
		$.saveGlobalData('isfirstOne','null');
		$.saveGlobalData('tjIptvZtePlayListCurrentItemIsAd', "");
    }

	
    $.saveGlobalData('tjIptvPlayListContentType', contentType);

    var bpTime = $.getGlobalData('fullScreenVodStartTime');
    $.saveGlobalData('fullScreenVodStartTime' , 'undefined');

    if (bpTime == undefined) {
        
        bpTime = '0';
    }

    var nextVodId = "";

        // VOD、电视剧播放判断
        if (seriesId == undefined || seriesId == "") {
	
			$.saveGlobalData('tjIptvPlayListSeriesId',"undefined");
			
            // VOD单播、联播判断       
            if (contentIds != undefined && contentIds.length != 0) {
            	

                continuousPlayFlag = '1';

                $.saveGlobalData('tjIptvPlayType', "VOD");

                nextVodId = contentIds[0];
				
				var maxLength = contentIds.length > 50 ? 50 : contentIds.length;
			
				// VOD连播
				for (var i=0;i<maxLength;i++) {
					$.saveGlobalData('tjIptvPlayListContentIds' + i, contentIds[i]);
				}
		
				$.saveGlobalData('tjIptvPlayListMaxTimes', maxLength);
        
                $.saveGlobalData('tjIptvPlayListTimes', '0');
        
                $.saveGlobalData('tjIptvPlayListRtnURL', allOverReturnURL);
                
                $.saveGlobalData('tjIptvPlayListFirstContId', contentIdForRec);
            } 
			//广告无记忆播放
            if (isAd) {

			    bpTime = '0';
			}    
			
            if(contentType == "1") {
                //如果片花跳转到“VOD”片花播放（通常VOD为VOD类型）
                if (mediaType == "5") {
                    window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_play_epg_transit_pianhua.jsp?programid=" + contentID + 
                                    "&columnid=" + "1234" + 
                                    "&vodtype=1" + 
                                    "&breakpoint=" + bpTime+"&playid="+""+
                                    "&allOverReturnURL="+ allOverReturnURL+
                                    "&playListURL="+ playListUrl+
                                    "&playtype=VOD"+
                                    "&playvodid="+contentID+
                                    "&playcolumnid="+ZTE_DEFAULT_COLUMN;        
                }
                else{

                // 广电Id单播    
                window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_OneVodPlay.jsp?programid=" + contentID + 
                                        "&columnid=" + ZTE_DEFAULT_COLUMN + 
                                        "&vodtype=1" + 
                                        "&breakpoint=" + bpTime + 
                                        "&categoryId=" + categoryId +
                                        "&nextVodId=" + nextVodId +
                                        "&allOverReturnURL=" + allOverReturnURL +
                                        "&playListURL=" + playListUrl +
                                        "&continuousPlayFlag=" + continuousPlayFlag + "&ztCategoryId=" + ztCategoryId+"&chargeSpIds="+chargeSpIds;
										
                }                       
            }else if(contentType == "2") {

                //如果片花跳转到“LANVOD”片花播放（通常剧集为LANVOD类型）
                if(mediaType == "5") {

           
                        window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_play_epg_transit_pianhua.jsp?programid=" + contentID+ 
                                    "&columnid=" + "1234" + 
                                    "&vodtype=1" + 
                                    "&breakpoint=" + bpTime+"&playid="+contentID;
                }else{
                // 中兴Id单播    
                window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/ZteId_OneVodPlay.jsp?programid=" + contentID + 
                                        "&columnid=" + categoryId + 
                                        "&vodtype=1" + 
                                        "&breakpoint=" + bpTime + 
                                        "&categoryId=" + categoryId +
                                        "&nextVodId=0" +
                                        "&exProgramId=0" +
                                        "&allOverReturnURL=" + allOverReturnURL +
                                        "&playListURL=" + playListUrl +
                                        "&continuousPlayFlag=" + continuousPlayFlag + "&ztCategoryId=" + ztCategoryId+"&chargeSpIds="+chargeSpIds;
                }
            }

            
        } else {	
				
                continuousPlayFlag = '1';
                $.saveGlobalData('tjIptvPlayType', "SER");
				$.saveGlobalData('tjIptvPlayListSeriesId',seriesId);

                // 电视剧连播
                for (var i=0;i< contentIds.length;i++) {
                    $.saveGlobalData('tjIptvPlayListContentIds' + i, contentIds[i]);
                }
				
				if(contentIds.length<1) {
					continuousPlayFlag = '0';
				}
				
                $.saveGlobalData('tjIptvPlayListMaxTimes', contentIds.length);
        
                $.saveGlobalData('tjIptvPlayListTimes', '0');
        
                $.saveGlobalData('tjIptvPlayListRtnURL', allOverReturnURL);
                
                $.saveGlobalData('tjIptvPlayListFirstContId', contentIdForRec);
        
                // if(contentType == "2") {
                    // // 中兴Id 单播后，跳转连播中转地址    
                    // window.location.href  = host + "/frame1046/ZteId_OneSerPlay.jsp?programid=" + contentID + "&columnid=" + ZTE_DEFAULT_COLUMN + "&FatherContent=" + seriesId + "&vodtype=10&programtype=10&breakpoint=0&ReturnURL=" + playListUrl;
                // }
			
				if (isAd) {
				    bpTime = '0';
					if(contentType == "1") {
                		
						// 广电Id单播    
						window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_OneVodPlay.jsp?programid=" + contentID + 
												"&columnid=" + ZTE_DEFAULT_COLUMN + 
												"&vodtype=1" + 
												"&breakpoint=" + bpTime + 
												"&categoryId=" + categoryId +
												"&nextVodId=" + nextVodId +
												"&allOverReturnURL=" + allOverReturnURL +
												"&playListURL=" + playListUrl +
												"&continuousPlayFlag=" + continuousPlayFlag;
						           
					}else if(contentType == "2") {

					
						// 中兴Id单播    
						window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/ZteId_OneVodPlay.jsp?programid=" + contentID + 
												"&columnid=" + categoryId + 
												"&vodtype=1" + 
												"&breakpoint=" + bpTime + 
												"&categoryId=" + categoryId +
												"&nextVodId=0" +
												"&exProgramId=0" +
												"&allOverReturnURL=" + allOverReturnURL +
												"&playListURL=" + playListUrl +
												"&continuousPlayFlag=" + continuousPlayFlag;
					}
					
					return;
				}
                
				
                if(contentType == "1") {
                    
                    //如果片花跳转到“VOD”片花播放（通常VOD为VOD类型）
                    if (mediaType == "5") {

                       window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_play_epg_transit_pianhua.jsp?programid=" + contentID + 
                                    "&columnid=" + "1234" + 
                                    "&vodtype=1" + 
                                    "&breakpoint=" + bpTime+"&playid="+contentID+
                                    "&playtype=SER"+
                                    "&FatherContent=" + seriesId +
                                    "&sercategoryId=" + ZTE_DEFAULT_COLUMN +
                                    "&allOverReturnURL="+ allOverReturnURL+
                                    "&playListURL="+ playListUrl+
                                    "&continuousPlayFlag=" + continuousPlayFlag+   
									"&playvodid="+contentID+
                                    "&playcolumnid="+ZTE_DEFAULT_COLUMN;        
                    }
                    else{
                    
                    // 广电Id 单播后，跳转连播中转地址    
                    window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_OneSerPlay.jsp?programid=" + seriesId + 
                                            "&columnid=" + ZTE_DEFAULT_COLUMN + 
                                            "&vodtype=10" + 
                                            "&programtype=10" + 
                                            "&fatherId=" + seriesId + 
                                            "&sceneId=" + contentID + 
                                            "&breakpoint=" + bpTime + 
                                            "&categoryId=" + categoryId +
                                            "&allOverReturnURL=" + allOverReturnURL +
                                            "&playListURL=" + playListUrl +
                                            "&continuousPlayFlag=" + continuousPlayFlag + "&ztCategoryId=" + ztCategoryId+"&chargeSpIds="+chargeSpIds;
											
                    }
                }else if(contentType == "2") {
                	
                    //如果片花跳转到“LANVOD”片花播放（通常剧集为LANVOD类型）
                    if(mediaType == "5") {

                        window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/EpgId_play_epg_transit_pianhua.jsp?programid=" + seriesId+ 
                                    "&columnid=" + "1234" + 
                                    "&vodtype=1" + 
                                    "&breakpoint=" + bpTime+"&playid="+contentID+
                                    "&playtype=SER"+
                                    "&FatherContent=" + seriesId +
                                    "&sercategoryId=" + ZTE_DEFAULT_COLUMN +
                                    "&allOverReturnURL="+ allOverReturnURL+
                                    "&playListURL="+ playListUrl+
                                    "&continuousPlayFlag=" + continuousPlayFlag;
                    }
                    else{
					
					$.saveGlobalData('tjIptvPlayListColumnid', categoryId);
					
                    // 中兴Id 单播后，跳转连播中转地址    
                    window.location.href  = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/ZteId_OneSerPlay.jsp?programid=" + contentID + 
                                            "&columnid=" + categoryId + 
                                            "&FatherContent=" + seriesId + 
                                            "&vodtype=10" + 
                                            "&programtype=10" + 
                                            "&breakpoint=" + bpTime + 
                                            "&categoryId=" + categoryId +
                                            "&exProgramId=0&exfatherId=0" +
                                            "&allOverReturnURL=" + allOverReturnURL +
                                            "&playListURL=" + playListUrl +
                                            "&continuousPlayFlag=" + continuousPlayFlag + "&ztCategoryId=" + ztCategoryId+"&chargeSpIds="+chargeSpIds;
											
                    }
                }
        }

}

EpgCommonClass.prototype.epgDomain = function() {
	
	var reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d+\//;

	var msg = $.getGlobalData('ServerAddress');
	msg = msg.match(reg);
		
	return msg;
}

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
 * 看吧页面数据收集 
 */
EpgCommonClass.prototype.recodeData = function(referpage,analysistype) {
	var referpage1 = document.referrer//加垂直入口记录
	
	if(referpage1.indexOf("frame843") > -1){
	referpage1=referpage1.split('frame843')[1].split('?')[0]
	}
	else if(referpage1.indexOf("frame1030") > -1){
	referpage1=referpage1.split('frame1030')[1].split('?')[0]
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

	// 标清还是高清（1：标清，2：高清）
	var version = $.getGlobalData("frameVersion");
	
	// 如果是专题的页面
	if('zt'==analysistype) {
		var url = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ '/ztsend_iptv.jsp?spName='+ encodeURI(encodeURI(referpage)) + '&referpage=' + encodeURI(encodeURI(referpage1));
		var div = document.createElement("div");
			div.style.display="none";
			
			div.innerHTML='<iframe id="dataRecodeFrame" src="' + url + '" style="position:absolute;left:0;top:0;width:0px;height:0px;visibility:hidden;" frameborder="0" > </iframe > ';
			document.body.appendChild(div);
		return;
	} else {
		var url =  'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&referpage=' + referpage1 + '&refer=true&stbid=' + $.getGlobalData("StbId") + '&userid=' + $.getUserId() + '&analysistype=' + analysistype + '&url=' + window.location.href.split('?')[0] + "&version="+ version + "&stbtype=1" + '&columnid=' + referpage;
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
	
	var version = $.getGlobalData("frameVersion");
	
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
 * 小窗口播放VOD数据收集
 * @param vodid VODID
 * @param vodname VOD名字
 * @param times 时长
 * @param colid 栏目
 * @param analysistype "begin或者end事件"
 */
EpgCommonClass.prototype.recodeData4CallSizePlay = function(vodid,vodname,times,colid,analysistype) {
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

	// 标清还是高清（1：标清，2：高清）
	var version = $.getGlobalData("frameVersion");
  
	
	// 拼接URL
	var url =  'http://61.181.152.140:9080/EPGDataAnalysis/ReciveServlet?processtype=MapInfoProcess&time=' + now + '&stbid=' + $.getGlobalData("StbId") + '&userid=' + $.getUserId() + '&analysistype=' + analysistype + "&version="+ version + "&stbtype=1"+"&vodid="+vodid+"&vodname="+encodeURI(encodeURI(vodname))+"&times="+times+"&colid="+colid;

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
 * 跳转现网详细页
 * 
 * @param contentId 内容ID
 * @param category 内容所属栏目
 * @param type 内容类型    vod：0； 剧集：14
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

	var bpTime = $.getGlobalData('smallScreenPlayedTime');
	
    if (bpTime == undefined) {
    	
    	bpTime = '0';
    }

	ztCategoryId = getZtCategoryId();
	document.getElementById(frameId).src = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/vod_play_epg_transit_small.jsp?left=" + left + "&top=" + top + "&width=" + width + "&height=" + height + "&type=VOD&programid=" + vodId + "&columnid=" + columnid +"&ztCategoryId=" + ztCategoryId + "&vodtype=1&breakpoint=" + bpTime;
};

/**
 *  小窗口直播
 * 
 */
EpgCommonClass.prototype.callSizeLivePlay = function(frameId,left,top,width,height,channelNum) {
	top.jsSmallChannelPlay(left,top,width,height,channelNum);
	//document.getElementById(frameId).src = $.epgDomain() + "iptvepg/" + FRAME_NUMBER+ "/channel_play_small.jsp?left=" + left + "&top=" + top + "&width=" + width + "&height=" + height + "&mixno=" + channelNum;
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
 * 保存全局变量
 *
 * @param {Object} key
 * @param {Object} value
 */
EpgCommonClass.prototype.saveGlobalData = function(key, value) {

	var argv = new Array;
	argv.push(key);
	argv.push(value + '');
	top.controlWrite(2, argv);
	
	var keyInfo = checkKeys(key,0);
	
	if (keyInfo.hasKey == false) {
		
		var index = parseInt(keyInfo.maxIndex);
		
		if (index == 0) {
			
			var argvkey = new Array;
			argvkey.push('tjIptvGlobalKeys' + index);
			argvkey.push(key);
			top.controlWrite(2, argvkey);
			
		} else {
			
			var preKey = top.jsGetControl('tjIptvGlobalKeys' + (index-1))
		
			if (preKey.length >= 3000) {
				
				var argvkey = new Array;
				argvkey.push('tjIptvGlobalKeys' + index);
				argvkey.push(key);
				top.controlWrite(2, argvkey);
			} else {
				
				preKey = preKey + ',' + key;
				
				var argvkey = new Array;
				argvkey.push('tjIptvGlobalKeys' + (index-1));
				argvkey.push(preKey);
				top.controlWrite(2, argvkey);
			}
		}
		
	}
};

function checkKeys(key,index) {
	
	var keys = top.jsGetControl('tjIptvGlobalKeys' + index);
	
	var result;
	
	if (keys == undefined || keys == 'undefined' || keys == '') {
		
		result = {hasKey:false, maxIndex: index};

		return result;
	}
	
	var keyArray = keys.split(',');
	
	var hasKey = false;
	
	for (var i=0;i<keyArray.length;i++) {
		
		if (key == keyArray[i]) {
			
			hasKey = true;
			
			break;
		}
	}
	
	if (hasKey) {
		
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
	var out = top.jsGetControl(key);
	if(typeof out !== "undefined" && out !== 'undefined' && out !== ''){
		return out;
	}
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
 * 鉴权
 */
EpgCommonClass.prototype.authentication = function(contentId, productId, successUrl, failUrl) {
};

/**
 * 订购
 */
EpgCommonClass.prototype.order = function(returnUrl) {
};

/**
 * USERTOKEN重定向
 */
EpgCommonClass.prototype.userTokenRedirect = function() {
	window.location.href = "http://61.181.150.84:8080/iptvepg/platform/ssorequest.jsp?ReturnInfo=1&Action=UserTokenRequest&ReturnURL=" + "http://61.181.152.136/pub/STB_zte/zteNormal/zteNormalIndex/index_userTokenReturn.html";
};

/**
 * USERTOKEN更新
 */
EpgCommonClass.prototype.userTokenUpdate = function(returnUrl) {
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
		if(MEDIA_PLAYER){
			var currentVolume = MEDIA_PLAYER.getVolume();
			if(currentVolume >= 100) {
				currentVolume = 100;
			} else {
				currentVolume += 5;
			}
			//静音时，设置为非静音
			if(MEDIA_PLAYER.getMuteFlag()){
				MEDIA_PLAYER.setMuteFlag(0);
			}
			MEDIA_PLAYER.setVolume(currentVolume);
		}
	},
	"KEY_VOLUME_DOWN" : function() {
		if(MEDIA_PLAYER){
			var currentVolume = MEDIA_PLAYER.getVolume();
			if(currentVolume <= 0) {
				currentVolume = 0;
			} else {
				currentVolume -= 5;
			}
			MEDIA_PLAYER.setVolume(currentVolume);
			if(currentVolume <= 0){
				MEDIA_PLAYER.setMuteFlag(1);//设置为静音状态
			}
		}
	},
	"KEY_VOLUME_Mute" : function() {
		if(MEDIA_PLAYER){
			var muteFlag = MEDIA_PLAYER.getMuteFlag();
			if(muteFlag == 1){//如果为静音状态，设置为非静音状态
				MEDIA_PLAYER.setMuteFlag(0);
			} else {// 否则设置为静音状态
				MEDIA_PLAYER.setMuteFlag(1);
			}
		}
	},	
	"KEY_LIVE_BROADCAST" : function() {
	},
	"KEY_REVIEW" : function() {
	},
	"KEY_DIBBLING" : function() {
	},
	"KEY_INFORMATION" : function() {
		
		// 当前地址
		var currentUrl = window.location.href.split("?")[0];
		
		// 我的IPTV目录
		var urlPrefix = $.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptvNew';
		
		// 最近观看地址
		var targetUrl =$.getConstant("baseUrl") + $.getConstant("siteName") + 'myiptvNew/recent/';
		
		if($.startWith(currentUrl, urlPrefix)){
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
		numDiv.style.zIndex = "5";

		lineDiv = document.createElement("div");
		lineDiv.setAttribute("id", "channelShowLine");
		lineDiv.style.left = "375px";
		lineDiv.style.top = "8px";
		lineDiv.style.width = "200px";
		lineDiv.style.height = "30px";
		lineDiv.style.position = "absolute";
		lineDiv.style.zIndex = "5";

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

	// document.getElementById("channelShowLine").innerHTML = lineTabdef;
}

//娱乐头条
EpgCommonClass.prototype.playVideo_yltt = function(contentId, categoryId){
	var _userId = $.getUserId();
	var _contentType = 1;
	var _type = 'zte';
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
	var _type = 'zte';
	var _categoryName = encodeURIComponent(categoryName);
	var url = $.getConstant("serverUrl") + "resources/playControl-" + _type + "/vod.html?ContentID=" + contentId + "&UserID=" + _userId + "&contentType=" + _contentType + "&mediaType=1&sceneNum=&categoryId=" + categoryId + "&categoryName=" + _categoryName + "&seriesId=&multiVod=1&logoName=chjnsh&multiVodLoop=1&fromMini=1";
	//兼容中兴高清
	if(UTIL.STB.isZteZXV10B700){
		url = url.replace('vod.html', 'vod_zte.html');
	}
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
	var _type = 'zte';
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
	var _type = 'zte';
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
		var _type = 'zte';

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
        "URL_JSP_CHANNEL" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/CHANNEL_DATA.jsp',
        "URL_JSP_CHANNEL_MINI" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/CHANNEL_MINI_DATA.jsp',
        "URL_JSP_VOD" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/MYBZ_VOD_DATA.jsp',
        "URL_JSP_TVOD_PRE" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/TVOD_DATA_PRE.jsp',
        "URL_JSP_TVOD" : _epgDomain + 'iptvepg/' + FRAME_NUMBER + '/TVOD_DATA.jsp'
    }
    $.getUrl(_URLS);
})();

//设置数据收集类型
$V.setStbtype(1);

SERVICES(GLOBAL_NODE);

EpgCommonClass.prototype.saveGlobalData2 = function(key, value) {
	top.jsSetControl(key, value + '');
};