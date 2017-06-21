$(document).ready(function() {
	//清除表单
	$('.modal').on('hidden.bs.modal', function(){
		$('form').each(function() {
			$(this).bootstrapValidator("resetForm", true);
			this.reset();
		})
	});
	
	initTableBid();
	initTableSale();
	formValidatorSale();
	formValidatorBid();
	ajaxRelaCorps();
	numFormat();
	
	$('#startDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#endDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
} );


window.operateEvents = {
		'click .mod': function (e, value, row, index) {
			if('a' == $(e.target).data('type')){
				modBid(row);
			};
			if('b' == $(e.target).data('type'))
				modSale(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../corpContract/delete',
	    					data : '{"conId":"'+row.conId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							bootbox.alert(data.resultNote);
	    							searchFun();
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

function modBid(row) {

	//显示表格数据
	$("#addModalLabel").text("修改");
    $('#addModalBid').modal('show');
    CloudUtils.setForm(row,'addFormBid');
    $('#isEdit').val(2);

}

function modSale(row) {

	//显示表格数据
	$("#addModalLabel").text("修改");
    $('#addModalSale').modal('show');
    CloudUtils.setForm(row,'addFormSale');
    $('#isEdit').val(2);
   
}

/*
 * 初始化招/投标合同
 */
function initTableBid() { 
	$('#userListBidTable').bootstrapTable('destroy');
	$("#userListBidTable").bootstrapTable({  
         method: "post", 
         url: "../../corpContract/listBid", 
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
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
        		 var size = res.records;
        		 if(size>50000){//限制5w条不允许导出
        			 canExp = false;
        		 }else{
        			 canExp = true;
        		 }
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
 	        field: 'corpId',
 	        title: 'corpId',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'amount',
 	        title: '项目金额',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	        	var s = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="a" href="javascript:void(0)"></a>';
	  	 	    var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	  	        return s+' '+r;
	        },
 	        events: 'operateEvents'
 	    }]
       });  
	
}


/*
 * 初始化贸易/销售合同
 */
function initTableSale() { 
	$('#userListSaleTable').bootstrapTable('destroy');
	$("#userListSaleTable").bootstrapTable({  
         method: "post", 
         url: "../../corpContract/listSale", 
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
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
        		 var size = res.records;
        		 if(size>50000){//限制5w条不允许导出
        			 canExp = false;
        		 }else{
        			 canExp = true;
        		 }
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
 	        field: 'corpId',
 	        title: 'corpId',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'projectUser',
 	        title: '交易对手名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'startDate',
 	        title: '合同起始日',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'endDate',
 	        title: '合同到期日',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	        	var s = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" data-type="b" title="编辑" href="javascript:void(0)"></a>';
	  	 	    var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	  	        return s+' '+r;
	        },
 	        events: 'operateEvents'
 	    }]
       });  
	
}


function saveUserBid(){
	$('#addModalBid').modal('hide');
	var data = CloudUtils.convertAllJson('addFormBid');
	var modal = $('#addModalBid');
	console.log(data);
	updateData(data,modal);
	
}

function saveUserSale(){
	$('#addModalSale').modal('hide');
	var data = CloudUtils.convertAllJson('addFormSale');
	var modal = $('#addModalSale');
	updateData(data,modal);
		
}

function updateData(data,modal){
	var isEdit =  $('#isEdit').val(); 
	var url = "";
	if(isEdit == 1){
		url = '../../corpContract/add';
		
	}else {
		url = '../../corpContract/update';	
		
	}
	var modalBid = $('#addModalBid');
	var modalBid = $('#addModalSale');
	var options = {
			url : url,
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					searchFun();
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
	modal.modal("hide");
		
}

function numFormat(){
	$("#amount").number(true, 2);
}

function searchFun(){
	initTableBid();
	initTableSale();
	
}


function formValidatorBid(){
	$("#addFormBid").bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  projectUser : {
					validators : {
						notEmpty : {
							message : '交易对手不能为空'
						},
						regexp: {
		                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
		                      message: '只能输入中文或英文'
		                }
					}
	    	  },
	    	  amount : {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '项目金额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          startDate : {
					validators : {
						notEmpty : {
							message : '合同起始日不能为空'
						}
					}
	    	  },
	    	  endDate : {
					validators : {
						notEmpty : {
							message : '合同到期日不能为空'
						}
					}
	    	  },
	    	  projectName : {
					validators : {
						notEmpty : {
							message : '项目名称不能为空'
						}
					}
	    	  }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUserBid();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function formValidatorSale(){
	$("#addFormSale").bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  projectUser : {
					validators : {
						notEmpty : {
							message : '交易对手不能为空'
						},
						regexp: {
		                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
		                      message: '只能输入中文或英文'
		                }
					}
	    	  },
	    	  amount : {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '项目金额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          startDate : {
					validators : {
						notEmpty : {
							message : '合同起始日不能为空'
						}
					}
	    	  },
	    	  endDate : {
					validators : {
						notEmpty : {
							message : '合同到期日不能为空'
						}
					}
	    	  },
	    	  projectName : {
					validators : {
						notEmpty : {
							message : '项目名称不能为空'
						}
					}
	    	  }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUserSale();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function  ajaxRelaCorps(){
	let corpId = 'corp00001';
	var options = {
			url : '../../corp/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("select.corpId").append("<option value="+units.corpId+" selected>" + units.corpName + "</option>");
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











