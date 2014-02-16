package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.espindola.lobwebapp.config.context.InfrastructureContextConfig;
import com.espindola.lobwebapp.config.context.LocalizationContextConfig;
import com.espindola.lobwebapp.config.context.PersistenceDevContextConfig;

@EnableWebMvc
@ComponentScan("com.espindola.lobwebapp.controller")
@Import({LocalizationContextConfig.class,
		 InfrastructureContextConfig.class,
		 PersistenceDevContextConfig.class})
@Configuration
public class TestContextConfig {

}
