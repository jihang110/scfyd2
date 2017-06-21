package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

public interface FlowCntractMapper {
    
    int insertCnt(Map<String, Object> paramMap);
    
//    List<Map<String, Object>> selectCntList(Map<String, Object> paramMap, PageInfoBean page);

   	int deleteCnt(String recUid);

   	int updateCnt(Map<String, Object> paramMap);
   	
   	List<Map<String, Object>> getContractByPush(Map<String, Object> paramMap);
   	
   	int updateContractByPush(List<Map<String, Object>> list);
}