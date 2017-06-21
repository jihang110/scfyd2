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
import com.ut.scf.dao.bpm.FlowRiskCtrlMapper;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.bpm.IFlowRiskCtrlService;

@Service("flowRiskCtrlService")
public class FlowRiskCtrlServiceImpl implements IFlowRiskCtrlService {
	private static final Logger log = LoggerFactory.getLogger(FlowRiskCtrlServiceImpl.class);
	
	@Resource private FlowRiskCtrlMapper flowRiskCtrlMapper;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFlowRiskCtrlList(Map<String, Object> paramMap,PageInfoBean page) {

			List<Map<String, Object>> list = flowRiskCtrlMapper.selectFlowRiskCtrl(paramMap,page);
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFlowRiskCtrl(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("rskctId", ScfUUID.generate());
		int insertNum = flowRiskCtrlMapper.insertFlowRiskCtrl(paramMap);
		log.debug("insert FlowRiskCtrl num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFlowRiskCtrl(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = flowRiskCtrlMapper.updateFlowRiskCtrl(paramMap);
		log.debug("update FlowRiskCtrl num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFlowRiskCtrl(String rskctId) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = flowRiskCtrlMapper.deleteFlowRiskCtrl(rskctId);
		log.debug("delete FlowRiskCtrl num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
