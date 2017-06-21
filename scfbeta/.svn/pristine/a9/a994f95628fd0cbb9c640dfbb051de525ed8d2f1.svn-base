package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;


public interface IUploadFileRelaDao {
	List<Map<String, Object>> selectFileRelaList(Map<String, Object> paramMap,PageInfoBean page);
	
	@Insert("insert into upload_file_rela(file_id, file_url,corp_id,sys_type,module_type,is_push,create_time,create_user_id,status,file_name) values(#{fileId}, #{fileUrl},#{corpId},#{sysType},#{moduleType},#{isPush},now(),#{createUserId},1,#{fileName})")
	int insertFileRela(Map<String, Object> paramMap);
	
	@Update("UPDATE upload_file_rela SET status = 0 WHERE file_id = #{fileId}")
	int deleteFileRela(String fileId);
}
