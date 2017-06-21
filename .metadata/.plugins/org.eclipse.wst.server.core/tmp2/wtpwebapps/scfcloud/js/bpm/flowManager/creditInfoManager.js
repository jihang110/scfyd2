$(document).ready(function() {
	CloudUtils.inputCacheClear();
	corpInitTable();
	shareInitTable();
	orgnInitTable();
	guaranteeInitTable();
	litigantInitTable();
	
	creditFormValidator();
	creditNumFormat();
	
	$('input.time').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		endDate:new Date() ,
		pickerPosition: "bottom-left"
	});
} );

function guaranteeInitTable() { 
	$('#guaranteeListTable').bootstrapTable('destroy');  
	$("#guaranteeListTable").bootstrapTable({  
         method: "post", 
         url: "../../externalGuarantee/list", 
         striped: false,  //表格显示条纹  
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    } , {
 	        field: 'corpId',
 	        title: '企业ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'guarantorName',
 	        title: '被担保方名称',
 	        align: 'center',
            valign: 'middle'
 	    },  {
 	        field: 'guaranteeMoney',
 	        title: '担保金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
 	    }, {
 	        field: 'guaranteeType',
 	        title: '担保类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
               	if(value==0){
               		return "保证";
               	}else if(value==1){
               		return "抵押";
               	}else if(value==2){
               		return "质押";
               	}else if(value==3){
               		return "留置";
               	}else{
               		return "定金";
               	}
            }
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="guarantee" title="编辑" href="javascript:void(0)"></a>';
	 	        var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="guarantee" title="删除" href="javascript:void(0)"></a>';
 	            return m+' '+d;
 	        },
 	        events: 'operateCreditEvents'
 	    }]
       });  
}

function corpInitTable() { 
	$('#corpListTable').bootstrapTable('destroy');
	$("#corpListTable").bootstrapTable({
		method : "post",
		url : "../../creditReport/list",
		striped : true, // 表格显示条纹
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
				creditType : 0,
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
					field : 'creditId',
					title : 'Item ID',
					align : 'center',
					valign : 'middle',
					visible : false
				},
				{
					field : 'corpName',
					title : '企业名称',
					align : 'center',
					valign : 'middle',
					formatter : function(value, row, index) {
						if (row.enterpriseName != null
								&& row.enterpriseName != '') {
							return row.enterpriseName
						} else {
							return row.corpName
						}
					}
				},
				{
					field : 'inquiryTime',
					title : '查询时间',
					align : 'center',
					valign : 'middle',
					formatter : function(value, row, index) {
						if (row.inquiryTime != null
								&& row.inquiryTime != '') {
							return dateFormat(row.inquiryTime, 'yyyy-MM-dd')
						}
					}
				},
				{
					field : 'operation',
					title : '操作',
					align : 'center',
					valign : 'middle',
					formatter : function(value, row, index) {
						var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="corp" title="编辑" href="javascript:void(0)"></a>';
						var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="corp" title="删除" href="javascript:void(0)"></a>';
						return s + ' ' + r;
					},
					events : 'operateCreditEvents'
				}
			]
	});  
}

function shareInitTable() { 
	$('#shareListTable').bootstrapTable('destroy');  
	$("#shareListTable").bootstrapTable({  
		method : "post",
		url : "../../creditReport/list",
		striped : true, // 表格显示条纹
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
				creditType : 1,
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
					field : 'creditId',
					title : 'Item ID',
					align : 'center',
					valign : 'middle',
					visible : false
				},
				{
					field : 'shareName',
					title : '查询人名称',
					align : 'center',
					valign : 'middle'
				},
				{
					field : 'inquiryTime',
					title : '查询时间',
					align : 'center',
					valign : 'middle',
					formatter : function(value, row, index) {
						if (row.inquiryTime != null
								&& row.inquiryTime != '') {
							return dateFormat(row.inquiryTime,
									'yyyy-MM-dd')
						}
					}
				},
				{
					field : 'operation',
					title : '操作',
					align : 'center',
					valign : 'middle',
					formatter : function(value, row, index) {
						var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="share" title="编辑" href="javascript:void(0)"></a>';
						var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="share" title="删除" href="javascript:void(0)"></a>';
						return s + ' ' + r;
					},
					events : 'operateCreditEvents'
				}
			]
	});  
}

function litigantInitTable() { 
	$('#litigantListTable').bootstrapTable('destroy');
	$("#litigantListTable").bootstrapTable({  
         method: "post", 
         url: "../../litigantSituation/list", 
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'corpId',
 	        title: '企业ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	    	field: 'litigantName',
 	        title: '诉讼方名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	    	field: 'litigantMoney',
 	        title: '诉讼金额',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'querySource',
 	        title: '查询来源',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="litigant" title="修改" href="javascript:void(0)"></a>';
	            var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="litigant" title="删除" href="javascript:void(0)"></a>';
	            return s+' '+d;
	        },
 	        events: 'operateCreditEvents'
 	    }]
       });  
	
}

