$(document).ready(function() {
	initCorpTable();
	initShareTable();
	ajaxRelaCorps();
	ajaxRelaShares();
	ajaxRelaEnterprise();
	//modal绑定事件
	//version 2.0
	$('.modal').on('hidden.bs.modal', function(){
		$('form').each(function() {
				$(this).bootstrapValidator("resetForm", true);
				this.reset();
				window.parent.scrollTo(0,0);
		});
		$('#relaEnterpriseId').selectOrDie("destroy");
		$("#relaEnterpriseId").selectOrDie({
	        placeholder: '无'
	    });
		$('#shareHolderId').selectOrDie("destroy");
		$("#shareHolderId").selectOrDie({
	        //placeholder: '股东名称'	
	    });
	});
	formValidator();
	$('input.time').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		endDate:new Date() ,
		pickerPosition: "bottom-left"
	});
});

window.corpOperateEvents = {
		'click .modify': function (e, value, row, index) {
				corpModFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	            			url : '../../creditReport/delete',
	    					data : '{"creditId":"'+row.creditId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initCorpTable(); 
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

window.shareOperateEvents = {
		'click .modify': function (e, value, row, index) {
				shareModFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	            			url : '../../creditReport/delete',
	    					data : '{"creditId":"'+row.creditId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initShareTable();
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

function initCorpTable() { 
	$('#corpListTable').bootstrapTable('destroy');  
	$("#corpListTable").bootstrapTable({  
         method: "post", 
         url: "../../creditReport/list", 
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
           var data = CloudUtils.convertStringJson('corpSearchForm');
           var jsonData = eval("(" + data + ")");
           var corpId = store.get('corpId');
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpName: jsonData.s_corpName,
               creditType: 0,
               corpId: corpId
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
 	        field: 'creditId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.enterpriseName!=null&&row.enterpriseName!=''){
        			return row.enterpriseName
        		}else {
					return row.corpName
				}
 	        }
 	    }, {
 	        field: 'inquiryTime',
 	        title: '查询时间',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.inquiryTime!=null&&row.inquiryTime!=''){
        			return dateFormat(row.inquiryTime, 'yyyy-MM-dd')
        		}
 	        }
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
 	        events: 'corpOperateEvents'
 	    }]
       });  
}

function initShareTable() { 
	$('#shareHolderListTable').bootstrapTable('destroy');  
	$("#shareHolderListTable").bootstrapTable({  
         method: "post", 
         url: "../../creditReport/list", 
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
           var data = CloudUtils.convertStringJson('shareSearchForm');
           var jsonData = eval("(" + data + ")");
           var corpId = store.get('corpId');
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               shareName: jsonData.s_shareName,
               creditType: 1,
               corpId: corpId,
               shareHolderId:jsonData.s_shareHolderId ==""?null:jsonData.s_shareHolderId
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
 	        field: 'creditId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'shareName',
 	        title: '查询人名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'inquiryTime',
 	        title: '查询时间',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.inquiryTime!=null&&row.inquiryTime!=''){
        			return dateFormat(row.inquiryTime, 'yyyy-MM-dd')
        		}
 	        }
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	        	//var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	            return s+' '+r;
	        },
 	        events: 'shareOperateEvents'
 	    }]
       });  
}

function corpAddFun() {
	$("#corpId").attr("disabled",false);
	$("#corp_btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#corpAddModalLabel").text("添加");
	ajaxRelaEnterprise();
    $('#corpAddModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#corpIsEdit').val(1); //添加1；修改2
}
function shareAddFun() {
	 $('#shareHolderId').selectOrDie("destroy");
	$("#shareHolderId").attr("disabled",false);
	$('#shareHolderId').selectOrDie("update");
	$("#share_btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#shareAddModalLabel").text("添加");
	ajaxRelaShares();
    $('#shareAddModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#shareIsEdit').val(1); //添加1；修改2
}

