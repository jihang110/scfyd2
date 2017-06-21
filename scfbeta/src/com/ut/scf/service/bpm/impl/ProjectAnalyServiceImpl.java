package com.ut.scf.service.bpm.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.bpm.IProjectAnalyDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IProjectAnalyService;

@Service("projectAnalyService")
public class ProjectAnalyServiceImpl implements IProjectAnalyService {
	private static final Logger log = LoggerFactory.getLogger(ProjectAnalyServiceImpl.class);
	@Resource IProjectAnalyDao projectAnalyDao;
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertProjectAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		String proAnalyId = ScfUUID.generate();
		paramMap.put("proAnalyId", proAnalyId);
		int insertNum = projectAnalyDao.insertProjectAnaly(paramMap);
		log.debug("insert ProjectAnaly num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		System.out.println(proAnalyId);
		return respBean;
	}

}
