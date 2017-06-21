package com.ut.scf.service.sys.impl;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.math.BigDecimal;
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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SysMenuMapper;
import com.ut.scf.dao.sys.IMenuDao;
import com.ut.scf.pojo.auto.SysMenu;
import com.ut.scf.pojo.auto.SysMenuExample;
import com.ut.scf.pojo.auto.SysMenuExample.Criteria;
import com.ut.scf.reqbean.sys.MenuListReqBean;
import com.ut.scf.reqbean.sys.MenuMoveReqBean;
import com.ut.scf.reqbean.sys.MenuTreeReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.service.sys.IMenuService;

@Service("menuService")
public class MenuServiceImpl implements IMenuService {

	private static final Logger log = LoggerFactory.getLogger(MenuServiceImpl.class);

	@Resource
	private IMenuDao menuDao;
	
	@Resource
	private SysMenuMapper sysMenuMapper;

	@Transactional(readOnly = true)
	public BaseRespBean getMenuTree(MenuTreeReqBean reqBean) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> list1 = null;
		List<SysMenu> list = null;

		// 系统管理员角色可以查询整个菜单树，其他角色只能查询配置的菜单树。
		if ((ScfBizConsts.ROLE_ID_ROOT.equals(reqBean.getRoleId())
				|| ScfBizConsts.ROLE_ID_FACTOR_ADMIN.equals(reqBean.getRoleId())) && reqBean.getIsRelation() == 0) {
//			list = menuDao.selectMenuList();
			SysMenuExample sysMenuExample = new SysMenuExample();
			Criteria criteria = sysMenuExample.createCriteria();
			criteria.andStatusEqualTo(new BigDecimal(1));
			list = sysMenuMapper.selectByExample(sysMenuExample);
			
			try {
				respBean.setDataList(ScfBizUtil.menuListToTree(convertListBean2ListMap(list)));
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			list1 = menuDao.menuListByRoleId(reqBean.getRoleId());
			respBean.setDataList(ScfBizUtil.menuListToTree(list1));
		}
//		respBean.setDataList(ScfBizUtil.menuListToTree(list));

		return respBean;
	}

	@Transactional(readOnly = true)
	public BaseRespBean getMenuList(MenuListReqBean reqBean) {
		ListRespBean respBean = new ListRespBean();
		List<Map<String, Object>> list = menuDao.menuListByRoleId(reqBean.getRoleId());
		respBean.setDataList(list);

		return respBean;
	}

	/**
	 * 添加到菜单sys_menu表
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addMenu(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		/*
		 * 查询菜单名字是否重复
		 */
		SysMenuExample sysMenuExample = new SysMenuExample();
		Criteria criteria = sysMenuExample.createCriteria();
		criteria.andStatusEqualTo(new BigDecimal(1));
		criteria.andMenuNameEqualTo((String) paramMap.get("menuName"));
		
//		if (menuDao.countMenuByName(paramMap) > 0) {
		if (sysMenuMapper.countByExample(sysMenuExample) > 0) {
			respBean.setResult(ErrorCodeEnum.MENU_NAME_EXIST);
			return respBean;
		}
//		paramMap.put("menuId", ScfUUID.generate());
//		int insertMenuNum = menuDao.insertMenu(paramMap);
		SysMenu sysMenu = new SysMenu();
		sysMenu.setMenuId(ScfUUID.generate());
		sysMenu.setMenuName((String) paramMap.get("menuName"));
		sysMenu.setMenuLevel(new BigDecimal((Integer)paramMap.get("menuLevel")));
		sysMenu.setParentId((String) paramMap.get("parentId"));
		sysMenu.setMenuPath((String) paramMap.get("menuPath"));
		sysMenu.setMenuOrder(new BigDecimal((Integer)paramMap.get("menuOrder")));
		sysMenu.setNote((String) paramMap.get("note"));
		sysMenu.setStatus(new BigDecimal(1));
		int insertMenuNum = sysMenuMapper.insert(sysMenu);
		log.debug("insertMenuNum : {}", insertMenuNum);

		if (insertMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	/**
	 * 删除菜单
	 */
	@Override
	public BaseRespBean deleteMenu(String menuId) {
		BaseRespBean respBean = new BaseRespBean();

		// 有子菜单，父菜单是不能删除的。
		SysMenuExample sysMenuExample = new SysMenuExample();
		Criteria criteria = sysMenuExample.createCriteria();
		criteria.andStatusEqualTo(new BigDecimal(1));
		criteria.andParentIdEqualTo(menuId);
		
//		if (menuDao.countMenuByParentId(menuId) > 0) {
		if (sysMenuMapper.countByExample(sysMenuExample) > 0) {
			respBean.setResult(ErrorCodeEnum.HAS_SUB_MENU);
			return respBean;
		}

//		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("menuId", menuId);
//		paramMap.put("status", ScfBizConsts.STATUS_DELETE);
//		int updateNum = menuDao.updateMenu(paramMap);
		SysMenu sysMenu = new SysMenu();
		sysMenu.setMenuId(menuId);
		sysMenu.setStatus(new BigDecimal(0));
		int updateNum = sysMenuMapper.updateByPrimaryKey(sysMenu);
		log.debug("update menu num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	/*
	 * 修改菜单信息
	 */
	@Override
	public BaseRespBean updateMenu(SysMenu sysMenu) {
//		int updateMenuNum = menuDao.updateMenu(paramMap);
		
		int updateMenuNum = sysMenuMapper.updateByPrimaryKeySelective(sysMenu);
		log.debug("updateMenuNum : {}", updateMenuNum);

		BaseRespBean respBean = new BaseRespBean();
		if (updateMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	/*
	 * 移动菜单信息
	 */
	@Override
	public BaseRespBean updateMenuByMove(List<MenuMoveReqBean> reqBean) {
		int updateMenuNum = menuDao.updateMenuByMove(reqBean);
		log.debug("updateMenuNum : {}", updateMenuNum);

		BaseRespBean respBean = new BaseRespBean();
		if (updateMenuNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

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
	public static List<Map<String,Object>> convertListBean2ListMap(List<SysMenu> beanList) throws Exception {  
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
