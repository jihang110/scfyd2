
$(document).ready(function() {
	initTable(); 
	formValidator();
	ajaxRelaCorps();
	$('#addModal').on('hidden.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
	});
	numFormat();
} );

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../litigantSituation/delete',
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
	$('#LitigantSituationTable').bootstrapTable('destroy');
	$("#LitigantSituationTable").bootstrapTable({  
         method: "post", 
         url: "../../litigantSituation/list", 
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
               corpId:'corp00001'
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
 	    },{
 	        field: 'corpId',
 	        title: '企业ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
 	    	field: 'litigantName',
 	        title: '诉讼方名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	    	field: 'litigantMoney',
 	        title: '诉讼金额',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'querySource',
 	        title: '查询来源',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="修改"  href="javascript:void(0)"></a>';
	            var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	            return s+' '+d;
	        },
 	        events: 'operateEvents'
 	    }]
       });  
	
}
 

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //添加1；修改2
    console.log($('#isEdit').val());
}

function modFun(row,isEdit) {
	$("#addModalLabel").text("修改");
	$('#isEdit').val(isEdit); //添加1;修改2
    $('#addModal').modal();
    var s = CloudUtils.setForm(row,'addForm');
}

function saveUser() {
	$("#addModalLabel").modal("hide");
    	var modal = $('#addModal');
		var data = CloudUtils.convertAllJson('addForm');
		var isEdit=$('#isEdit').val(); 
		if(isEdit){//添加1；修改2
			var options = {
					url :(isEdit==1)?"../../litigantSituation/add":"../../litigantSituation/mod",
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
	    	  litigantName : {
					validators : {
						notEmpty : {
							message : '诉讼方名称不能为空'
						}
					}
	    	  },
	    	  litigantMoney: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '诉讼金额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          querySource : {
					validators : {
						notEmpty : {
							message : '查询来源不能为空'
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

function numFormat(){
	$("#litigantMoney").number(true, 2);
}

function  ajaxRelaCorps(){
	let corpId = 'corp00001';
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