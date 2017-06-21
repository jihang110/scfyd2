package com.ut.scf.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class CorpContract {
    private String conId;

    private String corpId;

    private Boolean contractType;

    private String projectName;

    private String projectUser;

    private Date startDate;

    private Date endDate;

    private BigDecimal amount;

    private Date createTime;

    private String createUserId;

    public String getConId() {
        return conId;
    }

    public void setConId(String conId) {
        this.conId = conId;
    }

    public String getCorpId() {
        return corpId;
    }

    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }

    public Boolean getContractType() {
        return contractType;
    }

    public void setContractType(Boolean contractType) {
        this.contractType = contractType;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectUser() {
        return projectUser;
    }

    public void setProjectUser(String projectUser) {
        this.projectUser = projectUser;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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