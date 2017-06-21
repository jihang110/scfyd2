package com.mossle.activiti.deyuan;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

public class Dao {
	public static final Vector<String> getUsersByRoles(String roleId,String corpId) {
		Connection conn = null;
		Statement pst = null;
		ResultSet rs = null;
		Vector<String> v = new Vector<String>();
		
		StringBuffer sqlstr =new StringBuffer().append("SELECT su.username FROM	sys_user su JOIN sys_user_role sur ON su.user_id = sur.user_id JOIN sys_role sr ON sur.role_id = sr.role_id left join corp_dept cd on su.dept_id=cd.dept_id left join corp_info ci on ci.corp_id=cd.corp_id WHERE su.STATUS = 1 ");

		if(corpId!=null&&!"".equals(corpId.trim())){
			sqlstr.append(" AND (ci.corp_id = '");
			sqlstr.append(corpId);
			sqlstr.append("' OR su.corp_id='");
			sqlstr.append(corpId);
			sqlstr.append("')");
		}
		
    	String [] roleIDs = roleId.trim().split(",");
    	StringBuffer rolesqlstr =new StringBuffer();
    	for (int i = 0; i < roleIDs.length; i++) {
    		rolesqlstr.append("\'"+roleIDs[i]+"\'");
    		if(i!=(roleIDs.length-1)){
    			rolesqlstr.append(",");
    		}
		}
        if(rolesqlstr.length()>0){
    		sqlstr.append(" AND sr.role_id IN (");
    		sqlstr.append(rolesqlstr);
    		sqlstr.append(")");
        }
		try {
			conn = Jdbc.getMySqlConnection();
			// TODO: 未来可能多个角色都有审批权限，需要支持角色列表，最好是用in模式查询
//			String sql = "select DISTINCT(m.USER_ID) from user_role_info r,user_info_m m where r.user_id = m.SYS_REF_NO and m.busi_unit='"
//					+ sysBusiUnit
//					+ "' and r.role_id in "
//					+ Utils.getInstance().getValue("rolelist");
			pst = conn.createStatement();
			rs = pst.executeQuery(sqlstr.toString());
			while (rs.next()) {
				String name = rs.getString("username");
				v.add(name);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			Jdbc.close(rs);
			Jdbc.close(pst);
			Jdbc.close(conn);
			Jdbc.closeConnection();
		}
		return v;
	}

	public static final Vector<String> getUsersByRole(String roleId,String corpId) {
		Connection conn = null;
		Statement pst = null;
		ResultSet rs = null;
		Vector<String> v = new Vector<String>();
		
		StringBuffer sqlstr =new StringBuffer().append("SELECT su.username FROM	sys_user su JOIN sys_user_role sur ON su.user_id = sur.user_id JOIN sys_role sr ON sur.role_id = sr.role_id left join corp_dept cd on su.dept_id=cd.dept_id left join corp_info ci on ci.corp_id=cd.corp_id WHERE su.STATUS = 1 ");
//    	String [] roleIDs = roleId.trim().split(",");
//    	for (int i = 0; i < roleIDs.length; i++) {
//    		sqlstr.append("\'"+roleIDs[i]+"\'");
//    		if(i!=(roleIDs.length-1)){
//    			sqlstr.append(",");
//    		}
//		}
        if(roleId!=null&&!"".equals(roleId.trim())){
    		sqlstr.append(" AND sr.role_id = '"+roleId+"'");
        }
        if(corpId!=null&&!"".equals(corpId.trim())){
    		sqlstr.append(" AND ci.corp_id = '"+corpId+"'");
        }
		try {
			conn = Jdbc.getMySqlConnection();
			// TODO: 未来可能多个角色都有审批权限，需要支持角色列表，最好是用in模式查询
//			String sql = "select DISTINCT(m.USER_ID) from user_role_info r,user_info_m m where r.user_id = m.SYS_REF_NO and m.busi_unit='"
//					+ sysBusiUnit
//					+ "' and r.role_id in "
//					+ Utils.getInstance().getValue("rolelist");
			pst = conn.createStatement();
			rs = pst.executeQuery(sqlstr.toString());
			while (rs.next()) {
				String name = rs.getString("username");
				v.add(name);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			Jdbc.close(rs);
			Jdbc.close(pst);
			Jdbc.close(conn);
			Jdbc.closeConnection();
		}
		return v;
	}
	
	public static void main(String[] args) {
		Vector<String> v = Dao.getUsersByRole("ROLE000003,ROLE000005,ROLE000006,ROLE000007","corp00001");
		for (String i : v) {
			System.out.println(i);
		}
	}
}
