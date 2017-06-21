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
import com.ut.scf.dao.bpm.FlowGuaranteeInfoMapper;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.bpm.IFlowGuaranteeInfoService;

@Service("flowGuaranteeInfoService")
public class FlowGuaranteeInfoServiceImpl implements IFlowGuaranteeInfoService {
	private static final Logger log = LoggerFactory.getLogger(FlowGuaranteeInfoServiceImpl.class);
	
	@Resource private FlowGuaranteeInfoMapper flowGuaranteeInfoMapper;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFlowGuaranteeInfoList(Map<String, Object> paramMap,PageInfoBean page) {

			List<Map<String, Object>> list = flowGuaranteeInfoMapper.selectFlowGuaranteeInfo(paramMap,page);
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFlowGuaranteeInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("grtId", ScfUUID.generate());
		int insertNum = flowGuaranteeInfoMapper.insertFlowGuaranteeInfo(paramMap);
		log.debug("insert FlowGuaranteeInfo num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFlowGuaranteeInfo(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = flowGuaranteeInfoMapper.updateFlowGuaranteeInfo(paramMap);
		log.debug("update FlowGuaranteeInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFlowGuaranteeInfo(String grtId) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = flowGuaranteeInfoMapper.deleteFlowGuaranteeInfo(grtId);
		log.debug("delete FlowGuaranteeInfo num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

}
