package com.espindola.lobwebapp.controller.base;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import com.espindola.lobwebapp.service.contract.EntityService;

public abstract class EntityController<E extends AbstractEntity> {

	private EntityService<E> service;

	public EntityController(EntityService<E> service) {
		this.service = service;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public E find(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.find(id);	
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public List<E> list() {
		return service.list();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void save(@RequestBody E entity) throws EntityExistsException, EntityInvalidException {
		service.save(entity);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	public void update(@RequestBody E entity) throws EntityInvalidException, EntityNotFoundException {
		service.update(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	public void delete(@PathVariable("id") Long id)
			throws EntityNotFoundException {
		service.delete(id);
	}
}
