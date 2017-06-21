package com.ut.scf.service.sys;

import com.ut.scf.pojo.SysInterfaceLog;
import com.ut.scf.pojo.auto.SysInterfaceLogWithBLOBs;

public interface IInterfaceLogService {
	void insertLog(SysInterfaceLogWithBLOBs log);
	
	void updateLog(SysInterfaceLogWithBLOBs log);
}
