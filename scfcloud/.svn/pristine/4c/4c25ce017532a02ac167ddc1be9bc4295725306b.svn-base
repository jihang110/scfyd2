package com.ut.scf.service.test;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.asset.IPackageManagerService;




@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class PackageServiceTest {
	 private static final Logger log = LoggerFactory.getLogger(PackageServiceTest.class);
	 @Autowired IPackageManagerService packagemanagerservice;	
	
	 @Test
		public void deletePackageTest()
		{
			log.info("deleteOrgnTest start");
			String recUid="001";
			BaseRespBean respBean = packagemanagerservice.deletePackage(recUid);
			log.info("deleteCreditReport : " + respBean);
			Assert.assertNotNull(respBean);
			log.info("************deleteOrgnTest end*************");
		}
}
