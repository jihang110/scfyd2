var isEdit = CloudUtils.getIframeParams($(window.parent.document).find('iframe').attr('src')).isEdit;
$(function() {
	 $("#isEdit").val(isEdit);
	 CloudUtils.getMenuNames("nav");
	 
	 initDate();
	 hideFun();
	 initUserInfoTable();
	 attachInfoTable();
	 formValidator();
	 getFormInfo();
	 userInfoFormFormValidator();
	 numFormat();
	 HiddenformValidator();
/*	 $('#userInfoModal').on('hidden.bs.modal', function() {
			$("#userInfoForm").bootstrapValidator('resetForm', true);
			$("#userInfoForm")[0].reset();
		});
*/	 $('#detailModal').on('hidden.bs.modal', function() {
			$("#detailForm").bootstrapValidator('resetForm', true);
			$("#detailForm")[0].reset();
		});
 });
 var userInfoFormIndex =0;
 window.operateEvents = {
		    'click .modify': function (e, value, row, index) {
		    	if($(e.target).data('type')==="userInfo"){
		    		//修改
		    		moduserInfoFormFun(row,2);
		    		userInfoFormIndex = index;
		    	}
		    },
		    'click .remove':function (e, value, row, index) {
		    	//$('#userInfoTable').bootstrapTable('removeByUniqueId', index);
			     var attachData = $('#attachInfoTable').bootstrapTable('getData');
		    	if($(e.target).data('type')==="userInfoFormInfo"){
		    		var values = [];
			    	values.push(row.userInfoFormName);
			    	$('#userInfoTable').bootstrapTable('remove', {field: 'userInfoFormName', values: values});
		    	}else if ($(e.target).data('type')==="attach"){
		    		attachData.length
		    		var values = [];
			    	var num =$("#num").val();
			    	num = attachData.length-1;
			    	$("#num").val(num);
			    	values.push(row.fileUrl);
			    	$('#attachInfoTable').bootstrapTable('remove', {field: 'fileUrl', values: values});
		    	}
		    	
			}
 };
 
 function getFormInfo(){
	 var corpId = store.get('corpId');//从缓存中获取数据
	 if(isEdit=="3"){
		//修改 
		 detailFun(row);
		 initUserInfoTable(corpId);
		 attachInfoTable(corpId);
	 }else if(isEdit=="2"){
		 initUserInfoTable(corpId);
 		attachInfoTable(corpId);
 		modFun(row, 2);
	 }
	
 }
 function hideFun(){
		if (isEdit == 3){
			$("#fileUpload").hide();
			$("#addbutton").hide();
			$("#btnSave").hide();
		} else if (isEdit == 2) {
			$("#fileUpload").show();
			$("#addbutton").show();
			$("#btnSave").show();
		} 
	}

  function detailFun(row) {
	 	$('#detailModal').modal();
	 	$("#addModalLabel").text("详情");
	 	$("#detailForm").val("");
	 	CloudUtils.setForm(row,'detailForm');
	 	$('#detailForm input').attr('readonly',true);
	 	$("select").attr("disabled",true);
        document.getElementById("btn_save").style.display="none";
	    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
	}
 
 function modFun(row,isEdit){
	$("#addModalLabel").text("修改");
	$('#detailModal').modal();
	$('#detailForm input').attr('readonly',false);
 	$("select").attr("disabled",false);
    CloudUtils.setForm(row,'detailForm');
	$('#isEdit').val(isEdit); //新增1;修改2
	$('#sysType').attr('disabled',true);
 }
 
 function moduserInfoFormFun(row,isEdit){
    $("#adduserInfoModalLabel").text("修改");
	$('#userInfoModal').modal();
	CloudUtils.setForm(row,'userInfoForm');
	//
	$('#isEdit2').val(isEdit); //新增1;修改2
 }
 

 function addFun(type){
	
	 $('#detailForm input').attr('readonly',false);
	 	$("select").attr("disabled",false);
	 	$("#file").attr("disabled",false);
		$("#btn-add").attr("disabled",false);
	 if(type === 0){
		 $('#mainFrame',top.document).attr('src','pubManager/custManager/custAdd.html');
		 $('#isEdit').val(1); //新增1;修改2 
	 }else if(type === 1){
		 $("#userInfoModal").modal();
		 initTable();
		 $('#isEdit2').val(1); //新增1;修改2 
	 }
 }
 
 function saveFun(type){
	 $('#detailForm #agencyNumHidden,#detailForm,#userInfoForm').data('bootstrapValidator').validate();
	 var sysType = $("#sysType").val();
	 if(sysType==4){
		 $('#detailForm #agencyNumHidden').data('bootstrapValidator').validate();
	 }
	 if(!$('#detailForm,#userInfoForm,#agencyNumHidden').data('bootstrapValidator').isValid()){  
		    //没有通过校验 
		 return false;
		} else {
		   //通过校验，可进行提交等操作
	 if(type === 0){
//			保存到数据库
		 var data = CloudUtils.convertStringJson('detailForm');
	     var jsonData = eval("(" + data + ")");
	     var isEdit = $('#isEdit').val();
	     var allTableData = $('#userInfoTable').bootstrapTable('getData');
	     var attachData = $('#attachInfoTable').bootstrapTable('getData');
	     jsonData.userInfoList = allTableData;
	     jsonData.attachInfoList = attachData;
	     if(jsonData.sysType == 4){
//	    	 经销商进入流程
	    	 var options = {
				url : '../../custInfo/checkAgencyNum',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					if (data.result == 0) {
						bootbox.alert(data.resultNote,function(){
 							cancle();
 						});
					} else {
						bootbox.alert(data.resultNote);
 						return false;
 						
					}
				},
				errorCallback : function(data) {
					return false;
				}
			};
 		 CloudUtils.ajax(options);
	     }else{
	    	 if (isEdit == 1) {
	    		 var options = {
	    					url : '../../custInfo/add',
	    					data : JSON.stringify(jsonData),
	    					callBackFun : function(data) {
	    						if (data.result == 0) {
	    							bootbox.alert(data.resultNote,function(){
	    	 							cancle();
	    	 						});
	    						} else {
	    							bootbox.alert(data.resultNote);
	    	 						return false;
	    						}
	    					},
	    					errorCallback : function(data) {
	    						bootbox.alert(data.resultNote);
	    						return false;
	    					}
	    				};
	    		 CloudUtils.ajax(options);
	    	     } else if(isEdit == 2){
	    	    	 var options = {
	    	 				url : '../../custInfo/mod',
	    	 				data : JSON.stringify(jsonData),
	    	 				callBackFun : function(data) {
	    	 					if (data.result == 0) {
	    	 						bootbox.alert(data.resultNote,function(){
	    	 							cancle();
	    	 						});
	    	 					} else {
	    	 						bootbox.alert(data.resultNote);
	    	 						return false;
	    	 					}
	    	 				},
	    	 				errorCallback : function(data) {
	    	 					bootbox.alert(data.resultNote);
	    	 					return false;
	    	 				}
	    	 			};
	    	    	 CloudUtils.ajax(options);
	    	     }
	     }
		 $("#detailModal").modal("hide");
	 }else if(type ===1 ){
		 var isEdit2 = $('#isEdit2').val();
		  if (isEdit2 == 1) {// 新增1；修改2
			  var data = CloudUtils.convertStringJson('userInfoForm');
			  data = eval("(" + data + ")");
			  data.userInfoFormProportion = data.userInfoFormProportion ==""?0:data.userInfoFormProportion;
			  data.registeredCapital = data.registeredCapital ==""?0:data.registeredCapital;
			  data.registeredCapitalProportion = data.registeredCapitalProportion ==""?0:data.registeredCapitalProportion;
//				 先只在页面显示，不录入数据库
			 $("#userInfoTable").bootstrapTable('append', data);
		     } else if(isEdit2 == 2){
		    	 var data = CloudUtils.convertStringJson('userInfoFormInfoForm');
		    	$('#userInfoTable').bootstrapTable('updateRow', {index: userInfoFormIndex, row: JSON.parse(data)});
		     }
			$("#userInfoModal").modal("hide");
	 }
		}
 }
 
