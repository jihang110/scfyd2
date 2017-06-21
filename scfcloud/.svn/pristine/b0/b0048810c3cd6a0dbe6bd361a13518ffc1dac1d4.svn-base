package com.ut.scf.reqbean.xml;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"requestOrgnNum", "custOrgnCode", "relateCustName", "contractNum", "billNum", "billBalanceAmt", "billDate", "creditPeriod", "isRead"})
public class AccountsInfoReqXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "request_orgn_num")
	private String requestOrgnNum;
	@XmlElement(name = "cust_orgn_code")
	private String custOrgnCode;
	@XmlElement(name = "relate_cust_name")
	private String relateCustName;
	@XmlElement(name = "contract_num")
	private String contractNum;
	@XmlElement(name = "bill_num")
	private String billNum;
	@XmlElement(name = "bill_balance_amt")
	private BigDecimal billBalanceAmt;
	@XmlElement(name = "bill_date")
	private Date billDate;
	@XmlElement(name = "credit_period")
	private Integer creditPeriod;
	@XmlElement(name = "is_read")
	private Boolean isRead;
	
	public String getRequestOrgnNum() {
		return requestOrgnNum;
	}
	public void setRequestOrgnNum(String requestOrgnNum) {
		this.requestOrgnNum = requestOrgnNum;
	}
	public String getCustOrgnCode() {
		return custOrgnCode;
	}
	public void setCustOrgnCode(String custOrgnCode) {
		this.custOrgnCode = custOrgnCode;
	}
	public String getRelateCustName() {
		return relateCustName;
	}
	public void setRelateCustName(String relateCustName) {
		this.relateCustName = relateCustName;
	}
	public String getContractNum() {
		return contractNum;
	}
	public void setContractNum(String contractNum) {
		this.contractNum = contractNum;
	}
	public String getBillNum() {
		return billNum;
	}
	public void setBillNum(String billNum) {
		this.billNum = billNum;
	}
	public BigDecimal getBillBalanceAmt() {
		return billBalanceAmt;
	}
	public void setBillBalanceAmt(BigDecimal billBalanceAmt) {
		this.billBalanceAmt = billBalanceAmt;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public Integer getCreditPeriod() {
		return creditPeriod;
	}
	public void setCreditPeriod(Integer creditPeriod) {
		this.creditPeriod = creditPeriod;
	}
	public Boolean getIsRead() {
		return isRead;
	}
	public void setIsRead(Boolean isRead) {
		this.isRead = isRead;
	}
}
