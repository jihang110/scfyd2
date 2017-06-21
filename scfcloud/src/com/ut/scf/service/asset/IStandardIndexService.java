package com.ut.scf.service.asset;

import com.ut.scf.reqbean.xml.StandardIndexReqBean;
import com.ut.scf.respbean.xml.StandardIndexRespBean;

public interface IStandardIndexService {
	StandardIndexRespBean insertStandard(StandardIndexReqBean reqBean);
}
