package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.espindola.lobwebapp.config.context.SecurityContextConfig;

@Configuration
@EnableWebMvc
@Import(SecurityContextConfig.class)
public class DefaultServletConfig extends WebMvcConfigurerAdapter {

}
