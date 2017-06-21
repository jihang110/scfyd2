package com.ut.scf.web.controller.xml;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ut.scf.core.util.JsonUtil;
import com.ut.scf.pojo.SysInterfaceLog;
import com.ut.scf.reqbean.xml.AccountsReceivableReqBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.reqbean.xml.BaseReqXmlBean;
import com.ut.scf.reqbean.xml.StandardIndexReqBean;
import com.ut.scf.respbean.xml.AccountsReceivableRespBean;
import com.ut.scf.respbean.xml.BaseRespXmlBean;
import com.ut.scf.respbean.xml.ContractRespBean;
import com.ut.scf.respbean.xml.LoanRespBean;
import com.ut.scf.respbean.xml.RegistrationRespBean;
import com.ut.scf.respbean.xml.StandardIndexRespBean;
import com.ut.scf.service.asset.IStandardIndexService;
import com.ut.scf.service.bpm.IFlowCntractService;
import com.ut.scf.service.finance.IReceiveAccountService;
import com.ut.scf.service.sys.ICorpService;
import com.ut.scf.service.sys.IInterfaceLogService;

@Controller
public class OuterInterfaceController {
	private static final Logger log = LoggerFactory.getLogger(OuterInterfaceController.class);
	
	@Resource private ICorpService corpService;
	@Resource private IStandardIndexService standardIndexService;
	@Resource private IFlowCntractService flowCntractService;
	@Resource private IReceiveAccountService receiveAccountService;
	@Resource private IInterfaceLogService interfaceLogService;
	
