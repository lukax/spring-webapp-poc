package com.espindola.lobwebapp.repository.contract.base;

import java.util.List;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.domain.base.Person;

public interface PersonRepository<T extends Person> extends EntityRepository<T> {
	public List<Customer> findByFirstName(String firstname);

}
