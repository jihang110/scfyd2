package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.BankReconciliation;

public interface IBankReconciliationDao {
    int deleteByPrimaryKey(String recId);

    int insert(BankReconciliation record);

    int insertSelective(BankReconciliation record);

    BankReconciliation selectByPrimaryKey(String recId);

    int updateByPrimaryKeySelective(BankReconciliation record);

    int updateByPrimaryKey(BankReconciliation record);
    
    List<Map<String, Object>> bankReconciliationList(Map<String, Object> paramMap,
			PageInfoBean page);
}