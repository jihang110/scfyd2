$(document).ready(function() {
	if (corpId) {
		initCorpInfoForm()
	};
	dataSearch();
	collapse("accordion1");
	collapse("accordion3");
	initSupplierBaseTable();
	formSupplierBaseValidator();
	$("#applyAmt").number(true, 2);
	$("#accountAmount").number(true, 2);
	$("#subscribedCapital").number(true, 2);
	$("#paidInCapital").number(true, 2);
	Buttonhidden();
	CloudUtils.inputCacheClear();
	NoOperation();
});

/*
 * 添加按钮的隐藏和显示
 */
function Buttonhidden(){
	if (corpId) {
		$(".new_hide .btn-link").removeClass('hidden');
	} else {
		$(".new_hide .btn-link").addClass('hidden');
	}
}

/*
 * 输入框变为不可操作
 */
function NoOperation(){
	if (corpId) {
		$('#corpName').attr('disabled',true);
		$('#coreCorpName').attr('disabled',true);
		$('#orgnCreditNum').attr('disabled',true);
		$('#orgnNum').attr('disabled',true);
		$('#coreCorpNameS').parents(".form-group").hide();
	}else{
		$('#coreCorpNameS').parents(".form-group").show();
	}
}

/*
 * 核心企业名改变的时候清空数据
 */
function changeName(){
	$('#coreCorpId').val("");
	$('#coreCorpName').val("");
	Buttonhidden();
}

function initCorpInfoForm() {
	var options = {
		url : '../../corp/list',
		data : JSON.stringify({'isPage': 0, 'corpId': corpId}),
		callBackFun : function(data) {
			if(data.result==0){
				if (data.dataList.length) {
					var list = data.dataList[0];
					//CloudUtils.setForm(list,"infoForm");
					$("#corpName").val(list.corpName);
					$("#businessLicense").val(list.businessLicense);
					$("#orgnCreditNum").val(list.orgnCreditNum);
					$("#orgnNum").val(list.orgnNum);
					$("#openAccountLicence").val(list.openAccountLicence);
					$("#applicantFixPhone").val(list.applicantFixPhone);
					$("#applicantName").val(list.applicantName);
					$("#applicantPhone").val(list.applicantPhone);
					$("#loanCardNo").val(list.loanCardNo);
					$("#applyAmt").val(list.applyAmt);
					$('#coreCorpId').val(list.coreCorpId);
					$('#coreCorpName').val(list.coreCorpName);
					$(".new_hide .btn-link").removeClass('hidden');
				}else{
					$('#infoForm input').val('');
					$(".new_hide .btn-link").addClass('hidden');
				}
			}
		},
		errorCallback:function(data){
			bootbox.alert("error");  
		}
	};               
	CloudUtils.ajax(options);
}