// 
 function initUserInfoTable(corpId){
	 $('#userInfoTable').bootstrapTable('destroy'); 
	 $("#userInfoTable").bootstrapTable({  
	         method: "post", 
	         url: "../../user/list", 
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
	            // var data = CloudUtils.convertStringJson('searchForm');
	            // var jsonData = eval("(" + data + ")");
	             var param = {    
		                 pageNumber: params.pageNumber,    
		                 pageSize: params.pageSize
		             }; 
				 if(corpId){
					 param.corpId = corpId            	 
	             } 
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
	         columns: [ {
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
	 	    },   {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="userInfoFormInfo" href="javascript:void(0)"></a>';
	 	        	var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" data-type="userInfoFormInfo" href="javascript:void(0)"></a>';
	 	           if(isEdit==3){
	 	            	return " ";
	 	            }else if(isEdit==2 || isEdit==1){
	 	            	return m+' '+r;
	 	            }   
	 	        
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
 }
 
// 添加附件信息
function attachInfoTable(corpId){
	 $('#attachInfoTable').bootstrapTable('destroy'); 
		$("#attachInfoTable").bootstrapTable({  
	         method: "post", 
	         url: "../../uploadFile/list", 
	         striped: false,  //表格显示条纹  
	         search: false,  //是否启用查询  
	         showColumns: false,  //显示下拉框勾选要显示的列  
	         showRefresh: false,  //显示刷新按钮  
	         sidePagination: "server", //表示服务端请求  
	         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	         //设置为limit可以获取limit, offset, search, sort, order  
	         queryParamsType : "undefined",   
	         queryParams: function queryParams(params) {   //设置查询参数  
//	             var data = CloudUtils.convertStringJson('searchForm');
//	             var jsonData = eval("(" + data + ")");
	             var param = {    
	                 pageNumber: params.pageNumber,    
	                 pageSize: params.pageSize
	             }; 
	             if(corpId){
					 param.corpId = corpId            	 
	             } 
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
	 	        field: 'filePath',
	 	        title: '附件地址',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
		 	}, {
	 	        field: 'fileTitle',
	 	        title: '附件名称',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 var s = '<a href="/../..'+row.filePath+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'fileType',
	 	        title: '附件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'fileSize',
	 	        title: '附件大小(KB)',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" data-type="attach" href="javascript:void(0)"></a>';
	 	        	//var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" data-type="userInfoFormInfo" href="javascript:void(0)"></a>';
	 	        	 if(isEdit==3){
		 	            	return " ";
		 	            }else if(isEdit==2) {
		 	           
		 	            return r;
		 	            } 
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
}

//文件上传部分
var uploadAttachment = function() {
	//document.getElementById("file").value = null;
	document.getElementById("file").click();
	$('#detailModal').modal({backdrop: 'static', keyboard: false});
}

function ajaxFileUpload(){
	var filePath = $("#file").val();
	var index = filePath.toLowerCase().lastIndexOf(".");
	var fileType = filePath.substring(index);
	var num = parseInt($("#num").val());
	if ($("#file").val().length > 0) {
		var fileSize = $("#file")[0].files[0].size;
		if(fileType != ".docx"&&fileType != ".doc"&&fileType != ".pdf"&&fileType!=".png"&&fileType!=".jpg"&&fileType !=".xls"&&fileType!=".xlsx"){
			bootbox.alert("支持文件格式：word、excel、pdf、png、jpg");
		}else if(fileSize >= 52428800){
			bootbox.alert("文件大小不得超过50M");
		}else if(num > 9){
			 bootbox.alert("上传文件不得超过10个");
		}else{
			$.ajaxFileUpload({  
		        url : '../../file/binUpload?pathId=3',  
		        secureuri : false,  
		        fileElementId : 'file',  
		        dataType : 'json',  
		        success : function(data, status) {  
		            if (data.result == 0) { 
		            	num++;
		            	$("#num").val(num);
	//	            	1.先添加进页面中
		            	var relData = {};
		            	relData.fileTitle = data.fileTitle;
		            	relData.fileSize = data.fileSize;
		            	relData.filePath = data.filePath;
		            	relData.fileType = data.fileType;
		            	$("#attachInfoTable").bootstrapTable('append', relData);
		                bootbox.alert("上传成功！");
		                
		            }else{
		            	bootbox.alert("上传失败！"); 
		            } 
		        },  
		        error : function(data, status, e) {  
		        	bootbox.alert(e);  
		        }  
		    });
		}
    }
    else {
    	bootbox.alert("请选择文件");
    }
	
}

function changeSysType(){
	var sysType = $("#sysType").val();
	if(sysType == 4){
		$("#agencyNumHidden").removeClass("hidden");
	}else{
		$("#agencyNumHidden").addClass("hidden");
	}
}

function HiddenformValidator(){
	$('#detailForm #agencyNumHidden').bootstrapValidator({
		message: 'This value is not valid',
 	      excluded: ':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
		fields: {
			agencyNum: {
				validators: {
 	    			notEmpty: {
	                      message: '经销商代码不能为空'
	                  }
 	    		}
			},
			maxCreditAmount: {
				validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '金额在0~1000000000之间(>0)',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>0&&parseFloat(value)<=1000000000);
	                         }  
	                     },
	                     notEmpty: {
		                      message: '请输入最高授信额度'
		                  }
	              }
			}
		}
	})
	.on('success.form.bv', function (e) {
			e.preventDefault();
		});
}

function formValidator(){
 	$('#detailForm').bootstrapValidator({
 	      message: 'This value is not valid',
 	      excluded: ':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
 	      fields: {
 	    	 corpName:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '企业名称不能为空'
	                  }
 	    		}
 	    	 },
 	    	legalPerson:{
 	    		validators: {
 	    			notEmpty: {
	                      message: '法定代表人不能为空'
	                  }
 	    		}
 	    	 },
 	    	 maxCreditAmount: {
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
 	    	regCap: {
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
	    	contactInfo: {
	              validators: {
	            	  notEmpty: {
	                      message: '手机号不能为空'
	                  },
			          stringLength: {
			              min: 11,
			              max: 11,
			              message: '手机号长度为11'
			          },
			          regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '手机号只能是数字'
	                  }
	              }
	          },
	          officeAddress:{
	        	  validators: {
	        		  notEmpty: {
	                      message: '地址不能为空'
	                  }
	        	  }
	          },
	          fixedPhone:{
	        	validators: {
	        		stringLength: {
			              max: 20,
			              message: '固定电话长度不能超过20'
			          }
	        	}
	          }
 	      }
 		})
 		.on('success.form.bv', function (e) {
 			e.preventDefault();
 		});	
 }

function userInfoFormFormValidator(){
 	$('#userInfoFormInfoForm').bootstrapValidator({
 	      message: 'This value is not valid',
 	      excluded:':disabled',
 	      feedbackIcons: {
 	          valid: 'glyphicon glyphicon-ok',
 	          invalid: 'glyphicon glyphicon-remove',
 	          validating: 'glyphicon glyphicon-refresh'
 	      },
 	      fields: {
 	    	 userInfoFormProportion: {
 	    		 validators: {
	    			  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '比例在0~100之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     } 
 	    		 }
 	    	 },
 	    	registeredCapital:{
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
 	    	registeredCapital:{
 	    		validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
		            	  message: '注册资本份额不得超过注册资本',  
	                       callback: function(value, validator) {
	                    	   var regCap = $("#regCap").val();
	                    	   var regCapFloat = parseFloat(regCap);
	                    	   return value =="" || (parseFloat(value) <=regCapFloat);
	                         }  
	                     } 
	              }
 	    	},
 	    	registeredCapitalProportion:{
 	    		validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
		            	  message: '比例在0~100之间',  
	                       callback: function(value, validator) { 
	                    	   return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     } 
	              }
 	    	}
 	      }
 		})
 		.on('success.form.bv', function (e) {
 			e.preventDefault();
 		});	
 }

