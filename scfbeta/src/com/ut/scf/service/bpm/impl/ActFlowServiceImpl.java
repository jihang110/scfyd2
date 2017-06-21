package com.ut.scf.service.bpm.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.reqbean.bpm.ActFlowDeleteDeployReqBean;
import com.ut.scf.reqbean.bpm.ActFlowDeletePriReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.bpm.ActStartRespBean;
import com.ut.scf.service.bpm.IActFlowService;

@Service("actFlowService")
public class ActFlowServiceImpl implements IActFlowService{

	@Resource
	private HistoryService historyService;
	
	@Resource
	private RepositoryService repositoryService;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActDefinitionList(RepositoryService repositoryService) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (ProcessDefinition processDefinition : repositoryService.createProcessDefinitionQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("processDefinitionKey", processDefinition.getKey());
			map.put("definitionName", processDefinition.getName());
			map.put("deploymentId", processDefinition.getDeploymentId());
			map.put("definitionId", processDefinition.getId());
			map.put("version", Integer.toString(processDefinition.getVersion()));
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActProcessInstanceList(RuntimeService runtimeService) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (ProcessInstance processInstance : runtimeService.createProcessInstanceQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("processDefinitionName", processInstance.getProcessDefinitionName());
			map.put("processInstanceId", processInstance.getId());
			map.put("processDefinitionId", processInstance.getProcessDefinitionId());
			map.put("processDefinitionKey", processInstance.getProcessDefinitionKey());
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getActTaskList(ProcessEngine processEngine) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for (Task task : processEngine.getTaskService().createTaskQuery().list()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("taskId", task.getId());
			map.put("processDefinitionId", task.getProcessDefinitionId());
			map.put("processInstanceId", task.getProcessInstanceId());
			map.put("taskName", task.getName());
			map.put("assignee", task.getAssignee());
			map.put("processDefinitionName", processEngine.getRepositoryService().getProcessDefinition(task.getProcessDefinitionId()).getName());
			map.put("processDefinitionKey", processEngine.getRepositoryService().getProcessDefinition(task.getProcessDefinitionId()).getKey());
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean startActFlow(RuntimeService runtimeService, Map<String, Object> paramMap) {
		ActStartRespBean respBean = new ActStartRespBean();
//		String processDefinitionId = paramMap.get("processDefinitionId").toString();
//		runtimeService.startProcessInstanceById(processDefinitionId, paramMap);
		String processDefinitionKey = paramMap.get("processDefinitionKey").toString();
		String businessKey = paramMap.get("businessKey").toString();
		ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processDefinitionKey, businessKey, paramMap);
		respBean.setPriId(processInstance.getId());
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean  completeTask(TaskService taskService, Map<String, Object> paramMap){
		ListRespBean respBean = new ListRespBean();
		String agreeStr = paramMap.get("agreeStr").toString();
		String taskId = paramMap.get("taskId").toString();
		String taskName = paramMap.get("taskName").toString();
		String userName = paramMap.get("userName").toString();
		JSONObject editJson = new JSONObject();
		boolean agree;
		if(agreeStr.equals("0")){
			agree = true;
		}else{
			agree = false;
		}
		Map<String, Object> variables = taskService.getVariables(taskId);
		String editFlag = variables.get("editFlag").toString();
		if(editFlag.equals("true")){ // 节点是否能编辑流程变量
			String[] editColumnsArr = variables.get("editColumns").toString().split(",");
			List editColumns =  Arrays.asList(editColumnsArr);
			//TODO 限制编辑
			for(String key : paramMap.keySet()){
				if(editColumns.contains(key)){
					editJson.put(key, paramMap.get(key));
				}
			}
			String editMapString = editJson.toString();
			if (StringUtils.isNotEmpty(editMapString)) {
				taskService.setVariableLocal(taskId, "hisDataJson",editMapString);
			}
			
		}
		
		
		taskService.setVariable(taskId, "agree", agree);//true批准，false不批准
		if(taskName.equals("会签环节")){
		     taskService.setVariable(taskId, "mulitiInstance", new MulitiInstanceCompleteTask());
		     String currentSignCount = taskService.getVariable(taskId, "signCount").toString();
		     if (agree == true) {
		    	 taskService.setVariable(taskId, "signCount", Integer.parseInt(currentSignCount) + 1);
			}
		}else if(taskName.equals("业务总负责人")){
		    System.out.println("业务总负责人");
		}else if(taskName.equals("风控经理")){
		    System.out.println("风控经理");
		}
		
		
		taskService.setOwner(taskId, userName);
		taskService.complete(taskId);
		return respBean;
	}
	
	@Override
	public BaseRespBean deployActFlow(RepositoryService repositoryService,String processDefinitionId) {
		ListRespBean respBean = new ListRespBean();
		repositoryService.activateProcessDefinitionById(processDefinitionId);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean terminateActFlow(RuntimeService runtimeService,
			String processInstanceId) {
		ListRespBean respBean = new ListRespBean();
		runtimeService.deleteProcessInstance(processInstanceId, "删除");
		return respBean;
	}	
	/**
	 * 查询历史流程
	 * @param HistoryService
	 * @param paramMap
	 * 		     用户信息
	 * @param boolean finish 
	 * 	               判断结束与否
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getHistoricProcessList(ProcessEngine processEngine, Map<String, Object> paramMap,boolean finish) {
		ListRespBean respBean = new ListRespBean();
		boolean root ;
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		String roleId = paramMap.get("roleId").toString();
		if (roleId.equals("ROLE000001")) {     //是否root用户
			root = true;
		}else {     
			root = false;   
		}
		String userName = paramMap.get("userName").toString();
		List<HistoricTaskInstance> taskList = getHistoricTaskByName(processEngine.getHistoryService(), userName, finish, root);
		list.addAll(getHistoricTaskList(taskList, finish));
		respBean.setDataList(list);
		return respBean;
	}
	/**
	 * 查询历史任务列表
	 * @param userName 
	 * 		    任务办理人
	 * @param finish
	 * 		    是否结束
	 * @param root
	 * 		    是否root用户
	 */
	private List<HistoricTaskInstance> getHistoricTaskByName(HistoryService historyService, String userName, boolean finish, boolean root){
		List<HistoricTaskInstance> taskList;
		if (root == true) {             //root用户查询
			if (finish == true) {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .finished() // 查询已结任务    
			            .list();
			}else {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .unfinished() // 查询未结任务    
			            .list();
			}
		}else {                          //其他用户查询
			if (finish == true) {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .taskCandidateUser(userName)
			            .finished() // 查询已结任务    
			            .list();
			}else {
				taskList = historyService // 历史任务Service  
			            .createHistoricTaskInstanceQuery() // 创建历史任务实例查询  
			            .taskCandidateUser(userName)
			            .unfinished() // 查询未结任务    
			            .list();
			}
		}
		return taskList;
	}

	/**
	 * 查询历史任务
	 */
	private List<Map<String, String>> getHistoricTaskList(List<HistoricTaskInstance> taskList, boolean finish){
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		for(HistoricTaskInstance hti:taskList){  
			 Map<String, String> map = new HashMap<String, String>();
			 
			// 查询流程实例全局变量
			HistoricVariableInstance prjNameVar = historyService.createHistoricVariableInstanceQuery()
					.processInstanceId(hti.getProcessInstanceId()).variableName("proName").singleResult();
			if (prjNameVar!=null){
				map.put("projectName", (String) prjNameVar.getValue());
			}
			//List<HistoricVariableInstance> taskVar = historyService.createHistoricVariableInstanceQuery().taskId(hti.getId()).list();
			HistoricProcessInstance hpi = 	historyService.createHistoricProcessInstanceQuery().processInstanceId(hti.getProcessInstanceId()).singleResult();
			String procStatus = hpi.getEndTime()== null ? "未结":"已结"; 
			ProcessDefinition pdef = repositoryService.createProcessDefinitionQuery().processDefinitionId(hti.getProcessDefinitionId()).singleResult();
			String procName = pdef.getName();
			
	        map.put("taskId", hti.getId());//任务ID
	        map.put("processInstanceId", hti.getProcessInstanceId());//流程实例ID
	        map.put("taskName", hti.getName());
	        map.put("procStatus", procStatus);
	        map.put("procName", procName);
	        
	        if (hti.getAssignee() == null) {
	        	map.put("assignee", hti.getOwner());//办理人
			}else {
				map.put("assignee", hti.getAssignee());
			}
	        map.put("startTime", sdf.format(hti.getStartTime()));//创建时间
	        if (finish==true) {
	        	map.put("endTime", sdf.format(hti.getEndTime()));//结束时间
			}
	        list.add(map);
		}
		return list;
	}
	
	/**
	 * 查询历史流程
	 * 
		//查询指定用户发起的流程 （流程历史 用户发起 ）
		historyService.createHistoricProcessInstanceQuery()
						.finished()//finished--> 完成的流程；  unfinish ---> 还在运行中的流程
						.startedBy(name)
						.orderByProcessInstanceStartTime().desc()
						.listPage(firstResult, maxResults);
		//查询指定用户参与的流程信息 （流程历史  用户参与 ）
		List hpis = historyService
					.createHistoricProcessInstanceQuery()
					.involvedUser(name)
					.orderByProcessInstanceStartTime().desc()
					.listPage(firstResult, maxResults);
		//查询指定流程的任务流转路径 （流程历史 任务 流转 路经）
		historyService.createHistoricTaskInstanceQuery()
						.processInstanceId(processInstanceId)
						.orderByHistoricTaskInstanceEndTime().asc().list();
		
	 */
	private List<Map<String, String>> getHistoryActInstanceList(ProcessEngine processEngine,Map<String, Object> paramMap){
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String userName = paramMap.get("userName").toString();
		//与正在执行的任务管理相关的Service
	    TaskService service = processEngine.getTaskService();
	    //创建任务查询对象
	    TaskQuery query = service.createTaskQuery();
	    //指定个人任务查询，指定办理人
	    query.taskAssignee(userName);
	    List<Task> tlist = query.list();
	    if(tlist!=null && tlist.size()>0){
	        for(Task task:tlist){
	            System.out.println("任务ID:"+task.getId());
	            System.out.println("任务名称:"+task.getName());
	            System.out.println("任务的创建时间:"+task.getCreateTime());
	            System.out.println("任务的办理人:"+task.getAssignee());
	            System.out.println("流程实例ID："+task.getProcessInstanceId());
	            System.out.println("执行对象ID:"+task.getExecutionId());
	            System.out.println("流程定义ID:"+task.getProcessDefinitionId());
	        }
	    }
		return list;
	}
	
	/**
	 * 删除流程定义
	 * @param reqBean
	 * @param repositoryService
	 * @return
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean  delteProcessDefinitionByKey(ActFlowDeleteDeployReqBean reqBean,RepositoryService repositoryService){
		BaseRespBean respBean = new BaseRespBean();
		// 先使用流程定义的key查询流程定义，查询出所有的版本  
	    List<ProcessDefinition> list = repositoryService
	            .createProcessDefinitionQuery()  
	            .processDefinitionKey(reqBean.getProcessDefinitionKey())// 使用流程定义的key查询  
	            .list();  
	    // 遍历，获取每个流程定义的部署ID  
	    if (list != null && list.size() > 0) {  
	        for (ProcessDefinition pd : list) {  
	            // 获取部署ID  
	            String deploymentId = pd.getDeploymentId();  
	            if(reqBean.getDeploymentId().equals(deploymentId)){
	            	//      /*  
	            	//       * 不带级联的删除， 只能删除没有启动的流程，如果流程启动，就会抛出异常  
	            	//       */  
	            	//       processEngine.getRepositoryService().deleteDeployment(deploymentId);  
	            	
	            	/** 
	            	 * 级联删除 不管流程是否启动，都可以删除 
	            	 */  
	            	repositoryService.deleteDeployment(deploymentId, true);  
	            	respBean.setResult(ErrorCodeEnum.SUCCESS);
	            }
	        }  
	  
	    }  
		return respBean;
	}
	
	/**
	 * 删除流程实例
	 * @param reqBean
	 * @param runtimeService
	 * @return
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean  delteProcessInstance(ProcessEngine processEngine, ActFlowDeletePriReqBean reqBean){
		BaseRespBean respBean = new BaseRespBean();
		
		processEngine.getRuntimeService().deleteProcessInstance(reqBean.getProcessInstanceId(), reqBean.getDeleteReason());
		//历史删除
		processEngine.getHistoryService().deleteHistoricProcessInstance(reqBean.getProcessInstanceId());
		respBean.setResult(ErrorCodeEnum.SUCCESS);
		return respBean;
	}
}
