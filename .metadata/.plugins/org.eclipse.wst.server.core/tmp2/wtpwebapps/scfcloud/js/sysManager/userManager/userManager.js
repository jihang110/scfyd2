$(document).ready(function() {
//	ajaxtree();
	//查询页面更多筛选条件的隐藏和显示
	CloudUtils.searchMoreIsHidden("searchMore","isHidden");
	CloudUtils.inputCacheClear();
	$('#addModal').on('hidden.bs.modal', function(){
		
		$("#addForm")[0].reset();
	});
	formValidator();
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})
	
//	$('#addModal').on('shown.bs.modal', function () {
//		$("#addForm").data('bootstrapValidator').resetForm();
//	});
	ajaxRoles();
	ajaxCorps("");
	ajaxRoleType();
	initTable(); 
	changeCorp(document.getElementById("corpId"));
} );

//重置按钮事件
function ResetBtn(){
	$("#txt_roleName").val("");  
    $("#txt_mobilephone").val("");
}

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../user/delete',
	    					data : '{"userId":"'+row.userId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							pageSize = $('span.page-size').text();
	    							pageNumber = $("li.page-number.active a").text();
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
	    },
		'click .reset': function (e, value, row, index) {
	    	bootbox.confirm("确定重置密码?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../user/resetPassword',
	    					data : '{"userId":"'+row.userId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
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

function searchFun() {
	initTable();  
}
var pageSize ;
var pageNumber;
function initTable() { 
	pageSize = $('span.page-size').text();
	pageNumber = $("li.page-number.active a").text();
	$('#userListTable').bootstrapTable('destroy');  
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../user/list", 
         striped: false,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: pageSize?pageSize:5,  //每页显示的记录数  
         pageNumber: pageNumber?pageNumber:1, //当前第几页  
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
           corpId = jsonData.txt_company;
           if(corpId==""&&store.get('roleType')==1){
        	   corpId = '';
	       }else if(corpId==""&&store.get('roleType')==2){
	    	   if(jsonData.txt_sysType ==5){
	    		   corpId = jsonData.txt_company;
	    	   }else{
	    		   corpId = store.get('corpId');
	    	   }
	       }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               username: jsonData.txt_username,
               corpId: corpId,
               mobilephone: jsonData.txt_mobilephone,
               roleName: jsonData.txt_roleName,
               roleType: jsonData.txt_roleType
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
 	        field: 'userId',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'username',
 	        title: '用户名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'realname',
 	        title: '真实姓名',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'corpName',
 	        title: '所属企业',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'corpId',
 	        title: '所属机构id',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'deptName',
 	        title: '所属部门',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'deptId',
 	        title: '所属部门id',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'mobilephone',
 	        title: '手机号码',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'fixedPhone',
 	        title: '固定电话',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'email',
 	        title: '邮箱',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'roleName',
 	        title: '用户角色',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'roleId',
 	        title: '用户角色id',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'note',
 	        title: '用户描述（备注）',
 	        align: 'center',
             valign: 'middle'
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	            var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            //if(store.get('roleType')==1){
 	            	var r = '<a class = "fa fa-rotate-left reset" style="color:#fad164;padding:0px 5px;" title="重置密码" href="javascript:void(0)"></a>';
 	            	return m+' '+d+' '+r;
 	          //  }
 	           // return m+' '+d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}
 
function ajaxtree(corpId){
	 //查出所有的树，不重session取deptId
	 var deptId = null;
	 var options = {
				url : "../../dept/tree",
				data : JSON.stringify({ 
		        	 "corpId": corpId,
		        	 "deptId": deptId
		         }),
		         callBackFun : function(data) {
						if(data.result==0){
							var jsonStringData= JSON.stringify(data.dataList);
				        	 jsonStringData=jsonStringData.replace(/deptName/g,'text');
				        	 jsonStringData=jsonStringData.replace(new RegExp("subDeptList","gm"),"nodes");
				         	 var jsonData=eval('('+ jsonStringData +')');
				         	$('#parentId').treeview({
				         		 data:jsonData,
				         		 showCheckbox:false,
				         		 levels:0
				         		 });

				        	$('#parentId').on('nodeSelected', function(event, data) {
				        		var parentId = $('#parentId').treeview('getSelected', 0);
				        		if(parentId.length!=0){
				        	 		$('#deptId').val(parentId[0].deptId);
				        	 	}
				            });
				        	$('#parentId').on('nodeUnselected', function(event, data) {
				        		$('#deptId').val("");
				         		$("#addForm").data('bootstrapValidator').updateStatus('deptId', 'NOT_VALIDATED',null).validateField('deptId'); 
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
		CloudUtils.ajax(options);
}

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
    $("#username").attr('disabled',false);
    $("#divPassword").show();
    $("#divConfirmPassword").show();
    $("#corpId").attr("disabled", false);
    $("#sysType").attr("disabled", false);
    $("#corpId option:first").attr("selected", true);
	ajaxDepts($("#corpId").val());
    $("#deptId option:first").attr("selected", true);
	ajaxCorpRoles($("#corpId").val());
	$("#roleId option:first").attr("selected", true);
	ajaxtree($("#corpId").val());
	$("#password").attr('disabled',false);
	$("#confirmPassword").attr('disabled',false);
}
var oldName;
var oldPhone;
function modFun(row) {
	$("#username").attr('disabled',true);
	$("#sysType option[value="+row.roleType+"]").attr("selected", "selected");
	ajaxCorps(row.roleType);
	ajaxCorpRoles(row.corpId);
	$("#sysType option[value="+row.roleType+"]").attr("selected", "selected");
	oldName = null;
	oldPhone = null;
	oldName = row.username;
	oldPhone = row.mobilephone;
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    //CloudUtils.setForm(row,'addForm');
    $("#password").attr('disabled',true);
    $("#divPassword").hide();
    $("#confirmPassword").attr('disabled',true);
    $("#divConfirmPassword").hide();
    /*$("#deptId option:first").attr("selected",true);
    ajaxCorpRoles($("#corpId").val());
      $("#userId").val(row.userId);
    $("#username").val(row.username);
    ajaxtree(row.corpId);
    var allOption= $('#parentId').treeview('getUnchecked', 0);
    $.each(allOption, function (index, units) {  
			if(units.deptId == row.deptId){
				 $("#parentId").treeview('selectNode', [ units.nodeId, { silent: true } ]);
				 //单选，保留性能
				 return false;
			}
		
	});*/
    CloudUtils.setForm(row,'addForm');
   /* $("#corpId option:first").attr("selected", true);
	ajaxDepts($("#corpId").val());*/
    ajaxDepts('corp00001');
	$("#parentId").parents(".form-group").show();
    $("#deptId option:first").attr("selected", true);
	ajaxCorpRoles($("#corpId").val());
	$("#roleId option:first").attr("selected", true);
	ajaxtree($("#corpId").val());
    $("#corpId").attr("disabled", true);
    $("#sysType").attr("disabled", true);
}

function saveUser() {
	var parentId = $('#parentId').treeview('getSelected', 0);
	if(parentId.length!=0){
 		$('#deptId').val(parentId[0].deptId);
 	}else{
 		$('#deptId').val("");
 	}
	//$('#addForm').data('bootstrapValidator').validate();
	
	
 	var modal = $('#addModal');
 	var data = CloudUtils.convertStringJson('addForm');
 	data = eval("(" + data + ")");
	data = JSON.stringify(data);
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../user/add',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
						searchFun();
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
	}else{
		var jsonData = eval("(" + data + ")");
		if(oldName == jsonData.username){
			jsonData.username = null;
			
		}
		if(oldPhone == jsonData.mobilephone){
			jsonData.mobilephone = null;
		}
		var options = {
				url : '../../user/mod',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					if(data.result==0){
						searchFun();
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
	}
	modal.modal("hide");
	window.parent.scrollTo(0,0);
}

function  ajaxRoles(){
	var roleId = store.get('roleId');
	var param;
	if(roleId=='ROLE000001'){
		param = '{"roleType":"1", "corpId":""}';
	}else{
		param = '{"roleType":"", "corpId":"'+store.get('corpId')+'"}';
	}
	var options = {
			url : '../../role/list',
			data : param,
			callBackFun : function(data) {
				if(data.result==0){
					$("#roleId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#roleId").append("<option value="+units.roleId+" >" + units.roleName + "</option>");  
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

function  ajaxCorps(sysType){
	var data;
	if(store.get('roleType')==1){
		data = '{"isPage": 0}';
	}else{
		data ='{"sysType":"'+sysType+'","isLogo":"Y","isPage": 0}'
		
	}
	var options = {
			url : '../../corp/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$("#txt_company").html('');
					$("#txt_company").append("<option value=''>全部</option>"); 
					$.each(data.dataList, function (index, units) {  
						$("#corpId").append("<option value="+units.corpId+" sysType="+units.sysType+">" + units.corpName + "</option>");  
						$("#txt_company").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
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

function changeCorp(obj){
	var opt = obj.options[obj.selectedIndex];
	ajaxDepts(opt.value);
	ajaxCorpRoles(opt.value);
	//为德远保理商显示
	if(opt.value==="corp00001"){
		ajaxtree(opt.value);
		$("#parentId").parents(".form-group").show();
	}else{
		$("#parentId").parents(".form-group").hide();
	}
//	console.log(opt.value);
//	console.log(opt.attributes.sysType.nodeValue);
}

function  ajaxDepts(corpId){
	var options = {
			url : '../../dept/tree',
			data : '{"corpId":"'+corpId+'"}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#deptId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#deptId").append("<option value="+units.deptId+">" + units.deptName + "</option>");  
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

function  ajaxCorpRoles(corpId){
	var param;
	var roleId = store.get('roleId');
	if(roleId=='ROLE000001'){
		param = '{"roleType":"1", "corpId":"'+corpId+'"}';
	}else{
		param = '{"roleType":"", "corpId":"'+corpId+'"}';
	}
	var options = {
			url : '../../role/listByCorp',
			data : param,
			callBackFun : function(data) {
				if(data.result==0){
					$("#roleId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#roleId").append("<option value="+units.roleId+">" + units.roleName + "</option>");  
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

//角色类型下拉框查询
function ajaxRoleType(){
	var options = {
		url : "../../role/roleTypeList",
		data : JSON.stringify({}),
		callBackFun : function(data) {
			if(data.result==0){
				$.each(data.dataList, function(i, n) {
					$("#txt_roleType").append('<option value="' + n.roleType + '">' + n.roleTypeName + '</option>');
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
	CloudUtils.ajax(options);
}

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	    //excluded:[":hidden",":disabled",":not(visible)"] ,//bootstrapValidator的默认配置
	      excluded: ':disabled',//关键配置，表示只对于禁用域不进行验证，其他的表单元素都要验证
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  realname: {
	              validators: {
	                  notEmpty: {
	                      message: '真实姓名不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 10,
	                      message: '用户名长度为1-10'
	                  }
	              }
	          },
	          email: {
	              validators: {
//	                  emailAddress: {
//	                      message: '邮箱格式不正确'
//	                  }
	            	  stringLength: {
			              max: 32,
			              message: '邮箱长度不能超过32'
			          },
	            	  regexp: {
	                      regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	                      message: '邮箱格式不正确'
	                  }
	              }
	          },
	          password: {
	              validators: {
	                  notEmpty: {
	                      message: '密码不能为空'
	                  },
	                  different: {
	                      field: 'username',
	                      message: '密码不能和用户名相同'
	                  }
	              }
	          },
	          confirmPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '密码确认不能为空'
	                  },
	                  identical: {
	                      field: 'password',
	                      message: '两次输入密码不一致'
	                  },
	                  different: {
	                      field: 'username',
	                      message: '密码不能和用户名相同'
	                  }
	              }
	          },
	          mobilephone: {
	              validators: {
	                  notEmpty: {
	                      message: '手机号不能为空'
	                  },
			          regexp: {
	                      regexp: /^1[34578]\d{9}$/,
	                      message: '请输入正确的手机号'
	                  }
	              }
	          },
	          roleId: {
	              validators: {
	                  notEmpty: {
	                      message: '角色不能为空'
	                  }
	              }
	          },
	          fixedPhone: {
	        	  validators: {
	            	  notEmpty: {
	                      message: '固定电话不能为空'
	                  },
	                  regexp: {
	                      regexp: /^(0\d{2,3}-\d{7,8})$/,
	                      message: '格式类似为: 0XXX-XXXXXXX'
	                  }
	              }
	          },
	          note: {
	              validators: {
	            	  stringLength: {
			              max: 128,
			              message: '用户描述长度不能超过128'
			          },
	              }
	          },
	          username: {
	              message: '用户名格式不正确',
	              validators: {
	                  notEmpty: {
	                      message: '用户名不能为空'
	                  },
	                  stringLength: {
	                      min: 2,
	                      max: 20,
	                      message: '用户名长度为2-20'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
	                  different: {
	                      field: 'password,confirmPassword',
	                      message: '用户名不能和密码相同'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUser();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}
