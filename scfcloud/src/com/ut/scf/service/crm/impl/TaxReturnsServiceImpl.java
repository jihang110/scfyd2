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
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.ITaxReturnsDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ITaxReturnsService;
/**
 * 
 * @author lzy
 *
 */
@Service("taxReturnsService")
public class TaxReturnsServiceImpl implements ITaxReturnsService {
	private static final Logger log = LoggerFactory
			.getLogger(CashFlowServiceImpl.class);
	@Resource
	private ITaxReturnsDao taxreturnsDao;
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addTaxReturns(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("vatId", ScfUUID.generate());
		int insertNum = taxreturnsDao.insert(paramMap);
		log.debug("insert taxloadcount num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateTaxReturns(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = taxreturnsDao.updateByPrimaryKey(paramMap);
		log.debug("update orgn num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteTaxReturns(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = taxreturnsDao.deleteByPrimaryKey(recUid);
		log.debug("insert orgn num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
		
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getTaxReturnsList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = taxreturnsDao.selectTaxReturnsList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
}
