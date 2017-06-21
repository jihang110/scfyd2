package com.ut.scf.reqbean.sys;

import java.math.BigDecimal;
import java.util.Date;







import com.ut.scf.reqbean.BaseReqBean;

public class CorpAddReqBean extends BaseReqBean {

	/**
	 * 企业名称
	 */
	private String corpName;
	private String officeAddress;
    private String nTaxReg;
    private String lTaxReg;
    private String regAddress;
    private String ccy;
    private BigDecimal realPayCap;
    private BigDecimal regCap;
    private Date regDate;
    private String loanCardNo;
    private Integer sysType;
    private String busiScope;
    private String note;
    private String corpType;
    private Byte isCountry;
    private Byte isPush;
    private String legalPerson;
    private String controlPerson;
    private String logoUrl;
    private String industry;
    private String specNatural;
    private String historyEvc;
    private String coreCorpId;
    private String coreCorpName;
    private String appNum;
    private String openAccountLicence;
    private String customerAppSerialNum;
    private String orgnNum;
    private String businessLicense;
    private BigDecimal staffNum;
    private String fixedPhone;
    private String applicantName;
    private String applicantPhone;
    private String applicantFixPhone;
    private BigDecimal applyAmt;
    private String job;
    private String email;
    private String orgnCreditNum;
    
    
	public String getOrgnCreditNum() {
		return orgnCreditNum;
	}
	public void setOrgnCreditNum(String orgnCreditNum) {
		this.orgnCreditNum = orgnCreditNum;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getOfficeAddress() {
		return officeAddress;
	}
	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}
	public String getNTaxReg() {
		return nTaxReg;
	}
	public void setNTaxReg(String nTaxReg) {
		this.nTaxReg = nTaxReg;
	}
	public String getLTaxReg() {
		return lTaxReg;
	}
	public void setLTaxReg(String lTaxReg) {
		this.lTaxReg = lTaxReg;
	}
	public String getRegAddress() {
		return regAddress;
	}
	public void setRegAddress(String regAddress) {
		this.regAddress = regAddress;
	}
	public String getCcy() {
		return ccy;
	}
	public void setCcy(String ccy) {
		this.ccy = ccy;
	}
	public BigDecimal getRealPayCap() {
		return realPayCap;
	}
	public void setRealPayCap(BigDecimal realPayCap) {
		this.realPayCap = realPayCap;
	}
	public BigDecimal getRegCap() {
		return regCap;
	}
	public void setRegCap(BigDecimal regCap) {
		this.regCap = regCap;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public String getLoanCardNo() {
		return loanCardNo;
	}
	public void setLoanCardNo(String loanCardNo) {
		this.loanCardNo = loanCardNo;
	}
	public Integer getSysType() {
		return sysType;
	}
	public void setSysType(Integer sysType) {
		this.sysType = sysType;
	}
	public String getBusiScope() {
		return busiScope;
	}
	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public Byte getIsCountry() {
		return isCountry;
	}
	public void setIsCountry(Byte isCountry) {
		this.isCountry = isCountry;
	}
	public Byte getIsPush() {
		return isPush;
	}
	public void setIsPush(Byte isPush) {
		this.isPush = isPush;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public String getControlPerson() {
		return controlPerson;
	}
	public void setControlPerson(String controlPerson) {
		this.controlPerson = controlPerson;
	}
	public String getLogoUrl() {
		return logoUrl;
	}
	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getSpecNatural() {
		return specNatural;
	}
	public void setSpecNatural(String specNatural) {
		this.specNatural = specNatural;
	}
	public String getHistoryEvc() {
		return historyEvc;
	}
	public void setHistoryEvc(String historyEvc) {
		this.historyEvc = historyEvc;
	}
	public String getCoreCorpId() {
		return coreCorpId;
	}
	public void setCoreCorpId(String coreCorpId) {
		this.coreCorpId = coreCorpId;
	}
	public String getCoreCorpName() {
		return coreCorpName;
	}
	public void setCoreCorpName(String coreCorpName) {
		this.coreCorpName = coreCorpName;
	}
	public String getAppNum() {
		return appNum;
	}
	public void setAppNum(String appNum) {
		this.appNum = appNum;
	}
	public String getOpenAccountLicence() {
		return openAccountLicence;
	}
	public void setOpenAccountLicence(String openAccountLicence) {
		this.openAccountLicence = openAccountLicence;
	}
	public String getCustomerAppSerialNum() {
		return customerAppSerialNum;
	}
	public void setCustomerAppSerialNum(String customerAppSerialNum) {
		this.customerAppSerialNum = customerAppSerialNum;
	}
	public String getOrgnNum() {
		return orgnNum;
	}
	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}
	public String getBusinessLicense() {
		return businessLicense;
	}
	public void setBusinessLicense(String businessLicense) {
		this.businessLicense = businessLicense;
	}
	public BigDecimal getStaffNum() {
		return staffNum;
	}
	public void setStaffNum(BigDecimal staffNum) {
		this.staffNum = staffNum;
	}
	public String getFixedPhone() {
		return fixedPhone;
	}
	public void setFixedPhone(String fixedPhone) {
		this.fixedPhone = fixedPhone;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
	public String getApplicantPhone() {
		return applicantPhone;
	}
	public void setApplicantPhone(String applicantPhone) {
		this.applicantPhone = applicantPhone;
	}
	public String getApplicantFixPhone() {
		return applicantFixPhone;
	}
	public void setApplicantFixPhone(String applicantFixPhone) {
		this.applicantFixPhone = applicantFixPhone;
	}
	public BigDecimal getApplyAmt() {
		return applyAmt;
	}
	public void setApplyAmt(BigDecimal applyAmt) {
		this.applyAmt = applyAmt;
	}
}