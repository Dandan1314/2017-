
/*
*	MediaPlayer播放适配器(MP)
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
		if(v > 0){
			if(v <= 100){
				this.who.setMuteFlag(0);//个别盒子BUG，先设置未静音
				this.who.setVolume(v);
			}
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
	_UTIL.STB.isSkyworth = /skyworth/i.test(navigator.userAgent);
	_UTIL.STB.isAndroid = /android/i.test(navigator.userAgent);
	_UTIL.STB.appVersion = _UTIL.STB.isZte && (/ztebw v/.test(_UTIL.STB.appVersion)) ? 0 : parseInt(_UTIL.STB.appVersion);

	_UTIL.STB.isJz = _UTIL.STB.isAndroid && (/iPanel.*advanced/i.test(navigator.appVersion));
	_UTIL.STB.isOTT = _UTIL.STB.isAndroid && (/Linux; U;.*HuaWei/.test(navigator.userAgent));
	//兼容名称
	_UTIL.STB.compatible = '';
	//兼容创维E1100  中兴Z600
	if(_UTIL.STB.isSkyworth && _UTIL.STB.appVersion === 4){
		_UTIL.STB.compatible = '-skyworth-4';
	}else if(_UTIL.STB.isZte && _UTIL.STB.appVersion === 0){
		_UTIL.STB.compatible = '-zte-0';
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
	_UTIL.loaderData = _UTIL.loader = function(){
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
			this._timer = setTimeout(fn, delay || 100);
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
				if(last && beginNew && _U_E.isEqualNode(options.el, last.el) && (/\<marquee[^>]*>/.test(last.el.innerHTML))){
					return;
				}

				//还原前一个
				if (last) {
					last.el && (last.el.innerHTML !== "") && (/\<marquee[^>]*>/.test(last.el.innerHTML)) && (last.el.innerHTML = last.text || '');
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
			if(_Marquee_last && beginNew && _U_E.isEqualNode(options.el, _Marquee_last.el) && (/\<marquee[^>]*>/.test(_Marquee_last.el.innerHTML))){
				return;
			}

			//还原前一个
			if (_Marquee_last) {
				_Marquee_last.el && (_Marquee_last.el.innerHTML !== "") && (/\<marquee[^>]*>/.test(_Marquee_last.el.innerHTML)) && (_Marquee_last.el.innerHTML = _Marquee_last.text || '');
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
		musicFavorite : {
			get : ':base/musicfav/get/:userId/:node/:callback?',
			getByContentId : ':base/musicfav/get/:userId/:node/:platform/:contentId/:callback?'
			,
			add : {
				url : ':base/musicfav/insert/:userId/:node/:platform/:contentId/:name/:category/:type/:callback?'
				,
				type : 1
			}
			,
			remove : ':base/musicfav/delete/:userId/:node/:platform/:contentId/:callback?'
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
//数据收集
var $V = {
	_version : ($.isHotelMode && $.isHotelMode()) ? 6 : 4,
	_stbtype : GLOBAL_NODE == 'zte' ? 1 : 2,//1中兴 2华为
	_base : function(){
		return 'http://' + dataAddIP + '/EPGDataAnalysis/ReciveServlet?';
	},
	_baseParam : function(){
		return "userid=" + $.getUserId()
				+ "&stbid=" + (Authentication.CUGetConfig("STBID") || $.getGlobalData("StbId") || '')
				+ "&stbtype=" + this._stbtype + "&time=" + new Date().format('yyyyMMddhhmmss')
				+ "&processtype=MapInfoProcess&version=" + this._version;
	},
	vodPlay : function(mediacode, duration, vodname, categoryId, ztCategoryId, groupId){
		var url;
		var chargeSpIds = getVsProductIds(mediacode);
		if (ztCategoryId == undefined) {
            ztCategoryId = "";
        }
        if (groupId == undefined) {
            groupId = "";
        }
		if(this._stbtype === 1){//jsp转编码发送
			var name = encodeURI(encodeURI(vodname));
			url = $.epgDomain() + 'iptvepg/' + FRAME_NUMBER + '/vs_vod.jsp?times=' + duration + '&' + this._baseParam() + '&vodid=' + mediacode + '&colid=' + categoryId +'&ztCategoryId='+ztCategoryId + '&vodname=' + name + '&groupId=' + groupId + '&chargeSpIds=' + chargeSpIds;
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
			url = this._base() + 'times=' + duration + '&' + this._baseParam() + '&vodid=' + mediacode + '&vodname=' + vodname + '&analysistype=vodbegin&colid=' + categoryId + '&ztCategoryId='+ztCategoryId + '&groupId=' + groupId + '&chargeSpIds=' + chargeSpIds;
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
SERVICES(GLOBAL_NODE);