package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface FlowProjectMapper {
    
    List<Map<String, Object>> selectFlowProjectList(Map<String, Object> paramMap, PageInfoBean page);
    
    List<Map<String, Object>> selectFlowProjectList(Map<String, Object> paramMap);
    
    Map<String, Object> selectFlowProject(Map<String, Object> paramMap);
    
    List<Map<String, Object>> selectFlowProjectListByCorpId(Map<String, Object> paramMap, PageInfoBean page);

	int insertFlowProject(Map<String, Object> paramMap);

	int deleteFlowProject(String recUid);

	int updateFlowProject(Map<String, Object> paramMap);
	
	int updateFlowProjectByPackage(Map<String, Object> paramMap);
}