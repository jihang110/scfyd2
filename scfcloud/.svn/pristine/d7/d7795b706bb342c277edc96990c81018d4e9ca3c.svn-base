$(document).ready(function() {
	initTable();
	loadDate();
	financeNumFormat();
	CloudUtils.inputCacheClear();
	$('.modal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("form.form-horizontal").each(function() {
			if ($(this)[0].id != 'infoForm') {
				$(this).bootstrapValidator('resetForm', true);
				this.reset();
			}
		});
	});
});

var initTable = function() {
	negativeInitTable();
	profitInitTable();
	cashflowInitTable();
	bankRecInitTable();
	taxReturnsInitTable()
}

var negativeInitTable = function() {
	//alert("test");
	$('#negativeList').bootstrapTable('destroy');
	$('#negativeList').bootstrapTable({
		method: "post",
        url: "../../negative/list",
        striped: true,  //表格显示条纹 
        pagination: true, //启动分页 
        pageSize: 5,  //每页显示的记录数 
        pageNumber:1, //当前第几页 
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表 
        search: false,  //是否启用查询 
        showColumns: false,  //显示下拉框勾选要显示的列 
        showRefresh: false,  //显示刷新按钮 
        sidePagination: "server", //表示服务端请求 
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType : "undefined",
		queryParams: function queryParams(params) {   //设置查询参数  
			var param = {
				pageNumber: params.pageNumber,
				pageSize: params.pageSize,
				corpId: corpId ? corpId : 0
			};
			return JSON.stringify(param);
		},
        responseHandler:function responseHandler(res) {
        	if (res.result == 0) {
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
	        field: 'negId',
	        title: 'Item ID',
	        align: 'center',
	        valign: 'middle',
	        visible: false
	    }, {
	        field: 'corpName',
	        title: '企业名称',
	        align: 'center',
	        valign: 'middle',
	        visible: false
	    }, {
	        field: 'operYear',
	        title: '时间(年月)',
	        align: 'center',
	        valign: 'middle'
	    }, {
	        field: 'totalCurrentAssets',
	        title: '流动资产合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalNonCurrentAssets',
	        title: '非流动资产合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalAssets',
	        title: '资产总计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalCurrentLiabilities',
	        title: '流动负债合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalNonCurrentLiabilities',
	        title: '非流动负债合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalLiabilities',
	        title: '负债合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalOwnersEquity',
	        title: '所有者权益（或股东权益）合计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'totalLiabilitiesAndOwnersEquity',
	        title: '负债和所有者权益（或股东权益）总计',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	        	return $.number(value, 2);
	        }
	    }, {
	        field: 'operation',
	        title: '操作',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	            var s = '<a class="fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="negative" href="javascript:void(0)"></a>';
	            var r = '<a class="fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="negative" href="javascript:void(0)"></a>';
	            return s + ' ' + r;
	        },
	        display: 'inline-flex',
	        events: 'financeOperateEvents'
	    }]
	});
}

var profitInitTable = function() {
	$('#profitList').bootstrapTable('destroy');
	$("#profitList").bootstrapTable({
		method: "post",
        url: "../../profit/list",
        striped: true,  //表格显示条纹 
        pagination: true, //启动分页 
        pageSize: 5,  //每页显示的记录数 
        pageNumber:1, //当前第几页 
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表 
        search: false,  //是否启用查询 
        showColumns: false,  //显示下拉框勾选要显示的列 
        showRefresh: false,  //显示刷新按钮 
        sidePagination: "server", //表示服务端请求 
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType : "undefined",
		queryParams: function queryParams(params) {   //设置查询参数  
			var param = {    
				pageNumber: params.pageNumber,
				pageSize: params.pageSize,
				corpId: corpId ? corpId : 0
			};
			return JSON.stringify(param);
		},
        responseHandler:function responseHandler(res) {
	    	if (res.result == 0) {
//	    		var size = res.records;
//	    		canExp = size <= 50000;//限制5w条不允许导出
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
	    	field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
 	        valign: 'middle',
 	        visible: false
 	    }, {
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operYear',
 	        title: '时间(年月)',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'grossProfitRate',
 	        title: '毛利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'expenseRate',
 	        title: '费用率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'totalProfit',
 	        title: '利润总额',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'netProfit',
 	        title: '净利润',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'netProfitGrowthRate',
 	        title: '净利润增长率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'mainCostRate',
 	        title: '主营业务成本率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value, row, index) {
	 	    	return $.number(value, 2);
	 	    }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="profit" href="javascript:void(0)"></a>';
 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="profit" href="javascript:void(0)"></a>';
 	        	return s + ' ' + r;
	        },
	        display: 'inline-flex',
	        events: 'financeOperateEvents'
 	    }]
	});
}

