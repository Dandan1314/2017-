/**************************************************************************************************
 * @AHTOR:lijin.
 * @DATE:2012/07-01.
 * @DESCRIPTION:
 * THIS JAVASCRIPT LIBRARY PROVIDES RESERVATION INTERFACE API TO THE PLATFORM.
 * (INCLUDING: QUERY, ACQUIRE/GET, DELETE RESERVATION FROM DATABASE).
 * @VERSION:0.0.1.
 * @FORMAT:
 * ADD:/reservation/put/company/ADProject/user/tom/channel/001/program/PROGRAMNAME/time/201201010101/callback
 * DEL:/reservation/del/company/ADProject/user/tom/channel/001/program/PROGRAMNAME/time/201201010101/callback
 * QUERY:/reservation/get/company/ADProject/user/tom/period/all/callback
		 /reservation/get/company/ADProject/user/tom/period/201201010101/callback
		 /reservation/get/company/ADProject/user/tom/period/201201010101-/callback
		 /reservation/get/company/ADProject/user/tom/period/201201010101-201201010103/callback
 **************************************************************************************************/

/**================================================**/
/**               JSONP     Declaration            **/
/**================================================**/

/** Database server address **/
var db_server_addr = $.getConstant("orderUrl");

/** UserID of STB BOX. **/ 
var userId = $.getUserId();

var company = $.getConstant("node");

var _reservationCallback = "";

var jsonpRequestTool = function() {
	var JSONP_REQUEST_FOR_RESERVE;
	return function(url) {
		if(JSONP_REQUEST_FOR_RESERVE){
			document.getElementsByTagName("head")[0].removeChild(JSONP_REQUEST_FOR_RESERVE);
		}
		JSONP_REQUEST_FOR_RESERVE= document.createElement("script");

		JSONP_REQUEST_FOR_RESERVE.type = "text/javascript";
		JSONP_REQUEST_FOR_RESERVE.charset = "UTF-8";
		JSONP_REQUEST_FOR_RESERVE.src = url;
		document.getElementsByTagName("head")[0].appendChild(JSONP_REQUEST_FOR_RESERVE);
	};
}();

/**================================================**/
/**             Reservation Functions              **/
/**================================================**/
/**Make a reservation  type==make*/
function make_reservation(channelId, progName, time, callback) 
{
	_reservationCallback = callback;
	var data = "/reservation/put/company/" + company + "/user/" + userId +"/channel/" +
		    channelId + "/program/" + progName + "/time/" + time + "?callback=makeReservation&t=" + getCurrentTime("yyyyMMddhhmmss");
	var url = db_server_addr + data;	
		jsonpRequestTool(url);
}

function makeReservation(result) {
	
	if (company == "zte") {

		query_afterspt_reservation(getCurrentTime("yyyyMMddhhmm"),"writeGolbalReservationDataForZte");
	}
	
	var func = _reservationCallback + "(result)";
	eval(func);
}

function writeGolbalReservationDataForZte(result) {

	var reservationList=result['data'];
	top.controlWrite(2, ['reservationList',reservationList]);
	top.controlWrite(2, ['reservationList_yd',reservationList]);
}


/**Query all reservation  type==query*/
function query_all_reservation(callback)
{
	var data = "/reservation/get/company/" + company + "/user/" + userId + "/period/all?callback=" + callback +"&t=" + getCurrentTime("yyyyMMddhhmmss");
	var url = db_server_addr + data;	    
		jsonpRequestTool(url);
}

/**Query after specific time reservation  type==query*/
function query_afterspt_reservation(time, callback)
{
	var data = "/reservation/get/company/" + company + "/user/" + userId + "/period/" + time + "-?callback=" + callback +"&t=" + getCurrentTime("yyyyMMddhhmmss");
	var url = db_server_addr + data;  
		jsonpRequestTool(url);
}

/**Delete a reservation type=del*/
function del_reservation(channelId, progName, time, callback) 
{
	var data = "/reservation/del/company/" + company + "/user/" + userId + "/channel/" 
			+ channelId + "/program/" + progName + "/time/" + time+ "?callback=" + callback +"&t=" + getCurrentTime("yyyyMMddhhmmss");
	var url = db_server_addr + data;	    
		jsonpRequestTool(url);
}

/**Delete all reservations type=del*/
function del_all_reservation(callback) 
{
	var data = "/reservation/del/company/" + company + "/user/" + userId + "/all?callback=" + callback +"&t=" + getCurrentTime("yyyyMMddhhmmss");
	var url = db_server_addr + data;	    
		jsonpRequestTool(url);
}

/** check the current reservation is reserved or not **/
function is_reserved(jsonObjs, channelId, progName, time)
{
	var r_value=false;
	var obj_arr = jsonObjs.data;
	if(obj_arr != undefined){
		for(var i=0; i<obj_arr.length; i++)
		{
			var obj = obj_arr[i];
			if(parseInt(obj.channel) == channelId && obj.program==progName && obj.time==time)
			{
				r_value=true;
				break;
			}
		}
	}
	return r_value;
}
 
/**
 * 取得当前时间 
 */
function getCurrentTime(format){
	var today = new Date();
	return today.format(format);
}

/*
 * 日期格式化
 */
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