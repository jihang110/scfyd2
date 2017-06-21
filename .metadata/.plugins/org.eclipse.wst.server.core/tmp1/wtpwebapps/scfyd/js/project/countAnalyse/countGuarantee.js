$(function(){
	CloudUtils.getMenuNames("nav");
	initTable();
	loadDate2();
	chooseDateType();
});
function initTable(){
	$('#countGuaranteeTable').bootstrapTable('destroy');  
	$("#countGuaranteeTable").bootstrapTable({  
         method: "post", 
         url: "../../CountAnalyse/guaranteeInfo", 
         striped: true,  //表格显示条纹  
         //pagination: true, //启动分页  
         //pageSize: 5,  //每页显示的记录数  
         //pageNumber:1, //当前第几页  
         //pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
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
           /*var param = {    
        		   agencyCorpName :jsonData.txt_agencyCorpName
           };  */
//         判断时间，补全时间
           var guaranteePayStartDate = jsonData.guaranteePayStartDate;
           var guaranteePayEndDate = jsonData.guaranteePayEndDate;
           if((guaranteePayStartDate.split("-").length == 1&&guaranteePayEndDate.split("-").length==1)&&(guaranteePayStartDate!=""&&guaranteePayEndDate!="")){
        	   guaranteePayStartDate = guaranteePayStartDate +"-01-01";
        	   guaranteePayEndDate = guaranteePayEndDate +"-12-31";
           }else if(guaranteePayStartDate.split("-").length == 2&&guaranteePayEndDate.split("-").length==2){
        	   guaranteePayStartDate = guaranteePayStartDate +"-01";
        	   guaranteePayEndDate = guaranteePayEndDate +"-31";
           }
           var param = {    
        		   agencyCorpName :jsonData.txt_agencyCorpName,
        		   guaranteePayStartDate:guaranteePayStartDate,
        		   guaranteePayEndDate:guaranteePayEndDate
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
        		 showChart(res);
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
	 	        field: 'agencyCorpName',
	 	        title: '客户名称',
	 	        align: 'center',
			            valign: 'middle'
			 	},{
	 	        field: 'agencyOrgnNum',
	 	        title: '组织机构代码证号',
	 	        align: 'center',
			            valign: 'middle'
			 	},{
	 	        field: 'payAbleGuarantee',
	 	        title: '总计应缴保证金金额',
	 	        align: 'center',
			    valign: 'middle'
			 	},{
		 	        field: 'payActGuarantee',
		 	        title: '总计实缴保证金金额',
		 	        align: 'center',
		            valign: 'middle'
		 	    },{
		 	        field: 'notPayGuarantee',
		 	        title: '总计未缴保证金金额',
		 	        align: 'center',
		            valign: 'middle'
		 	    },{
		 	        field: 'guaranteeBalance',
		 	        title: '总计剩余保证金金额',
		 	        align: 'center',
		            valign: 'middle'
		 	    },]
       });  
}

function showChart(data){
	 var myChart = echarts.init(document.getElementById('echart'));
	 var payAbleGuaranteeTotal = 0;
	 var payActGuaranteeTotal = 0;
	 var notPayGuaranteeTotal = 0;
	 var guaranteeBalanceTotal = 0;
	 $.each(data.dataList, function(index, value) {
		 payAbleGuaranteeTotal += value.payAbleGuarantee;
		 payActGuaranteeTotal += value.payActGuarantee;
		 notPayGuaranteeTotal += value.notPayGuarantee;
		 guaranteeBalanceTotal += value.guaranteeBalance;
		});
     // 指定图表的配置项和数据
     var option = {
        tooltip: {
     trigger: 'item',
     formatter: "{a} <br/>{b}: {c} ({d}%)"
 },
 legend: {
     orient: 'vertical',
     x: 'left',
     data:['总计应缴保证金金额','总计实缴保证金金额','总计未缴保证金金额','总计剩余保证金金额']
 },
 series: [
     {
         name:'访问来源',
         type:'pie',
         selectedMode: 'single',
         radius: [0, '30%'],

         label: {
             normal: {
                 position: 'inner'
             }
         },
         labelLine: {
             normal: {
                 show: false
             }
         },
         data:[
             {value:guaranteeBalanceTotal, name:'总计剩余保证金金额'},
             {value:notPayGuaranteeTotal, name:'总计未缴保证金金额'},
             {value:payActGuaranteeTotal, name:'总计实缴保证金金额'}
         ]
     },
     {
         name:'访问来源',
         type:'pie',
         radius: ['40%', '55%'],

         data:[
               {value:payAbleGuaranteeTotal, name:'总计应缴保证金金额'}
              
         ]
     }
 ]
     };
     // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
}

function searchFun(){
	initTable();
}

function loadDate2(){
	$('#guaranteePayStartDate,#guaranteePayEndDate').datetimepicker('remove');
	$("#guaranteePayStartDate,#guaranteePayEndDate").datetimepicker({
		 language: 'zh-CN',
	       autoclose: 1,
	       todayBtn: true,// 显示今天时间
	       pickerPosition: "bottom-left",
	       minuteStep: 5,
	       format: 'yyyy-mm-dd',
	       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	    });
}

function loadDate0(){
	$('#guaranteePayStartDate,#guaranteePayEndDate').datetimepicker('remove');
	$('#guaranteePayStartDate,#guaranteePayEndDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
}

function loadDate1(){
	$('#guaranteePayStartDate,#guaranteePayEndDate').datetimepicker('remove');
	$('#guaranteePayStartDate,#guaranteePayEndDate').datetimepicker({
		language: 'zh-CN',
		autoclose: 1,
		todayHighlight: true,
		format: 'yyyy-mm',
		startView: 3,
        minView: 3,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
}

function chooseDateType(){
	$("#chooseDateType").click(function(){
		$('#guaranteePayStartDate,#guaranteePayEndDate').val("");
		var dateType = $("input[type='radio']:checked").val();
		//切换日历
		if(dateType == "0"){
			loadDate0();
		}else if(dateType == "1"){
			loadDate1();
		}else if(dateType == "2"){
			loadDate2();
		}
	})
}
