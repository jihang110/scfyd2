package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IExternalGuaranteeService {
	public BaseRespBean getExternalGuaranteeList(Map<String ,Object> paramMap , PageInfoBean page);
	
	public BaseRespBean addExternalGuarantee(Map<String ,Object> paramMap);
	
	public BaseRespBean updateExternalGuarantee(Map<String ,Object> paramMap);
	
	public BaseRespBean deleteExternalGuarantee(String recUid);
}
