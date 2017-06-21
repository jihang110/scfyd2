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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.crm.CorpInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICorpInfoService;

/**
 * 供应商信息相关的控制类
 * @author zhangjj
 *
 */
@Controller
@RequestMapping("/corpInfo")
public class CorpInfoController {

	private static final Logger log = LoggerFactory.getLogger(CorpInfoController.class);
	
	@Resource
	private ICorpInfoService corpInfoService;
	
	@RequestMapping(value = "/baseInfo", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean baseInfo(
			HttpSession httpSession,
			@RequestBody CorpInfoReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		return corpInfoService.getCorpInfoBaseByCorpId(paramMap);
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpEvalUpdate(
			@Valid @RequestBody CorpInfoReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = corpInfoService.updateCorpInfo(paramMap);
		return respBean;
	}
	
	
	
}
