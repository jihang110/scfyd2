package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;
/**
 * 
 * @author lzy
 *
 */
public 	interface ITaxReturnsService {
	public BaseRespBean addTaxReturns(Map<String, Object> paramMap);

	public BaseRespBean updateTaxReturns(Map<String, Object> paramMap);

	public BaseRespBean deleteTaxReturns(String recUid);
	
	public BaseRespBean getTaxReturnsList(Map<String, Object> paramMap, PageInfoBean page);
	
	
}