var cashflowInitTable = function() {
	$('#cashflowList').bootstrapTable('destroy');
	$("#cashflowList").bootstrapTable({
		method : "post",
		url : "../../cashflow/list",
		striped : false, // 表格显示条纹
		pagination : true, // 启动分页
		pageSize : 5, // 每页显示的记录数
		pageNumber : 1, // 当前第几页
		pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
		search : false, // 是否启用查询
		showColumns : false, // 显示下拉框勾选要显示的列
		showRefresh : false, // 显示刷新按钮
		sidePagination : "server", // 表示服务端请求
		// 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
		// 设置为limit可以获取limit, offset, search, sort, order
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { // 设置查询参数
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				corpId : corpId ? corpId : 0
			};
			return JSON.stringify(param);
		},
		responseHandler : function responseHandler(res) {
			if (res.result == 0) {
//				 var size = res.records;
//				 canExp = size <= 50000;//限制5w条不允许导出
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
		columns : [{
			field : 'recUid',
			title : 'Item ID',
			align : 'center',
			valign : 'middle',
			visible : false
		}, {
			field : 'corpName',
			title : '企业名称',
			align : 'center',
			valign : 'middle',
			visible : false
		}, {
			field : 'operYear',
			title : '时间(年月)',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'netAmountOfCashFlow',
			title : '经营活动产生的现金流量净额',
			align : 'center',
			valign : 'middle',
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field : 'investmentAmountOfCashFlow',
			title : '投资活动产生的现金流量净额',
			align : 'center',
			valign : 'middle',
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field : 'financingAmountOfCashFlow',
			title : '筹资活动产生的现金流量净额',
			align : 'center',
			valign : 'middle',
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field : 'increaseCashEquivalent',
			title : '现金及现金等价物净增加额',
			align : 'center',
			valign : 'middle',
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field : 'cashAndCashEquivalents',
			title : '现金及现金等价物净增加额(补充)',
			align : 'center',
			valign : 'middle',
			visible : false,
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field: 'otherAmountOfCashFlow', 
			title: '其他经营活动产生的现金流量净额', 
			align : 'center',
			valign : 'middle',
			formatter:function(value, row, index) {
				return $.number(value, 2);
			}
		}, {
			field : 'operation',
			title : '操作',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {
				var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="cashflow" href="javascript:void(0)"></a>';
				var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="cashflow" href="javascript:void(0)"></a>';
				return s + ' ' + r;
			},
			display: 'inline-flex',
			events : 'financeOperateEvents'
		}]
	});
}

var bankRecInitTable = function() { 
	$('#bankRecList').bootstrapTable('destroy');  
	$('#bankRecList').bootstrapTable({  
         method: "post", 
         url: "../../bankRec/list", 
         striped: true,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: corpId ? corpId : 0
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
 	        field: 'recId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	    	field: 'corpId',
	        title: 'Item ID',
	        align: 'center',
	        valign: 'middle',
	        visible: false
	       },{
 	        field: 'accountBank',
 	        title: '开户行',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'accountName',
 	        title: '户名',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'account',
 	        title: '账号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	    	field:'currency',
 	    	title:'币种',
 	    	align:'center',
 	    	valign:'middle',
 	    	formatter:function(value,row,index) {
				if (value == "人民币") {
					return "人民币";
				} else if (value == "美元") {
					return "美元";
				}
 	    	}
 	    }, {
 	        field: 'startDate',
 	        title: '起始日',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.startDate!=null&&row.startDate!=''){
        			return dateFormat(row.startDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'endDate',
 	        title: '到期日',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.endDate!=null&&row.endDate!=''){
        			return dateFormat(row.endDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'debitAmount',
 	        title: '借方发生金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    }, {
 	        field: 'creditAmount',
 	        title: '贷方发生金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    },{
 	    	field: 'accountAmount',
 	        title: '金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    },{
	        field: 'operation',
	        title: '操作',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	            var s = '<a class="fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="bankRec" href="javascript:void(0)"></a>';
	            var r = '<a class="fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="bankRec" href="javascript:void(0)"></a>';
	            return s + ' ' + r;
	        },
	        display: 'inline-flex',
	        events: 'financeOperateEvents'
	    }]
       }); 
}

