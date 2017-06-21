package com.ut.scf.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class TaxReturns {
    private String vatId;

    private String corpId;

    private String operYear;

    private BigDecimal purchasesTax;

    private BigDecimal salesTax;

    private Date createTime;

    private String createUserId;

    public String getVatId() {
        return vatId;
    }

    public void setVatId(String vatId) {
        this.vatId = vatId;
    }

    public String getCorpId() {
        return corpId;
    }

    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }

    public String getOperYear() {
        return operYear;
    }

    public void setOperYear(String operYear) {
        this.operYear = operYear;
    }

    public BigDecimal getPurchasesTax() {
        return purchasesTax;
    }

    public void setPurchasesTax(BigDecimal purchasesTax) {
        this.purchasesTax = purchasesTax;
    }

    public BigDecimal getSalesTax() {
        return salesTax;
    }

    public void setSalesTax(BigDecimal salesTax) {
        this.salesTax = salesTax;
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