//let corpId = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).corpId;
let corpId = window.location.search.substr(1).split("=")[1];
$(function(){
	showTabs();
	$('#corpId').val(corpId);
})

function showTabs(){
	CloudUtils.getTab("../../crm/custInfoManager/info/coreEnterpriseBase.html", "panel-base");
	CloudUtils.getTab("../../crm/custInfoManager/info/finance.html", "panel-finance");
}