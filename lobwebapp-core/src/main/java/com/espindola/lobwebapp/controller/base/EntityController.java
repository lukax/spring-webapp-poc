package com.espindola.lobwebapp.controller.base;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.service.contract.EntityService;

public abstract class EntityController<TEntity extends AbstractEntity> {

	private EntityService<TEntity> service;

	public EntityController(EntityService<TEntity> service) {
		this.service = service;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public TEntity find(@PathVariable("id") Long id) {
		return service.find(id);
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public List<TEntity> list() {
		return service.list();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void save(@ModelAttribute TEntity entity) {
		service.save(entity);
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	public void update(@ModelAttribute TEntity entity) {
		service.update(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	public void delete(@PathVariable("id") Long id) {
		service.delete(id);
	}

}
