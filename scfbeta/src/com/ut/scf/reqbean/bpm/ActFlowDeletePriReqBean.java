package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/*
 * @author zyx
 */
public class ActFlowDeletePriReqBean extends BaseReqBean{
	/**
	 * 流程实例id
	 * 
	 */
	private String processInstanceId;

	/**
	 * 原因
	 */
	private String deleteReason;
	
	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getDeleteReason() {
		return deleteReason;
	}

	public void setDeleteReason(String deleteReason) {
		this.deleteReason = deleteReason;
	}

	
}
