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
import org.springframework.validation.ObjectError;
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

import com.espindola.lobwebapp.controller.util.RequestKey;
import com.espindola.lobwebapp.domain.base.AbstractEntity;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.exception.NotFoundException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.validation.base.AbstractEntityValidator;

@Controller
public abstract class AbstractEntityController<T extends AbstractEntity> {

	@Autowired
	private AbstractEntityFacade<T> facade;
	private AbstractEntityValidator<T> validator;
	private MessageKey entityMessageKey;

	@Autowired
	public AbstractEntityController(AbstractEntityFacade<T> facade,
			AbstractEntityValidator<T> validator, MessageKey entityMessageKey) {
		this.facade = facade;
		this.validator = validator;
		this.entityMessageKey = entityMessageKey;
	}

	@InitBinder
	protected void initBinder(WebDataBinder dataBinder) {
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

	@RequestMapping(method = RequestMethod.GET, headers = {
			RequestKey.PAGE_INDEX, RequestKey.PAGE_SIZE })
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public List<T> findAll(HttpServletResponse response,
			@RequestHeader(RequestKey.PAGE_INDEX) Integer pageIndex,
			@RequestHeader(RequestKey.PAGE_SIZE) Integer pageSize) {
		Page<T> entities = facade.findAll(new PageRequest(pageIndex, pageSize));
		response.addHeader(RequestKey.PAGE_TOTAL, "" + entities.getTotalPages());
		return entities.getContent();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	@ResponseBody
	public void save(@Validated @RequestBody T data,
			BindingResult bindingResult, UriComponentsBuilder ucb,
			HttpServletRequest request, HttpServletResponse response)
			throws NotFoundException, InvalidArgumentException {
		validationResult(bindingResult);

		T entity = facade.save(data);
		UriComponents build = ucb.path(request.getPathInfo() + "/{id}")
				.buildAndExpand(entity.getId());
		response.setHeader("Location", build.toUriString());
		response.setHeader("Entity-Id", entity.getId().toString());
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.PUT)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void update(@Validated @RequestBody T data,
			BindingResult bindingResult) throws InvalidArgumentException,
			NotFoundException {
		validationResult(bindingResult);

		facade.update(data);
	}

	@RequestMapping(value = "/{id:[\\d]+}", method = RequestMethod.DELETE)
	@ResponseStatus(value = HttpStatus.OK)
	@ResponseBody
	public void remove(@PathVariable("id") Long id) throws NotFoundException {
		facade.remove(id);
	}

	protected void validationResult(BindingResult bindingResult)
			throws InvalidArgumentException {
		if (bindingResult.hasErrors()) {
			throw new InvalidArgumentException(entityMessageKey, bindingResult
					.getAllErrors().toArray(new ObjectError[] {}));
		}
	}
}