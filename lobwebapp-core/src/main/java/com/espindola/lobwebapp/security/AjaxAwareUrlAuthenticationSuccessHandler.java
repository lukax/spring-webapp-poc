package com.espindola.lobwebapp.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

public class AjaxAwareUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
		
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		response.sendError(HttpServletResponse.SC_OK);
		super.onAuthenticationSuccess(request, response, authentication);
		
	}
	
}
