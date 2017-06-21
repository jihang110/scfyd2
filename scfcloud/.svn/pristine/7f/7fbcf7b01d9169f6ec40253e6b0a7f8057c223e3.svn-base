package com.ut.scf.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class FileEncodingFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		System.setProperty("file.encoding","utf-8");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		chain.doFilter(request, response);
	}

	@Override
	public void destroy() {
		
	}

}