function corpModFun(row,isEdit) {
	$("#corp_btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==2){
		$("#corpId").attr("disabled",true);
		$('#corpId').selectOrDie("destroy");
		$('#corpId').selectOrDie("update");
		$("#corpAddModalLabel").text("修改");
		$('#relaEnterpriseId').selectOrDie("destroy");
		$("#relaEnterpriseId option[value=" + row.relaEnterpriseId+ "]").attr('selected', 'selected');
		$('#relaEnterpriseId').selectOrDie("update");
	}
	$('#corpIsEdit').val(isEdit); //添加1;修改2;详情0
    $('#corpAddModal').modal();
    CloudUtils.setForm(row,'corpAddForm');
    if(row.ratingTime!=null&&row.ratingTime!=''){
    	$("#corpRatingTime").val( dateFormat(row.ratingTime, 'yyyy-MM-dd'));
    }
    if(row.inquiryTime!=null&&row.inquiryTime!=''){
    	$("#corpInquiryTime").val( dateFormat(row.inquiryTime, 'yyyy-MM-dd'));
    }
}

function shareModFun(row,isEdit) {
	$("#share_btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    
	if(isEdit==2){
		$("#shareHolderId").attr("disabled",true);
		$("#shareAddModalLabel").text("修改");
		$('#shareHolderId').selectOrDie("destroy");
		$("#shareHolderId option[value=" + row.shareHolderId + "]").attr('selected', 'selected');
	    $('#shareHolderId').selectOrDie("update");
	}	
	$('#shareIsEdit').val(isEdit); //添加1;修改2;详情0
    $('#shareAddModal').modal();
    CloudUtils.setForm(row,'shareAddForm');
    
    if(row.ratingTime!=null&&row.ratingTime!=''){
    	$("#shareRatingTime").val( dateFormat(row.ratingTime, 'yyyy-MM-dd'));
    }
    if(row.inquiryTime!=null&&row.inquiryTime!=''){
    	$("#shareInquiryTime").val( dateFormat(row.inquiryTime, 'yyyy-MM-dd'));
    }
}

function corpSaveUser() {
		$('#corpAddModal').modal('hide');
		var modal = $('#corpAddModal');
		var data = CloudUtils.convertAllJson('corpAddForm');
		var isEdit =  $('#corpIsEdit').val(); 
		if(isEdit){//新增1；修改2
			var options = {
					url : isEdit==1?'../../creditReport/add':'../../creditReport/mod',
					data : data,
					callBackFun : function(data) {
						
						if(data.result==0){
							initCorpTable();
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
		
		
 
}

function shareSaveUser() {
	    
	    $('#shareAddModal').modal('hide');
		var modal = $('#shareAddModal');
		var data = CloudUtils.convertAllJson('shareAddForm');
		console.log()
		var isEdit =  $('#shareIsEdit').val(); 
		if(isEdit){//新增1；修改2
			var options = {
					url : isEdit==1?'../../creditReport/add':'../../creditReport/mod',
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							initShareTable();
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
		
    
}


function  ajaxRelaCorps(){
	var corpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$("#shareCorpId").html('');
				
					$.each(data.dataList, function (index, units) {
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#shareCorpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						
					});
					//$("#corpId").selectOrDie({});
					//$("#shareCorpId").selectOrDie({});
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

function  ajaxRelaShares(){
	var corpId = store.get('corpId');
	var options = {
			url : '../../shareHolder/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#shareHolderId").html('');
					$.each(data.dataList, function (index, units) {
						$("#shareHolderId").append("<option value="+units.shareHolderId+">" + units.shareName + "</option>");  
					});
					$("#shareHolderId").selectOrDie({
				        //placeholder: '股东名称'   
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

function  ajaxRelaEnterprise(){
	var corpId = store.get('corpId');
	var options = {
			url : '../../affiliatedEnterprise/list',
			data : '{"corpId":"'+corpId+'","creditType": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#relaEnterpriseId").html('');
					$("#relaEnterpriseId").append("<option value=''></option>");
					$.each(data.dataList, function (index, units) {
						if(units.recUid!=null&&units.recUid!=''){
							$("#relaEnterpriseId").append("<option value="+units.recUid+">" + units.enterpriseName + "</option>");
		        		}
					});
					$("#relaEnterpriseId").selectOrDie({
				        placeholder: '无'				        
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

//form验证规则
function formValidator() {
	$('#corpAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  corpId: {
	              validators: {
	                  notEmpty: {
	                      message: '所属企业不能为空'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			corpSaveUser();
			$(e.target).bootstrapValidator('resetForm', true);

		});

	$('#shareAddForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  shareHolderId: {
	              validators: {
	                  notEmpty: {
	                      message: '股东姓名不能为空'
	                  }
	              }
	          }
	      	  
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			shareSaveUser();
			$(e.target).bootstrapValidator('resetForm', true);

		});
}
