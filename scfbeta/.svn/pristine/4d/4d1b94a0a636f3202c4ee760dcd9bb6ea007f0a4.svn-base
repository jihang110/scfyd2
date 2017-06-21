package com.ut.scf.web.socket;

import java.nio.charset.StandardCharsets;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;

import com.ut.scf.core.util.JaxbUtil;
import com.ut.scf.pojo.SysInterfaceLog;
import com.ut.scf.reqbean.xml.AccountsReceivableReqBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.reqbean.xml.ReqBean;
import com.ut.scf.reqbean.xml.StandardIndexReqBean;
import com.ut.scf.respbean.xml.AccountsReceivableRespBean;
import com.ut.scf.respbean.xml.ContractRespBean;
import com.ut.scf.respbean.xml.LoanRespBean;
import com.ut.scf.respbean.xml.RegistrationRespBean;
import com.ut.scf.respbean.xml.RespBean;
import com.ut.scf.respbean.xml.StandardIndexRespBean;
import com.ut.scf.service.asset.IStandardIndexService;
import com.ut.scf.service.bpm.IFlowCntractService;
import com.ut.scf.service.finance.IReceiveAccountService;
import com.ut.scf.service.sys.ICorpService;
import com.ut.scf.service.sys.IInterfaceLogService;

public class EchoService {
	private static final Logger log = LoggerFactory.getLogger(EchoService.class);
	
	@Resource private ICorpService corpService;
	@Resource private IStandardIndexService standardIndexService;
	@Resource private IFlowCntractService flowCntractService;
	@Resource private IReceiveAccountService receiveAccountService;
	@Resource private IInterfaceLogService interfaceLogService;

	public byte[] receive(byte[] bytes) {
		String input = new String(bytes, StandardCharsets.UTF_8);
		log.info("socket接收信息: {}", input);
		ReqBean bean = JaxbUtil.converyToJavaBean(input, ReqBean.class);
		insertInfLog(bean, input);
		String output = null;
		RespBean baseBean = null;
		switch (bean.getTxCode()) {
		case "6W5501":
			BaseQueryReqBean reqBean = JaxbUtil.converyToJavaBean(input, BaseQueryReqBean.class);
			RegistrationRespBean respBean = corpService.supplierByPush(reqBean);
			respBean.setRequestSn(reqBean.getRequestSn());
			respBean.setCustId(reqBean.getCustId());
			respBean.setTxCode(reqBean.getTxCode());
			respBean.setLanguage(reqBean.getLanguage());
			output = JaxbUtil.convertToXml(respBean);
			baseBean = JaxbUtil.converyToJavaBean(output, RespBean.class);
			break;
		case "6W5502":
			StandardIndexReqBean reqBean2 = JaxbUtil.converyToJavaBean(input, StandardIndexReqBean.class);
			StandardIndexRespBean respBean2 = standardIndexService.insertStandard(reqBean2);
			respBean2.setRequestSn(reqBean2.getRequestSn());
			respBean2.setCustId(reqBean2.getCustId());
			respBean2.setTxCode(reqBean2.getTxCode());
			respBean2.setLanguage(reqBean2.getLanguage());
			output = JaxbUtil.convertToXml(respBean2);
			baseBean = JaxbUtil.converyToJavaBean(output, RespBean.class);
			break;
		case "6W5505":
			BaseQueryReqBean reqBean3 = JaxbUtil.converyToJavaBean(input, BaseQueryReqBean.class);
			ContractRespBean respBean3 = flowCntractService.getContractByPush(reqBean3);
			respBean3.setRequestSn(reqBean3.getRequestSn());
			respBean3.setCustId(reqBean3.getCustId());
			respBean3.setTxCode(reqBean3.getTxCode());
			respBean3.setLanguage(reqBean3.getLanguage());
			output = JaxbUtil.convertToXml(respBean3);
			baseBean = JaxbUtil.converyToJavaBean(output, RespBean.class);
			break;
		case "6W5574":
			AccountsReceivableReqBean reqBean4 = JaxbUtil.converyToJavaBean(input, AccountsReceivableReqBean.class);
			AccountsReceivableRespBean respBean4 = receiveAccountService.insertAccount(reqBean4);
			respBean4.setRequestSn(reqBean4.getRequestSn());
			respBean4.setCustId(reqBean4.getCustId());
			respBean4.setTxCode(reqBean4.getTxCode());
			respBean4.setLanguage(reqBean4.getLanguage());
			output = JaxbUtil.convertToXml(respBean4);
			baseBean = JaxbUtil.converyToJavaBean(output, RespBean.class);
			break;
		case "6W5528":
			BaseQueryReqBean reqBean5 = JaxbUtil.converyToJavaBean(input, BaseQueryReqBean.class);
			LoanRespBean respBean5 = receiveAccountService.getSupport(reqBean5);
			respBean5.setRequestSn(reqBean5.getRequestSn());
			respBean5.setCustId(reqBean5.getCustId());
			respBean5.setTxCode(reqBean5.getTxCode());
			respBean5.setLanguage(reqBean5.getLanguage());
			output = JaxbUtil.convertToXml(respBean5);
			baseBean = JaxbUtil.converyToJavaBean(output, RespBean.class);
			break;
		}
		if (baseBean != null) {
			insertInfLog(baseBean, output);
		} else {
			log.error("socket error");
			throw new RuntimeException("Failure ocket Interface");
		}
		log.info("socket返回信息: {}", output);
		return output.getBytes(StandardCharsets.UTF_8);
	}

	@Async
	private void insertInfLog(ReqBean reqBean, String string) {
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
	private void insertInfLog(RespBean respBean, String string) {
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
