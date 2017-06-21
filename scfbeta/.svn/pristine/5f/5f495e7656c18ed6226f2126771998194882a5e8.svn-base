package com.ut.scf.service.test.bpm;

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
import com.ut.scf.service.bpm.IFlowGuaranteeInfoService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class FlowGuaranteeInfoServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(FlowGuaranteeInfoServiceTest.class);
    
    @Autowired
    private IFlowGuaranteeInfoService flowGuaranteeInfoService;

    
	@Test
	public void addTest()
	{
		log.info("**********************************addTest start*********************************");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("grtName", "1");
		paramMap.put("grtMsr", "1");
		paramMap.put("grtAmt", "10000");
		paramMap.put("priId", "pri00001");
		paramMap.put("corpId", "corp00001");
		paramMap.put("createUserId", "u00001");
		BaseRespBean respBean = flowGuaranteeInfoService.insertFlowGuaranteeInfo(paramMap);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************addTest end*********************************");
	}
	
	@Test
	public void updateTest()
	{
		log.info("**********************************updateTest start*********************************");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("grtId", "402881e45b5314bc42885314bc3e0000");
		paramMap.put("grtName", "2");
		paramMap.put("grtMsr", "2");
		paramMap.put("grtAmt", "10000");
		paramMap.put("priId", "pri00001");
		paramMap.put("corpId", "corp00001");
		BaseRespBean respBean = flowGuaranteeInfoService.updateFlowGuaranteeInfo(paramMap);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************updateTest end*********************************");
	}
	
	@Test
	public void listTest()
	{
		log.info("**********************************listTest start*********************************");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("corpId", "corp00001");
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(1);
		page.setPageSize(5);
		BaseRespBean respBean = flowGuaranteeInfoService.getFlowGuaranteeInfoList(paramMap, page);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************listTest end*********************************");
	}
	
	@Test
	public void deleteTest()
	{
		log.info("**********************************deleteTest start*********************************");
		String grtId = "402881e45b5314bc42885314bc3e0000";
		BaseRespBean respBean = flowGuaranteeInfoService.deleteFlowGuaranteeInfo(grtId);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************deleteTest end*********************************");
	}
}
