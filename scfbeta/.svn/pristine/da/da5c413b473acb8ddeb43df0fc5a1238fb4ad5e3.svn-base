package com.ut.scf.service.bpm.impl;

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
import com.ut.scf.dao.bpm.FlowProjectMapper;
import com.ut.scf.dao.bpm.IPriProjectDao;
import com.ut.scf.dao.finance.IRecManageDao;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.bpm.IFlowProjectService;

@Service("flowProjectService")
public class FlowProjectServiceImpl implements IFlowProjectService {
	private static final Logger log = LoggerFactory.getLogger(FlowProjectServiceImpl.class);
	
	@Resource private FlowProjectMapper flowProjectMapper;
	@Resource private IPriProjectDao priProjectDao;
	@Resource private IRecManageDao recManageDao;
	@Resource private ICorpDao corpDao;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFlowProjectList(Map<String, Object> paramMap,PageInfoBean page) {

		// 是否分页，0：否，1：是
		if ((Integer)paramMap.get("isPage") == 1) {
			List<Map<String, Object>> list = flowProjectMapper.selectFlowProjectList(paramMap,page);
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = flowProjectMapper.selectFlowProjectList(paramMap);
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFlowProjectListByCorpId(Map<String, Object> paramMap,PageInfoBean page) {
		List<Map<String, Object>> list = flowProjectMapper.selectFlowProjectListByCorpId(paramMap,page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFlowProject(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("proId", ScfUUID.generate());
		int insertNum = flowProjectMapper.insertFlowProject(paramMap);
		log.debug("insert FlowProject num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFlowProject(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = flowProjectMapper.updateFlowProject(paramMap);
		log.debug("update FlowProject num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFlowProject(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = flowProjectMapper.deleteFlowProject(recUid);
		log.debug("delete FlowProject num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
