$(function() {
	var username = store.get('username');
	if (!username) {
		window.location.href = "/scfcloud/login.html";
	}
	if (username.length > 10) {
		$('#loginRealName').attr("title", username);
		username = username.substring(0,8) + "...";
	}
	$('#loginRealName').text(username);
	InitLeftMenu();
//	logoShow();
});
	
//初始化左侧
function InitLeftMenu() {
	var jsonStringData = store.get("menuList");
	var selectNode = store.get("menuListNode");
	jsonStringData = jsonStringData.replace(/menuName/g,'text');
	jsonStringData = jsonStringData.replace(new RegExp("subMenuList","gm"),"nodes");
	var jsonData=eval('('+ jsonStringData +')');
	$('#leftMenuList').treeview({
		data : jsonData,
		levels: 0,
		color: '#ffffff',
		backColor: '#626262',
		onhoverColor: '#393939',
		selectedBackColor: '#393939',
		selectedColor: '#2582e3',
		searchResultColor: '#2582e3'
	});
	if (selectNode) {
		var node = $("#leftMenuList").treeview('search', selectNode.text, {exactMatch: true, revealResults: true});
		$("#leftMenuList").treeview('selectNode', node[0], {silent: true}).treeview('clearSearch');
	}
	$('#leftMenuList').on('nodeSelected', function(event, data) {
		$('#m_menuPath').val(data.menuPath);
		if(!CloudUtils.isEmpty(data.menuPath)){
			store.set("menuListNode", data);
			window.location.href = "/scfcloud/" + data.menuPath;
//			$("[name='mainFrame']").attr("src",data.menuPath);
		}
	});
}

function goHome() {
	store.remove("menuListNode");
	window.location.href = "/scfcloud/index.html"
}

function logOut() {
	var options = {
		url:"/scfcloud/login/logout",
		data:"{}",
		callBackFun : function(data) {
			if(data.result==0){
				store.clear();
				window.location.href="/scfcloud/login.html";
	    	}
		},
		errorCallback:function(data){
			alert("error");
		}
	};
	CloudUtils.ajax(options);
}

/*
 * logo显示
 * by-JH
 */
//function logoShow(){
//	$("#logo").attr("src", "/scfcloud/images/logo.png");
//	var corpId = store.get('corpId');
//	if(corpId == null || corpId == 'null'){
//		$("#logo").attr("src", "/scfcloud/images/logo.png");
//		return;
//	}
//	var param = {    
//		corpId: corpId,
//		isLogo: "Y"
//    };
//	var options = {
//		url:"corp/list",
//		data:JSON.stringify(param),
//		callBackFun : function(data) {
//			if(data.result==0){
//				if(data.dataList.length == 0||data.dataList[0].logoUrl==null||data.dataList[0].logoUrl==""){
//					$("#logo").attr("src", "/scfcloud/images/logo.png");
//				}else{
//					$("#logo").attr("src", data.dataList[0].logoUrl);
//				}
//			}
//		}/*,
//		errorCallback:function(data){
//			alert("error");
//		}*/
//	};
//	CloudUtils.ajax(options);
//}