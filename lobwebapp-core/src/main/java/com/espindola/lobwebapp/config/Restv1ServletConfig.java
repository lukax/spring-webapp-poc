package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.espindola.lobwebapp.config.context.InfrastructureContextConfig;
import com.espindola.lobwebapp.config.context.PersistenceDevContextConfig;
import com.espindola.lobwebapp.config.context.PersistenceProdContextConfig;

@Configuration
@EnableWebMvc
@Import({InfrastructureContextConfig.class,
		 PersistenceDevContextConfig.class,
		 PersistenceProdContextConfig.class})
@ComponentScan("com.espindola.lobwebapp.controller")
public class Restv1ServletConfig extends WebMvcConfigurerAdapter {
	
}
