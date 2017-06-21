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
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.pojo.BankReconciliation;
import com.ut.scf.reqbean.crm.BankRecListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IBankReconciliationService;

/**
 * 
 * @author Yuancy
 *
 */

@Controller
@RequestMapping("/bankRec")
public class BankRecController {
	@Resource
	IBankReconciliationService bankReconciliationService;
	
	private static final Logger log = LoggerFactory
			.getLogger(BankRecController.class);
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean bankRecList(HttpSession httpSession,
			@RequestBody BankRecListReqBean bankRecReq, BindingResult bindingResult) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(bankRecReq);
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
		// 保理商类型只能查看自己的客户企业数据，平台类型不限制，其他类型只能查看自己企业数据
		// 保理商类型下，保理商管理员可以查看所有数据，其他角色只能查看自己的业务数据
//		if (roleTypeSession == ScfBizConsts.ROLE_TYPE_FACTOR) {
//			paramMap.put("relaCorpId", corpIdSession);
//			if (!roleIdSession.equals(ScfBizConsts.ROLE_ID_FACTOR_ADMIN)) {
//				paramMap.put("createUserId", userIdSession);
//			}
//			List<String> userCorpList = ScfCacheDict.userCorpMap.get(userIdSession);
//			String userCorpStr = ScfBizUtil.listToSQLStr(userCorpList);
//			paramMap.put("userCorpList", userCorpStr);
//		} else if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT) {
//			paramMap.put("corpId", corpIdSession);
//		}
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(bankRecReq.getPageSize());
		respBean = bankReconciliationService.getCorpInfoList(paramMap,page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean BankRecAdd(HttpSession httpSession,
			@RequestBody BankReconciliation bankRecAddReq, BindingResult bindingResult) throws IOException{
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
		respBean = bankReconciliationService.addRec(bankRecAddReq);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean bankRecDelete(HttpSession httpSession,
			@RequestBody BankReconciliation bankDeleteRecReq, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = bankReconciliationService.deleteRec(bankDeleteRecReq.getRecId());
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean bankRecUpdate(HttpSession httpSession,
			@RequestBody BankReconciliation bankModRecReq, BindingResult bindingResult) throws IOException{
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		respBean = bankReconciliationService.updateRec(bankModRecReq);
		log.debug("BankRec respBean : {}", bankModRecReq);
		return respBean;
	}
}
