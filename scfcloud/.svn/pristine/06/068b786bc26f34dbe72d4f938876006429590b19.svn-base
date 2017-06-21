package com.ut.scf.service.asset.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.asset.IStandardIndexDao;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.pojo.StandardIndex;
import com.ut.scf.reqbean.xml.StandardIndexReqBean;
import com.ut.scf.respbean.xml.StandardIndexRespBean;
import com.ut.scf.service.asset.IStandardIndexService;

@Service("standardIndexService")
public class StandardIndexServiceImpl implements IStandardIndexService {
	private static final Logger log = LoggerFactory.getLogger(StandardIndexServiceImpl.class);
	@Resource
	private ICorpDao corpDao;
	@Resource
	private IStandardIndexDao standardIndexDao;

	@Override
	public StandardIndexRespBean insertStandard(StandardIndexReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean.getBean());
		paramMap.put("sysType", 5);
		String corpId = corpDao.getSupplierIdByOrgn(paramMap);
		log.debug("corpId is {}", corpId);
		
		int insertNum = 0;
		if (StringUtils.isNotBlank(corpId)) {
			StandardIndex index = new StandardIndex();
			BeanUtil.mapToBean(paramMap, index);
			index.setRecUid(ScfUUID.generate());
			index.setCorpId(corpId);
			index.setCreateUserId(reqBean.getUserId());
			insertNum = standardIndexDao.insertSelective(index);
			log.debug("insert standardIndex num {}", insertNum);
		}
		StandardIndexRespBean respBean = new StandardIndexRespBean();
		respBean.setReturnCode("00000");
		respBean.setReturnMsg("接口调用成功");
		
		if (insertNum <= 0) {
			log.error("标准指标信息保存失败");
			respBean.setReturnCode("00002");
			respBean.setReturnMsg("生成标准指标信息失败");
		}
		
		return respBean;
	}

}
