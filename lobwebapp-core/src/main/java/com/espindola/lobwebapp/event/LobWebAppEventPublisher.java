package com.espindola.lobwebapp.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class LobWebAppEventPublisher implements ApplicationEventPublisher {

	@Autowired
	private ApplicationContext context;

	@Override
	public void publishEvent(ApplicationEvent event) {
		context.publishEvent(event);
	}

}
