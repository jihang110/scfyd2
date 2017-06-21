$(function(){
	if (corpId) initCorpInfoForm();
	initSupplierTable();
	Buttonhidden();
	formSupplierValidator();
	CloudUtils.inputCacheClear();
	NoOperation();
	supplierNumHidden();
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

function supplierNumHidden(){
	if (corpId) {
		$("#dis").css('display','block');
	}else{
		$("#dis").css('display','none');
	}
}

/*
 * 输入框变为不可操作
 */
function NoOperation(){
	if (corpId) {
		$('#corpName').attr('disabled',true);
		$('#orgnCreditNum').attr('disabled',true);
		$('#orgnNum').attr('disabled',true);
	} 
}

function initCorpInfoForm(){
	var options = {
		url : '../../corp/list',
		data : JSON.stringify({'isPage': 0, 'corpId': corpId}),
		callBackFun : function(data) {
			if(data.result==0){
				if (data.dataList.length) {
					var list = data.dataList[0];
					$("#corpName").val(list.corpName);
					$("#businessLicense").val(list.businessLicense);
					$("#orgnCreditNum").val(list.orgnCreditNum);
					$("#orgnNum").val(list.orgnNum);
					$("#openAccountLicence").val(list.openAccountLicence);
					$("#fixedPhone").val(list.fixedPhone);
					$("#applicantName").val(list.applicantName);
					$("#supplierNum").val(list.supplierNum);
					$("#applicantPhone").val(list.applicantPhone);
					$(".new_hide .btn-link").removeClass('hidden');
				}else{
					$('#infoForm input').val('');
					$("#supplierNum").val(0);
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


function saveBaseInfoFun(){
	var data = CloudUtils.convertStringJson('infoForm');
	data = eval("(" + data + ")");
	data['sysType'] = 4;
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
				$("#field").attr("disabled",true);
				bootbox.alert(data.resultNote);
				Buttonhidden();
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

function initSupplierTable() {
	$('#supplierInfoList').bootstrapTable('destroy');
	$("#supplierInfoList").bootstrapTable({
		method : "post",
		url : "../../corp/supplierlist",
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 5, 10, 15, 20, 25 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : false, //显示下拉框勾选要显示的列  
		showRefresh : false, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				pageNumber : params.pageNumber,
				pageSize : params.pageSize,
				isPage: 1,
				sysType: 5,
				corpId: corpId ? corpId : 0
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
				field : 'corpId',
				title : 'Item ID',
				align : 'center',
				valign : 'middle',
				visible : false
			},
			{
				field : 'orgnNum',
				title : '组织机构代码',
				align : 'center',
				valign : 'middle'
			},{
				field : 'corpName',
				title : '供应商名称',
				align : 'center',
				valign : 'middle'
			}
		]
	});
}

function formSupplierValidator(){
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
	                      message: '核心企业名称不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入中文或英文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          orgnCreditNum: {
	        	  validators: {
		                  regexp: {
		                      regexp: /^[A-Za-z0-9]*$/,
		                      message: '只能为数字或英文'
		                  }
	              }
	          },
	          openAccountLicence: {
	        	  validators: {
		                  regexp: {
		                      regexp: /^[A-Za-z0-9]*$/,
		                      message: '只能为数字或英文'
		                  }
	              }
	          },
	          businessLicense: {
	        	  validators: {
		                  regexp: {
		                      regexp: /^[A-Za-z0-9]*$/,
		                      message: '只能为数字或英文'
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
	          fixedPhone: {
	              validators: {
	            	  notEmpty: {
	                      message: '联系人固定电话不能为空'
	                  },
	                  regexp: {
	                      regexp: /^(0\d{2,3}-\d{7,8})$/,
	                      message: '格式类似为: 0XXX-XXXXXXX'
	                  }
	              }
	          },
	          applicantName: {
	              validators: {
	            	  notEmpty: {
	                      message: '联系人姓名不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[A-Za-z\u4e00-\u9fa5]+$/,
	                      message: '只能输入中文或英文'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          /*supplierNum: {
	              validators: {
	            	  notEmpty: {
	                      message: '供应商数量不能为空'
	                  },
	                  numeric: {
	                	  message: '只能输入数字'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },*/
	          applicantPhone: {
	              validators: {
	            	  notEmpty: {
	                      message: '联系人手机不能为空'
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
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveBaseInfoFun();
		});
}