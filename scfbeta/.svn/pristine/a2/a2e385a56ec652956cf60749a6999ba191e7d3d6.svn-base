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
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.crm.IExternalGuaranteeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class ExternalGuaranteeServiceTest {
	 private static final Logger log = LoggerFactory.getLogger(ExternalGuaranteeServiceTest.class);
	   
	 @Autowired IExternalGuaranteeService externalGuaranteeService;
	    
	    @Test
	    public void getExternalGuaranteeListTest(){
	    	log.info("**********************************getCustomerBankStreamListTest start*********************************");
	    	Map<String ,Object> paramMap = new HashMap<String,Object>();
	    	PageInfoBean page = new PageInfoBean();
			page.setPageNumber(1);
			page.setPageSize(10);
			BaseRespBean rep= new BaseRespBean();
			rep = externalGuaranteeService.getExternalGuaranteeList(paramMap,page);
			log.info("***********8"+rep);
			log.info("**********************************getCustomerBankStreamListTest end*********************************");
	    }
	    
	    
	    @Test
	    public void addExternalGuaranteeTest(){
	    	log.info("**********************************addCustomerBankStreamTest start*********************************");
	    	
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("corpId", "corp000001");
	    	paramMap.put("guarantorName","光大银行");
	    	paramMap.put("guaranteeMoney",11111111111.00);
	    	paramMap.put("guaranteeType","1");
	    	paramMap.put("createTime",new Date());
	    	paramMap.put("createUserId","u00001");
	    	externalGuaranteeService.addExternalGuarantee(paramMap);
	    	log.info("**********************************addCustomerBankStreamTest end*********************************");
	    }
	    
	    @Test
	    public void updateExternalGuaranteeTest(){
	    	log.info("**********************************updateCustomerBankStreamTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("recUid","2c9983065af8922e50e6f8922e4f0000");
	    	paramMap.put("guarantorName","光大银行");
	    	paramMap.put("guaranteeMoney",22222222222.00);
	    	paramMap.put("guaranteeType","4");
	    	externalGuaranteeService.updateExternalGuarantee(paramMap);
	    	log.info("**********************************updateCustomerBankStreamTest end*********************************");
	    }
	    
	    @Test
	    public void deleteExternalGuaranteeTest(){
	    	log.info("**********************************deleteCustomerBankStreamTest start*********************************");
	    	externalGuaranteeService.deleteExternalGuarantee("2c9983065af8922e50e6f8922e4f0000");
	    	log.info("**********************************deleteCustomerBankStreamTest end*********************************");
	    }
	    
	   
	    
	   
}