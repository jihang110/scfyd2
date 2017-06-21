//var corpId = "";
$(function(){
//	var url = window.location.search.substr(1);
//	var reg = "=";
//	corpId = url.split(reg)[1];
//	if(corpId){
//		$('#corpId').val(corpId);
//		initPackageForm();
//	}
	CloudUtils.inputCacheClear();
	dataSearch();
	initFlowProjectTable();
	formValidator();
	$('#packetTime').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayBtn: true,// 显示今天时间
		pickerPosition: "bottom-left",
		minuteStep: 5,
		format: 'yyyy-mm-dd',
		minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	});
	$("#apAmount").number(true, 2);
});

function dataSearch(){
	var url = "../../corp/assetPackageList";
	var data = {'isPage':0,'sysType':3};
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
        cache: true,
        callback: function (value, index, selected) {
        	$('#corpId').val(selected.corpId);
        }
	});
}

function changeName() {
	$('#corpId').removeAttr('value');
}

//function initPackageForm() {
//	var corpId = $('#corpId').val();
//	var options = {
//		url : '../../package/list',
//		data : JSON.stringify({'corpId': corpId}),
//		callBackFun : function(data) {
//			if(data.result==0){
//				if (data.dataList.length) {
//					var list = data.dataList[0];
//					$('#recUid').val(list.recUid);
//					$('#corpName').val(list.corpName);
//					$('#apNo').val(list.apNo);
//					$('#apAmount').val(list.apAmount);
//					$('#apAmountTemp').val(list.apAmount);
//					$('#packetTime').val(CloudUtils.dateFormat(list.packetTime, 'yyyy-MM-dd'));
//					$('#assetRating').val(list.assetRating);
//					initFlowProjectTable();
//				
//				}else{
//					$('#recUid').val('');
//					$('#apNo').val('');
//					$('#apAmount').val(0);
//					$('#apAmountTemp').val(0);
//					$('#packetTime').val('');
//					$('#assetRating').val('');
//					initFlowProjectTable();
//				}
//			}
//		},
//		errorCallback:function(data){
//			bootbox.alert("error");  
//		}
//	};
//	CloudUtils.ajax(options);
//}

function initFlowProjectTable() { 
	$('#flowProjectList').bootstrapTable('destroy');  
	$("#flowProjectList").bootstrapTable({  
         method: "post", 
         url: "../../flowProject/list", 
         striped: false,  // 表格显示条纹
         pagination: true, // 启动分页
         pageSize: 5,  // 每页显示的记录数
         pageNumber:1, // 当前第几页
         pageList: [5, 10, 15, 20, 25],  // 记录数可选列表
         search: false,  // 是否启用查询
         showColumns: false,  // 显示下拉框勾选要显示的列
         showRefresh: false,  // 显示刷新按钮
         clickToSelect: true,  //是否启用点击选中行
         sidePagination: "server", // 表示服务端请求
         queryParamsType : "undefined",  
         onCheck: function (row) {
 			var ap = parseFloat($('#apAmount').val() || 0);
 			var ap1 = parseFloat(row.loanAmt);
 			$('#apAmount').val(ap+ap1);
         },
         onUncheck: function (row) {
  			var ap = parseFloat($('#apAmount').val() || 0);
  			var ap1 = parseFloat(row.loanAmt);
  			$('#apAmount').val(ap-ap1);
         },
         onCheckAll: function () {
        	var a = $('#flowProjectList').bootstrapTable('getSelections');
    		var apAmount = 0;
    		for (var int = 0; int < a.length; int++) {
    			apAmount += parseFloat(a[int].loanAmt);
    		}
    		$('#apAmount').val(apAmount);
         },
         onUncheckAll: function () {
         	$('#apAmount').val(0);
         },
         queryParams: function queryParams(params) {   // 设置查询参数
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               proStatus: 3,
               isPage: 1
               //projectName:jsonData.txt_projectName,
               //contractNo:jsonData.txt_contractNo
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
	        	 return {
	        		 "rows": res.dataList,
	        		 "total": res.records
	        	 };
        	 } else {
        		 bootbox.alert(res.resultNote);
        		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
        	 }
         },
         columns: [{
        	 checkbox: true
         },{
 	        field: 'proId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
			field: 'apId',
			title: '资产包名称',
			align: 'center',
			valign: 'middle',
			visible: false
		},{
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    }/*,{
 	        field: 'creditMode',
 	        title: '授信方式',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
              	switch (value) {
				case 0:
					return "首笔";
					break;
				case 1:
					return "增额";
					break;
				case 2:
					return "置换续费";
					break;
				case 3:
					return "循环额度";
					break;
				case 4:
					return "其他";
					break;
				default:
					break;
				}
              }
 	    },{
 	        field: 'proStatus',
 	        title: '项目状态',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
              	switch (value) {
				case 0:
					return "已立项";
					break;
				case 1:
					return "已尽调";
					break;
				case 2:
					return "已审核";
					break;
				case 3:
					return "已签署";
					break;
				case 4:
					return "已放款";
					break;
				case 5:
					return "资产包";
					break;
				default:
					break;
				}
              }
 	    }*/,{
 	    	field: 'custName',
 	        title: '供应商名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	    	field: 'coreCorpName',
 	        title: '核心企业名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	    	field : 'loanAmt',
			title : '放款金额',
			align : 'center',
			formatter : function (value, row, index){
				return $.number(value, 2);
			},
			valign : 'middle'
 	    }]
	});  
}

