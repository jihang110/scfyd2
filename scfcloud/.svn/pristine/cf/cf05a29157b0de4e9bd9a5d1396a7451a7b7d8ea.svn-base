package com.ut.scf.respbean.xml;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TX")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractRespBean extends BaseRespXmlBean {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "TX_INFO")
	private BaseInfoRespXmlBean<ContListRespXmlBean> bean;

	public BaseInfoRespXmlBean<ContListRespXmlBean> getBean() {
		return bean;
	}

	public void setBean(BaseInfoRespXmlBean<ContListRespXmlBean> bean) {
		this.bean = bean;
	}
}
