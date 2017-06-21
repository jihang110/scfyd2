package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * @author shenyu
 *	ActFlow
 */
public class ActFlowReqBean extends BaseReqBean{
	/**
	 * 任务taskId
	 */
	private String taskId;
	/**
	 * 任务名称taskName
	 */
	private String taskName;
	/**
	 * 是否同意
	 * 0 同意；1 拒绝
	 */
	private String agreeStr;
	
	/**
	 * 审批意见
	 */
	private String advice;
	
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getAgreeStr() {
		return agreeStr;
	}
	public void setAgreeStr(String agreeStr) {
		this.agreeStr = agreeStr;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getAdvice() {
		return advice;
	}
	public void setAdvice(String advice) {
		this.advice = advice;
	}
	
	
}
