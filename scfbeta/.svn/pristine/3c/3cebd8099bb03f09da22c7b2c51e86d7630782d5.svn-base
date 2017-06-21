package com.ut.scf.service.sys.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.IInterfaceLogDao;
import com.ut.scf.pojo.SysInterfaceLog;
import com.ut.scf.service.sys.IInterfaceLogService;

@Service("interfaceLogService")
public class InterfaceLogServiceImpl implements IInterfaceLogService {
	private static final Logger log = LoggerFactory.getLogger(InterfaceLogServiceImpl.class);
	
	@Resource
	private IInterfaceLogDao interfaceLogDao;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insertLog(SysInterfaceLog recode) {
		// 生成主键Id
		String recUid = ScfUUID.generate();
		recode.setRecUid(recUid);
		
		int insertNum = interfaceLogDao.insertSelective(recode);
		
		log.debug("insert I/F log num {}", insertNum);
		if (insertNum < 1) {
			log.error("insert I/F log error");
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void updateLog(SysInterfaceLog record) {
		int updateNum = interfaceLogDao.updateByRequsetSnSelective(record);
		
		log.debug("update I/F log num {}", updateNum);
		if (updateNum <= 0) {
			log.error("update I/F log error");
		}
	}
	
}
