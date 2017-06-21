package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.TaxReturns;
/**
 * 
 * @author lzy
 *
 */
public interface ITaxReturnsDao {
    int deleteByPrimaryKey(String vatId);

    int insert(TaxReturns record);
    int insert(Map<String, Object> paramMap);
    int insertSelective(TaxReturns record);

    TaxReturns selectByPrimaryKey(String vatId);
    List<Map<String, Object>> selectTaxReturnsList(Map<String, Object> paramMap, PageInfoBean page);

    int updateByPrimaryKeySelective(TaxReturns record);
    int updateByPrimaryKey(Map<String, Object> paramMap);
    int updateByPrimaryKey(TaxReturns record);
}