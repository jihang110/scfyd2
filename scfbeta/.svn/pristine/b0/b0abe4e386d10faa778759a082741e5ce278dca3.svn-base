package com.ut.scf.service.test.crm;

import java.util.HashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICorpInfoService;

/**
 * 
 * @author zhangjj
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class CorpInfoServiceTest {

	private static final Logger log = LoggerFactory.getLogger(CorpInfoServiceTest.class);
	
	@Autowired
	private ICorpInfoService corpInfoService;
	
	
	
	@Test
	public void getCorpInfoBaseByCorpIdTest(){
		log.info("=============================getCorpInfoBaseByCorpIdTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00001");
		BaseRespBean respBean = corpInfoService.getCorpInfoBaseByCorpId(paramMap);
		log.info("getCorpInfoBaseByCorpIdTest : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getCorpInfoBaseByCorpIdTest end=============================");
	}
	
	@Test
	public void updateCorpInfoTest(){
		log.info("=============================updateCorpInfoTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("coreCorpName","aaaa");
		paramMap.put("applicantName","bbb");
		paramMap.put("corpId","corp00001");

		BaseRespBean respBean = corpInfoService.updateCorpInfo(paramMap);
		log.info("updateCorpInfo : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================updateCorpInfoTest end=============================");
	}
	
	
	
	
	
	
	
}
