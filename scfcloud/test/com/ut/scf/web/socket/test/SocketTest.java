package com.ut.scf.web.socket.test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ut.scf.core.util.JaxbUtil;
import com.ut.scf.reqbean.xml.AccountsInfoReqXmlBean;
import com.ut.scf.reqbean.xml.AccountsReceivableReqBean;
import com.ut.scf.reqbean.xml.BaseInfoReqXmlBean;
import com.ut.scf.reqbean.xml.BaseQueryReqBean;
import com.ut.scf.reqbean.xml.StandardIndexReqBean;
import com.ut.scf.reqbean.xml.StandardInfoReqXmlBean;

public class SocketTest {

	public static void test6W5501(String[] args) {
		try {
			// 1.建立客户端socket连接，指定服务器位置及端口
			Socket socket = new Socket("localhost", 8000);
			// 2.得到socket读写流
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			// 输入流
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			// 3.利用流按照一定的操作，对socket进行读写操作
			BaseQueryReqBean sb = new BaseQueryReqBean();
			sb.setTxCode("6W5501");
			sb.setCustId("orgId123");
			sb.setLanguage("CN");
			sb.setRequestSn("test1234");
			sb.setUserId("zhangsan");
			sb.setPassword("");
			BaseInfoReqXmlBean bean = new BaseInfoReqXmlBean();
			bean.setRequestOrgnNum("91420000757013137P");
			bean.setStartSerialNum(1L);
			sb.setBean(bean);
			
			String xml = JaxbUtil.convertToXml(sb);
			System.out.println(xml);
			pw.write(xml);
			pw.flush();
			socket.shutdownOutput();
			// 接收服务器的相应
			String reply = null;
			while (!((reply = br.readLine()) == null)) {
				System.out.println("接收服务器的信息：" + reply);
			}
			System.out.println("OK");
			// 4.关闭资源
			br.close();
			is.close();
			pw.close();
			os.close();
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void test6W5502(String[] args) {
		try {
			// 1.建立客户端socket连接，指定服务器位置及端口
			Socket socket = new Socket("localhost", 8000);
			// 2.得到socket读写流
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			// 输入流
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			// 3.利用流按照一定的操作，对socket进行读写操作
			StandardIndexReqBean sb = new StandardIndexReqBean();
			sb.setTxCode("6W5502");
			sb.setCustId("orgId123");
			sb.setLanguage("CN");
			sb.setRequestSn("test1235");
			sb.setUserId("zhangsan");
			sb.setPassword("");
			StandardInfoReqXmlBean bean = new StandardInfoReqXmlBean();
			bean.setRequestOrgnNum("91420000757013137P");
			bean.setOrgnNum("91420000757013136P");
			bean.setFeedbackStatusCd("0001");
			bean.setTradeYears(new BigDecimal("20"));
			bean.setTradeActivity("A");
			bean.setMultipleEvaluate("B");
			sb.setBean(bean);
			
			String xml = JaxbUtil.convertToXml(sb);
			System.out.println(xml);
			pw.write(xml);
			pw.flush();
			socket.shutdownOutput();
			// 接收服务器的相应
			String reply = null;
			while (!((reply = br.readLine()) == null)) {
				System.out.println("接收服务器的信息：" + reply);
			}
			System.out.println("OK");
			// 4.关闭资源
			br.close();
			is.close();
			pw.close();
			os.close();
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void test6W5505(String[] args) {
		try {
			// 1.建立客户端socket连接，指定服务器位置及端口
			Socket socket = new Socket("localhost", 8000);
			// 2.得到socket读写流
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			// 输入流
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			// 3.利用流按照一定的操作，对socket进行读写操作
			BaseQueryReqBean sb = new BaseQueryReqBean();
			sb.setTxCode("6W5505");
			sb.setCustId("orgId123");
			sb.setLanguage("CN");
			sb.setRequestSn("test1236");
			sb.setUserId("zhangsan");
			sb.setPassword("");
			BaseInfoReqXmlBean bean = new BaseInfoReqXmlBean();
			bean.setRequestOrgnNum("91420000757013137P");
			bean.setStartSerialNum(1L);
			sb.setBean(bean);
			
			String xml = JaxbUtil.convertToXml(sb);
			System.out.println(xml);
			pw.write(xml);
			pw.flush();
			socket.shutdownOutput();
			// 接收服务器的相应
			String reply = null;
			while (!((reply = br.readLine()) == null)) {
				System.out.println("接收服务器的信息：" + reply);
			}
			System.out.println("OK");
			// 4.关闭资源
			br.close();
			is.close();
			pw.close();
			os.close();
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void test6W5574(String[] args) {
		try {
			// 1.建立客户端socket连接，指定服务器位置及端口
			Socket socket = new Socket("localhost", 8000);
			// 2.得到socket读写流
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			// 输入流
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			// 3.利用流按照一定的操作，对socket进行读写操作
			AccountsReceivableReqBean sb = new AccountsReceivableReqBean();
			sb.setTxCode("6W5574");
			sb.setCustId("orgId123");
			sb.setLanguage("CN");
			sb.setRequestSn("test1237");
			sb.setUserId("zhangsan");
			sb.setPassword("");
			List<AccountsInfoReqXmlBean> list = new ArrayList<>();
			for (int i = 0; i < 5; i++) {
				AccountsInfoReqXmlBean bean = new AccountsInfoReqXmlBean();
				bean.setRequestOrgnNum("91420000757013137P");
				bean.setCustOrgnCode("91420000757013136P");
				bean.setRelateCustName("特殊-" + i);
				bean.setContractNum("297eac575b55d899565c55e4b9a30018");
				bean.setBillNum("发票00-" + i);
				bean.setBillBalanceAmt(new BigDecimal("32.1"));
				bean.setBillDate(new Date(System.currentTimeMillis() + i * 1000000));
				bean.setCreditPeriod(i);
				list.add(bean);
			}
			sb.setBeans(list);
			
			String xml = JaxbUtil.convertToXml(sb);
			System.out.println(xml);
			pw.write(xml);
			pw.flush();
			socket.shutdownOutput();
			// 接收服务器的相应
			String reply = null;
			while (!((reply = br.readLine()) == null)) {
				System.out.println("接收服务器的信息：" + reply);
			}
			System.out.println("OK");
			// 4.关闭资源
			br.close();
			is.close();
			pw.close();
			os.close();
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void test6W5528(String[] args) {
		try {
			// 1.建立客户端socket连接，指定服务器位置及端口
			Socket socket = new Socket("localhost", 8000);
			// 2.得到socket读写流
			OutputStream os = socket.getOutputStream();
			PrintWriter pw = new PrintWriter(os);
			// 输入流
			InputStream is = socket.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			// 3.利用流按照一定的操作，对socket进行读写操作
			BaseQueryReqBean sb = new BaseQueryReqBean();
			sb.setTxCode("6W5528");
			sb.setCustId("orgId123");
			sb.setLanguage("CN");
			sb.setRequestSn("test1238");
			sb.setUserId("zhangsan");
			sb.setPassword("");
			BaseInfoReqXmlBean bean = new BaseInfoReqXmlBean();
			bean.setRequestOrgnNum("91420000757013137P");
			bean.setStartSerialNum(1L);
			sb.setBean(bean);
			
			String xml = JaxbUtil.convertToXml(sb);
			System.out.println(xml);
			pw.write(xml);
			pw.flush();
			socket.shutdownOutput();
			// 接收服务器的相应
			String reply = null;
			while (!((reply = br.readLine()) == null)) {
				System.out.println("接收服务器的信息：" + reply);
			}
			System.out.println("OK");
			// 4.关闭资源
			br.close();
			is.close();
			pw.close();
			os.close();
			socket.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
//		test6W5501(args);
//		test6W5502(args);
//		test6W5505(args);
		test6W5574(args);
//		test6W5528(args);
	}
}
