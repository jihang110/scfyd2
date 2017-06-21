package com.ut.scf.service.test.crm;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.service.crm.IUploadFileRelaService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class UploadFileRelaTest {
	private static final Logger log = LoggerFactory.getLogger(UploadFileRelaTest.class);
	@Autowired IUploadFileRelaService uploadFileRelaService;
	@Test
	public void addTest() {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("fileId",ScfUUID.generate());
		paramMap.put("fileUrl","www.baidu.com");
		paramMap.put("corpId","corp0002");
		paramMap.put("sysType","1");
		paramMap.put("moduleType","2");
		paramMap.put("createUserId","12");
		uploadFileRelaService.addUploadFileRela(paramMap);
		log.info("**********************************addTest end*********************************");
	}
	@Test
	public void deleteTest(){
		String fileId = "2c9984ba5af075380417f079b2a70009";
		uploadFileRelaService.deleteFileRela(fileId);
		log.info("**********************************deleteTest end*********************************");
	}
	@Test
	public void getListTest(){
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("sysType","2");
		paramMap.put("corpId","corp00001");
		uploadFileRelaService.getFileRelaList(paramMap, page);
		log.info("**********************************deleteTest end*********************************");
	}
}
