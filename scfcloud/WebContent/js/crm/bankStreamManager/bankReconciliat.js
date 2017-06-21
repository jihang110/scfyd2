$(document).ready(function() {
	initTable();
	loadStartDate();
	loadEndDate();
	formValidator();
	ajaxRelaCorps();
	numFormat();
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
		window.parent.scrollTo(0,0);
	});
});

function addFun() {
	var now = new Date();
	$('#startDate').val(dateFormat(now, 'yyyy-MM-dd'));
	$('#createTime').val(dateFormat(now, 'yyyy-MM-dd'));
	$('#endDate').val(dateFormat(now.setDate(now.getDate()+30), 'yyyy-MM-dd'));
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}
function modFun(row,isEdit) {
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#isEdit').val(2); //新增1;修改2;详情0
    CloudUtils.setForm(row,'addForm');
    if(row.startDate!=null&&row.startDate!=''){
    	$("#startDate").val( dateFormat(row.startDate, 'yyyy-MM-dd'));
    }
    if(row.endDate!=null&&row.endDate!=''){
    	$("#endDate").val( dateFormat(row.endDate, 'yyyy-MM-dd'));
    }
}

function saveBankRec(){
	$('#addModal').modal('hide');
	var data = CloudUtils.convertAllJson('addForm');
	data = eval("(" + data + ")");
	data = JSON.stringify(data);
	var isEdit =  $('#isEdit').val(); 
	var options = {
			url : isEdit == 1?'../../bankRec/add':'../../bankRec/mod',
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

function loadStartDate(){
	$('#startDate').datetimepicker({
	language: 'zh-CN',
	autoclose: true,
	todayHighlight: true,
	format: 'yyyy-mm-dd',
	minView:'month',
	todayBtn: true,
	initialDate : new Date() ,
	pickerPosition: "bottom-left"
	});
}

function loadEndDate(){
	$('#endDate').datetimepicker({
	language: 'zh-CN',
	autoclose: true,
	todayHighlight: true,
	format: 'yyyy-mm-dd',
	minView:'month',
	todayBtn: true,
	initialDate : new Date() ,
	pickerPosition: "bottom-left"
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
	    					url : '../../bankRec/delete',
	    					data : '{"recId":"'+row.recId+'"}',
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
	$('#bankRecListTable').bootstrapTable('destroy');  
	$('#bankRecListTable').bootstrapTable({  
         method: "post", 
         url: "../../bankRec/list", 
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
 	        field: 'recId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	    	field: 'corpId',
	        title: 'Item ID',
	        align: 'center',
	        valign: 'middle',
	        visible: false
	       },{
 	        field: 'accountBank',
 	        title: '开户行',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'accountName',
 	        title: '户名',
 	        align: 'center',
            valign: 'middle',
 	    }, {
 	        field: 'account',
 	        title: '账号',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	    	field:'currency',
 	    	title:'币种',
 	    	align:'center',
 	    	valign:'middle',
 	    }, {
 	        field: 'startDate',
 	        title: '起始日',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.startDate!=null&&row.startDate!=''){
        			return dateFormat(row.startDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'endDate',
 	        title: '到期日',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.endDate!=null&&row.endDate!=''){
        			return dateFormat(row.endDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'debitAmount',
 	        title: '借方发生金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    }, {
 	        field: 'creditAmount',
 	        title: '贷方发生金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    },{
 	    	field: 'accountAmount',
 	        title: '金额(汇总)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
            }
 	    },{
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


function  ajaxRelaCorps(){
	let corpId = 'corp00001';
	var options = {
			url : '../../corp/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#corpId');
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            });
	            control1.selectOrDie();
			},
			errorCallback:function(data){
				 alert("error");  
			}
	};
	CloudUtils.ajax(options);
}


//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: 'disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  accountBank: {
	              validators: {
	                  notEmpty: {
	                      message: '开户行不能为空'
	                  }
	              }
	          },
	          accountName: {
	              validators: {
	                  notEmpty: {
	                      message: '户名不能为空'
	                  }
	              }
	          },
	          account: {
	              validators: {
	                  notEmpty: {
	                      message: '账号不能为空'
	                  },numeric: {
	            		  message: '只能输入数字'
	            	  }, stringLength: {
	            		  min:18,
	            		  max:18,
	                      message: '长度为18'
	                  },regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  }
	              }
	          },
	          debitAmount: {
	              validators: {
	            	  numeric: {
	            		  message: '借方发生金额只能输入数字'
	            	  },
	                  regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	                  callback: {  
	                         message: '在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          creditAmount: {
	              validators: {
	            	  numeric: {
	            		  message: '贷方发生金额只能输入数字'
	            	  },
	                  regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	            	  callback: {  
	                         message: '注册资本在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
	                         }  
	                     }
	              }
	          }
	      }
	}).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        saveBankRec();
        $(e.target).bootstrapValidator('resetForm', true);
		});
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
function numFormat(){
	$("#debitAmount").number(true, 2);
	$("#creditAmount").number(true, 2);
}