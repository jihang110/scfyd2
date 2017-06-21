package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.CorpDept;
import com.ut.scf.pojo.auto.CorpDeptExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CorpDeptMapper {
    int countByExample(CorpDeptExample example);

    int deleteByExample(CorpDeptExample example);

    int deleteByPrimaryKey(String deptId);

    int insert(CorpDept record);

    int insertSelective(CorpDept record);

    List<CorpDept> selectByExample(CorpDeptExample example);

    CorpDept selectByPrimaryKey(String deptId);

    int updateByExampleSelective(@Param("record") CorpDept record, @Param("example") CorpDeptExample example);

    int updateByExample(@Param("record") CorpDept record, @Param("example") CorpDeptExample example);

    int updateByPrimaryKeySelective(CorpDept record);

    int updateByPrimaryKey(CorpDept record);
}