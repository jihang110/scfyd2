var isJump = CloudUtils.getIframeParams(window.location.href).isJump;
$(document).ready(function() {
	// 各详情页面载入 
	$("#div_detail").load("FlowMngCommon.html");
	CloudUtils.inputCacheClear();
	initTable();
	CloudUtils.searchMoreIsHidden("searchMore","isHidden");
	$('#btn_search').click(function() {
		initTable();
	});
	initDate();
	FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
	if(isJump==3){
		var XMJDData = store.get('XMJD');
		$("#detailModal").modal({backdrop: 'static', keyboard: false});
		FlowMngCommon.initDetailTable('detail', XMJDData.procInsId, 'NOT');
	}
	$('#chkForm').on('hidden.bs.modal', function(){
		$('#detailModal').css('display','block');
		$('#chkForm').bootstrapValidator('resetForm', true);
		$('#chkForm')[0].reset();
	});

	$('#procInsName').selectOrDie({
		placeholder: '项目流程'
	});
});

//重置按钮事件
function ResetBtn(){
	$("#searchForm #projectName").val("");
}
function ResetBtnFlow(){
	$("#searchFlowForm #projectName").val("");
    $("#procInsName").selectOrDie('destroy');
    $("#procInsName").val("");
    $('#procInsName').selectOrDie({
		placeholder: '项目流程'
	});
	$("#createTime").val("");
}

let initTable = function() {
	$('#workListTable').bootstrapTable('destroy');
	$("#workListTable").bootstrapTable({
		method : "post",
		url : "../../workflow/list",
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
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1,
				sysType: 5,
				projectName: jsonData.projectName == "" ? null : jsonData.projectName
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
				field : 'proId',
				title : '项目编号',
				align : 'center',
				valign : 'middle',
				visible : false
			},
			{
				field : 'projectName',
				title : '项目名称',
				align : 'center',
				valign : 'middle'
			},
			{
				field : 'creditMode',
				title : '授信方式',
				align : 'center',
				valign : 'middle',
				formatter : function (value, row, index) {
					switch(value) {
					case 0: return '首笔';break;
					case 1: return '增额';break;
					case 2: return '置换续期';break;
					case 3: return '循环额度';break;
					case 4: return '其他';break;
				}
			}
			},
			{
				field : 'proStatus',
				title : '立项状态',
				align : 'center',
				valign : 'middle',
				formatter : function (value, row, index) {
					switch(value) {
						case 0: return '已立项';break;
						case 1: return '已尽调';break;
						case 2: return '已签署';break;
						case 3: return '已放款';break;
						case 4: return '资产包';break;
					}
				}
			}
		]
	});
}

/**
 * 检索
 */
function searchFlowFun() {
	// 未结一览再检索
	FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
}

/**
 * 经办
 */
