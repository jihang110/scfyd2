package com.ut.scf.reqbean.xml;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class StandardInfoReqXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "request_orgn_num")
    private String requestOrgnNum;
	@XmlElement(name = "app_num")
	private String appNum;
	@XmlElement(name = "orgn_num")
	private String orgnNum;
	@XmlElement(name = "feedback_status_cd")
	private String feedbackStatusCd;
	@XmlElement(name = "trade_years")
	private BigDecimal tradeYears;
	@XmlElement(name = "trade_activity")
	private String tradeActivity;
	@XmlElement(name = "multiple_evaluate")
	private String multipleEvaluate;
	@XmlElement(name = "limit_proposal")
	private Long limitProposal;
	
	public String getRequestOrgnNum() {
		return requestOrgnNum;
	}
	public void setRequestOrgnNum(String requestOrgnNum) {
		this.requestOrgnNum = requestOrgnNum;
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
	public String getFeedbackStatusCd() {
		return feedbackStatusCd;
	}
	public void setFeedbackStatusCd(String feedbackStatusCd) {
		this.feedbackStatusCd = feedbackStatusCd;
	}
	public BigDecimal getTradeYears() {
		return tradeYears;
	}
	public void setTradeYears(BigDecimal tradeYears) {
		this.tradeYears = tradeYears;
	}
	public String getTradeActivity() {
		return tradeActivity;
	}
	public void setTradeActivity(String tradeActivity) {
		this.tradeActivity = tradeActivity;
	}
	public String getMultipleEvaluate() {
		return multipleEvaluate;
	}
	public void setMultipleEvaluate(String multipleEvaluate) {
		this.multipleEvaluate = multipleEvaluate;
	}
	public Long getLimitProposal() {
		return limitProposal;
	}
	public void setLimitProposal(Long limitProposal) {
		this.limitProposal = limitProposal;
	}
}
