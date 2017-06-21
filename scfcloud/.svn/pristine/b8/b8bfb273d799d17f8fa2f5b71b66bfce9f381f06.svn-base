package com.ut.scf.service.test.crm;

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
import com.ut.scf.service.crm.ICreditReportService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class CreditReportServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(CreditReportServiceTest.class);
    
    @Autowired
    private ICreditReportService creditReportService;
    
    
	@Test
	public void addCreditReportTest()
	{
			log.info(" start");
			Map<String, Object> paramMap = new HashMap<>();
			
			paramMap.put("corpId", "corp00001");
			paramMap.put("creditType", 0);
			paramMap.put("creditSituation", " ");
			paramMap.put("ratingType", "1");
			paramMap.put("ratingAgency", "1");
			paramMap.put("ratingTime", new Date());
			paramMap.put("ratingResult", "1");
			paramMap.put("note", "1");
			paramMap.put("loanCardNo", "1");
			paramMap.put("inquiryPassword", "1");
			paramMap.put("inquiryTime", new Date());
			paramMap.put("summaryOfCreditReport", " ");
			paramMap.put("otherChannelInfo", " ");
			paramMap.put("createTime", new Date());
			paramMap.put("createUserId", "1");
			BaseRespBean respBean = creditReportService.addCreditReport(paramMap);
			log.info("addCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("addCreditReportTest end");
		
	}
    
    @Test
    public void corpCreditReportListTest()
    {
    	log.info("**********************************CreditReportListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
		paramMap.put("creditType", 0);
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = creditReportService.getCorpCreditReportList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************CreditReportListTest end*********************************");
    }
    
    @Test
    public void shareHolderCreditReportListTest()
    {
    	log.info("**********************************CreditReportListTest start*********************************");
    	Map<String, Object> paramMap = new HashMap<>();
    	PageInfoBean page = new PageInfoBean();
		paramMap.put("shareName", "张三");
		page.setPageNumber(1);
		page.setPageSize(10);
    	BaseRespBean respBean = creditReportService.getShareHolderCreditReportList(paramMap, page);
    	log.info("resultList : " + respBean); 
    	Assert.assertNotNull(respBean);
    	log.info("**********************************CreditReportListTest end*********************************");
    }
    
	@Test
	public void updateCreditReportTest()
	{
		log.info("updateCreditReportTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("creditId", "2c99838857f57b5b3836f5c5a63f000e");
		paramMap.put("createUserId", "u00005");
		BaseRespBean respBean = creditReportService.updateCreditReport(paramMap);
		log.info("updateCredit : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("updateCreditReportTest end");
	}
    
	@Test
	public void deleteCreditReportTest()
	{
		log.info("deleteCreditReportTest start");
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("creditId", "2c99831f5aef451a2b0fef451ab70000");
		BaseRespBean respBean = creditReportService.deleteCreditReport(paramMap);
		log.info("deleteCreditReport : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("deleteCreditReportTest end");
	}
	
}
