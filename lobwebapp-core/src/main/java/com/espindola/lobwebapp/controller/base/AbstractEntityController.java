package com.espindola.lobwebapp.controller.base;

import java.util.List;

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
	
	@RequestMapping(method = RequestMethod.GET, headers = {"page_index", "page_size"})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll(HttpServletResponse response, @RequestHeader("page_index") Integer pageIndex, @RequestHeader("page_size") Integer pageSize) {
		Page<T> entities = service.findAll(new PageRequest(pageIndex, pageSize));
		this.pageSetup(entities, response);
		return entities.getContent();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	@ResponseBody
	public T save(@Validated @RequestBody T data) throws EntityExistsException, EntityInvalidException {
		return service.save(data);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public T update(@Validated @RequestBody T data) throws EntityInvalidException, EntityNotFoundException {
		return service.update(data);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public T remove(@PathVariable("id") Long id) throws EntityNotFoundException {
		return service.remove(id);
	}
	
	protected void pageSetup(Page<T> page, HttpServletResponse response){
		response.addHeader("page_total", ""+page.getTotalPages());
	}
	
}
