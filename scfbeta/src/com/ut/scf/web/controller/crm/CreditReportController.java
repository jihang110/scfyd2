package com.ut.scf.web.controller.crm;

import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

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
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.crm.CreditReportAddReqBean;
import com.ut.scf.reqbean.crm.CreditReportDelReqBean;
import com.ut.scf.reqbean.crm.CreditReportListReqBean;
import com.ut.scf.reqbean.crm.CreditReportUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICreditReportService;
import com.ut.scf.web.controller.BaseJsonController;
/*
 * 信用报告controller
 * @author shenyu
 * @date 17.03.21
 * 
 */

@Controller
@RequestMapping("/creditReport")
public class CreditReportController extends BaseJsonController{
	
	@Resource ICreditReportService creditReportService;
	private static final Logger log = LoggerFactory
			.getLogger(CreditReportController.class);
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean creditReportList(HttpSession httpSession,
			@RequestBody CreditReportListReqBean reqBean, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		if(paramMap.get("creditType").equals("0")) {
			respBean = creditReportService.getCorpCreditReportList(paramMap,page);
		}
		if(paramMap.get("creditType").equals("1")){
			respBean = creditReportService.getShareHolderCreditReportList(paramMap,page);
		}
		
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean creditReportAdd(HttpSession httpSession,
			@RequestBody CreditReportAddReqBean reqBean, BindingResult bindingResult) throws IOException{
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
		paramMap.put("relaCorpId", ScfCacheDict.relaCorpIdMap.get(reqBean.getCorpId()));
		respBean = creditReportService.addCreditReport(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean creditReportDelete(HttpSession httpSession,
			@RequestBody CreditReportDelReqBean reqBean, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = creditReportService.deleteCreditReport(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean creditReportUpdate(HttpSession httpSession,
			@RequestBody CreditReportUpdateReqBean reqBean, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = creditReportService.updateCreditReport(paramMap);
		log.debug("CreditReport respBean : {}", respBean);
		return respBean;
	}
	
}
