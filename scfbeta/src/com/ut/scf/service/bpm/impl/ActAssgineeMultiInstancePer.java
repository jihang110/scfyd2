package com.ut.scf.service.bpm.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.ut.scf.dao.bpm.IActUserDao;

/**
 * 设置会签成员
 * @author zyx
 *
 */
public class ActAssgineeMultiInstancePer implements JavaDelegate {
	
	private static WebApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();	
	
	private IActUserDao actUserDao = ctx.getBean(IActUserDao.class);;
		
	public void execute(DelegateExecution execution) throws Exception {
		//通过roleId获取用户设置会签人员
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> userMap = new HashMap<String, Object>();
		List<String> userlist = new ArrayList<String>();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		map.put("业务总负责人", "ROLE000003");
		map.put("法务经理", "ROLE000005");
		map.put("财务经理", "ROLE000006");
		map.put("总经理", "ROLE000007");
		for (String key : map.keySet()) {
			userMap.put("roleId", map.get(key));
			list = actUserDao.getUserByRole(userMap);
			for (Map<String, Object> m : list)  
		    {  
		      userlist.add(m.get("username").toString());
		    } 
		}
        System.out.println("会签环节的人员"+userlist);
        execution.setVariable("pers", userlist); 
        //初始化同意人数
        execution.setVariable("signCount", 0);
        //总共会签的人数
        //List userlist = (List)execution.getVariable("pers");
        int signSize = userlist.size();
        execution.setVariable("signSize", signSize);
    }  
}
