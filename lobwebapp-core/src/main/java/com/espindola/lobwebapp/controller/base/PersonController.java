package com.espindola.lobwebapp.controller.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.validation.base.PersonValidator;

@Controller
public abstract class PersonController<T extends Person> extends
		AbstractEntityController<T> {

	@Autowired
	public PersonController(AbstractEntityFacade<T> facade,
			PersonValidator<T> validator) {
		super(facade, validator);
	}

}
