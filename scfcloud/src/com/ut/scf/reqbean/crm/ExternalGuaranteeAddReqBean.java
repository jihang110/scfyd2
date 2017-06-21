package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class ExternalGuaranteeAddReqBean extends BaseReqBean{
	private String guarantorName;
	
	private Double guaranteeMoney;
	
	private int guaranteeType;
	
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;
	
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getGuarantorName() {
		return guarantorName;
	}
	
	public void setGuarantorName(String guarantorName) {
		this.guarantorName = guarantorName;
	}
	
	public Double getGuaranteeMoney() {
		return guaranteeMoney;
	}
	
	public void setGuaranteeMoney(Double guaranteeMoney) {
		this.guaranteeMoney = guaranteeMoney;
	}
	
	public int getGuaranteeType() {
		return guaranteeType;
	}
	
	public void setGuaranteeType(int guaranteeType) {
		this.guaranteeType = guaranteeType;
	}
	
	
}
