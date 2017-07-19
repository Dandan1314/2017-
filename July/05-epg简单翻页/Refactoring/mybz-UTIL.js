/*
*	工具包(UTIL)
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
	_UTIL.STB.isSkyworth = /skyworth/i.test(navigator.userAgent);
	_UTIL.STB.appVersion = _UTIL.STB.isZte && (/ztebw v/.test(_UTIL.STB.appVersion)) ? 0 : parseInt(_UTIL.STB.appVersion);
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
	_UTIL.loaderData = _UTIL.loader = function(url, success, error, params){
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
		s.remove();
		s = null;
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
			it.timer = setTimeout(function(){
				it.hide();
				if(hasAfter){
					//显示
					_afterHideToShow(it);
					//一次性使用
					it.tempAfter.list.length = 0;
					it.tempAfter.interval = undefined;
					it.tempAfter.keyRespondObj = undefined;
				}
			}, (interval || it.interval));
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