package com.espindola.lobwebapp.controller.base;

import org.springframework.stereotype.Controller;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.service.contract.EntityService;

@Controller
public abstract class PersonController<E extends Person> extends AbstractEntityController<E> {

	public PersonController(EntityService<E> service) {
		super(service);
		// TODO Auto-generated constructor stub
	}

}
