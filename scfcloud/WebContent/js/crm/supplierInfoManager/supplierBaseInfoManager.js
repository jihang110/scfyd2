
var corpId = "corp00001";
$(function(){
	dataSearch();
})

function dataSearch(){
	var url = "../../orgnLoanCount/listBaseInfo";
	var data = {"corpId":corpId};
	var options = {
			url : url,
			data : JSON.stringify(data),
			callBackFun : function(data) {
				if(data.result==0){
					fuzzySearch(data);
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};		
	CloudUtils.ajax(options);
}

/*
 * 模糊查询
 */
function fuzzySearch(data){
	var jsonStringData = JSON.stringify(data.dataList);
	jsonStringData=jsonStringData.replace(/coreCorpName/g,'label');
	var jsonData=eval('('+ jsonStringData +')');
	$('#coreCorpName').autocompleter({
        highlightMatches: true,
        source: jsonData,
        // show hint
        hint: false,
        empty: false
       });
}
























