package com.ut.scf.pojo.auto;

public class SysInterfaceLogWithBLOBs extends SysInterfaceLog {
    private String requsetParam;

    private String responseParam;

    public String getRequsetParam() {
        return requsetParam;
    }

    public void setRequsetParam(String requsetParam) {
        this.requsetParam = requsetParam;
    }

    public String getResponseParam() {
        return responseParam;
    }

    public void setResponseParam(String responseParam) {
        this.responseParam = responseParam;
    }
}