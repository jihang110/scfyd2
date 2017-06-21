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

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IOrgnLoanCountService;
/**
 * 
 * @author lzy
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class OrgnLoanCountServiceTest {
	 private static final Logger log = LoggerFactory.getLogger(ProfitServiceTest.class);
	    
	    @Autowired IOrgnLoanCountService orgnloancountService;
	    
	   
		
	    @Test
	    public void getOrgnListTest(){
	    	log.info("=============================getOrgnListTest start=============================");
			Map<String, Object> paramMap = new HashMap<>();
			PageInfoBean page = new PageInfoBean();
			paramMap.put("corpId","corp00002");
			page.setPageNumber(1);
			page.setPageSize(10);
			BaseRespBean respBean = orgnloancountService.getOrgnFlowList(paramMap, page);
			log.info("getCorpEvalList : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("=============================getOrgnListTest end=============================");
	    }
	    
	    
	    @Test
	    public void addOrgnListTest(){
	    	log.info("**********************************addOrgnTest start*********************************");
	    	
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("corpId","corp00001");
	    	paramMap.put("recUid","00011");
	    	paramMap.put("loanBank","北大银行");
	    	paramMap.put("cautionMoney","444.00");
	    	paramMap.put("loanMoney",20000.00);
	    	orgnloancountService.addOrgnFlow(paramMap);
	    	System.out.println(paramMap);
	    	log.info("**********************************addOrgnTest end*********************************");
	    
	    }
	    
	    @Test
	    public void updateOrgnListTest(){
	    	log.info("**********************************updateOrgnTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("recUid","002");
	    	paramMap.put("loanBank","华夏银行");
	    	orgnloancountService.updateOrgnFlow(paramMap);
	    	System.err.println(paramMap);
	    	log.info("**********************************updateOrgnTest end*********************************");
	    }    
	    
	    @Test
		public void deleteOrgnTest()
		{
			log.info("deleteOrgnTest start");
			String recUid="001";
			BaseRespBean respBean = orgnloancountService.deleteOrgnFlow(recUid);
			log.info("deleteCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("deleteOrgnTest end");
		}
	    
}
