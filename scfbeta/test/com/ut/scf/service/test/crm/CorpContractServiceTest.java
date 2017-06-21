package com.ut.scf.service.test.crm;

import java.math.BigDecimal;
import java.util.Date;
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

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.ICorpContractService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class CorpContractServiceTest {

	private static final Logger log = LoggerFactory.getLogger(CorpEvalServiceTest.class);
	
	@Autowired
	private ICorpContractService corpContractService;

	
	
	@Test
	public void deleteCorpContract(){
		log.info("=============================deleteCorpContract start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("conId", "2c9983975af4f0da1f9ef4fcf0d10005");
		BaseRespBean respBean = corpContractService.deleteCorpContract(paramMap);
		log.info("deleteCorpContract : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================deleteCorpContract end=============================");
	}
	
	
	@Test
	public void updateCorpContract(){
		log.info("=============================updateCorpContract start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("conId", "1004");
		paramMap.put("corpId", "corp00004");
		paramMap.put("contractType", "2");
		paramMap.put("projectName", "项目4");
		paramMap.put("projectUser", "zhaoliu");
		Date d1 = new Date();
		Date d2 = new Date(d1.getTime()+3L*24L*60L*60L*1000L);
		paramMap.put("startDate", d1);
		paramMap.put("endDate", d2);
		paramMap.put("amount", new BigDecimal("444444.44"));
		paramMap.put("createTime", new Date());
		paramMap.put("createUserId", "0004");
		BaseRespBean respBean = corpContractService.updateCorpContract(paramMap);
		log.info("updateCorpContract : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================updateCorpContract end=============================");
	}
	
	@Test
	public void insertCorpContract(){
		log.info("=============================insertCorpContract start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("conId", "1004");
		paramMap.put("corpId", "corp00004");
		paramMap.put("contractType", "2");
		paramMap.put("projectName", "项目4");
		paramMap.put("projectUser", "zhaoliu");
		Date d1 = new Date();
		Date d2 = new Date(d1.getTime()+3L*24L*60L*60L*1000L);
		paramMap.put("startDate", d1);
		paramMap.put("endDate", d2);
		paramMap.put("amount", new BigDecimal("555555.55"));
		paramMap.put("createTime", new Date());
		paramMap.put("createUserId", "0004");
		BaseRespBean respBean = corpContractService.insertCorpContract(paramMap);
		log.info("addCorpContract : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================insertCorpContract end=============================");
	}
	
	@Test
	public void getcorpContractBidList(){
		log.info("=============================getcorpContractList start=============================");
			
		HashMap<String, Object> paramMap = new HashMap<String,Object>();
		paramMap.put("corpId","corp00001");
		PageInfoBean page  = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);	
		BaseRespBean respBean = corpContractService.getcorpContractList(paramMap, page);
		log.info("getCorpContractList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getCorpEvalListTest end=============================");	
	}
	
	@Test
	public void getcorpContractSaleList(){
		log.info("=============================getcorpContractList start=============================");
		HashMap<String, Object> paramMap = new HashMap<String,Object>();
		paramMap.put("corpId","corp00001");
		paramMap.put("contractType", 1);
		PageInfoBean page  = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(10);	
		BaseRespBean respBean = corpContractService.getcorpContractList(paramMap, page);
		log.info("getCorpContractList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getCorpEvalListTest end=============================");	
	}
	
}
