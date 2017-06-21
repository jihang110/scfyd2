package test.bean;

import java.math.BigDecimal;
import java.util.Date;

public class FlowGuaranteeInfo {
    private String grtId;

    private String grtName;

    private String grtMsr;

    private BigDecimal grtAmt;

    private String priId;

    private String corpId;

    private Date createTime;

    private String createUserId;

    public String getGrtId() {
        return grtId;
    }

    public void setGrtId(String grtId) {
        this.grtId = grtId;
    }

    public String getGrtName() {
        return grtName;
    }

    public void setGrtName(String grtName) {
        this.grtName = grtName;
    }

    public String getGrtMsr() {
        return grtMsr;
    }

    public void setGrtMsr(String grtMsr) {
        this.grtMsr = grtMsr;
    }

    public BigDecimal getGrtAmt() {
        return grtAmt;
    }

    public void setGrtAmt(BigDecimal grtAmt) {
        this.grtAmt = grtAmt;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }
}