package com.espindola.lobwebapp.config.context;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import(LocalizationContextConfig.class)
@Configuration
public class ApplicationContextConfig {

}
