package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysBizLog;
import com.ut.scf.pojo.auto.SysBizLogExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysBizLogMapper {
    int countByExample(SysBizLogExample example);

    int deleteByExample(SysBizLogExample example);

    int deleteByPrimaryKey(String logId);

    int insert(SysBizLog record);

    int insertSelective(SysBizLog record);

    List<SysBizLog> selectByExample(SysBizLogExample example);

    SysBizLog selectByPrimaryKey(String logId);

    int updateByExampleSelective(@Param("record") SysBizLog record, @Param("example") SysBizLogExample example);

    int updateByExample(@Param("record") SysBizLog record, @Param("example") SysBizLogExample example);

    int updateByPrimaryKeySelective(SysBizLog record);

    int updateByPrimaryKey(SysBizLog record);
}