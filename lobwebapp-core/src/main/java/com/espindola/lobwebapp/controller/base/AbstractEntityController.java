package com.espindola.lobwebapp.controller.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.EntityExistsException;
import com.espindola.lobwebapp.exception.EntityInvalidException;
import com.espindola.lobwebapp.exception.EntityNotFoundException;
import com.espindola.lobwebapp.service.contract.base.EntityService;

@Controller
public abstract class AbstractEntityController<T extends AbstractEntity> {

	private EntityService<T> service;

	@Autowired
	public AbstractEntityController(EntityService<T> service) {
		this.service = service;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public T find(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.find(id);	
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> list() {
		return service.list();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public synchronized T save(@Validated @RequestBody T data) throws EntityExistsException, EntityInvalidException {
		return service.save(data);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public synchronized T update(@Validated @RequestBody T data) throws EntityInvalidException, EntityNotFoundException {
		return service.update(data);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public synchronized T delete(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.remove(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.TRACE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public synchronized Boolean contains(@Validated @RequestBody T data) throws EntityNotFoundException, EntityInvalidException {
		return service.contains(data);
	}
	
}
