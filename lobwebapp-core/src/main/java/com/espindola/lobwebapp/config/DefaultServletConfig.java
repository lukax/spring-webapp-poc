package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ImportResource(value = {"classpath*:securityContext.xml"})
public class DefaultServletConfig extends WebMvcConfigurerAdapter {

}
