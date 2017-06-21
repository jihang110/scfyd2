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

import com.ut.scf.service.crm.IAffiliatedEnterpriseService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class AffiliatedEnterpriseTest {
	
	private static final Logger log = LoggerFactory.getLogger(AffiliatedEnterpriseTest.class);

	@Autowired IAffiliatedEnterpriseService affiliatedEnterpriseService;
	@Test
	public void insertAffiliatedEnterpriseTest(){
		 log.info("**********************************insertAffiliatedEnterpriseTest start*********************************");
		 Map<String, Object> paramMap = new HashMap<>();
		 paramMap.put("busiScope","1");
		 paramMap.put("ccy","人民币");
		 paramMap.put("corpId","corp00001");
		 paramMap.put("enterpriseName","中建八局");
		 paramMap.put("enterpriseName","1");
		 paramMap.put("industry","1");
		 affiliatedEnterpriseService.addAffiliatedEnterprise(paramMap);
		 log.info("**********************************insertAffiliatedEnterpriseTest end*********************************");
	}
}
