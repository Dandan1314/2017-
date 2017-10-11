var RECODE_DATA_KEY = "pageName";
var PAGE_INFO = [];
var ACTIVE_OBJECT;
function initPage() {
    $.initPage("HD");
    $.recodeData(RECODE_DATA_KEY, 'access');
    var a = new Date();
    var b = a.format('hh:mm')
    $('#time').html(b)
}

