package com.ut.scf.web.controller.bpm;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.OrgnLoanCount;
import com.ut.scf.reqbean.bpm.CheckReqBean;
import com.ut.scf.reqbean.bpm.FKAddReqBean;
import com.ut.scf.reqbean.bpm.FlowCntractAddReqBean;
import com.ut.scf.reqbean.bpm.FlowSearchPageReqBean;
import com.ut.scf.reqbean.bpm.JDAddReqBean;
import com.ut.scf.reqbean.bpm.ProDetailReqBean;
import com.ut.scf.reqbean.bpm.ProjectAddReqBean;
import com.ut.scf.reqbean.bpm.ProjectPageReqBean;
import com.ut.scf.reqbean.bpm.WorkItemReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.bpm.LXAddRespBean;
import com.ut.scf.service.bpm.IExpenseService;
import com.ut.scf.service.bpm.IFlowCntractService;
import com.ut.scf.service.bpm.IFlowProjectService;
import com.ut.scf.service.bpm.IWorkFlowService;
import com.ut.scf.service.sys.ICorpService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 工作流
 * @author zhangyx
 *
 */
@Controller
@RequestMapping("/workflow")
public class WorkFlowController extends BaseJsonController {
	
	// LOG
	private static final Logger log = LoggerFactory
			.getLogger(WorkFlowController.class);
	
	@Resource
	private IWorkFlowService workflowService;
	
	@Resource 
	private IExpenseService expenseService;
	
	@Resource
	private IFlowProjectService flowProjectService;
	
	@Resource
	private ICorpService corpService;
	
	@Resource 
	private IFlowCntractService flowCntService;
	
