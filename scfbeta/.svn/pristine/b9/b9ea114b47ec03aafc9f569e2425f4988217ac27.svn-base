package com.ut.scf.service.crm.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.crm.ICorpContractDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.ICorpContractService;

/**
 * 
 * @author zhangjj
 *
 */
@Service("corpContractService")
public class CorpContractServiceImpl implements ICorpContractService{

	private static final Logger log = LoggerFactory.getLogger(CorpContractServiceImpl.class);
	
	@Resource
	ICorpContractDao corpContractDao;

	@Transactional(readOnly = true)
	public BaseRespBean getcorpContractList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = corpContractDao.selectCorpContractList(paramMap, page);
//		List<Map<String, Object>> listbid = new ArrayList<Map<String, Object>>();
//		List<Map<String, Object>> listsale = new ArrayList<Map<String, Object>>();
		PageRespBean respBean = new PageRespBean();
//		for(Map<String, Object> m:list){
//			if("1".equals(m.get("contractType").toString())){
//				listbid.add(m);
//			};
//			if("2".equals(m.get("contractType").toString())){
//				listsale.add(m);
//			};
//		}
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
//	@Override
//	public BaseRespBean getcorpContractSaleList(Map<String, Object> paramMap,
//			PageInfoBean page) {
//		List<Map<String, Object>> list = corpContractDao.selectCorpContractList(paramMap, page);
//		List<Map<String, Object>> listbid = new ArrayList<Map<String, Object>>();
//		List<Map<String, Object>> listsale = new ArrayList<Map<String, Object>>();
//		PageRespBean respBean = new PageRespBean();
//		for(Map<String, Object> m:list){
//			if("1".equals(m.get("contractType").toString())){
//				listbid.add(m);
//			};
//			if("2".equals(m.get("contractType").toString())){
//				listsale.add(m);
//			};
//		}
//		respBean.setPages(page.getTotalPage());
//		respBean.setRecords(page.getTotalRecord());
//		respBean.setDataList(listsale);
//		return respBean;
//	}
	

	@Override
	public BaseRespBean insertCorpContract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int insertNum = corpContractDao.insertCorpContract(paramMap);
		log.debug("insert CorpContract num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	public BaseRespBean updateCorpContract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		int updateNum = corpContractDao.updateCorpContract(paramMap);
		log.debug("update CorpContract num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	public BaseRespBean deleteCorpContract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = corpContractDao.deleteCorpContract(paramMap);
		log.debug("delete CorpContract num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;	
		}
		return respBean;
	}



}
