package com.espindola.lobwebapp.controller.base;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.espindola.lobwebapp.controller.util.HeaderKey;
import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.event.LobWebAppEventPublisher;
import com.espindola.lobwebapp.event.PageReturnEvent;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.service.contract.base.EntityService;

@Controller
public abstract class AbstractEntityController<T extends AbstractEntity> {
	
	@Autowired
	protected LobWebAppEventPublisher eventPublisher;
	private EntityService<T> service;

	@Autowired
	public AbstractEntityController(EntityService<T> service) {
		this.service = service;
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public T find(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.find(id);	
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll() {
		return service.findAll();
	}
	
	@RequestMapping(method = RequestMethod.GET, headers = {HeaderKey.PAGE_INDEX, HeaderKey.PAGE_SIZE})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll(HttpServletResponse response, @RequestHeader(HeaderKey.PAGE_INDEX) Integer pageIndex, @RequestHeader(HeaderKey.PAGE_SIZE) Integer pageSize) {
		Page<T> entities = service.findAll(new PageRequest(pageIndex, pageSize));
		eventPublisher.publishEvent(new PageReturnEvent(entities, response));
		return entities.getContent();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	@ResponseBody
	public void save(@Validated @RequestBody T data, UriComponentsBuilder cp, HttpServletRequest request, HttpServletResponse response) throws EntityExistsException, EntityInvalidException {
		T entity = service.save(data);
		UriComponents build = cp.path(request.getPathInfo() + "/{id}").buildAndExpand(entity.getId());
		response.setHeader("Location", build.toUriString());;
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void update(@Validated @RequestBody T data) throws EntityInvalidException, EntityNotFoundException {
		service.update(data);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void remove(@PathVariable("id") Long id) throws EntityNotFoundException {
		service.remove(id);
	}
	
}
