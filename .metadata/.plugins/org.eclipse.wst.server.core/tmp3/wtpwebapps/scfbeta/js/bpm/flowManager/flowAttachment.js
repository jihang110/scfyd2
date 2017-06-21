$(document).ready(function() {
	initAttachment('base');
	initAttachment('finance');
	initAttachment('credit');
	initAttachment('contract');
});

var moduleType;
function initAttachment(type) {
	$('#' + type + 'Attachment').bootstrapTable('destroy');
	$('#' + type + 'Attachment').bootstrapTable({
		method : "post",
		url : "../../uploadFile/list",
		striped : false, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 5, //每页显示的记录数  
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
			switch(type) {
				case 'base': moduleType = 1;break;
				case 'finance': moduleType = 2;break;
				case 'credit': moduleType = 3;break;
				case 'contract': moduleType = 4;break;
			}
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				moduleType : moduleType,
				corpId : corpId ? corpId : 0
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
				field : 'fileName',
				title : '上传文件名',
				align : 'center',
				valign : 'middle',
				formatter : function(value, row, index) {
					var m = '<a href="' + "../../" + row.fileUrl + '" download="'
							+ row.fileName + '">' + row.fileName + '</a>';
					return m;
				}
			},
			{
				field : 'operation',
				title : '操作',
				align : 'center',
				valign : 'middle',
				width : '120',
				formatter : function(value, row, index) {
					return '<a class = "fa fa-trash-o removeAttachment" data-type=' + type
						+ ' style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
				},
				events : 'operateAttachmentEvents'
			}
		]
	});
}

window.operateAttachmentEvents = {
	'click .removeAttachment' : function(e, value, row, index) {
		let type = $(e.target).data('type');
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var options = {
					url : '../../uploadFile/delete',
					data : '{"fileId":"' + row.fileId + '"}',
					callBackFun : function(data) {
						if (data.result == 0) {
							initAttachment(type);
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

function uploadAttachment(type) {
	moduleType = type;
	document.getElementById("file").value = null;
	document.getElementById("file").click();
}

function ajaxFileUpload() {
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({  
	        url : '../../file/attachmentUpload?corpId=' + corpId + '&moduleType=' + moduleType,  
	        secureuri : false,
	        fileElementId : 'file',
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
	            	var path=data.fileUrl;
	            	//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
	            	let filename = path.indexOf("/") > 0 ? path.substring(path.lastIndexOf("/")+1, path.length) : path;
	            	let type;
	            	switch(moduleType) {
						case 1: type = 'base';break;
						case 2: type = 'finance';break;
						case 3: type = 'credit';break;
						case 4: type = 'contract';break;
					}
	            	initAttachment(type);
	            }else{
	            	bootbox.alert("上传失败！"); 
	            } 
	        },  
	        error : function(data, status, e) {  
	        	bootbox.alert(e);  
	        }  
	    });  
    }
    else {
    	bootbox.alert("请选择附件");
    }
}