<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>

<%@page import="java.util.*"%>
<%@page import="org.activiti.engine.*"%>

<%
    ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(application);

	ProcessEngine processEngine = (ProcessEngine) ctx.getBean("processEngine");

	// Get Activiti services
	TaskService taskService = processEngine
		.getTaskService();

	// complete a task
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("superior", "superior");
	String agreeStr = request.getParameter("agree");
	boolean agree;
	if(agreeStr.equals("true")){
		agree = true;
	}else{
		agree = false;
	}
	taskService.setAssignee(request.getParameter("id"), "ywjl");
	taskService.claim(request.getParameter("id"), "ywjl");//申领任务 
	
	taskService.setVariable(request.getParameter("id"), "agree2", agree);//true批准，false不批准
	taskService.complete(request.getParameter("id"));

	response.sendRedirect("index.jsp");
%>


