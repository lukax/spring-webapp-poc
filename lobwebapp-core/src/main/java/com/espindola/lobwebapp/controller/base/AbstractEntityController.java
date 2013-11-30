package com.espindola.lobwebapp.controller.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@RequestMapping(method = RequestMethod.GET, params = {"page", "size"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public ResponseEntity<List<T>> findAll(@RequestParam("page") Integer page, @RequestParam("size") Integer size) {
		Page<T> ts = service.findAll(new PageRequest(page, size));
		HttpHeaders headers = new HttpHeaders();
		headers.add("pages_total", ""+ts.getTotalPages());
		return new ResponseEntity<List<T>>(ts.getContent(), headers, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
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

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public synchronized T remove(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.remove(id);
	}
	
}
