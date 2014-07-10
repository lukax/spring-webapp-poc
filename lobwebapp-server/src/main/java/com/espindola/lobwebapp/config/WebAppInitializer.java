package com.espindola.lobwebapp.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.DispatcherServlet;

import com.espindola.lobwebapp.config.context.AppConfig;

public class WebAppInitializer implements WebApplicationInitializer {

	@Override
	public void onStartup(ServletContext servletContext)
			throws ServletException {
		AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
		rootContext.register(AppConfig.class);
		servletContext.addListener(new ContextLoaderListener(rootContext));

		// Default Profile is production
		servletContext.setInitParameter("spring.profiles.default", "dev");

		registerDefaultServlet(servletContext);
		registerRestv1Servlet(servletContext);
		registerSpringSecurityFilter(servletContext);
	}

	private void registerDefaultServlet(ServletContext servletContext) {
		AnnotationConfigWebApplicationContext defaultContext = new AnnotationConfigWebApplicationContext();
		defaultContext.register(DefaultWebMvc.class);
		ServletRegistration.Dynamic defaultServlet = servletContext.addServlet(
				"default", new DispatcherServlet(defaultContext));
		defaultServlet.setLoadOnStartup(1);
		defaultServlet.addMapping("/");
	}

	private void registerRestv1Servlet(ServletContext servletContext) {
		AnnotationConfigWebApplicationContext restv1Context = new AnnotationConfigWebApplicationContext();
		restv1Context.register(RestV1WebMvc.class);
		ServletRegistration.Dynamic restv1Servlet = servletContext.addServlet(
				"restv1", new DispatcherServlet(restv1Context));
		restv1Servlet.setLoadOnStartup(1);
		restv1Servlet.addMapping("/v1/*");
	}

	private void registerSpringSecurityFilter(ServletContext servletContext) {
		DelegatingFilterProxy springSecFilter = new DelegatingFilterProxy(
				"springSecurityFilterChain");
		springSecFilter
				.setContextAttribute("org.springframework.web.servlet.FrameworkServlet.CONTEXT.default");
		servletContext.addFilter("springSecurityFilterChain", springSecFilter)
				.addMappingForUrlPatterns(null, false, "/*");
	}
}
