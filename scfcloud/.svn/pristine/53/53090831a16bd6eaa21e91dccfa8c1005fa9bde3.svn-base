package com.ut.scf.reqbean.xml;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TX")
@XmlAccessorType(XmlAccessType.FIELD)
public class AccountsReceivableReqBean extends BaseReqXmlBean {
	private static final long serialVersionUID = 1L;

	@XmlElementWrapper(name = "TX_INFO")
	@XmlElement(name = "LIST")
	private List<AccountsInfoReqXmlBean> beans;

	public List<AccountsInfoReqXmlBean> getBeans() {
		return beans;
	}

	public void setBeans(List<AccountsInfoReqXmlBean> beans) {
		this.beans = beans;
	}
}
