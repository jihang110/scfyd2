package com.ut.scf.service.test.crm;

import java.util.Date;
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
import com.ut.scf.service.crm.ILitigantSituationService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class LitigantSituationServiceTest {

	private static final Logger log = LoggerFactory.getLogger(LitigantSituationServiceTest.class);
	@Autowired ILitigantSituationService litigantSituationService;
	
	@Test
	public void getLitigantSituationListTest(){
		log.info("**********************************getLitigantSituationTest start*********************************");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00002");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);
		litigantSituationService.getLitigantSituationList(paramMap, page);
		log.info("**********************************getLitigantSituationTest end*********************************");
	}
	
	@Test
	public void addLitigantSituationTest(){
		log.info("**********************************addLitigantSituationTest start*********************************");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("corpId","corp00002");
		paramMap.put("litigantName", "大");
		paramMap.put("litigantMoney", 1111111.00);
		paramMap.put("querySource","英航");
		paramMap.put("createTime",new Date());
		paramMap.put("createUserId","2017000000001");
		litigantSituationService.addLitigantSituation(paramMap);
		log.info("**********************************addLitigantSituationTest end*********************************");
	}
	
	@Test
	public void deleteLitigantSituationTest(){
		log.info("**********************************deleteLitigantSituationTest start*********************************");
		litigantSituationService.deleteLitigantSituation("2c9983945af3e0626ad8f3e0cbad0001");
		log.info("**********************************deleteLitigantSituationTest end*********************************");
	}
	
	@Test
	public void updateLitigantSituationTest(){
		log.info("**********************************updateLitigantSituationTest start*********************************");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("recUid","2c9983945af3f771467af3f7710f0000");
		paramMap.put("litigantName","小大dada");
		paramMap.put("litigantMoney", 1111112.00);
		paramMap.put("querySource","英航应");
		paramMap.put("createTime",new Date());
		//paramMap.put("createUserId","2017000000002");
		litigantSituationService.updateLitigantSituation(paramMap);
		log.info("**********************************updateLitigantSituationTest end*********************************");
	}
}
