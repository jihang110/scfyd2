package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysFuncInterface;
import com.ut.scf.pojo.auto.SysFuncInterfaceExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysFuncInterfaceMapper {
    int countByExample(SysFuncInterfaceExample example);

    int deleteByExample(SysFuncInterfaceExample example);

    int deleteByPrimaryKey(String interfaceId);

    int insert(SysFuncInterface record);

    int insertSelective(SysFuncInterface record);

    List<SysFuncInterface> selectByExample(SysFuncInterfaceExample example);

    SysFuncInterface selectByPrimaryKey(String interfaceId);

    int updateByExampleSelective(@Param("record") SysFuncInterface record, @Param("example") SysFuncInterfaceExample example);

    int updateByExample(@Param("record") SysFuncInterface record, @Param("example") SysFuncInterfaceExample example);

    int updateByPrimaryKeySelective(SysFuncInterface record);

    int updateByPrimaryKey(SysFuncInterface record);
}