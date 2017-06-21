package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.UploadFilePath;
import com.ut.scf.pojo.auto.UploadFilePathExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface UploadFilePathMapper {
    int countByExample(UploadFilePathExample example);

    int deleteByExample(UploadFilePathExample example);

    int deleteByPrimaryKey(Integer pathId);

    int insert(UploadFilePath record);

    int insertSelective(UploadFilePath record);

    List<UploadFilePath> selectByExample(UploadFilePathExample example);

    UploadFilePath selectByPrimaryKey(Integer pathId);

    int updateByExampleSelective(@Param("record") UploadFilePath record, @Param("example") UploadFilePathExample example);

    int updateByExample(@Param("record") UploadFilePath record, @Param("example") UploadFilePathExample example);

    int updateByPrimaryKeySelective(UploadFilePath record);

    int updateByPrimaryKey(UploadFilePath record);
}