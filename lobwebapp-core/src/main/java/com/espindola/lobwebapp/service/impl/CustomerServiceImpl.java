package com.espindola.lobwebapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.exception.InvalidArgumentException;
import com.espindola.lobwebapp.l10n.MessageKey;
import com.espindola.lobwebapp.repository.CustomerRepository;
import com.espindola.lobwebapp.service.contract.CustomerService;
import com.espindola.lobwebapp.service.impl.base.AbstractPersonServiceImpl;

@Service
public class CustomerServiceImpl extends AbstractPersonServiceImpl<Customer>
		implements CustomerService {

	@Autowired
	public CustomerServiceImpl(CustomerRepository repository) {
		super(repository, MessageKey.ENTITY_CUSTOMER);
	}

	@Override
	protected void throwIfInvalid(Customer entity) throws InvalidArgumentException {
		// TODO: Business logic
	}

}