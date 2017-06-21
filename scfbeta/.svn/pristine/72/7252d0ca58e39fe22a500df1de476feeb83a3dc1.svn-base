package com.ut.scf.service.sys.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SysRoleMapper;
import com.ut.scf.dao.auto.SysRoleMenuMapper;
import com.ut.scf.dao.auto.SysTypeMapper;
import com.ut.scf.dao.sys.IRoleDao;
import com.ut.scf.pojo.SysRole;
import com.ut.scf.pojo.auto.*;
import com.ut.scf.reqbean.sys.RoleAddReqBean;
import com.ut.scf.reqbean.sys.RoleListReqBean;
import com.ut.scf.reqbean.sys.RoleUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IRoleService;

@Service("roleService")
public class RoleServiceImpl implements IRoleService {

	private static final Logger log = LoggerFactory
			.getLogger(RoleServiceImpl.class);

	@Resource
	private IRoleDao roleDao;
	@Resource
	private SysRoleMapper sysRoleMapper;
	@Resource
	private SysRoleMenuMapper SysRoleInterfaceMapper;
	@Resource
	private SysTypeMapper sysTypeMapper;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRoleList(RoleListReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		// 是否分页，0：否，1：是
		if (reqBean.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(reqBean.getPageNumber());
			page.setPageSize(reqBean.getPageSize());
			List<Map<String, Object>> list = roleDao.selectRoleList(paramMap,
					page);
			log.debug("role list : {}", list);
			log.debug("role list page : {}", page);

			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(list);
			return respBean;
		} else {
			List<Map<String, Object>> list = roleDao.selectRoleList(paramMap);
			log.debug("role list : {}", list);

			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(list);
			return respBean;
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addRole(RoleAddReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		// 查询角色名是否重复
		//修改为自动生产的sql
		SysRoleExample sysRoleExample  = new SysRoleExample();
		com.ut.scf.pojo.auto.SysRoleExample.Criteria criteria =  sysRoleExample.createCriteria();
		criteria.andRoleNameEqualTo(paramMap.get("roleName")+"");
		if(paramMap.get("corpId") != null ){
			criteria.andCorpIdEqualTo(paramMap.get("corpId")+"");
		}
		//roleDao.countRoleByName(paramMap)
		if (sysRoleMapper.countByExample(sysRoleExample) > 0) {
			respBean.setResult(ErrorCodeEnum.ROLE_NAME_EXIST);
			return respBean;
		}

		// 插入角色信息
		String roleId = ScfUUID.generate();
		paramMap.put("roleId", roleId);
		//转换为自动生成的sql
//		int insertRoleNum = roleDao.insertRole(paramMap);
		com.ut.scf.pojo.auto.SysRole sysRole = new com.ut.scf.pojo.auto.SysRole();
		BeanUtil.mapToBean(paramMap, sysRole);
		sysRole.setCreateTime(new Date());
		sysRole.setStatus(1);
		int insertRoleNum = sysRoleMapper.insert(sysRole);
		log.debug("insertRoleNum : {}", insertRoleNum);
		if (insertRoleNum <= 0) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}

		// 添加角色菜单关系
		
		if (reqBean.getMenuIdList() != null
				|| !reqBean.getMenuIdList().isEmpty()) {
			List<SysRoleMenu> roleMenuList = new ArrayList<SysRoleMenu>();
			for (String menuId : reqBean.getMenuIdList()) {
				if (StringUtils.isNotBlank(menuId)) {
//					Map<String, Object> roleMenuInfo = new HashMap<String, Object>();
					SysRoleMenu sysRoleMenu  = new SysRoleMenu();
//					roleMenuInfo.put("recUid", ScfUUID.generate());
//					roleMenuInfo.put("roleId", roleId);
//					roleMenuInfo.put("menuId", menuId);
					sysRoleMenu.setMenuId(menuId);
					sysRoleMenu.setRecUid(ScfUUID.generate());
					sysRoleMenu.setRoleId(roleId);
					sysRoleMenu.setCreateTime(new Date());
					
					roleMenuList.add(sysRoleMenu);
					
				}
			}

			if (!roleMenuList.isEmpty()) {
				//修改为自动生产的Dao
				//int insertRoleMenuNum = roleDao.insertRoleMenu(roleMenuList);
				int insertRoleMenuNum = 0;
				for (int i = 0; i < roleMenuList.size(); i++) {
					
					insertRoleMenuNum = SysRoleInterfaceMapper.insert(roleMenuList.get(i));
				}
				log.debug("insertRoleMenuNum : {}", insertRoleMenuNum);
				if (insertRoleMenuNum <= 0) {
					throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
			}
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteRole(String roleId, int roleTypeSession) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 不能删除系统管理员
		if (ScfBizConsts.ROLE_ID_ROOT.equals(roleId)) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}
		//sql 自动生产修改
//		SysRole sysRole = roleDao.selectRoleById(roleId);
		com.ut.scf.pojo.auto.SysRole sysRole = sysRoleMapper.selectByPrimaryKey(roleId);
		if (sysRole == null) {
			respBean.setResult(ErrorCodeEnum.ROLE_NOT_EXIST);
			return respBean;
		}
		
		if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT && sysRole.getCorpId() == null) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}
		
		// 更新角色status为0
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("roleId", roleId);
		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
//		int updateNum = roleDao.updateRole(paramMap);	修改自动生成sql
		com.ut.scf.pojo.auto.SysRole sysRole2 = new com.ut.scf.pojo.auto.SysRole();
		BeanUtil.mapToBean(paramMap, sysRole2);
		int updateNum = sysRoleMapper.updateByPrimaryKeySelective(sysRole2);
		log.debug("update role count {}", updateNum);
		if (updateNum <= 0) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}
		
