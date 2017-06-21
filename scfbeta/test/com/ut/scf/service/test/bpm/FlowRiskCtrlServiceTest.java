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
import com.ut.scf.service.bpm.IFlowRiskCtrlService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:spring-mybatis-test.xml" })
public class FlowRiskCtrlServiceTest {
    
    private static final Logger log = LoggerFactory.getLogger(FlowRiskCtrlServiceTest.class);
    
    @Autowired
    private IFlowRiskCtrlService flowRiskCtrlService;

    
	@Test
	public void addTest()
	{
		log.info("**********************************addTest start*********************************");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("rskctMsr", "1");
		paramMap.put("priId", "pri00001");
		paramMap.put("corpId", "corp00001");
		paramMap.put("createUserId", "u00001");
		BaseRespBean respBean = flowRiskCtrlService.insertFlowRiskCtrl(paramMap);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************addTest end*********************************");
	}
	
	@Test
	public void updateTest()
	{
		log.info("**********************************updateTest start*********************************");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("rskctId", "402881e45b52fb22001052fb22ab0000");
		paramMap.put("rskctMsr", "2");
		paramMap.put("priId", "pri00001");
		paramMap.put("corpId", "corp00001");
		BaseRespBean respBean = flowRiskCtrlService.updateFlowRiskCtrl(paramMap);
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
		BaseRespBean respBean = flowRiskCtrlService.getFlowRiskCtrlList(paramMap, page);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************listTest end*********************************");
	}
	
	@Test
	public void deleteTest()
	{
		log.info("**********************************deleteTest start*********************************");
		String rskctId = "402881e45b52fb22001052fb22ab0000";
		BaseRespBean respBean = flowRiskCtrlService.deleteFlowRiskCtrl(rskctId);
		log.info("respBean : " + respBean);
		Assert.assertNotNull(respBean);
		log.info("**********************************deleteTest end*********************************");
	}
}
