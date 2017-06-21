package com.ut.scf.service.bpm.impl;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.TaskListener;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.ut.scf.dao.bpm.IActUserDao;

public class TaskListenerImpl implements Serializable, TaskListener {
	
	private static final long serialVersionUID = 478113514195354529L;  
	
	private Expression roleId;
	
	/**
	 * 变量是否可编辑
	 */
	private Expression editFlag;
	
	/**
	 * 可编辑的列
	 */
	private Expression editColumns;
	
	private static WebApplicationContext ctx = ContextLoader.getCurrentWebApplicationContext();	
	
	private IActUserDao actUserDao = ctx.getBean(IActUserDao.class);
	
	public void notify(DelegateTask delegateTask) {
		try {  
            String roleIds = (String) roleId.getValue(delegateTask);
            roleIds = roleIds.toUpperCase();
            
            String [] roleIDs = roleIds.trim().split(",");
        	StringBuffer rolesqlstr =new StringBuffer();
        	for (int i = 0; i < roleIDs.length; i++) {
        		rolesqlstr.append("\'"+roleIDs[i]+"\'");
        		if(i!=(roleIDs.length-1)){
        			rolesqlstr.append(",");
        		}
    		}
        	StringBuffer sqlstr =new StringBuffer();
            if(rolesqlstr.length()>0){
        		sqlstr.append("(");
        		sqlstr.append(rolesqlstr);
        		sqlstr.append(")");
            }
            
            Vector<String> users = new Vector<String>();
    		String corpId = "";
    		Map<String, Object> paramMap = new HashMap<String, Object>();
    		paramMap.put("corpId", corpId);
    		paramMap.put("roleId", sqlstr);
    		List<Map<String, Object>> userList = actUserDao.getUserByRole(paramMap);
    		for(Map<String, Object> user :userList){
    			users.add(user.get("username").toString());
    		}
    		
    		delegateTask.addCandidateUsers(users);  
        } catch (Exception e) {  
            e.printStackTrace();  
        } 
		
	}

	public Expression getRoleId() {
		return roleId;
	}

	public void setRoleId(Expression roleId) {
		this.roleId = roleId;
	}

	public Expression getEditFlag() {
		return editFlag;
	}

	public void setEditFlag(Expression editFlag) {
		this.editFlag = editFlag;
	}

	public Expression getEditColumns() {
		return editColumns;
	}

	public void setEditColumns(Expression editColumns) {
		this.editColumns = editColumns;
	}

}
