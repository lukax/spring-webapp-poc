package com.espindola.lobwebapp.event;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationEvent;
import org.springframework.data.domain.Page;

public class PageReturnEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;
	private Page<?> page;
	private HttpServletResponse httpServletResponse;

	public PageReturnEvent(Page<?> page, HttpServletResponse httpServletResponse) {
		super(new Object[] { page, httpServletResponse });
		this.setPage(page);
		this.setHttpServletResponse(httpServletResponse);
	}

	public Page<?> getPage() {
		return page;
	}

	public void setPage(Page<?> page) {
		this.page = page;
	}

	public HttpServletResponse getHttpServletResponse() {
		return httpServletResponse;
	}

	public void setHttpServletResponse(HttpServletResponse httpServletResponse) {
		this.httpServletResponse = httpServletResponse;
	}

}
