package com.ut.scf.service.bpm.impl;

import java.io.Serializable;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.Expression;

public class ExcecutionListenerImpl implements Serializable, ExecutionListener {
	
	private static final long serialVersionUID = 478113514195354529L;  
	
	
	/**
	 * 变量是否可编辑
	 */
	private Expression editFlag;
	
	/**
	 * 可编辑的列
	 */
	private Expression editColumns;
	
	
	@Override
	public void notify(DelegateExecution execution) throws Exception {
        // 将节点变量存入task
		execution.setVariableLocal("editFlag", (String) editFlag.getValue(execution));
		execution.setVariableLocal("editColumns", (String) editColumns.getValue(execution));
		
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
