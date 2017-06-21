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
	var corpId = 'corp00001';
	var options = {
			url : '../../corp/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("select.corpId").append("<option value="+units.corpId+" selected>" + units.corpName + "</option>");
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

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../externalGuarantee/delete',
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

function initTable() { 
	$('#externalGuaranteeList').bootstrapTable('destroy');  
	$("#externalGuaranteeList").bootstrapTable({  
         method: "post", 
         url: "../../externalGuarantee/list", 
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
 	    } , {
 	        field: 'corpId',
 	        title: '企业ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'guarantorName',
 	        title: '被担保方名称',
 	        align: 'center',
            valign: 'middle'
 	    },  {
 	        field: 'guaranteeMoney',
 	        title: '担保金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
 	    }, {
 	        field: 'guaranteeType',
 	        title: '担保类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
               	if(value==0){
               		return "保证";
               	}else if(value==1){
               		return "抵押";
               	}else if(value==2){
               		return "质押";
               	}else if(value==3){
               		return "留置";
               	}else{
               		return "定金";
               	}
            }
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	         var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return m+' '+d;
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

function saveExternalGuarantee() {
	var modal = $('#addModal');
    modal.modal("hide");
	var data = CloudUtils.convertAllJson('addForm');
	var jsonData = eval("(" + data + ")");
	var isEdit =  $('#isEdit').val(); 
	if(isEdit){//新增1；修改2
		var options = {
				url : isEdit == 1 ? '../../externalGuarantee/add' : '../../externalGuarantee/mod',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					if(data.result==0){
						initTable();
						bootbox.alert(data.resultNote);
    				}else{
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
	          guaranteeMoney : {
	              validators: {
	            	  notEmpty: {
	                      message: '担保金额不能为空'
	                  },
	            	 numeric: {message: '只能输入数字'},
	            	 callback: {  
                         message: '账户金额在0-999999999.99之间',  
                         callback: function(value, validator) { 
                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
                         }  
                     } 
	              }
	          }, 
	         guarantorName : {
	                validators: {
	                     notEmpty: {
		                      message: '被担保方名称不能为空'
		                  },
		                  
	                }
	         }
	          
	      }
		}).on('success.form.bv', function (e) {
			e.preventDefault();
			saveExternalGuarantee();
			$(e.target).bootstrapValidator('resetForm', true);
		});	
}

function numFormat(){
	$('#guaranteeMoney').number(true, 2)
}