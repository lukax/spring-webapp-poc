package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ImportResource(value = {
		"classpath*:infrastructureContext.xml",
		"classpath*:persistenceContext-dev.xml",
		"classpath*:persistenceContext-prod.xml"})
@ComponentScan(basePackages = {"com.espindola.lobwebapp.controller"})
public class Restv1ServletConfig extends WebMvcConfigurerAdapter {
	
}
