package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface FlowGuaranteeInfoMapper {
    
    List<Map<String, Object>> selectFlowGuaranteeInfo(Map<String, Object> paramMap, PageInfoBean page);
    
	int insertFlowGuaranteeInfo(Map<String, Object> paramMap);

	int deleteFlowGuaranteeInfo(String grtId);

	int updateFlowGuaranteeInfo(Map<String, Object> paramMap);
}