function handle() {
	//$("#detailModal").modal("hide");
	$('#detailModal').css('display','none');
	$("#adlabel").html("");
	var formId;
	var modalId;
	var procInsId = $("#detailModal #procInsId").val();
	var workItemId = $("#detailModal #workItemId").val();
	var stepId = $("#detailModal #stepId").val();
	// 立项审批
	if (stepId == "L1") {
		modalId = "LXHandleModal";
		formId = "LXHandleForm";
		// 放款审批
	} else if (stepId == "F1") {
		modalId = "FKHandleModal";
		formId = "FKHandleForm";
		// 项目尽调
	} else if (stepId == "X1") {
		
//		modalId = "XMJDHandleModal";
//		formId = "XMJDHandleForm";
		//调整到项目尽调页面,并且带一个参数过去
	} else if (stepId == "X3") {
		
		//调整到项目尽调页面,并且带一个参数过去
	}else {
		modalId = "chkModal";
	}
	$("#" + modalId).modal({backdrop: 'static', keyboard: false});
	if(modalId == "FKHandleModal"){
		$('#FKHandleModal #valDt').datetimepicker({
			language: 'zh-CN',
			autoclose: true,
			todayHighlight: true,
			format: 'yyyy-mm-dd',
			minView:'month',
			todayBtn: true,
			initialDate : new Date() ,
			pickerPosition: "bottom-left"
		});
		$('#FKHandleModal #dueDt').datetimepicker({
			language: 'zh-CN',
			autoclose: true,
			todayHighlight: true,
			format: 'yyyy-mm-dd',
			minView:'month',
			todayBtn: true,
			initialDate : new Date() ,
			pickerPosition: "bottom-left"
		});
	}
	
	if (modalId != "chkModal") {
		$("#" + formId).find("#workItemId").val(workItemId);
		
		var options = {
				url : '../../workflow/info',
				data : JSON.stringify({
					workItemId : workItemId,
					procInsId : procInsId,
					stepId : stepId
				}),
				callBackFun : function(data) {
					if(data.result==0){
						if(stepId =="X1"){
							data.procInsId = procInsId;
							data.workItemId = workItemId;
							data.stepId = stepId;
							store.set('XMJD', data);
							window.location.href="projectTuning.html?isJump=1";
						}if(stepId =="X3"){
							data.procInsId = procInsId;
							data.workItemId = workItemId;
							data.stepId = stepId;
							store.set('XMJD', data);
							window.location.href="projectTuning.html?isJump=2";
						}
						else{
							CloudUtils.setFormNoClick(data, formId);
						}
					}else{
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
}


window.operateEvents = {
		// 项目名称点击事件
		'click .procDetail': function (e, value, row, index) {
			$("#detailModal").modal({backdrop: 'static', keyboard: false});
			FlowMngCommon.initDetailTable("detail",row.procInsId, 'NOT');
		},
		
		// 详情点击事件
		'click .workDetail': function (e, value, row, index) {
			FlowMngCommon.clickDetail(row);//流程中的数据取出，加载项目简介的信息
			$("#detailModal").modal("hide");
			FlowMngCommon.setSupplierBaseInfo(row.custNo);//加载供应商基本信息的数据
			FlowMngCommon.initDetTable(row.custNo);//加载表格的数据
		},
		
		// 流程中断
		'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定终止该流程?", function(result) {
	            if (result) {  
	            	var options = {
	    					url : '../../workflow/terminate',
	    					data : '{"procInsId":"'+row.procInsId+'","projectName":"'+row.proName+'","proId":"'+row.proId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
	    							bootbox.alert(data.resultNote);
	    						}else{
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
	    	 });
	    }
};
function initDate(){
	$('#createTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
}


/**
 * 供应商基本信息的加载
 */
function setSupplierBaseInfo(corpId){
	var data = {};
	data.sysType = 5;
	data.corpId = corpId;
	data = JSON.stringify(data);
	var options = {
			url : '../../corp/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					 CloudUtils.setForm(data.dataList[0],"splinfoForm");
					return true;
				}else{
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


/**
 * 审批
 * @param flg 0--同意,1--不同意
 */
function doAgree(flg) {
	var data = {
			procInsId : $("#detailModal #procInsId").val(),
			workItemId : $("#detailModal #workItemId").val(),
			stepId : $("#detailModal #stepId").val(),
			agreeFlg : flg,
			custNo :$("#detailModal #custNo").val(),
			proAdvice : $("#proAdvice").val(),
			projectName :$("#detailModal #proName").val(),
			creditMode :$("#detailModal #creditMode").val(),
			proId:$("#detailModal #proId").val()
		};
	var options = {
			url : '../../workflow/check',
			data : JSON.stringify(data),
			callBackFun : function(data) {
				if(data.result==0){
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					FlowMngCommon.initDetailTable('detail', $("#detailModal #procInsId").val(), 'NOT');
					$("#detailModal").modal("hide");
					bootbox.alert(data.resultNote).on('hide.bs.modal',function(){
						$("#detailModal").modal("show");
					});
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	if(flg==1){
		if($("#proAdvice").val()){
			CloudUtils.ajax(options);
			$("#disagree").attr("data-dismiss","modal");
		}else {
			checkAdvice();
			$("#adlabel").append("<font color='red'>拒绝时，必须输入审核建议</font>");
		}
	}else if(flg==0){
		CloudUtils.ajax(options);
	}
	
}
/*
 * 检查项目建议清空label
 */
function checkAdvice() {
	$("#adlabel").html("");
}
/**
 * 再申请
 * @param formId
 */
function reApply(formId, modalId) {
	var data = CloudUtils.convertStringJson(formId);
	var url;
	switch(modalId){
		//立项申请
		case 'LXHandleModal': url = 'LXSQ'; break;
		//项目尽调
		case 'XMJDHandleModal': url = 'XMJD'; break;
		//放款申请
		case 'FKHandleModal': url = 'FKSP'; break;
	}
	var options = {
			url : '../../workflow/apply_'+url ,
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					FlowMngCommon.initTable('hndlNotFlowListTable', 'not', 'NOT');
					FlowMngCommon.initDetailTable('detail', $("#detailModal #procInsId").val(), 'NOT');
					bootbox.alert(data.resultNote);
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
	$("#" + modalId).modal("hide");
	window.parent.scrollTo(0,0);
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
