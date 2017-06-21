package com.ut.scf.service.finance.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.finance.IReceiveAccountDao;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.reqbean.xml.AccountsInfoReqXmlBean;
import com.ut.scf.reqbean.xml.AccountsReceivableReqBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.xml.AccReceRespXmlBean;
import com.ut.scf.respbean.xml.AccountsReceivableRespBean;
import com.ut.scf.respbean.xml.BaseInfoRespXmlBean;
import com.ut.scf.respbean.xml.LoanListRespXmlBean;
import com.ut.scf.respbean.xml.LoanRespBean;
import com.ut.scf.service.finance.IReceiveAccountService;
@Service("receiveAccountService")
public class ReceiveAccountServiceImpl implements IReceiveAccountService {
	private static final Logger log = LoggerFactory
			.getLogger(ReceiveAccountServiceImpl.class);
	@Resource
	private IReceiveAccountDao receiveAccountDao;
	@Resource private ICorpDao corpDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getReceiveAccountList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = receiveAccountDao.selectReceiveAccountList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addReceiveAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = receiveAccountDao.insertReceiveAccount(paramMap);
		log.debug("insert receiveAccount num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateReceiveAccount(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = receiveAccountDao.updateReceiveAccount(paramMap);
		log.debug("update receiveAccount num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteReceiveAccount(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = receiveAccountDao.deleteReceiveAccount(recUid);
		log.debug("delete receiveAccount num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public AccountsReceivableRespBean insertAccount(AccountsReceivableReqBean reqBean) {
		List<Map<String, Object>> list = new ArrayList<>();
		for (AccountsInfoReqXmlBean bean : reqBean.getBeans()) {			
			Map<String, Object> paramMap = BeanUtil.beanToMap(bean);
			paramMap.put("sysType", 5);
			paramMap.put("orgnNum", bean.getCustOrgnCode());
			
			String corpId = corpDao.getSupplierIdByOrgn(paramMap);
			log.debug("corpId is {}", corpId);
			
			if (StringUtils.isNotBlank(corpId)) {
				paramMap.put("recUid", ScfUUID.generate());
				paramMap.put("corpId", corpId);
				paramMap.put("contractNo", bean.getContractNum());
				paramMap.put("invoiceNo", bean.getBillNum());
				paramMap.put("invoiceAmount", bean.getBillBalanceAmt());
				paramMap.put("invoiceDate", bean.getBillDate());
				paramMap.put("netDay", bean.getCreditPeriod());
				paramMap.put("isRead", bean.getIsRead());
				paramMap.put("createUserId", reqBean.getUserId());
				
				list.add(paramMap);
			}
		}
		
		int insertNum = 0;
		if (CollectionUtils.isNotEmpty(list)) {
			insertNum = receiveAccountDao.insertSelectiveByList(list);
			log.debug("insert receiveAccount num {}", insertNum);
		}
		AccountsReceivableRespBean respBean = new AccountsReceivableRespBean();
		respBean.setReturnCode("00000");
		respBean.setReturnMsg("接口调用成功");
		AccReceRespXmlBean xmlBean = new AccReceRespXmlBean();
		xmlBean.setReceiveState(true);
		
		if (insertNum <= 0) {
			log.error("平台账款信息保存失败");
			respBean.setReturnCode("00004");
			respBean.setReturnMsg("生成平台账款信息失败");
			xmlBean.setReceiveState(false);
			xmlBean.setFailReason("生成平台账款信息失败");
		}
		respBean.setBean(xmlBean);

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public LoanRespBean getSupport(BaseQueryReqBean reqBean) {
		Map<String, Object> paramMap = new HashMap<>();
		long start = reqBean.getBean().getStartSerialNum();
		int size = 50;
		paramMap.put("sysType", 5);
		paramMap.put("orgnNum", reqBean.getBean().getRequestOrgnNum());
		paramMap.put("size", size);
		paramMap.put("startNum", start - 1L);
		
		List<Map<String, Object>> list = receiveAccountDao.getSupportByPush(paramMap);
		log.debug("receive account list : {}", list);
		
		LoanRespBean respBean = new LoanRespBean();
		respBean.setReturnCode("00000");
		respBean.setReturnMsg("接口调用成功");
		
		BaseInfoRespXmlBean<LoanListRespXmlBean> xmlBean = new BaseInfoRespXmlBean<>();
		if (CollectionUtils.isNotEmpty(list)) {
			List<LoanListRespXmlBean> beans = new ArrayList<>();
			for (Map<String, Object> beanMap : list) {
				if (size > 0) {
					beanMap.put("serialNum", start++);
					--size;
					LoanListRespXmlBean bean = new LoanListRespXmlBean();
					BeanUtil.mapToBean(beanMap, bean);
					beans.add(bean);
				}
			}
			xmlBean.setMaxSerialNum(start - 1L);
			xmlBean.setBeans(beans);
			
			int updateNum = receiveAccountDao.updateSupportByPush(list);
			log.debug("update push receive account num {}", updateNum);
			if (updateNum <= 0) {
				log.error("更新支用信息失败");
				xmlBean.setMaxSerialNum(reqBean.getBean().getStartSerialNum() - 1L);
				respBean.setReturnCode("00005");
				respBean.setReturnMsg("更新支用信息失败");
			}
		} else {
			xmlBean.setMaxSerialNum(0L);
		}
		respBean.setBean(xmlBean);
		return respBean;
	}
}
