package com.mossle.activiti;

import java.util.Arrays;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;

public class AssgineeMultiInstancePer implements JavaDelegate {
	    public void execute(DelegateExecution execution) throws Exception {  
	        System.out.println("设置会签环节的人员.");  
	        execution.setVariable("pers", Arrays.asList("张三", "李四", "王五", "赵六"));  
	    }  
}
