package com.espindola.lobwebapp.config.context;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@ComponentScan({"com.espindola.lobwebapp.validation",
				"com.espindola.lobwebapp.facade",
				"com.espindola.lobwebapp.service",
				"com.espindola.lobwebapp.repository",
				"com.espindola.lobwebapp.event"})
public class InfrastructureConfig {

}
