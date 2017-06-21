package com.ut.scf.reqbean.crm;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.NotNull;

import com.ut.scf.reqbean.BaseReqBean;

public class CorpContractUpdateReqBean extends BaseReqBean{

	private String conId;
	
	@NotNull(message = "企业ID不能为空")
	private String corpId;

	private String contractType;

	private String projectName;

    private String projectUser;

    private Date startDate;

    private Date endDate;

    private BigDecimal amount;

    private Date createTime;

    private String createUserId;

	public String getConId() {
		return conId;
	}

	public void setConId(String conId) {
		this.conId = conId;
	}
	
	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectUser() {
		return projectUser;
	}

	public void setProjectUser(String projectUser) {
		this.projectUser = projectUser;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	
	
	
}
