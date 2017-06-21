package com.ut.scf.pojo.auto;

import java.util.Date;

public class CorpDept {
    private String deptId;

    private String deptName;

    private String corpId;

    private String parentId;

    private String deptType;

    private Long staffNum;

    private String functions;

    private String orgStructurePath;

    private String contactPerson;

    private String contactPhone;

    private String note;

    private Date createTime;

    private Short status;

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getCorpId() {
        return corpId;
    }

    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getDeptType() {
        return deptType;
    }

    public void setDeptType(String deptType) {
        this.deptType = deptType;
    }

    public Long getStaffNum() {
        return staffNum;
    }

    public void setStaffNum(Long staffNum) {
        this.staffNum = staffNum;
    }

    public String getFunctions() {
        return functions;
    }

    public void setFunctions(String functions) {
        this.functions = functions;
    }

    public String getOrgStructurePath() {
        return orgStructurePath;
    }

    public void setOrgStructurePath(String orgStructurePath) {
        this.orgStructurePath = orgStructurePath;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }
}