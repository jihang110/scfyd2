package com.ut.scf.reqbean.xml;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"requestSn", "custId", "userId", "password", "txCode", "language"})
public class BaseReqXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name = "REQUEST_SN")
    private String requestSn;
    @XmlElement(name = "CUST_ID")
    private String custId;
    @XmlElement(name = "USER_ID")
    private String userId;
    @XmlElement(name = "PASSWORD")
    private String password;
    @XmlElement(name = "TX_CODE")
    private String txCode;
    @XmlElement(name = "LANGUAGE")
    private String language;
    
    public String getRequestSn() {
        return requestSn;
    }

    public void setRequestSn(String requestSn) {
        this.requestSn = requestSn;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTxCode() {
        return txCode;
    }

    public void setTxCode(String txCode) {
        this.txCode = txCode;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
