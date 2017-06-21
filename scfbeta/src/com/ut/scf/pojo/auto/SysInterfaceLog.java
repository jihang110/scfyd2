package com.ut.scf.pojo.auto;

import java.util.Date;

public class SysInterfaceLog {
    private String recUid;

    private String requestSn;

    private String custId;

    private String userId;

    private String password;

    private String txCode;

    private String language;

    private String returnCode;

    private String returnMsg;

    private Date requestTime;

    private Date responseTime;

    private Date createTime;

    public String getRecUid() {
        return recUid;
    }

    public void setRecUid(String recUid) {
        this.recUid = recUid;
    }

    public String getRequestSn() {
        return requestSn;
    }

    public void setRequestSn(String requestSn) {
        this.requestSn = requestSn;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTxCode() {
        return txCode;
    }

    public void setTxCode(String txCode) {
        this.txCode = txCode;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getReturnCode() {
        return returnCode;
    }

    public void setReturnCode(String returnCode) {
        this.returnCode = returnCode;
    }

    public String getReturnMsg() {
        return returnMsg;
    }

    public void setReturnMsg(String returnMsg) {
        this.returnMsg = returnMsg;
    }

    public Date getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Date requestTime) {
        this.requestTime = requestTime;
    }

    public Date getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(Date responseTime) {
        this.responseTime = responseTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}