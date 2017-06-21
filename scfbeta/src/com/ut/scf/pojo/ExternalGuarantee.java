package com.ut.scf.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class ExternalGuarantee {
    private String recUid;
    
    private String corpId;
    
    private String guarantorName;

    private BigDecimal guaranteeMoney;

    private Boolean guaranteeType;

    private Date createTime;

    private String createUserId;

    public String getRecUid() {
        return recUid;
    }

    public void setRecUid(String recUid) {
        this.recUid = recUid;
    }

    public String getGuarantorName() {
        return guarantorName;
    }

    public void setGuarantorName(String guarantorName) {
        this.guarantorName = guarantorName;
    }

    public BigDecimal getGuaranteeMoney() {
        return guaranteeMoney;
    }

    public void setGuaranteeMoney(BigDecimal guaranteeMoney) {
        this.guaranteeMoney = guaranteeMoney;
    }

    public Boolean getGuaranteeType() {
        return guaranteeType;
    }

    public void setGuaranteeType(Boolean guaranteeType) {
        this.guaranteeType = guaranteeType;
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