package com.ut.scf.web.controller.bpm;

import java.io.IOException;
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
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.reqbean.bpm.ProjectAnalyAddReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IProjectAnalyService;
import com.ut.scf.web.controller.BaseJsonController;


/**
 * 项目尽调项目分析的控制类
 * @author yuancy
 *
 */
@Controller
@RequestMapping("/projectAnaly")
public class ProjectAnalyController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(ProjectAnalyController.class);
	
	@Resource
	private IProjectAnalyService projectAnalyService;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" }, produces = { "application/json;charset=UTF-8" })
	public @ResponseBody BaseRespBean ProjectAnalyAdd(
			HttpSession httpSession,
			@Valid @RequestBody ProjectAnalyAddReqBean reqBean,
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
		respBean = projectAnalyService.insertProjectAnaly(paramMap);
		return respBean;
	}
}
