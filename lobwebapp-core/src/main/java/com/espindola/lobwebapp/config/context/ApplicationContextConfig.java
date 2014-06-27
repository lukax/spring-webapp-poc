package com.espindola.lobwebapp.config.context;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ LocalizationContextConfig.class, 
		InfrastructureContextConfig.class,
		PersistenceDevContextConfig.class, 
		PersistenceProdContextConfig.class })
public class ApplicationContextConfig {

}
