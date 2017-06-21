package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;

/**
 * 
 * @author zhangjj
 *
 */
public interface ICorpInfoService {

	/*
	 * 获取供应商基本信息
	 */
	public BaseRespBean getCorpInfoBaseByCorpId(Map<String, Object> paramMap);
	
	public BaseRespBean updateCorpInfo(Map<String, Object> paramMap);
}
