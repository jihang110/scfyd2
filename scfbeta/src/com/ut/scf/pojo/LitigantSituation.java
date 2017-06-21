package com.ut.scf.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class LitigantSituation {
    private String recUid;
    
    private String corpId;

    private String litigantName;

    private BigDecimal litigantMoney;

    private String querySource;

    private Date createTime;

    private String createUserId;

    public String getRecUid() {
        return recUid;
    }

    public void setRecUid(String recUid) {
        this.recUid = recUid;
    }

    public String getLitigantName() {
        return litigantName;
    }

    public void setLitigantName(String litigantName) {
        this.litigantName = litigantName;
    }

    public BigDecimal getLitigantMoney() {
        return litigantMoney;
    }

    public void setLitigantMoney(BigDecimal litigantMoney) {
        this.litigantMoney = litigantMoney;
    }

    public String getQuerySource() {
        return querySource;
    }

    public void setQuerySource(String querySource) {
        this.querySource = querySource;
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