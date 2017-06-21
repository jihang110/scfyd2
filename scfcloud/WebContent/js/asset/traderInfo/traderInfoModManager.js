var corpId = "";
$(function(){
	$('#traderInfoMod').on('hidden.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#traderInfoMod").bootstrapValidator('resetForm', true);
		$("#traderInfoMod")[0].reset();
	});
	
	var url = window.location.search.substr(1);
	var reg = "=";
	corpId = url.split(reg)[1];
	if(corpId){
		dataShow(corpId);
	}
	formValidator();
	CloudUtils.inputCacheClear();
});

function dataShow(corpId){
	var data = {"corpId":corpId};
	var url = "../../corp/list";
	var options = {
		url : url,
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if(data.result==0){
				CloudUtils.setForm(data.dataList[0],"traderInfoMod");
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

function modTraderInfo(){
	var data = CloudUtils.convertStringJson('traderInfoMod');
	data = eval("(" + data + ")");
	data['sysType'] = 3;
	data['corpId'] = corpId;
	data = JSON.stringify(data);
	var options = {
			url : '../../corp/'+(corpId ? 'mod':'add'),
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					 bootbox.alert(data.resultNote,function(){
						window.location.href = '../../asset/traderInfo/traderInfoManager.html';
					});
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

//form验证规则
function formValidator(){
	$('#traderInfoMod').bootstrapValidator({
		  group: '.scf_valid',
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  corpName: {
	              validators: {
	            	  notEmpty: {
	                      message: '券商名称不能为空'
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
	          applicantName: {
	              validators: {
	            	  notEmpty: {
	                      message: '联系人不能为空'
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
	          applicantPhone: {
	              validators: {
	            	  notEmpty: {
	                      message: '移动电话不能为空'
	                  },
	                  stringLength: {
	                      min: 11,
	                      max: 11,
	                      message: '长度为11位'
	                  },
	                  numeric: {
	            		  message: '移动电话只能输入数字'
	            	  }
	              }
	          },
	          job: {
	              validators: {
	            	  notEmpty: {
	                      message: '职务不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 16,
	                      message: '长度为1-16'
	                  }
	              }
	          },
	          email: {
	              validators: {
	            	  notEmpty: {
	                      message: '电子邮箱不能为空'
	                  },
	                  regexp: {
	                      regexp: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
	                      message: '电子邮箱格式不正确'
	                  }
	              }
	          },
	          regAddress: {
	              validators: {
	            	  notEmpty: {
	                      message: '联系地址不能为空'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			modTraderInfo();
		});	
}