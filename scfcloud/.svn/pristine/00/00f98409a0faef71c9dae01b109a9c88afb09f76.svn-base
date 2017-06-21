$(document).ready(function() {
	initTable(); 
	ajaxRelaCorps();
	formValidator();
	
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		window.parent.scrollTo(0,0);
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
	});
	
	
	loadDate();
	numFormat();
} );

//加上当前默认时间
function loadDate(){
	$('#operYear').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
		minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		endDate:new Date() ,
		pickerPosition: "bottom-left",
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
	            			
	    					url : '../../taxReturns/delete',
	    					data : '{"vatId":"'+row.vatId+'"}',
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
	$('#taxReturnsList').bootstrapTable('destroy');
	$("#taxReturnsList").bootstrapTable({  
         method: "post", 
         url: "../../taxReturns/list", 
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
 	        field: 'vatId',
 	        title: '主键',
 	        align: 'center',
 	        valign: 'middle',
 	        visible:false
 	    },{
 	        field: 'corpId',
 	        title: '企业所属id',
 	        align: 'center',
 	        valign: 'middle',
 	        visible:false
 	    },{
 	        field: 'operYear',
 	        title: '年度',
 	        align: 'center',
 	        valign: 'middle',
 	        formatter:function(value,row,index){
       		if(row.operYear!=null&&row.operYear!=''){
       			return dateFormat(row.operYear, 'yyyy')
       		}
	        }
 	    },{
 	        field: 'purchasesTax',
 	        title: '进项税额',
 	        align: 'center',
 	        valign: 'middle'
 	    },{
 	        field: 'salesTax',
 	        title: '销项税额',
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
 

function addFun(/*row,isEdit*/) {	
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //添加1；修改2
   /* CloudUtils.setForm(row,'addForm');
    $("#loanDate").val( dateFormat(row.loanDate, 'yyyy-MM-dd'));
    $("#dueDate").val( dateFormat(row.dueDate, 'yyyy-MM-dd'));*/
    
}

function modFun(row,isEdit) {
	$("#addModalLabel").text("修改");
	$('#isEdit').val(isEdit); //添加1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row,'addForm');
    $("#operYear").val( dateFormat(row.loanDate, 'yyyy'));
   
}

function saveUser() {
	
	/*$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{*/
    	var modal = $('#addModal');
		var data = CloudUtils.convertAllJson('addForm');
		var isEdit=$('#isEdit').val(); 
		if(isEdit == 1){//添加1；修改2
			var options = {
					url :"../../taxReturns/add",
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
		}else{
			var options = {
					url :"../../taxReturns/mod",
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
//}


function  ajaxRelaCorps(){
	let corpId = 'corp00001';
	var options = {
			url : '../../corp/list',
			data : '{"corpId":"'+corpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#corpId").append("<option value="+units.corpId +">"+ units.corpName + "</option>");
					}); 
					$("#corpId").selectOrDie();
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


//form验证规则
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
	    	  purchasesTax: {
	              validators: {
	            	  notEmpty : {
							message : '进项税额不能为空'
	            	  },
	              }
	          }, 
	          salesTax: {
	              validators: {
	            	  notEmpty : {
							message : '销项税额不能为空'
	            	  },
	              }
	          },
	         
	        },
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			saveUser();
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
	$("#purchasesTax").number(true, 2);
	$("#salesTax").number(true, 2);
	
}