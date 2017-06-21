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
import com.ut.scf.reqbean.bpm.FlowGuaranteeInfoAddReqBean;
import com.ut.scf.reqbean.bpm.FlowGuaranteeInfoDeleteReqBean;
import com.ut.scf.reqbean.bpm.FlowGuaranteeInfoListReqBean;
import com.ut.scf.reqbean.bpm.FlowGuaranteeInfoUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IFlowGuaranteeInfoService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 流程-担保方信息表的控制类
 * @author shenyu
 *
 */
@Controller
@RequestMapping("/flowGuaranteeInfo")
public class FlowGuaranteeInfoController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(FlowGuaranteeInfoController.class);
	@Resource
	private IFlowGuaranteeInfoService flowGuaranteeInfoService;
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowGuaranteeInfoList(
			HttpSession httpSession,
			@Valid @RequestBody FlowGuaranteeInfoListReqBean reqBean,
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
		respBean = flowGuaranteeInfoService.getFlowGuaranteeInfoList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowGuaranteeInfoAdd(
			HttpSession httpSession,
			@Valid @RequestBody FlowGuaranteeInfoAddReqBean reqBean,
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
		respBean = flowGuaranteeInfoService.insertFlowGuaranteeInfo(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowGuaranteeInfoUpdate(
			HttpSession httpSession,
			@Valid @RequestBody FlowGuaranteeInfoUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = flowGuaranteeInfoService.updateFlowGuaranteeInfo(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean FlowGuaranteeInfoDelete(
			HttpSession httpSession,
			@Valid @RequestBody FlowGuaranteeInfoDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String grtId = reqBean.getGrtId();
		respBean = flowGuaranteeInfoService.deleteFlowGuaranteeInfo(grtId);
		return respBean;
	}
}
