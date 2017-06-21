$(document).ready(function() {	
	initTableBid();
	initTableSale();
	formValidatorSale();
	formValidatorBid();
	numFormat();
	CloudUtils.inputCacheClear();

	$('#addFormSale #startDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		endDate:new Date(),
		pickerPosition: "bottom-left"
	});
	
	$('#addFormSale #endDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	}).on("click",function(){  
        $("#addFormSale #endDate").datetimepicker("setStartDate",$("#addFormSale #startDate").val());
    });
});

window.operateBusinessEvents = {
	'click .mod' : function(e, value, row, index) {
		if ('Bid' == $(e.target).data('type')) modBid(row);
		if ('Sale' == $(e.target).data('type')) modSale(row);
	},
	'click .remove' : function(e, value, row, index) {
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var options = {
					url : '../../corpContract/delete',
					data : '{"conId":"' + row.conId + '"}',
					callBackFun : function(data) {
						if (data.result == 0) {
							bootbox.alert(data.resultNote);
							eval('initTable'+ $(e.target).data('type') + '()');
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

function addBid() {
    //显示表格数据
	$("#addModalLabelBid").text("新增");
	$('#addModalBid').modal({backdrop: 'static', keyboard: false});
	$('#isEdit').val(1);
}

function addSale() {
	//显示表格数据
	$("#addModalLabelSale").text("新增");
	$('#addModalSale').modal({backdrop: 'static', keyboard: false});
	$('#isEdit').val(1);
}

function modBid(row) {
	// 显示表格数据
	$("#addModalLabelBid").text("修改");
    CloudUtils.setForm(row,'addFormBid');
    $('#addModalBid').modal({backdrop: 'static', keyboard: false});
    $('#isEdit').val(2);
}

function modSale(row) {
	//显示表格数据
	$("#addModalLabelSale").text("修改");
    CloudUtils.setForm(row,'addFormSale');
    $('#addModalSale').modal({backdrop: 'static', keyboard: false});
    $('#isEdit').val(2);
}

/*
 * 初始化招/投标合同
 */
function initTableBid() { 
	$('#userListBidTablel').bootstrapTable('destroy');
	$("#userListBidTablel").bootstrapTable({  
         method: "post", 
         url: "../../corpContract/list", 
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
               contractType: 1,
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
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	        	var s = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" data-type="Bid" title="编辑" href="javascript:void(0)"></a>';
	  	 	    var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="Bid" title="删除" href="javascript:void(0)"></a>';
	  	        return s+' '+r;
	        },
 	        events: 'operateBusinessEvents'
 	    }]
       });  
	
}

/*
 * 初始化贸易/销售合同
 */
function initTableSale() { 
	$('#userListSaleTablel').bootstrapTable('destroy');
	$("#userListSaleTablel").bootstrapTable({  
         method: "post", 
         url: "../../corpContract/list", 
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
               contractType: 2,
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
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.startDate!=null&&row.startDate!=''){
        			return CloudUtils.dateFormat(row.startDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'endDate',
 	        title: '合同到期日',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.startDate!=null&&row.startDate!=''){
        			return CloudUtils.dateFormat(row.startDate, 'yyyy-MM-dd')
        		}
 	        }
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	        	var s = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" data-type="Sale" title="编辑" href="javascript:void(0)"></a>';
	  	 	    var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="Sale" title="删除" href="javascript:void(0)"></a>';
	  	        return s+' '+r;
	        },
 	        events: 'operateBusinessEvents'
 	    }]
       });  
	
}

function saveUserBid(){
	$('#addModalBid').modal('hide');
	var data = CloudUtils.convertStringJson('addFormBid');
	updateData(data, 'Bid');
	
}

function saveUserSale(){
	$('#addModalSale').modal('hide');
	var data = CloudUtils.convertStringJson('addFormSale');
	updateData(data, 'Sale');
		
}

function updateData(data, type){
	var isEdit =  $('#isEdit').val(); 
	var url = '../../corpContract/' + (isEdit == 1 ? 'add' : 'update');
	data = eval("(" + data + ")");
	data['corpId'] = corpId;
	data = JSON.stringify(data);
	var options = {
		url : url,
		data : data,
		callBackFun : function(data) {
			if(data.result==0){
				bootbox.alert(data.resultNote);
				eval('initTable'+ type + '()');
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

function numFormat(){
	$("#amount").number(true, 2);
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
	    	  
	         /* startDate : {
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
	    	  },*/
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUserSale();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}