		// 删除角色菜单关系
//		int deleteRoleMenuNum = roleDao.deleteRoleMenu(roleId);		修改自动生成sql
		int deleteRoleMenuNum = sysRoleMapper.deleteByPrimaryKey(roleId);
		log.debug("deleteRoleMenuNum {}", deleteRoleMenuNum);
		if (updateNum < 0) {
			throw new BizException(ErrorCodeEnum.DELETE_FAILED);
		}

		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateRole(RoleUpdateReqBean reqBean, int roleTypeSession) {
		BaseRespBean respBean = new BaseRespBean();
		SysRole sysRole = roleDao.selectRoleById(reqBean.getRoleId());
		if (sysRole == null) {
			respBean.setResult(ErrorCodeEnum.ROLE_NOT_EXIST);
			return respBean;
		}
		
		if (roleTypeSession != ScfBizConsts.ROLE_TYPE_PLAT && sysRole.getCorpId() == null) {
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}
		
		// 查询角色名是否重复，需要排除自己的角色名
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		if (reqBean.getRoleName() != null && !reqBean.getRoleName().equals(sysRole.getRoleName())) {
			SysRoleExample sysRoleExample  = new SysRoleExample();
			com.ut.scf.pojo.auto.SysRoleExample.Criteria criteria =  sysRoleExample.createCriteria();
			com.ut.scf.pojo.auto.SysRoleExample.Criteria criteria2 =  sysRoleExample.createCriteria();
			criteria.andRoleNameEqualTo(paramMap.get("roleName")+"");
			if(paramMap.get("corpId") != null ){
				criteria.andCorpIdEqualTo(paramMap.get("corpId")+"");
				criteria2.andCorpIdIsNull();
			}
			sysRoleExample.or(criteria2);
			paramMap.put("corpId", sysRole.getCorpId());
			if (sysRoleMapper.countByExample(sysRoleExample) > 0) {
				respBean.setResult(ErrorCodeEnum.ROLE_NAME_EXIST);
				return respBean;
			}
		}

		// 修改角色信息
		if (reqBean.getRoleName() != null || reqBean.getNote() != null) {
			com.ut.scf.pojo.auto.SysRole sysRole2 = new com.ut.scf.pojo.auto.SysRole();
			
//			int u pdateRoleNum = roleDao.updateRole(paramMap);		sql修改
			BeanUtil.mapToBean(paramMap, sysRole2);
			int updateRoleNum = sysRoleMapper.updateByPrimaryKeySelective(sysRole2);	
			log.debug("updateRoleNum : {}", updateRoleNum);
			if (updateRoleNum <= 0) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
		}
		
		// 修改角色菜单关系
		if (reqBean.getMenuIdList() != null) {
			//先删除
//			int deleteRoleMenuNum = roleDao.deleteRoleMenu(reqBean.getRoleId());
			SysRoleMenuExample sysRoleMenuExample = new SysRoleMenuExample();
			com.ut.scf.pojo.auto.SysRoleMenuExample.Criteria criteria =  sysRoleMenuExample.createCriteria();
			criteria.andRoleIdEqualTo(reqBean.getRoleId());
			int deleteRoleMenuNum =  SysRoleInterfaceMapper.deleteByExample(sysRoleMenuExample);
			log.debug("deleteRoleMenuNum : {}", deleteRoleMenuNum);
			if (deleteRoleMenuNum < 0) {
				throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
			}
			
			//后添加
			if (!reqBean.getMenuIdList().isEmpty()) {
				List<SysRoleMenu> roleMenuList = new ArrayList<SysRoleMenu>();
				for (String menuId : reqBean.getMenuIdList()) {
					if (StringUtils.isNotBlank(menuId)) {
//						Map<String, Object> roleMenuInfo = new HashMap<String, Object>();
						SysRoleMenu sysRoleMenu  = new SysRoleMenu();
//						roleMenuInfo.put("recUid", ScfUUID.generate());
//						roleMenuInfo.put("roleId", roleId);
//						roleMenuInfo.put("menuId", menuId);
						sysRoleMenu.setMenuId(menuId);
						sysRoleMenu.setRecUid(ScfUUID.generate());
						sysRoleMenu.setRoleId(reqBean.getRoleId());
						sysRoleMenu.setCreateTime(new Date());
						roleMenuList.add(sysRoleMenu);
					}
				}

				if (!roleMenuList.isEmpty()) {
					int insertRoleMenuNum = 0;
//					int insertRoleMenuNum = roleDao.insertRoleMenu(roleMenuList);  sql 为自动生产
					for (int i = 0; i < roleMenuList.size(); i++) {
						
						insertRoleMenuNum = SysRoleInterfaceMapper.insert(roleMenuList.get(i));
					}
					log.debug("insertRoleMenuNum : {}", insertRoleMenuNum);
					if (insertRoleMenuNum <= 0) {
						throw new BizException(ErrorCodeEnum.ADD_FAILED);
					}
				}
			}
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRoleTypeList(int roleType) {
		SysTypeExample sysTypeExample = new SysTypeExample();
		com.ut.scf.pojo.auto.SysTypeExample.Criteria criteria =  sysTypeExample.createCriteria();
		criteria.andTypeIdEqualTo(roleType);
//		List<Map<String, Object>> list = sysTypeMapper.selectByExample(sysTypeExample);
		List<Map<String, Object>> list = roleDao.selectRoleTypeList(roleType);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	/**
	 * 根据所属企业类型查询角色
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getRoleListByCorpId(String corpId) {
		List<Map<String, Object>> list = roleDao.selectRoleListByCorpId(corpId);
		ListRespBean respBean = new ListRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
