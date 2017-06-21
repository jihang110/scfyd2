$(function() {
	 initTable(); 
	 formValidator();
	 ajaxRelaCorps();
	//modal绑定事件
	 $('#addModal').on('hidden.bs.modal', function(){
			$("#addForm").bootstrapValidator('resetForm', true);
			$("#addForm")[0].reset();
			$('#corpId').selectOrDie("destroy");
			$('#relationType').selectOrDie("destroy");
			$('#enterpriseType').selectOrDie("destroy");
			$('#ccy').selectOrDie("destroy");
			window.parent.scrollTo(0,0);
		});
	numFormat();
 });
 
 
 function  ajaxRelaCorps(){
		let corpId = 'corp00001';
		var options = {
				url : '../../corp/list',
				data : '{"relaCorpId":"'+corpId+'","isPage": 0}',
				callBackFun : function(data) {
					if(data.result==0){
						$("#corpId").html('');
						$.each(data.dataList, function (index, units) {  
							$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
						}); 
						$('#corpId').selectOrDie();//设置下拉选样式
						$('#relationType').selectOrDie();
						$('#enterpriseType').selectOrDie();
						$('#ccy').selectOrDie();
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

 function addFun() {
 	 $("#addModalLabel").text("添加");
     $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
     $('#isEdit').val(1); //添加1；修改2
 }


 function modFun(row,isEdit) {
	$('#addModal').modal({backdrop: 'static', keyboard: false});
 	$("#addModalLabel").text("修改");
 	$('#isEdit').val(2); //添加1;修改2;
 	CloudUtils.setForm(row,'addForm');
 }

 function saveUser() {
	$('#addModal').modal('hide');
 	var data = CloudUtils.convertAllJson('addForm');
 	data = eval("(" + data + ")");
	data = JSON.stringify(data);
 	var isEdit =  $('#isEdit').val(); 
	var options = {
			url : isEdit == 1?'../../affiliatedEnterprise/add':'../../affiliatedEnterprise/mod',
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


 
 function initTable() { 
		$('#userListTable').bootstrapTable('destroy');  
		$("#userListTable").bootstrapTable({  
	         method: "post", 
	         url: "../../affiliatedEnterprise/list", 
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
	               isPage : 1,
	               corpId: 'corp00001',
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
		 	        title: '关联企业Id',
		 	        align: 'center',
		            valign: 'middle',
		            visible: false
		 	}, {
	 	        field: 'enterpriseName',
	 	        title: '关联企业名称',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'corpName',
	 	        title: '所属企业',
	 	        align: 'center',
	            valign: 'middle'
	 	    },{
		 		field: 'industry',
		 		title: '所属行业',
		 		align: 'center',
	            valign: 'middle'
		 	},{
	 	        field: 'relationType',
	 	        title: '关系类型',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
	 	        	if(value==1){
	 	        		return "子公司";
	 	        	}else if(value==2){
	 	        		return "母公司";
	 	        	}else if(value==3){
	 	        		return "兄弟公司";
	 	        	}else{
	 	        		return "其他";
	 	        	}
	 	        }
	 	    }, {
	 	        field: 'enterpriseCorporation',
	 	        title: '企业法人',
	 	        align: 'center',
	            valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	       align: 'center',
	           valign: 'middle',
	 	        formatter:function(value,row,index){
	 	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	            return s+' '+r;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	       });  
	}
 window.operateEvents = {
			'click .modify': function (e, value, row, index) {
					modFun(row,2);
			},
		    'click .remove': function (e, value, row, index) {
		    	bootbox.confirm("确定删除此条记录?", function(result) {  
		            if (result) {
		            	var options = {
		    					url : '../../affiliatedEnterprise/delete',
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
 
		 
//form验证规则
 function formValidator(){
 	$('#addForm').bootstrapValidator({
 	      message: 'This value is not valid',
 	      excluded:':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
 	      fields: {
 	    	 enterpriseName: {
 	              validators: {
 	                  notEmpty: {
 	                      message: '关联企业名称不能为空'
 	                  },
 	                  stringLength: {
 	                      min: 1,
 	                      max: 32,
 	                      message: '关联企业名称长度为1-32'
 	                  }
 	              }
 	          },
 	         enterpriseCorporation: {
	              validators: {
	                  notEmpty: {
	                      message: '企业法人不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '关联企业名称长度为1-32'
	                  }
	              }
	          },
 	         busiScope : {
 	              validators: {
 	            	 stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '经营范围长度为1-32'
	                  }
 	              }
 	          },
 	        industry : {
 	              validators: {
 	            	 notEmpty: {
	                      message: '所属行业不能为空'
	                  },
 	            	 stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '所属行业长度为1-32'
	                  }
 	              }
 	          }/*,
 	         regCap : {
 	 	              validators: { 
 	 	            	  notEmpty: {
 	                      message: '注册资本不能为空'
 	                  },
 	                 regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	                  callback: {  
	                         message: '注册资本在0~10000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value=="" || (parseFloat(value)>=0&&parseFloat(value)<=10000000000);
	                         }  
	                     } 
 	 	              }
 	 	          },
 	 	        shareName : {
 	 	              validators: {
 	 	            	 notEmpty: {
 	 	                      message: '股东名称不能为空'
 	 	                  },
 	 	            	 stringLength: {
 		                      min: 1,
 		                      max: 32,
 		                      message: '股东名称长度为1-32'
 		                  }
 	 	              }
 	 	          },
 	 	        shareProportion : {
 	 	 	              validators: {
 	 	 	            	notEmpty: {
 	 	 	                      message: '持股比例不能为空'
 	 	 	                  },
 	 	 	            	 callback: {  
 	 	                         message: '持股比例在0-100之间',  
 	 	                         callback: function(value, validator) { 
 	 	                        	 return value=="" || (parseFloat(value)>=0&&parseFloat(value)<=100);
 	 	                         }  
 	 	                     }
 	 	 	              }
 	 	 	          }*/
 	          
 	      }
 		})
 		.on('success.form.bv', function (e) {
 			e.preventDefault();
 			saveUser();
 	        $(e.target).bootstrapValidator('resetForm', true);
 		});	
 }
 
 function numFormat(){
		$("#regCap").number(true, 2);
		
	}