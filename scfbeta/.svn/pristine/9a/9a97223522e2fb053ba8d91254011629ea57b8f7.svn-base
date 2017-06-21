package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysRoleInterface;
import com.ut.scf.pojo.auto.SysRoleInterfaceExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysRoleInterfaceMapper {
    int countByExample(SysRoleInterfaceExample example);

    int deleteByExample(SysRoleInterfaceExample example);

    int deleteByPrimaryKey(String recUid);

    int insert(SysRoleInterface record);

    int insertSelective(SysRoleInterface record);

    List<SysRoleInterface> selectByExample(SysRoleInterfaceExample example);

    SysRoleInterface selectByPrimaryKey(String recUid);

    int updateByExampleSelective(@Param("record") SysRoleInterface record, @Param("example") SysRoleInterfaceExample example);

    int updateByExample(@Param("record") SysRoleInterface record, @Param("example") SysRoleInterfaceExample example);

    int updateByPrimaryKeySelective(SysRoleInterface record);

    int updateByPrimaryKey(SysRoleInterface record);
}