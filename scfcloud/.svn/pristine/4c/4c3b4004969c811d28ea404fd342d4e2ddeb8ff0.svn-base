package com.ut.scf.dao.sys;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.CorpInfo;

public interface ICorpDao {

    int insertCorp(CorpInfo corpInfo);
    
    List<Map<String, Object>> getCorpInfoList(Map<String, Object> paramMap,PageInfoBean page);
    
    List<Map<String, Object>> getCorpInfoList(Map<String, Object> paramMap);

    int updateCorpInfoByPrimaryKey(Map<String, Object> paramMap);
    
    int countCorpByName(Map<String, Object> paramMap);
    
    int countDeptByCorpId(String corpId);

	List<Map<String, String>> selectAllRelaCorp();
	
	List<Map<String, Object>> getSupplierInfoList(Map<String, Object> paramMap,PageInfoBean page);

	List<Map<String, Object>> getSupplierInfoList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> queryCoreEnterpriseList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> queryCoreEnterpriseList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getPackageCorpList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getSupplierByPush(Map<String, Object> paramMap);
	
	int updateSupplierByPush(List<Map<String, Object>> list);
	
	int countCorpByOrgnNum(Map<String, Object> paramMap);
	
	String getSupplierIdByOrgn(Map<String, Object> paramMap);
}