package com.ut.scf.respbean.xml;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TX")
@XmlAccessorType(XmlAccessType.FIELD)
public class StandardIndexRespBean extends BaseRespXmlBean {
	private static final long serialVersionUID = 1L;
	
	@XmlElement(name = "TX_INFO")
	private String bean;

	public String getBean() {
		return bean;
	}

	public void setBean(String bean) {
		this.bean = bean;
	}
	
}
