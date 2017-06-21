package com.ut.scf.respbean.xml;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "LIST")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"customerAppSerialNum", "appNum", "orgnNum", "customerName", "applicantName", "applicantFixPhone", "applicantPhone", "applyAmt"})
public class RegListRespXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name = "customer_app_serial_num")
	private Long customerAppSerialNum;
	@XmlElement(name = "app_num")
	private String appNum;
	@XmlElement(name = "orgn_num")
	private String orgnNum;
	@XmlElement(name = "customer_name")
	private String customerName;
	@XmlElement(name = "applicant_name")
	private String applicantName;
	@XmlElement(name = "applicant_fix_phone")
	private String applicantFixPhone;
	@XmlElement(name = "applicant_phone")
	private String applicantPhone;
	@XmlElement(name = "apply_amt")
	private BigDecimal applyAmt;
	
	public Long getCustomerAppSerialNum() {
		return customerAppSerialNum;
	}
	public void setCustomerAppSerialNum(Long customerAppSerialNum) {
		this.customerAppSerialNum = customerAppSerialNum;
	}
	public String getAppNum() {
		return appNum;
	}
	public void setAppNum(String appNum) {
		this.appNum = appNum;
	}
	public String getOrgnNum() {
		return orgnNum;
	}
	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
	public String getApplicantFixPhone() {
		return applicantFixPhone;
	}
	public void setApplicantFixPhone(String applicantFixPhone) {
		this.applicantFixPhone = applicantFixPhone;
	}
	public String getApplicantPhone() {
		return applicantPhone;
	}
	public void setApplicantPhone(String applicantPhone) {
		this.applicantPhone = applicantPhone;
	}
	public BigDecimal getApplyAmt() {
		return applyAmt;
	}
	public void setApplyAmt(BigDecimal applyAmt) {
		this.applyAmt = applyAmt;
	}
}
