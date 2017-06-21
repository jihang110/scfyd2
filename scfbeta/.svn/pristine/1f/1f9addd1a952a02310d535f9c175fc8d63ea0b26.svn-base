package com.ut.scf.core.util;

import java.sql.Date;
import java.text.SimpleDateFormat;

public class ScfSerialNum {
	/**
	 * 生成流水号 格式为：3位前缀+12位日期+3位随机数
	 * @param prefix 3位前缀
	 * @return 流水号
	 */
	public static String generate(String prefix) {
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyMMddhhmmss");
		int i = (int) (Math.random() * 900) + 100;
		return prefix + format.format(date) + String.valueOf(i);
	}
	
	public static void main(String[] args) {
		for (int i = 0; i < 50; ++i) {
			new Thread() {
				public void run() {
					System.out.println(ScfSerialNum.generate("REG"));
				}
			}.start();
		}
	}
}
