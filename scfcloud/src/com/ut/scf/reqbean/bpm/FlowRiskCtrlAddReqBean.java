package com.ut.scf.reqbean.bpm;

/**
 * @author shenyu
 *	flow_risk_ctrl表新增
 */
public class FlowRiskCtrlAddReqBean {
	
	private String rskctId;
	
	private String rskctMsr;
	
	private String priId;
	
	private String corpId;

	public String getRskctId() {
		return rskctId;
	}

	public void setRskctId(String rskctId) {
		this.rskctId = rskctId;
	}

	public String getRskctMsr() {
		return rskctMsr;
	}

	public void setRskctMsr(String rskctMsr) {
		this.rskctMsr = rskctMsr;
	}

	public String getPriId() {
		return priId;
	}

	public void setPriId(String priId) {
		this.priId = priId;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

}