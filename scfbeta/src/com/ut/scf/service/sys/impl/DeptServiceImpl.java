package com.ut.scf.service.sys.impl;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpDeptMapper;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.dao.sys.IDeptDao;
import com.ut.scf.pojo.auto.CorpDept;
import com.ut.scf.pojo.auto.CorpDeptExample;
import com.ut.scf.pojo.auto.CorpDeptExample.Criteria;
import com.ut.scf.pojo.auto.SysUserExample;
import com.ut.scf.reqbean.sys.DeptUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IDeptService;

/**
 * 部门相关service类
 * 
 * @author sunll
 *
 */
@Service("deptService")
public class DeptServiceImpl implements IDeptService {

	private static final Logger log = LoggerFactory
			.getLogger(DeptServiceImpl.class);

	@Resource
	private IDeptDao deptDao;
	
	@Resource
	private CorpDeptMapper corpDeptMapper;
	
	@Resource
	private SysUserMapper sysUserMapper;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDeptTree(Map<String, Object> paramMap) {
		ListRespBean respBean = new ListRespBean();
//		List<Map<String, Object>> list = deptDao
//				.getDeptList(paramMap);
		
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andStatusEqualTo((short) 1);
		criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		if(paramMap.get("deptId") != null){
			criteria.andDeptIdEqualTo((String) paramMap.get("deptId"));
		}
		Criteria criteria2 = corpDeptExample.createCriteria();
		criteria2.andStatusEqualTo((short) 1);
		criteria2.andCorpIdEqualTo((String) paramMap.get("corpId"));
		if(paramMap.get("deptId") != null){
			criteria2.andParentIdEqualTo((String) paramMap.get("deptId"));
		}
		corpDeptExample.or(criteria2);
		List<CorpDept> list = corpDeptMapper
				.selectByExample(corpDeptExample);
		try {
			respBean.setDataList(ScfBizUtil.deptListToTree(convertListBean2ListMap(list)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDept(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 部门名称在同一企业下不能重复。
//		if (deptDao.countDeptByName(paramMap) > 0) {
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andStatusEqualTo((short) 1);
		criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
		criteria.andDeptNameEqualTo((String) paramMap.get("deptName"));
		if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
			return respBean;
		}

		// 生成主键Id
		paramMap.put("deptId", ScfUUID.generate());
//		int insertNum = deptDao.insertDept(paramMap);
		CorpDept corpDept = new CorpDept();
		corpDept.setDeptId(ScfUUID.generate());
		corpDept.setCorpId((String) paramMap.get("corpId"));
		corpDept.setDeptName((String) paramMap.get("deptName"));
		corpDept.setParentId((String) paramMap.get("parentId"));
		corpDept.setDeptType((String) paramMap.get("deptType"));
		corpDept.setStaffNum(Long.valueOf(paramMap.get("staffNum")+""));
		corpDept.setFunctions((String) paramMap.get("functions"));
		corpDept.setOrgStructurePath((String) paramMap.get("orgStructurePath"));
		corpDept.setContactPerson((String) paramMap.get("contactPerson"));
		corpDept.setContactPhone((String) paramMap.get("contactPhone"));
		corpDept.setNote((String) paramMap.get("note"));
//		corpDept.setStatus((short) 1);
		
		int insertNum = corpDeptMapper.insert(corpDept);
		log.debug("insert dept num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDept(DeptUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		// 部门名称在同一企业下不能重复。，需要排除自己的部门名
//		CorpDept dept = deptDao.queryDeptById(reqBean.getDeptId());
		CorpDept dept = corpDeptMapper.selectByPrimaryKey(reqBean.getDeptId());
		if (dept == null)
		{
			respBean.setResult(ErrorCodeEnum.DEPT_NOT_EXIST);
			return respBean;
		}
		if (reqBean.getDeptName() != null && !reqBean.getDeptName().equals(dept.getDeptName())) {
			paramMap.put("corpId", dept.getCorpId());
			
//			if (deptDao.countDeptByName(paramMap) > 0) {
			CorpDeptExample corpDeptExample = new CorpDeptExample();
			Criteria criteria = corpDeptExample.createCriteria();
			criteria.andStatusEqualTo((short) 1);
			criteria.andCorpIdEqualTo((String) paramMap.get("corpId"));
			criteria.andDeptNameEqualTo((String) paramMap.get("deptName"));
			if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
				respBean.setResult(ErrorCodeEnum.DEPT_NAME_EXIST);
				return respBean;
			}
		}

//		int updateNum = deptDao.updateDept(paramMap);
		CorpDept corpDept = new CorpDept();
		corpDept.setDeptId((String) paramMap.get("deptId"));
		corpDept.setCorpId((String) paramMap.get("corpId"));
		corpDept.setDeptName((String) paramMap.get("deptName"));
		corpDept.setParentId((String) paramMap.get("parentId"));
		corpDept.setDeptType((String) paramMap.get("deptType"));
		corpDept.setStaffNum(Long.valueOf(paramMap.get("staffNum")+""));
		corpDept.setFunctions((String) paramMap.get("functions"));
		corpDept.setOrgStructurePath((String) paramMap.get("orgStructurePath"));
		corpDept.setContactPerson((String) paramMap.get("contactPerson"));
		corpDept.setContactPhone((String) paramMap.get("contactPhone"));
		corpDept.setNote((String) paramMap.get("note"));
		
		int updateNum = corpDeptMapper.updateByPrimaryKeySelective(corpDept);
		log.debug("update dept num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteDept(String deptId) {
		BaseRespBean respBean = new BaseRespBean();
		
		CorpDeptExample corpDeptExample = new CorpDeptExample();
		Criteria criteria = corpDeptExample.createCriteria();
		criteria.andStatusEqualTo((short) 1);
		criteria.andParentIdEqualTo(deptId);
		SysUserExample corpDeptExample2 = new SysUserExample();
		com.ut.scf.pojo.auto.SysUserExample.Criteria criteria2 = corpDeptExample2.createCriteria();
		criteria2.andStatusEqualTo((short) 1);
		criteria2.andDeptIdEqualTo(deptId);
		
		// 有子部门，父部门是不能删除的。
//		if (deptDao.countDeptByParentId(deptId) > 0) {
		if (corpDeptMapper.countByExample(corpDeptExample) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_DEPT);
			return respBean;
		}

		// 部门里有员工，不能删除。
//		if (deptDao.countUserByDeptId(deptId) > 0) {
		if (sysUserMapper.countByExample(corpDeptExample2) > 0) {
			respBean.setResult(ErrorCodeEnum.DEPT_HAS_USER);
			return respBean;
		}
		
//		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("deptId", deptId);
//		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
//		int updateNum = deptDao.updateDept(paramMap);
		CorpDept corpDept = new CorpDept();
		corpDept.setDeptId(deptId);
		corpDept.setStatus((short) ScfBizConsts.STATUS_DELETE);
		
		int updateNum = corpDeptMapper.updateByPrimaryKeySelective(corpDept);
		log.debug("update dept num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDeptList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = deptDao.getDeptPageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	/** 
     * 将 List<JavaBean>对象转化为List<Map>
     * @author wukai
     * @param type 要转化的类型 
     * @param map 
     * @return Object对象
     * @version 2017年5月18日 
     */  
	public static List<Map<String,Object>> convertListBean2ListMap(List<CorpDept> beanList) throws Exception {  
        List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
        for(int i=0, n=beanList.size(); i<n; i++){
            Object bean = beanList.get(i);
            Map map = convertBean2Map(bean);
            mapList.add(map);
        }
        return mapList;  
    }
	
	/** 
     * 将 JavaBean对象转化为 Map  
     * @author wukai
     * @param bean 要转化的类型 
     * @return Map对象
     * @version 2017年5月18日 
     */   
    public static Map convertBean2Map(Object bean) throws Exception {  
        Class type = bean.getClass();  
        Map returnMap = new HashMap();  
        BeanInfo beanInfo = Introspector.getBeanInfo(type);  
        PropertyDescriptor[] propertyDescriptors = beanInfo  
                .getPropertyDescriptors();  
        for (int i = 0, n = propertyDescriptors.length; i <n ; i++) {  
            PropertyDescriptor descriptor = propertyDescriptors[i];  
            String propertyName = descriptor.getName();  
            if (!propertyName.equals("class")) {  
                Method readMethod = descriptor.getReadMethod();  
                Object result = readMethod.invoke(bean, new Object[0]);  
                if (result != null) {  
                    returnMap.put(propertyName, result);  
                } else {  
                    returnMap.put(propertyName, "");  
                }  
            }  
        }  
        return returnMap;  
    }  

}
