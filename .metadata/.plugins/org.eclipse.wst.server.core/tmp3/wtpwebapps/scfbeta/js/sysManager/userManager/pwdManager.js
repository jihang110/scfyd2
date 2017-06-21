$(document).ready(function() {
	CloudUtils.inputCacheClear();
	$("#userId").val(store.get('userId'));
	formValidator();
});

function pwdSubmit() {
	var data = CloudUtils.convertStringJson('pwdModify');
	
	$.ajax({
		url:'../../user/updatePassword',
		contentType: "application/json",
		type: 'post',
		cache:false,
		async: false,
		dataType:'json',
		timeout: 5000,
		data: data,
		error: function(ret){bootbox.alert("error");},
		success: function(data){
			if(data.result==0){
				bootbox.alert("密码修改成功！");
				$('input').val("");
			}else{
				bootbox.alert("原密码错误！");
				$('input').val("");
				return false;
			}
		}
	});
}

//form验证规则
function formValidator(){
	$('#pwdModify').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  oldPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '请输入原密码'
	                  }
	              }
	          },
	          newPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '新密码不能为空'
	                  },
	                  different: {
	                      field: 'oldPassword',
	                      message: '新密码不能和原密码相同'
	                  }
	              }
	          },
	          confirmPassword: {
	              validators: {
	                  notEmpty: {
	                      message: '密码确认不能为空'
	                  },
	                  identical: {
	                      field: 'newPassword',
	                      message: '两次输入密码不一致'
	                  },
	                  different: {
	                      field: 'oldPassword',
	                      message: '密码不能和原密码相同'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			pwdSubmit();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}


