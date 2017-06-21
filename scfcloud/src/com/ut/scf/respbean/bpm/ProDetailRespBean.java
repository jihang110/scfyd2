package com.ut.scf.respbean.bpm;

import com.ut.scf.respbean.ListRespBean;

public class ProDetailRespBean extends ListRespBean {

	/**
	 * 流程实例ID
	 */
	private Long procInsId;
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 授信方式：0首笔，1增额，2置换续期，3循环额度，4其他
	 */
	private String creditMode;
	/**
	 * 工作项ID
	 */
	
	private Long workItemId;
	
	/**
	 * 经办可否flg(0--查看,1--经办)
	 */
	private int operateFlg;
	
	/**
	 * 步骤ID
	 */
	private String stepId;
	/**
	 * 供应商id
	 */
	private String custNo;
	
	/**
	 * 项目id
	 */
	private String proId;
	
	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	public Long getWorkItemId() {
		return workItemId;
	}

	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}

	public int getOperateFlg() {
		return operateFlg;
	}

	public void setOperateFlg(int operateFlg) {
		this.operateFlg = operateFlg;
	}

	public String getStepId() {
		return stepId;
	}

	public void setStepId(String stepId) {
		this.stepId = stepId;
	}

	public Long getProcInsId() {
		return procInsId;
	}

	public void setProcInsId(Long procInsId) {
		this.procInsId = procInsId;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getCreditMode() {
		return creditMode;
	}

	public void setCreditMode(String creditMode) {
		this.creditMode = creditMode;
	}

	public String getProId() {
		return proId;
	}

	public void setProId(String proId) {
		this.proId = proId;
	}
	
}