function orgnInitTable() { 
	$('#orgnListTable').bootstrapTable('destroy');
	$("#orgnListTable").bootstrapTable({  
         method: "post", 
         url: "../../orgnLoanCount/list", 
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
 	        field: 'recUid',
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
 	        field: 'loanDate',
 	        title: '贷款时间',
 	        align: 'center',
 	        valign: 'middle',
 	       formatter:function(value,row,index){
       		if(row.loanDate!=null&&row.loanDate!=''){
       			return dateFormat(row.loanDate, 'yyyy-MM-dd')
       		}
	        }
 	    },{
 	        field: 'dueDate',
 	        title: '到期日',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index){
       		if(row.dueDate!=null&&row.dueDate!=''){
       			return dateFormat(row.dueDate, 'yyyy-MM-dd')
       		}
	        }
 	    },{
 	        field: 'loanBank',
 	        title: '借款银行',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'assureCompany',
 	        title: '担保公司',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'cautionMoney',
 	        title: '保证金(担保公司)',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'loanMoney',
 	        title: '金额(元)',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'profitRate',
 	        title: '利率(%)',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'pawn',
 	        title: '抵押物',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="orgn" title="修改"  href="javascript:void(0)"></a>';
	            var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="orgn" title="删除" href="javascript:void(0)"></a>';
	            return s+' '+d;
	        },
 	        events: 'operateCreditEvents'
 	    }]
       });  
	
}

function addCreditFun(type, num) {
	$('#' + type + 'AddModalLabel').text("添加");
	if (type == 'corp') creditAjaxRelaEnterprise();
	if (type == 'share') creditAjaxRelaShares();
    $('#' + type + 'AddModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(num); //新增1；修改2
}

function modCreditFun(row, type, num) {
	$('#' + type + 'AddModalLabel').text("修改");
    $('#isEdit').val(num); //新增1；修改2
    CloudUtils.setForm(row, '' + type + 'AddForm');
    $('#' + type + 'AddModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    if(row.ratingTime!=null&&row.ratingTime!=''){
    	$("#corpRatingTime").val(dateFormat(row.ratingTime, 'yyyy-MM-dd'));
    }
    if(row.inquiryTime!=null&&row.inquiryTime!=''){
    	$("#corpInquiryTime").val(dateFormat(row.inquiryTime, 'yyyy-MM-dd'));
    }
    if(row.ratingTime!=null&&row.ratingTime!=''){
    	$("#shareRatingTime").val(dateFormat(row.ratingTime, 'yyyy-MM-dd'));
    }
    if(row.inquiryTime!=null&&row.inquiryTime!=''){
    	$("#shareInquiryTime").val(dateFormat(row.inquiryTime, 'yyyy-MM-dd'));
    }
    if(row.loanDate!=null&&row.loanDate!='') {
    	$("#loanDate").val(dateFormat(row.loanDate, 'yyyy-MM-dd'));
    }
    if(row.dueDate!=null&&row.dueDate!='') {
    	$("#dueDate").val(dateFormat(row.dueDate, 'yyyy-MM-dd'));
    }
}

function saveCreditUser(type) {
	var data = CloudUtils.convertStringJson('' + type + 'AddForm');
	var jsonData = eval("(" + data + ")");
	jsonData['corpId'] = corpId;
	$('#' + type + 'AddModal').modal('hide');
	var uri =  $('#isEdit').val() == 1 ? 'add' : 'mod', mUrl;
	switch(type) {
		case 'corp': mUrl = '../../creditReport/' + uri;break;
		case 'share': mUrl = '../../creditReport/' + uri;break;
		case 'orgn': mUrl = '../../orgnLoanCount/' + uri;break;
		case 'guarantee': mUrl = '../../externalGuarantee/' + uri;break;
		case 'litigant': mUrl = '../../litigantSituation/' + uri;break;
	}
	var options = {
			url : mUrl,
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					eval(''+ type + 'InitTable()');
					bootbox.alert(data.resultNote);
				}else{
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

//form验证规则
function creditFormValidator(){
	$('#corpAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {}
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		saveCreditUser('corp');
		$(e.target).bootstrapValidator('resetForm', true);
	});

	$('#shareAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  shareHolderId: {
	              validators: {
	                  notEmpty: {
	                      message: '股东姓名不能为空'
	                  }
	              }
	          }
	      }
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		saveCreditUser('share');
		$(e.target).bootstrapValidator('resetForm', true);
	});
	
	$('#orgnAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  loanBank: {
	              validators: {
	            	  notEmpty : {
							message : '借款银行不能为空'
	            	  },
	              }
	          },
	          assureCompany: {
	              validators: {
	            	  notEmpty : {
							message : '担保公司不能为空'
	            	  },
	              }
	          },
	          cautionMoney: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '保证金在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          loanMoney: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '金额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          profitRate: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
	            	    callback: {  
	                       message: '利率在0-100之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     } 
	              }
	          },
		      pawn: {
		    	  validators: {
	            	  notEmpty : {
							message : '抵押物不能为空'
	            	  },
	              }
	          },
		     
	      },
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		saveCreditUser('orgn');
		$(e.target).bootstrapValidator('resetForm', true);
	});
	
	$('#guaranteeAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	          guaranteeMoney : {
	        	  validators : {
	        		  notEmpty : {
	        			  message : '担保金额不能为空'
	        		  },
	        		  numeric : {
	        			  message : '只能输入数字'
	        		  },
	        		  callback : {
	        			  message : '账户金额在0-999999999.99之间',
	        			  callback : function(value, validator) {
	        				  return value == ""
	        					  || (parseFloat(value) >= 0 && parseFloat(value) <= 999999999.99);
	        			  }
	        		  }
	        	  }
	          }, 
	         guarantorName : {
	                validators: {
	                     notEmpty: {
		                      message: '被担保方名称不能为空'
		                  },
		                  
	                }
	         }
	          
	      }
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		saveCreditUser('guarantee');
		$(e.target).bootstrapValidator('resetForm', true);
	});
	
	$('#litigantAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  litigantName : {
					validators : {
						notEmpty : {
							message : '诉讼方名称不能为空'
						}
					}
	    	  },
	    	  litigantMoney: {
	              validators: {
	            	  notEmpty : {
							message : '诉讼方名称不能为空'
						},
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '诉讼金额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          querySource : {
					validators : {
						notEmpty : {
							message : '查询来源不能为空'
						}
					}
	    	  }
	      }
	}).on('success.form.bv', function (e) {
		e.preventDefault();
		saveCreditUser('litigant');
		$(e.target).bootstrapValidator('resetForm', true);
	});	
}

