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
@XmlType(propOrder = {"serialNum", "custName", "contractNum", "payoutNum", "currencyCd", "prepaymentAmt", "entityAmt", "billNum"})
public class LoanListRespXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "serial_num")
	private Long serialNum;
	@XmlElement(name = "cust_name")
	private String custName;
	@XmlElement(name = "contract_num")
	private String contractNum;
	@XmlElement(name = "payout_num")
	private String payoutNum;
	@XmlElement(name = "currency_cd")
	private String currencyCd;
	@XmlElement(name = "prepayment_amt")
	private BigDecimal prepaymentAmt;
	@XmlElement(name = "entity_amt")
	private BigDecimal entityAmt;
	@XmlElement(name = "bill_num")
	private String billNum;
	public Long getSerialNum() {
		return serialNum;
	}
	public void setSerialNum(Long serialNum) {
		this.serialNum = serialNum;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getContractNum() {
		return contractNum;
	}
	public void setContractNum(String contractNum) {
		this.contractNum = contractNum;
	}
	public String getPayoutNum() {
		return payoutNum;
	}
	public void setPayoutNum(String payoutNum) {
		this.payoutNum = payoutNum;
	}
	public String getCurrencyCd() {
		return currencyCd;
	}
	public void setCurrencyCd(String currencyCd) {
		this.currencyCd = currencyCd;
	}
	public BigDecimal getPrepaymentAmt() {
		return prepaymentAmt;
	}
	public void setPrepaymentAmt(BigDecimal prepaymentAmt) {
		this.prepaymentAmt = prepaymentAmt;
	}
	public BigDecimal getEntityAmt() {
		return entityAmt;
	}
	public void setEntityAmt(BigDecimal entityAmt) {
		this.entityAmt = entityAmt;
	}
	public String getBillNum() {
		return billNum;
	}
	public void setBillNum(String billNum) {
		this.billNum = billNum;
	}
}
