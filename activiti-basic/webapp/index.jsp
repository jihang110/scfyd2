<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>

<%@page import="java.util.*"%>
<%@page import="org.activiti.engine.*"%>
<%@page import="org.activiti.engine.repository.*"%>
<%@page import="org.activiti.engine.runtime.*"%>
<%@page import="org.activiti.engine.task.*"%>

<%
    ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(application);

	ProcessEngine processEngine = (ProcessEngine) ctx.getBean("processEngine");

	// Get Activiti services
	RepositoryService repositoryService = processEngine
		.getRepositoryService();
	RuntimeService runtimeService = processEngine
		.getRuntimeService();
	TaskService taskService = processEngine
		.getTaskService();
%>
<html>
  <head>
    <title>index</title>
    <script src="js/jquery-3.0.0.min.js" type="text/javascript"></script>
  </head>
  <body>
<a href="deploy.jsp">deploy</a>
<a href="h2database">h2database</a>
<hr>

<table border="1" width="100%">
  <legend>process definition</legend>
  <thead>
    <tr>
	  <th>key</th>
	  <th>name</th>
	  <th>&nbsp;</th>
	</tr>
  </thead>
  <tbody>
<%
	for (ProcessDefinition processDefinition : repositoryService.createProcessDefinitionQuery().list()) {
		pageContext.setAttribute("processDefinition", processDefinition);
%>
    <tr>
	  <td>${processDefinition.key}</td>
	  <td>${processDefinition.name}</td>
	  <td>
	    <a href="start.jsp?id=${processDefinition.id}">start</a>
	    <a href="graph.jsp?processDefinitionId=${processDefinition.id}">graph</a>
	  </td>
	</tr>
<%
	}
%>
  </tbody>
</table>

<hr>

<table border="1" width="100%">
  <legend>process instance</legend>
  <thead>
    <tr>
	  <th>id</th>
	  <th>process definition</th>
	  <th>&nbsp;</th>
	</tr>
  </thead>
  <tbody>
<%
	for (ProcessInstance processInstance : runtimeService.createProcessInstanceQuery().list()) {
		pageContext.setAttribute("processInstance", processInstance);
%>
    <tr>
	  <td>${processInstance.id}</td>
	  <td>${processInstance.processDefinitionId}</td>
	  <td>
	    <a href="graph.jsp?processInstanceId=${processInstance.id}">graph</a>
	  </td>
	</tr>
<%
	}
%>
  </tbody>
</table>

<hr>

<table border="1" width="100%">
  <legend>task</legend>
  <thead>
    <tr>
	  <th>id</th>
	  <th>name</th>
	  <th>assignee</th>
	  <th>&nbsp;</th>
	</tr>
  </thead>
  <tbody>
<%
	for (Task task : taskService.createTaskQuery().list()) {
		pageContext.setAttribute("task", task);
%>
    <tr>
	  <td>${task.id}</td>
	  <td>${task.name}</td>
	  <td>${task.assignee}</td>
	  <td>
	  	<label><input name="agree" type="radio" value="true" />同意 </label> 
		<label><input name="agree" type="radio" value="false" />拒绝 </label> 
	    <a href="javascript:void(0)" onclick="complete()">complete</a>
	    <a href="graph.jsp?taskId=${task.id}">graph</a>
	  </td>
	</tr>
<%
	}
%>
  </tbody>
</table>
  </body>
  <script type="text/javascript">
	function complete() {
		var agree = $("input[name='agree']:checked").val();
		var id = "${task.id}";
		location.href="complete.jsp?id="+id+"&agree="+agree;
	};
  </script>
</html>
