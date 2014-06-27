package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.espindola.lobwebapp.config.context.InfrastructureConfig;
import com.espindola.lobwebapp.config.context.LocalizationConfig;
import com.espindola.lobwebapp.config.context.PersistenceDevConfig;

@Configuration
@EnableWebMvc
@Import({InfrastructureConfig.class,
		 LocalizationConfig.class,
		 PersistenceDevConfig.class})
public class TestContextConfig {

}
