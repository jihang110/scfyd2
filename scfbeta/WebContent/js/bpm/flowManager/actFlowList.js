var isJump = CloudUtils.getIframeParams(window.location.href).isJump;
$(document).ready(function() {
	CloudUtils.inputCacheClear();
	initDefnTable();
	initInstTable();
	initTaskTable();
	
	$('#completeForm').on('hidden.bs.modal', function(){
		$('#completeForm').bootstrapValidator('resetForm', true);
		$('#completeForm')[0].reset();
	});
	clearModalAfterHidden();
});

/**
 * 流程定义列表
 */
let initDefnTable = function() {
	$('#flowDefnListTable').bootstrapTable('destroy');
	$("#flowDefnListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/definitionlist",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 20, //每页显示的记录数  
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
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
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
				field : 'definitionId',
				title : '实例ID',
				align : 'center',
				valign : 'middle',
				visible: true
			},
			{
				field : 'deploymentId',
				title : '流程发布ID',
				align : 'center',
				valign : 'middle',
				visible: true
			},
			{
				field : 'processDefinitionKey',
				title : '流程key',
				align : 'center',
				valign : 'middle',
				visible: true
			},
			{
				field : 'definitionName',
				title : '流程名称',
				align : 'center',
				valign : 'middle'
			}, 
			{
				field : 'version',
				title : 'version',
				align : 'center',
				valign : 'middle'
			}, 
			{
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	            var m = '<a class = "glyphicon glyphicon-play start" style="color:#d864fd;padding:0px 5px;" title="发起" href="javascript:void(0)"></a>';
	 	            var g = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#d864fd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-remove delete" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	            return m+' '+g+' '+d;
	 	        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}

/**
 * 流程实例列表
 */
let initInstTable = function() {
	$('#flowInstListTable').bootstrapTable('destroy');
	$("#flowInstListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/instancelist",
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
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
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
				field : 'processInstanceId',
				title : '实例ID',
				align : 'center',
				valign : 'middle'
			},{
				field : 'processDefinitionName',
				title : '所属流程',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'processDefinitionKey',
				title : '流程key',
				align : 'center',
				valign : 'middle',
				visible: false
					
			},
			{
				field : 'processDefinitionId',
				title : '流程定义id',
				align : 'center',
				valign : 'middle',
				visible: true
			},  {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	            var m = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#d864fd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-stop stop" style="color:#fa8564;padding:0px 5px;" title="终止" href="javascript:void(0)"></a>';
	 	            var d2 = '<a class = "glyphicon glyphicon-remove delInst" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	            var s = '<a class = "glyphicon glyphicon-search history" style="color:#fa8564;padding:0px 5px;" title="审批历史" href="javascript:void(0)"></a>';
	 	            return m+' '+d+' '+d2+' '+s;
	 	        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}

/**
 * 流程任务列表
 */
let initTaskTable = function() {
	$('#flowTaskListTable').bootstrapTable('destroy');
	$("#flowTaskListTable").bootstrapTable({
		method : "post",
		url : "../../actflow/tasklist",
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
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1
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
				field : 'processDefinitionId',
				title : '流程定义ID',
				align : 'center',
				valign : 'middle',
				visible: false
			},
			{
				field : 'taskId',
				title : '流程ID',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'processInstanceId',
				title : '所属实例',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'processDefinitionName',
				title : '所属流程',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'taskName',
				title : '名称',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'assignee',
				title : '指定人',
				align : 'center',
				valign : 'middle'
			},  {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
		        formatter:function(value,row,index){
		        	var m = '<a class = "glyphicon glyphicon-step-forward complete" style="color:#d864fd;padding:0px 5px;" title="处理" href="javascript:void(0)"></a>';
	 	            var d = '<a class = "glyphicon glyphicon-eye-open graph" style="color:#d864fd;padding:0px 5px;" title="图形" href="javascript:void(0)"></a>';
	 	           var s = '<a class = "glyphicon glyphicon-flash show" style="color:#fa8564;padding:0px 5px;" title="showForm" href="javascript:void(0)"></a>';
		  	        return m+' '+d +' '+s;
		        },
	 	        events: 'operateEvents'
	 	    }
		]
	});
}