	@RequestMapping(value = "/reginfo")
	public @ResponseBody RegistrationRespBean getRegistration(@RequestBody BaseQueryReqBean reqBean) {
		log.info("生成报名信息请求: {}", reqBean);
		try {
			insertInfLog(reqBean, JsonUtil.writeValueAsString(reqBean));
		} catch (JsonProcessingException e) {
			log.error("接口请求参数JSON失败, {}", e.getMessage());
		}

		// 查询没有同步的指定的核心企业(企业的组织机构代码)的供应商
		RegistrationRespBean respBean = corpService.supplierByPush(reqBean);
		respBean.setRequestSn(reqBean.getRequestSn());
		respBean.setCustId(reqBean.getCustId());
		respBean.setTxCode(reqBean.getTxCode());
		respBean.setLanguage(reqBean.getLanguage());
		
//		RegistrationRespBean respBean = new RegistrationRespBean();
//		respBean.setRequestSn(reqBean.getRequestSn());
//		respBean.setCustId(reqBean.getCustId());
//		respBean.setTxCode(reqBean.getTxCode());
//		respBean.setReturnCode("000000");
//		respBean.setReturnMsg("操作成功");
//		respBean.setLanguage(reqBean.getLanguage());
//		BaseInfoRespXmlBean<RegListRespXmlBean> infoBean = new BaseInfoRespXmlBean<RegListRespXmlBean>();
//		infoBean.setMaxSerialNum(50L);
//		List<RegListRespXmlBean> list = new ArrayList<>();
//		for (Long i = 0L; i < 5; i++) {
//			RegListRespXmlBean bean = new RegListRespXmlBean();
//			bean.setCustomerAppSerialNum(i);
//			bean.setCustomerName("测试" + i);
//			bean.setAppNum("DFM000" + i);
//			list.add(bean);
//		}
//		infoBean.setBeans(list);
//		respBean.setBean(infoBean);
		
		try {
			insertInfLog(respBean, JsonUtil.writeValueAsString(respBean));
		} catch (JsonProcessingException e) {
			log.error("接口响应参数JSON失败, {}", e.getMessage());
		}
		log.info("生成报名信息响应: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/stdinfo")
	public @ResponseBody StandardIndexRespBean insertStandardIndex(@RequestBody StandardIndexReqBean reqBean) {
		log.info("标准指标信息请求: {}", reqBean);
		try {
			insertInfLog(reqBean, JsonUtil.writeValueAsString(reqBean));
		} catch (JsonProcessingException e) {
			log.error("接口请求参数JSON失败, {}", e.getMessage());
		}
		
		StandardIndexRespBean respBean = standardIndexService.insertStandard(reqBean);
		respBean.setRequestSn(reqBean.getRequestSn());
		respBean.setCustId(reqBean.getCustId());
		respBean.setTxCode(reqBean.getTxCode());
		respBean.setLanguage(reqBean.getLanguage());
		
		try {
			insertInfLog(respBean, JsonUtil.writeValueAsString(respBean));
		} catch (JsonProcessingException e) {
			log.error("接口响应参数JSON失败, {}", e.getMessage());
		}
		log.info("标准指标信息响应: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/continfo")
	public @ResponseBody ContractRespBean getContract(@RequestBody BaseQueryReqBean reqBean) {
		log.info("生效合同信息请求: {}", reqBean);
		try {
			insertInfLog(reqBean, JsonUtil.writeValueAsString(reqBean));
		} catch (JsonProcessingException e) {
			log.error("接口请求参数JSON失败, {}", e.getMessage());
		}
		
		ContractRespBean respBean = flowCntractService.getContractByPush(reqBean);
		respBean.setRequestSn(reqBean.getRequestSn());
		respBean.setCustId(reqBean.getCustId());
		respBean.setTxCode(reqBean.getTxCode());
		respBean.setLanguage(reqBean.getLanguage());
				
		try {
			insertInfLog(respBean, JsonUtil.writeValueAsString(respBean));
		} catch (JsonProcessingException e) {
			log.error("接口响应参数JSON失败, {}", e.getMessage());
		}
		log.info("生效合同信息响应: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/accinfo")
	public @ResponseBody AccountsReceivableRespBean insertAccountsReceivable(@RequestBody AccountsReceivableReqBean reqBean) {
		log.info("平台账款信息请求: {}", reqBean);
		try {
			insertInfLog(reqBean, JsonUtil.writeValueAsString(reqBean));
		} catch (JsonProcessingException e) {
			log.error("接口请求参数JSON失败, {}", e.getMessage());
		}
		
		AccountsReceivableRespBean respBean = receiveAccountService.insertAccount(reqBean);
		respBean.setRequestSn(reqBean.getRequestSn());
		respBean.setCustId(reqBean.getCustId());
		respBean.setTxCode(reqBean.getTxCode());
		respBean.setLanguage(reqBean.getLanguage());
				
		try {
			insertInfLog(respBean, JsonUtil.writeValueAsString(respBean));
		} catch (JsonProcessingException e) {
			log.error("接口响应参数JSON失败, {}", e.getMessage());
		}
		log.info("平台账款信息响应: {}", respBean);
		return respBean;
	}
	
	@RequestMapping(value = "/loaninfo")
	public @ResponseBody LoanRespBean getLoan(@RequestBody BaseQueryReqBean reqBean) {
		log.info("支用信息请求: {}", reqBean);
		try {
			insertInfLog(reqBean, JsonUtil.writeValueAsString(reqBean));
		} catch (JsonProcessingException e) {
			log.error("接口请求参数JSON失败, {}", e.getMessage());
		}
		
		LoanRespBean respBean = receiveAccountService.getSupport(reqBean);
		respBean.setRequestSn(reqBean.getRequestSn());
		respBean.setCustId(reqBean.getCustId());
		respBean.setTxCode(reqBean.getTxCode());
		respBean.setLanguage(reqBean.getLanguage());
				
		try {
			insertInfLog(respBean, JsonUtil.writeValueAsString(respBean));
		} catch (JsonProcessingException e) {
			log.error("接口响应参数JSON失败, {}", e.getMessage());
		}
		log.info("支用信息响应: {}", respBean);
		return respBean;
	}
	
	@Async
	private void insertInfLog(BaseReqXmlBean reqBean, String string) {
		SysInterfaceLog log = new SysInterfaceLog();
		log.setRequestSn(reqBean.getRequestSn());
		log.setCustId(reqBean.getCustId());
		log.setUserId(reqBean.getUserId());
		log.setPassword(reqBean.getPassword());
		log.setTxCode(reqBean.getTxCode());
		log.setLanguage(reqBean.getLanguage());
		log.setRequsetParam(string);
		interfaceLogService.insertLog(log);
	}

	@Async
	private void insertInfLog(BaseRespXmlBean respBean, String string) {
		SysInterfaceLog log = new SysInterfaceLog();
		log.setRequestSn(respBean.getRequestSn());
		log.setCustId(respBean.getCustId());
		log.setTxCode(respBean.getTxCode());
		log.setReturnCode(respBean.getReturnCode());
		log.setReturnMsg(respBean.getReturnMsg());
		log.setLanguage(respBean.getLanguage());
		log.setResponseParam(string);
		interfaceLogService.updateLog(log);
	}
}
