package com.espindola.lobwebapp.repository;

import org.springframework.stereotype.Repository;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.repository.base.PersonRepository;

@Repository
public interface CustomerRepository extends PersonRepository<Customer> {
	
}
