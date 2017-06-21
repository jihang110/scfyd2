package com.ut.scf.dao.bpm;

import java.util.List;
import java.util.Map;

public interface IActUserDao {

	List<Map<String, Object>> getUserByRole(Map<String, Object> paramMap);

}