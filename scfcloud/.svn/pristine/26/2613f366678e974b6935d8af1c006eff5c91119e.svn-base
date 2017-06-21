$(function(){
	if(store.get('roleType')==2){
		$(".btnHide").removeClass("hidden");
	}
	CloudUtils.inputCacheClear();
	initTable();
	dataSearch();
	$('#btn_search').click(function() {
		initTable();
	});
	$('#btn_add').click(function () {
		window.location.href = '../../asset/traderInfo/traderInfoModManager.html';
	});
	
});

//重置按钮事件
function ResetBtn(){
	$("#corpName").val("");
}

function dataSearch(){
	var url = "../../corp/list";
	var data = {"sysType": 3};
	var options = {
		url : url,
		data : JSON.stringify(data),
		callBackFun : function(data) {
//			debugger
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

function fuzzySearch(data){
	var jsonStringData = JSON.stringify(data.dataList);
	jsonStringData=jsonStringData.replace(/corpName/g,'label');
	var jsonData=eval('('+ jsonStringData +')');
	$('#corpName').autocompleter({
        highlightMatches: true,
        source: jsonData,
        // show hint
        hint: false,
        empty: true,
        // max results
        limit: 5,
        cashe: true,
        callback: function (value, index, selected) {
        	$('#corpId').val(selected.corpId);
        }
	});
}

function initTable(){
	var corpId = $("#corpId").val() ;
	$('#corpListTable').bootstrapTable('destroy');
	$("#corpListTable").bootstrapTable({
		method : "post",
		url : "../../corp/list",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : false, //显示下拉框勾选要显示的列  
		showRefresh : false, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var data = CloudUtils.convertStringJson('searchForm');
			var jsonData = eval("(" + data + ")");
			var param = {
				corpId : corpId,
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1,
				sysType: 3,
				corpName: jsonData.corpName == null ? '' : jsonData.corpName
			};
			return JSON.stringify(param);
		},
		responseHandler : function responseHandler(res) {
			if (res.result == 0) {
				return {
					"rows" : res.dataList,
					"total" : res.records
				};

			} else {
				bootbox.alert(res.resultNote);
				return {
					"rows" : [],
					"total" : 0
				};
			}
		},
		columns : [
			{
				field : 'corpId',
				title : 'Item ID',
				align : 'center',
				valign : 'middle',
				visible : false
			},
			{
				field : 'corpName',
				title : '券商名称',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'applicantName',
				title : '联系人',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'applicantPhone',
				title : '移动电话',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'job',
				title : '职务',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'operation',
				title : '操作',
				align : 'center',
				valign : 'middle',
				formatter : function(value, row, index) {
					var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
					var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
					return s + ' ' + r;
				},
				events : 'operateEvents'
			}
		]
	});
}

window.operateEvents = {
		'click .modify' : function(e, value, row, index) {
			window.location.href = '../../asset/traderInfo/traderInfoModManager.html?corpId='+row.corpId;
		},
		'click .remove' : function(e, value, row, index) {
			bootbox.confirm("确定删除此条记录?", function(result) {
				if (result) {
					var options = {
						url : '../../corp/delete',
						data : '{"corpId":"' + row.corpId + '"}',
						callBackFun : function(data) {
							if (data.result == 0) {
								initTable();
								window.location.reload();
							} else {
								bootbox.alert(data.resultNote);
								return false;
							}
						},
						errorCallback : function(data) {
							bootbox.alert("error");
						}
					};
					CloudUtils.ajax(options);
				}
			});
		}
	};






