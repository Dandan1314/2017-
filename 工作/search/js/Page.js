
    var PAGE = {
    currentPlugin : undefined //0
};
    //获取服务器地址
    var DB_URL = $.getConstant('searchDBUrl');
    //绑定在PAGE对象上的方法
    PAGE.saveInfo = function(infos){
    var pageInfo = [];
    for(var i in infos){
        //以键值对的形式传入数组pageInfo
    pageInfo.push(i + ':' + infos[i]);
}
    //把数组内容用-连接,并以键值对的形式保存
    $.saveGlobalData('search_pageInfo', pageInfo.join('-'));
};
    //b绑定方法
    //获取端口号
    PAGE.getInfo = function(){

    var out = {};
        //能获取到数据就使用,不能就赋值为空
    var infos = $.getGlobalData('search_pageInfo') || '';
        //如果为空就赋值成空数组,否则就根据-来拆分成数组
    infos = infos=='' ? [] : infos.split('-');
    for(var i in infos){//遍历
    var info = infos[i];
    var obj = info == '' ? [] : info.split(':');
    out[obj[0]] = obj[1];
}
    return out;
};
    //URL参数不存在categoryID时，是反向进入，获取相关数据
    if($.getRequestParams("categoryID") !== ''){//正向进入
    PAGE.infos = {
        search : '',
        pageNum : 0,
        inputName : 'a',
        activeName : '',
        listFocusIndex : 0
    };
}else{//反向进入
    var _infos = PAGE.getInfo();
    //进入详细页面
    PAGE.infos = {
    search : _infos['search'] || '',
    pageNum : _infos['pageNum'] || 0,
    inputName : _infos['inputName'] || 'a',
    activeName : _infos['activeName'] || '',
    listFocusIndex : _infos['listFocusIndex'] || 0
};
    $.saveGlobalData('search_pageInfo', '');
}

    //http://61.181.152.144:9999/search/content/sername/AQBX/category/20001110000000000000000000000209/nodeId/1100000001/pageNum/0/total/9/abc
    var plugin = {};
    plugin.query = (function(){
    var _opt;
    return {
    size : 9,
    pageNum : 0,//从0开始
    name : '',
    pages : 0,
    category : '',
    init : function(opt){
    _opt = opt;
    this.category = opt.category;
    this.typeId = opt.typeId;
    return this;
},

    fetch : function(name, pageNum){//pageNum
    var url = '';
    this.name = name;
    this.pageNum = pageNum - 0;//如果没有传入pageNum 则为0
    this.pages = 0;
        //这个就是input框中无数值的时候
    if(name === ''){//大家都在搜
    _opt.setTitle('大家都在搜');
        //拼接不同id的请求网址
    url = DB_URL + 'search/topSearch/typeId/' + this.typeId + '/searchNum/' + this.size + '/plugin.query.render2?' + (+new Date());
        //跨域请求?
    UTIL.loaderData(url);
}else{//猜你想搜
    _opt.setTitle('猜你想搜');
    url = DB_URL + 'search/content/sername/' + name + '/category/' + this.category + '/nodeId/1100000001/pageNum/' + pageNum + '/total/' + this.size + '/plugin.query.render';
    UTIL.loaderData(url);
}
    return this;
},
    fetchNextPage : function(){
    if(this.pages <= 1)return;
    this.pageNum++;
    //循环
    if(this.pageNum >= this.pages){
    this.pageNum = 0;
}
    this.fetch(this.name, this.pageNum);
    return this;
},
    fetchPreviousPage : function(){
    if(this.pages <= 1)return;
    this.pageNum--;
    //循环
    if(this.pageNum < 0){
    this.pageNum = this.pages - 1;
}
    this.fetch(this.name, this.pageNum);
    return this;
},
    render : function(d){//猜你想搜
    // log(d.data[0].vodName)
        //翻页逻辑
    this.pages = Math.ceil((d.count || 0) / this.size);
    var page = this.pageNum + 1;
    if(this.pages === 0){
    page = 0;
}
    _opt.render(d.data || [], this.pages, page);
    return this;
},
    render2 : function(d){//大家都在搜
    _opt.render2(d || []);
    return this;
}
};
})();
    //输入框
    plugin.input = (function(){
    var el_panel,
    _opt,
    _strs = [];
    var _showStr = function(){
    var strs = _strs.join('');
    el_panel.innerText = strs;
    _onStrChange(strs);
};
    var _onStrChange = function(strs){
    _opt.fetch(strs);
};
    return {
    init : function(opt){
    _opt = opt;
    el_panel = UTIL.getEl(opt.el);
    return this;
},
    inActive : function(){
    UTIL.classHelper.add('focus', el_panel);
    _opt.inActive(this);
    return this;
},
    outActive : function(d){
    UTIL.classHelper.remove('focus', el_panel);
    _opt.outActive(d);
    return this;
},
    down : function(){
    this.outActive('down');
    return this;
},
    ok : function(){
    // _showStr();
    return this;
},
    add : function(str){
    if(str && _strs.length < _opt.size){
    _strs.push(str.slice(0,1));
    _showStr();
}
    return this;
},
    del : function(){
    if(_strs.length){
    _strs.pop();
    _showStr();
}
    return this;
},
    empty : function(){
    if(_strs.length){
    _strs = [];
    _showStr();
}
    return this;
},
    fetch : function(strs){//直接传入字符串
    _strs = _strs.concat(strs.split(''));
    _showStr();
    return this;
}
};
})();
    //A 输入法
    plugin.aInput = (function(){
    var el_panel,
    el_current,
    _opt,
    _lines,
    _length;

    var _changeFocus = function(el){
    UTIL.classHelper.remove('focus', el_current);
    el_current = el;
    UTIL.classHelper.add('focus', el_current);
};
    return {
    init : function(opt){
    _opt = opt;
    el_panel = UTIL.getEl(opt.el);
    el_panel.childrens = UTIL.Element.children(el_panel);
    _length = el_panel.childrens.length || 0;
    _lines = Math.ceil(_length / _opt.column);
    return this;
},
    reset : function(){
    el_current = undefined;
    return this;
},
    inActive : function(){
    _changeFocus(el_current || el_panel.childrens[0]);
    _opt.inActive(this);
    return this;
},
    outActive : function(d){
    //可移出
    if(_opt.outActive(d)){
    UTIL.classHelper.remove('focus', el_current);
}
    return this;
},
    show : function(){
    UTIL.classHelper.remove('none', el_panel);
    return this;
},
    hide : function(){
    UTIL.classHelper.add('none', el_panel);
    return this;
},
    ok : function(){
    _opt.ok(el_current.getAttribute('key'));
    return this;
},
    up : function(){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    if(line > 1){
    var nextIndex = index - _opt.column;
    //调整清空向上到W
    if(index === _length - 1){
    nextIndex = nextIndex + 1;
}
    //校正
    (nextIndex < 0) && (nextIndex = 0);
    _changeFocus(el_panel.childrens[nextIndex]);
}else{
    this.outActive('up');
}
    return this;
},
    down : function(){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    if(line < _lines){
    var nextIndex = index + _opt.column;
    //调整V向下到删除
    if(nextIndex === _length - 1){
    nextIndex = nextIndex - 1;
}
    //校正
    (nextIndex > _length - 1) && (nextIndex = _length - 1);
    _changeFocus(el_panel.childrens[nextIndex]);
}else{
    this.outActive('down');
}
    return this;
},
    left : function(){
    var el_l = UTIL.Element.previous(el_current);
    if(el_l){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    var nextIndex = UTIL.indexOf(el_panel.childrens, el_l);
    var nextLine = Math.ceil((nextIndex + 1) / _opt.column);
    //不超出本行
    if(line === nextLine){
    _changeFocus(el_l);
}else{
    // this.outActive('left');
}
}else{
    // this.outActive('left');
}
    return this;
},
    right : function(){
    var el_r = UTIL.Element.next(el_current);
    if(el_r){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    var nextIndex = UTIL.indexOf(el_panel.childrens, el_r);
    var nextLine = Math.ceil((nextIndex + 1) / _opt.column);
    //不超出本行
    if(line === nextLine){
    _changeFocus(el_r);
}else{
    this.outActive('right');
}
}else{
    this.outActive('right');
}
    return this;
}
};
})();
    //B 输入法
    plugin.bInput = (function(){
    var el_panel,
    el_current,
    _opt,
    _lines,
    _length;

    var _changeFocus = function(el){
    UTIL.classHelper.remove('focus', el_current);
    el_current = el;
    UTIL.classHelper.add('focus', el_current);
};

    var _menu = {
    isShow : false,
    keys : [],//顺序:上左中右下
    el : undefined,
    elFocus : undefined,
    renderFocus : function(el){
    UTIL.classHelper.remove('focus', this.elFocus);
    this.elFocus = el;
    UTIL.classHelper.add('focus', this.elFocus);
},
    show : function(el, keys){
    UTIL.classHelper.add('selected', el);
    //兼容创维
    var cn = el.className;
    el.className = cn + ' selected';
    //默认中间获得焦点
    this.renderFocus(UTIL.getElByClass('mid', el)[0]);
    this.keys = keys;
    this.el = el;
    this.isShow = true;
},
    close : function(){
    UTIL.classHelper.remove('selected', this.el);
    this.keys = [];
    this.el = undefined;
    this.isShow = false;
},
    ok : function(callback){
    var index = this.elFocus.getAttribute('index') - 0;
    var key = this.keys[index];
    if(key){
    this.close();
    callback(key);
}
},
    up : function(){
    var index = this.elFocus.getAttribute('index') - 0;
    if(index === 4){
    this.renderFocus(UTIL.getElByClass('mid', this.el)[0]);
}else{
    if(index !== 0){
    this.renderFocus(UTIL.getElByClass('up', this.el)[0]);
}
}
},
    down : function(){
    var index = this.elFocus.getAttribute('index') - 0;
    if(index === 0){
    this.renderFocus(UTIL.getElByClass('mid', this.el)[0]);
}else{
    if(index !== 4){
    var el_d = UTIL.getElByClass('down', this.el)[0];
    if(el_d){
    this.renderFocus(el_d);
}
}
}
},
    left : function(){
    var index = this.elFocus.getAttribute('index') - 0;
    if(index === 3){
    this.renderFocus(UTIL.getElByClass('mid', this.el)[0]);
}else{
    if(index !== 1){
    this.renderFocus(UTIL.getElByClass('left', this.el)[0]);
}
}
},
    right : function(){
    var index = this.elFocus.getAttribute('index') - 0;
    if(index === 1){
    this.renderFocus(UTIL.getElByClass('mid', this.el)[0]);
}else{
    if(index !== 3){
    this.renderFocus(UTIL.getElByClass('right', this.el)[0]);
}
}
}
};
    return {
    init : function(opt){
    _opt = opt;
    el_panel = UTIL.getEl(opt.el);
    el_panel.childrens = UTIL.Element.children(el_panel);
    _length = el_panel.childrens.length;
    _lines = Math.ceil(_length / _opt.column);
    return this;
},
    reset : function(){
    el_current = undefined;
    return this;
},
    show : function(){
    UTIL.classHelper.remove('none', el_panel);
    return this;
},
    hide : function(){
    UTIL.classHelper.add('none', el_panel);
    return this;
},
    inActive : function(){
    _changeFocus(el_current || el_panel.childrens[0]);
    _opt.inActive(this);
    return this;
},
    outActive : function(d){
    if(_opt.outActive(d)){
    UTIL.classHelper.remove('focus', el_current);
}
    return this;
},
    ok : function(){
    var key = el_current.getAttribute('key');
    var keys = key.split('-');
    if(_menu.isShow){
    _menu.ok(_opt.ok);
}else{
    //多个
    if(keys.length > 1){
    _menu.show(el_current, keys);
}else{
    _opt.ok(key);
}
}
    return this;
},
    up : function(){
    if(_menu.isShow){
    _menu.up();
}else{
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    if(line > 1){
    var nextIndex = index - _opt.column;
    //校正
    (nextIndex < 0) && (nextIndex = 0);
    _changeFocus(el_panel.childrens[nextIndex]);
}else{
    this.outActive('up');
}
}
    return this;
},
    down : function(){
    if(_menu.isShow){
    _menu.down();
}else{
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    if(line < _lines){
    var nextIndex = index + _opt.column;
    //校正
    (nextIndex > _length - 1) && (nextIndex = _length - 1);
    _changeFocus(el_panel.childrens[nextIndex]);
}else{
    this.outActive('down');
}
}
    return this;
},
    left : function(){
    if(_menu.isShow){
    _menu.left();
}else{
    var el_l = UTIL.Element.previous(el_current);
    if(el_l){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    var nextIndex = UTIL.indexOf(el_panel.childrens, el_l);
    var nextLine = Math.ceil((nextIndex + 1) / _opt.column);
    //不超出本行
    if(line === nextLine){
    _changeFocus(el_l);
}else{
    // this.outActive('left');
}
}else{
    // this.outActive('left');
}
}
    return this;
},
    right : function(){
    if(_menu.isShow){
    _menu.right();
}else{
    var el_r = UTIL.Element.next(el_current);
    if(el_r){
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    var line = Math.ceil((index + 1) / _opt.column);
    var nextIndex = UTIL.indexOf(el_panel.childrens, el_r);
    var nextLine = Math.ceil((nextIndex + 1) / _opt.column);
    //不超出本行
    if(line === nextLine){
    _changeFocus(el_r);
}else{
    this.outActive('right');
}
}else{
    this.outActive('right');
}
}
    return this;
},
    hideMenu : function(){
    if(_menu.isShow){
    _menu.close();
    return true;
}else{
    return false;
}
}
};
})();
    //输入法切换
    plugin.sw = (function(){
    var el_panel,
    isNew = false;
    return {
    init : function(opt){
    _opt = opt;
    el_panel = UTIL.getEl(opt.el);
    return this;
},
    inActive : function(){
    UTIL.classHelper.add('focus', el_panel);
    _opt.inActive(this);
    return this;
},
    outActive : function(d){
    UTIL.classHelper.remove('focus', el_panel);
    _opt.outActive(d);
    return this;
},
    up : function(){
    this.outActive('up');
    return this;
},
    left : function(){
    if(isNew){//新输入法 向左 切换成 旧输入法
    isNew = false;
    UTIL.classHelper.remove('b', el_panel);
    _opt.swInput('a');
}else{

}
    return this;
},
    right : function(){
    if(isNew){
    this.outActive('right');
}else{//旧输入法 向右 切换成 新输入法
    isNew = true;
    UTIL.classHelper.add('b', el_panel);
    _opt.swInput('b');
}
    return this;
},
    swInput : function(key){//直接切换
    if(key === 'a' || key === 'b'){
    if(key === 'a'){
    UTIL.classHelper.remove('b', el_panel);
    isNew = false;
}else{
    UTIL.classHelper.add('b', el_panel);
    isNew = true;
}
    _opt.swInput(key);
}
    return this;
}
};
})();
    //列表
    plugin.list = (function(){
    var el_panel,
    el_list,
    el_num,
    el_up,
    el_down,
    el_current,
    el_title,
    _focusOn = false,//列表应获取焦点
    _opt;
    var _render = function(ds){
    var out = [];
    for(var i in ds){
    var d = ds[i];
    if(d){
    var li = '<li data-url="' + d.url + '" data-id="' + d.id + '"';
    var name = d.vodName;
    //超长时短化
    if(name.length > 10){
    name = name.substring(0, 9);
    var matchs = name.match(/[\x00-\xff]/g);
    if(matchs){
    name = d.vodName.substring(0, Math.ceil(9 + matchs.length / 2));
}
    if(name.length !== d.vodName.length){
    name += '...';
    //滑动用
    li += ' tip="' + encodeURIComponent(d.vodName) + '"';
}
}
    li += '>' + name + '</li>';

    out.push(li);
}
}
    if(!out.length){
    out.push('<span class="nothing">暂无记录!</span>');
}
    el_list.innerHTML = out.join('');
    el_list.childrens = UTIL.getElByTag('li', el_list);
    /*if(_focusOn){
     _changeFocus(el_list.childrens[0]);
     }*/
};
    var _render2 = function(ds){
    var out = [];
    for(var i in ds){
    var d = ds[i][0];
    if(d){
    var li = '<li data-id="' + d.id + '" data-url="' + d.url + '"';
    var name = d.vodName;
    //超长时短化
    if(name.length > 10){
    name = name.substring(0, 9);
    var matchs = name.match(/[\x00-\xff]/g);
    if(matchs){
    name = d.vodName.substring(0, Math.ceil(9 + matchs.length / 2));
}
    if(name.length !== d.vodName.length){
    name += '...';
    //滑动用
    li += ' tip="' + encodeURIComponent(d.vodName) + '"';
}
}
    li += '>' + name + '</li>';

    out.push(li);
}
}
    if(!out.length){
    out.push('<span class="nothing">暂无记录!</span>');
}
    el_list.innerHTML = out.join('');
    el_list.childrens = UTIL.getElByTag('li', el_list);
    /*if(_focusOn){
     _changeFocus(el_list.childrens[0]);
     }*/
};
    var _changeFocus = function(el){
    if(!el) return;
    UTIL.classHelper.remove('focus', el_current);
    el_current = el;
    UTIL.classHelper.add('focus', el_current);
    var cn = el_current.className;
    el_current.className = cn + ' focus';

    //兼容创维
    el_panel.childrens = UTIL.getElByTag('li', el_panel);
};
    return {
    init : function(opt){
    _opt = opt;
    el_panel = UTIL.getEl(opt.el);
    el_list = UTIL.getElByClass('list', el_panel)[0];
    el_list.childrens = UTIL.Element.children(el_list);
    el_num = UTIL.getElByClass('num', el_panel)[0];
    el_up = UTIL.getElByClass('up', el_panel)[0];
    el_down = UTIL.getElByClass('down', el_panel)[0];
    el_title = UTIL.getElByClass('title', el_panel)[0];
    return this;
},
    render : function(ds, pages, page, callback){//猜你想搜
    _render(ds);
    el_num.innerText = page + '/' + pages;
    callback(_focusOn, el_list.childrens, _changeFocus);
    //滑动
    var el_name = el_current;
    if(el_name){
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}
    return this;
},
    render2 : function(ds, callback){//大家都在搜
    if(ds.length <= 0){
    el_num.innerText = '0/0';
}else{
    el_num.innerText = '1/1';
}
    _render2(ds);
    callback(_focusOn, el_list.childrens, _changeFocus);
    //滑动
    var el_name = el_current;
    if(el_name){
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}
    return this;
},
    setTitle : function(title){
    el_title.innerText = title || '';
},
    inActive : function(){
    var el_f = el_list.childrens[0];
    if(el_f){
    _changeFocus(el_f);
    _focusOn = true;
    //滑动
    var el_name = el_current;
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}else{
    _changeFocus(el_up);
}
    _opt.inActive(this);
    return this;
},
    outActive : function(d){
    if(_opt.outActive(d)){
    this.slide();
    UTIL.classHelper.remove('focus', el_current);
    el_current = undefined;
    _focusOn = false;
}
    return this;
},
    slide: function(target){
    /*target = {
     el : undefined,
     tip : '',
     html : ''
     };*/
    //还原前一个
    if(this.slide._target){
    this.slide._target.el.innerHTML = this.slide._target.html;
}
    //开始现在
    if(target){
    this.slide._target = target;
    target.el.innerHTML = '<marquee width="215px" height="38px" scrollamount="4">' + decodeURIComponent(target.tip) + '</marquee>';
}
},
    up : function(){
    var name = el_current && el_current.getAttribute('name') || '';
    if(name !== 'up'){
    var el_u = UTIL.Element.previous(el_current);
    if(el_u){
    _changeFocus(el_u);
    //滑动
    var el_name = el_current;
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}else{
    this.pageUp();
}
}
    return this;
},
    down : function(){
    var name = el_current && el_current.getAttribute('name') || '';
    if(name !== 'down'){
    var el_d = UTIL.Element.next(el_current);
    if(el_d){
    _changeFocus(el_d);
    //滑动
    var el_name = el_current;
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}else{
    this.pageDown();
}
}
    return this;
},
    left : function(){
    var name = el_current && el_current.getAttribute('name') || '';
    //在上下翻页时，按左
    if(name === 'up' || name === 'down'){
    var el_l = el_list.childrens[0];
    if(el_l){
    _changeFocus(el_l);
    _focusOn = true;
    //滑动
    var el_name = el_current;
    var tip = el_name.getAttribute('tip');
    var html = el_name.innerText;
    if(tip){
    this.slide({
    tip: tip,
    html: html,
    el: el_name
});
}else{
    this.slide();
}
}else{
    this.outActive('left');
}
}else{//在列表上，按左
    this.outActive('left');
}
    return this;
},
    right : function(){
    var name = el_current && el_current.getAttribute('name') || '';
    //不在上下翻页时
    if(name !== 'up' && name !== 'down'){
    var index = UTIL.indexOf(el_list.childrens, el_current);
    this.slide();
    if(index <= 4){
    _changeFocus(el_up);
}else{
    _changeFocus(el_down);
}
    _focusOn = false;
}
    return this;
},
    ok : function(){
    var name = el_current && el_current.getAttribute('name') || '';
    if(name === 'up' || name === 'down'){//翻页
    if(name === 'up'){
    this.pageUp();
}
    if(name === 'down'){
    this.pageDown();
}
}else{//进入详细页
    var url = el_current.getAttribute('data-url');
    var id = el_current.getAttribute('data-id');
    if(id != undefined){
    _opt.insertData(id);
    var index = UTIL.indexOf(el_panel.childrens, el_current);
    _opt.forward(url, index, id);
}
}
    return this;
},
    pageUp : function(){
    _opt.pageUp();
    return this;
},
    pageDown : function(){
    _opt.pageDown();
    return this;
},
    setFocusOn : function(){
    _focusOn = true;
    return this;
}
};
})();
    window.onload = function(){
    $.recodeData('ss','access');
    plugin.query.init({
    render : function(ds, pages, page){//猜你想搜
    plugin.list.render(ds, pages, page, function(focusOn, items, renderFn){
    if(focusOn){
    renderFn(items[PAGE.infos.listFocusIndex]);
    // PAGE.infos.listFocusIndex = 0;
}
});
},
    render2 : function(ds){//大家都在搜
    plugin.list.render2(ds, function(focusOn, items, renderFn){
    if(focusOn){
    renderFn(items[PAGE.infos.listFocusIndex]);
    // PAGE.infos.listFocusIndex = 0;
}
});
},
    setTitle : plugin.list.setTitle,
    category : CATEGORY,
    typeId : TYPEID
});
    plugin.query.key = 'query';
    plugin.list.init({
    el : 'result_panel',
    inActive : function(obj){
    PAGE.currentPlugin = obj;
},
    outActive : function(d){
    switch(d){
    case 'left':
    plugin.myInput.inActive();
    return true;
    break;
};
},
    pageUp : function(){
    PAGE.infos.listFocusIndex = 0;
    plugin.query.fetchPreviousPage();
},
    pageDown : function(){
    PAGE.infos.listFocusIndex = 0;
    plugin.query.fetchNextPage();
},
    forward : function(url, listFocusIndex){
    var _url = STB_BASEURL + 'detailPage' + url + '.html?categoryId=' + CATEGORY;
    PAGE.saveInfo({
    search : PAGE.infos.search,
    pageNum : plugin.query.pageNum,
    inputName : PAGE.infos.inputName,
    activeName : plugin.list.key,
    listFocusIndex : listFocusIndex
});
    $.forward(_url);
},
    insertData : function(id){
    var url = DB_URL + 'insertTopSearch/topSearch/typeId/'+TYPEID+'/vodId/' + id + '/';
    UTIL.loader(url);
}
});
    plugin.list.key = 'list';
    plugin.input.init({
    el : 'input_panel',
    size : 11,
    inActive : function(obj){
    PAGE.currentPlugin = obj;
},
    outActive : function(d){
    switch(d){
    case 'down':
    plugin.myInput.inActive();
    break;
};
},
    fetch : function(strs){
    var pageNum = PAGE.infos.pageNum || 0;
    plugin.query.fetch(strs, pageNum);
    PAGE.infos.search = strs;
    PAGE.infos.pageNum = 0;
}
});
    plugin.input.key = 'input';
    //返回删除
    plugin.input.back = function(){
    this.del();
    return true;
}
    plugin.aInput.init({
    el : 'input_a',
    column : 6,
    ok : function(key){
    if(key === 'del'){
    plugin.input.del();
}else if(key === 'empty'){
    plugin.input.empty();
}else{
    plugin.input.add(key);
}
},
    inActive : function(obj){
    PAGE.currentPlugin = obj;
},
    outActive : function(d){
    switch(d){
    case 'up':
    plugin.input.inActive();
    return true;
    break;
    case 'down':
    plugin.sw.inActive();
    return true;
    break;
    case 'right':
    plugin.list.inActive();
    return true;
    break;
};
}
});
    plugin.aInput.key = 'aInput';
    plugin.bInput.init({
    el : 'input_b',
    column : 3,
    ok : function(key){
    if(key === 'del'){
    plugin.input.del();
}else if(key === 'empty'){
    plugin.input.empty();
}else{
    plugin.input.add(key);
}
},
    inActive : function(obj){
    PAGE.currentPlugin = obj;
},
    outActive : function(d){
    switch(d){
    case 'up':
    plugin.input.inActive();
    return true;
    break;
    case 'down':
    plugin.sw.inActive();
    return true;
    break;
    case 'right':
    plugin.list.inActive();
    return true;
    break;
};
}
});
    plugin.bInput.key = 'bInput';
    //返回关闭子菜单
    plugin.bInput.back = function(){
    return this.hideMenu();
}
    plugin.sw.init({
    el : 'sw_panel',
    inActive : function(obj){
    PAGE.currentPlugin = obj;
},
    outActive : function(d){
    switch(d){
    case 'up':
    plugin.myInput.inActive();
    break;
    case 'right':
    plugin.list.inActive();
    break;
};
},
    swInput : function(key){
    if(plugin.myInput){
    plugin.myInput.reset().hide()
}
    if(key === 'a'){
    plugin.myInput = plugin.aInput;
    PAGE.infos.inputName = 'a';
}
    if(key === 'b'){
    plugin.myInput = plugin.bInput;
    PAGE.infos.inputName = 'b';
}

    plugin.myInput.reset().show();
}
});
    plugin.sw.key = 'sw';

    //当前输入法
    plugin.sw.swInput(PAGE.infos.inputName);
    //当前对象
    PAGE.currentPlugin = ((PAGE.infos.activeName && plugin[PAGE.infos.activeName]) || plugin.myInput);
    if(PAGE.currentPlugin && PAGE.currentPlugin.key === 'list'){
    plugin.list.setFocusOn();
}else{
    PAGE.currentPlugin.inActive();
}
    //模拟输入
    plugin.input.fetch(PAGE.infos.search);
    initEvent();
};
    function sysGoBack(){
    $.back();
}

    /* 注册按键 */
    function initEvent(){
    $.keymap[33] = "KEY_PAGEUP";
    $.keymap[34] = "KEY_PAGEDOWN";
    $.keyPressSettiing({
    "KEY_RETURN" : function(){
    var sysReturn = true;
    if(PAGE.currentPlugin && PAGE.currentPlugin.back){
    sysReturn = !PAGE.currentPlugin.back();
}
    sysReturn && (sysGoBack());
},
    "KEY_PAGEUP" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.pageUp && (PAGE.currentPlugin.pageUp());
},
    "KEY_PAGEDOWN" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.pageDown && (PAGE.currentPlugin.pageDown());
},
    "KEY_UP" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.up && (PAGE.currentPlugin.up());
},
    "KEY_DOWN" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.down && (PAGE.currentPlugin.down());
},
    "KEY_LEFT" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.left && (PAGE.currentPlugin.left());
},
    "KEY_RIGHT" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.right && (PAGE.currentPlugin.right());
},
    "KEY_OK" : function(){
    PAGE.currentPlugin && PAGE.currentPlugin.ok && (PAGE.currentPlugin.ok());
}
});
}

