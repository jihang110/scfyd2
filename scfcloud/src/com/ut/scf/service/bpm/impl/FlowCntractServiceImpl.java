package com.ut.scf.service.bpm.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.bpm.FlowCntractMapper;
import com.ut.scf.dao.bpm.IPriProjectDao;
import com.ut.scf.dao.finance.IRecManageDao;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.xml.BaseInfoRespXmlBean;
import com.ut.scf.respbean.xml.ContListRespXmlBean;
import com.ut.scf.respbean.xml.ContractRespBean;
import com.ut.scf.service.bpm.IFlowCntractService;

@Service("flowCntractService")
public class FlowCntractServiceImpl implements IFlowCntractService {
	private static final Logger log = LoggerFactory.getLogger(FlowCntractServiceImpl.class);
	
	@Resource private FlowCntractMapper flowCntractMapper;
	@Resource private IPriProjectDao priProjectDao;
	@Resource private IRecManageDao recManageDao;
	@Resource private ICorpDao corpDao;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFlowCntractList(Map<String, Object> paramMap,PageInfoBean page) {
//		List<Map<String, Object>> list = flowCntractMapper.selectFlowCntractList(paramMap,page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
//		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertFlowCntract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = flowCntractMapper.insertCnt(paramMap);
		log.debug("insert FlowCntract num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateFlowCntract(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = flowCntractMapper.updateCnt(paramMap);
		log.debug("update FlowCntract num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteFlowCntract(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = flowCntractMapper.deleteCnt(recUid);
		log.debug("delete FlowCntract num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public ContractRespBean getContractByPush(BaseQueryReqBean reqBean) {
		Map<String, Object> paramMap = new HashMap<>();
		long start = reqBean.getBean().getStartSerialNum();
		int size = 50;
		paramMap.put("sysType", 5);
		paramMap.put("orgnNum", reqBean.getBean().getRequestOrgnNum());
		paramMap.put("size", size);
		paramMap.put("startNum", start - 1L);
		
		List<Map<String, Object>> list = flowCntractMapper.getContractByPush(paramMap);
		log.debug("flow contract list : {}", list);
		
		ContractRespBean respBean = new ContractRespBean();
		respBean.setReturnCode("00000");
		respBean.setReturnMsg("接口调用成功");
		
		BaseInfoRespXmlBean<ContListRespXmlBean> xmlBean = new BaseInfoRespXmlBean<>();
		
		if (!CollectionUtils.isEmpty(list)) {
			List<ContListRespXmlBean> beans = new ArrayList<>();
			for (Map<String, Object> beanMap : list) {
				if (size > 0) {
					beanMap.put("contractSerialNum", start++);
					--size;
					ContListRespXmlBean bean = new ContListRespXmlBean();
					BeanUtil.mapToBean(beanMap, bean);
					// 添加保理综合服务协议附件的路径
					bean.setAttachmentUrl(ScfCacheDict.sysConfigMap.get("scfcloudDomain") + bean.getAttachmentUrl());
					beans.add(bean);
				}
			}
			xmlBean.setMaxSerialNum(start - 1L);
			xmlBean.setBeans(beans);
			
			int updateNum = flowCntractMapper.updateContractByPush(list);
			log.debug("update push contract num {}", updateNum);
			if (updateNum <= 0) {
				log.error("更新生效合同信息失败");
				xmlBean.setMaxSerialNum(reqBean.getBean().getStartSerialNum() - 1L);
				respBean.setReturnCode("00003");
				respBean.setReturnMsg("更新生效合同信息失败");
			}
		} else {
			xmlBean.setMaxSerialNum(0L);
		}
		respBean.setBean(xmlBean);
		
		return respBean;
	}

}
