package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.OrgnLoanCount;
/**
 * 
 * @author lzy
 * 添加了insert，selectByPrimaryKeyId,updateByPrimaryKeySelective,updateByPrimaryKey方法
 *
 */
public interface IOrgnLoanCountDao {
    int deleteByPrimaryKey(String recUid);

    int insert(OrgnLoanCount record);
    int insert(Map<String, Object> paramMap);

    int insertSelective(OrgnLoanCount record);

    OrgnLoanCount selectByPrimaryKey(String recUid);
    
    List<Map<String, Object>> selectOrgnFlowList(Map<String, Object> paramMap, PageInfoBean page);

    int updateByPrimaryKeySelective(OrgnLoanCount record);
    int updateByPrimaryKeySelective(Map<String, Object> paramMap);

    int updateByPrimaryKey(OrgnLoanCount record);
    int updateByPrimaryKey(Map<String, Object> paramMap);
}