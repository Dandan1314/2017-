// old common
typeof SIZE_PLAYER=='undefined' && (SIZE_PLAYER=null);
typeof mp=='undefined' && (mp=null);
typeof top.mp=='undefined' && (top.mp=null);
$.getRequestParams=function(key){return $.search.get(key)};
$.showFocusBorder=function(){};
var UTIL={};
UTIL.substringOneLine=function(str, doubleByteLength){return $.substringOneLine(str, doubleByteLength)};
UTIL.Marquee=function(options){$.Marquee(options)};
UTIL.loaderData=function(url, params){$.loaderData(url, params)};

var picServerUrl = $.getConstant('picServerUrl');
var serverUrl = $.getConstant('serverUrl');
var baseUrl=$.getConstant("baseUrl");
var USER_ID = $.getUserId();
var NODE = $.getConstant("node");

var isForwardToAnother = true;

(function(func){
    $.back = function(){
        func.call($);
        isForwardToAnother = false;
    };
})($.back);

function saveFocus() {
    if (isForwardToAnother) {
        savePageInfo();
    }
}

/* page variables */
var PAGE_INFO = [], TJ_INFO=new Array(), DB_INFO=new Array(), VIP_INFO=new Array(), ZT_INFO=new Array(), APP_INFO=new Array(), MINE_INFO=new Array(), TAB_INFO=[
    {
        key:'tab_tj',
    },
    {
        key:'tab_db',
    },
    {
        key:'tab_vip',
    },
    {
        key:'tab_zt',
    },
    {
        key:'tab_app',
    },
    {
        key:'tab_mine',
    }
];
var ACTIVE_OBJECT={};
var savedData={};
var fwdObj={id:''};
var PAGE_INFO_KEY='HDJLLT_HOME.html';
var RECODE_DATA_KEY='HDJLLT_HOME.html';
/* tool funcs */
function addClass(a,s){$(a).addClass(s);}
function rmClass(a,s){$(a).removeClass(s);}
function html(n,i){n.innerHTML=i;}
function dom(t){if("string"==typeof t)var r=document.getElementById(t);else var r=t;return r&&!r.attr&&(r.attr=attr),r;}
function attr(t,i){return i?(this[t]=""+i,this):this[t]}
function indexObj(n,r,k){for(var e=0;e<n.length;e++)if(k&&n[e][k]===r||!k&&n[e]===r)return e;return-1}
function ext(o,a){ for(var p in a)o[p]=a[p];}
var FMT={
    obj2str:function(r){var n="";for(var a in r)n+=a+"`"+r[a]+"~";return n},
    str2obj:function(t){var p={},r=t.split("~");r.pop();for(var i=0;i<r.length;i++)p[r[i].split("`")[0]]=r[i].split("`")[1];return p}
};
function savePageInfo(){
    var translate=getTranslate();
    savedData['TR']=translate;
    $.saveGlobalData(PAGE_INFO_KEY, FMT.obj2str(savedData));
}
function substring(name, l){
    var trunc= UTIL.substringOneLine(name, l);
    if(trunc){
        return UTIL.substringOneLine(name, l-1)+'...';
    }
}
function textScroll() {
    var el = ACTIVE_OBJECT.textItem,
        all = ACTIVE_OBJECT.wholeMsg,
        width = ACTIVE_OBJECT.width||205,
        height = ACTIVE_OBJECT.height||0;
    if (all&&el) {
        UTIL.Marquee({
            el: el,
            all: all,
            width: width,
            height: height
        });
    } else {
        UTIL.Marquee();
    }
}
(function(){
    $.getTargetObj=function(key){
        var t=key && dom(key), index=indexObj(PAGE_INFO,key,'key');
        if(!t || index<0) return;
        var d=ACTIVE_OBJECT.key && dom(ACTIVE_OBJECT.key);
        d && rmClass(d, 'focusBorder'), addClass(t, 'focusBorder'), ACTIVE_OBJECT=PAGE_INFO[index], savedData['F']=key;
        textScroll();
        return !0;
    };
})();
function getTranslate(){
    var translate=page.style.webkitTransform.replace(/ +/g,'').match(/^translateX\(-(\d+)px\)$/);
    (!translate||translate.length<1)&&(translate=0,!0) || (translate=parseInt(translate[1],10));
    return translate;
}
function setTranslate(val){
    page.style.webkitTransform='translateX(-'+val+'px)';
}
var sendDataAccessSubpageTimer=null;
function sendDataAccessSubpage(tabId){
    sendDataAccessSubpageTimer && clearTimeout(sendDataAccessSubpageTimer);
    sendDataAccessSubpageTimer=setTimeout(function(){
        $.recodeData(RECODE_DATA_KEY+'_'+tabId, 'access', RECODE_DATA_KEY+'_'+tabId);
        sendDataAccessSubpageTimer=null;
    },2000);
}
/* key event handler */
var tabBtnLastFocus='';
function focusToTabBtn(){
    tabBtnLastFocus=ACTIVE_OBJECT.key, tabId='tab_'+tabBtnLastFocus.split('_')[0];
    var r=$.getTargetObj(tabId);
    r && rmClass(dom(tabId),'active');
}
function backToPageArea(){
    var tabId=ACTIVE_OBJECT.key, subPageType=tabId.split('_')[1], backId=subPageType+'_div_0';
    if(tabBtnLastFocus.indexOf(subPageType)==0)backId=tabBtnLastFocus;
    var r=$.getTargetObj(backId);
    r && addClass(dom(tabId),'active');
}
var page; // view area - created in <initPage>
// 焦点移动
function dirCtrlr(dir){
    var d0=ACTIVE_OBJECT.key && dom(ACTIVE_OBJECT.key), index=indexObj(PAGE_INFO,ACTIVE_OBJECT.key,'key');
    if(!d0 || index<0)return;
    // page容器里按照一般逻辑, 最上一行为到tab的逻辑
    var d, begin=6, end=PAGE_INFO.length-1, top0=d0.offsetTop, left0=d0.offsetLeft, width0= d0.offsetWidth, height0=d0.offsetHeight, top, left,  width, height, success=false;
    var isTabBtn=/^tab_/.test(ACTIVE_OBJECT.key), isTopRow=top0<50; // 假设不会小于50
    if(!isTabBtn){
        var translate=getTranslate();
        var dividers=DIVIDERS.concat([DIVIDERS[DIVIDERS.length-1]+1280]), ranges=RANGES, tabIds=['tab_tj','tab_db','tab_vip','tab_zt','tab_app','tab_mine'], currentDivider, nxtDivider, subPageType=ACTIVE_OBJECT.key.split('_')[0];
        var i;
        for(i=0;i<ranges.length;i++)if(translate<ranges[i]+left0)break;
        nxtDivider=currentDivider=i;
        // resolution 2 - locators, rangesScreen 只需保证不超出
        var locators=LOCATORS, rangesScreen=RANGES_SCREEN, curScreen;
        for(i=0;i<rangesScreen.length;i++)if(translate<rangesScreen[i])break;
        curScreen=i;
    }

    switch(dir) {
        // 10 = allowance
        case 'up':
            if(isTabBtn)return;
            if(isTopRow){
                focusToTabBtn();
                break;
            }
            inner:for(var i=index-1;i>=begin;i--){
                d=dom(PAGE_INFO[i].key); if(!d)continue;
                top=d.offsetTop;
                if(top<top0-10){
                    if(PAGE_INFO[i].key.split('_')[0]==subPageType){
                        success=true;
                    }
                    break inner;
                }
            }
            break;
        case 'down':
            if(isTabBtn){
                backToPageArea();
                break;
            }
            inner:for(var i=index+1;i<=end;i++){
                d=dom(PAGE_INFO[i].key); if(!d)continue;
                top=d.offsetTop, height=d.offsetHeight, left=d.offsetLeft;
                if(top+height>top0+height0+10){
                    if(PAGE_INFO[i].key.split('_')[0]==subPageType){
                        success=true;
                    }
                    break inner;
                }
            }
            break;
        case 'left':
            if(isTabBtn)return switchTab('left');
            inner:for(var i=index-1;i>=begin;i--){
                d=dom(PAGE_INFO[i].key); if(!d)continue;
                if(PAGE_INFO[i].key.split('_')[0]!=subPageType) { nxtDivider--; subPageType=PAGE_INFO[i].key.split('_')[0]; }
                left=d.offsetLeft, top=d.offsetTop, height=d.offsetHeight, width=d.offsetWidth;
                if(ranges[nxtDivider]+left<ranges[currentDivider]+left0-10 && top<top0+height0){
                    success=true; break inner;
                }
            }
            break;
        case 'right':
            if(isTabBtn)return switchTab('right');
            inner:for(var i=index+1;i<=end;i++){
                d=dom(PAGE_INFO[i].key); if(!d)continue;
                if(PAGE_INFO[i].key.split('_')[0]!=subPageType) { nxtDivider++; subPageType=PAGE_INFO[i].key.split('_')[0]; }
                left=d.offsetLeft, width=d.offsetWidth, top=d.offsetTop, height=d.offsetHeight;
                if(ranges[nxtDivider]+left+width>ranges[currentDivider]+left0+width0+10 && top+height>top0){
                    success=true; break inner;
                }
            }
            break;
    }
    if(success){
        var newTrans=translate;
        $.getTargetObj(d.id);
        var allowance=20;
        if(dir=='down') {
            if(ranges[nxtDivider]+left-translate<allowance){
                newTrans=Math.max(locators[--curScreen],dividers[currentDivider]);
            }
        }
        if(dir=='left'){
            if(nxtDivider!=currentDivider){
                newTrans=dividers[nxtDivider+1]-1280;
                setActiveTab(tabIds[currentDivider],tabIds[nxtDivider]);
            } else if(ranges[nxtDivider]+left-translate<allowance){
                // setTranslate(Math.max(translate-width,dividers[nxtDivider]));
                newTrans=Math.max(locators[--curScreen],dividers[currentDivider]);
            }
        }
        if(dir=='right'){
            if(nxtDivider!=currentDivider){
                newTrans=dividers[nxtDivider];
                setActiveTab(tabIds[currentDivider],tabIds[nxtDivider]);
            } else if(ranges[nxtDivider]+left+width-translate>1280-allowance){
                // setTranslate(Math.min(translate+width,dividers[nxtDivider+1]-1280));
                newTrans=Math.min(locators[++curScreen],dividers[currentDivider+1]-1280);
            }
        }
        if(newTrans!=translate){
            setTranslate(newTrans);
            handleMp(translate, newTrans);
        }
    }
}
// 切换子页面
function switchTab(dir){
    var dividers=DIVIDERS, tabIds=['tab_tj','tab_db','tab_vip','tab_zt','tab_app','tab_mine'], translate=getTranslate();
    tabBtnLastFocus='';
    var curTabIndex=indexObj(tabIds, ACTIVE_OBJECT.key), tarTabIndex=dir=='left'?curTabIndex-1:curTabIndex+1;
    if(tarTabIndex<0)tarTabIndex=0;
    if(tarTabIndex>=dividers.length)tarTabIndex=dividers.length-1;
    $.getTargetObj(tabIds[tarTabIndex]);
    var newTrans=dividers[tarTabIndex];
    setTranslate(newTrans);
    handleMp(translate, newTrans);
    sendDataAccessSubpage(tabIds[tarTabIndex].replace(/^tab_/,''));
}
// 自动切换tab，被动
function setActiveTab(oldTab, newTab){
    var d=newTab && dom(newTab), index=indexObj(PAGE_INFO,newTab,'key');
    if(!d || index<0)return;
    var old=oldTab && dom(oldTab);
    old&&rmClass(old,'active'), addClass(d, 'active');
    sendDataAccessSubpage(newTab.replace(/^tab_/,''));
}
// epg 跳转
function okCtrlr(){
    forward(ACTIVE_OBJECT.data);
}
function forward(obj){
    var url = obj.url;
    if(/^#(.*)#$/.test(url)){
        switch(RegExp.$1){
            case 'set' ://设置
                savePageInfo();
                STBAppManager.startAppByName("com.android.settings");
                break;
            case 'channel' ://直播
                savePageInfo();
                $.playLiveOrRec(11);
                break;
            default :
                break;
        }
    }else{
        if(url.indexOf('channel://')==0){
            $.playLiveOrRec(url.replace(/^channel:\/\//,''));
        }else if(url.indexOf('app://')==0){
            var app = url.replace(/^app:\/\//,'');
            switch(app) {
                case 'wjyl'://商城
                    STBAppManager.startAppByName("com.huawei.dsm");
                    break;
                case 'wjyx'://小沃
                    if(isHWv9) STBAppManager.startAppByName("com.wocheng.wjyx");
                    break;
                case 'bfyy':
                    break;
                case 'jy':
                    break;
                case 'wjsx':
                    break;
            }
        }else{
            /*obj = {
             contentType : '',
             contentId : '',
             categoryId : '',
             url : ''
             };*/
            $.gotoDetail(obj, false, savePageInfo);
        }
    }
}
/* page view */
var syContainer=dom('sy_container');
var DIVIDERS=[0,2367,3647,4927,6207,7487], RANGES=[38,2423,3700,5030,6280,7550], LOCATORS=[0,1087,2367,3647,4927,6207,7487], RANGES_SCREEN=[38,1125,2423,3700,5030,6280,7550];
function initPage() {
    $.initPage("HD");
    if($.getGlobalData(PAGE_INFO_KEY) && $.getGlobalData(PAGE_INFO_KEY)!='undefined'){
        savedData=FMT.str2obj($.getGlobalData(PAGE_INFO_KEY));
    }else{
        savedData={};
    }
    $.saveGlobalData(PAGE_INFO_KEY, FMT.obj2str({}));
    createDivs();

    var dividers=DIVIDERS, tabIds=['tab_tj','tab_db','tab_vip','tab_zt','tab_app','tab_mine'];
    var key=savedData['F'] || 'tj_div_0', translate=savedData['TR']&&parseInt(savedData['TR'],10) || 0;

    var from4ColorKey=$.getRequestParams('pos');
    switch(from4ColorKey) {
        case 'KEY_DIBBLING':
            translate=2367;
            key='tab_db';
            break;
        case 'KEY_INFORMATION':
            translate=7487;
            key='tab_mine';
            break;
        default:
            break;
    }

    var isTab=/^tab_/.test(key), subPageType=isTab?key.split('_')[1]:key.split('_')[0];
    !isTab&&addClass(dom('tab_'+subPageType), 'active');
    setTranslate(translate);
    $.getTargetObj(key);
    sendDataAccessSubpage(subPageType);

    showDate() && setInterval(showDate,60000);

    handleMp(/*oldTrans*/9999, translate);
    setTimeout(function(){addClass(page, 'transition')},0);

    document.body.style.background = 'url("images/bg.png") no-repeat transparent';
    document.body.style.visibility = 'visible';
}
function createDivs(){
    page=dom(document.createElement('div')).attr('className','page');
    /*SY*/
    var sySubPage1=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-1'),
        sySubPage2=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-2'),
        sySubPage3=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-3'),
        sySubPage4=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-4'),
        sySubPage5=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-5'),
        sySubPage6=dom(document.createElement('div')).attr('className','abs-pos sub-page sub-page-6');
    var sizeMap1=[], sizeMap2=[], sizeMap3=[], sizeMap4=[], sizeMap5=[], sizeMap6=[];
    sizeMap1[0]='tj-video-div'; for(var i=1;i<=3;i++)sizeMap1[i]='tj-square-div'; for(var i=4;i<=5;i++)sizeMap1[i]='tj-horiz-div'; for(var i=6;i<=9;i++)sizeMap1[i]='tj-verti-div'; for(var i=10;i<=11;i++)sizeMap1[i]='tj-horiz-div'; for(var i=12;i<=19;i++)sizeMap1[i]='tj-verti-div';
    for(var i=0;i<=1;i++)sizeMap2[i]='db-horiz-div'; for(var i=2;i<=3;i++)sizeMap2[i]='db-square-div'; for(var i=4;i<=9;i++)sizeMap2[i]='db-verti-div';
    for(var i=0;i<=1;i++)sizeMap3[i]='vip-horiz-div'; for(var i=2;i<=3;i++)sizeMap3[i]='vip-square-div'; for(var i=4;i<=9;i++)sizeMap3[i]='vip-verti-div';
    for(var i=0;i<=1;i++)sizeMap4[i]='zt-square-div'; sizeMap4[2]='zt-horiz-div'; for(var i=3;i<=6;i++)sizeMap4[i]='vip-square-div';
    for(var i=0;i<=4;i++)sizeMap5[i]='app-verti-div';
    for(var i=0;i<=9;i++)sizeMap6[i]='mine-square-div';
    var tempDiv, wrapper, subWrapper, wholeMsg, textItem, name, marqueeWidth, marqueeHeight, charLength, widthArr=[], charLens=[];
    /*推荐*/
    widthArr=[,,,,330,330,160,160,160,160,330,330,160,160,160,160,160,160,160,160];
    charLens=[,,,,18,18,7,7,7,7,18,18,7,7,7,7,7,7,7,7];
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_TJ_LIST.length,sizeMap1.length);i<len;i++){
        if(!DATA_TJ_LIST[i]) continue;
        wholeMsg=''; textItem=null; marqueeWidth=widthArr[i]||205; charLength=charLens[i]||15; marqueeHeight=30;
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap1[i]).attr('id','tj_div_'+i);
        if(DATA_TJ_LIST[i].name !== '#'){
            name=substring(DATA_TJ_LIST[i].name, charLength);
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_TJ_LIST[i].pic+'"><div class="title">'+(name||DATA_TJ_LIST[i].name)+'</div>'
            );
            if(name) {
                wholeMsg=DATA_TJ_LIST[i].name;
                textItem=tempDiv.getElementsByTagName('div')[0];
            }
        }else if(i>0){
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_TJ_LIST[i].pic+'">'
            );
        }
        if(i>=1&&i<=3){
            i==1 && (subWrapper=dom(document.createElement('div')).attr('className','sub-wrapper sub-wrapper-tj'));
            subWrapper.appendChild(tempDiv);
            i==3 && (wrapper.appendChild(subWrapper), subWrapper=null);
        }else{
            wrapper.appendChild(tempDiv);
        }
        TJ_INFO.push({
            key:'tj_div_'+i,
            data:DATA_TJ_LIST[i],
            textItem:textItem,
            wholeMsg:wholeMsg,
            width:marqueeWidth,
            height:marqueeHeight
        });
    }
    sySubPage1.appendChild(wrapper); page.appendChild(sySubPage1);
    /*点播*/
    widthArr=[,,,,330,330,240,240,160,160,160,160,160,160];
    charLens=[,,,,18,18,12,12,7,7,7,7,7,7];
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_DB_LIST.length,sizeMap2.length);i<len;i++){
        if(!DATA_DB_LIST[i]) continue;
        wholeMsg=''; textItem=null; marqueeWidth=widthArr[i]||205; charLength=charLens[i]||15; marqueeHeight=30;
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap2[i]).attr('id','db_div_'+i);
        if(DATA_DB_LIST[i].name !== '#'){
            name=substring(DATA_DB_LIST[i].name, charLength);
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_DB_LIST[i].pic+'"><div class="title">'+(name||DATA_DB_LIST[i].name)+'</div>'
            );
            if(name) {
                wholeMsg=DATA_DB_LIST[i].name;
                textItem=tempDiv.getElementsByTagName('div')[0];
            }
        }else{
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_DB_LIST[i].pic+'">'
            );
        }
        wrapper.appendChild(tempDiv);
        DB_INFO.push({
            key:'db_div_'+i,
            data:DATA_DB_LIST[i],
            textItem:textItem,
            wholeMsg:wholeMsg,
            width:marqueeWidth,
            height:marqueeHeight
        });
    }
    sySubPage2.appendChild(wrapper); page.appendChild(sySubPage2);
    /*VIP*/
    widthArr=[,,,,160,160,160,160,160,160];
    charLens=[,,,,7,7,7,7,7,7];
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_VIP_LIST.length,sizeMap3.length);i<len;i++){
        if(!DATA_VIP_LIST[i]) continue;
        wholeMsg=''; textItem=null; marqueeWidth=widthArr[i]||205; charLength=charLens[i]||15; marqueeHeight=30;
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap3[i]).attr('id','vip_div_'+i);
        if(DATA_VIP_LIST[i].name !== '#'){
            name=substring(DATA_VIP_LIST[i].name, charLength);
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_VIP_LIST[i].pic+'"><div class="title">'+(name||DATA_VIP_LIST[i].name)+'</div>'
            );
            if(name) {
                wholeMsg=DATA_VIP_LIST[i].name;
                textItem=tempDiv.getElementsByTagName('div')[0];
            }
        }else{
            html(tempDiv,
                '<img class="img-holder" src="'+DATA_VIP_LIST[i].pic+'">'
            );
        }
        wrapper.appendChild(tempDiv);
        VIP_INFO.push({
            key:'vip_div_'+i,
            data:DATA_VIP_LIST[i],
            textItem:textItem,
            wholeMsg:wholeMsg,
            width:marqueeWidth,
            height:marqueeHeight
        });
    }
    sySubPage3.appendChild(wrapper); page.appendChild(sySubPage3);
    /*专题*/
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_ZT_LIST.length,sizeMap4.length);i<len;i++){
        if(!DATA_ZT_LIST[i]) continue;
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap4[i]).attr('id','zt_div_'+i);
        html(tempDiv,
            '<img class="img-holder" src="'+DATA_ZT_LIST[i].pic+'">'
        );
        if(i>=3&&i<=4){
            i==3 && (subWrapper=dom(document.createElement('div')).attr('className','sub-wrapper sub-wrapper-zt'));
            subWrapper.appendChild(tempDiv);
            i==4 && (wrapper.appendChild(subWrapper), subWrapper=null);
        }else{
            wrapper.appendChild(tempDiv);
        }
        ZT_INFO.push({
            key:'zt_div_'+i,
            data:DATA_ZT_LIST[i]
        });
    }
    sySubPage4.appendChild(wrapper); page.appendChild(sySubPage4);
    /*APP*/
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_APP_LIST.length,sizeMap5.length);i<len;i++){
        if(!DATA_APP_LIST[i]) continue;
        //华为V9A可启动小沃
        var nV9='';
        if(i===1 && !isHWv9) nV9='not-hw-v9';
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap5[i]+' '+nV9).attr('id','app_div_'+i);
        html(tempDiv,
            '<img class="img-holder" src="'+DATA_APP_LIST[i].pic+'">'
        );
        wrapper.appendChild(tempDiv);
        APP_INFO.push({
            key:'app_div_'+i,
            data:DATA_APP_LIST[i]
        });
    }
    sySubPage5.appendChild(wrapper); page.appendChild(sySubPage5);
    /*MINE*/
    wrapper=dom(document.createElement('div')).attr('className','wrapper');
    for(var i=0, len=Math.min(DATA_MINE_LIST.length,sizeMap6.length);i<len;i++){
        if(!DATA_MINE_LIST[i]) continue;
        tempDiv=dom(document.createElement('div')).attr('className','f-div '+sizeMap6[i]).attr('id','mine_div_'+i);
        html(tempDiv,
            '<img class="img-holder" src="'+DATA_MINE_LIST[i].pic+'">'
        );
        wrapper.appendChild(tempDiv);
        MINE_INFO.push({
            key:'mine_div_'+i,
            data:DATA_MINE_LIST[i],
        });
    }
    sySubPage6.appendChild(wrapper); page.appendChild(sySubPage6);

    syContainer.appendChild(page); PAGE_INFO=TAB_INFO.concat(TJ_INFO, DB_INFO, VIP_INFO, ZT_INFO, APP_INFO, MINE_INFO);
    for(var i=0,len=PAGE_INFO.length;i<len;i++) ext(PAGE_INFO[i], {
        pressUp:function(){dirCtrlr('up');},
        pressDown:function(){dirCtrlr('down');},
        pressLeft:function(){dirCtrlr('left');},
        pressRight:function(){dirCtrlr('right');},
        pressOk:okCtrlr,
    });
}

