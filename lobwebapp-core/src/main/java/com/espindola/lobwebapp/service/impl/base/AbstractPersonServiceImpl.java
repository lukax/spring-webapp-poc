package com.espindola.lobwebapp.service.impl.base;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.PersonService;

public abstract class AbstractPersonServiceImpl<TPerson extends Person> extends AbstractEntityServiceImpl<TPerson> implements PersonService<TPerson> {

	public AbstractPersonServiceImpl(EntityRepository<TPerson> repository) {
		super(repository);
		// TODO Auto-generated constructor stub
	}

}
