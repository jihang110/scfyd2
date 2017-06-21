package com.ut.scf.respbean.xml;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.NONE)
@XmlType(propOrder = {"maxSerialNum", "beans"})
public class BaseInfoRespXmlBean<T> implements Serializable {
	private static final long serialVersionUID = 1L;

	@XmlElement(name = "max_serial_num")
    private Long maxSerialNum;
	@XmlElementRefs(value = { 
			@XmlElementRef(type = RegListRespXmlBean.class),
			@XmlElementRef(type = ContListRespXmlBean.class),
			@XmlElementRef(type = LoanListRespXmlBean.class)
	})
	private List<T> beans;
	
	public Long getMaxSerialNum() {
		return maxSerialNum;
	}
	public void setMaxSerialNum(Long maxSerialNum) {
		this.maxSerialNum = maxSerialNum;
	}
	public List<T> getBeans() {
		return beans;
	}
	public void setBeans(List<T> beans) {
		this.beans = beans;
	}
}
