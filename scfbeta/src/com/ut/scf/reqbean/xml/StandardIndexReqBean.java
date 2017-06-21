package com.ut.scf.reqbean.xml;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TX")
@XmlAccessorType(XmlAccessType.FIELD)
public class StandardIndexReqBean extends BaseReqXmlBean {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "TX_INFO")
	private StandardInfoReqXmlBean bean;

	public StandardInfoReqXmlBean getBean() {
		return bean;
	}

	public void setBean(StandardInfoReqXmlBean bean) {
		this.bean = bean;
	}
	
}