/* Service = BEGIN */
function showDate(){
    var e=dom('now_time') || dom(document.createElement('div')).attr('id','now_time').attr('className','now-time');
    var now=new Date(), h=now.getHours(), M=now.getMinutes(), y=now.getFullYear(), m=now.getMonth()+1, d=now.getDate(), day=now.getDay();
    var weekdayNames='日一二三四五六';
    html(e,
        '<span class="time">'+(h<10?'0'+h:h)+':'+(M<10?'0'+M:M)+'</span><span class="date">'+y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+'</span><span class="day">星期'+weekdayNames.slice(day,day+1)+'</span>'
    );
    !dom('now_time') && document.body.appendChild(e);
    return true;
}
// video
function handleMp(oldTrans, newTrans){
    var i, rangesScreen=RANGES_SCREEN, oldScreen, newScreen;
    for(i=0;i<rangesScreen.length;i++)if(oldTrans<rangesScreen[i])break;
    oldScreen=i;
    for(i=0;i<rangesScreen.length;i++)if(newTrans<rangesScreen[i])break;
    newScreen=i;
    if(oldScreen==0 && newScreen>0){
        if(handleMPTimer){
            clearTimeout(handleMPTimer); handleMPTimer=null;
        }else{
            rmClass(dom('curtain'),'d-none');
            stopMp();
        }
    }else if(oldScreen>0 && newScreen==0){
        handleMPTimer=setTimeout(function(){addClass(dom('curtain'),'d-none');playSmMp();handleMPTimer=null;},1500);
    }
}
function stopMp() {
    SIZE_PLAYER && (SIZE_PLAYER.destoryMP()); //高清小窗口停止视频流方法
    mp && mp.stop && (mp.stop());
    top.mp && top.mp.stop && (top.mp.stop());
}
function playSmMp(){
    var num = DATA_VIDEO_ARR[0].url.replace(/channel:\/\//,'');
    $.callSizeLivePlay(40, 215, 471, 266, num);
}
/* = END */

