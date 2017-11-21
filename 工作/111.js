function dirCtrlr(dir) {
    var d0 = ACTIVE_OBJECT.key && dom(ACTIVE_OBJECT.key),
        index = indexObj(PAGE_INFO, ACTIVE_OBJECT.key, 'key');
    if (!d0 || index < 0)return;
    // page容器里按照一般逻辑, 最上一行为到tab的逻辑
    var d,
        begin = 6,
        end = PAGE_INFO.length - 1,
        top0 = d0.offsetTop,
        left0 = d0.offsetLeft,
        width0 = d0.offsetWidth,
        height0 = d0.offsetHeight,
        top, left, width, height,
        success = false;
    var isTabBtn = /^tab_/.test(ACTIVE_OBJECT.key),
        isTopRow = top0 < 50; // 假设不会小于50
    if (!isTabBtn) {
        var translate = getTranslate();
        var dividers = DIVIDERS.concat([DIVIDERS[DIVIDERS.length - 1] + 1280]),
            ranges = RANGES,
            tabIds = ['tab_tj', 'tab_db', 'tab_vip', 'tab_zt', 'tab_app', 'tab_mine'],
            currentDivider, nxtDivider,
            subPageType = ACTIVE_OBJECT.key.split('_')[0];
        var i;
        for (i = 0; i < ranges.length; i++)if (translate < ranges[i] + left0)break;
        nxtDivider = currentDivider = i;
        // resolution 2 - locators, rangesScreen 只需保证不超出
        var locators = LOCATORS, rangesScreen = RANGES_SCREEN, curScreen;
        for (i = 0; i < rangesScreen.length; i++)if (translate < rangesScreen[i])break;
        curScreen = i;
    }}