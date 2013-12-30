package com.espindola.lobwebapp.controller.base;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
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
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Controller
public abstract class AbstractEntityController<T extends AbstractEntity> {
	
	@Autowired
	protected LobWebAppEventPublisher eventPublisher;
	private AbstractEntityFacade<T> facade;
	private AbstractEntityValidator<T> validator;

	@Autowired
	public AbstractEntityController(AbstractEntityFacade<T> facade, AbstractEntityValidator<T> validator) {
		this.facade = facade;
		this.validator = validator;
	}
	
	@InitBinder
	protected void initBinder(WebDataBinder dataBinder){
		dataBinder.setValidator(validator);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public T find(@PathVariable("id") Long id) throws NotFoundException {
		return facade.find(id);	
	}

	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll() {
		return facade.findAll();
	}
	
	@RequestMapping(method = RequestMethod.GET, headers = {HeaderKey.PAGE_INDEX, HeaderKey.PAGE_SIZE})
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll(HttpServletResponse response, @RequestHeader(HeaderKey.PAGE_INDEX) Integer pageIndex, @RequestHeader(HeaderKey.PAGE_SIZE) Integer pageSize) {
		Page<T> entities = facade.findAll(new PageRequest(pageIndex, pageSize));
		eventPublisher.publishEvent(new PageReturnEvent(entities, response));
		return entities.getContent();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	@ResponseBody
	public void save(@Validated @RequestBody T data, BindingResult bindingResult, UriComponentsBuilder ucb, HttpServletRequest request, HttpServletResponse response) throws NotFoundException, InvalidArgumentException {
		validationResult(bindingResult);
		
		T entity = facade.save(data);
		UriComponents build = ucb.path(request.getPathInfo() + "/{id}").buildAndExpand(entity.getId());
		response.setHeader("Location", build.toUriString());
		response.setHeader("Entity-Id", entity.getId().toString());
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void update(@Validated @RequestBody T data, BindingResult bindingResult) throws InvalidArgumentException, NotFoundException {
		validationResult(bindingResult);

		facade.update(data);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void remove(@PathVariable("id") Long id) throws NotFoundException {
		facade.remove(id);
	}
	
	protected abstract void validationResult(BindingResult bindingResult) throws InvalidArgumentException;
}