package com.espindola.lobwebapp.config.context;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ LocalizationConfig.class, 
		  InfrastructureConfig.class,
		  PersistenceDevConfig.class, 
		  PersistenceProdConfig.class })
public class AppConfig {

}
