package com.ut.scf.service.bpm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.xml.ContractRespBean;

public interface IFlowCntractService {
	
	public BaseRespBean  getFlowCntractList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean  insertFlowCntract(Map<String, Object> paramMap);

	public BaseRespBean  deleteFlowCntract(String recUid);

	public BaseRespBean  updateFlowCntract(Map<String, Object> paramMap);
	
	public ContractRespBean getContractByPush(BaseQueryReqBean reqBean);
}
