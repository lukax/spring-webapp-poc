package com.espindola.lobwebapp.controller.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class ExecuteTimeInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger.getLogger(ExecuteTimeInterceptor.class);
	 
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		long startTime = System.currentTimeMillis();
		request.setAttribute("startTime", startTime);
		return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		long startTime = (Long)request.getAttribute("startTime");
		long endTime = System.currentTimeMillis();
		long executeTime = endTime - startTime;
		response.addHeader("execute_time", "" + executeTime);
		if(logger.isDebugEnabled()){
		   logger.debug("[" + handler + "] executeTime : " + executeTime + "ms");
		}
	}
}
