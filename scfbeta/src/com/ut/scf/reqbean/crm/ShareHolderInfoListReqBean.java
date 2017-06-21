package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.PageReqBean;

public class ShareHolderInfoListReqBean extends PageReqBean{
    private String shareName;
    private String shareType;
    private String corpName;
    private String corpId;
    /**
	 * 是否分页，0：否，1：是，默认为1.
	 */
    private Integer isPage = 1;
    
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getShareName() {
		return shareName;
	}

	public void setShareName(String shareName) {
		this.shareName = shareName;
	}

	public String getShareType() {
		return shareType;
	}

	public void setShareType(String shareType) {
		this.shareType = shareType;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

	

    
}