package com.espindola.lobwebapp.event;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.espindola.lobwebapp.controller.util.HeaderKey;

@Component
public class PageReturnEventListener implements
		ApplicationListener<PageReturnEvent> {

	@Override
	public void onApplicationEvent(PageReturnEvent event) {
		event.getHttpServletResponse().addHeader(HeaderKey.PAGE_TOTAL,
				"" + event.getPage().getTotalPages());
	}

}
