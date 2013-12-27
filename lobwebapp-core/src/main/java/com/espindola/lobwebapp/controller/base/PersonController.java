package com.espindola.lobwebapp.controller.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.service.contract.base.EntityService;
import com.espindola.lobwebapp.validation.base.PersonValidator;

@Controller
public abstract class PersonController<T extends Person> extends AbstractEntityController<T> {

	@Autowired
	public PersonController(EntityService<T> service, PersonValidator<T> validator) {
		super(service, validator);
	}

}
