package com.ut.scf.service.sys.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.SysInterfaceLogMapper;
import com.ut.scf.dao.sys.IInterfaceLogDao;
import com.ut.scf.pojo.auto.SysInterfaceLogWithBLOBs;
import com.ut.scf.service.sys.IInterfaceLogService;

@Service("interfaceLogService")
public class InterfaceLogServiceImpl implements IInterfaceLogService {
	private static final Logger log = LoggerFactory.getLogger(InterfaceLogServiceImpl.class);
	
	@Resource
	private IInterfaceLogDao interfaceLogDao;
	@Resource
	private SysInterfaceLogMapper sysInterfaceLogMapper;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insertLog(SysInterfaceLogWithBLOBs recode) {
		// 生成主键Id
		String recUid = ScfUUID.generate();
		recode.setRecUid(recUid);
		
//		int insertNum = interfaceLogDao.insertSelective(recode);	修改自动生产sql
//		SysInterfaceLogWithBLOBs sysInterface = new SysInterfaceLogWithBLOBs();
		
		int insertNum = sysInterfaceLogMapper.insertSelective(recode);
		log.debug("insert I/F log num {}", insertNum);
		if (insertNum < 1) {
			log.error("insert I/F log error");
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void updateLog(SysInterfaceLogWithBLOBs record) {
//		int updateNum = interfaceLogDao.updateByRequsetSnSelective(record);
		int updateNum = sysInterfaceLogMapper.updateByPrimaryKeySelective(record);
		log.debug("update I/F log num {}", updateNum);
		if (updateNum <= 0) {
			log.error("update I/F log error");
		}
	}
	
}
