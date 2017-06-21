package com.mossle.activiti;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

public class TestLinstener implements TaskListener{
	private static final long serialVersionUID = -5754522101489239675L;  
    public void notify(DelegateTask delegateTask) {  
        System.out.print(delegateTask.getId() + " - " + delegateTask.getProcessInstanceId() + " - " + delegateTask.getEventName() + " - " + delegateTask.getTaskDefinitionKey());  
    }  
}