	/**
	 * 项目列表
	 * @param httpSession
	 * @param searchPage
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean list(HttpSession httpSession,
			@Valid @RequestBody ProjectPageReqBean searchPage,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPage);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(searchPage.getPageNumber());
		page.setPageSize(searchPage.getPageSize());
		respBean = this.flowProjectService.getFlowProjectList(paramMap,page);

		return respBean;
	}
	
	/**
	 * 项目尽调流程发起
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/startJDProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startSpProcess(HttpSession httpSession,
			@Valid @RequestBody JDAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		Map<String, Object> countParamMap = new HashMap<String, Object>();
		// 获取用户信息
		String userIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		String roleIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		if(!"ROLE000002".equals(roleIdSession)) {
			log.warn("roleType has error");
			respBean.setResult(ErrorCodeEnum.USER_INSUFFICIENT_AUTHORITY);
			return respBean;
		}
		paramMap.put("username", userNameSession);// 用户名
		paramMap.put("proMembId", userIdSession);
		paramMap.put("projectName", reqBean.getProName());
		paramMap.put("corpId", reqBean.getCorpId());
		// 1.检查项目名称不能重复
		countParamMap.put("state", 0);
		countParamMap.put("proStatus", 1);
		countParamMap.put("projectName", reqBean.getProName());
		respBean = expenseService.hasPriProNm(countParamMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 1.创建流程
		respBean = workflowService.create(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 2.流程创建成功后添加流程实例与项目名称对应表
		paramMap.put("proId",reqBean.getProNo());
		respBean = expenseService.addPriProject(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 3.流程创建成功后修改flow_project表的状态,status 0未发起，1正在进行
		paramMap.put("state", 1);
		respBean = flowProjectService.updateFlowProject(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		return respBean;
	}
	
	/**
	 * 立项审批流程发起
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/startLXProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startNmProcess(HttpSession httpSession,
			@Valid @RequestBody ProjectAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
 		BaseRespBean respBean = new LXAddRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		Map<String, Object> countParamMap = new HashMap<String, Object>();
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String userNameSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		if(!"ROLE000002".equals(roleIdSession)) {
			log.warn("roleType has error");
			respBean.setResult(ErrorCodeEnum.USER_INSUFFICIENT_AUTHORITY);
			return respBean;
		}
		paramMap.put("username", userNameSession);
		// 立项人员名称ID
		paramMap.put("proMembId", userIdSession);
		// 立项人员名称 
		paramMap.put("proMembName", userNameSession);
		// 项目名称
		paramMap.put("projectName", reqBean.getProName());
		
		
		// 1.检查项目名称不能重复
		countParamMap.put("projectName", reqBean.getProName());
		respBean = expenseService.hasPriProNm(countParamMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 2.创建流程
		respBean = workflowService.create(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 3.流程创建成功后添加流程实例与项目名称对应表
		respBean = expenseService.addPriProject(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		return respBean;
	}
	
	
	/**
	 * 放款审批流程发起
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/startFKProcess", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean startFinanceProcess(HttpSession httpSession,
			@Valid @RequestBody FKAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		// 获取用户信息
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		if(!"ROLE000002".equals(roleIdSession)) {
			log.warn("roleType has error");
			respBean.setResult(ErrorCodeEnum.USER_INSUFFICIENT_AUTHORITY);
			return respBean;
		}
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		// 立项人员名称ID
		paramMap.put("proMembId", userIdSession);
		// 项目名称
		paramMap.put("projectName", reqBean.getProName());
		
		
		
		// 1.项目名称可以重复可以多次放款
		// 2.创建流程
		respBean = workflowService.create(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 3.流程创建成功后添加流程实例与项目名称对应表
		respBean = expenseService.addPriProject(paramMap);
		paramMap.put("proId",reqBean.getProNo());
		if (respBean.getResult() != 0) {
			return respBean;
		}
		// 4.流程创建成功后修改flow_project表的状态,status 0未发起，1正在进行
		paramMap.put("state", 1);
			//项目状态：0立项，1尽调，2签署,3放款,4资产包
		respBean = flowProjectService.updateFlowProject(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		return respBean;
	}
	
	/**
	 * 未结流程一览取得
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/not", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean procNotList(HttpSession httpSession,
			@Valid @RequestBody FlowSearchPageReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		respBean = workflowService.getNotProcList(reqBean);
		return respBean;
	}
	
	/**
	 * 已结流程一览取得
	 * @param httpSession
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/over", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean workFlowOverList(HttpSession httpSession,
			@Valid @RequestBody FlowSearchPageReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		respBean = workflowService.getOverProcList(reqBean);
		return respBean;
	}
	
	
	/**
	 * 已结流程删除功能
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean workFlowDelete(HttpSession httpSession,
			@Valid @RequestBody FlowSearchPageReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String priId = reqBean.getPriId();
		respBean =workflowService.deleteWorkFlow(priId);
		return respBean;

	}
	
	
	
	/**
	 * 工作项详情一览取得
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/detail", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean wkiDetailList(HttpSession httpSession,
			@Valid @RequestBody ProDetailReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		
		respBean = workflowService.getWkiDetailList(paramMap);
		return respBean;
	}
	
	/**
	 * 查看项目详情
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/info", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean proDetailInfo(HttpSession httpSession,
			@Valid @RequestBody ProDetailReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		
		respBean = workflowService.getProDetailInfo(paramMap);
		return respBean;
	}
	
	/**
	 * TODO
	 * 申请_项目尽调
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/apply_XMJD", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean applySpMatter(HttpSession httpSession,
			@Valid @RequestBody JDAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		
		respBean = workflowService.reApply(paramMap);
		return respBean;
	}
	
	/**
	 * TODO
	 * 申请_立项申请
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/apply_LXSQ", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean applyNm(HttpSession httpSession,
			@Valid @RequestBody ProjectAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		// 立项人员名称
		paramMap.put("proMembName", userNameSession);
		paramMap.put("projectName", reqBean.getCustName());
		respBean = workflowService.reApply(paramMap);
		return respBean;
	}
	
	/**
	 * TODO
	 * 申请_放款审批
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/apply_FKSP", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean applyCredit(HttpSession httpSession,
			@Valid @RequestBody FKAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		
		respBean = workflowService.reApply(paramMap);
		return respBean;
	}
	
	
	
	/**
	 * 审批
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/check", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean chkWorkItem(HttpSession httpSession,
			@Valid @RequestBody CheckReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		//获取用户信息
		String userNameSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		respBean = workflowService.chkWorkItem(paramMap);
		return respBean;
	}
	
	/**
	 * 终止流程
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/terminate", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean terminate(
			HttpSession httpSession,
			@Valid @RequestBody WorkItemReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("username", userNameSession);
		
		
		respBean = workflowService.terminate(paramMap);
		// 4.流程创建成功后修改flow_project表的状态,status 0未发起，1正在进行
		paramMap.put("state", 0);
		respBean = flowProjectService.updateFlowProject(paramMap);
		if (respBean.getResult() != 0) {
			return respBean;
		}
		return respBean;
	}
	
	/**
	 * 权限转移
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/transfer", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean transfer(
			HttpSession httpSession,
			@Valid @RequestBody WorkItemReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String userIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("createUserId", userIdSession);
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		
		respBean = workflowService.transfer(paramMap);
		return respBean;
	}
	
	/**
	 * 查询未结任务数量
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getOnPassageItemCount", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getOnPassageItemCount(
			HttpSession httpSession,
			@Valid @RequestBody WorkItemReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		paramMap.put("roleId", reqBean.getRoleId());
		respBean = workflowService.getOnPassageItemCount(paramMap);
		return respBean;
	}
	
	/**
	 * 查询已结任务数量
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/getOverItemCount", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean getOverItemCount(
			HttpSession httpSession,
			@Valid @RequestBody WorkItemReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		String userNameSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USERNAME);
		log.debug("userNameSession: {}", userNameSession);
		String corpIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("username", userNameSession);
		paramMap.put("corpId", corpIdSession);
		respBean = workflowService.getOverItemCount(paramMap);
		return respBean;
	}
	
	/**
	 * 合同签署
	 * @param httpSession
	 * @param reqBean
	 * @param bindingResult
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/startCntSign", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean flowCntAdd(HttpSession httpSession,@Valid @RequestBody FlowCntractAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		
		// 获取用户信息
		String corpIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_CORP_ID);
		log.debug("corpIdSession: {}", corpIdSession);
		String userIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);
		String roleIdSession = (String) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) httpSession
				.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = this.flowCntService.insertFlowCntract(paramMap);
		if(respBean.getResult()==0){ // 合同录入完成修改项目状态：0已立项，1已尽调，2已签署,3已放款,4资产包
			Map<String, Object> updateMap = new HashMap<String, Object>();
			updateMap.put("proStatus", 2);
			updateMap.put("proId", reqBean.getProId());
			//插入就结束
			updateMap.put("state",0);
			respBean = flowProjectService.updateFlowProject(updateMap);
		}
		return respBean;
	}
}
