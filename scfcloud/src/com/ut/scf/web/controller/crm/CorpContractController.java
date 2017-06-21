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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.reqbean.crm.CorpContractDeleteReqBean;
import com.ut.scf.reqbean.crm.CorpContractListReqBean;
import com.ut.scf.reqbean.crm.CorpContractUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICorpContractService;

/**
 * 客户管理/供应商信息
 * 业务信息模块（招/投标合同和贸易/销售合同）
 * @author zhangjj
 *
 */
@Controller
@RequestMapping("/corpContract")
public class CorpContractController {
	
	private static final Logger log = LoggerFactory
			.getLogger(CorpEvalController.class);
	
	@Resource
	private ICorpContractService corpContractService;
	
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpContractUpdate(
			HttpSession httpSession,
			@Valid @RequestBody CorpContractUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		respBean = corpContractService.updateCorpContract(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpContractDelete(
			HttpSession httpSession,
			@Valid @RequestBody CorpContractDeleteReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		respBean = corpContractService.deleteCorpContract(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpContractListBid(
			HttpSession httpSession,
			@RequestBody CorpContractListReqBean reqBean)
			throws IOException {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		return corpContractService.getcorpContractList(paramMap, page);
	}
	
//	@RequestMapping(value = "/listSale", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
//	public @ResponseBody BaseRespBean corpContractListSale(
//			HttpSession httpSession,
//			@RequestBody CorpContractListReqBean reqBean)
//			throws IOException {
//		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
//		
//		PageInfoBean page = new PageInfoBean();
//		page.setPageNumber(reqBean.getPageNumber());
//		page.setPageSize(reqBean.getPageSize());
//		return corpContractService.getcorpContractList(paramMap, page);
//	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean corpContractAdd(
			HttpSession httpSession,
			@Valid @RequestBody CorpContractUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("conId", ScfUUID.generate());
		
		respBean = corpContractService.insertCorpContract(paramMap);
		return respBean;
	}
	
}
