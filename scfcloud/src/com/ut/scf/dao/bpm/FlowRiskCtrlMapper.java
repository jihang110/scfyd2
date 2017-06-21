package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface FlowRiskCtrlMapper {
    
    List<Map<String, Object>> selectFlowRiskCtrl(Map<String, Object> paramMap, PageInfoBean page);
    
	int insertFlowRiskCtrl(Map<String, Object> paramMap);

	int deleteFlowRiskCtrl(String rskctId);

	int updateFlowRiskCtrl(Map<String, Object> paramMap);
}