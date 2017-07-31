var ACTIVE_OBJECT;
var PAGE_INFO = [{
	key: 'elF0',
	pressUp: '',
	pressDown: 'elF2',
	pressLeft: '',
	pressRight: 'elF1',
	pressOk: '',
	args: [],
	focusImg: '',
	wholeMsg: '我是el0我是el0我是el0',
	marquee:['elTitle0']
},{
	key: 'elF1',
	pressUp: '',
	pressDown: 'elF3',
	pressLeft: 'elF0',
	pressRight: '',
	pressOk: '',
	args: [],
	focusImg: ['images/focus.png'],
	wholeMsg: '我是el1我是el1我是el1',
	marquee:['elTitle1']
},{
	key: 'elF2',
	pressUp: 'elF0',
	pressDown: '',
	pressLeft: '',
	pressRight: 'elF3',
	pressOk: '',
	args: [],
	focusImg: ['images/focus.png'],
	wholeMsg: '我是el2我是el2我是el2',
	marquee:['elTitle2']
},{
	key: 'elF3',
	pressUp: 'elF1',
	pressDown: '',
	pressLeft: 'elF2',
	pressRight: '',
	pressOk: '',
	args: [],
	focusImg: ['images/focus.png'],
	wholeMsg: '我是el3我是el3我是el3',
	marquee:['elTitle3']
},];
//在工具包中添加方法
 $.focusTo = function (key) {
	//获取目标元素
	$.getTargetObj(key);
	// marquee :数组 0:元素 , 1:宽 ,2:高
	var el,all,width,height;
	//判断是否有该属性,且不是空数组
	if(ACTIVE_OBJECT && ACTIVE_OBJECT.marquee && ACTIVE_OBJECT.marquee.length){
		all = ACTIVE_OBJECT.wholeMsg;
		el = $.getElem(ACTIVE_OBJECT.marquee[0]);
		width = ACTIVE_OBJECT.marquee[1];
		height = ACTIVE_OBJECT.marquee[2];
		if(el.innerHTML == ACTIVE_OBJECT.wholeMsg){
			//不需要滚动
			//清空数据
			el = '';
			all = '';
			width = '';
			height = '';
		}
	}
	//调用走马灯
	UTIL.Marquee({
		el: el,
		all: ACTIVE_OBJECT.wholeMsg,
		width: width,
		height: height
	});
	//展示焦点
	$.showFocusBorder();
}
//页面加载完成后调用initPage
function initPage() {
	$.initPage('HD');
	$.keyPressSettiing({
		KEY_UP: function(){
			if(typeof ACTIVE_OBJECT.pressUp == 'function'){
				return ACTIVE_OBJECT.pressUp();
			}
			$.focusTo(ACTIVE_OBJECT.pressUp);
			return true;
		},
		KEY_RIGHT: function(){
			if(typeof ACTIVE_OBJECT.pressRight == 'function'){
				return ACTIVE_OBJECT.pressRight();
			}
			$.focusTo(ACTIVE_OBJECT.pressRight);
			return true;
		},
		KEY_DOWN: function(){
			if(typeof ACTIVE_OBJECT.pressDown == 'function'){
				return ACTIVE_OBJECT.pressDown();
			}
			$.focusTo(ACTIVE_OBJECT.pressDown);
			return true;
		},
		KEY_LEFT: function(){
			if(typeof ACTIVE_OBJECT.pressLeft == 'function'){
				return ACTIVE_OBJECT.pressLeft();
			}
			$.focusTo(ACTIVE_OBJECT.pressLeft);
			return true;
		}
	});
	//默认焦点
	$.focusTo('elF0');
	
}