package com.ut.scf.web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.ScfCacheDict;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.reqbean.sys.CorpListReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.sys.FileRespBean;
import com.ut.scf.service.crm.IUploadFileRelaService;
import com.ut.scf.service.sys.ICorpService;

import sun.misc.BASE64Decoder;

@Controller
@RequestMapping("/file")
public class FileUploadController extends BaseJsonController {

	private static final Logger log = LoggerFactory
			.getLogger(FileUploadController.class);
	@RequestMapping(value = "/binUpload", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean binUpload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response) {
		// 得到文件服务器存储目录
		String uploadFilePath = getUploadFilePath(request);

		String path = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		String uploadName = file.getOriginalFilename();
		int idx = uploadName.lastIndexOf("."); 
        String suffix = uploadName.substring(idx).toLowerCase();//获得上传的图片的后缀名
        String fileName = ScfUUID.generate()+suffix;
		File targetFile = new File(path, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}

		FileRespBean resp = new FileRespBean();
		try {
			file.transferTo(targetFile);
		} catch (Exception e) {
			log.error("parse file exception", e);
			resp.setResult(ErrorCodeEnum.FAILED);
			return resp;

		}

		resp.setFileUrl(ScfCacheDict.sysConfigMap.get("scfcloudDomain") + request.getContextPath()
				+ "/"+ uploadFilePath + fileName);
		return resp;
	}
	
	@Resource private IUploadFileRelaService uploadFileRelaService;
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/attachmentUpload", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean attachmentUpload(
			@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response,HttpSession httpSession) {
		// 得到文件服务器存储目录
		String corpId = request.getParameter("corpId");
		String moduleType = request.getParameter("moduleType");
		String isPush = request.getParameter("isAgreement");
		String uploadFilePath = "uploadFile/attachment/"+corpId+File.separator+moduleType+File.separator;
		String path = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		String uploadName = file.getOriginalFilename();
		int idx = uploadName.lastIndexOf("."); 
        String suffix = uploadName.substring(idx).toLowerCase();//获得上传的图片的后缀名
        String fileName = ScfUUID.generate()+suffix;
		File targetFile = new File(path, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}

		FileRespBean resp = new FileRespBean();
		try {
			file.transferTo(targetFile);
		} catch (Exception e) {
			log.error("parse file exception", e);
			resp.setResult(ErrorCodeEnum.FAILED);
			return resp;

		}
		ListRespBean respBean = new ListRespBean();
		respBean = (ListRespBean) getCorpInfo(corpId);
		Map<String, Object> paramMap = new HashMap<>();
		String userIdSession = (String) httpSession.getAttribute(ScfConsts.SESSION_USER_ID);
		List<Map<String,Object>> list=  (List<Map<String, Object>>) respBean.getDataList();
		for(Map<String, Object> m:list){
			paramMap.put("corpId",m.get("corpId"));
			paramMap.put("sysType",m.get("sysType"));
			paramMap.put("moduleType",moduleType);
			paramMap.put("createUserId",userIdSession);
		}
		paramMap.put("isPush", StringUtils.isNotBlank(isPush) ? isPush : "0");
		paramMap.put("fileId",ScfUUID.generate());
		paramMap.put("fileName",uploadName);
		paramMap.put("fileUrl",uploadFilePath+fileName);
		uploadFileRelaService.addUploadFileRela(paramMap);
		
		resp.setFileUrl(ScfCacheDict.sysConfigMap.get("scfcloudDomain") + request.getContextPath()
				+ File.separator+ uploadFilePath+ fileName);
		return resp;
	}
	
	@Resource
	private ICorpService corpService;
	public BaseRespBean getCorpInfo(String corpId){
		CorpListReqBean reqBean = new CorpListReqBean();
		reqBean.setCorpId(corpId);
		BaseRespBean respBean = new BaseRespBean();
		respBean = this.corpService.corpList(reqBean);
		return respBean;
	}
	
	@RequestMapping(value = "/base64Upload", method = RequestMethod.POST)
	public @ResponseBody BaseRespBean base64Upload(HttpServletRequest request,
			HttpServletResponse response) {
		// 得到文件服务器存储目录
		String uploadFilePath = getUploadFilePath(request);

		FileRespBean resp = new FileRespBean();
		String filePath = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		String uploadName = request.getParameter("fileName");
		int idx = uploadName.lastIndexOf("."); 
        String suffix = uploadName.substring(idx);//获得上传的图片的后缀名
        String fileName = ScfUUID.generate()+suffix;
		String file = request.getParameter("fileBase64");
		// 只允许image
		String header = "data:image";
		String[] fileArr = file.split(",");
		if (fileArr[0].contains(header)) {
			// 去掉头部
			file = fileArr[1];
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				byte[] decodedBytes = decoder.decodeBuffer(file);
				String imgFilePath = filePath + File.separator + fileName;
				File targetFile = new File(filePath);
				if (!targetFile.exists()) {
					targetFile.mkdirs();
				}

				FileOutputStream out = new FileOutputStream(imgFilePath);
				out.write(decodedBytes);
				out.close();
				resp.setFileUrl(imgFilePath);

			} catch (Exception e) {
				resp.setResult(ErrorCodeEnum.FAILED);
			}

		}
		return resp;
	}

	/**
	 * 得到文件服务器存储目录
	 * @param request
	 * @return
	 */
	private String getUploadFilePath(HttpServletRequest request) {
		// 得到路径规则
		int pathId = 0; // 通用目录
		try {
			pathId = Integer.parseInt(request.getParameter("pathId"));
		} catch (Exception e) {
			log.warn("parse file path exception", e);
		}

		// 如果字典中没有目录规则，选择通用目录
		String uploadFilePath;
		if (!ScfCacheDict.uploadFilePathMap.containsKey(pathId)) {
			uploadFilePath = "uploadFile/common/";
		} else {
			uploadFilePath = ScfCacheDict.uploadFilePathMap.get(pathId)
					.getPathRule();
		}
		
		return uploadFilePath;
	}

}