var taxReturnsInitTable = function() { 
	$('#taxReturnsList').bootstrapTable('destroy');
	$("#taxReturnsList").bootstrapTable({  
         method: "post", 
         url: "../../taxReturns/list", 
         striped: true,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: corpId ? corpId : 0
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
 	        field: 'vatId',
 	        title: '主键',
 	        align: 'center',
 	        valign: 'middle',
 	        visible:false
 	    },{
 	        field: 'corpId',
 	        title: '企业所属id',
 	        align: 'center',
 	        valign: 'middle',
 	        visible:false
 	    },{
 	        field: 'operYear',
 	        title: '时间(年月)',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'purchasesTax',
 	        title: '进项税额',
 	        align: 'center',
 	        valign: 'middle',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
           }
 	    },{
 	        field: 'salesTax',
 	        title: '销项税额',
 	        align: 'center',
 	        valign: 'middle',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
           }
 	    },{
	        field: 'operation',
	        title: '操作',
	        align: 'center',
	        valign: 'middle',
	        formatter: function(value, row, index) {
	            var s = '<a class="fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="taxReturns" href="javascript:void(0)"></a>';
	            var r = '<a class="fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" data-type="taxReturns" href="javascript:void(0)"></a>';
	            return s + ' ' + r;
	        },
	        display: 'inline-flex',
	        events: 'financeOperateEvents'
	    }]
       });  
	
}

window.financeOperateEvents = {
	'click .modify': function (e, value, row, index) {
		modFun(row, $(e.target).data('type'), 2);
	},
    'click .remove': function (e, value, row, index) {
    	var type = $(e.target).data('type'), mData;
    	if (type == 'negative') {
    		mData = '{"negId":"'+row.negId+'"}'
    	} 
    	else if (type == 'bankRec') {
    		mData = '{"recId":"'+row.recId+'"}'
    	}
    	else if (type == 'taxReturns') {
    		mData = '{"vatId":"'+row.vatId+'"}'
    	}
    	else {
    		mData = '{"recUid":"'+row.recUid+'"}'
    	}
    	bootbox.confirm("确定删除此条记录?", function(result) {  
			if (result) {
				var options = {
					url : '../../' + type + '/delete',
					data : mData,
					callBackFun : function(data) {
						if (data.result==0) {
							eval(''+ type + 'InitTable()');
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
    	});
	}
};

var loadDate = function() {
	//$('.operYear').val(new Date().getFullYear());
	$('.operYear').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-MM',
		startView: 3,
		minView: 3,
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left",
		//endDate: new Date()
	});
	//到期日不能输入当前之后的日期
	$('#bankRecForm #startDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		startView: 2,
		minView: 2,
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left",
		endDate: new Date()
	});
	
	$('#bankRecForm #endDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		startView: 2,
		minView: 2,
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left",
		endDate: new Date()
	}).on("click",function(){  
        $("#bankRecForm #endDate").datetimepicker("setStartDate",$("#bankRecForm #startDate").val());
    });
}

var addFun = function(type, num) {
	//$('.operYear').val(new Date().getFullYear());
	var now = new Date();
	//$('#startDate').val(dateFormat(now, 'yyyy-MM-dd'));
	$('#createTime').val(dateFormat(now, 'yyyy-MM-dd'));
	$('#isEdit').val(num);
	$("#" + type + "ModalLabel").text("添加");
	$("#" + type + "Modal").modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
}

var modFun = function(row, type, num) {
	$('#isEdit').val(num);
	$("#" + type + "ModalLabel").text("修改");
    $("#" + type + "Modal").modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    CloudUtils.setForm(row, "" + type + "Form");
    if (row.operYear!=null && row.operYear!='') {
    	$(".operYear").val(CloudUtils.dateFormat(row.operYear, 'yyyy-MM'));
    }
    if(row.startDate!=null&&row.startDate!=''){
    	$("#startDate").val(dateFormat(row.startDate, 'yyyy-MM-dd'));
    }
    if(row.endDate!=null&&row.endDate!=''){
    	$("#endDate").val(dateFormat(row.endDate, 'yyyy-MM-dd'));
    }
}

var saveFun = function(type) {
	var isEdit =  $('#isEdit').val();
	var data = CloudUtils.convertStringJson('' + type + 'Form');
	data = eval("(" + data + ")");
	data['corpId'] = corpId;
	data = JSON.stringify(data);
	var url = isEdit == 1 ? '../../'+type+'/add' : '../../'+type+'/mod';
	$('#' + type + 'Modal').modal("hide");
	var options = {
		url : url,
		data : data,
		callBackFun : function(data) {
			if (data.result == 0) {
				eval(''+ type + 'InitTable()');
				bootbox.alert(data.resultNote);
			} else {
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

var dateFormat = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

var financeNumFormat = function(){
	$('.panel-group input').number(true, 2).not("[readonly]").attr("value","0.00");
	$("#debitAmount").number(true, 2).attr("value","0.00");
	$("#creditAmount").number(true, 2).attr("value","0.00");
	$("#purchasesTax").number(true, 2).attr("value","0.00");
	$("#salesTax").number(true, 2).attr("value","0.00");
}