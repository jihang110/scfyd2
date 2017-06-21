package com.ut.scf.service.finance;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.reqbean.xml.AccountsReceivableReqBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.xml.AccountsReceivableRespBean;
import com.ut.scf.respbean.xml.LoanRespBean;

public interface IReceiveAccountService {
	public BaseRespBean getReceiveAccountList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addReceiveAccount(Map<String, Object> paramMap);

	public BaseRespBean updateReceiveAccount(Map<String, Object> paramMap);

	public BaseRespBean deleteReceiveAccount(String recUid);
	
	AccountsReceivableRespBean insertAccount(AccountsReceivableReqBean reqBean);

	LoanRespBean getSupport(BaseQueryReqBean reqBean);
}
