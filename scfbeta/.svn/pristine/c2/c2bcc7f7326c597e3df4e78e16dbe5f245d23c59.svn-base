package com.ut.scf.reqbean.xml;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"startSerialNum", "endSerialNum", "requestOrgnNum"})
public class BaseInfoReqXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name = "start_serial_num")
    private Long startSerialNum;
    @XmlElement(name = "end_serial_num")
    private Long endSerialNum;
    @XmlElement(name = "request_orgn_num")
    private String requestOrgnNum;
    
    public Long getStartSerialNum() {
        return startSerialNum;
    }

    public void setStartSerialNum(Long startSerialNum) {
        this.startSerialNum = startSerialNum;
    }

    public Long getEndSerialNum() {
        return endSerialNum;
    }

    public void setEndSerialNum(Long endSerialNum) {
        this.endSerialNum = endSerialNum;
    }

    public String getRequestOrgnNum() {
        return requestOrgnNum;
    }

    public void setRequestOrgnNum(String requestOrgnNum) {
        this.requestOrgnNum = requestOrgnNum;
    }
}
