var RECODE_DATA_KEY = "pageName";
var PAGE_INFO = [];
var ACTIVE_OBJECT;
function initPage() {
    $.initPage("HD");
    $.recodeData(RECODE_DATA_KEY, 'access');
    LIST_TOOL.init();
}
