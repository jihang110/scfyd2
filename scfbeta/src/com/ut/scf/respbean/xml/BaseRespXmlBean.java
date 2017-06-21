package com.ut.scf.respbean.xml;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"requestSn", "custId", "txCode", "returnCode", "returnMsg", "language"})
public class BaseRespXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "REQUEST_SN")
    private String requestSn;
    @XmlElement(name = "CUST_ID")
    private String custId;
    @XmlElement(name = "TX_CODE")
    private String txCode;
    @XmlElement(name = "RETURN_CODE")
    private String returnCode;
    @XmlElement(name = "RETURN_MSG")
    private String returnMsg;
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

    public String getReturnCode() {
		return returnCode;
	}

	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
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
