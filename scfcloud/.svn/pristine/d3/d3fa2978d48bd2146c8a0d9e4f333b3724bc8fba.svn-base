$(function(){
	initTable();
	initTable2();
	initAttachment();
	getTab();
})

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				bootbox.alert("修改")	
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	bootbox.alert("删除")	
	            } 
	    	 });
	    },
		'click .removeAttachment':function(e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../uploadFile/delete',
	    					data : '{"fileId":"'+row.fileId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initAttachment();
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
var data = [{"balance":123123,
			"accountAndSettlement":123,
			"firstHalfTransaction":213,
			"totalAnnualPurchases":11,
			"financialPhone":"1234566778"}];
function initTable() { 
	$('#supplierTradeList').bootstrapTable('destroy');  
	$("#supplierTradeList").bootstrapTable({  
         method: "post", 
         //url: "../../supplierTrade/list", 
         data:data,
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId
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
 	        field: 'balance',
 	        title: '余额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'accountAndSettlement',
 	        title: '账期和结算方式',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'firstHalfTransaction',
 	        title: '上半年交易额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'totalAnnualPurchases',
 	        title: '占全年总采购额(%)',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'financialPhone',
 	        title: '供应商财务电话',
 	        align: 'center',
             valign: 'middle'
 	    },{
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

function initTable2() { 
	$('#riskAnalyList').bootstrapTable('destroy');  
	$("#riskAnalyList").bootstrapTable({  
         method: "post", 
         //url: "../../supplierTrade/list", 
         data:data,
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId
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
 	        field: 'balance',
 	        title: '余额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'accountAndSettlement',
 	        title: '账期和结算方式',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'firstHalfTransaction',
 	        title: '上半年交易额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'totalAnnualPurchases',
 	        title: '占全年总采购额(%)',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'financialPhone',
 	        title: '供应商财务电话',
 	        align: 'center',
             valign: 'middle'
 	    }]
       });  
}
//初始化附件表格
function initAttachment(){
	$('#showAttachment').bootstrapTable('destroy');  
	$("#showAttachment").bootstrapTable({  
         method: "post", 
         url: "../../uploadFile/list",
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
        	   sysType:2,
               corpId:"corp00001"
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
 	        field: 'fileName',
 	        title: '上传文件名',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	var m = '<a href="'+"../../"+row.fileUrl+'" download="'+row.fileName+'">'+row.fileName+'</a>';
 	            return m;
 	        }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
           width:'120',
 	        formatter:function(value,row,index){
 		 	    var d = '<a class = "fa fa-trash-o removeAttachment" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}
//点击页面中的隐藏file
function fileSelect() {
	document.getElementById("file").value = null;
    document.getElementById("file").click(); 
}
function uploadAttachment(){
	fileSelect();
}

function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({  
	        url : '../../file/attachmentUpload?corpId=corp00001&moduleType=1',  
	        secureuri : false,  
	        fileElementId : 'file',  
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
	            	var path=data.fileUrl;
	            	var filename;
	            	if(path.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
	            	{
	            	    filename=path.substring(path.lastIndexOf("/")+1,path.length);
	            	}
	            	else
	            	{
	            	    filename=path;
	            	}
	            	initAttachment();
	            }else{
	            	bootbox.alert("上传失败！"); 
	            } 
	        },  
	        error : function(data, status, e) {  
	        	bootbox.alert(e);  
	        }  
	    });  
    }
    else {
    	bootbox.alert("请选择附件");
    }
	
}
function clickTag2(){
		initTable3();
		initTable4();
}

function initTable3() { 
	$('#riskAnalyList1').bootstrapTable('destroy');  
	$("#riskAnalyList1").bootstrapTable({  
         method: "post", 
         //url: "../../supplierTrade/list", 
         data:data,
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId
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
 	        field: 'balance',
 	        title: '余额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'accountAndSettlement',
 	        title: '账期和结算方式',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'firstHalfTransaction',
 	        title: '上半年交易额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'totalAnnualPurchases',
 	        title: '占全年总采购额(%)',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'financialPhone',
 	        title: '供应商财务电话',
 	        align: 'center',
             valign: 'middle'
 	    }]
       });  
}

function initTable4() { 
	$('#supplierTradeList1').bootstrapTable('destroy');  
	$("#supplierTradeList1").bootstrapTable({  
         method: "post", 
         //url: "../../supplierTrade/list", 
         data:data,
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId
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
 	        field: 'balance',
 	        title: '余额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'accountAndSettlement',
 	        title: '账期和结算方式',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'firstHalfTransaction',
 	        title: '上半年交易额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'totalAnnualPurchases',
 	        title: '占全年总采购额(%)',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'financialPhone',
 	        title: '供应商财务电话',
 	        align: 'center',
             valign: 'middle'
 	    }]
       });  
}
function getTab(){
	$.ajax({
		  url: "../../bpm/flowManager/test.html",
		  async:false,
		  type:'post',
		  dataType:'html',
		  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		  success:function(data) {
			  $("#panel-479249").html(data);
		     }
		  });
}