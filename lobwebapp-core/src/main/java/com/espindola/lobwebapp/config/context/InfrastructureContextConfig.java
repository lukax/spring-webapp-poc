package com.espindola.lobwebapp.config.context;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource("classpath:application.properties")
@ComponentScan({"com.espindola.lobwebapp.validation",
				"com.espindola.lobwebapp.facade",
				"com.espindola.lobwebapp.service",
				"com.espindola.lobwebapp.repository",
				"com.espindola.lobwebapp.event"})
@Configuration
public class InfrastructureContextConfig {

}
