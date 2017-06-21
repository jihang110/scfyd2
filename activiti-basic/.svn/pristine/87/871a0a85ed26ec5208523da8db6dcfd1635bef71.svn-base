package com.mossle.activiti.deyuan;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * 
 * @author tianyuan
 * 
 */
public class Utils {
	private static Utils instance = null;
	private Properties prop = null;

	private Utils() {
		prop = new Properties();
		 InputStream is = Utils.class.getClassLoader().getResourceAsStream(  
	                "com/mossle/activiti/deyuan/config.properties");  
		try {
			prop.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static Utils getInstance() {
		if (instance == null) {
			synchronized (Utils.class) {
				if (instance == null) {
					instance = new Utils();
				}
			}
		}
		return instance;
	}

	public String getValue(String strKey) {
		return prop.getProperty(strKey);
	}
}
