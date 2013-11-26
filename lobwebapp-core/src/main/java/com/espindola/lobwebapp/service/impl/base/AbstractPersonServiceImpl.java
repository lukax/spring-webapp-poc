package com.espindola.lobwebapp.service.impl.base;

import org.springframework.beans.factory.annotation.Autowired;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.repository.contract.base.EntityRepository;
import com.espindola.lobwebapp.service.contract.base.PersonService;

public abstract class AbstractPersonServiceImpl<T extends Person> extends AbstractEntityServiceImpl<T> implements PersonService<T> {

	@Autowired
	public AbstractPersonServiceImpl(EntityRepository<T> repository) {
		super(repository);
	}

}
