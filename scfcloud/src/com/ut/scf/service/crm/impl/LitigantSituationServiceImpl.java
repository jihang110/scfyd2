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
import com.ut.scf.dao.crm.ILitigantSituationDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ILitigantSituationService;

@Service("litigantSituationService")
public class LitigantSituationServiceImpl implements ILitigantSituationService {
	private static final Logger log = LoggerFactory.getLogger(LitigantSituationServiceImpl.class);
	
	@Resource
	private ILitigantSituationDao litigantSituationDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getLitigantSituationList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String,Object>> list=litigantSituationDao.selectLitigantSituationList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addLitigantSituation(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum=litigantSituationDao.insertSelective(paramMap);
		log.debug("insert CustomerBankStream num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateLitigantSituation(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum=litigantSituationDao.updateByPrimaryKeySelective(paramMap);
		log.debug("update CustomerBankStream num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteLitigantSituation(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum=litigantSituationDao.deleteByPrimaryKey(recUid);
		log.debug("delete CustomerBankStream num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
