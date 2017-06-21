package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysInterfaceLog;
import com.ut.scf.pojo.auto.SysInterfaceLogExample;
import com.ut.scf.pojo.auto.SysInterfaceLogWithBLOBs;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysInterfaceLogMapper {
    int countByExample(SysInterfaceLogExample example);

    int deleteByExample(SysInterfaceLogExample example);

    int deleteByPrimaryKey(String recUid);

    int insert(SysInterfaceLogWithBLOBs record);

    int insertSelective(SysInterfaceLogWithBLOBs record);

    List<SysInterfaceLogWithBLOBs> selectByExampleWithBLOBs(SysInterfaceLogExample example);

    List<SysInterfaceLog> selectByExample(SysInterfaceLogExample example);

    SysInterfaceLogWithBLOBs selectByPrimaryKey(String recUid);

    int updateByExampleSelective(@Param("record") SysInterfaceLogWithBLOBs record, @Param("example") SysInterfaceLogExample example);

    int updateByExampleWithBLOBs(@Param("record") SysInterfaceLogWithBLOBs record, @Param("example") SysInterfaceLogExample example);

    int updateByExample(@Param("record") SysInterfaceLog record, @Param("example") SysInterfaceLogExample example);

    int updateByPrimaryKeySelective(SysInterfaceLogWithBLOBs record);

    int updateByPrimaryKeyWithBLOBs(SysInterfaceLogWithBLOBs record);

    int updateByPrimaryKey(SysInterfaceLog record);
}