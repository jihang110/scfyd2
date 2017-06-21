package com.ut.scf.web.controller.asset;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.RecUidReqBean;
import com.ut.scf.reqbean.asset.PackageManagerAddReqBean;
import com.ut.scf.reqbean.asset.PackageManagerListReqBean;
import com.ut.scf.reqbean.asset.PackageManagerUpdateReqBean;
import com.ut.scf.reqbean.bpm.FlowProjectListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.asset.IPackageManagerService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 资产包的控制类
 * @author sheny
 *
 */
@Controller
@RequestMapping("/package")
public class PackageManagerController extends BaseJsonController{
	private static final Logger log = LoggerFactory
			.getLogger(PackageManagerController.class);
	@Resource
	private IPackageManagerService packageManagerService;
	
	@RequestMapping(value = "/list", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PackageManagerList(
			HttpSession httpSession,
			@Valid @RequestBody PackageManagerListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		respBean = packageManagerService.getPackageList(paramMap, page);
		return respBean;
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PacksgeManagerAdd(
			HttpSession httpSession,
			@Valid @RequestBody PackageManagerAddReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		// 获取用户信息
		String userIdSession = (String) httpSession
					.getAttribute(ScfConsts.SESSION_USER_ID);
		log.debug("userIdSession: {}", userIdSession);

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		paramMap.put("createUserId", userIdSession);
		respBean = packageManagerService.addPackage(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/mod", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PackageManagerUpdate(
			HttpSession httpSession,
			@Valid @RequestBody PackageManagerUpdateReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = packageManagerService.updatePackage(paramMap);
		return respBean;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean PackageManagerDelete(
			HttpSession httpSession,
			@Valid @RequestBody RecUidReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		String recUid = reqBean.getRecUid();
		respBean = packageManagerService.deletePackage(recUid);
		return respBean;
	}
	
	@RequestMapping(value = "/listByProId", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean selectProjectInfo(HttpSession httpSession,
			@Valid @RequestBody FlowProjectListReqBean reqBean,
			BindingResult bindingResult) throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		if (bindingResult.hasErrors()) {
			log.warn("bindingResult has error");
			respBean.setResult(ErrorCodeEnum.PARAM_VALID_ERROR);
			respBean.setResultErrorMap(bindingResult);
			return respBean;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("proNo", reqBean.getProId());
		respBean = packageManagerService.selectProjectInfo(map);
		return respBean;
	}
}
