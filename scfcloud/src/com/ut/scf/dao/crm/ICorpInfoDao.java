package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;


public interface ICorpInfoDao {

	List<Map<String, Object>> selectByCorpId(Map<String, Object> paramMap);
	
	int updateByCorpId(Map<String, Object> paramMap);
}
