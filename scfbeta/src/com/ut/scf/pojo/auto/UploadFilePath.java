package com.ut.scf.pojo.auto;

import java.util.Date;

public class UploadFilePath {
    private Integer pathId;

    private String pathRule;

    private String pathName;

    private String note;

    private Date createTime;

    public Integer getPathId() {
        return pathId;
    }

    public void setPathId(Integer pathId) {
        this.pathId = pathId;
    }

    public String getPathRule() {
        return pathRule;
    }

    public void setPathRule(String pathRule) {
        this.pathRule = pathRule;
    }

    public String getPathName() {
        return pathName;
    }

    public void setPathName(String pathName) {
        this.pathName = pathName;
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
}