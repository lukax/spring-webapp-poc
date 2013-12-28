package com.espindola.lobwebapp.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.espindola.lobwebapp.domain.Customer;
import com.espindola.lobwebapp.exception.invalidArgument.InvalidArgumentException;
import com.espindola.lobwebapp.facade.base.AbstractEntityFacade;
import com.espindola.lobwebapp.service.contract.CustomerService;

@Transactional
@Component
public class CustomerFacade extends AbstractEntityFacade<Customer> {

	public CustomerFacade(){super(null);}
	
	@Autowired
	public CustomerFacade(CustomerService customerService) {
		super(customerService);
	}

	@Override
	protected void checkIfValid(Customer entity) throws InvalidArgumentException {
		
	}

}