function saveBaseInfo(){
	var data = CloudUtils.convertStringJson('infoForm');
	data = eval("(" + data + ")");
	data['sysType'] = 5;
	data['corpId'] = corpId ? corpId : '';
	data = JSON.stringify(data);
	var options = {
		url : '../../corp/' + (corpId ? 'mod' : 'add'),
		data : data,
		callBackFun : function(data) {
			if(data.result==0){
				if (!corpId) {
					corpId = data.corpId
					$("#corpId").val(data.corpId);
				}
				initCorpInfoForm();
				bootbox.alert(data.resultNote);
				return true;
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

function dataSearch(){
	var url = "../../corp/enterpriselist";
	var data = {"corpId" :"", "sysType": 4};
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
	$('#coreCorpNameS').autocompleter({
        highlightMatches: true,
        source: jsonData,
        // show hint
        hint: false,
        empty: true,
        cashe: true,
        callback: function (value, index, selected) {
        	$('#coreCorpId').val(selected.corpId);
        	$('#coreCorpName').val(value);
        }
	});
}

function formSupplierBaseValidator(){
	formBaseInfoValidator();//基本信息校验
	formEnterpriseValidator();//关联企业校验
	formShareHolderValidator();//股东信息校验
	formCorpAccountValidator();//账户信息校验
}

function formBaseInfoValidator(){
	$('#infoForm').bootstrapValidator({
		  group: '.scf_valid',
	      message: 'This value is not valid',
	      excluded:':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  corpName: {
	              validators: {
	            	  notEmpty: {
	                      message: '供应商名称不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          coreCorpName: {
	              validators: {
	            	  notEmpty: {
	                      message: '核心企业名称不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          orgnCreditNum:{
	        	  validators: {
	        		  regexp: {
	                      regexp: /^[A-Za-z0-9]+$/,
	                      message: '只能输入英文和数字'
	                  }
	        	  }
	          },
	          openAccountLicence:{
	        	  validators: {
	        		  regexp: {
	                      regexp: /^[A-Za-z0-9]+$/,
	                      message: '只能输入英文和数字'
	                  }
	        	  }
	          },
	          orgnNum: {
	              validators: {
	            	  notEmpty: {
	                      message: '组织机构代码不能为空'
	                  },
	                  regexp: {
	                      regexp: /^([A-Z0-9]{8}-[A-Z0-9]{1})$/,
	                      message: '格式类似为: XXXXXXXX-X'
	                  }
	              }
	          },
	          businessLicense:{
	        	  validators: {
	        		  regexp: {
	                      regexp: /^[A-Za-z0-9]+$/,
	                      message: '只能输入英文和数字'
	                  }
	        	  }
	          },
	          applicantName: {
	              validators: {
	            	  notEmpty: {
	                      message: '申请人姓名不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          loanCardNo:{
	        	  validators: {
	        		  regexp: {
	                      regexp: /^[A-Za-z0-9]+$/,
	                      message: '只能输入英文和数字'
	                  }
	        	  }
	          },
	          applicantPhone: {
	              validators: {
	            	  notEmpty: {
	                      message: '申请人手机不能为空'
	                  },
	                  stringLength: {
			              min: 11,
			              max: 11,
			              message: '手机号长度为11'
			          },
			          regexp: {
	                      regexp: /^(1[3584]\d{9})$/,
	                      message: '请输入正确的手机号'
	                  }
	              }
	          },
	          applicantFixPhone: {
	              validators: {
	            	  notEmpty: {
	                      message: '申请人固定电话不能为空'
	                  },
	                  regexp: {
	                      regexp: /^(0\d{2,3}-\d{7,8})$/,
	                      message: '格式类似为: 0XXX-XXXXXXX'
	                  }
	              }
	          },
	          applyAmt: {
	              validators: {
	                  numeric: {
	            		  message: '申贷金额只能输入数字'
	            	  },
	            	  callback: {  
	                         message: '申贷金额在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
	                         }  
	                     } 
	              }
	          } 
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveBaseInfo();
		});
}

function formEnterpriseValidator(){
	$('#addModalFormEnterprise').bootstrapValidator({
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
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
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
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
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
	            	  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
	                  },
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
	          } 
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveInfoFun('Enterprise');
	        $(e.target).bootstrapValidator('resetForm', true);
		});	
}

function formShareHolderValidator(){
	$('#addModalFormShareHolder').bootstrapValidator({
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
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入英文和中文'
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
			saveInfoFun('ShareHolder');
			$(e.target).bootstrapValidator('resetForm', true);
		});
}

function formCorpAccountValidator(){
	$('#addModalFormCorpAccount').bootstrapValidator({
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
						regexp: {
		                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
		                      message: '只能输入英文和中文'
		                  },
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
						regexp: {
		                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
		                      message: '只能输入英文和中文'
		                  },
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
						regexp: {
		                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
		                      message: '只能输入英文和中文'
		                  },
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
			saveInfoFun('CorpAccount');
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function addInfoFun(type, num) {
	$('#addModal' +type + 'Label').text("添加");
    $('#addModal' + type).modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(num); //添加1；修改2
}

function modInfoFun(row, type, num) {
	$('#addModal' +type + 'Label').text("修改");
	CloudUtils.setForm(row, 'addModalForm' + type);
	$('#addModal' +type).modal({backdrop: 'static', keyboard: false});
	$('#isEdit').val(num); //添加1;修改2;
}

function saveInfoFun(type) {
	var data = CloudUtils.convertStringJson('addModalForm' + type);
	data = eval("(" + data + ")");
	data['corpId'] = corpId;
	data = JSON.stringify(data);
	var uri =  $('#isEdit').val() == 1 ? 'add' : 'mod', mUrl;
	switch(type) {
		case 'Enterprise': mUrl = '../../affiliatedEnterprise/' + uri;break;
		case 'ShareHolder': mUrl = '../../shareHolder/' + uri;break;
		case 'CorpAccount': mUrl = '../../corpAccount/' + uri;break;
	}
	$('#addModal' +type).modal("hide");
	var options = {
			url : mUrl,
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					eval('initTable' + type + '()');
					//initCorpInfoForm();
					$("#field").attr("disabled",true);
					bootbox.alert(data.resultNote);
					Buttonhidden();
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

function initSupplierBaseTable(){
	initTableEnterprise();//初始化关联企业信息表    data-type="a"
	initTableShareHolder();//初始化股东信息表         data-type="b"
	initTableCorpAccount();//初始化账户信息表         data-type="c"
}

window.operateEvents = {
	'click .modify': function (e, value, row, index) {
		modInfoFun(row, $(e.target).data('type'), 2);
	},
    'click .remove': function (e, value, row, index) {
    	var type = $(e.target).data('type'), mUrl, mData;
    	switch(type) {
	    	case 'Enterprise': mUrl = '../../affiliatedEnterprise/delete';mData = '{"recUid":"'+row.recUid+'"}';break;
	    	case 'ShareHolder': mUrl = '../../shareHolder/delete';mData = '{"shareHolderId":"'+row.shareHolderId+'"}';break;
	    	case 'CorpAccount': mUrl = '../../corpAccount/delete';mData = '{"recUid":"'+row.recUid+'"}';break;
    	}
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var options = {
					url : mUrl,
					data : mData,
					callBackFun : function(data) {
						if (data.result == 0) {
							eval('initTable' + type + '()');
							bootbox.alert(data.resultNote);
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

function initTableCorpAccount() { 
	$('#tableCorpAccount').bootstrapTable('destroy');  
	$("#tableCorpAccount").bootstrapTable({  
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
             valign: 'middle'
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
 	        	var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="CorpAccount" title="修改" href="javascript:void(0)"></a>';
	 	        var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="CorpAccount" title="删除" href="javascript:void(0)"></a>';
	 	        return m+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function initTableShareHolder() {
	$('#tableShareHolder').bootstrapTable('destroy');  
	$("#tableShareHolder").bootstrapTable({  
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
              		return "自然人";
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
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="ShareHolder" title="编辑"  href="javascript:void(0)"></a>';
	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="ShareHolder" title="删除" href="javascript:void(0)"></a>';
	            return  s+' '+r;
	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function initTableEnterprise() { 
	$('#tableEnterprise').bootstrapTable('destroy');  
	$("#tableEnterprise").bootstrapTable({  
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
 	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" data-type="Enterprise" title="编辑" href="javascript:void(0)"></a>';
 	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" data-type="Enterprise" title="删除" href="javascript:void(0)"></a>';
 	            return s+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}


function collapse(accordionId){
	$("#"+accordionId+" h4:gt(0)").append('<span class="fa fa-angle-down pull-right" aria-hidden="true"></span>');
	$("#"+accordionId+" div").on('show.bs.collapse', function () {
		$(this).prev().children("h4").children("span").removeClass('fa fa-angle-down pull-right');
		$(this).prev().children("h4").children("span").addClass('fa fa-angle-up pull-right');
	});
	$("#"+accordionId+" div").on('hide.bs.collapse', function () {
		$(this).prev().children("h4").children("span").removeClass('fa fa-angle-up pull-right');
		$(this).prev().children("h4").children("span").addClass('fa fa-angle-down pull-right');
	})

}