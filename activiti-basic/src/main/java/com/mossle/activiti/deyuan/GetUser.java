/**
 * 
 */
package com.mossle.activiti.deyuan;

import java.util.List;
import java.util.Vector;

/**
 * @author airstar
 * 
 */
public class GetUser {

	/**
	 * 普通的二级审批，根据保理商标号（参数传递）和角色（配置文件）筛选用户
	 * 
	 * @param sysBusiUnit
	 *            保理商编号
	 * @return 特定保理商下面有审批权限的人员列表
	 */
	public  Vector<String> getUsersByRole(String roleId, String corpId) {
		Vector<String> UsersVec = new Vector();
		 try {
		    	List<String> names = Dao.getUsersByRole(roleId, corpId);
		    	for(int i=0;i<names.size();i++){
		    		UsersVec.add(names.get(i));
		    	}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		    return UsersVec;
//		return Dao.getUsersByRole(sysBusiUnit);
	}
	
	public static void main(String[] args) {
//		GetUser getUser = new GetUser();
//		Vector<String> v = getUser.getUsersByRole("SYSBU00016", "ROLE000003", "Fac00528");
//		// Vector<String> v = Dao.getUsersByRole("SYSBU00188");
//		for (String i : v) {
//			System.out.println(i);
//		}
	}
}
