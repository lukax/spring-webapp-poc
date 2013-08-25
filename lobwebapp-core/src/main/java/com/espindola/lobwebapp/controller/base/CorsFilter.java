package com.espindola.lobwebapp.controller.base;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component(value= "corsFilterBean")
public class CorsFilter extends OncePerRequestFilter {
/*	 @RequestMapping(method = RequestMethod.OPTIONS)
	public void catchAllOpt(final HttpServletResponse response)
			throws IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Max-Age", "120"); // in seconds
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Allow-Methods",
				"HEAD, GET, OPTIONS, POST");
		response.addHeader("Access-Control-Allow-Headers",
				"origin, content-type, accept, X-Requested-With");
	}*/

	@Override
	protected void doFilterInternal(HttpServletRequest arg0,
			HttpServletResponse response, FilterChain arg2)
			throws ServletException, IOException {
		 response.addHeader("Access-Control-Allow-Origin", "*");
		 response.addHeader("Access-Control-Allow-Headers", "origin, accept, content-type, X-Requested-With");
		 response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		 arg2.doFilter(arg0, response);
	}
}
