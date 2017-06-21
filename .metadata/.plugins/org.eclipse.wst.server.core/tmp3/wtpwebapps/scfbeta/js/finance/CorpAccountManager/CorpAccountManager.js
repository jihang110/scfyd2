$(document).ready(function() {
	initTable(); 
	formValidator();
	//去掉modal上的验证缓存
	$('#addModal').on('hidden.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
	});
	ajaxRelaCorps();
	numFormat();
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../corpAccount/delete',
	    					data : '{"recUid":"'+row.recUid+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initTable();
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

function initTable() { 
	$('#corpAccountManagerList').bootstrapTable('destroy');  
	$("#corpAccountManagerList").bootstrapTable({  
         method: "post", 
         url: "../../corpAccount/list", 
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
               corpId: 'corp00001'
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
 	    }, {
 	        field: 'corpId',
 	        title: '付款企业',
 	        align: 'center',
            valign: 'middle',
             visible: false
 	    },{
 	        field: 'accountType',
 	        title: '账号类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
              	if(value==1){
              		return "买方";
              	}else if(value==2){
              		return "卖方";
              	}else{
              		return "其他";
              	}
              } 
 	    },{
 	        field: 'accountName',
 	        title: '户名',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'currency',
 	        title: '币种',
 	        align: 'center',
             valign: 'middle',
                 formatter:function(value,row,index){
                 	if(value=="人民币"){
                 		return "人民币";
                 	}else if(value=="美元"){
                 		return "美元";
                 	}
                 } 
 	    },{
 	        field: 'accountBank',
 	        title: '开户银行',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'bankLocation',
 	        title: '开户网点',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="修改" href="javascript:void(0)"></a>';
	 	         var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	        return m+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}


function modFun(row) {
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(isEdit); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
	$('#addModalLabel').modal("hide");
    var modal = $('#addModal');
	var data = CloudUtils.convertAllJson('addForm');
	var isEdit =  $('#isEdit').val(); 
	if(isEdit){//新增1；修改2
		var options = {
				url : (isEdit == 1)?'../../corpAccount/add':'../../corpAccount/mod',
				data : data,
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						initTable();
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
	modal.modal("hide");
	window.parent.scrollTo(0,0);
}

//动态下拉框
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

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  accountAmount : {
	    		  validators: {
						notEmpty: {message: '账户金额不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '账户金额在-1000000000.00~1000000000.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },
	         account : {
	        	 validators: {
						notEmpty: {message: '账户不能为空'},
						numeric: {message: '只能输入数字'},
						stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '长度为1-32'
		                  }
					}	        	 
	         },
	         currency : {
	        	 validators: {
						notEmpty: {message: '币种不能为空'},
					}
	         },
	         accountName : {
					validators: {
						notEmpty: {message: '户名不能为空'},
						stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '户名长度为1-32'
		                  }
					}
				},
				accountBank : {
					validators: {
						notEmpty: {message: '开户银行不能为空'},
						stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '开户银行名称长度为1-32'
		                  }
					}
				},
				bankLocation : {
					validators: {
						notEmpty: {message: '开户网点不能为空'},
				stringLength: {
                    min: 1,
                    max: 32,
                    message: '开户网点名称长度为1-32'
                }
					}
				},
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUser();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function numFormat(){
	$("#accountAmount").number(true, 2);
	
}
