package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.exception.alreadyExists.AlreadyExistsException;
import com.espindola.lobwebapp.exception.alreadyExists.CustomerExistsException;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.exception.notFound.CustomerNotFoundException;
import com.espindola.lobwebapp.exception.notFound.NotFoundException;
import com.espindola.lobwebapp.repository.contract.CustomerRepository;
import com.espindola.lobwebapp.service.contract.CustomerService;
import com.espindola.lobwebapp.service.impl.base.AbstractPersonServiceImpl;

@Service
public class CustomerServiceImpl extends AbstractPersonServiceImpl<Customer> implements CustomerService {

	private CustomerRepository repository;

	@Autowired
	public CustomerServiceImpl(CustomerRepository repository) {
		super(repository);
		this.repository = repository;
	}
	
	@Override
	protected void throwIfInvalid(Customer entity) throws InvalidArgumentException {
		//TODO: Business logic
	}
	
	@Override
	protected void throwIfAlreadyExists(Customer entity) throws AlreadyExistsException {
		if(repository.exists(entity.getId()))
			throw new CustomerExistsException(entity);
	}

	@Override
	protected void throwIfNotFound(Long id) throws NotFoundException {
		if(!repository.exists(id))
			throw new CustomerNotFoundException(id);
	}
	
}