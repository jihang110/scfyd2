package com.ut.scf.web.controller.crm;

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
import com.ut.scf.pojo.OrgnLoanCount;
import com.ut.scf.reqbean.crm.OrgnLoanCountAddReqBean;
import com.ut.scf.reqbean.crm.OrgnLoanCountGetReqBean;
import com.ut.scf.reqbean.crm.OrgnLoanCountUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IOrgnLoanCountService;
import com.ut.scf.web.controller.BaseJsonController;
/**
 * 
 * @author lzy
 *
 */
@Controller
@RequestMapping("/orgnLoanCount")
public class OrgnLoanCountController extends BaseJsonController {
	@Resource
	private IOrgnLoanCountService orgnloancountService;
	private static final Logger log = LoggerFactory
			.getLogger(OrgnLoanCountController.class);
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean OrgnLoanCountList(HttpSession httpSession,
			@Valid @RequestBody OrgnLoanCountGetReqBean reqBean,
			BindingResult bindingResult) throws IOException{
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		return orgnloancountService.getOrgnFlowList(paramMap, page);
	}
	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean OrgnLoanCountAdd(HttpSession httpSession,
			@Valid @RequestBody OrgnLoanCountAddReqBean reqBean,
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
		paramMap.put("createUserId", userIdSession);
		respBean = this.orgnloancountService.addOrgnFlow(paramMap);
		return respBean;
	}
	
	
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean OrgnLoanCountDelete(HttpSession httpSession,
			@Valid @RequestBody OrgnLoanCount orgn,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = orgn.getRecUid();
		respBean =orgnloancountService.deleteOrgnFlow(recUid);
		return respBean;

	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean OrgnLoanCountUpdate(HttpSession httpSession,
			@Valid @RequestBody OrgnLoanCountUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = orgnloancountService.updateOrgnFlow(paramMap);
		return respBean;

	}
	
	
	
	
	
	
	
	
}
