package com.espindola.lobwebapp.service.contract.base;

import com.espindola.lobwebapp.domain.base.Person;
import com.espindola.lobwebapp.service.contract.EntityService;

public interface PersonService<TPerson extends Person> extends
		EntityService<TPerson> {
}
