package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysType;
import com.ut.scf.pojo.auto.SysTypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysTypeMapper {
    int countByExample(SysTypeExample example);

    int deleteByExample(SysTypeExample example);

    int deleteByPrimaryKey(Integer typeId);

    int insert(SysType record);

    int insertSelective(SysType record);

    List<SysType> selectByExample(SysTypeExample example);

    SysType selectByPrimaryKey(Integer typeId);

    int updateByExampleSelective(@Param("record") SysType record, @Param("example") SysTypeExample example);

    int updateByExample(@Param("record") SysType record, @Param("example") SysTypeExample example);

    int updateByPrimaryKeySelective(SysType record);

    int updateByPrimaryKey(SysType record);
}