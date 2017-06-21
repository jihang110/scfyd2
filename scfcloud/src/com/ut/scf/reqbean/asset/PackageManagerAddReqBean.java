package com.ut.scf.reqbean.asset;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class PackageManagerAddReqBean {
	private String recUid;
    private String corpId;
    private String corpName;
    private String apNo;
    private BigDecimal apAmount;
    private Date packetTime;
    private String assetRating;
    private String createUserId;
    private Integer proStatus;
    private List<String> proIds;
    
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
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getApNo() {
		return apNo;
	}
	public void setApNo(String apNo) {
		this.apNo = apNo;
	}
	public BigDecimal getApAmount() {
		return apAmount;
	}
	public void setApAmount(BigDecimal apAmount) {
		this.apAmount = apAmount;
	}
	public Date getPacketTime() {
		return packetTime;
	}
	public void setPacketTime(Date packetTime) {
		this.packetTime = packetTime;
	}
	public String getAssetRating() {
		return assetRating;
	}
	public void setAssetRating(String assetRating) {
		this.assetRating = assetRating;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public Integer getProStatus() {
		return proStatus;
	}
	public void setProStatus(Integer proStatus) {
		this.proStatus = proStatus;
	}
	public List<String> getProIds() {
		return proIds;
	}
	public void setProIds(List<String> proIds) {
		this.proIds = proIds;
	}
}