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
import com.ut.scf.dao.crm.ICorpInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICorpInfoService;

/**
 * 
 * @author zhangjj
 *
 */
@Service("corpInfoService")
public class CorpInfoServiceImpl implements ICorpInfoService {
	
	private static final Logger log = LoggerFactory.getLogger(CorpInfoServiceImpl.class);
	
	@Resource
	private ICorpInfoDao corpInfoDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCorpInfoBaseByCorpId(Map<String, Object> paramMap) {
		//paramMap.put("corpId", "corp00001");
		List<Map<String, Object>> list = corpInfoDao.selectByCorpId(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorpInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = corpInfoDao.updateByCorpId(paramMap);
		log.debug("update corpInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