window.operateEvents = {
		// 流程发起
		'click .start': function (e, value, row, index) {
			var options = {
					url : '../../actflow/start',
					data : '{"processDefinitionId":"'+row.definitionId+'","processDefinitionKey":"'+row.processDefinitionKey+'","businessKey":"businessKeyZyx"}',
					callBackFun : function(data) {
						bootbox.alert(data.resultNote);
						if(data.result==0){
							initInstTable();
							initTaskTable();
						}else{
							return false;
						}
					},
					errorCallback:function(data){
						bootbox.alert("error");
					}
			};
			CloudUtils.ajax(options);
		},
		
		// 流程图形
		'click .graph': function (e, value, row, index) {
			var processDefinitionId = typeof(row.definitionId)=="undefined"?"":row.definitionId.replace(/\:/g, '%3A');
			var processInstanceId = typeof(row.processInstanceId)=="undefined"?"":row.processInstanceId.replace(/\:/g, '%3A');
			var processDefinitionKey = typeof(row.processDefinitionKey)=="undefined"?"":row.processDefinitionKey.replace(/\:/g, '%3A');
			var taskId = typeof(row.taskId)=="undefined"?"":row.taskId;
			
			$("#pic").attr("src", "../../actflow/graph?processDefinitionId="+processDefinitionId+
					"&processInstanceId="+processInstanceId+"&taskId="+taskId+"&processDefinitionKey="+processDefinitionKey);
			$("#picModal").modal({backdrop: 'static', keyboard: false});
		},
		
		//删除 流程定义
		'click .delete': function (e, value, row, index) {
			bootbox.confirm("确定删除该流程定义?", function(result) {
	            if (result) {
	            	var options = {
	    					url : '../../actflow/deleteDeploy',
	    					data : '{"deploymentId":"'+row.deploymentId+'","processDefinitionKey":"'+row.processDefinitionKey+'"}',
	    					callBackFun : function(data) {
	    						bootbox.alert(data.resultNote);
	    						if(data.result==0){
	    							initDefnTable();
	    							initInstTable();
	    							initTaskTable();
	    						}else{
	    							return false;
	    						}
	    					},
	    					errorCallback:function(data){
	    						bootbox.alert("error");
	    					}
	    			};
	    			CloudUtils.ajax(options);
	            } 
	    	 });
		},
		// 流程中断
		'click .stop': function (e, value, row, index) {
	    	bootbox.confirm("确定终止该流程?", function(result) {
	            if (result) {
	            	var options = {
	    					url : '../../actflow/terminate',
	    					data : '{"processInstanceId":"'+row.processInstanceId+'"}',
	    					callBackFun : function(data) {
	    						bootbox.alert(data.resultNote);
	    						if(data.result==0){
	    							initInstTable();
	    							initTaskTable();
	    						}else{
	    							return false;
	    						}
	    					},
	    					errorCallback:function(data){
	    						bootbox.alert("error");
	    					}
	    			};
	    			CloudUtils.ajax(options);
	            } 
	    	 });
	    },
	  //删除 流程实例
		'click .delInst': function (e, value, row, index) {
			bootbox.confirm("确定删除该流程实例?", function(result) {
	            if (result) {
	            	var options = {
	    					url : '../../actflow/deleteProcess',
	    					data : '{"processInstanceId":"'+row.processInstanceId+'"}',
	    					callBackFun : function(data) {
	    						bootbox.alert(data.resultNote);
	    						if(data.result==0){
	    							initDefnTable();
	    							initInstTable();
	    							initTaskTable();
	    						}else{
	    							return false;
	    						}
	    					},
	    					errorCallback:function(data){
	    						bootbox.alert("error");
	    					}
	    			};
	    			CloudUtils.ajax(options);
	            } 
	    	 });
		},
	    // 流程完成
		'click .complete': function (e, value, row, index) {
			CloudUtils.setForm(row,'completeForm');
			$('#completeModal').modal({backdrop: 'static', keyboard: false});
		},
	    
	    'click .show': function (e, value, row, index) {
	    	var options = {
					url : '../../actflow/showProcessFormData?taskId='+row.taskId,
					callBackFun : function(data) {
						$("#startFormModal .modal-body").append(data.resultNote);
						$('#startFormModal').modal({backdrop: 'static', keyboard: false});
					},
					errorCallback:function(data){
						bootbox.alert("error");
					}
			};
			CloudUtils.ajax(options);	    	
		},
		'click .history': function (e, value, row, index) {
			acti_bpm_fn.showHistoryList(row.processInstanceId);
			$('#historyModal').modal({backdrop: 'static', keyboard: false});
		},
};

