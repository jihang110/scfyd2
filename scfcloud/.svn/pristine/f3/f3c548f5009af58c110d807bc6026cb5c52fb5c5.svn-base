package com.ut.scf.web.controller.bpm;

import java.io.IOException;
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
import com.ut.scf.reqbean.bpm.FlowRiskCtrlAddReqBean;
import com.ut.scf.reqbean.bpm.FlowRiskCtrlDeleteReqBean;
import com.ut.scf.reqbean.bpm.FlowRiskCtrlListReqBean;
import com.ut.scf.reqbean.bpm.FlowRiskCtrlUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IFlowRiskCtrlService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 流程-风控措施表的控制类
 * @author shenyu
 *
 */
@Controller
@RequestMapping("/flowRiskCtrl")
public class FlowRiskCtrlController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(FlowRiskCtrlController.class);
	@Resource
	private IFlowRiskCtrlService flowRiskCtrlService;
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowRiskCtrlList(
			HttpSession httpSession,
			@Valid @RequestBody FlowRiskCtrlListReqBean reqBean,
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
		String roleIdSession = (String) httpSession
						.getAttribute(ScfConsts.SESSION_ROLE_ID);
		log.debug("roleIdSession: {}", roleIdSession);
		int roleTypeSession = (int) httpSession
						.getAttribute(ScfConsts.SESSION_ROLE_TYPE);
		log.debug("roleTypeSession: {}", roleTypeSession);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = flowRiskCtrlService.getFlowRiskCtrlList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowRiskCtrlAdd(
			HttpSession httpSession,
			@Valid @RequestBody FlowRiskCtrlAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		// 获取用户信息
		String userIdSession = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("createUserId", userIdSession);
		respBean = flowRiskCtrlService.insertFlowRiskCtrl(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowRiskCtrlUpdate(
			HttpSession httpSession,
			@Valid @RequestBody FlowRiskCtrlUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = flowRiskCtrlService.updateFlowRiskCtrl(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowRiskCtrlDelete(
			HttpSession httpSession,
			@Valid @RequestBody FlowRiskCtrlDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String rskctId = reqBean.getRskctId();
		respBean = flowRiskCtrlService.deleteFlowRiskCtrl(rskctId);
		return respBean;
	}
}
