package com.ut.scf.respbean.xml;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class AccReceRespXmlBean implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "receive_state")
	private Boolean receiveState;
	@XmlElement(name = "fail_reason")
	private String failReason;

	public Boolean getReceiveState() {
		return receiveState;
	}

	public void setReceiveState(Boolean receiveState) {
		this.receiveState = receiveState;
	}

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}
	
}
