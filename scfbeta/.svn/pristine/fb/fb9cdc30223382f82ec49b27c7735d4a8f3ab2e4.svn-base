package com.ut.scf.web.controller.bpm;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.FormService;
import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.impl.cmd.GetDeploymentProcessDiagramCmd;
import org.activiti.engine.impl.interceptor.Command;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.task.Task;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ActProcessInstanceDiagramCmd;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.bpm.ActFlowDeleteDeployReqBean;
import com.ut.scf.reqbean.bpm.ActFlowDeletePriReqBean;
import com.ut.scf.reqbean.bpm.ActFlowDeployContentReqBean;
import com.ut.scf.reqbean.bpm.ActFlowDeployReqBean;
import com.ut.scf.reqbean.bpm.ActFlowReqBean;
import com.ut.scf.reqbean.bpm.ActFlowTerminateReqBean;
import com.ut.scf.reqbean.bpm.ProjectAddReqBean;
import com.ut.scf.reqbean.bpm.ProjectPageReqBean;
import com.ut.scf.reqbean.bpm.SimpleTaskReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.bpm.IActFlowService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * Activiti的控制类
 * @author zyx
 *
 */
@Controller
@RequestMapping("/actflow")
public class ActFlowController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(ActFlowController.class);
	
	@Resource
	private ProcessEngine processEngine;
	@Resource
	private RepositoryService repositoryService;
	@Resource
	private RuntimeService runtimeService;
	@Resource
	private TaskService taskService;
	@Resource
	private HistoryService historyService;
	@Resource
	private IActFlowService actFlowService;
	
	@Resource
	private FormService formService;
	
	/**
	 * 获取流程定义列表
	 * @param request
	 * @param httpSession
	 * @param searchPage
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/definitionlist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean DefinitionList(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		respBean = actFlowService.getActDefinitionList(repositoryService);
		return respBean;
	}

	/**
	 * 获取流程实例列表
	 * @param request
	 * @param httpSession
	 * @param searchPage
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/instancelist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean InstanceList(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		
		respBean = actFlowService.getActProcessInstanceList(runtimeService);
		return respBean;
	}
	
	/**
	 * 获取任务列表
	 * @param request
	 * @param httpSession
	 * @param searchPage
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/tasklist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean TaskList(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		
		
		respBean = actFlowService.getActTaskList(processEngine);
		return respBean;
	}
	
	/**
	 * 开始流程
	 * @param request
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	
	@RequestMapping(value = "/start", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startFlow(HttpServletRequest request,
			@Valid @RequestBody ProjectAddReqBean actFlowStartReqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		//TODO 在业务表设计的时候添加一列：PROCESS_INSTANCE_ID varchar2(64)，在流程启动之后把流程ID更新到业务表中，这样不管从业务还是流程都可以查询到对方
		Map<String, Object> paramMap = BeanUtil.beanToMap(actFlowStartReqBean);
		
		respBean = actFlowService.startActFlow(runtimeService, paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/showProcessFormData")
	public @ResponseBody BaseRespBean showProcessFormData(@RequestParam String taskId) {
		BaseRespBean respBean = new BaseRespBean();
		StringBuffer htmlBuf = new StringBuffer();
//		TaskFormData form = formService.getTaskFormData(taskId);
//		List<FormProperty> frmPropList = form.getFormProperties();
//		for (FormProperty prop : frmPropList) {
//			htmlBuf.append("<div class=\"form-group\">");
//			htmlBuf.append("<label for=\"" + prop.getId() + "\" class=\"col-sm-4 control-label\">" + prop.getName()
//					+ "</label>");
//			htmlBuf.append("<div class=\"col-sm-5\">");
//			htmlBuf.append("<input type=\"text\" class=\"form-control\" id=\"" + prop.getId() + "\" name=\""
//					+ prop.getId() + "\"></div></div>");
//		}
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		if (task.getName().equals("业务经理")) {
			htmlBuf.append("<div class=\"form-group\">");
			htmlBuf.append("<label for=\"hisDataJson\" class=\"col-sm-4 control-label\">hisDataJson</label>");
			htmlBuf.append("<div class=\"col-sm-5\">");
			htmlBuf.append("<input type=\"text\" class=\"form-control\" id=\"hisDataJson\" name=\"hisDataJson\"></div></div>");
		}
		htmlBuf.append("<input type=\"hidden\" name=\"taskId\" value='" + taskId + "'>");
		respBean.setResultNote(htmlBuf.toString());
		return respBean;
	}
	
	@RequestMapping(value = "/doTask")
	@ResponseBody
	public BaseRespBean doTask(@RequestBody SimpleTaskReqBean req, HttpSession httpSession) {
		BaseRespBean respBean = new BaseRespBean();
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		taskService.setVariable(req.getTaskId(), "agree", req.getAgree().equals("0") ? true : false);
//		Map<String, Object> varMap = Maps.newHashMap();
		if (StringUtils.isNotEmpty(req.getHisDataJson())) {
			 taskService.setVariableLocal(req.getTaskId(), "hisDataJson",req.getHisDataJson());
//			varMap.put("hisDataJson", req.getHisDataJson());
		}
		taskService.setOwner(req.getTaskId(), userName);
//		taskService.complete(req.getTaskId(), varMap,true);
		taskService.complete(req.getTaskId());
		respBean.setResultNote(req.getTaskId());
		return respBean;
	}
	
	@RequestMapping(value = "/showHistory")
	@ResponseBody
	public BaseRespBean showHistoryList(String processInstanceId) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		List<HistoricTaskInstance> hisTaskList = historyService.createHistoricTaskInstanceQuery()
				.processInstanceId(processInstanceId).list();

		for (HistoricTaskInstance task : hisTaskList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("taskId", task.getId());
			map.put("processDefinitionId", task.getProcessDefinitionId());
			map.put("processInstanceId", task.getProcessInstanceId());
			map.put("taskName", task.getName());
			map.put("startTime", task.getStartTime() !=null?DateFormatUtils.format(task.getStartTime(), "yyyy-MM-dd HH:mm:ss"):"");
			map.put("endTime", task.getEndTime()!=null?DateFormatUtils.format(task.getEndTime(), "yyyy-MM-dd HH:mm:ss"):"");
			map.put("duration",task.getDurationInMillis()!=null? Long.toString(task.getDurationInMillis()):"");
			list.add(map);
		}
		respBean.setDataList(list);
		return respBean;
	}
	
	/**
	 * 获取流程图
	 * @param request
	 * @param httpSession
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/graph", method = RequestMethod.GET)
	public void Graph(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		Map<String, String[]> map= request.getParameterMap();
		String processDefinitionId = request.getParameter("processDefinitionId").replace("%3A", ":");
		String processInstanceId = request.getParameter("processInstanceId").replace("%3A", ":");
		String taskId = request.getParameter("taskId");	
		

		// 设置响应的类型格式为图片格式
		response.setContentType("image/jpeg");
		// 禁止图像缓存。
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setCharacterEncoding("utf-8");
		Command<InputStream> cmd = null;

		if (!processDefinitionId.equals("")) {
			cmd = new GetDeploymentProcessDiagramCmd(processDefinitionId);
		}

		if (!processInstanceId.equals("")) {
			cmd = new ActProcessInstanceDiagramCmd(processInstanceId);
		}

		if (!taskId.equals("")) {
			Task task = processEngine.getTaskService().createTaskQuery().taskId(taskId).singleResult();
			cmd = new ActProcessInstanceDiagramCmd(task.getProcessInstanceId());
		}

		if (cmd != null) {
	        InputStream is = processEngine.getManagementService()
				.executeCommand(cmd);
	        OutputStream toClient = response.getOutputStream();
			int len = 0;
			byte[] b = new byte[1024];
			while ((len = is.read(b, 0, 1024)) != -1) {
				toClient.write(b, 0, len);
			}
			toClient.flush();
			toClient.close();
			is.close();
		}
		
	}
	
	/**
	 * 任务操作：同意、拒绝
	 * @param request
	 * @param httpSession
	 * @param actFlowReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/taskComplete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean TaskComplete(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ActFlowReqBean actFlowReqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(actFlowReqBean);
		
		String userName = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		paramMap.put("userName", userName);
		respBean = actFlowService.completeTask(taskService, paramMap);
		return respBean;
	}
	
	/**
	 * 流程终止
	 * @param request
	 * @param actFlowTerminateReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/terminate", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean Terminate(
			HttpServletRequest request,
			@Valid @RequestBody ActFlowTerminateReqBean actFlowTerminateReqBean,
			BindingResult bindingResult) throws IOException {	
		
		BaseRespBean respBean = new BaseRespBean();
		runtimeService = processEngine.getRuntimeService();
		String processInstanceId = actFlowTerminateReqBean.getProcessInstanceId();
		respBean = actFlowService.terminateActFlow(runtimeService, processInstanceId);
		return respBean;
	}
	
	/**
	 * 流程删除（包含历史）
	 * @param request
	 * @param actFlowTerminateReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/deleteProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean DeleteProcess(
			HttpServletRequest request,
			@Valid @RequestBody ActFlowDeletePriReqBean actFlowTerminateReqBean,
			BindingResult bindingResult) throws IOException {	
		
		BaseRespBean respBean = new BaseRespBean();
		runtimeService = processEngine.getRuntimeService();
		respBean = actFlowService.delteProcessInstance(processEngine, actFlowTerminateReqBean);
		return respBean;
	}
	
	/**
	 * 流程发布
	 * @param request
	 * @param DeployFlowReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/deploy", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean deployFlow(HttpServletRequest request,
			@Valid @RequestBody ActFlowDeployReqBean actFlowDeployReqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
			
		respBean = actFlowService.deployActFlow(repositoryService,actFlowDeployReqBean.getProcessDefinitionId());
		return respBean;
	}
	/**
	 * @param request
	 * @param contentReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/startDeploy", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startDeploy(HttpServletRequest request,
			@Valid @RequestBody ActFlowDeployContentReqBean contentReqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Deployment deployment = processEngine.getRepositoryService()//获取流程定义和部署对象相关的Service  
                 .createDeployment().addString("process.bpmn20.xml",contentReqBean.getXmlContent())  
                 .deploy();//完成部署  
		return respBean;
	}
	
	/**
	 * 删除流程定义
	 */
	@RequestMapping(value = "/deleteDeploy", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean DelteProcessDefinitionByKey(HttpSession httpSession,
			@Valid @RequestBody ActFlowDeleteDeployReqBean reqBean,
			BindingResult bindingResult) {  
		
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = actFlowService.delteProcessDefinitionByKey(reqBean, repositoryService);
	    
	    return respBean;
	}  
	/**
	 * 查询已结流程
	 * @param request
	 * @param ProjectPageReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/overProcesslist", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean OverProcessList(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		String roleIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_ROLE_ID);
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("roleId", roleIdSession);
		paramMap.put("corpId", corpIdSession);
		paramMap.put("userName", userNameSession);
		boolean finish = true;
		respBean = actFlowService.getHistoricProcessList(processEngine, paramMap,finish);
		return respBean;
	}
	
	/**
	 * 查询未结流程
	 * @param request
	 * @param httpSession
	 * @param ProjectPageReqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/notOverProcessList", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean NotOverProcessList(
			HttpServletRequest request,HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		String roleIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_ROLE_ID);
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("roleId", roleIdSession);
		paramMap.put("corpId", corpIdSession);
		paramMap.put("userName", userNameSession);
		boolean finish = false;
		respBean = actFlowService.getHistoricProcessList(processEngine,paramMap,finish);
		return respBean;
	}
	
	@RequestMapping(value = "/showProjectDetail")
	public @ResponseBody BaseRespBean showProjectDetail(@RequestParam String processInstanceId,
			@RequestParam String taskId) {
		ListRespBean respBean = new ListRespBean();
		Map<String,Object> dataMap = Maps.newHashMap();
		// 查询流程实例全局变量
		List<HistoricVariableInstance> varList = historyService.createHistoricVariableInstanceQuery()
				.processInstanceId(processInstanceId).list();
		HistoricVariableInstance hisAdvice = historyService.createHistoricVariableInstanceQuery()
				.taskId(taskId).singleResult();
		for (HistoricVariableInstance var : varList) {
			dataMap.put("_"+var.getVariableName(), var.getValue());
			System.out.println(var.getVariableName()+" : "+var.getValue());
		}
		dataMap.put("_"+hisAdvice.getVariableName(), hisAdvice.getValue());
		System.out.println("old_"+hisAdvice.getVariableName()+" : "+hisAdvice.getValue());
		List<Map<String,Object>> list = Lists.newArrayList();
		list.add(dataMap);
		respBean.setDataList(list);
		return respBean;
	}
}
