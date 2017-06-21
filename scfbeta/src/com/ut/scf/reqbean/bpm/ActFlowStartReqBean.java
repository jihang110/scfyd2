package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * 
 * @author Yuancy
 *	流程开始参数
 */
public class ActFlowStartReqBean extends BaseReqBean{
	/**
	 * 流程定义id
	 */
	private String processDefinitionId;
	/**
	 * 流程定义key
	 */
	private String processDefinitionKey;
	
	/**
	 * businessKey
	 */
	private String businessKey;
	
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public String getProcessDefinitionKey() {
		return processDefinitionKey;
	}

	public void setProcessDefinitionKey(String processDefinitionKey) {
		this.processDefinitionKey = processDefinitionKey;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}
	
}
