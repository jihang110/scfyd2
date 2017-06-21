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
import com.ut.scf.service.crm.ITaxReturnsService;

/**
 * 
 * @author lzy
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class TaxReturnsServiceTest {
	 private static final Logger log = LoggerFactory.getLogger(ProfitServiceTest.class);
	    
	    @Autowired ITaxReturnsService taxreturnsService;
	    
	    
	    @Test
	    public void getTaxReturnsTest(){
	    	log.info("=============================getTaxReturnsListTest start=============================");
			Map<String, Object> paramMap = new HashMap<>();
			PageInfoBean page = new PageInfoBean();
			paramMap.put("corpId","corp00002");
			page.setPageNumber(1);
			page.setPageSize(10);
			BaseRespBean respBean =taxreturnsService.getTaxReturnsList(paramMap, page);
			log.info("getCorpEvalList : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("=============================getTaxReturnsListTest end=============================");
	    }
	    
	    @Test
	    public void addTaxReturnsTest(){
	    	log.info("**********************************addOTaxTest start*********************************");
	    	
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("corpId","corp00001");
	    	paramMap.put("vatId","0001");
	    	paramMap.put("operYear","1993");
	    	paramMap.put("purchasesTax","444.00");
	    	paramMap.put("salestax",20000.00);
	    	taxreturnsService.addTaxReturns(paramMap);
	    	System.out.println(paramMap);
	    	log.info("**********************************addTaxTest end*********************************");
	    
	    }
	    
	    @Test
		public void deleteOrgnTest()
		{
			log.info("***********deleteTaxTest start*********");
			String vatId="0001";
			BaseRespBean respBean = taxreturnsService.deleteTaxReturns(vatId);
			log.info("deleteCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("**********************deleteTaxTest end*****************");
		}
	    
	    @Test
	    public void updateOrgnListTest(){
	    	log.info("**********************************updateOrgnTest start*********************************");
	    	Map<String, Object> paramMap = new HashMap<>();
	    	paramMap.put("vatId","00011");
	    	paramMap.put("purchasesTax","888.00");
	    	taxreturnsService.updateTaxReturns(paramMap);
	    	System.err.println(paramMap);
	    	log.info("**********************************updateOrgnTest end*********************************");
	    } 
	

}
