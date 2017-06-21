package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.LitigantSituation;

public interface ILitigantSituationDao {
    int deleteByPrimaryKey(String recUid);

    int insert(Map<String, Object> paramMap);

    int insertSelective(Map<String, Object> paramMap);

    LitigantSituation selectByPrimaryKey(String recUid);

    int updateByPrimaryKeySelective(Map<String, Object> paramMap);

    int updateByPrimaryKey(Map<String, Object> paramMap);
    
    List<Map<String,Object>> selectLitigantSituationList(Map<String, Object> paramMap, PageInfoBean page);
}