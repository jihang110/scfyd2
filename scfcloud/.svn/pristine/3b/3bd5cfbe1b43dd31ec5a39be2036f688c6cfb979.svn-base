package com.ut.scf.service.crm.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.crm.IOrgnLoanCountDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IOrgnLoanCountService;

/**
 * 
 * @author lzy
 *
 */
@Service("orgnLoanCountService")
public class OrgnLoanCountServiceImpl implements IOrgnLoanCountService {
	private static final Logger log = LoggerFactory
			.getLogger(CashFlowServiceImpl.class);
	@Resource
	private IOrgnLoanCountDao orgnLoanCountDao;
	/*@Override
	@Transactional(readOnly = true)
	public BaseRespBean getOrgnFlowById(String recUid) {
		ListRespBean respBean=new ListRespBean();
		List<OrgnLoanCount> list = orgnLoanCountDao.selectByPrimaryKeyId(recUid);
		respBean.setDataList(list);
		System.out.println(list);
		return respBean;
	}*/
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getOrgnFlowList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = orgnLoanCountDao.selectOrgnFlowList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addOrgnFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = orgnLoanCountDao.insert(paramMap);
		log.debug("insert orgnloadcount num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
		
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateOrgnFlow(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = orgnLoanCountDao.updateByPrimaryKeySelective(paramMap);
		log.debug("update orgn num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
		
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteOrgnFlow(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = orgnLoanCountDao.deleteByPrimaryKey(recUid);
		log.debug("insert orgn num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
		
	}
	
	
	
}
