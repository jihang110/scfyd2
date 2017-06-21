package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfSerialNum;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpDeptMapper;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.dao.sys.IDeptDao;
import com.ut.scf.pojo.auto.CorpDeptExample;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.CorpInfoExample.Criteria;
import com.ut.scf.reqbean.sys.CorpAddReqBean;
import com.ut.scf.reqbean.sys.CorpDeleteReqBean;
import com.ut.scf.reqbean.sys.CorpListReqBean;
import com.ut.scf.reqbean.sys.CorpUpdateReqBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.crm.CorpAddRespBean;
import com.ut.scf.respbean.xml.BaseInfoRespXmlBean;
import com.ut.scf.respbean.xml.RegListRespXmlBean;
import com.ut.scf.respbean.xml.RegistrationRespBean;
import com.ut.scf.service.sys.ICorpService;

/**
 * 企业相关service类
 * 
 * @author zyx
 *
 */
@Service("corpService")
public class CorpServiceImpl implements ICorpService {

	private static final Logger log = LoggerFactory
			.getLogger(CorpServiceImpl.class);

	@Resource
	private ICorpDao corpDao;
	
	@Resource
	private IDeptDao deptDao;
	
	@Resource
	private CorpInfoMapper corpInfoMapper;
	
	@Resource
	private CorpDeptMapper corpDeptMapper;


	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCorpInfo(CorpAddReqBean corpAddReqBean) {
		CorpAddRespBean respBean = new CorpAddRespBean();
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(corpAddReqBean);
		
		// 企业名称不能重复。
//		if (corpDao.countCorpByName(paramMap) > 0) {
		CorpInfoExample corpInfoExample = new CorpInfoExample();
		Criteria criteria = corpInfoExample.createCriteria();
		criteria.andStatusEqualTo((short) 1);
		criteria.andCorpNameEqualTo((String)paramMap.get("corpName"));
		if(paramMap.get("corpId") != null){
			criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		}
		if(paramMap.get("sysType") != null){
			criteria.andSysTypeEqualTo((int) paramMap.get("sysType"));
		}
		if (corpInfoMapper.countByExample(corpInfoExample) > 0) {
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
		// 机构组织代码不能重复
//		if(corpDao.countCorpByOrgnNum(paramMap) > 0){
		CorpInfoExample corpInfoExample2 = new CorpInfoExample();
		Criteria criteria2 = corpInfoExample2.createCriteria();
		criteria2.andStatusEqualTo((short) 1);
		criteria2.andOrgnNumEqualTo((String) paramMap.get("orgnNum"));
		if(paramMap.get("corpId") != null){
			criteria2.andCorpIdEqualTo((String) paramMap.get("corpId"));
		}
		if(corpInfoMapper.countByExample(corpInfoExample2) > 0){
			respBean.setResult(ErrorCodeEnum.ORGN_NUM_EXIST);
			return respBean;
		}

		// 生成主键Id
		CorpInfo corpInfo = new CorpInfo();
		BeanUtil.BeanToBean(corpInfo, corpAddReqBean);
		String corpId = ScfUUID.generate();
		corpInfo.setCorpId(corpId);
		corpInfo.setAppNum(ScfSerialNum.generate(ScfBizConsts.REG_SUPPLIER_ID_PREFIX));
		
//		int insertNum = corpDao.insertCorp(corpInfo);
		int insertNum = corpInfoMapper.insert(corpInfo);
		
		log.debug("insert corpInfo num {}", insertNum);
		if (insertNum < 1) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}
		
		respBean.setCorpId(corpId);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCorp(CorpUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		// 企业名称不能重复。
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
//		if (corpDao.countCorpByName(paramMap) > 0) {
		CorpInfoExample corpInfoExample = new CorpInfoExample();
		Criteria criteria = corpInfoExample.createCriteria();
		criteria.andStatusEqualTo((short) 1);
		criteria.andCorpNameEqualTo((String)paramMap.get("corpName"));
		if(paramMap.get("corpId") != null){
			criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		}
		if(paramMap.get("sysType") != null){
			criteria.andSysTypeEqualTo((int) paramMap.get("sysType"));
		}
		if (corpInfoMapper.countByExample(corpInfoExample) > 0) {
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
		// 机构组织代码不能重复
//		if(corpDao.countCorpByOrgnNum(paramMap) > 0){
		CorpInfoExample corpInfoExample2 = new CorpInfoExample();
		Criteria criteria2 = corpInfoExample2.createCriteria();
		criteria2.andStatusEqualTo((short) 1);
		criteria2.andOrgnNumEqualTo((String) paramMap.get("orgnNum"));
		if(paramMap.get("corpId") != null){
			criteria2.andCorpIdEqualTo((String) paramMap.get("corpId"));
		}
		if(corpInfoMapper.countByExample(corpInfoExample2) > 0){
			respBean.setResult(ErrorCodeEnum.ORGN_NUM_EXIST);
			return respBean;
		}
		
//		int updateNum = corpDao.updateCorpInfoByPrimaryKey(paramMap);
		CorpInfo corpInfo = new CorpInfo();
		BeanUtil.BeanToBean(reqBean, corpInfo);
		int updateNum = corpInfoMapper.updateByPrimaryKeySelective(corpInfo);
		
		log.debug("update corpInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCorp(CorpDeleteReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();

		String corpId = reqBean.getCorpId();
		// 有子部门，企业是不能删除的。
//		if (corpDao.countDeptByCorpId(corpId) > 0) {
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		com.ut.scf.pojo.auto.CorpDeptExample.Criteria cri = corpDeptExample.createCriteria();
		cri.andStatusEqualTo((short) 1);
		cri.andCorpIdEqualTo(corpId);
		if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_DEPT);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
//		int updateNum = corpDao.updateCorpInfoByPrimaryKey(paramMap);
		CorpInfo corpInfo = new CorpInfo();
		BeanUtil.BeanToBean(reqBean, corpInfo);
		int updateNum = corpInfoMapper.updateByPrimaryKeySelective(corpInfo);
		log.debug("delete corpInfo num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		if(updateNum>0&&null!=ScfCacheDict.relaCorpIdMap.get(corpId)&&ScfCacheDict.relaCorpIdMap.get(corpId)!=""){
			ScfCacheDict.relaCorpIdMap.remove(corpId);
		}
		return respBean;
	}

	@Override
	public BaseRespBean corpList(CorpListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = corpDao.getCorpInfoList(paramMap, page);
			log.debug("corp list : {}", list);
			log.debug("corp list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = corpDao.getCorpInfoList(paramMap);
			log.debug("corp list : {}", list);
			
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}

	@Override
	@Transactional(readOnly = true)
	public List<Map<String, String>> getAllRelaCorp() {
		return corpDao.selectAllRelaCorp();
	}

	@Override
	public BaseRespBean supplierInfoList(CorpListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = corpDao.getSupplierInfoList(paramMap, page);
			log.debug("supplier list : {}", list);
			log.debug("supplier list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = corpDao.getSupplierInfoList(paramMap);
			log.debug("supplier list : {}", list);
			
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
		
	}

	@Override
	public BaseRespBean enterpriseInfoList(CorpListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = corpDao.queryCoreEnterpriseList(paramMap, page);
			log.debug("supplier list : {}", list);
			log.debug("supplier list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = corpDao.queryCoreEnterpriseList(paramMap);
			log.debug("supplier list : {}", list);
			
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}
	
	@Override
	public BaseRespBean packageInfoList(CorpListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		
		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = corpDao.queryCoreEnterpriseList(paramMap, page);
			log.debug("supplier list : {}", list);
			log.debug("supplier list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = corpDao.getPackageCorpList(paramMap);
			log.debug("supplier list : {}", list);
			
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public RegistrationRespBean supplierByPush(BaseQueryReqBean reqBean) {
		Map<String, Object> paramMap = new HashMap<>();
		long start = reqBean.getBean().getStartSerialNum();
		int size = 50;
		paramMap.put("sysType", 5);
		paramMap.put("isPush", 1);
		paramMap.put("orgnNum", reqBean.getBean().getRequestOrgnNum());
		paramMap.put("size", size);
		paramMap.put("startNum", start - 1L);
		
		List<Map<String, Object>> list = corpDao.getSupplierByPush(paramMap);
		log.debug("supplier list : {}", list);
		
		RegistrationRespBean respBean = new RegistrationRespBean();
		respBean.setReturnCode("00000");
		respBean.setReturnMsg("接口调用成功");
		
		BaseInfoRespXmlBean<RegListRespXmlBean> xmlBean = new BaseInfoRespXmlBean<>();
		if (!CollectionUtils.isEmpty(list)) {
			List<RegListRespXmlBean> beans = new ArrayList<>();
			for (Map<String, Object> beanMap : list) {
				if (size > 0) {
					beanMap.put("customerAppSerialNum", start++);
					--size;
					RegListRespXmlBean bean = new RegListRespXmlBean();
					BeanUtil.mapToBean(beanMap, bean);
					beans.add(bean);
				}
			}
			xmlBean.setMaxSerialNum(start - 1L);
			xmlBean.setBeans(beans);
			
			int updateNum = corpDao.updateSupplierByPush(list);
			log.debug("update push supplier num {}", updateNum);
			if (updateNum <= 0) {
				log.error("更新生成报名信息失败");
				xmlBean.setMaxSerialNum(reqBean.getBean().getStartSerialNum() - 1L);
				respBean.setReturnCode("00001");
				respBean.setReturnMsg("更新生成报名信息失败");
			}
		} else {
			xmlBean.setMaxSerialNum(0L);
		}
		respBean.setBean(xmlBean);
		
		return respBean;
	}
}
