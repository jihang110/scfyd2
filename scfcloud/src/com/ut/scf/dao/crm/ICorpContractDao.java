package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICorpContractDao {
	
	List<Map<String, Object>> selectCorpContractList(Map<String, Object> paramMap,
			PageInfoBean page);
	
	int insertCorpContract(Map<String, Object> paramMap);

	int updateCorpContract(Map<String, Object> paramMap);
	
	int deleteCorpContract(Map<String, Object> paramMap);
}