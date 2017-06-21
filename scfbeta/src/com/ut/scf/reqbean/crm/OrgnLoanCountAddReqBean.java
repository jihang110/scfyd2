package com.ut.scf.reqbean.crm;

import java.math.BigDecimal;
import java.util.Date;

import com.ut.scf.reqbean.BaseReqBean;

public class OrgnLoanCountAddReqBean extends BaseReqBean{
	 private String recUid;

	    private String corpId;

	    private Date loanDate;

	    private Date dueDate;

	    private String loanBank;

	    private String assureCompany;

	    private BigDecimal cautionMoney;

	    private BigDecimal loanMoney;

	    private BigDecimal profitRate;

	    private String pawn;

	    private Date createTime;

	    private String createUserId;
	    
	    
	    
	   

		public String getRecUid() {
	        return recUid;
	    }

	    public void setRecUid(String recUid) {
	        this.recUid = recUid;
	    }

	    public String getCorpId() {
	        return corpId;
	    }

	    public void setCorpId(String corpId) {
	        this.corpId = corpId;
	    }

	    public Date getLoanDate() {
	        return loanDate;
	    }

	    public void setLoanDate(Date loanDate) {
	        this.loanDate = loanDate;
	    }

	    public Date getDueDate() {
	        return dueDate;
	    }

	    public void setDueDate(Date dueDate) {
	        this.dueDate = dueDate;
	    }

	    public String getLoanBank() {
	        return loanBank;
	    }

	    public void setLoanBank(String loanBank) {
	        this.loanBank = loanBank;
	    }

	    public String getAssureCompany() {
	        return assureCompany;
	    }

	    public void setAssureCompany(String assureCompany) {
	        this.assureCompany = assureCompany;
	    }

	    public BigDecimal getCautionMoney() {
	        return cautionMoney;
	    }

	    public void setCautionMoney(BigDecimal cautionMoney) {
	        this.cautionMoney = cautionMoney;
	    }

	    public BigDecimal getLoanMoney() {
	        return loanMoney;
	    }

	    public void setLoanMoney(BigDecimal loanMoney) {
	        this.loanMoney = loanMoney;
	    }

	    public BigDecimal getProfitRate() {
	        return profitRate;
	    }

	    public void setProfitRate(BigDecimal profitRate) {
	        this.profitRate = profitRate;
	    }

	    public String getPawn() {
	        return pawn;
	    }

	    public void setPawn(String pawn) {
	        this.pawn = pawn;
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
}