function creditNumFormat(){
	$('#guaranteeMoney').number(true, 2)
	$("#cautionMoney").number(true, 2);
	$("#loanMoney").number(true, 2);
	$("#profitRate").number(true,2);
	$("#litigantMoney").number(true, 2);
}

window.operateCreditEvents = {
	'click .modify': function (e, value, row, index) {
		modCreditFun(row, $(e.target).data('type'), 2);
	},
    'click .remove': function (e, value, row, index) {
    	var type = $(e.target).data('type'), mUrl, mData;
    	switch(type) {
    	case 'corp': mUrl = '../../creditReport/delete';mData = '{"creditId":"'+ row.creditId +'"}';break;
    	case 'share': mUrl = '../../creditReport/delete';mData = '{"creditId":"'+ row.creditId +'"}';break;
    	case 'orgn': mUrl = '../../orgnLoanCount/delete';mData = '{"creditId":"'+ row.creditId +'"}';break;
    	case 'guarantee': mUrl = '../../externalGuarantee/delete';mData = '{"recUid":"'+ row.recUid +'"}';break;
    	case 'litigant': mUrl = '../../litigantSituation/delete';mData = '{"recUid":"'+ row.recUid +'"}';break;
    	}
    	bootbox.confirm("确定删除此条记录?", function(result) {  
            if (result) {
            	var options = {
        			url : mUrl,
					data : mData,
					callBackFun : function(data) {
						if(data.result==0){
							eval(''+ type + 'InitTable()');
							bootbox.alert(data.resultNote);; 
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


function creditAjaxRelaShares(){
	var options = {
		url : '../../shareHolder/list',
		data : '{"corpId":"'+corpId+'","isPage": 0}',
		callBackFun : function(data) {
			debugger
			if(data.result==0){
				$.each(data.dataList, function (index, units) {
					$("#shareAddForm #shareHolderId").append("<option value="+units.shareHolderId+">" + units.shareName + "</option>");  
				});
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

function creditAjaxRelaEnterprise(){
	var options = {
		url : '../../affiliatedEnterprise/list',
		data : '{"corpId":"'+corpId+'","creditType": 0}',
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function (index, units) {
					if(units.recUid!=null&&units.recUid!=''){
						$("#relaEnterpriseId").append("<option value="+units.recUid+">" + units.enterpriseName + "</option>");
	        		}
				});
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