//function saveForm() {
//	var data = CloudUtils.convertAllJson('packageForm');
//	var recUid = $('#recUid').val();
//	var options = {
//			url : '../../package/'+(recUid ? 'mod':'add'),
//			data : data,
//			callBackFun : function(data) {
//				if(data.result==0){
//					bootbox.alert(data.resultNote,function(){
//						window.location.href = '../../asset/packageManager/packageInfoManager.html';
//					});
//					return true;
//					}
//				else{
//					bootbox.alert(data.resultNote);
//					return false;
//					}
//				
//			},
//			errorCallback:function(data){
//				bootbox.alert("error");  
//			}
//		};
//		CloudUtils.ajax(options);
//}

function getCheckData() {
	var data = $('#flowProjectList').bootstrapTable('getSelections');
	var proIds = [];
	for (var i = 0; i < data.length; i++) {
		proIds.push(data[i].proId);
	}
	var param = CloudUtils.convertAllJson('packageForm');
	param = eval('(' + param + ')');
	param['proStatus'] = 4;
	param['proIds'] = proIds;
	var options = {
		url : '../../package/add',
		data : JSON.stringify(param),
		callBackFun : function(data) {
			if (data.result == 0) {
				bootbox.alert(data.resultNote, function () {
					window.location.href = '../../asset/packageManager/packageInfoManager.html';
				});
				return true;
			} else {
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
//function updateFlowProject(param) {
//	var options = {
//		url : '../../flowProject/mod',
//		data : JSON.stringify(param),
//		callBackFun : function(data) {
//			if(data.result==0){
//				initFlowProjectTable();
//				}
//			else{
//				bootbox.alert(data.resultNote);
//				return false;
//				}
//			
//		},
//		errorCallback:function(data){
//			bootbox.alert("error");  
//		}
//	};
//	CloudUtils.ajax(options);
//}

// form验证规则
function formValidator(){
	$('#packageForm').bootstrapValidator({
		group: '.scf_valid',
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			corpId : {
				validators: {
					notEmpty: {message: '请选择一个合适的劵商'}
				}
			},
			apNo : {
				validators: {
					notEmpty: {message: '资产包编号不能为空'},
					regexp: {
				          regexp: /^[A-Za-z0-9]*$/,
				          message: '只能为数字或英文'
				    }
				}
			},
			apAmount : {
	    	 	validators: {
	    	 		numeric: {message: '只能输入数字'},
	            	callback: {
	                    message: '金额在-1000000000.00~1000000000.00之间',  
	                    callback: function(value, validator) { 
	                    	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                    }
	                } 
				}
			},
			assetRating : {
				validators: {
					notEmpty: {message: '资产评级不能为空'}
				}
			}
		}
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		getCheckData();
		$(e.target).bootstrapValidator('resetForm', true);
	});
}