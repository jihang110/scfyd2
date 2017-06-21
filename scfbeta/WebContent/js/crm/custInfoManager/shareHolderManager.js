$(document).ready(function() {
	//loadDate();
	ajaxRelaCorps();
	initTable();
	formValidator();
	numFormat();
	//modal绑定事件
	//去掉modal上的验证缓存
	$('#addModal').on('hidden.bs.modal', function () {
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
		window.parent.scrollTo(0,0);
	});
} );

function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					//$("#s_corpId").append("<option value=''>全选</option>");  
					$.each(data.dataList, function (index, units) {  
						//$("#s_corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
					});
					/*$("#corpId").selectOrDie();
					$("#shareType").selectOrDie();*/
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

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	    					url : '../../shareHolder/delete',
	    					data : '{"shareHolderId":"'+row.shareHolderId+'"}',
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
	$('#userListTable').bootstrapTable('destroy');  
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../shareHolder/list", 
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
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var corpId = store.get('corpId');
           if(corpId==null||corpId=='null'){
        	   corpId = '';
           }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId:jsonData.s_corpId
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
 	        field: 'shareHolderId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'corpId',
 	        title: '所属企业',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'shareName',
 	        title: '股东名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'shareType',
 	        title: '股东性质',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
              	if(value==1){
              		return "个人";
              	}else if(value==2){
              		return "法人";
              	}else{
              		return "其他";
              	}
              } 
 	    }, {
 	        field: 'subscribedCapital',
 	        title: '认缴资本',
 	        align: 'center',
 	        formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'paidInCapital',
 	        title: '实缴资本',
 	        formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'shareProportion',
 	        title: '持股比例',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'note',
 	        title: '变动情况',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑"  href="javascript:void(0)"></a>';
	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	            return  s+' '+r;
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
    $('#isEdit').val(2); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
	var modal = $('#addModal');
    modal.modal("hide");
	var data = CloudUtils.convertAllJson('addForm');
    	var isEdit =  $('#isEdit').val(); 
    	if(isEdit == 1){//添加1；修改2
    		var options = {
					url : '../../shareHolder/add',
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							initTable();
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
    	}else if(isEdit == 2){
    		var options = {
					url : '../../shareHolder/mod',
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							initTable();
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
	modal.modal("hide");
	window.parent.scrollTo(0,0);
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
	    	  shareName: {
	              validators: {
	            	  notEmpty: {
	                      message: '股东名称不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          shareType: {
	              validators: {
	            	  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          corpId: {
	              validators: {
	                  notEmpty: {
	                      message: '所属企业不能为空'
	                  }
	              }
	          },
	          subscribedCapital: {
	              validators: {
	            	  numeric: {
	            		  message: '认缴资本只能输入数字'
	            	  },
	            	  callback: {  
	                         message: '认缴资本在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
	                         }  
	                     } 
	              }
	          },
	          paidInCapital: {
	              validators: {
	            	  numeric: {
	            		  message: '实缴资本只能输入数字'
	            	  },
	            	  callback: {  
	                         message: '实缴资本在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
	                         }  
	                     } 
	              }
	          },
	          shareProportion: {
	              validators: {
	            	  numeric: {
	            		  message: '持股比例只能输入数字'
	            	  },
	            	  callback: {  
	                         message: '持股比例在0-100之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     } 
	              }
	          },
	          note: {
	              validators: {
	                  stringLength: {
	                      min: 1,
	                      max: 2000,
	                      message: '长度为1-2000'
	                  }
	              }
	          }
	      }
		}).on('success.form.bv', function (e) {
			e.preventDefault();
			saveUser();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function numFormat(){
	$("#subscribedCapital").number(true, 2);
	$("#paidInCapital").number(true, 2);
	
}
