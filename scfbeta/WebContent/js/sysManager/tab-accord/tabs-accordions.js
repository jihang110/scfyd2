$(function() {
	//CloudUtils.ajax(CloudUtils.options);
	//anchor();
	//IFrameResize();
	if(store.get('roleType')!=1){
		ajaxNotFlowCount();
		ajaxOverFlowCount();
		$("#toNotFlow").click(function(){
			toNotFlow();
		});z
		$("#notFlowCount").click(function(){
			toNotFlow();
		});
		$("#toOverFlow").click(function(){
			toOverFlow();
		});
		$("#overFlowCount").click(function(){
			toOverFlow();
		});
	}else{
		$("#toNotFlow").unbind();  
		$("#notFlowCount").unbind();  
		$("#toOverFlow").unbind();  
		$("#overFlowCount").unbind();  
	}
	$(".fa-th-large").click(function(){
		$(this).parent().parent().next().toggle(1000);
	});
});


function elementClick(){
	
	$('.clickJudge').click(function (e) {
		var v_idStr = $(e.target).attr('id');
		var tag_idStr = "";
		var t_idStr = "";
		if(v_idStr != undefined){
			
		if(v_idStr.indexOf("Tag") > 0){
			t_idStr = v_idStr.replace('Tag','');
			tag_idStr = v_idStr;
		} else if(v_idStr.indexOf("button") > 0){
			t_idStr = v_idStr.replace('button','');
			tag_idStr = t_idStr+"Tag";
		} else {
			return;
		}
		var t_obj = $("#"+t_idStr);
		var tag_obj = $("#"+tag_idStr);
		if( t_obj.css("display")=='none' ){
			tag_obj.removeClass('glyphicon glyphicon-plus form-control-feedback spanflow');
			tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#f7643b"});
			tag_obj.addClass('"glyphicon glyphicon-minus form-control-feedback spanflow');
			modfun(t_idStr,1);  
		}else{
			tag_obj.removeClass('glyphicon glyphicon-minus form-control-feedback spanflow');
			tag_obj.css({"font-family":'Glyphicons Halflings',"background":"#2582e3"});
			tag_obj.addClass('"glyphicon glyphicon-plus form-control-feedback spanflow');
			modfun(t_idStr,0);
		}
		t_obj.toggle(0);
		//IFrameResize();
		}else{
			return;
		}
	}); 
}


function modfun(infoType,status){
	var userId = store.get("userId");
	 var param = {    
	            userId:userId,
	            infoType:infoType,
	            status:status
	         };
	var options = {
			url : 'homeInfo/mod',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if(data.result==0){
					
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

/********************内部公告*********************/


function toOffice(){
	window.location.href="office/officeManager/office.html";
}
function toOfficeDetail(id){
	window.location.href="office/officeManager/officeDetail.html?id="+id;
}
function ajaxOffice(){
	var data = '{"isPage":1,"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'internalAnnouncement/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					
					var id = "officeTable";
					
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toOfficeDetail('"+units.recUid+"')\"><a>" + units.title + "</a></td></tr>");  
					});
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

/********************文档下载*********************/


function toDocument(){
	window.location.href="office/documentManager/documentList.html";
}
function toDocumentDetail(id){
	window.location.href="office/documentManager/documentDetail.html?id="+id;
}
function ajaxDocument(){
	var data = '{"isPage":1,"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'document/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					
					var id = "documentTable";
					
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toDocumentDetail('"+units.recUid+"')\"><a>" + units.title + "</a></td></tr>");  
					});
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

/**
 * 查询未结流程数目
 */
function ajaxNotFlowCount(){
	var data = '{"isPage":0}';
	var options = {
			url : 'actflow/notOverProcessList',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#notFlowCount").text(data.dataList.length);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}

/**
 * 查询已结流程数目
 */
function ajaxOverFlowCount(){
	var data = '{"isPage":0}';
	var options = {
			url : 'actflow/overProcesslist',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					$("#overFlowCount").text(data.dataList.length);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}
function toNotFlow(){
	window.location.href="bpm/flowManager/notOverProcessList.html";
} 

function toOverFlow(){
	window.location.href="bpm/flowManager/OverProcesslist.html";
} 

/********************预警通知*********************/

function ajaxExpenseExpireCount(){
	var data = '{"recUid":""}';
	var options = {
			url : 'notepadFlow/expenseExpireCount',
			data : "{}",
			callBackFun : function(data) {
				if(data.result==0){
					$("#expenseExpireCount").html(data.expenseExpireCount);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}




function toDetail(id){
	window.location.href="sysManager/classNewsManager/classDetail.html?id="+id;
}
function toClasses(){
	window.location.href="sysManager/classNewsManager/classes.html";
}
function toNews(){
	window.location.href="sysManager/classNewsManager/news.html";
}
function ajaxTable(type){
	var data = '{"isPage":1,"type":'+type+',"pageNumber": 1,"pageSize": 5}';
	var options = {
			url : 'classNews/list',
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					var id;
					if(type==1){
						id = "newsTable";
					}else{
						id = "classTable";
					}
					var control = $('#' + id);
					$.each(data.dataList, function (index, units) {
						control.append("<tr><td class='tableTitleCss' onclick=\"toDetail('"+units.classNewsId+"')\"><a>" + units.title + "</a></td></tr>");  
					});
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


window.operateEvents = {
	    'click .remove': function (e, value, row, index) {
	    	
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	    		if(row.corpId != null){
	            	var options = {
	    					url : 'userMark/delete',
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
	    		}else{
	    			bootbox.alert("系统标签不能删除");
	    			
	    		}
	    	 });
	    }
	};


function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  
	    	  markName: {
	    		  validators: {
	    			  notEmpty: {
	                      message: '不能为空'
	                  },
	                  stringLength: {
	                	  min: 1,
	                	  max: 10,
	                	  message: '最大为10个字'
							}
						}
	          }
	         
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
	});	
}

function IFrameResize(){
	 var obj = parent.document.getElementById("mainFrame");  //取得父页面IFrame对象  
	 //alert(obj.height); //弹出父页面中IFrame中设置的高度  
	 obj.height = $(".iframeBody").height();  //调整父页面中IFrame的高度为此页面的高度  
	  
	} 

function anchor(){
	 $("a").each(function (){
		    var link = $(this);
		    var href = link.attr("href");
		    if(href && href[0] == "#")
		    {
		      var name = href.substring(1);
		      $(this).click(function() {
		        var nameElement = $("[name='"+name+"']");
		        var idElement = $("#"+name);
		        var element = null;
		        if(nameElement.length > 0) {
		          element = nameElement;
		        } else if(idElement.length > 0) {
		          element = idElement;
		        }
		 
		        if(element) {
		          var offset = element.offset();
		          window.parent.scrollTo(offset.left, offset.top);
		        }
		 
		        return false;
		      });
		    }
		  });
}