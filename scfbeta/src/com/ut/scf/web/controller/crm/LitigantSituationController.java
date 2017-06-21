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
import com.ut.scf.reqbean.crm.LitigantSituationAddReqBean;
import com.ut.scf.reqbean.crm.LitigantSituationListReqBean;
import com.ut.scf.reqbean.crm.LitigantSituationUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ILitigantSituationService;

/**
 * 诉讼情况表控制类
 * @author Liailin
 *
 */
@Controller
@RequestMapping("/litigantSituation")
public class LitigantSituationController {

	@Resource
	private ILitigantSituationService litigantSituationService;
	
	private static final Logger log = LoggerFactory
			.getLogger(LitigantSituationController.class);
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean litigantSituationList(
			HttpSession httpSession,
			@RequestBody LitigantSituationListReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		// 获取用户信息
				String corpIdSession = (String) httpSession
						.getAttribute(ScfConsts.SESSION_CORP_ID);
				log.debug("corpIdSession: {}", corpIdSession);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		return litigantSituationService.getLitigantSituationList(paramMap, page);
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean litigantSituationAdd(
			HttpSession httpSession,
			@Valid @RequestBody LitigantSituationAddReqBean reqBean,
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
		paramMap.put("createTime", new Date());
		respBean= litigantSituationService.addLitigantSituation(paramMap);
		log.debug("litigantSituationAdd: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean litigantSituationUpdate(
			@Valid @RequestBody LitigantSituationUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean=litigantSituationService.updateLitigantSituation(paramMap);
		log.debug("litigantSituationUpdate: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean litigantSituationDelete(
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		respBean = litigantSituationService.deleteLitigantSituation(reqBean.getRecUid());
		log.debug("litigantSituationDelete: {}", respBean);
		return respBean;
	}
}
