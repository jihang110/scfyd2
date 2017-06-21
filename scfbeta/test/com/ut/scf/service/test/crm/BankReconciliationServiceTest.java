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
import com.ut.scf.pojo.BankReconciliation;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IBankReconciliationService;
/**
 * 
 * @author Yuancy
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class BankReconciliationServiceTest {
	private static final Logger log = LoggerFactory.getLogger(BankReconciliationServiceTest.class);

	@Autowired IBankReconciliationService bankReconciliationService;
	@Test
	public void getCorpInfoList(){
		log.info("=============================getCorpEvalListTest start=============================");
		Map<String, Object> paramMap = new HashMap<>();
		PageInfoBean page = new PageInfoBean();
		paramMap.put("recId","1112");
		page.setPageNumber(1);
		page.setPageSize(10);
		BaseRespBean respBean = bankReconciliationService.getCorpInfoList(paramMap,page);
		log.info("getCorpInfoList : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================getCorpEvalListTest end=============================");
	}
	
	@Test
	public void insert(){
		log.info("=============================addRec start==========================");
		BankReconciliation record = new BankReconciliation();
		record.setAccount("10001");
		record.setAccountAmount(new BigDecimal("10001"));
		record.setCorpId("corp00001");
		record.setAccountName("苏州支行");
		record.setCreateTime(new Date());
		BaseRespBean respBean = bankReconciliationService.addRec(record);
		log.info("addCorpEval : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("=============================addRec end=============================");
	}
	
	@Test
	public void delete(){
		log.info("**********************************deleteRec start*************************");
		BaseRespBean respBean = bankReconciliationService.deleteRec("1112");
		log.info("deleteRole respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************deleteRec end*************************");

	}
	
	@Test
	public void update(){
		log.info("**********************************deleteRec start*************************");
		BaseRespBean respBean ;
		BankReconciliation record = new BankReconciliation();
		record.setRecId("1114");
		record.setAccountBank("上海支行");
		respBean = bankReconciliationService.updateRec(record);
		log.info("deleteRole respBean : {}", respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************deleteRec end*************************");
	}
}
