package com.ut.scf.web.controller.crm;

import java.io.IOException;
import java.util.Date;
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
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.crm.ExternalGuaranteeAddReqBean;
import com.ut.scf.reqbean.crm.ExternalGuaranteeListReqBean;
import com.ut.scf.reqbean.crm.ExternalGuaranteeUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IExternalGuaranteeService;

/**
 * 对外担保明细相关的控制类
 * @author liup
 *
 */
@Controller
public class ExternalGuaranteeController {
	private static final Logger log = LoggerFactory
			.getLogger(ExternalGuaranteeController.class);

	@Resource
	private IExternalGuaranteeService externalGuaranteeService;

	@RequestMapping(value = "/externalGuarantee/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean externalGuaranteeList(
			HttpSession httpSession,
			@RequestBody ExternalGuaranteeListReqBean reqBean)
			throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		log.info("*********pageNumber"+reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = externalGuaranteeService.getExternalGuaranteeList(paramMap,page);
		return respBean;
	}
	
	@RequestMapping(value = "/externalGuarantee/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean externalGuaranteeAdd(
			HttpSession httpSession,
			@Valid @RequestBody ExternalGuaranteeAddReqBean reqBean,
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
		//创建时间
		paramMap.put("createTime", new Date());
		log.info("******8paramMap"+paramMap);
		respBean = externalGuaranteeService.addExternalGuarantee(paramMap);

		return respBean;
	}

	@RequestMapping(value = "/externalGuarantee/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean externalGuaranteeUpdate(
			HttpSession httpSession,
			@Valid @RequestBody ExternalGuaranteeUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = externalGuaranteeService.updateExternalGuarantee(paramMap);

		return respBean;
	}

	@RequestMapping(value = "/externalGuarantee/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean externalGuaranteeDelete(
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = externalGuaranteeService.deleteExternalGuarantee(reqBean.getRecUid());

		return respBean;
	}

	
}
