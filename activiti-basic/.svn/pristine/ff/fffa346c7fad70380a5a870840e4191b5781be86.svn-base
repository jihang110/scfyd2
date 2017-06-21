package com.mossle.activiti.deyuan;

import java.util.Vector;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.Expression;
import org.activiti.engine.delegate.TaskListener;

public class TaskListenerImpl implements TaskListener {
	
	private static final long serialVersionUID = 478113514195354529L;  
	
	private Expression roleId;
	
	public void notify(DelegateTask delegateTask) {
		try {  
            String value2 = (String) roleId.getValue(delegateTask);
            value2 = value2.toUpperCase();
            System.out.println(value2);
            Vector<String> users = new Vector<String>();
    		String roleIds = "ROLE000003,ROLE000005,ROLE000006,ROLE000007";
    		String corpId = "";
    		GetUser getUser = new GetUser();
    		users = getUser.getUsersByRole(value2,corpId);
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

}
