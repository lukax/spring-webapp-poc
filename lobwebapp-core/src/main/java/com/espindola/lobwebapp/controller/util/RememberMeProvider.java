package com.espindola.lobwebapp.controller.util;

import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

public class RememberMeProvider extends TokenBasedRememberMeServices  {

	private static final String[] kLocalDomain = { "localhost" };
	private static final String kProductionDomain = ".example.com";
	private static final String kRememberMe = "lobwebapp";

	public RememberMeProvider(final UserDetailsService userDetailsService){
		super(kRememberMe, userDetailsService);
	}

	private static Cookie createCookie(final String theKey,
			final String theValue, final String theDomain,
			final int theMaxAgeInSeconds, final String thePath,
			final boolean isSecureOnly) {
		final Cookie aCookie = new Cookie(theKey, theValue);
		aCookie.setDomain(theDomain);
		aCookie.setMaxAge(theMaxAgeInSeconds);
		aCookie.setPath(thePath);
		aCookie.setSecure(isSecureOnly);

		return aCookie;
	}

	private static String getCookieDomain(final HttpServletRequest request) {
		String aCookieDomain = null;
		try {
			aCookieDomain = new URL(request.getRequestURL().toString()).getHost();
			if (aCookieDomain.contains(RememberMeProvider.kLocalDomain[0])) {
				aCookieDomain = RememberMeProvider.kLocalDomain[0];
			} else {
				aCookieDomain = RememberMeProvider.kProductionDomain;
			}
		} catch (final MalformedURLException ex) {
			Logger.getLogger(RememberMeProvider.class.getName()).log(Level.WARN, null, ex);
			aCookieDomain = RememberMeProvider.kProductionDomain;
		}
		return "."+aCookieDomain;
	}

	@Override
	protected void setCookie(String[] tokens, int maxAge, HttpServletRequest request, HttpServletResponse response) {
		response.addCookie(RememberMeProvider.createCookie(
						super.getCookieName(), 
						super.encodeCookie(tokens), 
						getCookieDomain(request), 
						maxAge, 
						"/", 
						request.isSecure()));
	}
	
	@Override
	protected void cancelCookie(final HttpServletRequest request, final HttpServletResponse response) {
	    response.addCookie(RememberMeProvider.createCookie(
	                    super.getCookieName(), "",
	                    RememberMeProvider.getCookieDomain(request), 0, "/",
	                    request.isSecure()));
	}

}
