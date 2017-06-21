package com.ut.scf.service.test.bpm;

import java.util.List;

import org.activiti.engine.HistoryService;
import org.activiti.engine.history.HistoricDetail;
import org.activiti.engine.history.HistoricFormProperty;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis-test.xml" })
public class HistoryServiceTest {

	@Autowired
	protected HistoryService historyService;

	@Test
	public void testQueryHisTaskVarList() {
		HistoricVariableInstance var = historyService.createHistoricVariableInstanceQuery().taskId("52520")
				.variableName("hisDataJson").singleResult();
		System.out.println(var.getVariableName() + " " + var.getValue());
	}

	@Test
	public void testQueryHisTaskList() {
		String prcInstId = "27501";// "23932";
		List<HistoricTaskInstance> hisTaskList = historyService.createHistoricTaskInstanceQuery()
				.processInstanceId(prcInstId).list();
		for (HistoricTaskInstance task : hisTaskList) {
			System.out.println(task.getId() + " " + task.getName() + " " + task.getStartTime());
		}

		List<HistoricDetail> detailList = historyService.createNativeHistoricDetailQuery()
				.sql("SELECT * from act_hi_detail where proc_inst_id_ = '27501' and type_ = 'FormProperty'").list();
		for (HistoricDetail detail : detailList) {
			System.out.println(detail.getId());
		}

		HistoricFormProperty detail = (HistoricFormProperty) historyService.createHistoricDetailQuery().taskId("23946")
				.formProperties().singleResult();
		System.out.println(detail.getPropertyId());
		System.out.println(detail.getPropertyValue());
	}
}
