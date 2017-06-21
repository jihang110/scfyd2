package com.ut.scf.reqbean.crm;

import java.math.BigDecimal;

public class LitigantSituationUpdateReqBean {

	private String corpId;
	
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	private String recUid;
	
	private String litigantName;
	
	private BigDecimal litigantMoney;
	
	private String querySource;
	
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

}