/**
 * 审批
 * @param flg 0--同意,1--不同意
 */
function doAgree(flg) {
	var taskId = $("#completeModal #taskId").val();
	var taskName = $("#completeModal #taskName").val();
	var proAdvice = $("#completeModal #proAdvice").val();
	var	agreeStr = flg;
	var options = {
			url : '../../actflow/taskComplete',
			data : '{"taskId":"'+taskId+'","taskName":"'+taskName+'","agreeStr":"'+agreeStr+'","advice":"'+proAdvice+'"}',
			callBackFun : function(data) {
				if(data.result==0){
					initInstTable();
					initTaskTable();
					$("#completeModal").modal("hide");
					bootbox.alert(data.resultNote);
				}else{
					$("#completeModal").modal("hide");
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
	
}

//发起流程图
function startDeploy(){
	var deployContentStr = $("#deployContent").val();
	var data = {
		xmlContent : deployContentStr	
	};
	var options = {
			url : '../../actflow/startDeploy',
			data: JSON.stringify(data),
			callBackFun : function(data) {
				$("#myDeploy").modal("hide");
				if(data.result==0){
					bootbox.alert(data.resultNote);
					//加载表格
					initDefnTable();
				}else{
					bootbox.alert(data.resultNote);
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}
/**
 * 部署流程关闭或完成后清空数据
 */
function clearModalAfterHidden(){
	$('#myDeploy').on('hidden.bs.modal', function (e) {
		$('#deployContentForm')[0].reset();
	})
}

let acti_bpm_fn = {
	startProcessWith: function(agree){
		var formdata = $("#processStartForm").serializeArray();
		var data = {};
		for (var i=0;i<formdata.length;i++){
			data[formdata[i].name] = formdata[i].value;
		}
		data["agree"] = agree;
		var options = {
				url : '../../actflow/doTask',
				data: JSON.stringify(data),
				callBackFun : function(data) {
					acti_bpm_fn.close();
					if(data.result==0){
						bootbox.alert(data.resultNote);
						initInstTable();
						initTaskTable();
					}else{
						bootbox.alert(data.resultNote);
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	},
	showHistoryList: function(processInstanceId){
		$('#historyListTable').bootstrapTable('destroy');
		$("#historyListTable").bootstrapTable({
			method : "post",
			url : "../../actflow/showHistory?processInstanceId="+processInstanceId,
			striped : true, //表格显示条纹  
			pagination : true, //启动分页  
			pageSize : 20, //每页显示的记录数  
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
				var param = {
					pageNumber : params.pageNumber,
					pageSize : params.pageSize,
					isPage: 1
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
						field : 'processDefinitionId',
						title : '流程定义ID',
						align : 'center',
						valign : 'middle',
						visible : false
					},
					{
						field : 'taskId',
						title : '任务ID',
						align : 'center',
						valign : 'middle'
					},
					{
						field : 'processInstanceId',
						title : '流程实例ID',
						align : 'center',
						valign : 'middle',
						visible : false
					},
					{
						field : 'taskName',
						title : '名称',
						align : 'center',
						valign : 'middle'
					},
					{
						field : 'startTime',
						title : '开始时间',
						align : 'center',
						valign : 'middle'
					},  
					{
						field : 'endTime',
						title : '结束时间',
						align : 'center',
						valign : 'middle'
					},  
					{
						field : 'duration',
						title : '持续时间（秒）',
						align : 'center',
						valign : 'middle'
					} 
				]			
		});		
	},
	close: function(){
		$("#startFormModal .modal-body").html("");
		$("#startFormModal").modal("hide");
	}
		
}