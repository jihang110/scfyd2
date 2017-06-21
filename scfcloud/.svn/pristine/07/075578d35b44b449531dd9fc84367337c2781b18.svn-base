package com.ut.scf.service.test.bpm;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.bpm.IWorkFlowService;
import com.ut.scf.service.test.PackageServiceTest;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class YiJie {
	private static final Logger log = LoggerFactory.getLogger(PackageServiceTest.class);
	 @Autowired IWorkFlowService  workflowservice;	
	
	 @Test
		public void deleteYIjieTest()
		{
			log.info("deleteOrgnTest start");
			String priId="1801";
			BaseRespBean respBean = workflowservice.deleteWorkFlow(priId);
			log.info("deleteCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("************deleteOrgnTest end*************");
		}
}
