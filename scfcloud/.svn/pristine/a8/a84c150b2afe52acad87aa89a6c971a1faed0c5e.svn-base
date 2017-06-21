package com.ut.scf.service.crm.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.IBankReconciliationDao;
import com.ut.scf.pojo.BankReconciliation;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IBankReconciliationService;
/**
 * 
 * @author Yuancy
 *
 */
@Service("bankReconciliationService")
public class BankReconciliationServiceImpl implements IBankReconciliationService{

	private static final Logger log = LoggerFactory
			.getLogger(BankReconciliationServiceImpl.class);
	
	@Resource
	IBankReconciliationDao bankReconciliationDao;
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addRec(BankReconciliation record) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		record.setRecId(ScfUUID.generate());
		int insertNum = bankReconciliationDao.insert(record);
		log.debug("insert bankReconcilia num {}", insertNum);
		
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteRec(String recId) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = bankReconciliationDao.deleteByPrimaryKey(recId);
		log.debug("update role count {}", deleteNum);
		if(deleteNum <= 0){
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateRec(BankReconciliation record) {
		BaseRespBean respBean = new BaseRespBean();
		BankReconciliation bankReconciliation = bankReconciliationDao.selectByPrimaryKey(record.getRecId());
		if(bankReconciliation == null){
			respBean.setResult(ErrorCodeEnum.ROLE_NOT_EXIST);
			return respBean;
		}
		
		int updateNum = bankReconciliationDao.updateByPrimaryKeySelective(record);
		log.debug("update update num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = bankReconciliationDao.bankReconciliationList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

}
