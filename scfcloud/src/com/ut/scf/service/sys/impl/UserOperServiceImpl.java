package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfBizUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.IMenuDao;
import com.ut.scf.dao.sys.IUserDao;
import com.ut.scf.pojo.SysFuncInterface;
import com.ut.scf.pojo.SysUser;
import com.ut.scf.pojo.SysUserRole;
import com.ut.scf.pojo.UploadFilePath;
import com.ut.scf.reqbean.sys.BizLogListReqBean;
import com.ut.scf.reqbean.sys.UserAddReqBean;
import com.ut.scf.reqbean.sys.UserModPwdReqBean;
import com.ut.scf.reqbean.sys.UserSearchPageReqBean;
import com.ut.scf.reqbean.sys.UserUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.sys.SysConfigRespBean;
import com.ut.scf.respbean.sys.UserLoginRespBean;
import com.ut.scf.service.sys.IUserOperService;

/**
 * 用户操作相关service类
 * 
 * @author sunll
 *
 */
@Service("userOperService")
public class UserOperServiceImpl implements IUserOperService {

	private static final Logger log = LoggerFactory
			.getLogger(RoleServiceImpl.class);

	@Resource
	private IUserDao userDao;

	@Resource
	private IMenuDao menuDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean userLogin(Map<String, Object> paramMap) {
		Map<String, Object> resultMap = userDao.userLogin(paramMap);

		// 根据用户名密码没有查询到用户
		if (resultMap == null) {
			BaseRespBean respBean = new BaseRespBean();
			respBean.setResult(ErrorCodeEnum.LOGIN_USERNAME_PASSWORD_ERROR);
			return respBean;
		}

		UserLoginRespBean respBean = new UserLoginRespBean();
		BeanUtil.mapToBean(resultMap, respBean);

		// 根据角色Id，查询菜单列表
		List<Map<String, Object>> list = menuDao.menuListByRoleId(respBean
				.getRoleId());
		respBean.setMenuList(ScfBizUtil.menuListToTree(list));

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean userPhoneLogin(String phone) {
		Map<String, Object> resultMap = userDao.userPhoneLogin(phone);

		// 根据用户名密码没有查询到用户
		if (resultMap == null) {
			BaseRespBean respBean = new BaseRespBean();
			respBean.setResult(ErrorCodeEnum.LOGIN_USERNAME_PASSWORD_ERROR);
			return respBean;
		}

		UserLoginRespBean respBean = new UserLoginRespBean();
		BeanUtil.mapToBean(resultMap, respBean);

		// 根据角色Id，查询菜单列表
		List<Map<String, Object>> list = menuDao.menuListByRoleId(respBean
				.getRoleId());
		respBean.setMenuList(ScfBizUtil.menuListToTree(list));

		return respBean;
	}

	/**
	 * 条件查询 分页获取user
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean userList(UserSearchPageReqBean searchPage){
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPage);
		
		// 是否分页，0：否，1：是
		if (searchPage.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(searchPage.getPageNumber());
			page.setPageSize(searchPage.getPageSize());
			
			List<Map<String, Object>> resultList = userDao.userList(paramMap,page);
			
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(resultList);
			return respBean;
		} else {
			List<Map<String, Object>> resultList = userDao.userList(paramMap);
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(resultList);
			return respBean;
		}
	}
	
	/**
	 * 条件查询 分页获取带有特定菜单的user
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean hasMenuUserList(UserSearchPageReqBean searchPage){
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPage);
		
		// 是否分页，0：否，1：是
		if (searchPage.getIsPage() == 1) {
			PageInfoBean page = new PageInfoBean();
			page.setPageNumber(searchPage.getPageNumber());
			page.setPageSize(searchPage.getPageSize());
			
			List<Map<String, Object>> resultList = userDao.hasMenuUserList(paramMap,page);
			
			PageRespBean respBean = new PageRespBean();
			respBean.setPages(page.getTotalPage());
			respBean.setRecords(page.getTotalRecord());
			respBean.setDataList(resultList);
			return respBean;
		} else {
			List<Map<String, Object>> resultList = userDao.hasMenuUserList(paramMap);
			ListRespBean respBean = new ListRespBean();
			respBean.setDataList(resultList);
			return respBean;
		}
	}
	
	/**
	 * 新增user
	 * 
	 * @param addUserBean
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean insertUser(UserAddReqBean addUserBean){
		BaseRespBean respBean = new BaseRespBean();
		
		String username = addUserBean.getUsername();
		String mobilephone = addUserBean.getMobilephone();
		int hasUser = userDao.hasUserByName(username);
		int hasmobilephone = userDao.hasUserByMobilephone(mobilephone);
		if(hasUser<1){
			if(hasmobilephone<1){
			SysUser user = new SysUser();
			user.setUserId(ScfUUID.generate());
			user.setUsername(addUserBean.getUsername());
			user.setPassword(addUserBean.getPassword());
			user.setRealname(addUserBean.getRealname());
			user.setDeptId(addUserBean.getDeptId());
			user.setCorpId(addUserBean.getCorpId());
			user.setEmail(addUserBean.getEmail());
			user.setFixedPhone(addUserBean.getFixedPhone());
			user.setNote(addUserBean.getNote());
			user.setMobilephone(addUserBean.getMobilephone());
			user.setPhotoUrl(addUserBean.getPhotoUrl());
			user.setStatus((byte) 1);
			
			SysUserRole sysUserRole = new SysUserRole();
			sysUserRole.setRecUid(ScfUUID.generate());
			sysUserRole.setRoleId(addUserBean.getRoleId());
			sysUserRole.setUserId(user.getUserId());
			
			
			int userResult = userDao.insertUser(user);
			int userRoleResult = userDao.insertUserRole(sysUserRole);
			if(userResult<1||userRoleResult<1){
				throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
			}else{
				respBean.setResult(ErrorCodeEnum.USER_PHONE_EXIST);
			}
		}else{
			respBean.setResult(ErrorCodeEnum.USER_NAME_EXIST);
		}
		
		return respBean;
		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean deleteUser(String userId) {
		BaseRespBean respBean = new BaseRespBean();
		SysUser user = new SysUser();
		user.setUserId(userId);
		user.setStatus((byte) ScfBizConsts.STATUS_DELETE);
		int result = userDao.updateUser(user);
		if(result<1){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
		}
		return respBean;
	}

	/**
	 * 修改user
	 * 
	 * @param userUpdataBean
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean updateUser(UserUpdateReqBean userUpdataBean) {
		BaseRespBean respBean = new BaseRespBean();
		String username = userUpdataBean.getUsername();
		String mobilephone = userUpdataBean.getMobilephone();
		int hasUser = userDao.hasUserByName(username);
		int hasmobilephone = userDao.hasUserByMobilephone(mobilephone);
		if(hasUser>0&&username!=null){
			respBean.setResult(ErrorCodeEnum.USER_NAME_EXIST);
		}else{
			if(hasmobilephone>0&&mobilephone !=null){
				respBean.setResult(ErrorCodeEnum.USER_PHONE_EXIST);
			}else{
		SysUser user = new SysUser();
		user.setUserId(userUpdataBean.getUserId());
		user.setUsername(userUpdataBean.getUsername());
		user.setRealname(userUpdataBean.getRealname());
		user.setDeptId(userUpdataBean.getDeptId());
		user.setEmail(userUpdataBean.getEmail());
		user.setFixedPhone(userUpdataBean.getFixedPhone());
		user.setCorpId(userUpdataBean.getCorpId());
		user.setNote(userUpdataBean.getNote());
		user.setMobilephone(userUpdataBean.getMobilephone());
		user.setPhotoUrl(userUpdataBean.getPhotoUrl());
		user.setStatus((byte) 1);
		int  result = userDao.updateUser(user);
		
		SysUserRole sysUserRole = new SysUserRole();
		sysUserRole.setRoleId(userUpdataBean.getRoleId());
		sysUserRole.setUserId(userUpdataBean.getUserId());
		int  resultRole = userDao.updateUserRole(sysUserRole);
		if(result < 1 || resultRole < 1){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
		}
			}
		}
		return respBean;
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean updatePwd(UserModPwdReqBean usrModPwdBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("newPassword", usrModPwdBean.getNewPassword());
		paramMap.put("oldPassword", usrModPwdBean.getOldPassword());
		paramMap.put("userId", usrModPwdBean.getUserId());
		int result = userDao.updatePwd(paramMap);
		
		if(result<1){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
		}
		
		return respBean;
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean resetPwd(UserModPwdReqBean usrModPwdBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("userId", usrModPwdBean.getUserId());
		int result = userDao.resetPwd(paramMap);
		
		if(result<1){
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
		}
		
		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getBizLogList(BizLogListReqBean reqBean) {
		// 结束时间，加上时分秒，不然取不到结束那天的数据
		if (reqBean.getEndDate() != null) {
			reqBean.setEndDate(reqBean.getEndDate() + " 23:59:59");
		}
		
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		List<Map<String, Object>> list = userDao.selectBizLogList(paramMap,
				page);
		log.debug("biz log list : {}", list);
		log.debug("biz log list page : {}", page);

		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Transactional(propagation=Propagation.REQUIRED)
	public BaseRespBean insertBizLog(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int insertLogNum = userDao.insertBizLog(paramMap);
		if(insertLogNum<1){
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
		}
		return respBean;
	}
	
	@Override
	@Transactional(readOnly = true)
	public List<SysFuncInterface> getAllInterFace() {
		return userDao.selectAllInterface();
	}

	@Override
	@Transactional(readOnly = true)
	public List<UploadFilePath> getAllUploadFilePath() {
		return userDao.selectAllFilePath();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getAllSysConfig() {
		return userDao.selectAllSysConfig();
	}

	@Override
	@Transactional(readOnly = true)
	public int countUserByPhone(String phone) {
		return userDao.hasUserByMobilephone(phone);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getAllUserCorpJurisdiction() {
		return userDao.selectAllUserCorpJurisdiction();
	}

	@Override
	public BaseRespBean getSysConfigByKey(Map<String, Object> paramMap) {
		Map<String, Object> result = userDao.selectSysConfigByKey(paramMap);
		SysConfigRespBean respBean = new SysConfigRespBean();
		BeanUtil.mapToBean(result, respBean);
		return respBean;
	}
	
	
}