function numFormat(){
 	$("#maxCreditAmount").number(true, 2);
 	$("#regCap").number(true, 2);
 	$("#userInfoFormProportion").number(true, 2);
 	$("#registeredCapital").number(true, 2);
 	$("#registeredCapitalProportion").number(true, 2);
 }

function cancle(){
//	取消
//	清缓存
	store.remove('custRow');
	history.go(-1);
}

function initTable() { 
	$('#userListTable').bootstrapTable('destroy');  
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../user/list", 
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
               username: jsonData.txt_realname,
               corpId: corpId,
               roleId: jsonData.txt_roleName == ""?null:jsonData.txt_roleName,
               mobilephone: jsonData.txt_mobilephone,
               roleType: jsonData.txt_sysType
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
        	 checkbox:true
         },{
 	        field: 'userId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	        field: 'roleType',
 	        title: '角色类型',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, 
 	    {
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
 	        field: 'email',
 	        title: '邮箱',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'roleType',
 	        title: '系统类型',
 	        align: 'center',
             valign: 'middle',
             visible: false
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
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	            var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            var d = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            //if(store.get('roleType')==1){
 	            	var r = '<a class = "fa fa-rotate-left reset" style="color:#278bdd;padding:0px 5px;" title="重置密码" href="javascript:void(0)"></a>';
 	            	return m+' '+d+' '+r;
 	          //  }
 	           // return m+' '+d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function  initDate(){
	var informDate = new Date();
	$('#informDate').val(dateFormat(informDate, 'yyyy-MM-dd'));
	var username = store.get("username");
	var userId = store.get("userId");
	$('#username').val(username);
	$('#userId').val(userId);
	$("input[name='informDate']").attr("disabled",true);
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