package com.espindola.lobwebapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import com.espindola.lobwebapp.config.context.AppConfig;

@Configuration
@Import({AppConfig.class,
		 RestV1WebMvc.class})
public class TestContextConfig {

}
