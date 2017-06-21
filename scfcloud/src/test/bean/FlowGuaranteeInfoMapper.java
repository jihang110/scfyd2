package test.bean;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import test.bean.FlowGuaranteeInfo;
import test.bean.FlowGuaranteeInfoExample;

public interface FlowGuaranteeInfoMapper {
    int countByExample(FlowGuaranteeInfoExample example);

    int deleteByExample(FlowGuaranteeInfoExample example);

    int deleteByPrimaryKey(String grtId);

    int insert(FlowGuaranteeInfo record);

    int insertSelective(FlowGuaranteeInfo record);

    List<FlowGuaranteeInfo> selectByExample(FlowGuaranteeInfoExample example);

    FlowGuaranteeInfo selectByPrimaryKey(String grtId);

    int updateByExampleSelective(@Param("record") FlowGuaranteeInfo record, @Param("example") FlowGuaranteeInfoExample example);

    int updateByExample(@Param("record") FlowGuaranteeInfo record, @Param("example") FlowGuaranteeInfoExample example);

    int updateByPrimaryKeySelective(FlowGuaranteeInfo record);

    int updateByPrimaryKey(FlowGuaranteeInfo record);
}