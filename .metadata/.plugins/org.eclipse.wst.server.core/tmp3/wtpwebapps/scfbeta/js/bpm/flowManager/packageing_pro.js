let corpId = null;
$(function(){
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/proInfoPanel.html","proInfoPanel");
	timedMsg();
	chg();
})

function showTabs(){
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/proAnlyPanel.html","proAnlyPanel");
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/splInfoPanel.html","splInfoPanel");
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/splFinInfoPanel.html","splFinInfoPanel");
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/creditLtgInfoPanel.html","creditLtgInfoPanel");
	CloudUtils.getTab("../../tabs/bmp/flowManager/projectTuning/busiInfoPanel.html","busiInfoPanel");
}
//延时加载
function timedMsg()
{	
	var t=setTimeout(showTabs,100);
	getScript();
}
function getScript(){ 
	 jQuery.getScript("/scfbeta/js/bpm/flowManager/financeViladManager.js");
	 jQuery.getScript("/scfbeta/js/bpm/flowManager/financeInfoManager.js");
	 jQuery.getScript("/scfbeta/js/bpm/flowManager/financeCountManager.js");
	 jQuery.getScript("/scfbeta/js/bpm/flowManager/creditInfoManager.js");
	 jQuery.getScript("/scfbeta/js/bpm/flowManager/financeCountManager.js");
	  jQuery.getScript("/scfbeta/js/bpm/flowManager/creditInfoManager.js");
	  jQuery.getScript("/scfbeta/js/bpm/flowManager/contractInfoManager.js");
	  jQuery.getScript("/scfbeta/js/bpm/flowManager/proAnlyPanel.js");
	  jQuery.getScript("/scfbeta/js/bpm/flowManager/flowAttachment.js");
	  jQuery.getScript("/scfbeta/js/bpm/flowManager/projectBase.js");
}
function chg(){
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		if(isJump==2) {
			$(".riskAdvices").show();
		}else{
			$(".riskAdvices").hide();
		}
	});
}